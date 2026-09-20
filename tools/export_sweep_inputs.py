"""Export committed canonical Params/Prior declarations without importing physics.

All four source blobs come from one resolved Git commit. Minimal package shells
avoid cell/__init__.py, whose convenience exports import the assembly runtime.
No sampling, kernel execution, range invention or prior reconciliation occurs.
"""
from __future__ import annotations

import argparse
import dataclasses
import hashlib
import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import types

PATHS = ("aleph/cell/params.py", "aleph/cell/prior.py",
         "aleph/cell/spec.example.toml", "aleph/cell/prior.toml")


def export(engine: Path, ref: str) -> dict:
    """Read one commit's input semantics; return provenance and all parameter rows."""
    def git(*args):
        return subprocess.check_output(["git", "-C", str(engine), *args])
    commit = git("rev-parse", f"{ref}^{{commit}}").decode().strip()
    blobs = {p: git("show", f"{commit}:{p}") for p in PATHS}
    saved = {n: m for n, m in sys.modules.items() if n == "aleph" or n.startswith("aleph.")}
    for n in saved:
        del sys.modules[n]
    try:
        with tempfile.TemporaryDirectory(prefix="aleph-input-export-") as temp:
            root = Path(temp)
            for path, content in blobs.items():
                dest = root / path
                dest.parent.mkdir(parents=True, exist_ok=True)
                dest.write_bytes(content)
            for name, folder in (("aleph", root / "aleph"), ("aleph.cell", root / "aleph/cell")):
                module = types.ModuleType(name)
                module.__path__ = [str(folder)]
                sys.modules[name] = module
            modules = {}
            for short in ("params", "prior"):
                name = f"aleph.cell.{short}"
                spec = importlib.util.spec_from_file_location(name, root / f"aleph/cell/{short}.py")
                module = importlib.util.module_from_spec(spec)
                sys.modules[name] = module
                spec.loader.exec_module(module)
                modules[short] = module
            params = modules["params"].Params.load(root / PATHS[2])
            prior = modules["prior"].Prior.load(params, root / PATHS[3])
            inputs = []
            for name in sorted(params.names()):
                entry = params.entry(name)
                why = prior.why_not_axis(name)
                inputs.append(dict(name=name, unit=entry.unit, tag=entry.tag,
                    value=params.get(name), range=list(entry.range) if entry.range else None,
                    bound=entry.bound, source=entry.source, samplable=why is None,
                    sampling_refusal=why, prior=dataclasses.asdict(prior.rows[name])))
            if any(n.startswith("aleph.physics") or n == "warp" for n in sys.modules):
                raise RuntimeError("Exporter must not import a physics runtime")
            return dict(schema="aleph-declared-inputs-v1", source=dict(commit=commit,
                files=[dict(path=p, sha256=hashlib.sha256(b).hexdigest()) for p,b in blobs.items()],
                source_text_status="Verbatim parameter provenance, not an independently audited literature claim.",
                execution="Parsed committed declarations only; no sampling or simulation."),
                counts=dict(inputs=len(inputs), explicit_swept=len(params.sweep_axes()),
                            samplable=len(prior.axes()), targets=len(prior.targets())), inputs=inputs)
    finally:
        for name in list(sys.modules):
            if name == "aleph" or name.startswith("aleph."):
                del sys.modules[name]
        sys.modules.update(saved)


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--engine", type=Path, required=True)
    ap.add_argument("--ref", default="HEAD")
    ap.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1]/"data/sweep-inputs.json")
    args = ap.parse_args()
    result = export(args.engine, args.ref)
    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(json.dumps(result, indent=2, ensure_ascii=False, allow_nan=False)+"\n")
    print(json.dumps(dict(commit=result["source"]["commit"], **result["counts"])))


if __name__ == "__main__":
    main()
