"""Fresh CUDA diagnostics, with raw data and honest fixed-camera captures.

No physical pass thresholds. All parameters are declared diagnostic inputs. Host code
builds geometry and plots recorded data; mechanics and fluid solve run on CUDA only.
Sanity: units um/s/pN; zero external load in mechanical cases; all nodes mobile;
nonfinite data stop that case; each saved time is k*dt after k physical steps.
The fluid is one steady Stokes boundary problem, never a fabricated time sequence.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import subprocess
from pathlib import Path
import shutil
import time
import traceback

import numpy as np
import warp as wp


def write_json(path, value):
    path.write_text(json.dumps(value, indent=2, allow_nan=False) + "\n")


def make_plot(path, rows, names, title):
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    fig, axes = plt.subplots(len(names), 1, figsize=(8, 3 * len(names)), squeeze=False)
    for ax, (key, unit) in zip(axes.flat, names):
        ax.plot([r["time_s"] for r in rows], [r[key] for r in rows], "o-", ms=2)
        ax.set(xlabel="Physical time [s]", ylabel=unit)
        ax.grid(alpha=.2)
    fig.suptitle(title + " · isolated diagnostic, no validation verdict")
    fig.tight_layout()
    fig.savefig(path, dpi=140)
    plt.close(fig)


def capture_mechanics(out, world, kinds, cfg, pars, device, render, case):
    from aleph.physics import integrate
    from aleph.studio import render as rz
    from dev.experiments.render_record import scene_for, orbit_camera
    out.mkdir(parents=True, exist_ok=True)
    (out / "frames").mkdir(exist_ok=True)
    p0 = world.pos.numpy()
    center = (p0.min(0) + p0.max(0)) / 2
    extent = float(np.linalg.norm(p0 - center, axis=1).max())
    camera = orbit_camera(center, extent, 0, render["width"], render["height"])
    ns, nf = world.segments.count, world.faces.count
    face = np.stack([world.faces.i.numpy()[:nf], world.faces.j.numpy()[:nf], world.faces.k.numpy()[:nf]], 1)
    labels = np.zeros(world.n, np.int32)
    for idx, bounds in enumerate(world.ranges.values()):
        labels[bounds[0]:bounds[1]] = idx
    tables = dict(radius=world.radius.numpy(), label=labels,
                  seg_i=world.segments.i.numpy()[:ns], seg_j=world.segments.j.numpy()[:ns], face=face)
    np.savez(out / "raw_tables.npz", **tables)
    rows, frames = [], []
    metrics = dict(classification="EXAMPLE isolated diagnostic; not native-cell validation",
                   case=case, parameters=pars, population=world.n, verdict=None,
                   physical_time=True, camera_motion=False, interpolation=False,
                   limitations=["Short isolated trajectory; no physiological-function conclusion.",
                                "Implicit discretization and incomplete solves can bias motion.",
                                "No independent reference comparison or convergence claim."])
    start = time.monotonic()
    stats = None
    try:
        for k in range(pars["steps"] + 1):
            if k:
                stats = integrate.step(world, None, kinds, pars["dt_s"], pars["temperature_K"], pars["seed"], k-1, cfg)
            if k % pars["capture_every"] and k != pars["steps"]:
                continue
            pos, vel, force = world.pos.numpy(), world.vel.numpy(), world.force.numpy()
            bad = int(np.count_nonzero(~np.isfinite(pos)))
            if bad:
                np.savez(out / f"raw_failed_{k:06d}.npz", pos=pos, vel=vel, force=force)
                raise FloatingPointError(f"nonfinite position entries at step {k}: {bad}")
            nb = world.bonds.count
            alive = world.bonds.alive.numpy()[:nb]
            bi, bj = world.bonds.i.numpy()[:nb], world.bonds.j.numpy()[:nb]
            state = world.bonds.state.numpy()[:nb]
            np.savez(out / f"raw_{k:06d}.npz", pos=pos, vel=vel, force=force,
                     bond_i=bi, bond_j=bj, bond_alive=alive, bond_state=state,
                     time_s=k * pars["dt_s"])
            row = dict(step=k, time_s=k * pars["dt_s"], nonfinite=bad,
                       displacement_rms_um=float(np.sqrt(np.mean(np.sum((pos-p0)**2, axis=1)))),
                       bound_heads=int(alive.sum()),
                       max_force_pN=float(np.linalg.norm(force, axis=1).max()))
            if stats is not None:
                row["integrator_nonfinite"] = int(stats.n_nonfinite)
            rows.append(row)
            # Bound links are actual recorded links, drawn as additional segments.
            valid = (alive != 0) & (bj >= 0) & (bj < world.n)
            draw = dict(tables)
            draw["seg_i"] = np.concatenate([tables["seg_i"], bi[valid]])
            draw["seg_j"] = np.concatenate([tables["seg_j"], bj[valid]])
            scene = scene_for(pos, draw, only_surfaces=False, label=labels, device=device)
            data, meta = rz.render_frame(scene, camera, None, device, fmt="png")
            if meta["n_nodes"] != world.n:
                raise AssertionError("renderer omitted nodes")
            fname = f"frames/{len(frames):05d}.png"
            (out / fname).write_bytes(data)
            frames.append(dict(file=fname, step=k, time_s=k*pars["dt_s"]))
            if len(frames) == 1:
                shutil.copyfile(out / fname, out / "poster.png")
            print(f"{case}: {k}/{pars['steps']} steps, {len(frames)} frames", flush=True)
        metrics["status"] = "recorded"
    except Exception:
        metrics["status"] = "failed"
        metrics["error"] = traceback.format_exc()
    metrics.update(rows=rows, frames=frames, wall_seconds=time.monotonic()-start)
    write_json(out / "metrics.json", metrics)
    if rows:
        make_plot(out / "plot.png", rows, [("displacement_rms_um", "RMS displacement [um]"),
                  ("bound_heads", "Recorded bound heads")], case)
    return metrics["status"]


def filament(out, inputs, device):
    from aleph.cell.params import Params
    from aleph.physics import integrate
    from aleph.physics.kinetics import KindTable
    from dev.experiments.ladder.rung1_filament import build
    p, a = Params.load(inputs["spec"]), inputs["filament"]
    n, ell = a["segments"], p.get("cortex.seg")
    theta = np.linspace(-a["bend_angle_rad"], a["bend_angle_rad"], n)
    increments = ell * np.stack([np.cos(theta), np.sin(theta), np.zeros(n)], 1)
    pos = np.concatenate([np.zeros((1,3)), np.cumsum(increments, axis=0)])[None]
    world = build(pos, np.zeros_like(pos), ell, p.get("material.actin.radius"),
                  p.get("material.actin.EA") / ell, p.get("material.actin.kappa"), device)
    z = np.zeros((1,1,1))
    kinds = KindTable([1], z, z, z, z.astype(bool), [0], [0.0], [0], [0.0], device=device)
    cfg = integrate.StepConfig(implicit=True, cg_iters=a["cg_iters"], jvp="analytic", eta=p.get("fluid.eta_solvent"))
    return capture_mechanics(out, world, kinds, cfg, a, device, inputs["render"], "filament")


def motor(out, inputs, device):
    from aleph.cell.params import Params
    from aleph.physics import integrate
    from dev.experiments.ladder.rung4b_pair import build
    p, a = Params.load(inputs["spec"]), inputs["motor"]
    world, kinds, g = build(device, p, a["stroke_sign"], True, occupied=True, seed=a["seed"])
    cfg = integrate.StepConfig(implicit=True, cg_iters=a["cg_iters"], jvp="fd", tangent="exact",
              eta=p.get("fluid.eta_solvent"), candidates={0:[g["ranges"]["f1"],g["ranges"]["f2"]]})
    return capture_mechanics(out, world, kinds, cfg, a, device, inputs["render"], "motor")


def fluid(out, inputs, device):
    from aleph.cell.params import Params
    from aleph.physics import fluid_mac as fm
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    p, a = Params.load(inputs["spec"]), inputs["fluid"]
    grid = fm.MacGrid(box_min=a["box_min_um"], box_max=a["box_max_um"], dx=a["dx_um"],
                      eta=p.get("fluid.eta_solvent"), device=device)
    pos = wp.array(a["force_positions_um"], dtype=wp.vec3d, device=device)
    force = wp.array(a["force_pN"], dtype=wp.vec3d, device=device)
    fm.spread(grid, pos, force, len(a["force_pN"]))
    residual = fm.solve(grid, a["iterations"], inner=a["inner"])
    u = [x.numpy() for x in grid.u]
    pressure = grid.p.numpy()
    np.savez(out / "raw_field.npz", ux=u[0], uy=u[1], uz=u[2], pressure=pressure,
             origin=grid.origin, dx=grid.dx, force_positions=a["force_positions_um"], force=a["force_pN"])
    if not all(np.isfinite(x).all() for x in u):
        raise FloatingPointError("nonfinite MAC velocity; raw field retained")
    centered = [(np.take(v, range(v.shape[d]-1), axis=d)+np.take(v, range(1,v.shape[d]), axis=d))/2 for d,v in enumerate(u)]
    ix = centered[0].shape[2]//2
    ux, uy = centered[0][:,:,ix], centered[1][:,:,ix]
    xx = grid.origin[0] + (np.arange(ux.shape[0])+.5)*grid.dx
    yy = grid.origin[1] + (np.arange(ux.shape[1])+.5)*grid.dx
    fig, ax = plt.subplots(figsize=(8,6))
    speed = np.sqrt(sum(v[:,:,ix]**2 for v in centered))
    mesh = ax.pcolormesh(xx, yy, speed.T, shading="nearest", cmap="magma")
    ax.quiver(xx, yy, ux.T, uy.T, color="white", alpha=.75)
    fig.colorbar(mesh, ax=ax, label="Recorded fluid speed [um/s]")
    ax.set(xlabel="x [um]", ylabel="y [um]", aspect="equal",
           title="MAC Stokes field · steady forced diagnostic\nNo physical-time animation; cell-centred display of face velocities")
    fig.tight_layout(); fig.savefig(out / "poster.png", dpi=140); plt.close(fig)
    shutil.copyfile(out / "poster.png", out / "plot.png")
    write_json(out / "metrics.json", dict(status="recorded", case="fluid", parameters=a,
        classification="EXAMPLE isolated steady boundary problem; not native-cell validation", verdict=None,
        physical_time=False, residuals=list(map(float,residual)),
        max_speed_um_s=float(np.sqrt(sum(v*v for v in centered)).max()),
        cells=list(grid.cells), velocity_storage="staggered face fields", nonfinite=0,
        limitations=["Solver residuals are reported without a pass threshold.",
                     "Display averages neighboring face values; raw staggered fields are preserved.",
                     "Opposed external point forces drive a no-slip box; no cell is simulated."]))
    return "recorded"


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--out", required=True)
    ap.add_argument("--commit", required=True)
    ap.add_argument("--device")
    ap.add_argument("--inputs", default=str(Path(__file__).with_name("visual_atlas_inputs.json")))
    ap.add_argument("--cases", nargs="+", choices=["fluid","filament","motor"], default=["fluid","filament","motor"])
    a = ap.parse_args()
    if not os.environ.get("SLURM_JOB_ID"):
        raise RuntimeError("Slurm allocation required")
    actual = subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
    dirty = subprocess.check_output(["git", "status", "--porcelain", "--untracked-files=no"], text=True).strip()
    if actual != a.commit or dirty:
        raise RuntimeError("Engine must match the clean declared commit")
    wp.init()
    devices = wp.get_cuda_devices()
    if not devices:
        raise RuntimeError("CUDA device required; no CPU fallback")
    device = wp.get_device(a.device) if a.device else devices[0]
    if not device.is_cuda:
        raise RuntimeError("CUDA device required")
    inputs = json.loads(Path(a.inputs).read_text())
    out = Path(a.out); out.mkdir(parents=True, exist_ok=True)
    metadata = dict(engine_commit=a.commit, harness_sha256=hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
        inputs=inputs, inputs_sha256=hashlib.sha256(Path(a.inputs).read_bytes()).hexdigest(),
        spec_sha256=hashlib.sha256(Path(inputs["spec"]).read_bytes()).hexdigest(),
        device=str(device), device_name=device.name, slurm_job=os.environ["SLURM_JOB_ID"], created_utc=time.strftime("%Y-%m-%dT%H:%M:%SZ",time.gmtime()), warp_version=wp.__version__, cases={})
    write_json(out / "manifest.json", metadata)
    for case in a.cases:
        target = out / case; target.mkdir(exist_ok=True)
        try:
            metadata["cases"][case] = globals()[case](target, inputs, str(device))
        except Exception:
            metadata["cases"][case] = "failed"
            write_json(target / "metrics.json", dict(status="failed", error=traceback.format_exc(), verdict=None))
        write_json(out / "manifest.json", metadata)
    return 0 if all(s == "recorded" for s in metadata["cases"].values()) else 1


if __name__ == "__main__":
    raise SystemExit(main())
