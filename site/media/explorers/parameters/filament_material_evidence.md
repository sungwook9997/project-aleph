# Filament material, IF and microtubule evidence review

Advisory only; not PI-adjudicated. No values, tags, priors, mechanisms, source registry or training labels were changed. Static source inspection is not runtime verification.

Scope: **27 valued inputs** (material 9, IF 6, MT 12), with **41 bound aliases** preserved separately. The nested material leaves are included; a literal one-dot name filter would omit them. Frozen input commit `24b3a44cbd33dd34cde338483be19638aec1be1c`; input digest `4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e`.

The ten primary-source cards distinguish measurement estimates, source assumptions, published-model assignments and current code definitions. One additional protein-density candidate is bibliographic context only. Six registered papers have OK identities, including both Gittes UIDs; four primary cards and the extra candidate lack frozen OK identity and remain ineligible.

## Main review findings

- Actin EA has a length-normalized experimental origin. Its source error is **SEM**, whereas the existing prior spread remains an earlier heuristic. Historical records are preserved rather than rewritten.
- Gittes bending estimates, persistence lengths and geometry-dependent modulus calculations form one inference chain. Its geometric assumptions differ from current circular/annular inputs.
- IF evidence spans adsorbed individual filaments, cellular microrheology and hydrated hagfish bundles. They do not measure one interchangeable material modulus. The Fudge candidate is a close numerical origin, with an explicit packing correction.
- Current IF mesh controls a conserved-contour cage. The Paust keratin mesh is an estimate for another preparation. Current `max_strain` is an upper tangent-reference strain, and `turnover_rate` is declared for rest-length relaxation; the ordinary IF part name does not match the selector in the inspected frozen path.
- MCF7 microtubule end-tracking data are available, but include a paused state and mixed SE/SD conventions. They are comparison candidates, not replacements. Current nucleation reactivates floor slots; it does not create the declared arm population.
- Shared strand mass uses a full circular area. Its relationship to the MT annulus used in the EA declaration is a quantity-definition proposal for PI review, not a runtime error conclusion.

## Exact valued-input inventory

The primary numeric column describes support in a source context or a stated derivation, not support for the target cell. “No” also covers measurements of related quantities that do not identify the exact current input. Prior entries are raw snapshots.

| Exact input | Raw value / tag | Current-input role | Primary numeric support | Cards | Finding |
|---|---|---|---|---|---|
| `if.gap` | 0.15 um / EXAMPLE | decision, geometry_placeholder | No exact support | — | Clearance sets cage radius and span; no source measurement of this gap was located. |
| `if.max_strain` | 2.5 1 / EXAMPLE | transferred_hypothesis, constitutive_reference | No exact support | FM04 | Failure-oriented declaration prose differs from the current e_top meaning. Source mean/max length ratios must not be read as engineering strains. |
| `if.mesh` | 0.4 um / EXAMPLE | derived_estimate_transfer, population_geometry_choice | Source/derivation only | FM07 | The source provides an estimated mesh. Mapping it to conserved-contour cage geometry remains a model choice. |
| `if.stiffening_onset_strain` | 0.5 1 / EXAMPLE | transfer_hypothesis | No exact support | FM08 | No verified source-specific 50% axial onset was located. Network shear strain differs from current segment extension strain. |
| `if.stiffening_ratio` | 1.0 1 / EXAMPLE | model_selector, decision | No exact support | FM08 | Value 1 selects the linear path. Network hardening prose does not measure this selector. |
| `if.turnover_rate` | 0.001 1/s / EXAMPLE | order_of_magnitude_placeholder, model_mapping | No exact support | — | The declared rate targets rest-length relaxation, but the ordinary IF part name does not match the selector in the inspected frozen path. No matched assay or runtime effect is verified. |
| `material.actin.EA` | 44000.0 pN / SOURCED | derived, transfer | Source/derivation only | FM01 | EA maps from a source axial coefficient. Its reported SEM and the raw current prior remain separate. |
| `material.actin.kappa` | 0.0728 pN.um^2 / SOURCED | derived, transfer | Source/derivation only | FM02 | Current κ uses rounded persistence length and project temperature. The original weighted estimate, temperature and outlier rule remain distinct. |
| `material.actin.radius` | 0.004 um / SOURCED | structural_proxy, transfer | No exact support | FM02 | The source mass-representing elliptical section does not directly establish the current circular radius. |
| `material.if.E` | 6000000.0 pN/um^2 / SOURCED | material_proxy, transfer | No exact support | FM04, FM05, FM06, FM10 | Declared citations do not establish exact 6 MPa for target IF. The closest located primary value belongs to a hydrated hagfish bundle with a separate packing correction. |
| `material.if.radius` | 0.005 um / SOURCED | structural_proxy, transfer | No exact support | FM06, FM10 | The inspected Mücke abstract does not locate the 10 nm diameter. Fudge uses 10 nm as an assumption for persistence-length conversion. |
| `material.microtubule.EA` | 380000.0 pN / EXAMPLE | derived, transfer | Source/derivation only | FM02 | The arithmetic follows an assumed E and annulus. The source E itself uses another cross-section and is not a direct axial measurement. |
| `material.microtubule.kappa` | 20.0 pN.um^2 / SOURCED | published_model, transfer | Source/derivation only | FM03 | The source number is a numerical-example assignment. Its locator is corrected; no target measurement is asserted. |
| `material.microtubule.radius` | 0.0125 um / SOURCED | structural_proxy, transfer | No exact support | FM02 | Generic outer-diameter prose is distinct from the source 14-protofilament contact-radius construction. |
| `material.protein_density` | 1.35 pg/um^3 / EXAMPLE | generic_material_proxy, transfer | No exact support | — | Conventional bulk protein density does not establish hydrated filament mass per length; see candidate FMC_DENSITY. |
| `microtubule.catastrophe_rate` | 0.05 1/s / EXAMPLE | order_of_magnitude_placeholder | No exact support | FM09 | The candidate MCF7 statistic includes pause-to-shortening events and has SD uncertainty. The declared band remains unchanged and unadjudicated. |
| `microtubule.count` | 500 1 / EXAMPLE | population_placeholder | No exact support | — | Typed count 500 constructs a fixed arm population. No matched MCF7 census, denominator or uncertainty was located. |
| `microtubule.dimer_rise` | 0.008 um / EXAMPLE | effective_event_unit, model_mapping | No exact support | — | 8 nm acts as an end-slot length stroke and one pool-unit debit. Its mapping to multi-protofilament molecular growth was not verified. |
| `microtubule.dormant_fraction` | 0.1 1 / EXAMPLE | numerical_control | No exact support | — | The dormant-node allocation fraction is numerical reserve, not a measured quiescent-MT fraction. |
| `microtubule.end_segment_band_hi` | 2.0 1 / EXAMPLE | numerical_control | No exact support | — | The upper end-slot length band controls node insertion. It is a numerical parameter. |
| `microtubule.end_segment_band_lo` | 0.5 1 / EXAMPLE | numerical_control | No exact support | — | The lower end-slot length band controls node retirement. It is a numerical parameter. |
| `microtubule.growth_speed` | 0.25 um/s / EXAMPLE | order_of_magnitude_placeholder | No exact support | FM09 | The candidate source permits comparison. Current 15 µm/min is not declared as calibrated from this study. |
| `microtubule.mtoc_radius` | 0.25 um / EXAMPLE | geometry_proxy | No exact support | — | A generic centrosome-size proxy does not identify the current MTOC node and clearance geometry. |
| `microtubule.nucleation_rate` | 0.1 1/s / EXAMPLE | event_rate_placeholder, model_mapping | No exact support | — | The current event reactivates an existing floor slot. The declaration’s birth/lifetime explanation describes a different quantity. |
| `microtubule.rescue_rate` | 0.05 1/s / EXAMPLE | order_of_magnitude_placeholder | No exact support | FM09 | The candidate shortening-to-growth-or-pause statistic differs from the current B-to-A hazard away from the floor. |
| `microtubule.shrink_speed` | 0.5 um/s / EXAMPLE | order_of_magnitude_placeholder | No exact support | FM09 | Current 30 µm/min and candidate control 22.4 µm/min are distinct; neither is substituted for the other. |
| `microtubule.tubulin_conc` | 20.0 uM / EXAMPLE | generic_free_pool_placeholder | No exact support | FM09 | The paper’s separate 16 µM in-vitro experiment does not measure free MCF7 tubulin at 20 µM. |

## Source cards

### FM01 · Kojima 1994: axial response estimated from compliance-versus-length slopes

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC45560/) · DOI `10.1073/pnas.91.26.12962` · OK identities: SE334

Anchor: Results/Fig.3, printed p.12964; Sample preparation p.12962; author-uploaded full text at ResearchGate. Access: `primary_abstract_local_and_author_uploaded_fulltext_inspected_via_web`.

Context: Rabbit back skeletal muscle; phalloidin-tetramethylrhodamine-labelled actin, with/without tropomyosin. Microneedles, 25–27°C;25mM KCl,3mM MgCl2,20mM HEPES pH7.8,0.5% mercaptoethanol,oxygen-scavenging reagents.

At 1µm, actin without tropomyosin gives43.7±4.6pN/nm; with tropomyosin65.3±6.3. Multiplying by1µm gives43700pN EA;44000 is rounded. Results labels these mean±SEM, n74 and116 respectively.

**Interpretation limit:** The n labels are source measurements, not demonstrated counts of independent biological cells. SEM is not individual-filament SD or lognormal sigma. Target temperature/isoform/decorations differ.

Uncertainty: Mean±SEM; current spread0.1053 retains earlier CV heuristic and is not redefined here.

### FM02 · Gittes 1993: thermal bending and conditional geometry-to-modulus conversion

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC2200075/) · DOI `10.1083/jcb.120.4.923` · OK identities: SE117, SE554

Anchor: Methods pp.924–925; Fig.6/results p.930; continuum interpretation pp.932–933. Access: `full_primary_pdf_inspected`.

Context: Phalloidin-labelled actin; taxol-stabilized microtubules, average14 protofilaments; shallow chamber. 24–26°C, calculations25°C. Actin:25mM imidazole-HCl/25mM KCl/4mM MgCl2/1mM EGTA,pH7.4;casein and oxygen scavengers.

Seven actin filaments were analyzed; excluding one aberrant filament gives weighted EI7.29±0.44×10^-26Nm² and Lp17.7±1.1µm(SE). MT means are2.2/2.1×10^-23Nm² for unlabelled/labelled cohorts(n7/n8). E≈1.2GPa is derived assuming isotropy,14 protofilaments,inner radius11.48nm and wall2.7nm. Actin ellipse semi-axes3/2nm is a mass-representing model.

**Interpretation limit:** Current actinκ uses rounded Lp17µm at310K; radius4nm is not this source ellipse. Current MT annulus12.5/7.5nm differs. Decoration,temperature,geometry transfer is unresolved.

Uncertainty: Actin final weighted mean±SE excludes one filament; pooled modes are not independent cells. MT abstract uncertainties6.4%/4.7%.

### FM03 · Nedelec and Foethke 2007: selected microtubule rigidity in a simulation

[Primary source](https://doi.org/10.1088/1367-2630/9/11/427) · DOI `10.1088/1367-2630/9/11/427` · OK identities: SE440

Anchor: Fig.8 description, printed p.19/PDF page20. Access: `full_primary_pdf_inspected`.

Context: Simulation of an8µm microtubule driven over immobilized kinesins. Comparison of discrete segment lengths for a spiral trajectory.

The Fig.8 example specifies rigidity20pN·µm². This supports the published-model number, not a direct MCF7 measurement.

**Interpretation limit:** Declaration locator p9 does not locate this number; Fig.8/p19 does. Numerical resolution conclusions for this source geometry do not establish current-engine resolution.

Uncertainty: No measured uncertainty attached to this assigned value.

### FM04 · Kreplak 2005: large extensions of adsorbed individual IFs

[Primary source](https://pubmed.ncbi.nlm.nih.gov/16257415/) · DOI `10.1016/j.jmb.2005.09.092` · OK identities: SE557

Anchor: Primary abstract. Access: `primary_abstract_only_fulltext_not_obtained`.

Context: Recombinant murine desmin;human K5/K14;rat-brain NF-L/M/H. AFM lateral displacement/stretching on solid supports in physiological buffer.

Mean stretching2.6-fold and maximum3.6-fold correspond to engineering strains1.6 and2.6. They are not strains2.6 and3.6.

**Interpretation limit:** Abstract does not establish a universal250% rupture threshold, a6MPa single-vimentin modulus, or the current constitutive e_top parameter. Detailed loading/temperature/error definitions remain unlocated.

Uncertainty: Mean/max stated; sample counts and error bars not in inspected abstract.

### FM05 · Guo 2013: vimentin contribution to cellular microrheology

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC3791300/) · DOI `10.1016/j.bpj.2013.08.037` · OK identities: SE445

Anchor: Active microrheology methods;Figs.2–3/results. Access: `full_primary_html_inspected`.

Context: WT and vimentin-null mouse embryonic fibroblasts. 500nm endocytosed beads,optical-trap oscillation1–100Hz;cytoplasmic probes away from cortex/nucleus.

WT cytoplasmic shear response is about10Pa versus5Pa without vimentin. This is a cellular network/environment measurement.

**Interpretation limit:** It does not measure isolated-filament Young modulus6MPa. Treating its cellular shear response as that modulus changes quantity and scale.

Uncertainty: Fig.3 error bars SEM; not a6MPa material uncertainty.

### FM06 · Mücke 2004: substrate-dependent apparent persistence length

[Primary source](https://pubmed.ncbi.nlm.nih.gov/14729340/) · DOI `10.1016/j.jmb.2003.11.038` · OK identities: SE447

Anchor: Primary abstract. Access: `primary_abstract_only_fulltext_not_obtained`.

Context: Individual vimentin IFs. AFM in physiological buffer after adsorption to different supports;negative-stain TEM comparison.

Apparent Lp spans0.3–1µm;about1µm in dilute solution is estimated under adsorption assumptions.

**Interpretation limit:** This does not directly identify both E and radius. The exact10nm diameter support and its distribution were not located in the inspected abstract. Agreement with a calculated current Lp is not an independent validation of E.

Uncertainty: Substrate range, not a population SD or prior interval.

### FM07 · Paust arXiv1511.02218: estimated keratin-network mesh

[Primary source](https://arxiv.org/abs/1511.02218) · DOI `10.48550/arXiv.1511.02218` · Candidate; ineligible without frozen OK identity.

Anchor: Section2 final mesh paragraph;Section4 Experimental;PDF pp.4–6. Access: `full_primary_preprint_inspected`.

Context: Human K8/18 assembled1:1;1mg/ml;Panc1 extracted keratin cytoskeleton comparison. Bead microrheology;assembly uses equal volume20mM Tris,pH7 with dialysed proteins;different AFM preparation diluted0.005mg/ml. arXivv1 uploaded2015-11-06;manuscript bears2009-10-01 date.

The manuscript estimates400nm mesh from1mg/ml keratin and compares it with extracted cytoskeleton. It does not report a direct MCF7 mesh measurement.

**Interpretation limit:** Current mesh controls conserved-contour cage geometry. Transfer from K8/18 in-vitro mesh to vimentin-labelled closed rings requires an explicit population/geometry mapping.

Uncertainty: No mesh SD or uncertainty located.

### FM08 · Janmey 1991: network rheology does not identify a single-filament onset

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC2288924/) · DOI `10.1083/jcb.113.1.155` · Candidate; ineligible without frozen OK identity.

Anchor: Primary abstract;numeric onset/full protocol not recovered in this pass. Access: `primary_abstract_only_numeric_claim_not_located`.

Context: Parallel rheology of tubulin,actin,vimentin and fibrin polymer networks. Network viscoelastic response.

Vimentin networks harden at high strain and resist breakage.

**Interpretation limit:** Exact50% onset and order-of-magnitude tangent ratio were not verified in the full article. Network shear strain is not automatically a single segment axial strain. Current ratio1 is a linear-model choice.

Uncertainty: No numerical onset uncertainty verified.

### FM09 · Azarenko 2008: MCF7 plus-end dynamics with an explicit paused state

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC2639247/) · DOI `10.1093/carcin/bgn241` · Candidate; ineligible without frozen OK identity.

Anchor: TableI.A and footnotes;Cell culture and Microtubule dynamic instability in living cells. Access: `full_primary_html_inspected`.

Context: Interphase adherent MCF7-GFP-alpha-tubulin,HTB22;thin lamellar regions. 24h coverslip culture,20h vehicle/SFN;culture37°C,pH7.3,DMEM10%FBS. Acquisition temperature not independently located. Length changes≥0.5µm mark growth/shortening;smaller changes pause. Catastrophe:growth or pause→shortening;rescue:shortening→growth or pause.

Vehicle control: growth14.5±1.07µm/min,shortening22.4±1.7;catastrophe2.05±0.2/min,rescue4.4±0.5;paused41.9% of time. At least50–60 microtubules per condition.

**Interpretation limit:** Speed errors SE;switch-frequency errors SD. Frequency exposure-time denominator is not explicit in inspected local Methods. No free-tubulin concentration,count or floor-renucleation rate measured here. Current two-state mapping lacks this explicit pause category.

Uncertainty: TableI:means±SE except catastrophe/rescue means±SD;condition-level microtubule count does not establish independent-cell n or covariance.

### FM10 · Fudge 2003: hydrated hagfish bundles and conditional single-IF inference

[Primary source](https://pmc.ncbi.nlm.nih.gov/articles/PMC1303373/) · DOI `10.1016/S0006-3495(03)74629-3` · Candidate; ineligible without frozen OK identity.

Anchor: Table1,Fig.3;Tensile testing and Persistence length methods. Access: `full_primary_html_inspected`.

Context: Pacific hagfish Eptatretus stoutii;keratin-like aligned IF bundles in hydrated slime threads. Microbeam tensile tests;strain rate0.017±0.0006/s(SE);initial modulus fitted over first0.02 strain. Single-IF conversion assumes90.7% hexagonal packing and nonload-bearing water;Lp assumes10nm diameter and20°C.

Table1 gives bundle Ei6.4±0.9MPa(mean±SE,n8;SD2.5MPa). Packing correction gives single-IF7.0±1.0MPa and derived Lp0.85±0.12µm.

**Interpretation limit:** This is a close primary origin for a6MPa proxy, not proof that the declaration cites this study or a direct MCF7/vimentin measurement. The DOI has no frozen OK identity and remains ineligible.

Uncertainty: Source separates SE,SD andn;packing/radius assumptions add model uncertainty not encoded by those error bars.

### FMC_DENSITY · bulk protein density

[Fischer 2004](https://pmc.ncbi.nlm.nih.gov/articles/PMC2286542/) examines the conventional protein-density assumption and its molecular-weight dependence. It does not directly measure hydrated-filament linear density. DOI `10.1110/ps.04688204` has no frozen OK identity and remains candidate/ineligible.

## Source relationships and static mappings

All current `same_fit_groups` and `current_same_fit_groups` are empty. The six source estimation groups preserve assay or derivation lineage only. No covariance or source independence is invented.

| Relation | Parameters | Evidence | Meaning |
|---|---|---|---|
| FR01 | `material.actin.EA` | FM01 | Measured length-normalized coefficient maps to EA via multiplication by contour length;the associated SEM does not become a population prior. |
| FR02 | `material.actin.kappa`, `material.actin.radius`, `material.microtubule.EA`, `material.microtubule.radius` | FM02 | Thermal bending estimates and geometry-dependent Young moduli are different stages of the source calculation. The current radii do not reproduce the source cross-sections. |
| FR03 | `material.if.E`, `material.if.radius` | FM04, FM05, FM06, FM10 | Single-filament extension,substrate persistence,cellular shear response and hydrated-bundle tensile modulus are different observables. Current EA/κ derive fromone E/r pair. |
| FR04 | `if.mesh`, `if.gap`, `material.if.radius`, `material.protein_density` | FM07 | Current mesh and gap determine conserved contour andring count. The source400nm estimate is not a measured population count or ring spacing. |
| FR05 | `if.stiffening_onset_strain`, `if.max_strain`, `if.stiffening_ratio` | FM04, FM08 | Network hardening and AFM extension reports do not uniquely specify current segment tangent-ramp parameters. max_strain is e_top,not a rupture threshold. |
| FR06 | `if.turnover_rate` | Static code | The declared rate targets rest-length relaxation. The ordinary part name intermediate_filament differs from selector if; no runtime effect is verified. |
| FR07 | `microtubule.growth_speed`, `microtubule.shrink_speed`, `microtubule.catastrophe_rate`, `microtubule.rescue_rate` | FM09 | Four current kinetic inputs can be compared with one MCF7 source condition,but the observed pause category and frequency exposures need an explicit observer mapping. |
| FR08 | `microtubule.growth_speed`, `microtubule.shrink_speed`, `microtubule.dimer_rise`, `microtubule.tubulin_conc` | FM09 | k_on=v_growth/(delta·c),k_off_B=v_shrink/delta. Thus a declared velocity is converted to an effective event rate using stroke and concentration inputs. |
| FR09 | `microtubule.count`, `microtubule.nucleation_rate` | Static code | Count constructs fixed arms;floor nucleation reactivates existing slots. The declaration birth/lifetime explanation is not the currently read eventdefinition. |
| FR10 | `microtubule.mtoc_radius`, `microtubule.count`, `material.microtubule.radius` | Static code | MTOC radius,node clearance and arm count define one constructed aster;generic centrosome size is not an MCF7 measurement of this node. |
| FR11 | `material.microtubule.kappa`, `microtubule.dormant_fraction`, `microtubule.end_segment_band_lo`, `microtubule.end_segment_band_hi` | FM03 | Published rigidity is a source model assignment;current dormant capacity andinsert/retire bands are numerical controls,not biological empirical fractions. |
| FR12 | `material.protein_density`, `material.actin.radius`, `material.if.radius`, `material.microtubule.radius`, `material.microtubule.EA` | FM02 | The common strandbuilder usesrho πr² per length. MT EA source prose uses an annulus while the examined mass expression uses a full circle;the definitions are preserved for PI review. |

## Priors preserved

| Input | Raw prior | Prior status |
|---|---|---|
| `if.gap` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `if.max_strain` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `if.mesh` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `if.stiffening_onset_strain` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `if.stiffening_ratio` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `if.turnover_rate` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `material.actin.EA` | `{"family": "lognormal", "partition": "UNASSIGNED", "spread": 0.1053, "spread_source": "43.7 +/- 4.6 (read from the spec source line; spread = b/a)"}` | declared_spread_unverified |
| `material.actin.kappa` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.actin.radius` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.if.E` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.if.radius` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.microtubule.EA` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `material.microtubule.kappa` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.microtubule.radius` | `{"family": "lognormal", "partition": "UNASSIGNED"}` | sourced_without_spread |
| `material.protein_density` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.catastrophe_rate` | `{"band": [0.01, 0.05], "band_source": "~0.01-0.05 /s", "family": "target", "partition": "UNASSIGNED"}` | declared_band_unverified |
| `microtubule.count` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.dimer_rise` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.dormant_fraction` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.end_segment_band_hi` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.end_segment_band_lo` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.growth_speed` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.mtoc_radius` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.nucleation_rate` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.rescue_rate` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.shrink_speed` | `{"family": "target", "partition": "UNASSIGNED"}` | target_without_band |
| `microtubule.tubulin_conc` | `{"band": [10, 20], "band_source": "~10-20 uM", "family": "target", "partition": "UNASSIGNED"}` | declared_band_unverified |

## Alias inventory

These are bound declarations, not additional measured inputs. Their complete raw snapshots are in `excluded_aliases`.

| Bound name | Root | Binding chain |
|---|---|---|
| `if.seg` | `resolution.spacing` | if.seg → cortex.seg → resolution.spacing |
| `material.chromatin.k_backbone` | `chromatin.k_backbone` | material.chromatin.k_backbone → chromatin.k_backbone |
| `material.cortex.EA` | `material.actin.EA` | material.cortex.EA → material.actin.EA |
| `material.cortex.density` | `material.protein_density` | material.cortex.density → material.protein_density |
| `material.cortex.kappa` | `material.actin.kappa` | material.cortex.kappa → material.actin.kappa |
| `material.cortex.radius` | `material.actin.radius` | material.cortex.radius → material.actin.radius |
| `material.cytoplasm_actin.EA` | `material.actin.EA` | material.cytoplasm_actin.EA → material.actin.EA |
| `material.cytoplasm_actin.density` | `material.protein_density` | material.cytoplasm_actin.density → material.protein_density |
| `material.cytoplasm_actin.kappa` | `material.actin.kappa` | material.cytoplasm_actin.kappa → material.actin.kappa |
| `material.cytoplasm_actin.radius` | `material.actin.radius` | material.cytoplasm_actin.radius → material.actin.radius |
| `material.filopodium.EA` | `material.actin.EA` | material.filopodium.EA → material.actin.EA |
| `material.filopodium.density` | `material.protein_density` | material.filopodium.density → material.protein_density |
| `material.filopodium.kappa` | `material.actin.kappa` | material.filopodium.kappa → material.actin.kappa |
| `material.filopodium.radius` | `material.actin.radius` | material.filopodium.radius → material.actin.radius |
| `material.if_pop.E` | `material.if.E` | material.if_pop.E → material.if.E |
| `material.if_pop.density` | `material.protein_density` | material.if_pop.density → material.protein_density |
| `material.if_pop.radius` | `material.if.radius` | material.if_pop.radius → material.if.radius |
| `material.lamellipodium.EA` | `material.actin.EA` | material.lamellipodium.EA → material.actin.EA |
| `material.lamellipodium.density` | `material.protein_density` | material.lamellipodium.density → material.protein_density |
| `material.lamellipodium.kappa` | `material.actin.kappa` | material.lamellipodium.kappa → material.actin.kappa |
| `material.lamellipodium.radius` | `material.actin.radius` | material.lamellipodium.radius → material.actin.radius |
| `material.lamina.E` | `material.if.E` | material.lamina.E → material.if.E |
| `material.lamina.radius` | `material.if.radius` | material.lamina.radius → material.if.radius |
| `material.microtubule_pop.EA` | `material.microtubule.EA` | material.microtubule_pop.EA → material.microtubule.EA |
| `material.microtubule_pop.density` | `material.protein_density` | material.microtubule_pop.density → material.protein_density |
| `material.microtubule_pop.kappa` | `material.microtubule.kappa` | material.microtubule_pop.kappa → material.microtubule.kappa |
| `material.microtubule_pop.radius` | `material.microtubule.radius` | material.microtubule_pop.radius → material.microtubule.radius |
| `material.microvillus.EA` | `material.actin.EA` | material.microvillus.EA → material.actin.EA |
| `material.microvillus.density` | `material.protein_density` | material.microvillus.density → material.protein_density |
| `material.microvillus.kappa` | `material.actin.kappa` | material.microvillus.kappa → material.actin.kappa |
| `material.microvillus.radius` | `material.actin.radius` | material.microvillus.radius → material.actin.radius |
| `material.nmii.density` | `material.protein_density` | material.nmii.density → material.protein_density |
| `material.sf_arc.EA` | `material.actin.EA` | material.sf_arc.EA → material.actin.EA |
| `material.sf_arc.density` | `material.protein_density` | material.sf_arc.density → material.protein_density |
| `material.sf_arc.kappa` | `material.actin.kappa` | material.sf_arc.kappa → material.actin.kappa |
| `material.sf_arc.radius` | `material.actin.radius` | material.sf_arc.radius → material.actin.radius |
| `material.stress_fiber.EA` | `material.actin.EA` | material.stress_fiber.EA → material.actin.EA |
| `material.stress_fiber.density` | `material.protein_density` | material.stress_fiber.density → material.protein_density |
| `material.stress_fiber.kappa` | `material.actin.kappa` | material.stress_fiber.kappa → material.actin.kappa |
| `material.stress_fiber.radius` | `material.actin.radius` | material.stress_fiber.radius → material.actin.radius |
| `microtubule.seg` | `resolution.spacing` | microtubule.seg → resolution.spacing |

## Static name-selector finding (FM_S01)

The IF builder returns `part.name = intermediate_filament`. The inspected `build_parts` and `seg_blocks` construction preserve that name, while the stiffening and turnover selectors contain `if`. Their literal lookup therefore assigns the linear ratio and zero relaxation rate to this ordinary part. Current ratio 1 already chooses the linear path. This is a frozen-source inference, not a native result; alternate callers and runtime effects were not verified. No correction was made. Exact source spans FM_C02, FM_C04 and FM_C12–FM_C14 preserve the chain for PI review.

## Provenance and validation

- 27 row snapshots match frozen atlas declarations, priors, facets, training roles and KB comparisons.
- 41 bound declarations retain exact names, roots, binding chains and raw snapshots.
- 44 historical records are pinned to `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09`, with file SHA-256, JSON pointer, semantic identity and canonical record hash. They do not count as independent replication.
- 14 static code spans retain exact frozen file/span hashes; 12 relations and 6 source groups have closed references.
- Primary paragraph/page hashes and source-file hashes are recorded. Kojima’s author-uploaded full-text view supports the SEM/method check; direct HTTP returned 403, so that failed cache is explicitly not evidence and no unavailable full-text hash is invented.
- All retrieval failures, CAPTCHAs and non-PDF responses remain labelled. Full-article caches stay in the ignored local cache directory.
- Validation is metadata inspection only: no simulation, runtime imports, GPU run, test suite or commit.

Next source work:
1. PI review exact IF protein identity and target observable. Obtain single-filament force–extension plus diameter/protocol data;keep keratin/vimentin/desmin/hagfish bundles separate. Do not promote the close Fudge candidate automatically.
2. Audit/register Azarenko identity and reconstruct the observation rule/exposure denominator,independent cell n and imaging conditions before any comparison likelihood is defined.
3. Need MCF7 free vs polymerized tubulin pool,census denominator and true nucleation vs floor reactivation measurements. Define the molecular object associated with a current effective lengthstroke.
4. PI separate SEM from biological variability,temperature/decorations from source transfers,and mass-equivalent from steric/hydrodynamic radii. Obtain matched filament linear-mass evidence before treating bulk density times circle area as measured.
5. Need target K8/18/vimentin network topology andcontour density,then an explicit mapping to cage geometry. Obtain observable-specific turnover/relaxation evidence;preserve linear selector as a modelchoice.

JSON SHA-256: `bad0414878d5ec60f8d225632a2f6e054a7a0b0de2e684d428676f280cdacfc1`.
Retrieval metadata SHA-256: `f012f472addc2728961f39fb1c94a537c1d065c2d6e549bd82eaece47f1298ae`.
