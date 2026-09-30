# NMII populations: observations, denominators and remaining gaps

Advisory review, 29 September 2026. No parameter, source registry, prior, mechanism or runtime changes. All proposed observations remain ineligible for training and parameter labels. The machine-readable record is [motor_population_evidence.json](motor_population_evidence.json), tied to the frozen atlas and saved KB by file hashes.

The useful new result is a path from literature to **joint observation records**, with the denominator retained. There is MCF7 isoform-abundance evidence, but it does not determine the current model's per-object IIA fraction. Calibrated filament-growth imaging can pair appearance, intensity and partition state; the public code is available, while the underlying raw data have not been acquired. None of the inspected studies identifies the two whole-object rates or the mechanically competent head fraction for suspended MCF7.

## What the six input rows actually need

| Input, unchanged | Model quantity in the frozen declaration | Evidence and unresolved mapping |
|---|---|---|
| `nmii.assembly_rate = 0.03 /s` | Transition into an assembled whole-object state | Detectable cluster appearance, protein exchange and monomer incorporation have different denominators. A tracked object inventory and detection model are missing. |
| `nmii.disassembly_rate = 0.03 /s` | Whole assembled object leaves, releasing its head relations | Fluorescence recovery, FRET dwell and decorrelation do not distinguish complete destruction from exchange, motion, merging or fading. |
| `nmii.rlc_phosphorylated_fraction = 0.3` | Fraction of built heads eligible for crossbridge relations | The row's name suggests phosphorylation, but the declaration explicitly means head competence. Phosphosite signal requires a separate observation-to-competence mapping. |
| `nmii.isoform_iia_fraction = 1.0` | IIA objects / (IIA + IIB objects) | Static `isoform_split` returns two object counts. Protein composition, IIC exclusion and mixed filaments are unresolved. |
| `nmii.heads_per_side = 30` | Structural heads per object pole | Existing approximate structural scale remains; heads counted, heads competent and heads engaged are different quantities. |
| `nmii.areal_density = 0.625 /µm²` | Initially assembled objects per smooth mid-shell area `4πr_shell²` | Existing numerical support remains, with the source's cell type, planar ROI and intensity-to-object projection retained. |

The first five rows remain `EXAMPLE`; areal density remains `SOURCED`. This table explains measurement requirements, not a proposed reclassification.

## Bounded primary-source findings

| Card | Primary record and inspected anchor | Observation ceiling |
|---|---|---|
| MP01 | [Smutny 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC3428211/), opening Results, Mass spectrometry, Fig.1 | MCF7 peptide composition and junctional localization. Bulk abundance is not per-object composition. |
| MP02 | [Dey 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5391180/), Figs.3–6 and S7 | MCF7 fluorescence/bleb movies can be joined within cells. AFM and FRET have no demonstrated shared cell identifiers. |
| MP03 | [Quintanilla 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC10866686/), final Figs.5–6 and Molecular counting | Calibrated NM2A cluster growth and partition observations in mouse fibroblasts. Unresolved stacks prevent treating each doublet as one filament. |
| MP04 | [Shutova 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4160463/), Figs.1,3 | Endogenous dual-isoform labeling on individual extracted filaments; extraction and incomplete labeling prevent population-fraction inference. |
| MP05 | [Liu 2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5559010/), Figs.2–5 and sedimentation methods | Purified protein oligomer distributions depend on biochemical condition and separation protocol. Soluble material is not a census of dormant model objects. |
| MP06 | [Aguilar-Cuenca 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7343590/), Fig.1 and phosphoproteomics methods | Reported phosphopeptide occupancy concerns expressed RLC under phosphatase inhibition, not untreated mechanically competent MCF7 heads. |
| MP07 | [Nie 2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4361371/), paragraph before Fig.6E, Figs.3,5 | Existing density estimate is retained; STICS combines motion and turnover and does not supply an object death rate. |

Saved KB identity checks are `OK` for MP02/SE551, MP05/SE548 and MP07/SE337. MP01, MP03, MP04 and MP06 have no matching registered DOI identity and remain ineligible candidates. The JSON retains every matched source/audit/reference row. Identity checks do not adjudicate a number, its denominator or transfer to the target cell state.

### MCF7 composition: a conditional proposal, not a replacement value

Smutny reports IIA **54.8±4.2%**, IIB **12.5±2.9%**, IIC **32.5±5.4%**. The method counts isoform peptides relative to total NMHC peptides in a clarified extract. Results labels the errors SEM; Methods says SD was calculated. Raw replicates and the relevant sample size were not located. The supplement's FRAP table concerns GFP-actin, not this mass-spectrometry denominator. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC3428211/)

Conditioning the reported central composition on A/B gives `54.8 / (54.8 + 12.5) ≈ 0.8143`. This arithmetic is an **A/B peptide-abundance proxy**, with IIC explicitly excluded. It is not the model's object fraction. Mapping additionally needs assay response calibration, isoform-specific assembled fractions and molecules per object, an explicit treatment of mixed filaments, and PI agreement on the IIC projection. No uncertainty is calculated from independent component errors. The source is an adherent epithelial/ZA context; junctional localization does not specify whole-cell allocation or establish transfer to rounded suspended MCF7.

### Existing support remains bounded

Nie explicitly estimates **40±20, mean±SD, per 8×8 µm²** using foci intensity and mean cortical intensity in control Type II **adherent HeLa**. Dividing the central count by 64 µm² gives the declared 0.625/µm². The primary instrument is confocal, whereas saved SE337 shorthand says super-resolution. This is a proposed provenance clarification; the saved KB and tag were not edited. The STICS sample count also differs between Results and Fig.3F (21 versus 25); it must be resolved before reusing that statistic. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC4361371/)

The existing P01/P03 reviews retain Billington's 301±24 nm total contour and the approximate NM2A/B composition scale. Thirty two-headed molecules across a balanced bipolar filament correspond to about thirty heads per end, not thirty molecules per end. Melli's composition discussion cites Billington; these are not independent replicates. Contour, bare-zone length, structural heads and force-bearing heads remain separate. This pass carries those earlier reviews forward rather than claiming another independent verification. [Billington](https://pmc.ncbi.nlm.nih.gov/articles/PMC3829186/), [Melli](https://elifesciences.org/articles/32871)

## A concrete outer acquisition path

The strongest parser target is Quintanilla's **same-track observation bundle**. The author-linked [myosin_candles](https://github.com/m-a-q/myosin_candles) and [myosin-cluster-tracking](https://github.com/m-a-q/myosin-cluster-tracking) repositories identify the final paper. Their inspected trees contain analysis code but no measurement files. The paper says raw data are available on reasonable request. No author was contacted. Presentation videos are not treated as calibrated raw measurements. [Paper and data availability](https://pmc.ncbi.nlm.nih.gov/articles/PMC10866686/)

The public code at the recorded commit reads CZI timestamps/scales, links tracks, stores intensity/background and calibrated monomer estimates, and exports HDF5/Excel tables. Its hardcoded function defaults and short-track filtering require explicit review against the actual acquisition calls. Nothing downloaded was executed or adopted. Full code caches remain local because the repositories expose no license; the versionable package retains commit hashes, filenames, hashes and line links. [Pinned source](https://github.com/m-a-q/myosin_candles/blob/5d7dbbe9762800e45f4b2bbada5d7dece2a919fe/live_myosin_tracking.py#L45-L102)

A prospective parser should preserve:

- `experiment_day`, `cell_id`, `movie_id`, `track_id`, original frame timestamps and spatial units.
- Raw intensity/background, calibration identifier, monomer estimate, peak/partition state and quality flags.
- Detection threshold, track filtering, entry/exit, bleaching, merge/split and missing-frame censoring.
- Calibration's acquisition-day link, separate from cell identity; do not invent pairing by row position.

Smutny's raw peptide records would supply a different observation family. Dey's FRET/bleb data and AFM require separate tables until original identifiers establish shared cells. The JSON specifies acquisition requests and observation ceilings for each. These are acquisition proposals, not requests already sent.

For an illustrative closed, homogeneous two-state population with constant positive rates, a stationary assembled fraction constrains their ratio; a separately identified object-state relaxation can constrain their sum. This requires a fixed tracked population and explicit handling of detection, bleaching, censoring and motion. No native record or cited fluorescence assay is shown here to meet those assumptions. Neither a FRAP half-time nor a cluster's first visible frame supplies that missing quantity automatically. A single aggregate count-product or force projection generally leaves object density, heads per object and competence unresolved; this is not a full-model structural-identifiability result. The useful research visualization is a graph of **measurement definitions, actual pairing and unresolved projections**, with no covariance or causality attached by inference.

Local full articles, supplements and source code are research caches under `candidate_sources/local_article_cache/`; they are not distributed review artifacts. Small retrieval manifests remain available beside this packet. No physics, training, external messages or parameter updates were performed.

## Static quantity clarification

The isoform fraction partitions all allocated objects, including dormant ones. Because isoform and initial alive masks are prefixes, the initial assembled IIA count is `min(round(f_A*N_allocated), N_assembled)`. The head fraction selects relation owners separately in each isoform over the full allocated head range, with integer rounding; it does not directly specify initial active, bound or force-producing head fractions. The frozen [quantity dictionary](quantity_semantics.md) preserves the code spans and distinctions.
