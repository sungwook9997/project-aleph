# Nuclear mechanics evidence review

Advisory only; not PI-adjudicated. Frozen base `24b3a44cb`; values, tags, priors and model choices are unchanged. This packet covers all25 scoped rows, including three resolution aliases. No physics or runtime imports were executed.

The strongest distinction is between source model assignments, measured responses and project-derived component choices. Stephens table values are model parameters. Tseng reports a probe-scale plateau/crossover analysis. Fischer measures apparent nuclear Young modulus. None of those measurements alone identifies the current isolated-envelope shear, surface prestress or mechanical turnover input.

## Exact inventory

| Parameter | Tag / current declaration | Review | Cards |
|---|---|---|---|
| `chromatin.crosslink_fraction` | SOURCED; 0.2 1 | 0.2 is source model fraction associated with55 crosslinks, not a measured MCF7 domain fraction. Source minimum contour separation and current pair sampling differ. | NM01 |
| `chromatin.density` | EXAMPLE; 0.2 pg/um^3 | No direct0.2 pg/µm³ domain-density measurement located; source model geometry does not identify domain mass density. | NM01 |
| `chromatin.k_backbone` | SOURCED; 1600.0 pN/um | 1600 pN/µm matches source assigned domain-link coefficient. It is not a primary MCF7 material measurement and remains distinct from numerical subdivisions. | NM01 |
| `chromatin.n_subunits` | EXAMPLE; 552 1 | 552 matches a model in a10 µm nuclear diameter, not a measured MCF7 genome/domain count. | NM01 |
| `chromatin.seg` | EXAMPLE; bound→resolution.spacing | Bound exactly to resolution.spacing; source-described drag-preserving subdivision is numerical/model mapping, not a physical domain-size measurement. |  |
| `chromatin.shell_links` | SOURCED; 40 1 | 40 matches the source model. Current picks the40 outermost domain centres; source approximately50% of outer domains and declaration~86 comparison are not independent observations. | NM01 |
| `chromatin.subunit` | SOURCED; 0.6 um | 0.6 µm is source domain diameter in a coarse model, not single-nucleosome length or measured MCF7 domain distribution. | NM01 |
| `envelope.area_modulus` | SOURCED; 486000.0 pN/um | 486000 pN/µm is2*243 mN/m from PC single-bilayer composition measurements. Nuclear double-bilayer additivity is assumed; present global-area and network terms are separate. | NM10 |
| `envelope.areal_density` | EXAMPLE; 0.01 pg/um^2 | The declaration says only double bilayer; neither material composition nor a primary0.01 pg/µm² measurement is provided. |  |
| `envelope.double_sheet` | EXAMPLE; 0 1 | Zero selects a single represented surface. It is not an experimental statement about biological membrane number. |  |
| `envelope.excess_area` | SWEPT; 0.3 1 | 0.3 is a PI sweep point inside a rough20–40% source image estimate. The source range is not a measured probability distribution; source reference area differs from the current geometric construction. | NM05 |
| `envelope.kappa_bend` | EXAMPLE; 4.0 pN.um | Current4 is preserved as the recorded PI/runtime-history selection. Source25 mN/m is an oocyte extensional coefficient; chosen15–30 nm plus K*h²/12 gives approximately0.47–1.88. No direct4 pN·µm measurement found. | NM09, NM08 |
| `envelope.mesh` | EXAMPLE; bound→resolution.spacing | Bound exactly to resolution.spacing; distinct from the coarser lamin mesh scale. |  |
| `envelope.mu_2d` | EXAMPLE; 250.0 pN/um | 250 is an example component assignment. Preserved prior band250–750 uses a source-text same-unit whole-response proxy, not a measured isolated-envelope shear interval.0.41–0.70 nN/µm also spans cell/perturbation conditions. | NM02, NM09 |
| `envelope.pressure` | EXAMPLE; 2.353 pN/um^2 | 2.353 is the declared2*tension/R reference using6 and5.1. It is not a nucleoplasmic-pressure measurement; historical fold claims remain uninterpreted. | NM04 |
| `envelope.tension` | EXAMPLE; 6.0 pN/um | 6 comes from399 Pa*15 nm. Apparent nuclear Young modulus times thickness is not measured surface tension; thickness is not matched MCF7 in the source. | NM04, NM08 |
| `envelope.volume_modulus` | EXAMPLE; 773100.0 pN/um^2 | 773100 is the preserved300 mM*2577 reference. The current law is linear pressure versus volume deviation. Retained-solute concentration and timescale are not established by this arithmetic. |  |
| `envelope.wrinkle_wavelength` | EXAMPLE; 1.0 um | No exact1 µm correlation-length claim located in the inspected Li main article. Preserve the PI option,range and candidate citation without promotion. | NM05 |
| `lamina.areal_density` | EXAMPLE; 0.02 pg/um^2 | 0.02 rounds1.35*0.015 under a solid-layer assumption. Source sparse lamina occupancy and code explicit-filament mass require a constituent definition before transfer. | NM08 |
| `lamina.filament` | SOURCED; 0.4 um | 0.4 is the source-table approximate experimental mesh length, while Shimi directly reports0.432 µm median mean-edge-length-per-face in mouse cells. Current usesL in4πR²/L²; not molecular contour length. | NM01, NM06 |
| `lamina.neighbours` | EXAMPLE; 3 1 | Three is kNN selector, not measured degree. Four edges per face in Shimi cannot be read directly as node degree4; source-model mean degree4.5 is a distinct construction. | NM01, NM06 |
| `lamina.seg` | EXAMPLE; bound→resolution.spacing | Bound exactly to resolution.spacing; numerical subdivision of coarse lamina edges, not measured lamina molecular spacing. |  |
| `lamina.turnover_rate` | EXAMPLE; 0.0001 1/s | 1e-4/s is an example hours-scale hazard. Slow interphase lamin-A FRAP is a recovery bound; it does not determine the mechanical rest-length relaxation rate implemented here. | NM07 |
| `nucleus.eta_nucleoplasm` | SOURCED; 52.0 pN.s/um^2 | 52 Pa·s is standard conversion of source520 Poise eta_s derived from plateau modulus and relaxation time. It is probe/network scale and not fluid solvent viscosity or the current selected-lag eta by definition. | NM03 |
| `nucleus.g_prime_nucleoplasm` | SOURCED; 18.0 pN/um^2 | 18 Pa is the source plateau storage modulus, not arbitrary-frequency Gprime. Source probe/cell/analysis and target observer assumptions remain separate. | NM03 |

## Primary claim cards

### NM01 · Stephens 2017: model parameters and experimental comparator columns

[10.1091/mbc.E16-09-0653](https://pmc.ncbi.nlm.nih.gov/articles/PMC5541848/) · Table 1, printed p.1991/PDF page 8; Simulation methods

Table locates Np=552, sigma_p=0.6 µm, kp=1.6 nN/µm, Nc=55 (20% of domains) and Ns=40 (about half the outer domains). Shell model length 0.6 µm differs from experimental comparator 0.4 µm. Model crosslinks join domains at least four positions apart.

**Context and quantity:** {"system": "Coarse chromatin polymer inside an elastic nuclear shell; standard diameter 10 µm. Table places model assignments beside approximate experimental comparisons.", "medium": "Simulation eta approximately 1 cP, not Tseng mesoscale 52 Pa·s.", "ensemble": "Force curves averaged over at least eight random configurations."} Domains, model links and assigned domain-link elastic coefficients.

**Limits:** These are published-model assignments, not direct MCF7 measurements. Current Nc count formula reproduces 55 but does not ensure distinct 110 linked domains: its static block permits repeated pairs/domain reuse and rejects only adjacent contour indices. Ns=40 is a fixed count in current code; the declaration’s ~86 comparison is not an independent observation.

**Uncertainty:** No sampling error or fitted parameter covariance supplied for these table assignments. Random-configuration variability is not a parameter prior.

**Frozen identity:** SE221:OK, SE560:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

### NM02 · Stephens 2017: whole-nucleus force-extension response

[10.1091/mbc.E16-09-0653](https://pmc.ncbi.nlm.nih.gov/articles/PMC5541848/) · Figs.1–3 and captions; Short- and long-extension regimes; Micromanipulation methods

HeLa control short-extension coefficient is 0.70±0.06 nN/µm. Chromatin decompaction shifts MEF vimentin-null 0.60 to 0.41 and HeLa 0.70 to 0.47. Thus 0.41–0.70 spans cell/perturbation conditions. Lamin A/C depletion chiefly reduces the long-extension response.

**Context and quantity:** {"cells": "HeLa, MEF vimentin-null, HT29 and HEK293 contexts; values are condition-specific.", "protocol": "Isolated individual nuclei; 50 nm/s extension. Latrunculin A pretreatment 1 µg/mL about 45 min in relevant protocol, followed by fresh medium; separate no-LatA control."} Force-extension coefficient in nN/µm, for a whole isolated nucleus.

**Limits:** The interval is neither a same-condition uncertainty band nor an isolated membrane/shear modulus. A geometry/constitutive mapping and separation of lamina/chromatin contributions are required before assigning envelope.mu_2d. No additive subtraction is adjudicated here.

**Uncertainty:** Figure captions report mean±SEM: Fig.1 n=10–25 nuclei and Fig.3 n=8–30 across conditions; do not apply a pooled n or SEM to the 0.41–0.70 interval.

**Frozen identity:** SE221:OK, SE560:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

### NM03 · Tseng 2004: probe-scale plateau modulus and derived viscosity

[10.1242/jcs.01073](https://www.researchgate.net/publication/8612279_Micro-organization_and_visco-elasticity_of_the_interphase_nucleus_revealed_by_particle_nanotracking) · Methods pp.2160–2162; Fig.5 and Table 1 p.2165; mechanical microheterogeneity discussion

Table 1 gives plateau Gprime=180 dyn/cm²=18 Pa and eta_s=520 Poise=52 Pa·s using standard unit conversion. The relaxation time is inferred from the Gprime/Gdoubleprime crossover. Gprime at 1 Hz is 13.5 Pa and at 10 Hz 25 Pa; the plateau value is not an arbitrary-frequency modulus.

**Context and quantity:** {"cells": "Living Swiss 3T3 fibroblast interphase nuclei.", "probe": "Microinjected 100 nm diameter carboxylated fluorescent latex beads; 84 trajectories in 12 nuclei.", "acquisition": "20 s trajectories at 30 frames/s; roughly 5 nm positional resolution; projected 2D MSD.", "temperature": "Cell culture 37 °C; separate shear-flow protocol is explicitly 37 °C. Tracking temperature not independently located in accessed methods."} Passive bead-microrheology spectrum; plateau modulus and eta_s=plateau_Gprime*tau_R.

**Limits:** This is a mesoscale interphase nuclear-network response, not interstitial solvent viscosity. Current observer reports Gdoubleprime/omega at selected lag and warns about tethered/active probes; equivalence to the source eta_s analysis is not established. Publisher/PDF access failed; full primary text was inspected through an author-uploaded rendering, without PDF image verification.

**Uncertainty:** Means over 84 trajectories; numerical SD/SEM for 52 and 18 not located. Wide reported heterogeneity is not a confidence interval or prior.

**Frozen identity:** SE463:OK, SE561:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

### NM04 · Fischer 2020: MCF7 AFM modulus is not membrane tension

[10.3389/fcell.2020.00393](https://pmc.ncbi.nlm.nih.gov/articles/PMC7272586/) · Fig.4 and Nuclear/cytoskeletal stiffness Results; AFM Measurements; Statistical Analysis

Nuclear MCF-7 value 399.01±117.16 Pa, n=55 cells. Multiplying 399 Pa by 15 nm gives 5.985 pN/µm dimensionally, explaining the declaration’s rounded 6 proxy.

**Context and quantity:** {"cells": "Untreated adherent MCF-7 cells; do not merge TSA perturbations.", "probe_protocol": "6 µm diameter bead; above-nucleus indentation at 5 nN, five repeats per cell; topmost 10% of force curve fitted by standard Hertz model. Perinuclear cytoskeletal measurements use 0.5 nN.", "temperature": "Culture 37 °C; AFM acquisition temperature not located."} Apparent compartment-assigned Young modulus from force-indentation fit.

**Limits:** The fit samples a nucleus within an adherent cell; it does not measure isolated-envelope tension/prestress or a 15 nm thickness. E*h is a two-dimensional elastic-coefficient scale only under an additional constitutive interpretation. No current tension measurement established.

**Uncertainty:** Statistical methods specify mean or median±SD as indicated in legends; Fig.4 does not resolve mean versus median in accessed caption. Preserve ±SD and central-estimator ambiguity, n=55 cells.

**Frozen identity:** SE462:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

### NM05 · Li 2015: rough excess area and an undulation model

[10.1016/j.bpj.2015.07.006](https://pmc.ncbi.nlm.nih.gov/articles/PMC4547341/) · Nuclear pressure and area tension model section, before Eq.11; nuclear cross-section images; Methods

The primary text estimates roughly 20–40% excess area from nuclear cross sections. An effective fluctuation energy about 100 kBT is used in the model to reproduce that range.

**Context and quantity:** {"cells": "NIH 3T3 fibroblast spreading, including fluorescent TRF1/H1 imaging.", "definition": "Image-based rough excess-area estimate; theoretical area above unstrained A0 in the area-tension relation."} Approximate excess-area fraction and model area-tension relation.

**Limits:** This is not a measured 3D probability distribution or uncertainty interval. Current geometry uses a volume-preserving wrinkled sphere; its reference area requires mapping to source A0. A 1 µm wrinkle correlation length was not located in the inspected main text. Candidate remains ineligible in the frozen KB.

**Uncertainty:** Rough range; no sample-level SD/SEM or calibrated uniform prior.

**Frozen identity:** No registered SourceEvidence/audit OK; `candidate_ineligible`. Identity is separate from quantitative support.

### NM06 · Shimi 2015: lamin mesh face statistics

[10.1091/mbc.E15-07-0461](https://pmc.ncbi.nlm.nih.gov/articles/PMC4710238/) · Summary of results before Fig.5; Fig.5/Table1; 3D-SIM and image-analysis methods

Native lamin-A wild-type reference has median mean edge length per face 0.432 µm and median number of edges per face four. q-q scaling compares conditions.

**Context and quantity:** {"cells": "SV40-immortalized mouse embryonic fibroblasts, wild type and lamin knockout conditions.", "imaging": "Bottom flat nuclear surface, immunolabelled and mEmerald-tagged lamin conditions; 3D-SIM approximately 110–130 nm resolution."} Mesh edges per face and mean edge length per face, not molecular contour length or node degree.

**Limits:** Supports an approximate mesh-length scale near 0.4 µm in this context, not a fixed molecular filament length. Four edges per face is not node coordination z=4. Translating these graph statistics to k-nearest-neighbour input three needs additional assumptions. Candidate remains ineligible.

**Uncertainty:** Median face statistics and 25th–75th-percentile q-q regression; not SD of a 0.4 µm material length.

**Frozen identity:** No registered SourceEvidence/audit OK; `candidate_ineligible`. Identity is separate from quantitative support.

### NM07 · Moir 2000: slow interphase lamin-A FRAP

[10.1083/jcb.151.6.1155](https://pmc.ncbi.nlm.nih.gov/articles/PMC2190592/) · Cell Culture/Live-cell Microscopy/FRAP methods; interphase recovery Results and recovery-half-time table

Interphase GFP-lamin-A nuclear rim/veil recovers less than 50% within three hours; recovery half-time is reported above 180 min, n=3.

**Context and quantity:** {"cells": "Embryonic mouse epidermal PAM cells; GFP-lamin fusion expression. Paper also studies BHK-21 cells; keep individual experiments separate.", "conditions": "16–48 h after transfection; live-cell observations at 37 °C in L-15 plus serum. Interphase distinguished from rapid early-G1 nucleoplasmic recovery."} Fluorescence recovery fraction and lower bound on recovery half-time.

**Limits:** Supports slow, state-dependent fluorescent-protein exchange but not a unique 1e-4/s rate. FRAP includes mobile fraction/bleach geometry and incorporation. Current lamina.turnover_rate statically controls mechanical rest-length relaxation. A first-order identification is unvalidated; candidate ineligible.

**Uncertainty:** Lower bound, n=3; no numeric SD for the >180 min bound. Do not borrow lamin-B1 recovery error.

**Frozen identity:** No registered SourceEvidence/audit OK; `candidate_ineligible`. Identity is separate from quantitative support.

### NM08 · Turgay 2017: lamina thickness and sparse occupancy

[10.1038/nature21382](https://pmc.ncbi.nlm.nih.gov/articles/PMC5616216/) · Cryo-electron tomography Results; network thickness/occupancy paragraph; nuclear preparation Methods

The network layer is 14±2 nm thick. Reported approximately 50±10% surface occupancy implies approximately 12.5% of the layer volume occupied by lamin filaments; 25 subregions from nine nuclei are used in occupancy analysis.

**Context and quantity:** {"cells": "Vimentin-null mouse embryonic fibroblasts.", "preparation": "Brief 0.1% Triton/600 mM KCl treatment and benzonase digestion; network retained while chromatin/proteins removed. Not an intact MCF7 assay."} Lamina-network layer thickness, filament dimensions and occupancy.

**Limits:** A 15 nm scale is plausible as an external comparison but not matched-cell thickness for Fischer MCF7. Network thickness does not imply a uniform 1.35 pg/µm³ solid layer. The current areal mass and explicit filament mass coexist in code; their constituent assignment needs review, not automatic subtraction. Candidate ineligible.

**Uncertainty:** The ± convention for 14±2 nm was not located in the inspected text; occupancy sampling must not be reassigned to thickness without confirmation.

**Frozen identity:** No registered SourceEvidence/audit OK; `candidate_ineligible`. Identity is separate from quantitative support.

### NM09 · Dahl 2004: oocyte envelope extension and swelling are different observables

[10.1242/jcs.01357](https://scholarworks.indianapolis.iu.edu/server/api/core/bitstreams/4aebb38a-b46d-405a-be3f-bb470de4702b/content) · Table1/Fig.3 p.4782; swelling model/Fig.5 p.4783; micropipette Methods

Table1 gives network extensional coefficients 24±9 mN/m (swollen,n=7) and 28±8 mN/m (unswollen,n=4). A separate swelling model infers a dilational modulus about390 mN/m.

**Context and quantity:** Isolated Xenopus laevis oocyte nuclei/envelopes; BIM 140 mM KCl, 10 mM HEPES pH7.3; room-temperature observation; large micropipettes (inner diameters197/278 µm). Extensional slope of tension versus normalized aspiration; separate swelling-derived dilational modulus.

**Limits:** Neither coefficient is an isolated somatic-envelope shear modulus or direct bending rigidity. The current shell estimate using25 mN/m and15–30 nm adds a constitutive law/thickness and transfers from oocyte to mammalian nucleus. It yields roughly0.47–1.88 pN·µm under the declared K*h²/12 assumption; current4 remains a PI/runtime-history choice, not the paper measurement.

**Uncertainty:** Table1 means±SD; small condition-specific n. Do not pool distinct aspiration/swelling quantities.

**Frozen identity:** SE562:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

### NM10 · Rawicz 2000: single-bilayer composition series

[10.1016/S0006-3495(00)76295-3](https://doi.org/10.1016/S0006-3495(00)76295-3) · Area-compressibility Results/Table1; Methods for high-tension measurements

Mean across the PC series approximately243 mN/m with variation about±10%. Current486000 pN/µm is twice that single-bilayer value by a project parallel-bilayer construction.

**Context and quantity:** {"system": "Twelve fluid phosphatidylcholine membrane compositions, differing chain length/saturation; aspirated lipid vesicles.", "temperature": "Area-compressibility measurements at21 °C; do not substitute temperatures of separate bending experiments."} Single-bilayer area-compressibility modulus.

**Limits:** No nuclear-envelope or double-bilayer486 mN/m measurement is established. Additivity assumes an appropriate load/area-sharing geometry, separate from the explicit global-area and edge-network terms. Reinspection extends the pinned historical source review and is not an independent study.

**Uncertainty:** Composition variation approximately±10%, not a pooled-cell SEM or independent two-bilayer uncertainty.

**Frozen identity:** SE211:OK; `identity_OK_only_no_training_or_parameter_promotion`. Identity is separate from quantitative support.

## Source-side and static relations

- **NR01** · `chromatin.n_subunits`, `chromatin.subunit`, `chromatin.crosslink_fraction`, `chromatin.shell_links`, `chromatin.k_backbone`: The five values share a source model configuration; current count/topology definitions remain visible. Same table does not create a measured joint prior. Assumptions: N=552 and fraction0.2 give Nc=55 after rounding. Source distant-domain rule and current pair sampling are not identical.
- **NR02** · `chromatin.density`, `chromatin.subunit`, `chromatin.n_subunits`, `chromatin.seg`: Current domain mass uses density*4π*(diameter/2)^3 then distributes it over numerical subdivisions; no primary0.2 pg/µm³ measurement located. Assumptions: A Mbp domain is not uniform solid protein. Mesh subdivision is not domain copy count.
- **NR03** · `lamina.filament`, `lamina.neighbours`, `lamina.seg`: Source mesh edge-per-face statistics, source model connectivity and current kNN symmetric union are distinct definitions. Assumptions: Current N≈4πR²/L² uses L as a characteristic area length. No source calibration of neighbour selector3 established.
- **NR04** · `lamina.areal_density`, `lamina.filament`: A sparse lamina layer thickness is not evidence for a uniformly solid areal mass; static build adds areal density to explicit segment mass. Assumptions: 1.35 pg/µm³*0.015 µm=0.02025 pg/µm² is a proxy arithmetic, not a matched-cell measurement. No decision about constituent overlap is made.
- **NR05** · `lamina.turnover_rate`: Slow fluorescent recovery does not uniquely identify a mechanical rest-length relaxation rate. Assumptions: At1e-4/s a pure exponential time constant would be2.78 h and half-time1.93 h, but that identification is not justified by the FRAP bound.
- **NR06** · `envelope.tension`, `envelope.pressure`: Apparent nuclear E times assumed thickness gives a2D coefficient scale; current pressure is then the chosen spherical Laplace2*tension/R reference. Assumptions: 399 Pa*15 nm≈6 pN/µm;2*6/5.1≈2.353 Pa. Young modulus times thickness is not measured prestress. Current radius is cell.radius*cell.nc_ratio; anisotropic/wrinkled geometry needs its own interpretation.
- **NR07** · `envelope.mu_2d`, `envelope.kappa_bend`: Whole-nucleus extension and oocyte-network extension constrain different experimental responses; neither directly isolates the declared edge shear or bending share. Assumptions: Same units do not establish same observable. A K*h²/12 conversion requires an elastic-law/thickness convention; no alternative numeric prior supplied.
- **NR08** · `envelope.area_modulus`, `envelope.mu_2d`, `envelope.double_sheet`: Twice the PC single-bilayer modulus is a construction applied to the current single-sheet surface representation; edge-network area response is a separate static term. Assumptions: Current double_sheet=0 is a representation selector, not evidence of one biological membrane. Rawicz and Dahl assays do not directly validate the additive current constitutive decomposition.
- **NR09** · `envelope.excess_area`, `envelope.wrinkle_wavelength`, `envelope.mesh`: Source20–40% rough excess area motivates a swept geometry; current wavelength and numerical mesh remain separate choices. Assumptions: No primary1 µm correlation-length anchor located. Source unstrained reference area and current volume-preserving sphere must be mapped.
- **NR10** · `envelope.volume_modulus`, `envelope.pressure`, `envelope.tension`: Frozen declaration preserves300 mM*2577=773100 Pa and selected pressure; static code applies a linear finite-volume pressure law. Assumptions: No claim that all300 mM is osmotically retained by the nuclear envelope has been verified here. Pore selectivity, solvent/solute equilibration and timescale need separate evidence; nuclear-transport packet is unchanged. Historical native-run claims in raw source are preserved but not rerun.
- **NR11** · `nucleus.eta_nucleoplasm`, `nucleus.g_prime_nucleoplasm`: The two declarations originate in a shared microrheology analysis. Plateau Gprime and eta_s derived through crossover time are not automatically equal to current selected-lag outputs. Assumptions: Source free latex probes versus current possible tethered nodes; activity and frequency window matter. No covariance, independence assumption or new labels supplied.
- **NR12** · `envelope.areal_density`, `lamina.areal_density`, `envelope.double_sheet`: Current envelope areal mass is an unsourced double-bilayer shorthand; lamina proxy additionally assumes a solid layer. Representation and constituent mass require a defined inventory. Assumptions: No primary0.01 pg/µm² nuclear-envelope measurement located in this bounded pass. Do not infer density from thickness alone or adjust either input automatically.

These relations preserve source analysis and model lineage. Every current same-fit membership is empty, every covariance is null, and no training label is supplied.

## Important unresolved mappings

1. PI define the intended frequency/probe observable before comparing plateau/crossover-derived source values with selected-lag observer outputs; obtain visually verified Tseng primary PDF if available.
2. PI review explicit constitutive mappings between apparent nuclear Young modulus, whole force-extension response, in-plane shear, prestress and bending. Preserve current values until adjudication.
3. Register candidate identities and decide target graph statistic, mass constituents and turnover observable. Face statistics/FRAP/thickness are insufficient by themselves to identify the current inputs.
4. Separate retained-solute/timescale evidence and reference-area definition from PI constitutive choices; locate a genuine wrinkle correlation-length measurement before assigning a sourced interpretation.
5. Obtain MCF7 chromatin mass/domain and attachment observables; explicitly map source/current domain topology instead of treating a shared model table as cell measurements.

## Audit trail

- Atlas SHA256: `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a`.
- Frozen KB SHA256: `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b`.
- Retrieval metadata SHA256: `7baee6089c6f21325e3916bf09b2d229f26b948a25d08f33d81f5c52a0a5ec9d`.
- Historical snapshots: 23, all pinned to `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` with file, JSON-pointer, canonical-record and record-identity checks.
- Static code anchors: 12; exact Git file/span hashes and source text preserved. Source-side groups: 10; relations: 12.
- Valid cached primary sources are local-only. Failed403/non-PDF responses are recorded but excluded from evidence. Tseng author-uploaded primary rendering was inspected without a verified PDF image.
- Validation: exact25-name set, all declarations/priors/aliases, registry/audit duplicates, historical snapshots, local source hashes and relation closure passed. No runtime verification, parameter changes or candidate promotion.

## Limits

- Advisory primary-text and static-code inspection only; no simulation, runtime import, native verification, value/tag/prior changes or training labels.
- Source model assignments, measurements, fit-derived quantities and PI choices remain separate. No inferred covariance or current shared-fit membership.
- Tseng full primary text was accessed through an author-uploaded rendering; publisher/PDF access failed and PDF images were not verified.
- No exact current nuclear-mechanics observable has a newly established matched MCF7 measurement. Fischer provides MCF7 apparent Young modulus, not current tension.
- Unlocated claim means not located in the accessed main text/sections, not proof of absence from all supplements or literature.
- Historical declaration claims about native runs are preserved as raw snapshots, not independently verified. Nuclear transport packet and its interpretations are unchanged.
