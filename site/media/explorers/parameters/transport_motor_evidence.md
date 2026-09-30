# Transport motor evidence review

This is an advisory review of 20 valued, non-transition `EXAMPLE` rows: 10 kinesin and 10 dynein inputs. The frozen atlas represents commit `24b3a44cbd33dd34cde338483be19638aec1be1c`. The companion JSON preserves every raw declaration, location, selected-declaration fingerprint, and matching KB parameter record.

There are nine primary-source cards: eight new inspections and a fuller inspection of Schnitzer 2000 already represented by P10. P08–P10 and the earlier Gennerich cross-check are fingerprinted historical reviews, **not additional independent evidence**. None of these nine DOI candidates has a registered identity in the saved KB snapshot. All remain ineligible for training and for automatic parameter/source changes.

## What the 20 rows can currently claim

| Input | Frozen value | Evidence assessment |
|---|---:|---|
| `kinesin.count` | 1000 | Initial example. A cellular motor census and allocation to cargo versus MT sliding remain unlocated. |
| `dynein.count` | 1000 | Same population gap. Stalls or trajectories counted in an assay are not intracellular motor counts. |
| `kinesin.k` | 300 pN/µm | TM04 has a matching unit scale, but measures a one-headed rigor tether under stretching. Definition and assay transfer remain unresolved. |
| `dynein.k` | 300 pN/µm | Direct support unlocated. A kinesin tether measurement cannot source dynein. TM09 measures a motor–bead linkage response under load. |
| `kinesin.k_off0` | 1/s | TM02 reports processivity and velocity fits. A directly measured, universal zero-load 1/s rate was not located. |
| `dynein.k_off0` | 1/s | Its named reference, Schnitzer 2000, studies kinesin. This attribution mismatch does not prove that the numerical value is impossible for dynein. |
| `kinesin.k_on` | 5/s | Within-reach attachment rate remains unlocated. ATP association is a different reaction. |
| `dynein.k_on` | 1/s | Within-reach attachment rate remains unlocated. Landing frequency or a second-order association constant needs a specified conversion. |
| `kinesin.primed_fraction` | 0.5 | Explicit equal-dwell assumption. Eight-nanometre stepping and proposed substeps do not identify this fraction. |
| `dynein.primed_fraction` | 0.5 | Explicit equal-dwell assumption. Total cycle time alone leaves the split undetermined. |
| `kinesin.reach` | 0.08 µm | Structural length and free-binding capture radius differ. TM05 provides an older structural candidate; the declaration's exact Hirokawa 2009 reference remains unresolved. |
| `dynein.reach` | 0.05 µm | No direct 50 nm lattice-height or capture-radius measurement located in TM06. |
| `kinesin.run_length` | 1 µm | Approximate scale has related processivity literature. Exact conditions for the declared value remain unlocated. |
| `dynein.run_length` | 1 µm | Motor species, adaptor assembly and assay are missing. Activated DDB results do not directly source a bare-motor row. |
| `kinesin.stall_force` | 6 pN | TM01 supports the approximate force scale for its assay. This does not establish an exponential transition-rate force scale. |
| `dynein.stall_force` | 7 pN | P08 supplies limited yeast support. TM07/TM09 concern different mammalian complexes and conditions. |
| `kinesin.step` | 0.008 µm | TM03 supports dimer centroid advance under near-zero load. It does not measure each head's displacement or the current node-walk event. |
| `dynein.step` | 0.008 µm | P08 already records a distribution around this scale. Complex-centroid and individual-head steps must be distinguished. |
| `kinesin.velocity` | 0.8 µm/s | The bare name “Howard” does not locate an exact measurement. Related measurements depend on ATP, load and construct. |
| `dynein.velocity` | 1 µm/s | P09's yeast values differ, but the declaration may cite Gennerich only for stall force. TM08 shows why a general claim that 1 µm/s is impossible would be too strong. |

“Unlocated” records the bounded search result. It is not a falsity verdict.

## Primary cards

**TM01 — Svoboda & Block 1994.** Purified squid optic-lobe kinesin was studied with bead-based optical trapping at 22–23.5 °C, using 10 µM or 2 mM ATP. The reported 5–6 pN force scale belongs to this assay. The motor velocity was corrected for bead–motor linkage compliance. See Summary, Fig. 9 and Experimental Procedures. [Primary paper](https://doi.org/10.1016/0092-8674(94)90060-4).

**TM02 — Schnitzer, Visscher & Block 2000, extending historical P10.** Figs. 2 and 3 contain different sets of runs and separate velocity/processivity fits. Their force dependences differ: fitted distances are 3.7 ± 0.3 nm and 1.3 ± 0.1 nm, respectively, reported as means ± SEM. The run-length correction assumes an exponential parent distribution for runs censored by the detector. These are fitted quantities, not an independently tabulated common zero-load off-rate. Methods refer to earlier assay protocols; species and temperature are not independently restated there. See Figs. 2–4, Eq. 6 and Methods/Analysis. [Primary paper](https://doi.org/10.1038/35036345).

**TM03 — Schnitzer & Block 1997.** The near-zero-load single-kinesin assay links one ATP to an 8 nm centroid advance. Squid optic-lobe kinesin on 0.5 µm beads was measured at mean load below 0.9 pN. The directly resolved dwell analysis used 0.75, 1 and 2 µM ATP. Temperature was not located in the inspected Methods. Fig. 1's fitted saturation velocity is 680 ± 31 nm/s, means ± SEM; it is a separate condition-specific result. See Figs. 1–3 and Methods. [Primary paper](https://doi.org/10.1038/41111).

**TM04 — Jeney et al. 2004.** The approximate 0.3 pN/nm response comes from stretching a full-length Drosophila kinesin mutant with one head missing, at about 27 °C with 2 mM AMP-PNP and a 430 nm bead. Compression gives about 0.05 pN/nm. Those scales varied with direction and applied force across 100 experiments; they are not a pooled uncertainty interval. The measured tether includes linkage geometry and flexible molecular regions. See Fig. 5, p. 1155, and Experimental Section. [Primary paper](https://doi.org/10.1002/cphc.200301027).

**TM05 — Hirokawa et al. 1989, abstract only.** The official primary abstract describes an approximately 80 nm rod in rotary-shadowed bovine-brain kinesin and 25–30 nm arms in a separate MT–bead geometry. Neither observation is automatically the model's neighbor-capture cutoff. The likely 2009 review identity, DOI 10.1038/nrm2774, is recorded separately and not counted as primary numerical support. [Primary abstract](https://www.sciencedirect.com/science/article/pii/0092867489906910).

**TM06 — Carter et al. 2011.** This is a 6 Å structure of a GST-dimerized yeast motor-domain construct with the MT-binding domain and part of the stalk removed. The paper describes a roughly 15 nm stalk. It does not provide the sought direct 50 nm height/capture measurement. The missing measurement must remain open, rather than being replaced with another structural length. See Structure Determination and Fig. 1. [Primary manuscript](https://pmc.ncbi.nlm.nih.gov/articles/PMC3169322/).

**TM07 — Belyy et al. 2016.** Fig. 2d's DDB stalls are 4.3 ± 0.2 pN, SEM, from 45 stalls on 14 beads across four experiments. Recombinant human dynein, pig-brain dynactin and mouse BICD2N were mixed at 1:5:2, with 2 mM ATP and 860 nm beads on sea-urchin axonemes. The bead attaches through BICD2N-GFP. Assay temperature was not located; 27 °C in the Methods refers to protein expression. Distinct preparation and attachment geometry make comparison with yeast P08 conditional. [Primary manuscript](https://pmc.ncbi.nlm.nih.gov/articles/PMC5007201/).

**TM08 — McKenney et al. 2014.** Pig-brain DDB Fig. 1G/H reports velocity 376 ± 218 nm/s, mean ± SD, and an exponential run-length fit of 8.7 µm, both from 379 molecules and two preparations. The main text reports 892 nm/s at 37 °C for a separate condition. The ATP concentration is inconsistent between the baseline main text (2 mM) and Fig. 1G legend (1 mM). Preserve this unresolved discrepancy. Equal sample counts do not supply row-wise pairs or a covariance estimate. [Primary manuscript](https://pmc.ncbi.nlm.nih.gov/articles/PMC4224444/).

**TM09 — Rao et al. 2026.** Fig. 1c reports four rat-brain DDB stall populations; its official source workbook contains 59, 153, 231 and 34 values, matching the legend. Trapping used room temperature, microtubules and 2 mM ATP. Motor-number assignments draw on the authors' broader interpretation and separate fluorescence/structural observations, so they cannot be used as observed head-count labels for every force event. Later recombinant-human conditions are distinct. See Fig. 1b–d, Fig. 6 and Optical-tweezers Methods. [Primary article](https://doi.org/10.1038/s41556-026-01877-0). The publisher corrected the fourth-column condition labels of Fig. 3a,b on 2 March 2026. [Correction](https://doi.org/10.1038/s41556-026-01918-8).

## Relations useful to outer

The relation types in the JSON describe observation definitions, shared assays, conditional arithmetic and static code usage. They are not causal edges or covariance estimates.

1. **Speed, run length and detachment.** `L = v / k_off` requires compatible observations of the same complex under the same conditions, constant attached velocity and a memoryless detachment description, with pauses, rebinding and censoring handled. The current three declarations have not been shown to be independent measurements. The identity should not be assumed exact for a two-substate node walker merely because its units match.
2. **Stride, cycle rate and dwell split.** At the frozen source, `motor_walk_rate` uses the built MT spacing in the two rates `v/(spacing*f)` and `v/(spacing*(1-f))`. The stride row supplies the direction of a node walk. Fixed forward molecular steps would permit `v = d × rate` under additional assumptions, but head, dimer-centroid and cargo displacement are different quantities. Mean speed alone does not identify `f`.
3. **Measured stall versus transition force scale.** The frozen `_motor` code uses the stall input as an exponential force scale on one walking transition and on detachment. A finite-force exponential transition rate remains positive; the other attached-state transition is not force-scaled there. A measured zero-velocity stall therefore requires an explicit observation-to-input mapping. This is a static review point for the PI/owner, not a runtime conclusion or a proposed mechanism change.
4. **Related fits versus paired data.** TM02's shared assay conditions do not establish a same-run join. TM08's same sample count makes raw trajectory pairing worth pursuing but does not establish it. TM09 supplies force-binned observables; its anonymous column positions do not establish stable trace identity across sheets.

Static anchors are `aleph/cell/bonds.py:353–432` at the frozen commit, SHA-256 `ec55962fa8f1d41573824ea57ee9cb65a7f1cc38117128f94d9be2494a1806e7`. No physics, parameter update, prior, covariance or training run was performed.

## Concrete acquisition next step

TM09's official source workbook is 141,476 bytes, SHA-256 `336f7bddf0ef69ab2c5cd4c3c2666e7a1994c67367388c456419ab8acac760c0`, with 16 sheets. The read-only inspection records cell ranges and preserves blank cells and class labels. It includes individual classified stalls, bead-level class counts, and force-binned step, dwell, linkage and velocity quantities. These must retain different observation units.

A future parser should preserve exact sheet/block/cell provenance, obtain the trace/bead identity mapping, and apply the published condition-label correction. Neither `DDB0` nor a higher-force class should be recoded as a directly measured number of heads. No shared IDs connecting force, stepping, stiffness and fluorescence were established in this review. Full raw data are offered on request by the paper; no author contact was made. [Official source data](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41556-026-01877-0/MediaObjects/41556_2026_1877_MOESM4_ESM.xlsx).

Full articles, rendered inspection pages and the unchanged raw workbook are local caches under the ignored `candidate_sources/local_article_cache/` directory. The distributed review consists of this bounded synthesis, JSON evidence cards and retrieval/inspection metadata. No MCF7-specific motor/cargo parameter label was established.
