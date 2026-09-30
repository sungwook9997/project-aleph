# Alpha-actinin crosslink evidence review

Advisory review only. Frozen source `24b3a44cbd33dd34cde338483be19638aec1be1c`; input digest `4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e`. JSON SHA256 `576a53a9e6f808c228e28f18e14738ad72b827a8817eb8522cd3e7de5cc18132`. No parameter, tag, prior, molecular model, covariance or training label changed.

현재 crosslink 입력 11개(예시 9개, 출처 표시 2개)를 대조했다. 출처가 있는 두 숫자는 원문 적합값과 일치하지만, 이를 MCF7의 직접 측정으로 해석하지 않는다. 10개 논문 카드 중 등록된 신원은 SE119와 SE570 두 개다. 나머지 8개 후보는 사용 불가 상태를 유지한다.

가장 중요한 구분은 분자의 전체 길이, 결합을 탐색하는 거리, 물속에서 이동하는 유효 반경이 서로 다른 양이라는 점이다. 또 용액 속 이차 결합률, 코드의 초당 결합 시도율, 두 팔 중 하나가 끊어지는 속도, 단백질 전체가 떠나는 시간은 같은 관측량이 아니다.

| Exact input | Frozen declaration | Review | Cards |
|---|---|---|---|
| `crosslink.arm_reach` | 0.03 um · EXAMPLE | The declared half-reach and exploration band have no independent assay anchor. Full-dimer shape does not identify an arm encounter radius. | XC05 |
| `crosslink.conc` | 5.0 uM · EXAMPLE | No absolute MCF7 alpha-actinin concentration supporting the 1–5 µM prose was located. In-vitro titrations are not cellular abundance. | XC03 |
| `crosslink.k` | 4600.0 pN/um · EXAMPLE | Whole-link effective stiffness remains a PI modeling choice. Source well curvature, repeat mechanics and domain unfolding are separately reviewed; no replacement coefficient proposed. | XC01, XC05, XC06, XC08, XC09, XC10 |
| `crosslink.k_off0` | 0.066 1/s · SOURCED | The declared number is located in the existing primary fit. Companion rate/lifetime studies use different observables and cannot be merged into one measured spread. | XC01, XC02, XC03, XC04, XC07 |
| `crosslink.k_on` | 10.0 1/s · EXAMPLE | The current encounter clock remains uncited. A solution second-order constant requires a concentration and encounter-model mapping before comparison. | XC02, XC03 |
| `crosslink.length` | 0.035 um · EXAMPLE | Primary dimer structure gives a comparable geometric scale. Current rest length and the source prose word rod still need an explicit structural endpoint definition. | XC05 |
| `crosslink.molecular_model` | 0 1 · EXAMPLE | Frozen value 0 selects the incumbent declaration. Opt-in finite two-arm semantics are retained separately; no claim of executed runtime behavior. | Static code only |
| `crosslink.molecular_weight` | 206000 Da · EXAMPLE | Two protomers per dimer is structurally supported. Exact 206000 Da and its band still require named isoform/sequence, modifications and homo/heterodimer composition. | XC05 |
| `crosslink.radius` | 0.005 um · EXAMPLE | Hydrodynamic Stokes radius and structural width offer different comparators. Neither directly identifies the declared effective owner radius and exploratory band. | XC02, XC05 |
| `crosslink.reach` | 0.06 um · EXAMPLE | The 60 nm capture length remains an uncited algorithmic encounter convention. Structural end-to-end length alone does not determine it. | XC05 |
| `crosslink.x_beta` | 0.000275 um · SOURCED | The declared transition distance matches the source fit. The raw declaration’s SEM wording remains unconfirmed in accessed main text; target transfer is separate. | XC01 |

## Primary evidence cards

The source cards retain source-side estimates and assumptions. Their shared assay or fitting history does not define current-input fit membership. Every card is ineligible as a training target.

### XC01 · Ferrer et al. 2008: actin–ABP rupture and energy-landscape fit

[Primary source](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf) · DOI `10.1073/pnas.0706124105` · SE119:OK.
Anchor: pp. 9223–9224 Rupture Force Distributions and Modeling; p. 9225 Materials and Methods. Access: full_primary_PDF_and_official_PMC_HTML.

Hummer–Szabo fit reports k0=0.066±0.028/s, x‡=2.75±0.79 Å, energy-well curvature kBTκm=455±215 pN/nm. Their joint origin is retained. Curvature is not intact-linker axial compliance.

Context: Rabbit skeletal-muscle alpha-actinin and actin; commercial lyophilized alpha-actinin; Optical trap, stage-velocity force ramps; loading rates 4–50 pN/s; room temperature; Alexa Fluor 555 phalloidin-labelled F-actin; ABP dilution 20 nM during incubation, followed by washing.
Observed quantity: Single ABP complex linking two filaments; fitted escape coordinate, not a whole rod extension measurement.
Uncertainty: Numerical ± values found; fit-parameter SD/SEM/CI definition not located in accessed main text.
Limits: Authors warn pooled loading rates and multiple reaction coordinates can lower apparent x‡. Main text does not locate the uncertainty convention for these fit parameters; Fig. 3 SEM refers to mean rupture force. SI retrieval was blocked. Frozen SE119 calls the rate Bell–Evans and carries an older whole-stiffness interpretation; identity OK does not resolve these claim conflicts. No target MCF7/310 K validation.

### XC02 · Wachsstock et al. 1994: binding-domain kinetics and whole-protein inference

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC1275778/) · DOI `10.1016/S0006-3495(94)80856-2` · SE570:OK.
Anchor: Official scanned pp. 802, 805–807; Fig. 4A–D. Access: official_primary_page_images_visually_checked.

ABD kon=3e6 M−1s−1 and koff=57/s fit stop-flow traces; Kd=19.5 µM. Whole chicken rates are inferred: Stokes radii 7.4/2.4 nm and diffusion constants 2.94/9.2e−7 cm²/s motivate reported kon=1.20e6; prior Kd=0.55 µM then yields 0.66/s. Amoeba koff=5.2/s is rheology-fitted; kon uses prior Kd.

Context: Chicken smooth-muscle whole alpha-actinin; thermolysin-produced, rhodamine-labelled ABD; Acanthamoeba castellanii alpha-actinin; rabbit skeletal actin; Stopped-flow parallel fluorescence component plus equilibrium assays for ABD; gel rheology for amoeba; Rheology explicitly 25 C; do not assign that temperature to every kinetic measurement.
Observed quantity: ABD binding to F-actin sites, diffusion-rescaled whole-protein estimates, and a separate rheological fit.
Uncertainty: Fig. 4D apparent-rate SEM only; no universal whole-protein confidence interval.
Limits: Not independent directly measured whole-dimer rates. Printed simple diffusion-ratio arithmetic gives 0.959e6 rather than reported 1.20e6; reconciliation is unresolved. Fig. 4D SEM is for apparent-rate observations, not all inferred constants. The Stokes radius does not measure a capture radius.

### XC03 · Wachsstock et al. 1993: equilibrium affinity and gel assembly

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC1225716/) · DOI `10.1016/S0006-3495(93)81059-2` · NOT_REGISTERED; candidate ineligible.
Anchor: Official scanned pp. 205–207; Determination of binding constants; Fig. 1 caption. Access: official_primary_page_images_visually_checked.

Fig. 1 fits Kd=0.59 µM for chicken and 4.73 µM for amoeba (abstract rounds 0.6 and 4.7). The 1994 use of 0.55 µM is preserved separately.

Context: Chicken smooth-muscle or A. castellanii alpha-actinin with rabbit skeletal actin; 2 h room-temperature copolymerization, 120000 g sedimentation, SDS-gel densitometry and equilibrium binding fit; p. 206 prints 0.1 mM KCl in the binding assay; rheology uses separate 50 mM KCl conditions. Retain the printed value without silently repairing it..
Observed quantity: Free versus bound protein in a reconstituted binding assay; not cellular absolute abundance.
Uncertainty: No quantitative uncertainty for the quoted fitted Kd located on checked pages.
Limits: In-vitro titration concentrations and bundling thresholds do not establish MCF7 1–5 µM total alpha-actinin. The viewed pages do not settle whether concentration normalization counted dimers or polypeptide equivalents.

### XC04 · Ehrlicher et al. 2015: ACTN4 cellular exchange

[Primary source](https://dash.harvard.edu/server/api/core/bitstreams/b1f2d90f-059a-4c0c-9b7f-bc70ccfc28ad/content) · DOI `10.1073/pnas.1505652112` · NOT_REGISTERED; candidate ineligible.
Anchor: Printed p. 6620 Fig. 1 and Recovery Dynamics; Methods. Access: full_primary_PDF_author_institution.

WT recovery 29±13 s; K255E 86±29 s; the paper explicitly defines mean±SD. Authors map tau to 1/koff by a reaction-limited recovery assumption.

Context: GFP-tagged WT or K255E ACTN4 transfected in HeLa cells for FRAP; Approximately 1 µm bleached region; 1 s bleach, images every 2 s for 2 min; single-exponential recovery; Mechanical/motility assays use human dermal fibroblast lines, not the HeLa FRAP cohort.
Observed quantity: Fluorescence recovery time and immobile fraction; molecular escape inferred only under a slow-unbinding/fast-transport assumption.
Uncertainty: Mean ± SD; FRAP sample size not located in this pass.
Limits: FRAP is neither FRET nor a force-clamp lifetime assay. Sample size for this time distribution was not located. Cell culture temperature alone does not establish the imaging-stage temperature. Inverting the group mean and SD does not produce a measured rate distribution.

### XC05 · Ribeiro et al. 2014: structure of human muscle alpha-actinin

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC4259493/) · DOI `10.1016/j.cell.2014.10.056` · NOT_REGISTERED; candidate ineligible.
Anchor: Results: The Structure of Alpha-Actinin-2; Fig. 1B–C; BioC passage 25 (zero-based). Access: full_primary_BioC_XML.

Reported overall dimensions are approximately 360 Å long and 60 Å wide; each protomer has four spectrin-like repeats plus terminal domains.

Context: Human muscle alpha-actinin-2 dimer; X-ray structure at 3.5 Å resolution; First 34 and last 2 residues absent from the refined model.
Observed quantity: Crystallographic shape of full alpha-actinin-2 dimer, not isolated central rod or hydrated sphere.
Uncertainty: not_reported_or_not_applicable
Limits: This is structural-scale context for length, not an MCF7 isoform-specific 35 nm rest length or 60/30 nm capture distance. Eight repeats across a dimer are not eight serial repeats along one axial load path. Exact current 206000 Da mass is not anchored here.

### XC06 · Golji et al. 2009: alpha-actinin rod mechanics simulations

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC2676514/) · DOI `10.1371/journal.pcbi.1000389` · NOT_REGISTERED; candidate ineligible.
Anchor: Molecular-dynamics extension / Materials and Methods; BioC passages 76–77. Access: full_primary_BioC_XML.

The study supports distinguishing terminal flexibility from a rigid interior and testing alternative loading geometries.

Context: PDB 1HCI rod: four-repeat monomer and eight-repeat dimer, plus individual repeat construct; Normal-mode analysis and molecular dynamics, not an experimental measurement; 310 K; 1 fs steps; 100–200 pN imposed extension; implicit 500 ps and explicit 100 ps simulations.
Observed quantity: Computed bending, torsion and extension of a rod-domain structure.
Uncertainty: not_reported_or_not_applicable
Limits: It does not directly measure the current whole-linker 4600 pN/µm coefficient; simulated molecular timescale and loads do not define a cellular prior. We did not run these models.

### XC07 · Miyata et al. 1996: loaded actin–alpha-actinin bond lifetime

[Primary source](https://pubmed.ncbi.nlm.nih.gov/8645711/) · DOI `10.1016/0304-4165(96)00003-7` · NOT_REGISTERED; candidate ineligible.
Anchor: Original primary abstract (Europe PMC CORE record, PMID 8645711). Access: primary_abstract_only.

Abstract reports 1.4–44 pN rupture forces and 0.1–20 s lifetimes, decreasing with increasing force.

Context: Skeletal-muscle actin and alpha-actinin; alpha-actinin-coated nitrocellulose glass; Optical trapping via gelsolin-coated bead at actin barbed end; approximately one alpha-actinin per µm actin.
Observed quantity: Unbinding under external load at an immobilized surface.
Uncertainty: Observed range under varying load, not SD/SEM/CI.
Limits: These are not zero-load lifetime bounds or a confidence interval for current koff0. Full force-control protocol, sample size and lifetime classification details remain unverified.

### XC08 · Rief et al. 1999: force-induced unfolding of spectrin repeats

[Primary source](https://pubmed.ncbi.nlm.nih.gov/9973570/) · DOI `10.1006/jmbi.1998.2466` · NOT_REGISTERED; candidate ineligible.
Anchor: Original primary abstract (PMID 9973570). Access: primary_abstract_only.

Abstract supports 25–35 pN unfolding and refolding faster than one second on release.

Context: Spectrin repeat constructs; exact construct-to-number assignment requires full text; AFM unfolding with velocity-dependent forces.
Observed quantity: Domain unfolding and refolding, not intact-alpha-actinin small-extension compliance.
Uncertainty: Abstract gives a force range, not a universal uncertainty interval.
Limits: The exact alpha-actinin species/construct associated with each number and the declaration’s approximately 30 nm extension claim were not independently confirmed from full text. A rate-dependent domain unfolding force is not a universal cellular yield threshold.

### XC09 · Le et al. 2017: human alpha-actinin-1 domain mechanics

[Primary source](https://doi.org/10.1016/j.celrep.2017.11.040) · DOI `10.1016/j.celrep.2017.11.040` · NOT_REGISTERED; candidate ineligible.
Anchor: pp. 2715–2717 Figs. 1–2; p. 2719 Fig. 4; p. 2721 Experimental Procedures. Access: primary_full_article_text_on_author_upload; DOI publisher access unavailable.

Four rod repeats show approximately 17.9/27.3 pN unfolding peaks near 1 pN/s and approximately 26.5 nm increments. The eight full-length monomer events include CH and EF domains; they are not eight spectrin repeats. Fig. 4 dimer force-extension curves are Gillespie simulations conditional on domain kinetics and pairing assumptions.

Context: Human ACTN1 full-length monomer and domain constructs; Magnetic tweezers, N-terminal avi-biotin/C-terminal spytag tether; 21±1 C, PBS, 1% BSA, 1 mM EGTA and DTT.
Observed quantity: Measured domain transitions and a separate stochastic prediction for a partly unpaired dimer.
Uncertainty: Peak locations are not confidence limits; in-vitro temperature ±1 C is protocol control, not biological variability.
Limits: This extends the domain-level evidence; it does not validate the current low-strain whole-dimer coefficient or a single load-independent yield force. Fig. 4 n=30 denotes simulations, not measured cells or independent proteins.

### XC10 · Paramore et al. 2006 (online 2005): spectrin-repeat extension

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC1367040/) · DOI `10.1529/biophysj.105.066969` · NOT_REGISTERED; candidate ineligible.
Anchor: Methods: Molecular Dynamics Simulations; Results: Fig. 4; Discussion. Access: full_primary_PMC_HTML.

The reported 1700±100 pN/nm is a linear-regression extrapolation for the specified spectrin construct. Authors caution that whole-protein compliance cannot be obtained from a simple series of repeat extensions alone.

Context: Chicken-brain alpha-spectrin repeat 16, PDB 1AJ3; not an alpha-actinin repeat; Nonequilibrium MD with a covalently periodic helical linker; 300 K; finite-rate results extrapolated to zero frequency.
Observed quantity: Simulated individual repeat axial response.
Uncertainty: Figure error-bar convention preserved; no cellular uncertainty assigned.
Limits: This verifies the quoted scale and changes its identity/context: spectrin simulation, not alpha-actinin experimental compliance. Fig. 4 describes error bars as standard deviation of the mean; an exact separate definition for the extrapolated ±100 is not assumed.

## Relations and code meaning

**XR01 · source_joint_fit_quantity_separation** — `crosslink.k_off0`, `crosslink.x_beta`, `crosslink.k`
XC01 jointly estimates escape parameters and bond-well curvature. Current whole-linker k is a different quantity; the source fit is not a fit of the current three inputs.
Anchors: XC01.

**XR02 · source_conditional_derivation** — `crosslink.k_on`, `crosslink.k_off0`, `crosslink.radius`
ABD kinetics, diffusion scaling and prior equilibrium affinity form a source-side inference chain; whole-protein association is not independently observed.
Conditions: Comparable reaction geometry for ABD and whole protein; Diffusion-controlled encounter approximation; KD and kinetic estimates share sufficiently compatible experimental definitions; Printed input arithmetic and 1993/1994 KD difference remain unresolved.
Anchors: XC02, XC03.

**XR03 · second_order_to_encounter_quantity_gap** — `crosslink.k_on`, `crosslink.conc`, `crosslink.reach`, `crosslink.arm_reach`
Solution association [M−1s−1] cannot be substituted directly for the current [s−1] attempt clock.
Conditions: A valid mapping needs free-partner/site concentration and spatial encounter/availability/selection definition; Geometric capture and rate multiplication must not count the same encounter twice.
Anchors: XC02, XC_C02, XC_C09, XC_C10.

**XR04 · static_capacity_definition** — `crosslink.conc`, `crosslink.molecular_model`
Incumbent concentration-derived owner capacity is clipped by live cortex-node count; the finite molecular builder uses an unclipped molecule count. Neither count is automatically a measured doubly bound population.
Anchors: XC_C01, XC_C04, XC_C05, XC_C06, XC_C07.

**XR05 · static_two_arm_conversion** — `crosslink.molecular_model`, `crosslink.k`, `crosslink.length`, `crosslink.k_on`, `crosslink.k_off0`, `crosslink.arm_reach`
Opt-in model assigns two arms per protein, each with 2k, L0/2 and koff0/2; each arm retains kon. These are code modeling conventions, not additional literature measurements.
Conditions: Series-stiffness equivalence presumes a compatible collinear configuration; Halving each arm hazard equates whole bridge loss only for first-arm failure from a doubly bound state with equal independent hazards; complete molecular escape with rebinding is different; Arms may bind the same filament; Host relation rows address the nearer material-segment node; exact device consumption of material-site overrides was not verified..
Anchors: XC_C07, XC_C11.

**XR06 · incommensurate_lifetime_observables** — `crosslink.k_off0`
Force-ramp escape fit, solution/domain-derived rates, gel relaxation, cellular FRAP and loaded surface-bond lifetimes require separate observation models.
Conditions: Isoform, force geometry, bound-state definition, transport/rebinding and time censoring must match before any transfer.
Anchors: XC01, XC02, XC04, XC07.

**XR07 · distinct_geometry_and_protein_units** — `crosslink.length`, `crosslink.reach`, `crosslink.arm_reach`, `crosslink.radius`, `crosslink.molecular_weight`
Full structural dimer length, central-rod length, Stokes radius, owner radius and capture distance are distinct quantities. Exact molecular mass additionally requires an isoform/sequence and oligomer definition.
Anchors: XC02, XC05.

**XR08 · mechanics_scale_and_loading_protocol** — `crosslink.k`, `crosslink.length`
Folded-repeat extension, domain unfolding, dimer pairing and full-link axial response are separate observables; domain-level data alone do not identify the current effective coefficient.
Anchors: XC06, XC08, XC09, XC10.

**XR09 · static_declaration_code_drift** — `crosslink.k`, `crosslink.length`, `crosslink.x_beta`
The raw k source says as-built rest distance; the frozen crosslink constructor supplies fixed crosslink.length. Neither is silently corrected in this review.
Anchors: XC_C02, XC_C03, XC_C08.

**XR10 · conditional_project_bounds_not_measurement_interval** — `crosslink.k`, `crosslink.x_beta`, `crosslink.k_off0`
The current k declaration combines thermal and timestep-specific project bounds. Its interval is not a measured uncertainty band; U08 remains the immutable prior review.
Conditions: Temperature, Bell length and timestep conventions govern the stated project bounds; Do not infer a source covariance from sharing a formula.
Anchors: XC01, XC_C01, XC_C02.

## Frozen code anchors

| ID | Source span | Interpretation |
|---|---|---|
| XC_C01 | `aleph/cell/bonds.py:59–72` at `24b3a44cb` | Incumbent concentration conversion uses geometric closed-surface volumes; kBT uses cell.temperature. |
| XC_C02 | `aleph/cell/bonds.py:118–127` at `24b3a44cb` | Two-state encounter and zero-force off rates; force scale kBT/x_beta; rest-length mode chosen by argument. |
| XC_C03 | `aleph/cell/bonds.py:760–763` at `24b3a44cb` | Incumbent crosslink construction passes crosslink.length as a fixed rest length, unlike the older as-built wording in crosslink.k source. |
| XC_C04 | `aleph/cell/bonds.py:857–861` at `24b3a44cb` | Opt-in molecular model removes the incumbent crosslink/filamin kind; this is static conditional code. |
| XC_C05 | `aleph/cell/bonds.py:865–892` at `24b3a44cb` | Incumbent capacity rounds concentration times geometric volume then caps by live owner-node count. |
| XC_C06 | `aleph/cell/build/molecules.py:17–43` at `24b3a44cb` | Finite molecular builder rounds concentration times its explicitly excluded-volume geometry without target-node clipping; no cytosolic-water factor here. |
| XC_C07 | `aleph/cell/build/crosslinkers.py:150–203` at `24b3a44cb` | Opt-in two-arm model: two sites per protein, arm k=2 whole k, rest length=whole length/2, off=whole off/2, same-filament arms permitted. |
| XC_C08 | `aleph/physics/kinetics.py:952–980` at `24b3a44cb` | Static transition kernel uses signed axial load with force-exponent clipping; it does not establish a measured molecular escape law. |
| XC_C09 | `aleph/physics/kinetics.py:1097–1128` at `24b3a44cb` | Attachment candidate geometry and selection flags affect the interpretation of an encounter clock. |
| XC_C10 | `aleph/physics/kinetics.py:1149–1161` at `24b3a44cb` | Attachment attempt probability uses the declared first-order rate and dt, before geometric candidate selection. |
| XC_C11 | `aleph/cell/crosslinker_molecules.py:158–176` at `24b3a44cb` | Host relation rows choose the nearer node of each selected material segment. This discrete address is separate from the source molecular binding endpoint; actual device override consumption was not tested. |

No runtime module was imported or executed. The model-0 declaration and conditional model-1 source are preserved separately. Host near-node addressing is recorded; device override consumption and physical performance remain unverified.

## Historical lineage

Previous related reviews are pinned to immutable Git `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09`. Their snapshots, file hashes and canonical object hashes are in the JSON. The Ferrer study and previously cited Wachsstock/Miyata studies are not counted as new independent studies. The new work clarifies primary quantities, uncertainty conventions, species and inferential steps.

| ID | Frozen file / pointer | Object SHA256 |
|---|---|---|
| HX_crosslink_capture | `example_review.json/review_groups/56` | `069d47837fe7ddc47b468506d7b2d3a2149364afbd935519449798a7826b9b8a` |
| HX_crosslink_abundance | `example_review.json/review_groups/57` | `8a84f25ae0987a189086362c7cc048f71ae50d80ef84662ab9d4f8790cd7444f` |
| HX_crosslink_effective_stiffness | `example_review.json/review_groups/58` | `cbc214e0ef20876c6027af15fc0b3f9ae4bd8c246969d924dd73b6195d7bd4d6` |
| HX_crosslink_uncited_on | `example_review.json/review_groups/59` | `8d736e770d84301ae21844df2403f2c72ced41413de6c12c82b71b275d032535` |
| HX_crosslink_rod_size | `example_review.json/review_groups/60` | `0377e5e3b8c3cc39d42801c44ec9177c1fd3a50312fe6cfd470c69ebf3d3f2d4` |
| HX_crosslink_representation | `example_review.json/review_groups/61` | `e7d1348132374806ac49acd5e91dfd2a26f6e14aa382c12547353254abcb34f8` |
| HX_literature_k_off0 | `literature_review.json/parameters/24` | `88c242f847330f1f44ddf4884c644dbde9c7de1cdeaa2e6c54cf060e1e2d0ce6` |
| HX_literature_x_beta | `literature_review.json/parameters/25` | `6eee4e4629255aba60c5702a7f4ee64dff4cc7063b833cbe49a588f6c6ec5c67` |
| HX_U08 | `uncertainty_review.json/review_cards/7` | `06b58013f362f28c94c407a79b7b4a8ce5f73529a528a444f1a28a6582d3c61d` |
| HX_uncertainty_arm_reach | `uncertainty_review.json/parameters/20` | `f0de5adf42141be519f953fd1dcda20a0ecfb02b2c9daa713528845be41b6ad9` |
| HX_uncertainty_conc | `uncertainty_review.json/parameters/21` | `ccbeaff58a7477591e593957258bc913e6fb28ca67b49f5d61916dd2f88109b1` |
| HX_uncertainty_k | `uncertainty_review.json/parameters/22` | `afab8262d0bc01cc5d7e861393bb05d53fb967b5fa2e2bf898025517f93633ce` |
| HX_uncertainty_molecular_weight | `uncertainty_review.json/parameters/23` | `2a11268aeb1087e9954af8a65dca74e4cf851d81968f773a806247439605c0e3` |
| HX_uncertainty_radius | `uncertainty_review.json/parameters/24` | `2602e4a548de485479742afc87617edf3ff97225b91a57d1a1fb4eeaae456ed8` |

## Next source work

- `crosslink.conc`, `crosslink.molecular_weight`: Obtain calibrated MCF7 ACTN1/ACTN4 copy numbers or absolute proteomics in the relevant state, molecular composition, free/bound fractions and measured cytoplasmic volume; do not substitute fold enrichment.
- `crosslink.k_on`, `crosslink.k_off0`, `crosslink.radius`: Resolve Wachsstock printed-number chain and concentration denominator from original assay records; define a source-to-encounter mapping without independently multiplying concentration twice.
- `crosslink.k`, `crosslink.length`: Specify isoform, pulling endpoints, load regime and low-extension whole-dimer observable; adjudicate the rest-length prose/code difference separately.
- `crosslink.x_beta`, `crosslink.k_off0`: Obtain Ferrer supporting methods to identify fit-parameter uncertainty convention and covariance if available; keep scalar errors and joint fitting distinct.
- `crosslink.reach`, `crosslink.arm_reach`, `crosslink.molecular_model`: PI should state the coarse geometric/kinetic interpretation; source measurements alone cannot choose these representation conventions.

## Validation and limits

Exact frozen row set and raw declarations/prior snapshots: 11/11. Cards: 10 (8 full primary inspections, 2 original abstracts). Relations: 10. Source-estimation groups: 7. Historical pins: 14. Frozen code spans: 11. Registered source UIDs: SE119 and SE570, both OK identity only. No dangling IDs or hash mismatches.

Retrieval metadata: `candidate_sources/crosslink_retrieval.json`, SHA256 `6ee178cb8906074f46ba7d0727d7feb6506211300de684442add7cafec4f7db1`. Full text/images remain ignored local caches. Failed PDF/XML responses and the superseded empty PMID retrieval are explicitly excluded as evidence.

- Static code was read at the frozen commit without cell/runtime imports, simulation, training, or native verification. Conditional paths are not claimed to have run.
- No absolute MCF7 abundance, exact isoform-specific dimer mass, capture radius or whole-link small-extension stiffness was established.
- Current same-fit memberships remain empty; source-estimation groups describe literature lineage only, never empirical covariance.
- FRAP, equilibrium titration, force-ramp escape, loaded lifetimes, rheology and domain unfolding remain distinct quantities.
- Rief and Miyata full text were not acquired; precise claims beyond their original abstracts remain unresolved.
- All local full-text/image caches are ignored and must not be distributed with the compact review. Retrieval failures and superseded zero-result responses are not evidence.
