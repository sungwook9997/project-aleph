# captures_94 — per-part captures of the native record (showcase 94; C1, 2026-09-25)

Record `qs_long_bt_nogrowth_20260925_040000_b496c1527` (n 7,545,139; 150 steps; 15 saved frames). Evidence, read from
its score.json and ledger: **FORCE-ACCEPTED RUN** · native · b496c1527 · growth off · motors ON (NMII 217,424 nodes).
Its own caveat: 0 of 150 steps converged (FORCE-ACCEPTED). **These figures are not a physics conclusion.**

Each `vN_*.png` is the studio viewer's own page (`aleph.studio.viewer`), shot in headless Chrome on the Mac GPU (ANGLE
Metal) at 1920×1200 with the viewer UI and caption hidden (`render_shots.py --bare`); every node, segment and face of
the page is drawn (nothing sampled; fat lines). Colours are family / relation kind only — no force or tension. Each
`vN_*.json` sidecar carries the record, commit, step, layers shown and hidden, the view hash, the page's counts, the
renderer, the colour legend (families from the page; relation kinds = the viewer's hsv(frac(k·0.618), 0.78, 1)), the
evidence string and the caveat.

| still | part | view |
|---|---|---|
| v1_erm | ERM tethers | edge-on cut through the centre at the rim; cortex faded to 0.3; erm relations |
| v2_linkers | crosslink (α-actinin) + filamin | a 0.6 µm slab of the cortex shell seen from outside; membrane hidden |
| v3_aster | MT, motors, cargo | the aster from the MTOC side; kinesin / dynein (+ cargo) relations; nucleus faded |
| v4_nucleus | nucleus | cut-away through the nucleus centroid: envelope, lamina, chromatin |
| v5_whole | whole cell | coloured by family; instruments hidden |

Correction (23:2x): the first sidecars carried "defective build: crossbridge owners shifted" — false, from a script
copy run outside the repository (b496c1527 carries the fix, 3fb095196); recomputed, noted in each sidecar.
Reproduce: `render_archive_record.py view <record> <dir>` at b496c1527, then
`dev/experiments/captures_94.py <dir> <record> aleph/outputs/renders_20260925/captures_94`.
