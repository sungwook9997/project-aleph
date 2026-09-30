# Archived run context: advisory review

Captured 2026-09-28T18:10:55.256491+00:00. Codex advisory metadata audit; not verification authority, physics validation, or a source upgrade.

The saved atlas remains at `24b3a44cbd33dd34cde338483be19638aec1be1c`; its spec SHA-256 is `f288ede3105affb05bb19d3e57eeb1a0c16138f28288acbe0ebcf0913daa52a7`. The live root was `c98c8207115b954edc17fe32824af4d0ba1516ee` at capture and its spec still matches that byte content.

Six bounded records were selected. This is not an inventory of every latest run. Only metadata, input snapshots and versioned source text were read; no runtime was imported and no raw arrays or physics were executed.

The main consumer risk is inherited evidence: a source tag can survive synthetic geometry edits and explicit driver ablations. Keep the original template, run template, effective value, runtime configuration, intervention, construction and observation separate.

| Record | Population and completion class | Reported nodes | Source certainty |
|---|---|---:|---|
| native_4090_20260923 | native_population; completed_six_steps_approximate_solver_not_validated | 7545139 | manifest_stamp_and_prior_report_source_check_claim; audit does not rerun deployed-source check |
| native_mv94_20260927 | native_labelled_construction_only; invalid_no_steps | 9018635 | declared_manifest_stamp_resolves_locally_not_independently_deployment_verified |
| mini_M100_20260929 | mini_development; force_accepted_development_only | 1428028 | declared_manifest_stamp_resolves_locally_not_independently_deployment_verified |
| unit_U2X0_20260929 | cortex_unit_development; invalid_infeasible_start_no_steps | 316721 | declared_manifest_stamp_resolves_locally_not_independently_deployment_verified |
| unit_U1W100s2_20260929 | nucleus_unit_development; six_ledger_steps_no_local_score | 61277 | declared_manifest_stamp_resolves_locally_not_independently_deployment_verified |
| plate_mv_demo_20260928 | mini_development_demo; source_unresolved_driver_end_unknown_scorer_invalid | 1541802 | unresolved_commit_null_directory_suffix_not_authority |

Node counts are reported construction quantities. They are not fitted parameter estimates or independent observations. Range maps contain nested subsets. MINI/unit records cannot support physical conclusions.

## Parameter changes and interventions

All six parameter snapshots retain `sim.dt=1e-5 s`; runtime metadata declares `dt=0.01 s`. Treat runtime time-step context separately, not as proof that the parameter row was mutated.

| Record | Parameter | Atlas template | Run template | Effective snapshot | Origin / unit |
|---|---|---:|---:|---:|---|
| native_4090_20260923 | `fluid.cells_multiple` | 1 | 16.0 | 16.0 | scenario_template_value; 1 |
| native_4090_20260923 | `fluid.staggered` | 0 | 1 | 1.0 | scenario_template_value; 1 |
| native_mv94_20260927 | `fluid.cells_multiple` | 1 | unresolved | 16.0 | effective_snapshot_origin_not_resolved; 1 |
| native_mv94_20260927 | `fluid.staggered` | 0 | unresolved | 1.0 | effective_snapshot_origin_not_resolved; 1 |
| native_mv94_20260927 | `membrane.excess_area` | 0.15 | unresolved | 0.36 | effective_snapshot_origin_not_resolved; 1 |
| native_mv94_20260927 | `microvillus.areal_density` | 0.0 | unresolved | 2.2 | effective_snapshot_origin_not_resolved; 1/um^2 |
| native_mv94_20260927 | `microvillus.length` | 1.0 | unresolved | 0.3 | effective_snapshot_origin_not_resolved; um |
| mini_M100_20260929 | `cell.radius` | 7.5 | 3.375 | 3.375 | scenario_template_value; um |
| mini_M100_20260929 | `dynein.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| mini_M100_20260929 | `fluid.cells_multiple` | 1 | 16.0 | 16.0 | scenario_template_value; 1 |
| mini_M100_20260929 | `fluid.staggered` | 0 | 1 | 1.0 | scenario_template_value; 1 |
| mini_M100_20260929 | `footprint.z_basal` | -7.0 | -3.15 | -3.15 | scenario_template_value; um |
| mini_M100_20260929 | `kinesin.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| mini_M100_20260929 | `microtubule.count` | 500 | 101 | 101.0 | scenario_template_value; 1 |
| unit_U2X0_20260929 | `cell.radius` | 7.5 | 1.75 | 1.75 | scenario_template_value; um |
| unit_U2X0_20260929 | `crosslink.k_off0` | 0.066 | 0.066 | 0.0 | explicit_driver_ablation_via_set; 1/s |
| unit_U2X0_20260929 | `dynein.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| unit_U2X0_20260929 | `fluid.cells_multiple` | 1 | 16.0 | 16.0 | scenario_template_value; 1 |
| unit_U2X0_20260929 | `fluid.staggered` | 0 | 1 | 1.0 | scenario_template_value; 1 |
| unit_U2X0_20260929 | `footprint.z_basal` | -7.0 | -1.6333 | -1.6333 | scenario_template_value; um |
| unit_U2X0_20260929 | `kinesin.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| unit_U2X0_20260929 | `microtubule.count` | 500 | 101 | 101.0 | scenario_template_value; 1 |
| unit_U1W100s2_20260929 | `cell.radius` | 7.5 | 3.375 | 3.375 | scenario_template_value; um |
| unit_U1W100s2_20260929 | `dynein.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| unit_U1W100s2_20260929 | `fluid.cells_multiple` | 1 | 16.0 | 16.0 | scenario_template_value; 1 |
| unit_U1W100s2_20260929 | `fluid.staggered` | 0 | 1 | 1.0 | scenario_template_value; 1 |
| unit_U1W100s2_20260929 | `footprint.z_basal` | -7.0 | -3.15 | -3.15 | scenario_template_value; um |
| unit_U1W100s2_20260929 | `kinesin.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| unit_U1W100s2_20260929 | `microtubule.count` | 500 | 101 | 101.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `cell.radius` | 7.5 | 3.375 | 3.375 | scenario_template_value; um |
| plate_mv_demo_20260928 | `dynein.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `fluid.cells_multiple` | 1 | 16.0 | 16.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `fluid.staggered` | 0 | 1 | 1.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `footprint.z_basal` | -7.0 | -3.15 | -3.15 | scenario_template_value; um |
| plate_mv_demo_20260928 | `kinesin.count` | 1000 | 91 | 91.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `membrane.excess_area` | 0.15 | 0.36 | 0.36 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `microtubule.count` | 500 | 101 | 101.0 | scenario_template_value; 1 |
| plate_mv_demo_20260928 | `microvillus.areal_density` | 0.0 | 2.2 | 2.2 | scenario_template_value; 1/um^2 |
| plate_mv_demo_20260928 | `microvillus.length` | 1.0 | 0.3 | 0.3 | scenario_template_value; um |

U2X0 is the direct override example: its stamped template has `crosslink.k_off0=0.066 /s`; archived queue line 10 passes `--set crosslink.k_off0=0`; the effective snapshot stores zero with `tag=SOURCED`. This is an explicit ablation, not literature support for zero. The unit stops at an infeasible start and has no steps.

MINI geometry comes from edited templates: `cell.radius=3.375 um`, MT count 101 and kinesin/dynein counts 91. The cortex unit further uses radius 1.75 um. The original radius source text still describes approximately 7.49 um. Template comments call this development scaling; preserve that qualification.

## Qualifications that must survive ingestion

- **inherited_source_tag**: SOURCED tags survive template geometry changes and driver overrides. The tag is legacy metadata, not support for the effective value.
- **params_presence_not_activity**: The serializer emits every Params name. The nucleus unit retains cortex/motor parameters but its realised ranges have only envelope, lamina, chromatin, IF and plate carriers.
- **clock_shadow**: All six retained sim.dt rows are 1e-5 s while runtime metadata says 0.01 s. Runtime conditions/CLI must be retained separately.
- **declared_force_not_applied**: Native-mv declares plate_force_pN=2951 while features.external_loads says none set. Do not use the declaration as applied load or response.
- **fluid_rows_not_solvent**: fluid input rows persist when features.options.fluid=false; later core records explicitly declare no solvent.
- **schema_semantics**: Removed cortex.areal_density/contour and crosslink/filamin.k_on are not zero or proven synonyms of later inputs. Later attach.rate=0 template text marks an unread transition field, with rates derived from k_plus.
- **parameter_provenance_loss**: raw/params.json drops source, file_value, range, bound and intervention origin. Params.provenance exposes more fields, but --set ablations do not automatically set ablated=True.
- **no_native_promotion**: The latest native-labelled candidate has no steps. Completed native-population 09-23 uses coarse surface mode and fast OU, and sampled records. Neither is external parameter evidence or a new physical validation.
- **unresolved_native_template**: Native-mv points to /home/sungwook/aleph_hold/inputs/spec_face_T6G_native_mv_94.toml; that snapshot was not resolved in the bounded archive search. Its effective input values are known, their template/override origin remains unknown.
- **source_and_transfer_separate**: A local git object, a manifest commit string and a transfer hash match are distinct claims. No audit of deployed source equality was rerun.

## Schema and archive details

| Record | Effective rows | Added vs atlas | Removed vs atlas |
|---|---:|---:|---:|
| native_4090_20260923 | 773 | 67 | 0 |
| native_mv94_20260927 | 803 | 101 | 4 |
| mini_M100_20260929 | 800 | 98 | 4 |
| unit_U2X0_20260929 | 801 | 99 | 4 |
| unit_U1W100s2_20260929 | 801 | 99 | 4 |
| plate_mv_demo_20260928 | 803 | 101 | 4 |

The JSON stores every added and removed name and every differing common resolved value with its exact evidence file/key and advisory status. Later snapshots remove `cortex.areal_density`, `cortex.contour`, `crosslink.k_on`, and `filamin.k_on`. Their replacements require semantic mapping; a missing input is not zero.

## Record evidence

### native_4090_20260923

Directory: [[local path omitted]

Manifest source claim: `929ca0c253f0cb34ede8740422585ea20887fa4f`. Resolved local object: `929ca0c253f0cb34ede8740422585ea20887fa4f`. Transfer status: `not_resolved_in_bounded_receipt_scan`.

- [run_manifest.json]([local path omitted] SHA-256 `900f6e11a424b76582bd233c25202d136bc5844d45ce2c02e455d0f40d3478c7`
- [manifest.json]([local path omitted] SHA-256 `b7bbfed13706dd754fe74d9909da18533dc651498b61e9529b992d9e0b3c48c9`
- [arm_summary.json]([local path omitted] SHA-256 `dd0ebf16f900b851399d00090fee0d6507ad6fd03dceb8275bd332243d0a41b3`

### native_mv94_20260927

Directory: [[local path omitted]

Manifest source claim: `e097d4dca`. Resolved local object: `e097d4dca5182f430bee7277b694d5ab82fb4e29`. Transfer status: `not_resolved_in_bounded_receipt_scan`.

- [raw/params.json]([local path omitted] SHA-256 `855537c17ce3d2a25883f9cf42309815863c715f9d0d3efbfdad9f81a9331bf1`
- [raw/manifest.json]([local path omitted] SHA-256 `3930ccb2e096874088c30f683adaf5040539c37312e13dd4117625065c8114a8`
- [declared.json]([local path omitted] SHA-256 `37763c88890d0e5441aba9348f5afceb5f89ff20095f4dbde21cb0ce5fb5f0c5`
- [ledger.json]([local path omitted] SHA-256 `f6480cde7277e08733499fc0ade5ac74df9131efdf7bd3e718b739e6e0468874`
- [score.json]([local path omitted] SHA-256 `8de952d2ce547f20893cddf2c7be9b7e4fe2ce8adbb73d6c6cdbb162244f4608`

### mini_M100_20260929

Directory: [[local path omitted]

Manifest source claim: `a33d29a0f`. Resolved local object: `a33d29a0fb1cb60fc915790cc86778a72da95008`. Transfer status: `matching_metadata_entries_found_not_blanket_batch_verification`.

- [raw/params.json]([local path omitted] SHA-256 `b56f1b82019a9ba267d37ca35deb0e867a3c445e3fa744e80b7018c286c6f909`
- [raw/manifest.json]([local path omitted] SHA-256 `b3530f798e07d249350ba7be29e5901b0789a76cc03fd1a85a165cfa118b19fa`
- [declared.json]([local path omitted] SHA-256 `7ab8230e769b8aade0aad2c7f9e5f441c590643b8ebb08b24098c569e5494355`
- [ledger.json]([local path omitted] SHA-256 `1f1d5110647ff657b66a685cd8259c8ec82ac9175e9422862a08d3b251b6b842`
- [score.json]([local path omitted] SHA-256 `e3d54b2acd4adbdb5c46c06fcb106c3f4284670269306fe8b913114229855fae`

### unit_U2X0_20260929

Directory: [[local path omitted]

Manifest source claim: `1f04609db`. Resolved local object: `1f04609db309389789d31b44c70ae93d31fd6df8`. Transfer status: `matching_metadata_entries_found_not_blanket_batch_verification`.

- [raw/params.json]([local path omitted] SHA-256 `7cf3933f318b929b3414ca2ad28c8c530eb4dea0ac76017a69fa79409c2965df`
- [raw/manifest.json]([local path omitted] SHA-256 `90929f15061f565f2bac71fe84b84167edc2f4e145acde06776dab77c35f4601`
- [declared.json]([local path omitted] SHA-256 `8a0042650d48b29146ad8b15f606c850a286aa0a117a64eda29898888d0c0f01`
- [ledger.json]([local path omitted] SHA-256 `febccdb894ef7f93f83f9f73ce3091c575cc2a2631f31447401df2eb3f1ada34`
- [score.json]([local path omitted] SHA-256 `66b6448eccb911f976bb77baa97480cda478509cc7a3f76df91d9232541c51f7`

### unit_U1W100s2_20260929

Directory: [[local path omitted]

Manifest source claim: `1f04609db`. Resolved local object: `1f04609db309389789d31b44c70ae93d31fd6df8`. Transfer status: `not_resolved_in_bounded_receipt_scan`.

- [raw/params.json]([local path omitted] SHA-256 `9a2852d2a5db3a6802b4f1c3ff4436bbdba7f9cdf185c2343afac883423a147a`
- [raw/manifest.json]([local path omitted] SHA-256 `1f09c113858bad30814b1d5c750b58e8ca004e1676f9cae8ef30f57199b23d7d`
- [declared.json]([local path omitted] SHA-256 `9fd36ffed79707f2cacf2d95c33655869d3254667a210e7467ff99aae134a910`
- [ledger.json]([local path omitted] SHA-256 `731c8babdb49bcfb115962756f052ebc95a2717e7970ee57b6a2e1907d89f565`

### plate_mv_demo_20260928

Directory: [[local path omitted]

Manifest source claim: `None`. Resolved local object: `None`. Transfer status: `not_resolved_in_bounded_receipt_scan`.

- [raw/params.json]([local path omitted] SHA-256 `4059b4f58cab22efd6b0d2840b970fb3677a93da0746f2223171189b6de62631`
- [raw/manifest.json]([local path omitted] SHA-256 `99d8a3c531533891991c53911f5410eb7dd4e8c7bc44892ca7334ab82a53a3ee`
- [manifest.json]([local path omitted] SHA-256 `d6137f99628b94b70e47f1df12bd6fee374a3ac518d70d8bc7eb43f5ae4270a8`
- [run_manifest.json]([local path omitted] SHA-256 `605a6d2792b171c1ec77f6b186e8b8a35ff81d933749c37e94827f5906a94bed`
- [end.json]([local path omitted] SHA-256 `ca885b01144c0b707afc934111a4cb3e5d0d28b1e07749e8566a15bb30f937ed`
- [score.json]([local path omitted] SHA-256 `b2be581ceb35e9913fdbd4fdac124e1813003b04f4e77493a19deb7bb1194a2d`
- [calls.jsonl]([local path omitted] SHA-256 `0f6da38eaf1a8903588344725fd166aae9d94cfeab69a2cdeb45dfb761daa2d0`

## Receipt and verification limits

Scanned 171 metadata JSON receipts under 20260927–20260929, with a 20 MB per-file bound. A matched receipt establishes a recorded local hash/size match for named entries only; it does not certify a whole directory or its deployed code.

MINI M100 has matching receipt entries. U2X0 has matching entries in the unitU2 receipt, whose coverage must not be extended to other arms. Native-mv and U1W100s2 metadata were not resolved in this bounded receipt scan. The native-mv-named receipt examined earlier covered only one Slurm log. The 09-23 source/check and transfer closeout remain prior report claims; this audit did not replay remote checks.

Validation: saved atlas spec equals its versioned input hash; 9 prior-audit hashes were independently rechecked and all match. All 706 saved atlas values match the versioned spec; all 43 indexed metadata hashes and six source-object hashes were rechecked after generation. No commits were made.

Full machine-readable evidence, source-object hashes, parameter differences and receipt entry keys: [run_context_review.json](run_context_review.json).
