# Membrane state and microvillus evidence

Advisory review only. Values, tags, priors, models and training labels are unchanged. Source base: `24b3a44cbd33dd34cde338483be19638aec1be1c`.

The exact scope is **21 valued inputs**: 15 membrane state rows, 4 microvillus rows and 2 footprint rows. Five binding aliases are preserved separately. There are 10 source cards, 14 relations, 6 source estimation groups and 31 immutable historical records. All current-input fit memberships are empty.

Only `membrane.pressure = 40 Pa` has located primary numerical support for its declared **HeLa proxy**; this is still not a target MCF7 measurement. `membrane.volume_modulus` is a declared arithmetic/model derivation. The other rows remain geometry, exploratory coefficients, representation choices, or unresolved transfers.

## Main findings

- **Excess-area definition and citation mismatch.** The 2025 model uses α = (A − Ap)/A and explores 6–20%; its 2016 reference reports 10–30%. Current f is A/Asphere − 1. Even with an identical reference area, f = α/(1 − α), giving 0.06383–0.25 for the 2025 interval. Planar patch and closed-sphere references still differ. Neither interval is adopted.
- **Pressure and tension are different observables.** The HeLa pressure proxy and total surface tension share a shape/force estimator. Effective tether tension also includes membrane-cortex adhesion. These do not directly calibrate the bilayer baseline.
- **Microvilli do not identify a switch.** Qualitative MCF7 surface morphology does not specify density, length, radius or core clearance, and does not make a current feature-off endpoint a fitted absence phenotype. Quantitative immune-cell geometry is retained with its SEM preparation and nested sampling units.
- **Friction is conditional.** The Shi source gives an effective drag estimate of 1,700 ± 300 pN·s/µm³, conditioned on a membrane-obstacle model. This is the same study already reviewed as P15/MM09, and does not validate current 1,000 or a target uncertainty band.
- **Construction and chemistry remain separate.** Wrinkle wavelength and footprint geometry are build choices. Channel density uses built mesh area; microvillus density uses smooth-sphere area. Tip clearance is an independent literal although described as one fluid cell.

## Exact input matrix

| Exact parameter | Saved value and tag | Current evidence role | Cards | Advisory finding |
|---|---|---|---|---|
| `footprint.clearance` | 0.85 1 · EXAMPLE | decision, geometric_construction | — | Inscribed-square clearance scales a sphere-plane intersection. No measured adherent footprint or physical membrane gap is established. |
| `footprint.z_basal` | -7.0 um · EXAMPLE | decision, geometric_construction | — | Basal plane sets a spherical placement envelope; it is not an observed spreading height or contact angle. |
| `membrane.channel_density` | 1.0 1/um^2 · EXAMPLE | placeholder, population_target_unresolved | — | Initial Piezo1 population density has no target measurement. Count denominator is built total membrane mesh area, unlike microvillus smooth-sphere density. |
| `membrane.channel_population_enabled` | 0.0 1 · EXAMPLE | feature_switch, decision | — | Zero disables this population construction branch; it does not assert zero biological channels or govern gating chemistry. |
| `membrane.curvature_law_enabled` | 0.0 1 · EXAMPLE | model_selector, decision | — | Options0/1/2 select bending representation and built-shape reference. They are not material measurements or probabilities. |
| `membrane.dilation_viscosity_2d` | 0.001 pN.s/um · SWEPT | PI_sweep, exploration | MS08 | Independent dilation coefficient is explicitly exploratory. Ryham pore friction does not measure it; no shear-to-dilation substitution is made. |
| `membrane.excess_area` | 0.15 1 · SWEPT | PI_sweep, geometry_target, context_transfer_unresolved | MS02, MS03, MS04, MS07, MS10 | Current f is a closed-sphere-reference geometric budget. Source model intervals use another denominator, and source cell reservoirs/protocols differ; neither.15 nor[.06,.6] is validated as an MCF7 measurement. |
| `membrane.inplane_flow_enabled` | 0.0 1 · EXAMPLE | feature_switch, decision | — | Zero leaves count-flow representation inactive according to the static branch/declaration. Source behavior does not authorize enabling it. |
| `membrane.inplane_friction` | 1000.0 pN.s/um^3 · EXAMPLE | placeholder, conditional_model_comparison | MS09 | Source1700±300 is a related HeLa obstacle-model estimate, not validation of current1000 or an independent material prior. Current declaration calls the coefficient a replaceable stand-in. |
| `membrane.lipid_label_fraction` | 0.01 1 · EXAMPLE | observer_design, numerical_control | — | Passive chemically-identical identity-label fraction is an observer choice, not a membrane lipid composition fraction. |
| `membrane.lipid_tracer_enabled` | 0.0 1 · EXAMPLE | feature_switch, observer_design | — | Enables passive tracer construction/recording; zero is not a finding about lipid mobility. |
| `membrane.mu_2d` | 10.0 pN/um · EXAMPLE | development_placeholder, derived_network_relation | — | 10pN/µm belongs to a development triangular edge network. Its affine relation fixes an associated network area response; fluid-bilayer shear is not thereby measured. |
| `membrane.pressure` | 40.0 pN/um^2 · EXAMPLE | transfer, convenience | MS01 | 40Pa has primary support as an inferred HeLa interphase pressure proxy. Target MCF7 condition, pressure/tension separation and active-law choice remain unresolved. |
| `membrane.surface_viscosity_enabled` | 0.0 1 · EXAMPLE | feature_switch, decision | — | Selects a surface viscosity operator requiring both independently declared shear and dilation coefficients; zero is not zero viscosity. |
| `membrane.tension` | 10.0 pN/um · SWEPT | PI_sweep, context_transfer_unresolved | MS01, MS07, MS10 | Input is bilayer-only baseline10pN/µm with exploratory3–40 band. Total cell-surface or effective tether tensions cannot directly supply it. KB review identity OK does not establish this quantitative separation. |
| `membrane.volume_modulus` | 773100.0 pN/um^2 · EXAMPLE | derived, decision, constitutive_choice | — | 773100Pa=300×2577 is the declared fixed-solute ideal-solution linearization. It is not independently measured; current osmotic.internal300.01552 differs from the rounded300 used in its source arithmetic. |
| `membrane.wrinkle_wavelength` | 1.0 um · EXAMPLE | geometric_construction, placeholder | MS06, MS07, MS10 | 1µm is a rest-geometry correlation wavelength, explicitly not the measured microvillus/caveolar reservoir. Source papers support reservoirs, not this wavelength. |
| `microvillus.areal_density` | 0.0 1/um^2 · SWEPT | PI_sweep, feature_off_endpoint, population_target_unresolved | MS04, MS05 | Density0 is a chosen no-population endpoint, not a fitted absence phenotype. MCF7 qualitative microvilli and immune-cell counts do not determine current MCF7 density. |
| `microvillus.length` | 1.0 um · EXAMPLE | geometry_placeholder, transfer_unresolved | MS04, MS05 | Generic1µm and.5–2µm band lack an exact target quantitative source. Lymphoblast lengths are measurements of a different preparation and are not a replacement band. |
| `microvillus.radius` | 0.05 um · EXAMPLE | geometry_placeholder, transfer_unresolved | MS04, MS05 | Current50nm is membrane-tube radius, not actin-core radius or a diameter. Source62±13nm is lymphoblast diameter; no direct50nm MCF7 radius source located. |
| `microvillus.tip_clearance` | 0.05 um · EXAMPLE | numerical_convention, geometric_construction | — | Core-to-cap clearance is described as one fluid cell. The row is an independent literal rather than a bound to fluid.dx, so its meaning need not track a resolution sweep automatically. |

The raw declarations, original source text, prior objects, atlas training roles, facets and source locations are preserved exactly in JSON. The saved microvillus length band `[0.5, 2]` remains unadjudicated; source SDs do not replace it.

## Source cards

### MS01 · Fischer-Friedrich 2014: HeLa pressure and total surface tension share a shape-force estimator

[10.1038/srep06213](https://pmc.ncbi.nlm.nih.gov/articles/PMC4148660/) · SE409:OK · **identity_OK_only_no_training_or_parameter_promotion**.

Interphase ΔP=40±30Pa and surface tension0.17±0.13mN/m. The latter combines surface/cortex mechanics; it is not the bilayer-only membrane.tension input. The source pressure numerically matches the declared HeLa proxy.

Context: cell: Human HeLa-Kyoto; non-adherent trypsin-rounded interphase; n=8. Separate mitotic group is not baseline. assay: AFM parallel-plate confinement with confocal shape fitting; 37°C; fluorescence labels; PDMS substrate.

Quantity: Hydrostatic pressure excess and total effective cell-surface tension inferred jointly from force and cell shape.

Uncertainty: As reported ±; n=8 cells; exact SD/SEM label for the quoted comparison not established by the selected paragraph/caption.

Anchor: Results paragraph comparing unsynchronized trypsin-rounded cells; Fig.6; Methods/Cell culture and confinement. Access: Full primary XML from Europe PMC.

Limits: Target MCF7 transfer is unresolved. Fig.6 values are as reported; ± type is not explicit in the inspected comparison paragraph/caption. Elsewhere Fig.5 identifies SD, which is not silently imposed on Fig.6.

### MS02 · Hamzeh 2025: 6–20% is a planar membrane simulation range with a different denominator

[10.1021/acs.langmuir.5c03244](https://pubs.acs.org/doi/10.1021/acs.langmuir.5c03244) · no frozen SE/audit identity · **ineligible_candidate**.

The paper explores6–20% and cites Ramakrishnan2016. This is not a new MCF7 area measurement. It differs from current f=A/Asphere−1. Even for one identical reference surface, f=α/(1−α), soα=.06–.20 maps to f≈.06383–.25.

Context: system: Nanoparticle adhesion model, 500×500nm periodic membrane patch; endothelial context claimed in text. definition: Aex=(A−Ap)/A; Ap fixed projected plane; A curvilinear area.

Quantity: Dimensionless selected model excess area.

Uncertainty: Exploration interval; not confidence limits or a probability distribution.

Anchor: Methods/Membrane and reference52; locally inventoried clipped primary PDF. Access: Local primary PDF plus publisher search rendering; direct publisher fetch403.

Limits: Actual planar reference area is not the current closed smooth-sphere reference. Ref52 reports10–30%, so the6–20% claim is not an exact quotation of that cited range. No source promotion.

### MS03 · Ramakrishnan 2016: excess-area ancestry remains conditional and differs from later range

[10.1098/rsos.160260](https://pmc.ncbi.nlm.nih.gov/articles/PMC4929918/) · no frozen SE/audit identity · **ineligible_candidate**.

§2.7 reports estimated endothelial excess area10–30% and bending rigidity40–60kBT. Ref58 is listed as a submitted mechanotyping study; ref57 supplies bending/tension data. The parent study supports an estimator lineage, not a matched MCF7 geometric measurement.

Context: system: Nanocarrier adhesion and tissue-targeting model. Mechanical inputs draw on tether measurements and prior work. definition: Aex=100(A−Ap)/A; subcellular membrane patch.

Quantity: Estimated excess-area input linked to tether-based membrane mechanotyping.

Uncertainty: Range described across endothelial estimates; no current prior coverage.

Anchor: §2.2 membrane definition; §2.7 parameter estimation; references57 and58. Access: Full PMC primary HTML.

Limits: Ref58 raw observations and final publication were not resolved in this bounded pass. The2025 range6–20% is not reproduced here; retain both. Do not merge these as two independent observations.

### MS04 · Guillou 2016: microvillus geometry and area release are different observation channels

[10.1091/mbc.e16-06-0414](https://pmc.ncbi.nlm.nih.gov/articles/PMC5221589/) · no frozen SE/audit identity · **ineligible_candidate**.

Lymphoblast microvilli: density6.9/µm², length284±140nm(432 measurements/10cells), diameter62±13nm(48 measurements/one cell), mean±SD. Cylindrical accounting gives≈40% reservoir. Separate aspiration yields rupture apparent-area ratio1.36±.27(mean±SD).

Context: cell: Human CD4+ lymphoblasts activated with anti-CD3/CD28 and IL-2, used from day6; separate resting T-cell/Jurkat comparators. SEM: 20min room-temperature slide incubation; fixation2%glutaraldehyde; ethanol dehydration/critical-point drying;20–40nm gold coat.

Quantity: Protrusion measurements nested within cells; separate cell-level aspiration assay.

Uncertainty: Reported SD for length,diameter,and rupture ratio; lengths are not432 independent cells.

Anchor: Results/Fig.5–6; Methods/Scanning electron microscopy and data analysis. Access: Full primary PMC HTML.

Limits: Fixed coated immune-cell protrusions are not live MCF7 dimensions. Density sample denominator/uncertainty is not fully given in the selected passage. Diameter is not radius; thickness correction is not reconstructed. Separate SEM/aspiration are not paired observations establishing covariance.

### MS05 · Rizk 1981: qualitative MCF7 microvilli presence does not specify a population count

[10.1159/000145367](https://pubmed.ncbi.nlm.nih.gov/6266191/) · no frozen SE/audit identity · **ineligible_candidate**.

The abstract describes microvilli on the cell surface. It gives no numerical density,length,radius or tip clearance. This is evidence of a phenotype under its culture conditions, not justification to change current feature-off density0.

Context: cell: Pleural-effusion-derived MCF7 line in tissue-culture monolayer/colonies; historical naming in abstract includes MDF-7 typo. assay: Scanning electron microscopy; detailed fixation/dimensions unavailable in accessed abstract.

Quantity: Qualitative cultured-cell surface morphology.

Uncertainty: Not reported; no numerical band.

Anchor: Primary abstract; Karger Acta Anatomica109(1):70–74. Access: Primary abstract rendered by PubMed search and publisher; full article not acquired.

Limits: No evidence for universal absence/presence in every MCF7 preparation. Abstract-only access cannot rule out measurements in inaccessible full text, so retain exact target quantitative gap.

### MS06 · Pietuch 2013: osmotic area regulation supports reservoir mechanisms, not a1µm wrinkle wavelength

[10.1016/j.bbamcr.2012.11.006](https://pubmed.ncbi.nlm.nih.gov/23178740/) · no frozen SE/audit identity · **ineligible_candidate**.

The abstract links osmotic tension adaptation to area reservoirs and membrane-actin contacts. It supplies no quantitative1µm wrinkle wavelength or current.15 excess-area datum.

Context: cell: Confluent epithelial monolayer; PubMed indexing includes dog/kidney. Exact preparation is not reconstructed from indexing. assay: Site-specific AFM indentation and tether pulling during hypo-/hyperosmotic perturbations.

Quantity: Spatiotemporal mechanical response and surface-area regulation.

Uncertainty: No relevant numerical uncertainty in accessed abstract.

Anchor: Abstract of BBA1833:712–722. Access: Primary abstract inspected; full text not acquired.

Limits: Do not silently substitute a distinct2013 Soft Matter Pietuch paper for this BBA citation. Tether-derived tension and membrane-cortex adhesion remain coupled unless independently separated.

### MS07 · Sinha 2011: caveolar buffering is not micron-scale wrinkle calibration

[10.1016/j.cell.2010.12.031](https://pmc.ncbi.nlm.nih.gov/articles/PMC3042189/) · no frozen SE/audit identity · **ineligible_candidate**.

The paper describes60–80nm caveolae as background and estimates≈0.3% released area in its buffering comparison. Tether force probes effective tension that includes membrane-cytoskeleton adhesion; it does not independently identify pure bilayer tension.

Context: cell: Cav1-EGFP HeLa,mouse lung endothelial and other specified source cells; not MCF7. assay: Acute hypo-osmotic shock/stretch; TIRF/EM and differential optical-tether force.

Quantity: Caveolar response and effective tension; released area calculated from lost caveolae.

Uncertainty: Retain source-specific uncertainties; no independent uncertainty distribution for current inputs.

Anchor: Results caveola flattening/tether-force section; Introduction; Discussion. Access: Full primary PMC HTML.

Limits: The.3% is an experiment-specific derived area release, not total cellular excess area or a current f prior. Caveola geometry cannot source1µm wrinkle wavelength, and source cell caveolar status cannot be assumed for target MCF7.

### MS08 · Ryham 2011: solvent friction changes pore-dynamics inference

[10.1016/j.bpj.2011.11.009](https://pmc.ncbi.nlm.nih.gov/articles/PMC3244058/) · no frozen SE/audit identity · **ineligible_candidate**.

With fluid friction retained, the example model uses lipid viscosity1P instead of the1000P needed by the comparison omitting solvent drag. The pore problem does not measure the independent Boussinesq–Scriven dilation coefficient currently swept at.001pN·s/µm.

Context: system: Theory/reanalysis of giant lipid-vesicle pore dynamics in aqueous/glycerol solutions; not cell cortex-coupled membrane. units: ηm=ηl*d, d=3nm; source ηl is bulk lipid viscosity.

Quantity: Pore-radius dynamics fitted with membrane and surrounding-fluid dissipation.

Uncertainty: No measured current dilation band; current sweep remains exploration.

Anchor: Equation1 and Fig.1–3, model/results. Access: Full primary PMC HTML.

Limits: Membrane shear/bulk-lipid/pore drag/dilation viscosity are distinct quantities. The paper is a warning about identifiability, not a numerical source for the current dilation prior.

### MS09 · Shi 2018: effective membrane-cortex drag is a conditional model estimate

[10.1016/j.cell.2018.09.054](https://cohenweb.rc.fas.harvard.edu/Publications/Shi_Cell_CellMembraneResistFlow_2018.pdf) · no frozen SE/audit identity · **ineligible_candidate**.

The primary paper estimates effective dragγ=1700±300pN·s/µm³. It also estimates tension diffusion0.024±.005µm²/s using effective modulus40pN/µm. This is related to the current friction quantity but does not verify the literal1000 or its exploratory range.

Context: cell: HeLa; cytoskeleton-free tether vs cell membrane; DRD2-eGFP FRAP;37°C as pinned MM09. model: Paired Saffman–Delbruck and obstacle-diffusion fits; Darcy permeability with obstacle radius≈2nm.

Quantity: Conditional fit and derived effective friction γ=η/k.

Uncertainty: As reported for drag; paired FRAP inputs are mean±SEM,n10pairs per pinned MM09. No covariance or new error classification.

Anchor: PDFpage4/printedp3, Hydrodynamic Model of Membrane Flow; supplementary model equations. Access: Previously cached author-hosted full primary PDF, reread without new download.

Limits: Same study as P15/MM09, never an independent replicate. Numerical drag depends on obstacle geometry and rheology assumptions; effective modulus40 is not current lipid area modulus200000. Reported ± is not converted to a target prior.

Same-study history: `HM_membrane_material_evidence_source_cards_MM09`, `HM_example_review_primary_reviews_P15`.

### MS10 · Raucher 1999: force plateau and reservoir depletion are protocol-dependent

[10.1016/s0006-3495(99)77040-2](https://pmc.ncbi.nlm.nih.gov/articles/PMC1300480/) · SE417:OK · **identity_OK_only_no_training_or_parameter_promotion**.

A constant-force elongation region followed by rising force supports a reservoir interpretation. This does not provide a unique MCF7 bilayer tension10pN/µm, a.15 whole-cell reservoir, or1µm wrinkle wavelength.

Context: cell: Chick embryo fibroblasts and3T3 fibroblasts; cytoskeletal perturbation arms. assay: Optical-tweezer tether pulls at4µm/s; tether force versus length.

Quantity: Force plateau and length at reservoir depletion.

Uncertainty: No current band inferred from source abstract.

Anchor: Primary abstract; Biophysical Journal77:1992–2002. Access: Primary abstract and bibliographic page; scanned full article not quantitatively reinspected.

Limits: Distinct from Raucher/Sheetz1999 JCB144:497 DOI10.1083/jcb.144.3.497. Historical KB draft cites that different paper; preserve citation identity rather than conflate same-author/year studies.

## Binding aliases outside the valued scope

| Alias | Binding/root |
|---|---|
| `membrane.excess_area_fraction` | `membrane.excess_area`; root `membrane.excess_area` |
| `membrane.mesh` | `resolution.spacing`; root `resolution.spacing` |
| `microvillus.filaments` | `filopodium.filaments`; root `filopodium.filaments` |
| `microvillus.seg` | `resolution.spacing`; root `resolution.spacing` |
| `microvillus.spacing` | `stress_fiber.spacing`; root `stress_fiber.spacing` |

## Relations and source estimation groups

These are source comparisons or frozen-code definitions. They are not causal training edges or current-parameter joint fits.

- **MR01** (`membrane.pressure`, `membrane.tension`, `cell.radius`, `osmotic.internal`): Source pressure and total surface tension share measured geometry/force; current input meanings are distinct. Source pairing does not place current parameters in one fit. Source cards: MS01.
- **MR02** (`membrane.tension`): Total cell-surface tension, effective tether tension and isolated bilayer baseline are different observables. Source cards: MS01, MS07, MS10.
- **MR03** (`membrane.excess_area`): 2025 exploration6–20% cites2016 estimates10–30%; both use(A−Ap)/A. Current f=A/Asphere−1 has a different denominator and reference surface. Source cards: MS02, MS03.
- **MR04** (`membrane.excess_area`, `microvillus.areal_density`, `microvillus.length`, `microvillus.radius`, `membrane.wrinkle_wavelength`): Current code computes extruded tube area on its mesh and subtracts it from f. Source cylindrical reservoir estimates are comparable only with matched area definition and preparation. Source cards: MS04.
- **MR05** (`microvillus.areal_density`, `microvillus.length`, `microvillus.radius`, `microvillus.tip_clearance`): Quantitative immune-cell geometry and qualitative MCF7 morphology are different evidence. Numerical tip clearance has no source measurement. Source cards: MS04, MS05.
- **MR06** (`membrane.wrinkle_wavelength`, `membrane.excess_area`): Reservoir evidence does not determine the seeded1µm geometric field. Source cards: MS06, MS07, MS10.
- **MR07** (`membrane.inplane_friction`, `membrane.viscosity_2d`, `membrane.area_modulus`, `membrane.lipid_diffusion`): Source frictionγ=η/k and tension diffusionDσ=Em*k/η depend on obstacle and effective-modulus assumptions. TracerD is distinct. Source cards: MS09.
- **MR08** (`membrane.dilation_viscosity_2d`, `membrane.viscosity_2d`, `membrane.surface_viscosity_enabled`): Pore-friction inference does not isolate current surface dilation viscosity; the two coefficients remain separate. Source cards: MS08.
- **MR09** (`membrane.volume_modulus`, `membrane.pressure`, `osmotic.internal`, `osmotic.pressure_per_mM`, `osmotic.water_permeation`): StaticK=300×2577 differs slightly from multiplying the saved300.01552×2577=773139.99504Pa. Explicit water transport rejects simultaneous static pressure/volume laws. Source cards: none; static definition.
- **MR10** (`membrane.curvature_law_enabled`, `membrane.surface_viscosity_enabled`, `membrane.inplane_flow_enabled`, `membrane.lipid_tracer_enabled`, `membrane.channel_population_enabled`): Feature selectors encode model/observer choices and do not represent absence of biological material. Source cards: none; static definition.
- **MR11** (`membrane.channel_density`, `membrane.channel_population_enabled`, `membrane.areal_density`, `membrane.channel.excluded_lipid_area`): Channelcount=floor(density×built membrane area+.5); lipid mass displacement is separate. Microvillus count instead uses smooth-sphere area. Source cards: none; static definition.
- **MR12** (`footprint.clearance`, `footprint.z_basal`, `cell.radius`, `stress_fiber.pitch`): rf=sqrt(R²−z²);half-side=clearance×rf/sqrt(2);basal placements are derived geometry. Source cards: none; static definition.
- **MR13** (`membrane.mu_2d`): Kedge=4μ2D/sqrt(3),with affine triangular-network KA=2μ2D. This does not identify fluid-bilayer shear. Source cards: none; static definition.
- **MR14** (`membrane.lipid_label_fraction`, `membrane.lipid_tracer_enabled`, `membrane.lipid_diffusion`): Fraction labels otherwise chemically identical material for passive tracer observation. Source cards: none; static definition.

| Group | Kind | Source cards | Current input membership |
|---|---|---|---|
| MS_G01 | source_joint_shape_force_estimation | MS01 | empty |
| MS_G02 | source_citation_and_definition_lineage | MS02, MS03 | empty |
| MS_G03 | source_morphology_area_accounting | MS04 | empty |
| MS_G04 | source_conditional_model_reanalysis | MS08 | empty |
| MS_G05 | source_conditional_hydrodynamic_estimation | MS09 | empty |
| MS_G06 | source_tether_assay | MS10 | empty |

## Reproducible anchors

Atlas input digest: `4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e`.

| File | SHA256 |
|---|---|
| `atlas.json` | `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a` |
| `kb_snapshot.json` | `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b` |
| `declaration_facets.json` | `db0024384de846b9dc68bee6ca53d63084d4acbad0880c2786ba7808974ac43e` |
| `candidate_sources/membrane_state_retrieval.json` | `a36bda0214a218e6b47205183692bf85ce23378ad597988b50d0d2266df1e644` |

All primary paragraph/page locators, normalized-text hashes, frozen source spans and exact source/audit rows are in JSON. Raw full text and rendered source crops remain local-only in the ignored cache. Error responses are marked unusable.

| Static anchor | Frozen file and lines | Interpretation |
|---|---|---|
| MS_C01 | `aleph/cell/build/membrane.py:14–65` | Current f is total built area excess against a smooth sphere; tube share and wrinkle remainder share one geometric budget. Wavelength presence selects geometric option; no current execution established. |
| MS_C02 | `aleph/cell/build/part.py:660–713` | Wrinkle amplitude is fit by geometric bisection at conserved mesh volume; this is a construction solve, not fit to an observed cell. |
| MS_C03 | `aleph/cell/build/part.py:716–751` | Subtract actual extruded mesh tube area from total f; refuse tube share above f; wavelength and seed define rest geometry. |
| MS_C04 | `aleph/cell/build/microvillus.py:32–103` | Microvillus count is round(density times smooth-sphere area); lengths/site/tilt generator; tube area is measured on the constructed mesh, not a biological measurement. |
| MS_C05 | `aleph/cell/build/microvillus.py:108–147` | Density zero returns no population. Core contour uses radius+length−tip clearance−cortex shell; clearance is geometric, not measured cap chemistry. |
| MS_C06 | `aleph/cell/build/part.py:962–980` | Basal disc and inscribed square derive from sphere-plane intersection and clearance; no spread-cell morphology measurement. |
| MS_C07 | `aleph/cell/build/part.py:556–563` | Triangular network conversion K_edge=4 mu_2d/sqrt(3); an affine network relation, not isolated fluid-bilayer shear. |
| MS_C08 | `aleph/cell/assemble.py:282–342` | Separate surface viscosity/curvature switches; shear and dilation coefficients retain independent declarations. |
| MS_C09 | `aleph/cell/assemble.py:347–399` | Channel population switch gates physical nodes and displaced-lipid bookkeeping; channel density is over built mesh area and is not gating chemistry. |
| MS_C10 | `aleph/physics/surface_channels.py:441–467` | Area-weighted channel population count uses floor(density*sum(face areas)+0.5). |
| MS_C11 | `aleph/cell/assemble.py:1071–1088` | Reads current pressure/tension/volume-law coefficients into surfaces; replaces hinge bending only when curvature switch selects it. |
| MS_C12 | `aleph/cell/assemble.py:1168–1201` | Curvature option2 selects built rest shape. Passive lipid tracers have no force/mass feedback and label fraction is an observation design. |
| MS_C13 | `aleph/physics/surface_count_flow.py:1–20` | Friction b has drag/area/velocity units; tension-driven count flux is model-defined. It is distinct from viscosity and tracer diffusion. |
| MS_C14 | `aleph/physics/operators.py:817–850` | Static surface laws: tension baseline plus positive area strain; pressure baseline plus linearized enclosed-volume response. |
| MS_C15 | `aleph/cell/transport_build.py:142–164` | Explicit water-permeation path rejects simultaneous declared static pressure/volume modulus; no switch change proposed. |
| MS_C16 | `aleph/laws/compartments.py:236–270` | Legacy resolver explicitly separates bilayer tension from apparent cortex-attached tension; its comments/bands are source claims, not current runtime evidence. |
| MS_C17 | `aleph/docs/v2_audit/KB-2026-09-1x-membrane-microvilli.md:1–54` | Historical source-search memo contains proposed transfer and a zero-density interpretation. Preserve it as advisory historical reasoning; zero current switch is not a claim that biological cells lack microvilli. |
| MS_C18 | `aleph/cell/transport_build.py:184–225` | Source pressure_per_mM is rounded; explicit water path instead uses actual kBT and counts with water-volume fractions. Do not equate it with the static volume-modulus path. |

## Immutable historical reviews

History records retain exact snapshots, record identities, JSON pointers, file and canonical-record hashes. Earlier assertions are not silently replaced. P15/MM09 is one Shi study.

| Identity | Git commit | JSON pointer |
|---|---|---|
| `{"name": "footprint.clearance"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/153` |
| `{"name": "footprint.z_basal"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/154` |
| `{"name": "membrane.channel_density"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/194` |
| `{"name": "membrane.channel_population_enabled"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/195` |
| `{"name": "membrane.curvature_law_enabled"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/196` |
| `{"name": "membrane.inplane_flow_enabled"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/198` |
| `{"name": "membrane.inplane_friction"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/199` |
| `{"name": "membrane.lipid_label_fraction"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/203` |
| `{"name": "membrane.lipid_tracer_enabled"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/204` |
| `{"name": "membrane.mu_2d"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/206` |
| `{"name": "membrane.pressure"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/207` |
| `{"name": "membrane.surface_viscosity_enabled"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/209` |
| `{"name": "membrane.volume_modulus"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/211` |
| `{"name": "membrane.wrinkle_wavelength"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/212` |
| `{"name": "microvillus.length"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/225` |
| `{"name": "microvillus.radius"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/226` |
| `{"name": "microvillus.tip_clearance"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/parameters/227` |
| `{"id": "footprint_geometry"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/100` |
| `{"id": "channel_density"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/132` |
| `{"id": "membrane_switches"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/133` |
| `{"id": "membrane_friction"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/135` |
| `{"id": "lipid_label"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/139` |
| `{"id": "membrane_shear"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/141` |
| `{"id": "membrane_pressure"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/142` |
| `{"id": "membrane_volume_modulus"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/145` |
| `{"id": "membrane_wrinkle"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/146` |
| `{"id": "microvillus_geometry"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/153` |
| `{"id": "microvillus_clearance"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/review_groups/154` |
| `{"id": "P15"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/example_review.json#/primary_reviews/14` |
| `{"name": "microvillus.length"}` | `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` | `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json#/parameters/39` |
| `{"id": "MM09"}` | `17b210444266b7651f8089b96ab713529daab590` | `aleph/outputs/outer/parameter_atlas_20260929/membrane_material_evidence.json#/source_cards/8` |

## Limits and next source work

- All conclusions advisory,not PI-adjudicated. No parameter,prior,tag,source registry,mechanism or training target was changed.
- Static source inspection at24b3a44cb does not establish actual runtime execution or validity of current device results.
- Source roles and uncertainty types are not inherited by current EXAMPLE/SWEPT inputs. Source group membership of current parameters is empty.
- A biological phenotype observed in a paper does not make a feature-off endpoint a measured absence statement.
- Pressure proxy is HeLa; no matched target MCF7 membrane state measurement located.
- Unregistered/no-OK sources remain candidate ineligible even when primary text was inspected.
- No covariance,matched-cell joint distribution,alternative numerical prior,or new observation is invented from reused source texts.
- Source errors and metadata conflicts remain visible;immutable historical reviews are not silently corrected.
- The smooth reference geometry is a discretized icosphere. Area-budget intent and static formulae do not verify the realized area/volume of any native build.

- PI review: resolve membrane excess-area denominator/reference geometry before evaluating any literature transfer;trace2016 submitted mechanotyping ref58 to raw measurements.
- Acquire target MCF7 microvillus density,length,diameter and surface area with culture state,fixation/imaging and cell-vs-protrusion sampling unit.
- Separate bilayer tension,membrane-cortex adhesion and total cortical surface tension in matched pressure/geometry/tether observations.
- Measure membrane-localized functional Piezo1 population per documented physical membrane area;do not equate switch0 with protein absence.
- Adjudicate fixed-solute static modulus versus explicit water transport as a model choice;retain current coefficients meanwhile.
- Keep dilation viscosity exploratory until an observer separates solvent dissipation,shear and dilational surface response.

Validation: exact 21-row set; unchanged declaration/prior/facet snapshots; 31 historical records; 18 frozen code spans; all source identities and local claim locators checked. **0 mismatches in 643 metadata checks.** No runtime imports, physics, model training, test suite or commit.
