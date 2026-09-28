# Showcase render set, half (C2; c7 23:4x, the PI's "렌더링 될 때 미세융모 있는 거랑 없는 거랑 엄청 달라보이잖아")

Every panel's caption carries its evidence, read (the gallery rule, item 15): class, scale, build and card. The shots
were made with `aleph.studio.viewer` in headless Chrome, ANGLE Metal (the Mac GPU), at full resolution with nothing
sampled. The pane UI is hidden (`bare`); the caption stays, and so does a colour legend where one is in use. No
tension or force magnitude is on screen (STATE (c)17).

## Microvilli ON vs OFF, the same camera and saved frame k = 10

| file | panels |
|---|---|
| `mv_onoff_whole.png` (4008 × 1157) | the whole cell, membrane translucent: ON left, OFF right |
| `mv_onoff_surface.png` | the membrane and the microvillus cores only |
| `mv_{on,off}_{whole,surface}.png` | the single panels (2000 × 1157) |

- ON: `qs_mini_mv_20260925_050710_e097d4dca`, the VESSL copy mv3.
  - 107,100 microvillus nodes; face-area rounds 10.
  - No score.json in the download, so no class is assigned; 12 steps in the ledger.
  - Step 1's force0 = force is the face-area rounds' ledger artifact, not a stalled solve.
- OFF: `qs_mini_speed_before_20260925_050750_556ee505a`: 0 of 30 steps CONVERGED (FORCE-ACCEPTED); face-area rounds 1.
- Camera: 13 µm from each page's membrane centroid, θ 0.9, φ 1.15. Set by the view hash (`tgt`, `cam` with r = 13 µm /
  the page's bounding radius), so the physical distance is equal.
- Viewer dirs: ON is C1's r_mv3 (e097d4dca); OFF is built with `render_archive_record.py view` at 556ee505a.
  `mv_onoff_prep.json` has both pages' evidence, radii and targets.

## MPA, mpa3-0925-976adffe3 (`qs_mini_mpa_fi200_…_976adffe3`, 50 steps, every step saved)

| file | what |
|---|---|
| `mpa_overview.mp4` (50 frames, 10 fps) + `mpa_overview_k01/k50.png` | side view: membrane, envelope, pipette; colour = part |
| `mpa_mouth.mp4` + `mpa_mouth_k01/k50.png` | the mouth, a display clip through the pipette axis; colour = displacement since step 1 on ONE scale, 0–40 nm (#dmax), legend shown |

- Per-frame caption: the step, the suction set (10 → 500 Pa ramp) and the disc pressure, from the ledger's `suction` rows.
- Class: 0 of 50 steps reached the declared tol_F (the ledger against declared.json; the download has no score.json):
  FORCE-ACCEPTED.
- Label: "pipeline validation only — far end open: bore ΔP ≈ 1/3 of set (C5 52c213bc3)".
- **Read from the frames:** the membrane stays 0.73 µm from the pipette at steps 1, 25 and 50 (the closest node pair).
  **The cell never reaches the mouth, so nothing is aspirated in this run.** The membrane moves at most 38 nm over the
  ramp (p99 11 nm).
- The legend's "frame max" (~12 µm) is over ALL nodes (free bodies included), not the membrane.

Scripts: `pair_prep.py`, `pair_render.py`, `mpa_movies.py` (the driver calls, as run).
