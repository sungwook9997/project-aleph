# Project Aleph — visual evidence atlas

A separate website for the current Project Aleph engine. The old ffn_cellsim
website is a presentation reference only; its physics, figures, recordings and
validation claims are not Aleph evidence.

## Current state

First capture batch: two 120-step isolated diagnostic videos (12 µs each), one
steady Stokes field, three diagnostic plots, and nine nonempty population geometry
images. Five populations are absent in the unchanged default input. Surface,
fluid–structure coupling, contact and growth dynamics remain pending. Independent
reference comparisons and full native cell dynamics are **not yet provided**.
The custom domain awaits registration approval.

Captures ran on the shared workstation RTX 4090 under Slurm jobs 271 and 272.
The second job adjusted only camera framing for unclipped geometry views.
Both allocations ended and returned the card. No engine model, parameter or
validation threshold was changed.

The source snapshot selected for captures is
`bb597f087667edd55467bf262ef704b7acaa6e44`; runtime modules are
`aleph/physics`, `aleph/cell` and `aleph/studio`. Capture utilities live outside the
engine and record their own hashes. They must run on an allocated CUDA GPU under
the engine project's current charter; local syntax checks are not GPU validation.

## Evidence presentation

Each entry pairs an observation with a measurement description, source and scope.
A geometry image has zero physical steps. An isolated diagnostic is not a native
cell result. Camera motion and interpolated frames must not imply simulated
motion. Failed or absent recordings stay visibly incomplete.

`data/catalog.json` is the site's content source. Static assets are copied to the
public output only after referenced files are checked:

```sh
python3 tools/build_site.py --out _site
python3 -m http.server 8019 --directory _site
```

Use a fresh output directory on each build. GitHub Pages uses the same build.
Only the website assets, `data` and `media` are published; tools and local working
files are excluded.
