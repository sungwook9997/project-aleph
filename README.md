# Project Aleph — visual evidence atlas

A separate website for the current Project Aleph engine. The old ffn_cellsim
website is a presentation reference only; its physics, figures, recordings and
validation claims are not Aleph evidence.

## Current state

The sweep-centred atlas now includes expandable mechanism explanations and
derivations, implementation and population-relation maps, and a searchable full
input register. The declaration snapshot is `76491cab5358d5044eb3c261aaa3617d862e118b`:
356 cell inputs plus 76 context/instrument/operating-point inputs. See
[scope and reproducible exports](docs/SWEEP_ATLAS.md). These are declarations,
not an assertion that every axis has been swept or every declared process wired.

Three historical native membrane conditions add three graphs and three raw-frame
videos. Their old build defects and incomplete deployment provenance are displayed;
they do not establish current-engine or external-paper agreement.

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

## Code and paper-data connections

Every component now identifies the relevant builder/common operators and a proposed
measurement protocol. `data/implementation.json` records exact capture-source
hashes. The public ffn_cellsim default branch inspected on 2026-09-20 does not
contain these canonical modules; links must not imply otherwise.

The earlier capture expansion contains 19 unique plots: 3 original diagnostics, 5 additional motion/
fluid diagnostics, 9 full active-population geometry distributions, and 2 paper
observation plots. There are 4 video views of **2 physical runs**; synchronized
analysis views are not independent experiments. This expansion performs no new
physics and introduces no fitted comparison or pass threshold.

Paper observations are from Tsujita et al. 2021 (96 original workbook cells checked)
and Hosseini et al. 2021 (14 selected breast-cell condition medians from Tables 1–2).
Their source audits are OK; original identities and hashes are in
`data/literature/provenance.json`. Tether force [pN] and author-derived cortical
tension [mN/m] remain distinct. Matched native experiments are not yet recorded, so
no engine-agreement error or validation score is published.

Reproduction of postprocessing requires the recorded native geometry archive,
source papers and the exact captured engine checkout. `tools/expand_evidence.py`
uses explicit local input paths, then `tools/link_comparisons.py` adds the comparison
protocols. Browser playback and reference panels were inspected locally.
