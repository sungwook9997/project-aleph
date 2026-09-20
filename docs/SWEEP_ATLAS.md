# Sweep-centred mechanism atlas

The public page now starts from mechanisms rather than grouping every phenomenon under a cell part. Expandable cards connect a derivation, implementation, declared inputs, intended observations and the available records. An explicit frontier separates declared inputs from unconnected processes.

Inputs are a commit-pinned export of Params and Prior, not adopted biological truths. All 356 cell-file rows are published, plus 76 context/instrument/operating-point rows. SOURCED rows may have a distribution; EXAMPLE targets without admissible bands remain targets but cannot yet be sampled; bindings follow another input. There are 20 explicit SWEPT cell rows and 47 samplable cell axes in this snapshot. Neither count describes completed experiments.

The interactive dependency map is an editorial implementation dependency map, not an inferred correlation or causal-effect estimate. Population relations come directly from the canonical census; their presence does not establish occupied bonds in a run. All 77 input bindings are exported separately. Derivations state when a formula is a restricted external reference instead of the runtime update.

The historical membrane comparison uses raw X0/X100/X1000 JSONL and 20 stored position frames per arm, not current source. It includes the previous geometry defect and missing ERM coupling, unestablished host receipt, raw/report discrepancies, and the zero-based record timestamp convention. No current-version validation or paper agreement is claimed. These are three conditions, not biological prior exploration or an exhaustive sweep.

## Rebuild the declarations

Use Python 3.11+; no simulation or CUDA needed. Run the following with the engine checkout supplied explicitly:

```
python tools/export_sweep_inputs.py --engine /path/to/ffn_cellsim --ref 76491cab5358d5044eb3c261aaa3617d862e118b --out data/sweep-inputs.json
python tools/export_additional_inputs.py --engine /path/to/ffn_cellsim
python tools/export_relations.py --engine /path/to/ffn_cellsim
python tools/build_mechanisms.py --engine /path/to/ffn_cellsim
python tools/build_site.py --out /fresh/output/path
```

`data/mechanism-definitions.json` contains the editorial explanations and selectors. A source-version change needs a fresh implementation review before updating that file's commit. The build refuses mismatched snapshots, drifted input values, missing linked media, unknown relation endpoints and unmapped samplable/SWEPT cell axes.

## Outstanding evidence

Most mechanisms still lack matched multi-condition trajectories and external experimental overlays. Existing geometry images and 12-microsecond diagnostic clips are not substitutes. No new physical run, model, prior, threshold or parameter-source change was made during this website revision. Current native experiment execution and appropriate observation windows remain separate work.

## Website verification

Build validation checks the declared-input snapshot and media links, including complete mapping of samplable/SWEPT cell axes. Browser checks covered opening a bending derivation, parameter search and bound-target discovery, selecting the motor dependency view, selecting NMII in the physical relation map, and loading all three condition-video streams (4 seconds each, no media errors). A source review corrected the distinction between free attachment and live-bond jumps, included the compliance-adjusted transition load, and corrected two historical chart titles to match the plotted quantities. These checks validate presentation, not physics.
