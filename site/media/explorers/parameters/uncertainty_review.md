# Declared uncertainty review

Advisory only; not PI-adjudicated. Current declarations, priors and tags are preserved. No alternative numeric prior, covariance or training label is proposed.

Exactly 41 axes: 35 declared bands and 6 declared spreads. A parseable range or nonempty source string is not verified uncertainty.

Source base: 24b3a44cbd33dd34cde338483be19638aec1be1c

Atlas input digest: 4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e

## Findings that need PI review

- The current NMIIA release-rate point retains a width attributed to the former NMIIB value (U01).
- Kovacs 2007 Table 1 reports SEM, not SD; the current NMIIB log width is a heuristic transformation (U02).
- The two Bell-length widths encode branch disagreement and a cross-isoform transfer, not measured distributions (U03).
- The nuclear-envelope band reproduces the first compatible unit range, but that range describes a response proxy rather than isolated envelope shear (U06).
- The parser reproduces 22 bands; 13 have no current source-sentence match. This does not establish their generation history.
- The geometric-grid path normalizes continuous point-density values without explicit measure weights in the inspected functions (C06). This is a static code question; no posterior was executed.

## Complete 41-row inventory

| Parameter | Current value/unit | Prior snapshot | Evidence kind | Uncertainty type | Cards |
| --- | --- | --- | --- | --- | --- |
| `actin_chem.cofilin_conc` | 20.0 uM | target; band [10, 40] | assay_range_unverified, exploration | not_reported | source text only |
| `actin_chem.g_actin_free` | 0.5 uM | target; band [0.1, 1] | assay_range_unverified, derived, exploration | not_reported | source text only |
| `actin_chem.k_pi_release` | 0.003 1/s | target; band [0.002, 0.006] | assay_range_unverified, exploration | not_reported | source text only |
| `actin_chem.profilin_conc` | 50.0 uM | target; band [20, 100] | assay_range_unverified, exploration | not_reported | source text only |
| `actin_chem.thymosin_conc` | 200.0 uM | target; band [100, 500] | assay_range_unverified, exploration | not_reported | source text only |
| `arp23.conc` | 2.0 uM | target; band [1, 2] | assay_range_unverified, exploration | not_reported | source text only |
| `arp23.debranch_rate` | 0.003 1/s | target; band [0.001, 0.01] | assay_range_unverified, exploration | not_reported | source text only |
| `arp23.k` | 4600.0 pN/um | target; band [1000.0, 10000.0] | exploration, transferred_value | not_reported | source text only |
| `arp23.k_theta` | 0.02 pN*um/rad^2 | target; band [0.002, 0.2] | exploration, derived | not_reported | source text only |
| `arp23.nucleation_rate` | 0.037 1/s | target; band [0.0037, 0.37] | exploration, context_mismatch | not_reported | U07 |
| `cell.nc_ratio` | 0.68 1 | lognormal; sigma_ln 0.1176 | measurement_dispersion_kind_incompletely_labeled, derived | SD_context_table_label_not_explicit | U04 |
| `chem.adp_conc` | 100.0 uM | target; band [50, 100] | assay_range_unverified, exploration | not_reported | source text only |
| `chem.atp_conc` | 3000.0 uM | target; band [1000, 5000] | assay_range_unverified, exploration | not_reported | source text only |
| `chem.pi_conc` | 1000.0 uM | target; band [1000, 5000] | assay_range_unverified, exploration | not_reported | source text only |
| `chem.solvent_permittivity` | 73.2 1 | target; band [60, 85] | numerical_control, exploration | not_reported | source text only |
| `crossbridge.iib.k_adp_release` | 0.38 1/s | lognormal; sigma_ln 0.22 | measurement_SEM, derived | SEM | U02 |
| `crossbridge.iib.x_adp` | 0.0053 um | lognormal; sigma_ln 0.15 | derived, context_mismatch, exploration | not_reported | U03 |
| `crossbridge.k_adp_release` | 2.7 1/s | lognormal; sigma_ln 0.34 | context_mismatch, exploration | old_value_rounding_heuristic | U01 |
| `crossbridge.k_hydrolysis` | 20.0 1/s | target; band [10, 100] | assay_range_unverified, exploration | not_reported | source text only |
| `crossbridge.x_adp` | 0.0034 um | lognormal; sigma_ln 0.15 | derived, exploration | not_reported | U03 |
| `crosslink.arm_reach` | 0.03 um | target; band [0.015, 0.06] | exploration, derived | not_reported | source text only |
| `crosslink.conc` | 5.0 uM | target; band [1, 5] | assay_range_unverified, derived, exploration | not_reported | source text only |
| `crosslink.k` | 4600.0 pN/um | target; band [1000.0, 10000.0] | derived, numerical_control, exploration | not_reported | U08 |
| `crosslink.molecular_weight` | 206000 Da | target; band [190000, 220000] | exploration, transferred_value | not_reported | source text only |
| `crosslink.radius` | 0.005 um | target; band [0.003, 0.02] | exploration | not_reported | source text only |
| `cytoplasm_actin.contour` | 2.0 um | target; band [1, 10] | assay_range_unverified, transferred_value, exploration | not_reported | source text only |
| `envelope.mu_2d` | 250.0 pN/um | target; band [250, 750] | derived, context_mismatch, exploration | not_reported | U06 |
| `envelope.pore_density` | 5.0 1/um^2 | target; band [3, 10] | assay_range_unverified, exploration | not_reported | source text only |
| `envelope.pore_length` | 0.05 um | target; band [0.04, 0.1] | exploration, derived | not_reported | U09 |
| `envelope.pore_radius` | 0.0045 um | target; band [0.002, 0.009] | exploration, transferred_value | not_reported | U09 |
| `envelope.spacing` | 0.04 um | target; band [0.03, 0.05] | assay_range_unverified, exploration | not_reported | U09 |
| `filamin.arm_reach` | 0.1 um | target; band [0.04, 0.16] | exploration | not_reported | source text only |
| `filamin.molecular_weight` | 560000 Da | target; band [500000, 600000] | exploration, transferred_value | not_reported | source text only |
| `filamin.radius` | 0.008 um | target; band [0.005, 0.04] | exploration | not_reported | source text only |
| `integrin.areal_density` | 300.0 1/um^2 | target; band [100, 1000] | assay_range_unverified, exploration | not_reported | source text only |
| `material.actin.EA` | 44000.0 pN | lognormal; sigma_ln 0.1053 | measurement_plusminus_kind_unresolved, derived | unknown_SD_or_SEM | U05 |
| `membrane.lysis_strain` | 0.03 1 | target; band [0.03, 0.05] | assay_range_unverified, exploration | not_reported | source text only |
| `microtubule.catastrophe_rate` | 0.05 1/s | target; band [0.01, 0.05] | assay_range_unverified, exploration | not_reported | source text only |
| `microtubule.tubulin_conc` | 20.0 uM | target; band [10, 20] | assay_range_unverified, exploration | not_reported | source text only |
| `microvillus.length` | 1.0 um | target; band [0.5, 2] | assay_range_unverified, exploration | not_reported | source text only |
| `stress_fiber.sarcomere` | 1.0 um | target; band [0.5, 1.4] | assay_range_unverified, transferred_value | not_reported | source text only |

## Primary and provenance cards

### U01 · crossbridge.k_adp_release

Current point is NMIIA 2.7/s. Stored spread 0.34 and its text remain tied to former NMIIB ~0.35/s and a factor-of-1.4 heuristic. The corrected spec source also retains that obsolete trailing sentence.

Primary Table 1 reports NM2A single-headed 2.7±0.3/s and HMM 2.9±1.0/s; construct difference and SEM are distinct from the stored heuristic.

PI proposal: Adjudicate the intended NMIIA uncertainty quantity and provenance, then reconcile the three conflicting source narratives. Do not automatically turn the historical 1.7–2.9 cross-carrier span into an SD.

References: [Kovacs2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/?pdf=1), [Kovacs2003](https://doi.org/10.1074/jbc.M305453200).

### U02 · crossbridge.iib.k_adp_release

Kovacs 2007 Table 1 labels values as means ± SEM, with n between 3 and 9. The NMIIB single-headed row displays 0.38±0.09/s; it is carried from Wang 2003.

Current 0.22 is ln(1.24) rounded, not a reported log-space SD. Individual n is not assigned in the table. Stopped-flow methods use 25°C; target is 310 K.

PI proposal: Decide whether the prior represents uncertainty in a condition-specific mean, biological variation, transfer uncertainty or model discrepancy, and obtain the specific sample count before any conversion.

References: [Kovacs2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/?pdf=1), [Wang2003](https://doi.org/10.1074/jbc.M302510200).

### U03 · crossbridge.x_adp, crossbridge.iib.x_adp

IIA width 0.15 records mismatch between resisting and assisting derived lengths. IIB inherits that IIA discrepancy. Neither is a measured SD for the target Bell length.

Primary rate ratios support the derivation input, but Table 2 derives mechanical loads with smooth-muscle mechanical parameters. The project uses x=kBT ln(rate ratio)/assumed load, not an independently measured NMII force-length distribution.

PI proposal: Document assumed load and directional model approximation separately from statistical uncertainty; require an explicit reason before transferring the width across isoforms.

References: [Kovacs2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/?pdf=1).

### U04 · cell.nc_ratio

Moore 2019 contains MCF7 IFC diameter ratio 0.68±0.08. Results report n=2164, Table 1 n=2004; SASAM n=37 belongs to this 2019 paper, not the cited 2016 DOI.

Discussion describes population dispersion as standard deviation; Table 1 does not itself label the ± convention. Treat as SD-context with incomplete explicit table labeling, never SEM by assumption. Registered 2016 identity does not validate the unregistered 2019 source.

PI proposal: Resolve the exact dataset and uncertainty definition, keep radius/diameter ratio distinct from area or volume ratios, and adjudicate support within (0,1).

References: [Moore2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC7000884/), [Moore2016](https://ultrasoundandmriforcancertherapy.ca/wp-content/uploads/2017/03/2016-12.-1.pdf).

### U05 · material.actin.EA

Kojima 1994 abstract reports 43.7±4.6 pN/nm without tropomyosin for a 1 um filament. EA scales this by length and rounds the central value.

The accessible abstract does not resolve SD versus SEM. Current b/a≈0.1053 is a linear relative-dispersion mapping to sigma_ln. Rounding and median-versus-mean convention are separate from source uncertainty.

PI proposal: Locate primary uncertainty definition and n before interpreting relative dispersion as a distribution; distinguish specimen variation, estimator error and transfer.

References: [Kojima1994](https://pmc.ncbi.nlm.nih.gov/articles/PMC45560/?pdf=1).

### U06 · envelope.mu_2d

The parser selects 2.5e2–7.5e2 pN/um from a lamin-attributable whole-nucleus response estimate. Both the spec and project source explicitly deny a measurement of isolated double-bilayer+NPC shear with lamina separate.

Stephens short/long-extension behavior is an assay response across cells/conditions, not an isolated shear-modulus CI. Dahl is a different species/preparation and whole-envelope quantity; no covariance or residual modulus is inferred.

PI proposal: Retain response-level evidence and explicit component/geometry derivation. PI must define the intended independent envelope quantity before adjudicating any band. Do not derive statistical uncertainty merely from matching units.

References: [Stephens2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5541848/?pdf=1), [Dahl2004](https://doi.org/10.1242/jcs.01357), [Swift2013](https://doi.org/10.1126/science.1240104).

### U07 · arp23.nucleation_rate

The two-decade band is explicit exploration around a point with a per-WAVE/NPF versus per-free-Arp2/3 mapping issue.

Li/Bieling 2022 primary number is a per-NPF rate; candidate remains ineligible in saved KB. This card adds uncertainty interpretation only, not a second independent source claim.

PI proposal: Use example_review P07 as the existing primary card and adjudicate activation fraction and attribution. Widening a scalar prior cannot repair a changed denominator.

References: [Bieling2016](https://doi.org/10.1016/j.cell.2015.11.057), [LiBieling2022](https://elifesciences.org/articles/73145).

### U08 · crosslink.k

Project text combines a thermal model condition and a timestep-specific kick condition, then stores an exploration interval. The cited 3500 bound, point 4600 and upper endpoint 10000 are not an exact common feasible set under the text as written.

Bounds depend on temperature, Bell length and timestep; they are not an experimental confidence interval. No numeric replacement or mechanistic change is proposed.

PI proposal: PI should clarify which conditional derivation is operative and whether this interval describes exploration or admissibility. Do not relabel a bond-well curvature as intact-linker compliance.

References: [Ferrer2008](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf).

### U09 · envelope.pore_radius, envelope.pore_length, envelope.spacing

Pore radius and length bands are exploration declarations. The reviewed effective diffusion geometry is not itself a hydraulic-radius uncertainty, and pore length must not be shorter than envelope spacing.

Source source-text bands and radius-to-fourth-power conductance dependence create derivation sensitivity, not evidence of probability or parameter independence. Existing example_review P16 is the comparator.

PI proposal: Define geometric, solute-accessible and hydraulic quantities separately; record the joint feasibility condition before a future design, without inventing covariance.

References: [Keminer1999](https://www.sciencedirect.com/science/article/pii/S0006349599768839).

## Code semantics

### C01

The parser chooses the first positive ordered range whose literal unit is compatible with the row unit.

No semantic test connects that range to the parameter quantity, source reliability, negation, context or uncertainty meaning. envelope.mu_2d reproduces a proxy response range even while its sentence says it is not an isolated modulus.

Anchors: `aleph/cell/prior.py:47`.

### C02

Reconciliation preserves existing metadata whenever its family remains legal for the tag.

A changed value or rewritten source does not trigger fresh spread adjudication. This permits stale metadata; it does not prove which reconcile version created or retained these current rows.

Anchors: `aleph/cell/prior.py:229`.

### C03

spread is sigma_ln, and the file value is the lognormal median.

CV=b/a is only an approximation to sigma_ln under a specified lognormal assumption; ln(1+CV) is a different heuristic. If a and b are arithmetic mean and SD, the moment relation is sigma_ln=sqrt(ln(1+(b/a)^2)) and median differs from mean. A SEM, range, branch discrepancy or rounding digit does not supply b as a population SD. No replacement width or prior is proposed.

Anchors: `aleph/cell/prior.py:184`, `aleph/cell/prior.py:202`.

### C04

Every target band is implemented as loguniform, not as an empirically identified probability law.

Positive endpoints alone do not justify a loguniform density, identify a confidence level, or distinguish epistemic uncertainty from between-cell variability. This applies even when endpoints reproduce source text exactly.

Anchors: `aleph/cell/prior.py:184`, `aleph/cell/prior.py:202`, `aleph/inner/sweep/born.py:37`.

### C05

The current prior composition uses independent univariate factors.

This is a prior modeling assumption. Shared source, fit, construct, denominator, geometry or biochemical pool can create dependence; the code does not establish literature independence. No covariance entries are inferred here.

Anchors: `aleph/cell/prior.py:184`, `aleph/cell/prior.py:202`, `aleph/inner/sweep/born.py:51`.

### C06

Point-density normalization on geometric grids raises a base-measure consistency issue.

Continuous f(x) is evaluated on geometrically spaced x and normalized as point masses without an explicit dx cell weight or x Jacobian. For a loguniform f proportional to 1/x, equal log-spacing therefore receives unequal masses. A caller could intentionally choose a discrete point measure, but that is different from Prior.sample; the shown invert caller contains no explicit measure correction.

Anchors: `aleph/cell/prior.py:184`, `aleph/inner/sweep/born.py:37`, `aleph/inner/sweep/born.py:51`, `aleph/inner/sweep/born.py:65`, `aleph/inner/sweep/invert.py:37`, `aleph/inner/sweep/invert.py:60`.

### C07

Declared samplability checks are metadata checks rather than evidence validation.

A nonempty source string and positive width do not establish an OK source identity or matching uncertainty type. Atlas declared_*_unverified status must not be promoted to accepted prior or training target.

Anchors: `aleph/cell/prior.py:99`, `aleph/cell/prior.py:142`.

### C08

partition labels do not alter the formulas in the inspected prior/grid functions.

PER_STATE, PER_CELL_LINE and UNASSIGNED remain metadata here; these functions do not instantiate a hierarchy or repeated-cell random effects. No claim is made about uninspected consumers.

Anchors: `aleph/cell/prior.py:99`, `aleph/cell/prior.py:184`, `aleph/cell/prior.py:202`, `aleph/inner/sweep/born.py:51`.

### C09

A target uses its stored prior band; its spec range is not intersected in these sampling functions.

The differing envelope.mu_2d band [250,750] and spec range [100,25000] are distinct declarations. Other biological joint constraints are likewise not encoded by a product of per-axis bands.

Anchors: `aleph/cell/prior.py:184`, `aleph/cell/prior.py:202`, `aleph/cell/params.py:88`, `aleph/cell/params.py:184`.

## Per-row review and unchanged source snapshots

### `actin_chem.cofilin_conc`

Generic concentration range without a cited assay. Not a confidence interval or demonstrated MCF7 population spread.

Next source work / PI decision: Resolve cofilin isoform, free versus total concentration, cell state, and assay calibration.

Flags: no_exact_source_anchor, free_total_ambiguity, context_transfer.

Declaration (`aleph/cell/spec.example.toml:1652`):

```json
{
  "value": 20.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "cofilin ~10-40 uM; PI-GAP for MCF7. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    10,
    40
  ],
  "band_source": "~10-40 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.5,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "free ATP-G-actin near the barbed-end critical concentration (~0.1-1 uM); most G-actin is profilin- or thymosin-bound. PI-GAP for MCF7. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.1,
    1
  ],
  "band_source": "~0.1-1 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.003,
  "unit": "1/s",
  "tag": "EXAMPLE",
  "source": "phosphate release from ADP-Pi-actin, ~0.002-0.006 /s (Carlier 1986; Fujiwara 2007). not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.002,
    0.006
  ],
  "band_source": "~0.002-0.006 /s",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 50.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "profilin ~20-100 uM (Pollard 2000). PI-GAP for MCF7. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    20,
    100
  ],
  "band_source": "~20-100 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 200.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "thymosin-beta4 ~100-500 uM (Pollard 2000). PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    100,
    500
  ],
  "band_source": "~100-500 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 2.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "Arp2/3 complex ~1-2 uM (Pollard 2000). PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1,
    2
  ],
  "band_source": "~1-2 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.003,
  "unit": "1/s",
  "tag": "EXAMPLE",
  "source": "branch dissociation ORDER OF MAGNITUDE (~1e-3-1e-2 /s, Le Clainche 2003 / Chan 2009). PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.001,
    0.01
  ],
  "band_source": "~1e-3-1e-2 /s",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 4600.0,
  "unit": "pN/um",
  "tag": "EXAMPLE",
  "range": [
    1000.0,
    10000.0
  ],
  "source": "stiffness of the junction relation holding a daughter's first node on its mother, EXAMPLE at the alpha-actinin crosslink value (crosslink.k) because no measurement of the Arp2/3 junction's axial compliance is in the KB. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1000.0,
    10000.0
  ],
  "band_source": "EXAMPLE at the crosslink stiffness band; no junction measurement",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.02,
  "unit": "pN*um/rad^2",
  "tag": "EXAMPLE",
  "range": [
    0.002,
    0.2
  ],
  "source": "angular stiffness of the built junction triple. EXAMPLE, order of magnitude only: a junction that resists a few kBT of bending over ~1 rad is ~1e-2 pN*um/rad^2 at 310 K (kBT = 4.28e-3 pN*um) — Blanchoin 2000 / Mueller 2017 report the 70 deg angle and its spread, not a stiffness, and the spread is what this row must eventually be inferred from. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.002,
    0.2
  ],
  "band_source": "order of magnitude around a few kBT per rad^2",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.037,
  "unit": "1/s",
  "range": [
    0.0037,
    0.37
  ],
  "tag": "EXAMPLE",
  "source": "branch nucleation rate per FREE Arp2/3 complex. aleph/docs/PHASE_0_3_DECISIONS.md line 28 records it verbatim as \"k_b⁰ = 0.037 s⁻¹ per WAVE molecule (Bieling 2016)\" — that line is a decision record, the number is not a row anywhere in this file, and the KB source_audit does not carry Bieling 2016, so the tag is EXAMPLE and not SOURCED. It is also stated per WAVE (the NPF that activates the complex) rather than per complex: this lane reads it per complex, which is the same number only while every complex is NPF-bound, the bound-fraction 1 worst case INVENTORY E' S1 already uses. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.0037,
    0.37
  ],
  "band_source": "EXAMPLE, one decade either side of the single recorded value (PHASE_0_3_DECISIONS line 28, Bieling 2016)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.68,
  "unit": "1",
  "tag": "SOURCED",
  "source": "nucleus:cell RADIUS ratio 0.68 +/- 0.08 — imaging flow cytometry n=2164 (PMC7000884); photoacoustic n=37 (10.1007/s10765-016-2129-y). laws/cell_geometry"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.1176,
  "spread_source": "0.68 +/- 0.08 (read from the spec source line; spread = b/a)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 100.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "free ADP ~50-100 uM. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    50,
    100
  ],
  "band_source": "~50-100 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 3000.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "cellular ATP 1-5 mM (Milo & Phillips, BNID 101266). not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1000,
    5000
  ],
  "band_source": "1-5 mM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 1000.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "free phosphate ~1-5 mM. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1000,
    5000
  ],
  "band_source": "~1-5 mM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 73.2,
  "unit": "1",
  "tag": "EXAMPLE",
  "range": [
    60.0,
    85.0
  ],
  "source": "static relative permittivity of liquid water at 37 C, 73.2 (CRC Handbook; 78.4 at 25 C, 80.1 at 20 C). Read ONLY by cell/electrolyte.check_screening, which verifies that chem.debye_length and chem.ionic_strength are mutually consistent at cell.temperature — no force law reads it. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    60,
    85
  ],
  "band_source": "water 73.2 at 37 C, 78.4 at 25 C, 80.1 at 20 C (CRC)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.38,
  "unit": "1/s",
  "tag": "SOURCED",
  "source": "NM2B unloaded ADP release, quoted from crossbridge.k_adp_release's own source line: 'Kovacs 2007 Table 1: NM2B single-headed 0.38 +/- 0.09, HMM 0.27 +/- 0.06; Wang 2003'. Kovacs 2007 PNAS 104:9994 (doi 10.1073/pnas.0701181104, PMID 17548820, SE424 OK). Same transition as crossbridge.k_adp_release (stroked -> free) for the OTHER isoform; Stam 2015 Table 2's 0.35/s is the same quantity via Wang 2003. Spread: the paper's own +/- 0.09 = 24 %"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.22,
  "spread_source": "spec source line: Kovacs 2007 Table 1 NM2B single-headed 0.38 +/- 0.09 /s, 24 % (ln 1.24 = 0.22)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.0053,
  "unit": "um",
  "tag": "SOURCED",
  "source": "NM2B Bell length, quoted from crossbridge.x_adp's own source line: '2B's 12x would give x = 5.32 nm, f_char = 0.80 pN' and 'NMIIB would be 5.3 nm' — derived there from Kovacs 2007's 12x slowing of 2B's ADP release at ~2 pN, x = kT ln12 / 2 pN at 310 K. KB: SE424 Kovacs2007_PNAS, source_audit OK 2026-09-06 12:0x. That same line records the consequence: f_char = kT/x = 0.80 pN lies OUTSIDE the KB's 1-2 pN band, which is a statement about that band's isoform, not a reason to move this number"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.15,
  "spread_source": "spec source line: derived the same way as crossbridge.x_adp, whose two branches of the same paper are 15 % apart",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 2.7,
  "unit": "1/s",
  "tag": "SOURCED",
  "source": "PI signature 2026-09-11 11:26 (Lead transcript 14373ea7; KB-2026-09-11-crossbridge-rates.md). ISOFORM ERROR CORRECTED: the former 0.35/s is NMIIB's unloaded ADP release (Kovacs 2007 Table 1: NM2B single-headed 0.38 +/- 0.09, HMM 0.27 +/- 0.06; Wang 2003). NMIIA — the engine's motor (hand_kmc.NMIIA_MYOSIN; x_adp derived for 2A) — is k0 = 2.7 +/- 0.3/s (single-headed, = Kovacs 2003 JBC 278:38132, 10.1074/jbc.M305453200, SE550 OK) / 2.9 +/- 1.0 (HMM); Stam 2015 carries 1.71/s from Kovacs 2003 -> spread: 1.7-2.9/s (lognormal prior, factor 1.3). Kovacs 2007 PNAS 104:9994 (doi 10.1073/pnas.0701181104, PMID 17548820, SE424 OK): resisting load slows it 5x (2A: 2.9 -> 0.59) / 12x (2B), assisting load speeds it 4x (11/s) — the load factors and x_adp were already 2A's, only the base rate was 2B's. Formerly: resisting load slows it 5x (2A) / 12x (2B) at ~2 pN, assisting load speeds it 4x. READ by bonds._crossbridge as the stroked state's detachment (2026-09-06, KB-2026-09-06 §4.8/§7.1b: unbound from the SWEPT k_off0). KB: SE424 Kovacs2007_PNAS, source_audit OK 2026-09-06 12:0x (key repaired from the encoding-stripped Kovcs2007; audit re-run). Spread: the paper gives ~0.35 /s (one significant figure), read as a factor of 1.4 either way"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.34,
  "spread_source": "spec source line: ~0.35 /s to one significant figure, a factor of 1.4 either way (ln 1.4 = 0.34)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 20.0,
  "unit": "1/s",
  "tag": "EXAMPLE",
  "source": "ATP hydrolysis on the detached head, NMIIA ~10-100 /s (Kovacs 2003). PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    10,
    100
  ],
  "band_source": "~10-100 /s",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.0034,
  "unit": "um",
  "tag": "SOURCED",
  "source": "derived from Kovacs 2007 for NMII-2A ONLY (the motor is hand_kmc.NMIIA_MYOSIN; 2B's 12x would give x = 5.32 nm, f_char = 0.80 pN, OUTSIDE the KB's 1-2 pN — so the 1-2 pN agreement is a consequence of the isoform choice, not an independent confirmation): resisting 2 pN slows ADP release 5x -> x = kT ln5 / 2 pN = 3.44 nm at 310 K; the assisting 4x gives 2.97 nm, so one Bell length fits both within 15 % (it over-predicts the assisting branch by 25 %). f_char = kT/x = 1.24 pN. The SIGN is the mechanism (bonds._crossbridge: tension SLOWS the stroked state's detachment). NMIIB would be 5.3 nm. KB: SE424 Kovacs2007_PNAS, source_audit OK 2026-09-06 12:0x. Spread: the two branches of the same paper give 3.44 and 2.97 nm — 15 %"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.15,
  "spread_source": "spec source line: the resisting and assisting branches of Kovacs 2007 give 3.44 and 2.97 nm, 15 % apart",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.03,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.015,
    0.06
  ],
  "source": "EXAMPLE per-arm capture: half the prior 60 nm whole-link reach. Independent arm geometry, no reach inflation."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_STATE",
  "band": [
    0.015,
    0.06
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 5.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "alpha-actinin ~1-5 uM; PI-GAP for MCF7. not in KB source_audit — register before SOURCED. Sets the crosslink capacity = conc x cytoplasm volume x N_A (bonds.kinetic_owners, 2026-09-15); retired crosslink.sites_per_filament (CONVENIENCE spanning threshold, SWEPT 5-40)"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1,
    5
  ],
  "band_source": "~1-5 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 4600.0,
  "unit": "pN/um",
  "tag": "EXAMPLE",
  "range": [
    1000.0,
    10000.0
  ],
  "source": "PI signature 2026-09-11 17:11 (Lead transcript 14373ea7; KB-2026-09-11-crosslink-bell.md): the effective axial stiffness of the alpha-actinin LINKER between two cortex nodes, an elastic element with the bond's rest at the built distance. FERRER MISREAD CORRECTED: the former 4.6e5 ('455 pN/nm, Ferrer 2008 AFM') is Ferrer 2008 PNAS 105:9221 (10.1073/pnas.0706124105, SE119 OK; optical tweezers, not AFM) Hummer-Szabo fit k_BT*kappa_m = 455 +/- 215 pN/nm — the curvature of the actin-ABP BOND's energy well over x‡ 0.28 nm, not the 35-nm rod's stiffness; no direct measurement of the intact rod's axial stiffness exists (EXAMPLE). Two bounds put the value here: (i) self-consistency with crosslink.k_off0 — the resting thermal load sqrt(k_BT k) must be << f_char = k_BT/x_beta, i.e. k << f_char^2/k_BT = 5.7e4 pN/um (at 4.6e5 every bond carried 44 pN rms at rest, Bell x17, and 58 % tore in 10 us on RESULT-2026-09-11-motor-occupancy); (ii) the step — a 4.4-nm thermal kick at dt 1e-6 must not push the Bell exponent past 1: k <= 3.5e3. Molecule: 8 spectrin repeats per rod, folded-repeat stiffness ~1700 pN/nm each (Paramore 2005 MD), flexible terminal regions (Golji 2009), and the repeats UNFOLD at 25-35 pN (Rief 1999 JMB 286:553) below the 40-80 pN bond rupture. DESIGN ITEM (PI 17:11): the crosslink as a YIELDING element — this stiffness up to f_y ~25-35 pN, then ~30 nm of unfolded extension per repeat, refolding < 1 s on release (a bonds/builder change); until then this elastic element is the stand-in"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1000.0,
    10000.0
  ],
  "band_source": "KB-2026-09-11-crosslink-bell §3: the two bounds (k << f_char^2/kT; Bell exponent <= 1 at a 4.4-nm kick)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 206000,
  "unit": "Da",
  "tag": "EXAMPLE",
  "range": [
    190000,
    220000
  ],
  "source": "Two approximately 103 kDa alpha-actinin monomers, species-specific molecular-weight example; source audit remains outstanding."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_CELL_LINE",
  "band": [
    190000,
    220000
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.005,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.003,
    0.02
  ],
  "source": "Hydrated effective protein owner radius, distinct from axial whole-dimer length; EXAMPLE geometry."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_STATE",
  "band": [
    0.003,
    0.02
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 2.0,
  "unit": "um",
  "tag": "EXAMPLE",
  "source": "by analogy with KB-3.18 cortical band 1-10 um; cytosolic filament length unsourced"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    1,
    10
  ],
  "band_source": "1-10 um",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 250.0,
  "unit": "pN/um",
  "tag": "EXAMPLE",
  "range": [
    100.0,
    25000.0
  ],
  "source": "KB-2026-09-06-nuclear-envelope-shear-modulus §1: unbound from membrane.mu_2d — the plasma membrane's mu is carried by the spectrin/ERM-cortex, the NE's by the NPC-lamin connections; not the same quantity. NO source isolates the double-bilayer + NPC in-plane shear from the lamina's, because the lamin meshwork is its own population here (build/lamina.py). What the OK-verdict evidence constrains is the SUM envelope+lamina: Stephens 2017 MBoC 28:1984 (10.1091/mbc.E16-09-0653, audit OK) single-nucleus micromanipulation gives a short-extension spring 0.41-0.70 nN/um with 1.5-2.5x strain stiffening carried by lamin-A/C, i.e. a lamin-attributable 2.5e2-7.5e2 pN/um for a somatic mammalian nucleus (a shell spring k ~ C*mu, C = O(1) — order of magnitude, not a modulus). The lamina as BUILT already delivers 1.3e2-5.1e2 pN/um (EA = material.if.E * pi * material.if.radius^2 = 471 pN over lamina.filament = 0.4 um -> k_edge 1178 pN/um; mu = sqrt(3)k/4 = 510 affine, 128 after the z=4.5 vs z_c=4 knockdown), so 2.5e2 here puts the sum at 3.8e2-7.6e2 pN/um, inside the measured band. Ceiling 2.5e4 = Dahl 2004 J Cell Sci 117:4779 (10.1242/jcs.01357, audit OK, SE562): 25 mN/m network elastic modulus, micropipette aspiration of ISOLATED XENOPUS OOCYTE envelopes — an amphibian lamin-B-rich oocyte NE, 30-100x above the somatic band, and Swift 2013 (10.1126/science.1240104, audit OK) is why it may not be transferred to a human somatic cell unqualified. Dahl does not split K_A from mu; the engine's triangular network fixes K_A = 2 mu, and the measured K/mu is 1.5 +/- 0.3 (HeLa, Rowat 2005) to 5.1 +/- 1.3 (WT MEF, Rowat 2006) — both PENDING SE registration, see the KB doc §3. Its own K_edge = 4 mu_2d / sqrt(3) = 577 pN/um per envelope edge (PLAN-2026-09-03ab §1), x25 tonight's 23.094: the envelope's in-plane branch moves 1.9e5 -> 4.7e6 /s (object_spectra_20260905T152006Z), still below the IF/MT branches. The gate is NOT this row: aspirate the built nucleus and score k_short / k_long against Stephens 0.41-0.70 nN/um and 1.5-2.5x."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    250,
    750
  ],
  "band_source": "2.5e2-7.5e2 pN/um",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 5.0,
  "unit": "1/um^2",
  "tag": "EXAMPLE",
  "source": "nuclear pore density ~3-10 /um^2. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    3,
    10
  ],
  "band_source": "~3-10 /um^2",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.05,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.04,
    0.1
  ],
  "source": "length of the channel across the envelope, ~50 nm = envelope.spacing 40 nm plus the two bilayers. Same provenance as envelope.pore_radius (INVENTORY-2026-09-21 E' P1); not in KB source_audit — register before SOURCED. Not BOUND to envelope.spacing because it is the spacing PLUS the two membranes, not the spacing; the build refuses a length below envelope.spacing."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.04,
    0.1
  ],
  "band_source": "envelope.pore_radius/length range rows (envelope-pores lane 2026-09-21); ~50 nm across the envelope",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.0045,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.002,
    0.009
  ],
  "source": "radius of the NPC's passive-diffusion channel, ~9 nm diameter — the literature figure quoted in INVENTORY-2026-09-21 E' P1 and in language.BOUNDED_OMISSIONS['envelope_pores'] before this lane built the mechanism. Not read in a paper by this session and not in KB source_audit — EXAMPLE, register before SOURCED. Poiseuille with this radius and bulk water is a conductance CEILING: the FG-nucleoporin mesh inside the channel only adds resistance."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.002,
    0.009
  ],
  "band_source": "envelope.pore_radius range row (envelope-pores lane 2026-09-21); NPC passive channel ~9 nm diameter",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.04,
  "unit": "um",
  "tag": "EXAMPLE",
  "source": "perinuclear space ~30-50 nm between the two envelope membranes. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.03,
    0.05
  ],
  "band_source": "~30-50 nm",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.1,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.04,
    0.16
  ],
  "source": "EXAMPLE per-arm capture distance, separate from 80 nm arm rest length."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_STATE",
  "band": [
    0.04,
    0.16
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 560000,
  "unit": "Da",
  "tag": "EXAMPLE",
  "range": [
    500000,
    600000
  ],
  "source": "Two approximately 280 kDa FLNa monomers; molecular-weight transfer example, not audited SOURCED."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_CELL_LINE",
  "band": [
    500000,
    600000
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.008,
  "unit": "um",
  "tag": "EXAMPLE",
  "range": [
    0.005,
    0.04
  ],
  "source": "Hydrated effective protein owner radius, distinct from 160 nm whole-dimer axial span; EXAMPLE geometry."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "partition": "PER_STATE",
  "band": [
    0.005,
    0.04
  ],
  "band_source": "Explicit exploration assumption declared with the 2026-09-15 builder input; not a measurement interval."
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 300.0,
  "unit": "1/um^2",
  "tag": "EXAMPLE",
  "source": "integrin surface density ~100-1000 /um^2. PI-GAP for MCF7. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    100,
    1000
  ],
  "band_source": "~100-1000 /um^2",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 44000.0,
  "unit": "pN",
  "tag": "SOURCED",
  "source": "Kojima 1994 PNAS 91:12962 — 43.7 +/- 4.6 pN/nm over 1 um => EA = 4.4e4 pN; laws/kim_network.EA_ACTIN_PN"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "lognormal",
  "spread": 0.1053,
  "spread_source": "43.7 +/- 4.6 (read from the spec source line; spread = b/a)",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.03,
  "unit": "1",
  "tag": "EXAMPLE",
  "source": "bilayer rupture at ~3-5% areal strain (Evans 2003). not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.03,
    0.05
  ],
  "band_source": "~3-5%",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 0.05,
  "unit": "1/s",
  "tag": "EXAMPLE",
  "source": "catastrophe frequency ~0.01-0.05 /s in cells. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.01,
    0.05
  ],
  "band_source": "~0.01-0.05 /s",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 20.0,
  "unit": "uM",
  "tag": "EXAMPLE",
  "source": "free tubulin dimer ~10-20 uM. PI-GAP. not in KB source_audit — register before SOURCED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    10,
    20
  ],
  "band_source": "~10-20 uM",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 1.0,
  "unit": "um",
  "tag": "EXAMPLE",
  "source": "microvilli 0.5-2 um long; MCF7 value KB-GAP"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.5,
    2
  ],
  "band_source": "0.5-2 um",
  "partition": "UNASSIGNED"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "value": 1.0,
  "unit": "um",
  "tag": "EXAMPLE",
  "source": "Hotulainen 2006 0.5-1.4 um, PI-gated swept; RECORDED, places nothing (STATE.md (e) 5)"
}
[Code block omitted from the public edition; the surrounding record and references are retained.]json
{
  "family": "target",
  "band": [
    0.5,
    1.4
  ],
  "band_source": "0.5-1.4 um",
  "partition": "UNASSIGNED"
}
```

Parser comparison: current_parser_exact. Neither generation history nor runtime consumption is established.

## Reference identities

| Source | DOI | Saved UID / audit | Review scope |
| --- | --- | --- | --- |
| [Kovacs2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/?pdf=1) | 10.1073/pnas.0701181104 | SE424 OK | primary_full_text_rechecked |
| [Kovacs2003](https://doi.org/10.1074/jbc.M305453200) | 10.1074/jbc.M305453200 | SE550 OK; SE425 CHECK (ineligible) | secondary_chain_not_independent_new_measurement |
| [Wang2003](https://doi.org/10.1074/jbc.M302510200) | 10.1074/jbc.M302510200 | unregistered; candidate/ineligible | secondary_chain_not_independent_new_measurement |
| [Moore2019](https://pmc.ncbi.nlm.nih.gov/articles/PMC7000884/) | 10.1117/1.JBO.24.10.106502 | unregistered; candidate/ineligible | primary_full_text_rechecked |
| [Moore2016](https://ultrasoundandmriforcancertherapy.ca/wp-content/uploads/2017/03/2016-12.-1.pdf) | 10.1007/s10765-016-2129-y | SE564 OK | existing_primary_review |
| [Kojima1994](https://pmc.ncbi.nlm.nih.gov/articles/PMC45560/?pdf=1) | 10.1073/pnas.91.26.12962 | SE334 OK | primary_abstract_rechecked |
| [Stephens2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5541848/?pdf=1) | 10.1091/mbc.E16-09-0653 | SE221 OK; SE560 OK | primary_full_text_rechecked_for_quantity |
| [Dahl2004](https://doi.org/10.1242/jcs.01357) | 10.1242/jcs.01357 | SE562 OK | existing_review_context_only |
| [Swift2013](https://doi.org/10.1126/science.1240104) | 10.1126/science.1240104 | SE201 OK | declaration_and_identity_only |
| [Bieling2016](https://doi.org/10.1016/j.cell.2015.11.057) | 10.1016/j.cell.2015.11.057 | SE97 OK; SE7 OK | existing_review_no_new_numeric_support |
| [LiBieling2022](https://elifesciences.org/articles/73145) | 10.7554/eLife.73145 | unregistered; candidate/ineligible | existing_primary_review |
| [Ferrer2008](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf) | 10.1073/pnas.0706124105 | SE119 OK | existing_primary_review_quantity_only |
| [Keminer1999](https://www.sciencedirect.com/science/article/pii/S0006349599768839) | 10.1016/S0006-3495(99)76883-9 | unregistered; candidate/ineligible | existing_primary_review |

## PI proposals

- PI01: Resolve the corrected NMIIA point versus obsolete NMIIB width provenance. Specify uncertainty quantity before a separate authorized metadata/prior update.
- PI02: Distinguish SEM, SD/population dispersion and unresolved ± conventions; specify whether inference concerns a mean, a new specimen or transfer discrepancy, then adjudicate distribution and center conventions.
- PI03: Treat directional derivation mismatch and assumed load as separate modeling uncertainties; no automatic statistical or cross-isoform interpretation.
- PI04: Separate measured response, project derivation, numerical admissibility and exploration bands; require quantity-specific provenance rather than a first compatible string range.
- PI05: Adjudicate per-NPF activation mapping using existing P07; retain its source and denominator lineage once.
- PI06: Declare geometric quantity and joint feasibility separately from independent one-axis intervals; do not invent covariance.
- PI07: Label distribution family, independence and partition behavior as modeling choices; maintain uncertainty-kind and exact-assay fields, leaving unknowns explicit.
- PI08: Before using grid posteriors, adjudicate the base measure and verify consistency between continuous prior sampling and discrete grid mass. This is a separate code-review question, not new empirical evidence. Actual call usage and performance are unverified; existing outputs are not automatically invalidated.

## Validation and boundaries

- Exact 41-name set and counts checked against atlas; all declaration/prior snapshots match current TOML and recorded atlas hashes.
- Selected source identities and audits match the saved KB snapshot; duplicate records and ineligible candidates retained.
- Pure parser extraction used only regex definitions and the string parser. No cell, prior runtime, physics or inference module was imported.
- Every linked artifact and selected source/code anchor carries hashes in JSON.
- No generation history, runtime consumption, statistical independence or source promotion is inferred.
- Raw declaration text may contain historical terminology; it is reproduced for audit without endorsing it.

The prior EXAMPLE review attachment is pinned to its captured version1 at checkpoint5fddbbd17. Current version2 corrects the P07 anchor toFigure3/page7; the denominator concern and this uncertainty interpretation remain.
