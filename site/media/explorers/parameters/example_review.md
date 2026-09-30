# EXAMPLE parameter declaration and evidence review

Advisory only; not PI-adjudicated. Tags, values and priors unchanged. No simulation or training.

Exactly 270 valued EXAMPLE rows outside transition fields are listed individually. Roles overlap. A measurement candidate is not a verified numeric claim; identity OK is not claim support.

Source base: 24b3a44cbd33dd34cde338483be19638aec1be1c

Atlas input digest: 4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e

Atlas SHA256: 523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a

Facets SHA256: db0024384de846b9dc68bee6ca53d63084d4acbad0880c2786ba7808974ac43e

KB snapshot SHA256: 134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b

## Independent cross-check refinement

The [four-card cross-check](source_crosscheck.md) preserves the predecessor from checkpoint5fddbbd17. P07 now points toFigure3/page7; P09 is an unresolved citation/species/assay transfer; P12 separates HS fit distance from the intended Bell parameter and retains the authors’ downward-bias caveat. None is a numerical replacement. EXAMPLE fit markers now identify source comparisons, not fitted membership of current input values.

## Review summary

| Classification (overlaps retained) | Rows |
| --- | ---: |
| decision_or_placeholder | 158 |
| derived_or_computational_relation | 93 |
| direct_measurement_candidate | 125 |
| numerical_or_control | 42 |
| published_model_or_transferred_value | 184 |
| unresolved | 142 |

21 primary-review cards cover 28 rows. Untested numerical assertions remain source-text-only. JSON preserves original source text/locations.

## High-impact exceptions

- **M01** `actin_chem.capping_k_on`, `actin_chem.capping_k_off`: Declaration says source not in audit, while saved Schafer1996SE487 is OK; identity alone does not verify values.
- **M02** `arp23.nucleation_rate`: Bieling2016 has duplicateSE7/SE97 OK. Exact0.037 perWAVE anchor found in Li/Bieling2022, absent from snapshot; retain both.
- **M03** `cortex.turnover_rate`, `nmii.assembly_rate`, `nmii.disassembly_rate`: Fritzsche2013SE110 has blank saved DOI/NO_DOI_FOUND and unrelated suggestion. Primary DOI10.1091/mbc.E12-06-0485 remains candidate, not a repaired record.
- **M04** `crossbridge.k_atp_bind`, `crossbridge.k_hydrolysis`: Kovacs2003 duplicate identities differ:SE425 CHECK,SE550 OK. Both retained.
- **M05** `cortex.proximal_fraction`: Clark2013 uses confocal profile/model inference, not declared super-resolution;0.8 is build-selected.
- **M06** `dynein.k_off0`, `dynein.velocity`: Schnitzer2000 is kinesin-only. Gennerich2007 supports a yeast stall assay, while sourcing of the adjacent1um/s mammalian velocity remains ambiguous.
- **M07** `filamin.x_beta`, `fascin.x_beta`, `microvillus_bundler.x_beta`: Ferrer HS x‡0.194nm and the current Bell length0.4nm require an explicit definition/fit bridge. Copied fascin/bundler values add no molecule-specific evidence;0.4nm is not thereby disproved.
- **M08** `osmotic.external_water_volume`: 1nL=1e6um3 is correct; declared~1e5 times cell disagrees with current7.5um sphere:1e6/(4*pi*7.5^3/3)=565.88. Arithmetic only.

## Primary review cards

### P01 — nmii.backbone_length

**Status:** primary_numerical_support_found_with_quantity_caveat. **Identity:** at_least_one_OK_identity.

NMIIA total filament contour301±24nm supports the numeric scale; paper distinguishes bare zone167±19nm.

**Anchor:** [Billington2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3829186/), Figure5; Figure4 specimen context.

**Measured:** Purified full-length human NMII paralogs expressed in baculovirus/Sf9; EM. **Target:** MCF7 NMIIA coarse backbone geometry.

**Transfer:** Total-contour to backbone-only projection and in-vitro to cell transfer remain unresolved.

Reported quantities: [{"quantity": "IIA contour", "value": 301, "reported_spread": 24, "spread_type": "SD", "unit": "nm"}, {"quantity": "IIA bare zone", "value": 167, "reported_spread": 19, "spread_type": "SD", "unit": "nm"}].

### P02 — nmii.backbone_radius

**Status:** primary_comparator_differs_not_declared_direct_citation. **Identity:** at_least_one_OK_identity.

IIA mean width11.2±2.4nm differs from nominal16nm diameter in the declaration. This is a comparator, not proof of a16nm citation error.

**Anchor:** [Billington2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3829186/), Figure5.

**Measured:** Same purified full-length human NMIIA EM. **Target:** Hydrodynamic/mass tail-bundle radius8nm.

**Transfer:** Hydration and resolution representation could differ from EM width; define intended observable.

Reported quantities: [{"quantity": "IIA filament width", "value": 11.2, "reported_spread": 2.4, "spread_type": "SD", "unit": "nm"}].

### P03 — nmii.heads_per_side

**Status:** primary_approximate_scale_support_found. **Identity:** at_least_one_OK_identity.

About30 two-headed molecules per bipolar NM2A/B filament supports approximately30heads per end after symmetric-polarity conversion.

**Anchor:** [Melli2018](https://elifesciences.org/articles/32871), Introduction: hexamer and bipolar-filament composition.

**Measured:** Purified human NM2A/NM2B bipolar filaments; composition discussion cites Billington. **Target:** MCF7 heads per minifilament side.

**Transfer:** Not30 molecules per side; actual composition/asymmetry and eligible head fraction need independent context.

### P04 — nmii.assembly_rate, nmii.disassembly_rate, nmii.rlc_phosphorylated_fraction

**Status:** support_not_located_for_declared_object_rates. **Identity:** candidate_ineligible_no_OK_identity.

MRLC recovery half-time6.5±1s and effective multi-process turnover do not directly identify whole-object birth/death or head phosphorylation fraction.

**Anchor:** [Fritzsche2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3596247/), MRLC turnover Results; Table2; Cell culture; FRAP analysis.

**Measured:** Filamin-deficient M2 melanoma, fluorophore-tagged MRLC over endogenous background; FRAP. **Target:** MCF7 two-state whole-minifilament object life and head competence.

**Transfer:** Dissociation processes, bound/free fluorescence and assembly inventory are different observables; no0.03/0.03 or0.3 direct support.

Reported quantities: [{"quantity": "MRLC FRAP half-time", "value": 6.5, "reported_spread": 1, "spread_type": "as_reported", "unit": "s", "N": 12}].

### P05 — cortex.turnover_rate

**Status:** support_not_located_for_single_declared_rate. **Identity:** candidate_ineligible_no_OK_identity.

Two actin populations and protocol-dependent effective turnover prevent treating the cited20-30s scale as a unique whole-filament rate.

**Anchor:** [Fritzsche2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3596247/), Results Actin turnover; Tables1/2; FRAP/FLAP analysis.

**Measured:** M2 melanoma mature cortex versus newly assembled blebs; FRAP/FLAP. **Target:** MCF7 single cortex turnover input.

**Transfer:** A single exponential reduction requires stated observable and weighting; source identity SE110 remains NO_DOI_FOUND despite primary DOI resolution.

### P06 — cortex.arp23_fraction

**Status:** primary_quantity_mismatch. **Identity:** at_least_one_OK_identity.

Primary infers comparable contributions to F-actin fluorescence; it does not directly count half of all filaments as daughters.

**Anchor:** [Bovellan2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4110400/), Results mDia1/Arp2/3 contribution; Fig2H/I.

**Measured:** M2 blebbing cells; knockdown/inhibition, cortical imaging and total F-actin flow cytometry; HeLa comparisons. **Target:** Built cortex filament-count fraction0.5.

**Transfer:** Mass contribution cannot become count fraction without lengths, sampling and perturbation assumptions. Other nucleators/residual activity remain.

### P07 — arp23.nucleation_rate

**Status:** primary_numerical_support_found_for_different_denominator. **Identity:** candidate_ineligible_no_OK_identity.

0.037/s is determined per surface WAVE1ΔN molecule from Arp2/3 incorporation and NPF density1850/um2. This exact numerical anchor was found in2022, not established here in declared Bieling2016.

**Anchor:** [LiBieling2022](https://elifesciences.org/articles/73145), Page7, The effect of load on Arp2/3 complex activity; Figure3A/B; single-complex TIRF.

**Measured:** Reconstituted human WAVE1ΔN, bovine Arp2/3 and Amoeba castellanii cytoplasmic actin on micropatterned surfaces; TIRF and AFM load. Network-assay temperature not established in this review.. **Target:** Rate per free Arp2/3 complex in cortical water.

**Transfer:** A condition-specific NPF-to-free-complex inventory and activity mapping is required; common1/s dimensions do not establish equivalence. Absolute-rate uncertainty is not reported in that paragraph; candidate DOI is unregistered.

Reported quantities: [{"quantity": "nucleation per WAVE1ΔN", "value": 0.037, "unit": "1/s"}, {"quantity": "surface WAVE1ΔN density", "value": 1850, "unit": "1/um^2"}].

### P08 — dynein.stall_force, dynein.step

**Status:** primary_numerical_support_found_with_transfer. **Identity:** candidate_ineligible_no_OK_identity.

Full-length yeast dynein stall mean6.9±1pN and primarily8nm steps support approximate scales; steps span4-24nm.

**Anchor:** [Gennerich2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC2851641/), Figure1C-D; Summary and Results.

**Measured:** S.cerevisiae Dyn1; optical trap/sea-urchin axoneme track; stall tested across ATP. **Target:** Mammalian DDB-like cargo and cortical pulling dynein.

**Transfer:** Yeast motor, adaptor context and variable-step law must not be silently transferred.

Reported quantities: [{"quantity": "stall force", "value": 6.9, "reported_spread": 1, "spread_type": "SD", "unit": "pN", "N": 108}].

### P09 — dynein.velocity

**Status:** primary_assay_transfer_and_citation_scope_gap. **Identity:** candidate_ineligible_no_OK_identity.

The yeast assay reports45nm/s unloaded and51nm/s at−3pN assistance. The declaration places Gennerich2007 next to stall~7pN; its attribution for the adjacent1um/s velocity is ambiguous. These numbers do not refute a mammalian velocity.

**Anchor:** [Gennerich2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC2851641/), Printedp955/PDFp4; Fig1E/2C.

**Measured:** Full-length Saccharomyces cerevisiae Dyn1_471kDa at1mMATP; zero-load GFP tracking and loaded feedback optical trapping. Optical trapping25±1°C; zero-load temperature not separately verified. Figure1E/2C show means±SEM.. **Target:** Mammalian dynein velocity1um/s.

**Transfer:** Resolve the intended species, motor/adaptor/cargo state and velocity assay. Do not substitute45nm/s, infer a22.2-fold target error, or claim statistical contradiction across assays.

Reported quantities: [{"quantity": "unloaded velocity", "value": 45, "unit": "nm/s"}, {"quantity": "assisting load velocity", "value": 51, "unit": "nm/s", "load_pN": -3}].

### P10 — dynein.k_off0

**Status:** primary_molecular_identity_conflict. **Identity:** candidate_ineligible_no_OK_identity.

Schnitzer2000 is Force production by single kinesin motors; it is not a dynein detachment assay.

**Anchor:** [Schnitzer2000](https://www.nature.com/articles/ncb1000_718), Title and Abstract.

**Measured:** Single kinesin, force-clamp mechanochemical model. **Target:** Dynein zero-load detachment1/s.

**Transfer:** No dynein numeric support; select correct motor/complex and state definition.

### P11 — filamin.k_off0

**Status:** primary_numerical_support_found_as_fit. **Identity:** at_least_one_OK_identity.

Filamin intrinsic fitted dissociation0.087±0.073/s is supported.

**Anchor:** [Ferrer2008](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf), Printedp9224/PDFp4; Hummer-Szabo fit paragraph.

**Measured:** Reconstituted filamin/F-actin optical-tweezer rupture distributions across loading rates. **Target:** Cellular FLNa slip branch.

**Transfer:** Joint with fitted barrier, not a directly timed no-load lifetime; broad geometry/path heterogeneity.

Reported quantities: [{"quantity": "intrinsic koff", "value": 0.087, "reported_spread": 0.073, "spread_type": "as_reported_fit", "unit": "1/s"}].

Same-fit group: `Ferrer2008_filamin_HS_rupture`; covariance absent.

### P12 — filamin.x_beta

**Status:** primary_fit_definition_translation_unresolved. **Identity:** at_least_one_OK_identity.

Hummer–Szabo fitted x‡=1.94±1.49Å converts to0.194±0.149nm. The current0.4nm is called a Bell length and is not that fitted point; equivalence of the two definitions is unestablished. The paper warns pooled loading rates and multiple unbinding coordinates may bias fitted distances downward.

**Anchor:** [Ferrer2008](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf), Printedp9224/PDFp4; same Hummer-Szabo fit paragraph.

**Measured:** Recombinant filamin-A expressed in Sf9; optical-trap rupture between quasiparallel actin filaments at room temperature. Filamin organism and numeric temperature not independently verified; HS ± convention is not labeled SD/SEM/CI in the main text.. **Target:** Filamin Bell-distance slip branch.

**Transfer:** Resolve the intended fit definition and source of0.4nm. The difference is not evidence that0.4nm is experimentally disproved and does not authorize replacing it with0.194nm or assigning a significance level.

Reported quantities: [{"quantity": "transition distance", "value": 0.194, "reported_spread": 0.149, "spread_type": "as_reported_fit", "unit": "nm"}].

Same-fit group: `Ferrer2008_filamin_HS_rupture`; covariance absent.

### P13 — cargo.radius

**Status:** primary_numerical_support_found_for_assay_geometry. **Identity:** candidate_ineligible_no_OK_identity.

120nm liposome diameter supports60nm radius. Clustering changes transport at fixed motor count.

**Anchor:** [Jiang2025](https://www.sciencedirect.com/science/article/abs/pii/S0006349525002796), Abstract; Introduction.

**Measured:** Reconstituted GFP-kinesin1 synthetic liposomes; motor clustering with DNA scaffold. **Target:** Native membranous carrier radius60nm.

**Transfer:** Assay geometry is not native vesicle distribution or total cell motor census.

### P14 — membrane.lipid_area_per_molecule

**Status:** primary_numerical_support_found_as_rounded_transfer. **Identity:** candidate_ineligible_no_OK_identity.

POPC area68.3±1.5Å2 at30C supports a nearby generic0.7nm2 scale.

**Anchor:** [Kucerka2005](https://lipid.phys.cmu.edu/papers05/JMBUnsat-05.pdf), Abstract; Table1 printedp198; Fig3.

**Measured:** Fully hydrated pure-PC bilayers; X-ray/volume structural modeling at30C. **Target:** Mixed-composition MCF7 membrane at310K.

**Transfer:** This structural estimate is model-dependent; round-point and exploratory range are not that paper confidence interval.

Reported quantities: [{"quantity": "POPC area", "value": 68.3, "reported_spread": 1.5, "spread_type": "as_reported", "unit": "angstrom^2", "temperature_C": 30}].

### P15 — membrane.inplane_friction, membrane.viscosity_2d, membrane.lipid_diffusion

**Status:** related_primary_combination_support_no_exact_current_values. **Identity:** candidate_ineligible_no_OK_identity.

Joint tracer fits yield membrane viscosity(3.0±0.4)e-3pN.s/um and immobile area fraction0.18±0.03; tension diffusivity≈0.024um2/s is a distinct derived transport observable.

**Anchor:** [Shi2018](https://cohenweb.rc.fas.harvard.edu/Publications/Shi_Cell_CellMembraneResistFlow_2018.pdf), Results Model; Fig2C; primaryPDFp4.

**Measured:** HeLa cell body versus cytoskeleton-free tether; additional cell types. **Target:** Independent friction1000, viscosity0.001 and lipid self-diffusion1.

**Transfer:** Porous-obstacle model constrains combinations; no direct current1000 friction or universal1um2/s supported.

Same-fit group: `Shi2018_tracer_pair_viscosity_obstacle_fraction`; covariance absent.

### P16 — envelope.pore_radius, envelope.pore_length

**Status:** related_primary_effective_geometry_support. **Identity:** candidate_ineligible_no_OK_identity.

Restricted-dextran diffusion fitted radius4.4-6.1nm(mean5.35), length40-50nm(mean44.5).

**Anchor:** [Keminer1999](https://www.sciencedirect.com/science/article/pii/S0006349599768839), Abstract; equivalent diffusion-channel results.

**Measured:** Isolated Xenopus oocyte nuclei attached to filters;4/10/20kDa fluorescent dextrans. **Target:** NPC hydraulic cylinder radius4.5nm,length50nm.

**Transfer:** Effective solute-diffusion geometry is not a measured water hydraulic radius, central physical opening or MCF7 morphology.

Same-fit group: `Keminer1999_restricted_diffusion_geometry`; covariance absent.

### P17 — membrane.hydraulic_conductivity, fluid.cytosol_water_fraction

**Status:** related_primary_protocol_candidate_not_current_numeric_support. **Identity:** candidate_ineligible_no_OK_identity.

MCF7 water transport is jointly fitted with an activation energy under freezing; osmotically inactive fraction is a different quantity from cytosolic water fraction.

**Anchor:** [Teo2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3708713/), Estimation of Membrane Permeability; Tables1/2; cryomicroscopy Fig7.

**Measured:** Suspended MCF7, cooling5/10/30C/min; reference273.15K;28-81cells/cooling rate. **Target:** Physiological37C MCF7 Pf/Lp and cytosolic water volume fraction.

**Transfer:** Do not extrapolate freezing parameters to37C or equate0.31 inactive fraction with all dry/cytosolic volume.

Same-fit group: `Teo2013_Lpg_activation_energy_by_cooling_rate`; covariance absent.

### P18 — membrane.hydraulic_conductivity

**Status:** primary_method_candidate_no_parameter_value. **Identity:** candidate_ineligible_no_OK_identity.

Calcein-quenching protocol explicitly includes successful use in MCF7; absolute permeability requires the stated geometry/osmotic analysis.

**Anchor:** [Kitchen2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7757292/), Before You Begin; protocol and quantification.

**Measured:** Adherent mammalian cells; calcein intensity during osmotic volume changes. **Target:** Target-matched permeability measurement plan.

**Transfer:** Protocol evidence is not a measured MCF7 Lp datum; registered OK identity absent.

### P19 — actin_chem.g_actin_exchange, actin_chem.profilin_exchange

**Status:** primary_numerical_support_found_for_release. **Identity:** candidate_ineligible_no_OK_identity.

MgADP-actin release0.009/s and profilin-assisted1.4/s are explicit.

**Anchor:** [Selden1999](https://pubmed.ncbi.nlm.nih.gov/10052948/), Abstract.

**Measured:** Monomeric Mg-actin under stated physiological conditions; full methods not extracted. **Target:** Effective ADP-to-ATP exchange inputs.

**Transfer:** Release becomes exchange only under rapid ATP rebinding; isoforms/buffer/temperature still need full-method extraction.

Reported quantities: [{"quantity": "MgADP release", "value": 0.009, "unit": "1/s"}, {"quantity": "profilin-MgADP release", "value": 1.4, "unit": "1/s"}].

### P20 — actin_chem.profilin_tip_k_off

**Status:** primary_numerical_support_found_as_fit. **Identity:** candidate_ineligible_no_OK_identity.

WT495±15/s is fitted k_minus2 from Michaelis-Menten growth data together with KM57±2uM and k1≈8.7/uM/s.

**Anchor:** [Funk2019](https://elifesciences.org/articles/50963.pdf), Appendix1 Fitting growth velocity data; Appendix1Table2.

**Measured:** Profilin-actin elongation kinetics; WT fit. **Target:** Shared nucleotide tip off-rate495/s.

**Transfer:** Do not treat a fitted asymptotic growth quantity as a separately timed event; retain model and nucleotide assumptions.

Reported quantities: [{"quantity": "k_minus2", "value": 495, "reported_spread": 15, "spread_type": "as_reported_fit", "unit": "1/s"}].

Same-fit group: `Funk2019_WT_growth_MM`; covariance absent.

### P21 — actin_chem.profilin_adp_kd

**Status:** numerical_text_found_but_cited_not_primary_measurement. **Identity:** candidate_ineligible_no_OK_identity.

0.17uM appears as a cited ADP-actin affinity, not an affinity measured by the structural paper itself.

**Anchor:** [Xue2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4217450/), Introduction affinity comparison, reference14.

**Measured:** Introductory comparison of profilinI affinities; primary antecedent unexamined. **Target:** Soluble profilin-ADP affinity0.17uM.

**Transfer:** Trace underlying reference14 before numerical support promotion.

## Complete 270-row matrix

D measurement candidate; M model/transfer; R derived; P decision/placeholder; N numerical/control; U unresolved.

| Exact parameter | Value | Unit | Roles | Review group | Primary cards | Reference keys |
| --- | ---: | --- | --- | --- | --- | --- |
| `actin_chem.capping_conc` | 1.0 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.capping_formin_k_off` | 0.00202 | 1/s | D M | formin_cp_ternary | source-text-only/control | Shekhar2015 |
| `actin_chem.capping_formin_k_on` | 0.21 | 1/(uM.s) | D M | formin_cp_ternary | source-text-only/control | Shekhar2015 |
| `actin_chem.capping_k_off` | 0.0004 | 1/s | D M | capping_free_end | source-text-only/control | Schafer1996 |
| `actin_chem.capping_k_on` | 3.5 | 1/(uM.s) | D M | capping_free_end | source-text-only/control | Schafer1996 |
| `actin_chem.cofilin_conc` | 20.0 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.cofilin_decorated_fraction` | 0.05 | 1 | P R U | cofilin_occupancy | source-text-only/control | none resolved |
| `actin_chem.cofilin_severing_rate` | 0.01 | 1/(um.s) | D M U | cofilin_severing | source-text-only/control | none resolved |
| `actin_chem.end_segment_band_hi` | 2.0 | 1 | R N P | actin_end_bands | source-text-only/control | none resolved |
| `actin_chem.end_segment_band_lo` | 0.5 | 1 | R N P | actin_end_bands | source-text-only/control | none resolved |
| `actin_chem.g_actin_exchange` | 0.009 | 1/s | D M R | g_actin_exchange | P19 | Selden1999 |
| `actin_chem.g_actin_free` | 0.5 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.g_actin_pi_release` | 10000.0 | 1/s | M P | soluble_pi_model | source-text-only/control | Bindschadler2004 |
| `actin_chem.g_actin_total` | 100.0 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.k_hydrolysis` | 0.3 | 1/s | D M | actin_hydrolysis | source-text-only/control | none resolved |
| `actin_chem.k_off_barbed_adppi` | 0.2 | 1/s | D M | adppi_end_rates | source-text-only/control | Fujiwara2007 |
| `actin_chem.k_off_pointed_adppi` | 0.02 | 1/s | D M | adppi_end_rates | source-text-only/control | Fujiwara2007 |
| `actin_chem.k_on_barbed_adppi` | 3.4 | 1/(uM.s) | D M | adppi_end_rates | source-text-only/control | Fujiwara2007 |
| `actin_chem.k_on_pointed_adppi` | 0.11 | 1/(uM.s) | D M | adppi_end_rates | source-text-only/control | Fujiwara2007 |
| `actin_chem.k_pi_release` | 0.003 | 1/s | D M U | filament_pi_release | source-text-only/control | Fujiwara2007 |
| `actin_chem.k_pi_release_barbed` | 1.8 | 1/s | D M | barbed_pi_release | source-text-only/control | Jegou2011 |
| `actin_chem.k_pi_release_pointed` | 2.0 | 1/s | M P | pointed_pi_model | source-text-only/control | Narita2011 |
| `actin_chem.monomer_rise` | 0.0027 | um | D M R | actin_rise | source-text-only/control | Popov2016, Splettstoesser2011 |
| `actin_chem.profilin_adp_kd` | 0.17 | uM | D M | profilin_affinity_adp | P21 | Xue2014 |
| `actin_chem.profilin_conc` | 50.0 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.profilin_exchange` | 1.4 | 1/s | D M R | g_actin_exchange | P19 | Selden1999 |
| `actin_chem.profilin_k_off_barbed_adp` | 12.2 | 1/s | D M | profilin_end_loss | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_k_off_barbed_adppi` | 8.6 | 1/s | D M | profilin_end_loss | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_k_off_barbed_atp` | 52.4 | 1/s | D M | profilin_end_loss | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_k_on` | 40.0 | 1/(uM.s) | D M | profilin_soluble_association | source-text-only/control | Funk2019 |
| `actin_chem.profilin_k_on_barbed_adp` | 0.3 | 1/(uM.s) | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_k_on_barbed_adppi` | 4.1 | 1/(uM.s) | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_k_on_barbed_atp` | 11.4 | 1/(uM.s) | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_kd` | 0.1 | uM | D M U | profilin_atp_affinity | source-text-only/control | none resolved |
| `actin_chem.profilin_tip_k_off` | 495.0 | 1/s | D M R | profilin_tip_fitted | P20 | Funk2019 |
| `actin_chem.profilin_tip_kd_adp` | 0.9 | uM | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_tip_kd_adppi` | 10.2 | uM | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.profilin_tip_kd_atp` | 226.0 | uM | D M R | profilin_end_fitted | source-text-only/control | Courtemanche2013 |
| `actin_chem.severing_reserve_fraction` | 0.5 | 1 | R N P | severing_reserve | source-text-only/control | none resolved |
| `actin_chem.thymosin_adp_kd` | 100.0 | uM | M D | thymosin_adp_affinity | source-text-only/control | Bindschadler2004 |
| `actin_chem.thymosin_conc` | 200.0 | uM | D M U | actin_pool_proxy | source-text-only/control | none resolved |
| `actin_chem.thymosin_k_on` | 1.7 | 1/(uM.s) | D M | thymosin_on | source-text-only/control | Au2008 |
| `actin_chem.thymosin_kd` | 2.0 | uM | D M U | thymosin_atp_affinity | source-text-only/control | none resolved |
| `actin_chem.unit_chemistry_enabled` | 0 | 1 | N P | unit_chem_switch | source-text-only/control | none resolved |
| `arp23.branch_angle` | 70.0 | deg | D M R | arp_branch_geometry | source-text-only/control | Mueller2017 |
| `arp23.conc` | 2.0 | uM | D M U | arp_abundance | source-text-only/control | none resolved |
| `arp23.debranch_rate` | 0.003 | 1/s | D M U | arp_debranch | source-text-only/control | none resolved |
| `arp23.k` | 4600.0 | pN/um | P M R U | arp_junction_mechanics | source-text-only/control | none resolved |
| `arp23.k_theta` | 0.02 | pN*um/rad^2 | P M R U | arp_junction_mechanics | source-text-only/control | none resolved |
| `arp23.nucleation_rate` | 0.037 | 1/s | D M R P | arp_nucleation | P07 | Bieling2016, LiBieling2022 |
| `arp23.nucleation_reserve_fraction` | 0.0 | 1 | N P R | arp_birth_reserve | source-text-only/control | none resolved |
| `cargo.density` | 1.0 | pg/um^3 | P M R | cargo_mass_proxy | source-text-only/control | none resolved |
| `cargo.radius` | 0.06 | um | D M | cargo_radius_assay | P13 | Jiang2025 |
| `cell.seed` | 0 | 1 | N | seed_control | source-text-only/control | none resolved |
| `chem.adp_conc` | 100.0 | uM | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.atp_conc` | 3000.0 | uM | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.debye_length` | 0.0008 | um | R M | debye_relation | source-text-only/control | none resolved |
| `chem.delta_g_atp` | 0.0856 | pN.um | R M U | atp_free_energy | source-text-only/control | none resolved |
| `chem.ionic_strength` | 150.0 | mM | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.mg_free` | 500.0 | uM | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.mgatp_kd` | 100.0 | uM | M P U | mgatp_affinity | source-text-only/control | none resolved |
| `chem.ph` | 7.2 | 1 | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.pi_conc` | 1000.0 | uM | D M U | chemical_environment | source-text-only/control | none resolved |
| `chem.solvent_permittivity` | 73.2 | 1 | D M | water_permittivity | source-text-only/control | none resolved |
| `chromatin.density` | 0.2 | pg/um^3 | P U | chromatin_density_proxy | source-text-only/control | none resolved |
| `chromatin.n_subunits` | 552 | 1 | M P | chromatin_model_count | source-text-only/control | Stephens2017 |
| `clutch.count_per_fa` | 75 | 1 | M R | clutch_model | source-text-only/control | ChanOdde2008 |
| `clutch.f_bond` | 2.0 | pN | M R | clutch_model | source-text-only/control | ChanOdde2008 |
| `clutch.k_off0` | 0.1 | 1/s | M R | clutch_model | source-text-only/control | ChanOdde2008 |
| `clutch.k_on` | 0.3 | 1/s | M R | clutch_model | source-text-only/control | ChanOdde2008 |
| `cortex.arp23_fraction` | 0.5 | 1 | D M P | cortex_nucleator_fraction | P06 | Bovellan2014 |
| `cortex.contour` | 3.0 | um | P M U | cortex_length_convenience | source-text-only/control | none resolved |
| `cortex.dormant_fraction` | 0.1 | 1 | R N P | cortex_reserve | source-text-only/control | none resolved |
| `cortex.polarity_mix` | 0.5 | 1 | P | cortex_polarity | source-text-only/control | none resolved |
| `cortex.proximal_fraction` | 0.8 | 1 | P R M | cortex_depth_profile | source-text-only/control | Clark2013, Chugh2017 |
| `cortex.turnover_rate` | 0.03 | 1/s | D M R U | cortex_turnover | P05 | Fritzsche2013 |
| `crossbridge.cycle_states` | 3 | 1 | N P | crossbridge_state_selector | source-text-only/control | none resolved |
| `crossbridge.iib.f_stall` | 2.0 | pN | P M R U | iib_placeholders | source-text-only/control | Stam2015 |
| `crossbridge.iib.k_off0` | 0.35 | 1/s | P M R U | iib_placeholders | source-text-only/control | Stam2015 |
| `crossbridge.iib.k_on` | 0.3 | 1/s | P M R U | iib_placeholders | source-text-only/control | Stam2015 |
| `crossbridge.iib.k_stroke` | 22.0 | 1/s | P M R U | iib_placeholders | source-text-only/control | Stam2015 |
| `crossbridge.k_adp_release_free` | 100.0 | 1/s | P U | free_head_gap | source-text-only/control | Kovacs2003 |
| `crossbridge.k_atp_apparent` | 0.5 | 1/(uM.s) | R P U | atp_encounter | source-text-only/control | none resolved |
| `crossbridge.k_atp_bind` | 1.0 | 1/(uM.s) | D M U | nmii_biochemical_candidates | source-text-only/control | Kovacs2003 |
| `crossbridge.k_atp_bind_free` | 1.0 | 1/(uM.s) | P M | free_atp_transfer | source-text-only/control | Kovacs2003 |
| `crossbridge.k_atp_isomerize` | 1000.0 | 1/s | P U | free_head_gap | source-text-only/control | Kovacs2003 |
| `crossbridge.k_hydrolysis` | 20.0 | 1/s | D M U | nmii_biochemical_candidates | source-text-only/control | Kovacs2003 |
| `crossbridge.k_pi_release` | 50.0 | 1/s | P U | free_head_gap | source-text-only/control | Kovacs2003 |
| `crossbridge.reach` | 0.05 | um | R P U | crossbridge_capture | source-text-only/control | none resolved |
| `crossbridge.stroke_sign` | 1.0 | 1 | N P | stroke_direction_convention | source-text-only/control | none resolved |
| `crosslink.arm_reach` | 0.03 | um | P R U | crosslink_capture | source-text-only/control | none resolved |
| `crosslink.conc` | 5.0 | uM | D M R U | crosslink_abundance | source-text-only/control | none resolved |
| `crosslink.k` | 4600.0 | pN/um | P R M | crosslink_effective_stiffness | source-text-only/control | Ferrer2008 |
| `crosslink.k_on` | 10.0 | 1/s | P U | crosslink_uncited_on | source-text-only/control | none resolved |
| `crosslink.length` | 0.035 | um | D M U | crosslink_rod_size | source-text-only/control | none resolved |
| `crosslink.molecular_model` | 0 | 1 | N P | crosslink_representation | source-text-only/control | none resolved |
| `crosslink.molecular_weight` | 206000 | Da | D M U | crosslink_rod_size | source-text-only/control | none resolved |
| `crosslink.radius` | 0.005 | um | P R U | crosslink_capture | source-text-only/control | none resolved |
| `crosslink.reach` | 0.06 | um | P R U | crosslink_capture | source-text-only/control | none resolved |
| `cytoplasm_actin.contour` | 2.0 | um | P M U | cytoplasm_contour | source-text-only/control | none resolved |
| `cytoplasm_actin.dormant_fraction` | 0.1 | 1 | N R P | cytoplasm_reserve | source-text-only/control | none resolved |
| `cytoplasm_actin.polarity_mix` | 0.5 | 1 | P | cytoplasm_polarity | source-text-only/control | none resolved |
| `dynein.count` | 1000 | 1 | P U | dynein_population | source-text-only/control | none resolved |
| `dynein.k` | 300.0 | pN/um | D P U | dynein_compliance | source-text-only/control | none resolved |
| `dynein.k_off0` | 1.0 | 1/s | D M U | dynein_detachment | P10 | Schnitzer2000 |
| `dynein.k_on` | 1.0 | 1/s | P U | dynein_attachment | source-text-only/control | none resolved |
| `dynein.primed_fraction` | 0.5 | 1 | P R | dynein_cycle_split | source-text-only/control | none resolved |
| `dynein.reach` | 0.05 | um | D M P U | dynein_capture | source-text-only/control | none resolved |
| `dynein.run_length` | 1.0 | um | D M U | dynein_motility | source-text-only/control | Gennerich2007 |
| `dynein.stall_force` | 7.0 | pN | D M U | dynein_motility | P08 | Gennerich2007 |
| `dynein.step` | 0.008 | um | D M R | dynein_step | P08 | Gennerich2007 |
| `dynein.velocity` | 1.0 | um/s | D M U | dynein_motility | P09 | Gennerich2007 |
| `envelope.areal_density` | 0.01 | pg/um^2 | R M P | envelope_mass | source-text-only/control | none resolved |
| `envelope.double_sheet` | 0 | 1 | N P | envelope_switch | source-text-only/control | none resolved |
| `envelope.kappa_bend` | 4.0 | pN.um | R M P | envelope_bending | source-text-only/control | Dahl2004 |
| `envelope.mu_2d` | 250.0 | pN/um | R M P | envelope_shear | source-text-only/control | Stephens2017, Dahl2004 |
| `envelope.pore_density` | 5.0 | 1/um^2 | D M U | nuclear_pore_population | source-text-only/control | none resolved |
| `envelope.pore_length` | 0.05 | um | D M R P | nuclear_pore_transport_geometry | P16 | Keminer1999 |
| `envelope.pore_radius` | 0.0045 | um | D M R P | nuclear_pore_transport_geometry | P16 | Keminer1999 |
| `envelope.pressure` | 2.353 | pN/um^2 | R P | nuclear_laplace | source-text-only/control | none resolved |
| `envelope.spacing` | 0.04 | um | D M U | envelope_spacing | source-text-only/control | none resolved |
| `envelope.tension` | 6.0 | pN/um | R M | envelope_tension_proxy | source-text-only/control | Fischer2020 |
| `envelope.volume_modulus` | 773100.0 | pN/um^2 | R M P | envelope_osmotic_modulus | source-text-only/control | none resolved |
| `envelope.wrinkle_wavelength` | 1.0 | um | P M U | envelope_wrinkle | source-text-only/control | Li2015 |
| `fascin.k` | 1000.0 | pN/um | P M U | fascin_mechanics | source-text-only/control | Ferrer2008 |
| `fascin.k_off0` | 0.1 | 1/s | D M P U | fascin_turnover | source-text-only/control | none resolved |
| `fascin.k_on` | 1.0 | 1/s | D M P U | fascin_turnover | source-text-only/control | none resolved |
| `fascin.length` | 0.0085 | um | D M P | fascin_span | source-text-only/control | Courson2010 |
| `fascin.sites_per_node` | 3.0 | 1 | P R N | fascin_valence | source-text-only/control | none resolved |
| `fascin.x_beta` | 0.0004 | um | P M U | fascin_mechanics | source-text-only/control | Ferrer2008 |
| `filamin.arm_reach` | 0.1 | um | P U | filamin_geometry | source-text-only/control | none resolved |
| `filamin.conc` | 1.0 | uM | D M U | filamin_abundance | source-text-only/control | none resolved |
| `filamin.k` | 1000.0 | pN/um | P U | filamin_unknown_mechanics | source-text-only/control | none resolved |
| `filamin.k_catch0` | 0.1 | 1/s | M P R U | filamin_catch_card | source-text-only/control | none resolved |
| `filamin.k_off0` | 0.087 | 1/s | D M R | filamin_off | P11 | Ferrer2008 |
| `filamin.k_on` | 1.0 | 1/s | P U | filamin_unknown_mechanics | source-text-only/control | none resolved |
| `filamin.length` | 0.16 | um | D M U | filamin_size | source-text-only/control | none resolved |
| `filamin.molecular_weight` | 560000 | Da | D M U | filamin_size | source-text-only/control | none resolved |
| `filamin.radius` | 0.008 | um | P U | filamin_geometry | source-text-only/control | none resolved |
| `filamin.reach` | 0.16 | um | R P | filamin_capture_relation | source-text-only/control | none resolved |
| `filamin.x_beta` | 0.0004 | um | D M U | filamin_barrier | P12 | Ferrer2008 |
| `filamin.x_catch` | 0.0008 | um | M P R U | filamin_catch_card | source-text-only/control | none resolved |
| `filopodium.cap_angle` | 60.0 | deg | P M U | filopodia_preparation | source-text-only/control | none resolved |
| `filopodium.contour` | 3.0 | um | P M U | filopodia_preparation | source-text-only/control | none resolved |
| `filopodium.filaments` | 20 | 1 | P M U | filopodia_preparation | source-text-only/control | none resolved |
| `filopodium.tip_clearance` | 0.25 | um | P M U | filopodia_preparation | source-text-only/control | none resolved |
| `fluid.box_cells` | 0 | 1 | N P R | fluid_numerical | source-text-only/control | none resolved |
| `fluid.cells_multiple` | 1 | 1 | N P R | fluid_numerical | source-text-only/control | none resolved |
| `fluid.cytosol_water_fraction` | 0.7 | 1 | D M U | cytosol_water | P17 | Teo2013 |
| `fluid.padding` | 0.375 | um | N P R | fluid_numerical | source-text-only/control | none resolved |
| `fluid.slip_length_membrane` | 0.0 | um | P M | membrane_slip | source-text-only/control | none resolved |
| `fluid.spacing_factor` | 2.0 | 1 | N P R | fluid_numerical | source-text-only/control | none resolved |
| `fluid.staggered` | 0 | 1 | N P R | fluid_numerical | source-text-only/control | none resolved |
| `footprint.clearance` | 0.85 | 1 | P R | footprint_geometry | source-text-only/control | none resolved |
| `footprint.z_basal` | -7.0 | um | P R | footprint_geometry | source-text-only/control | none resolved |
| `formin.areal_density` | 1.0 | 1/um^2 | P U | formin_density | source-text-only/control | none resolved |
| `formin.capped_k_off` | 0.00634 | 1/s | D M | formin_cp_kinetics | source-text-only/control | Shekhar2015 |
| `formin.capped_k_on` | 1.6 | 1/(uM.s) | D M | formin_cp_kinetics | source-text-only/control | Shekhar2015 |
| `formin.elongation_factor` | 3.0 | 1 | D M U | formin_processivity | source-text-only/control | none resolved |
| `formin.k_off` | 0.0002 | 1/s | D M U | formin_processivity | source-text-only/control | none resolved |
| `formin.k_on` | 29.1 | 1/(uM.s) | D M | formin_cp_kinetics | source-text-only/control | Shekhar2015 |
| `if.gap` | 0.15 | um | P | if_clearance | source-text-only/control | none resolved |
| `if.max_strain` | 2.5 | 1 | D M U | if_failure | source-text-only/control | Kreplak2005 |
| `if.mesh` | 0.4 | um | D M R P | if_mesh | source-text-only/control | none resolved |
| `if.stiffening_onset_strain` | 0.5 | 1 | D M P U | if_stiffening | source-text-only/control | none resolved |
| `if.stiffening_ratio` | 1.0 | 1 | D M P U | if_stiffening | source-text-only/control | none resolved |
| `if.turnover_rate` | 0.001 | 1/s | D M U | if_turnover | source-text-only/control | none resolved |
| `integrin.areal_density` | 300.0 | 1/um^2 | D M U | integrin_density | source-text-only/control | none resolved |
| `kinesin.count` | 1000 | 1 | P U | kinesin_population | source-text-only/control | none resolved |
| `kinesin.k` | 300.0 | pN/um | D P U | kinesin_compliance | source-text-only/control | none resolved |
| `kinesin.k_off0` | 1.0 | 1/s | D M U | kinesin_detach | source-text-only/control | Schnitzer2000 |
| `kinesin.k_on` | 5.0 | 1/s | P U | kinesin_attachment | source-text-only/control | Jiang2025 |
| `kinesin.primed_fraction` | 0.5 | 1 | R P | kinesin_cycle_split | source-text-only/control | none resolved |
| `kinesin.reach` | 0.08 | um | D M P U | kinesin_capture | source-text-only/control | none resolved |
| `kinesin.run_length` | 1.0 | um | D M U | kinesin_motility | source-text-only/control | none resolved |
| `kinesin.stall_force` | 6.0 | pN | D M U | kinesin_motility | source-text-only/control | none resolved |
| `kinesin.step` | 0.008 | um | D M R | kinesin_step | source-text-only/control | none resolved |
| `kinesin.velocity` | 0.8 | um/s | D M U | kinesin_motility | source-text-only/control | none resolved |
| `lamellipodium.contour` | 1.0 | um | M P U | lamellipodium_length | source-text-only/control | none resolved |
| `lamina.areal_density` | 0.02 | pg/um^2 | R M | lamina_surface_mass | source-text-only/control | none resolved |
| `lamina.neighbours` | 3 | 1 | R N P | lamina_connectivity | source-text-only/control | Stephens2017 |
| `lamina.turnover_rate` | 0.0001 | 1/s | D M U | lamina_turnover | source-text-only/control | none resolved |
| `linc.areal_density` | 10.0 | 1/um^2 | P U | linc_density | source-text-only/control | none resolved |
| `linc.k` | 100.0 | pN/um | P U | linc_stiffness | source-text-only/control | Dejardin2020 |
| `linc.tension` | 8.0 | pN | D M U | linc_tension | source-text-only/control | Dejardin2020 |
| `material.microtubule.EA` | 380000.0 | pN | R M | mt_axial_modulus | source-text-only/control | Gittes1993 |
| `material.protein_density` | 1.35 | pg/um^3 | D M | protein_density | source-text-only/control | none resolved |
| `membrane.area_modulus` | 200000.0 | pN/um | D M | membrane_area_modulus | source-text-only/control | Rawicz2000 |
| `membrane.areal_density` | 0.005 | pg/um^2 | R M P | membrane_mass | source-text-only/control | none resolved |
| `membrane.channel.excluded_lipid_area` | 0.0001 | um^2 | P M U | channel_area_geometry | source-text-only/control | GuoMacKinnon2017 |
| `membrane.channel.hydrodynamic_radius` | 0.01 | um | P M U | channel_area_geometry | source-text-only/control | GuoMacKinnon2017 |
| `membrane.channel.initial_closed_fraction` | 0.7 | 1 | P N | channel_initial_state | source-text-only/control | none resolved |
| `membrane.channel.initial_open_fraction` | 0.02 | 1 | P N | channel_initial_state | source-text-only/control | none resolved |
| `membrane.channel.molecular_mass` | 860370.0 | Da | R D M | channel_mass | source-text-only/control | Ge2015, UniProtQ92508 |
| `membrane.channel_density` | 1.0 | 1/um^2 | P U | channel_density | source-text-only/control | none resolved |
| `membrane.channel_population_enabled` | 0.0 | 1 | N P | membrane_switches | source-text-only/control | none resolved |
| `membrane.curvature_law_enabled` | 0.0 | 1 | N P | membrane_switches | source-text-only/control | none resolved |
| `membrane.hydraulic_conductivity` | 1.4e-07 | um^3/(pN.s) | R M P | membrane_hydraulic | P17, P18 | Teo2013, Kitchen2020 |
| `membrane.inplane_flow_enabled` | 0.0 | 1 | N P | membrane_switches | source-text-only/control | none resolved |
| `membrane.inplane_friction` | 1000.0 | pN.s/um^3 | M P U | membrane_friction | P15 | Shi2018 |
| `membrane.kappa_gauss` | -0.066 | pN.um | M R U | gaussian_modulus | source-text-only/control | none resolved |
| `membrane.lipid_area_per_molecule` | 7e-07 | um^2 | D M | lipid_area | P14 | Kucerka2005 |
| `membrane.lipid_diffusion` | 1.0 | um^2/s | D M U | lipid_diffusion | P15 | Shi2018 |
| `membrane.lipid_label_fraction` | 0.01 | 1 | N P | lipid_label | source-text-only/control | none resolved |
| `membrane.lipid_tracer_enabled` | 0.0 | 1 | N P | membrane_switches | source-text-only/control | none resolved |
| `membrane.lysis_strain` | 0.03 | 1 | D M U | membrane_lysis | source-text-only/control | none resolved |
| `membrane.mu_2d` | 10.0 | pN/um | R P U | membrane_shear | source-text-only/control | none resolved |
| `membrane.pressure` | 40.0 | pN/um^2 | M P | membrane_pressure | source-text-only/control | none resolved |
| `membrane.spontaneous_curvature` | 0.0 | 1/um | P M | spontaneous_curvature | source-text-only/control | none resolved |
| `membrane.surface_viscosity_enabled` | 0.0 | 1 | N P | membrane_switches | source-text-only/control | none resolved |
| `membrane.viscosity_2d` | 0.001 | pN.s/um | D M U | surface_viscosity | P15 | Shi2018 |
| `membrane.volume_modulus` | 773100.0 | pN/um^2 | R M | membrane_volume_modulus | source-text-only/control | none resolved |
| `membrane.wrinkle_wavelength` | 1.0 | um | P M | membrane_wrinkle | source-text-only/control | none resolved |
| `microtubule.catastrophe_rate` | 0.05 | 1/s | D M U | mt_dynamic_instability | source-text-only/control | none resolved |
| `microtubule.count` | 500 | 1 | D M P U | mt_count | source-text-only/control | none resolved |
| `microtubule.dimer_rise` | 0.008 | um | D R M | mt_dimer_rise | source-text-only/control | none resolved |
| `microtubule.dormant_fraction` | 0.1 | 1 | N R P | mt_growth_controls | source-text-only/control | none resolved |
| `microtubule.end_segment_band_hi` | 2.0 | 1 | N R P | mt_growth_controls | source-text-only/control | none resolved |
| `microtubule.end_segment_band_lo` | 0.5 | 1 | N R P | mt_growth_controls | source-text-only/control | none resolved |
| `microtubule.growth_speed` | 0.25 | um/s | D M U | mt_dynamic_instability | source-text-only/control | none resolved |
| `microtubule.mtoc_radius` | 0.25 | um | D M U | mtoc_size | source-text-only/control | none resolved |
| `microtubule.nucleation_rate` | 0.1 | 1/s | P R U | mt_nucleation | source-text-only/control | none resolved |
| `microtubule.rescue_rate` | 0.05 | 1/s | D M U | mt_dynamic_instability | source-text-only/control | none resolved |
| `microtubule.shrink_speed` | 0.5 | um/s | D M U | mt_dynamic_instability | source-text-only/control | none resolved |
| `microtubule.tubulin_conc` | 20.0 | uM | D M U | mt_dynamic_instability | source-text-only/control | none resolved |
| `microvillus.length` | 1.0 | um | D M U | microvillus_geometry | source-text-only/control | none resolved |
| `microvillus.radius` | 0.05 | um | D M U | microvillus_geometry | source-text-only/control | none resolved |
| `microvillus.tip_clearance` | 0.05 | um | P N R | microvillus_clearance | source-text-only/control | none resolved |
| `microvillus_bundler.k` | 1000.0 | pN/um | P M U | microvillus_bundler_placeholders | source-text-only/control | Ferrer2008, Courson2010 |
| `microvillus_bundler.k_off0` | 0.1 | 1/s | P M U | microvillus_bundler_placeholders | source-text-only/control | Ferrer2008, Courson2010 |
| `microvillus_bundler.k_on` | 1.0 | 1/s | P M U | microvillus_bundler_placeholders | source-text-only/control | Ferrer2008, Courson2010 |
| `microvillus_bundler.length` | 0.0085 | um | P M U | microvillus_bundler_placeholders | source-text-only/control | Ferrer2008, Courson2010 |
| `microvillus_bundler.sites_per_node` | 3.0 | 1 | P R N | microvillus_valence | source-text-only/control | none resolved |
| `microvillus_bundler.x_beta` | 0.0004 | um | P M U | microvillus_bundler_placeholders | source-text-only/control | Ferrer2008, Courson2010 |
| `motor.consistency_tolerance` | 2.0 | 1 | N P R | motor_consistency_band | source-text-only/control | none resolved |
| `nmii.arm_kappa` | 0.01 | pN.um^2 | P M U | nmii_unmeasured_mechanics | source-text-only/control | none resolved |
| `nmii.arm_radius` | 0.002 | um | D M P U | nmii_drag_geometry | source-text-only/control | Billington2013 |
| `nmii.assembly_rate` | 0.03 | 1/s | D M R P U | nmii_object_turnover | P04 | Fritzsche2013, Nie2015 |
| `nmii.backbone_EA` | 44000.0 | pN | P M U | nmii_unmeasured_mechanics | source-text-only/control | none resolved |
| `nmii.backbone_kappa` | 1.0 | pN.um^2 | P M U | nmii_unmeasured_mechanics | source-text-only/control | none resolved |
| `nmii.backbone_length` | 0.301 | um | D M | nmii_backbone_length | P01 | Billington2013 |
| `nmii.backbone_radius` | 0.008 | um | D M P U | nmii_drag_geometry | P02 | Billington2013 |
| `nmii.disassembly_rate` | 0.03 | 1/s | D M R P U | nmii_object_turnover | P04 | Fritzsche2013, Nie2015 |
| `nmii.head_offset` | 0.2 | um | P U | nmii_head_offset | source-text-only/control | none resolved |
| `nmii.head_radius` | 0.005 | um | D M P U | nmii_drag_geometry | source-text-only/control | Billington2013 |
| `nmii.heads_per_side` | 30 | 1 | D M P R | nmii_heads | P03 | Billington2013, Melli2018 |
| `nmii.isoform_iia_fraction` | 1.0 | 1 | P U | nmii_isoform | source-text-only/control | none resolved |
| `nmii.lever_arm` | 0.0075 | um | D M U | nmii_lever_arm | source-text-only/control | none resolved |
| `nmii.n_backbone` | 14 | 1 | N P U | nmii_backbone_resolution | source-text-only/control | none resolved |
| `nmii.object_life` | 1 | 1 | N P | nmii_life_switch | source-text-only/control | none resolved |
| `nmii.rlc_phosphorylated_fraction` | 0.3 | 1 | P U | nmii_head_competence | P04 | Billington2013; Fritzsche2013 |
| `osmotic.external` | 300.0 | mM | D M P U | osmotic_bath | source-text-only/control | none resolved |
| `osmotic.external_water_volume` | 1000000.0 | um^3 | N P R | finite_bath_volume | source-text-only/control | none resolved |
| `osmotic.internal` | 300.01552 | mM | R P | osmotic_rest_balance | source-text-only/control | none resolved |
| `osmotic.reflection_coefficient` | 1.0 | 1 | M P | osmotic_reflection | source-text-only/control | none resolved |
| `osmotic.water_permeation` | 0 | 1 | N P | water_permeation_switch | source-text-only/control | none resolved |
| `sf_arc.lift` | 0.4 | um | P U | arc_geometry | source-text-only/control | none resolved |
| `sf_arc.pitch` | 0.6 | um | P U | arc_geometry | source-text-only/control | none resolved |
| `sim.dt` | 1e-05 | s | N R P | simulation_controls | source-text-only/control | none resolved |
| `sim.fluid_iters` | 20 | 1 | N R P | simulation_controls | source-text-only/control | none resolved |
| `sim.inplane_count_floor_fraction` | 0.05 | 1 | N R P | simulation_controls | source-text-only/control | none resolved |
| `sim.inplane_flow_cg_iters` | 64 | 1 | N R P | simulation_controls | source-text-only/control | none resolved |
| `sim.surface_diffusion_max_crossings` | 32 | 1 | N R P | simulation_controls | source-text-only/control | none resolved |
| `stress_fiber.pitch` | 0.5 | um | P M U | sf_geometry | source-text-only/control | none resolved |
| `stress_fiber.sarcomere` | 1.0 | um | D M P | sf_sarcomere | source-text-only/control | Hotulainen2006 |
| `stress_fiber.spacing` | 0.012 | um | P M U | sf_geometry | source-text-only/control | none resolved |
| `substrate.stiffness` | 5000.0 | pN/um^2 | D M P U | substrate_environment | source-text-only/control | none resolved |
| `substrate.thickness` | 50.0 | um | D M P U | substrate_environment | source-text-only/control | none resolved |
| `transport.dynein_cargo_fraction` | 0.6 | 1 | P U | transport_partition | source-text-only/control | none resolved |
| `transport.kinesin_cargo_fraction` | 0.8 | 1 | P U | transport_partition | source-text-only/control | none resolved |

## Semantic review groups and missing anchors

- **actin_pool_proxy** — `actin_chem.capping_conc`, `actin_chem.cofilin_conc`, `actin_chem.g_actin_free`, `actin_chem.g_actin_total`, `actin_chem.profilin_conc`, `actin_chem.thymosin_conc`. Declaration gives nonmuscle concentration scales, literature summaries and explicit MCF7 gaps, rather than matched measurements. Free, complexed and total pools are distinct. Missing/next: Obtain species/cell-state-specific quantitative abundance and free-versus-total definition, original assay, volume normalization and uncertainty. Pollard2000/BNID mention is not an identified MCF7 dataset.
- **formin_cp_ternary** — `actin_chem.capping_formin_k_off`, `actin_chem.capping_formin_k_on`. Explicit Shekhar2015 Figure2/Table1 assay transfer for CP on a formin-bound end. Missing/next: Extract exact table/figure and protein constructs, buffer, temperature and shared-fit relations before promotion.
- **capping_free_end** — `actin_chem.capping_k_off`, `actin_chem.capping_k_on`. Declared Schafer1996 in-vitro free-end kinetic rates; registration caveat is stale relative to saved SE487 OK identity. Missing/next: Primary numerical table and construct/buffer context not checked in this bounded pass; distinguish free-end versus formin-bound-end rates.
- **cofilin_occupancy** — `actin_chem.cofilin_decorated_fraction`. Explicit placeholder for unwired binding kinetics; stoichiometric ceiling and selected occupancy are different quantities. Missing/next: Occupancy assay or binding-law evidence needed. Boundary-dependent severing cannot be inferred from a monotone uniform occupancy proxy.
  Derivation: {"declared_ceiling": 0.0987, "selected_value": 0.05, "status": "source_text_arithmetic_not_recomputed_native_build", "assumptions": ["one cofilin per actin protomer", "built protomer inventory and compartment volume", "phosphorylated fraction unknown"]}.
- **cofilin_severing** — `actin_chem.cofilin_severing_rate`. An order-of-magnitude rate attributed to Andrianantoandro/Pollard2006; direct numerical support and occupancy normalization remain unresolved. Missing/next: Locate primary per-length rate, decorated fraction, boundary density, actin/cofilin isoforms and temperature; do not equate rate per decorated length with rate per boundary.
- **actin_end_bands** — `actin_chem.end_segment_band_hi`, `actin_chem.end_segment_band_lo`. Node insertion/retirement bands are resolution and resource controls, not biological measurements. Missing/next: Need accepted-step native convergence evidence, not a biological source. Source inequalities are guard design.
- **g_actin_exchange** — `actin_chem.g_actin_exchange`, `actin_chem.profilin_exchange`. Selden1999 ADP release is projected to exchange under rapid ATP rebinding, so kinetic state meaning is part of the transfer. Missing/next: Read PMID10052948 conditions and justify rapid rebinding at current ATP/Mg-ATP pools.
- **soluble_pi_model** — `actin_chem.g_actin_pi_release`. Declaration explicitly calls 10000/s an assigned fast soluble Pi-release model initial point. Missing/next: Bindschadler2004 Table1 model context; no claim that this is a measured biochemical rate.
- **actin_hydrolysis** — `actin_chem.k_hydrolysis`. Declaration attributes filament ATP hydrolysis0.3/s to Blanchoin/Pollard2002. Missing/next: Identify original DOI/figure, isoform, temperature and bound nucleotide assay; do not borrow detached-head hydrolysis.
- **adppi_end_rates** — `actin_chem.k_off_barbed_adppi`, `actin_chem.k_off_pointed_adppi`, `actin_chem.k_on_barbed_adppi`, `actin_chem.k_on_pointed_adppi`. Explicit Fujiwara2007 Table1 saturating-phosphate TIRF transfer. Missing/next: Full table/protocol audit remains; establish whether ADP-Pi is stabilized by assay phosphate and whether uncertainty applies jointly.
- **filament_pi_release** — `actin_chem.k_pi_release`. Order-of-magnitude lattice phosphate release cites Carlier1986/Fujiwara2007. Missing/next: Separate buried-subunit and exposed-end rates; identify primary numerical anchor and concentration dependence.
- **barbed_pi_release** — `actin_chem.k_pi_release_barbed`. Explicit Jegou2011 exposed-end assay transfer. Missing/next: Verify Fig3/Table1 exact species, end state and phosphate protocol.
- **pointed_pi_model** — `actin_chem.k_pi_release_pointed`. Declaration says Narita2011 kinetic model assigns2/s at either end, not a measured pointed-end rate. Missing/next: Retain model assumption and find independent pointed-end kinetics if needed.
- **actin_rise** — `actin_chem.monomer_rise`. Structural axial rise is transferred through Popov2016 to Splettstoesser2011 and is also a computational growth/count conversion. Missing/next: Audit the original structural definition and helical averaging; reconcile370 subunits/um with rounded2.7nm without creating two independent observations.
- **profilin_affinity_adp** — `actin_chem.profilin_adp_kd`. Xue2014 introduction is an indirect cited-affinity route. Missing/next: Trace to the underlying primary affinity assay, rather than treating introductory comparison as independent data.
- **profilin_end_loss** — `actin_chem.profilin_k_off_barbed_adp`, `actin_chem.profilin_k_off_barbed_adppi`, `actin_chem.profilin_k_off_barbed_atp`. Courtemanche2013 Table1 reaction4 calls these measured complex-loss rates; ATP row uses AMP-PNP surrogate. Missing/next: Audit nucleotide-specific assay and distinguish complex loss from fitted on-rates and equilibrium end affinities.
- **profilin_end_fitted** — `actin_chem.profilin_k_on_barbed_adp`, `actin_chem.profilin_k_on_barbed_adppi`, `actin_chem.profilin_k_on_barbed_atp`, `actin_chem.profilin_tip_kd_adp`, `actin_chem.profilin_tip_kd_adppi`, `actin_chem.profilin_tip_kd_atp`. Courtemanche2013 fitted association/end-affinity parameters share an assay model; ATP rows transfer from AMP-PNP. Missing/next: Do not treat same-paper fitted quantities as independent measurements. Obtain fit parameterization, nucleotide conditions and covariance if actually reported.
- **profilin_soluble_association** — `actin_chem.profilin_k_on`. Funk2019 Appendix1Table1 ATP association is copied across nucleotide states. Missing/next: Check40/uM/s source chain and experimental scope; shared nucleotide equality is an assumption.
- **profilin_tip_fitted** — `actin_chem.profilin_tip_k_off`. Funk2019 Appendix1Table2 WT495/s is a Michaelis-Menten growth-velocity fit; shared nucleotide off-rate is expressly assumed. Missing/next: A fitted maximum growth rate is not an independent microscopic dwell observation. Retrieve joint fit with KM/k1 and retain nucleotide transfer caveat.
- **profilin_atp_affinity** — `actin_chem.profilin_kd`. Vinson1998 approximate ATP-actin affinity; no exact assay anchor in declaration. Missing/next: Find original DOI/table and actin/profilin isoforms, temperature, Mg/Ca and nucleotide state.
- **severing_reserve** — `actin_chem.severing_reserve_fraction`. Capacity reserve is computed from cut rate, occupancy, contour and assumed run duration with headroom. Missing/next: Confirm sizing against actual protocol length and built chain count; no biological uncertainty implied by reserve.
  Derivation: {"expression": "0.01/(um*s) * 0.05 * 3um *100s =0.15 cuts/chain;0.5 reserve gives3.33x headroom", "status": "declaration_arithmetic", "assumptions": ["constant rate and contour", "uniform-rate approximation", "100s protocol"]}.
- **thymosin_adp_affinity** — `actin_chem.thymosin_adp_kd`. Bindschadler2004 Table1 cites Carlier1993 for ADP affinity; source chain has an intervening model. Missing/next: Trace original Carlier assay and keep model transcription distinct from measurement.
- **thymosin_on** — `actin_chem.thymosin_k_on`. Au2008 WT AEDANS-actin22C low-salt assay transferred across assay and nucleotide context. Missing/next: Check Table1 and fluorescent label/ionic-strength effects; do not treat all nucleotides as measured.
- **thymosin_atp_affinity** — `actin_chem.thymosin_kd`. Approximate2uM affinity from Pollard2000 summary. Missing/next: Trace original primary assay, isoforms and physiological ionic conditions.
- **unit_chem_switch** — `actin_chem.unit_chemistry_enabled`. Discrete path selector explicitly not a measurement. Missing/next: Runtime switch behavior and restoration/convergence require device verification, not evidence promotion.
- **arp_branch_geometry** — `arp23.branch_angle`. Nominal70deg branch angle; declaration relates lamellipodial35deg orientation by a half-angle construction. Missing/next: Need separate branch-junction and network-orientation assays; an angle mean does not identify angular stiffness.
- **arp_abundance** — `arp23.conc`. Literature-scale1-2uM with MCF7 gap. Missing/next: Measure total/free/NPF-bound Arp2/3 in target context and volume.
- **arp_debranch** — `arp23.debranch_rate`. LeClainche2003/Chan2009 order-of-magnitude range. Missing/next: Find original assay and branch age, force, nucleotide and cofactor dependence.
- **arp_junction_mechanics** — `arp23.k`, `arp23.k_theta`. Axial coefficient is copied from alpha-actinin; angular coefficient is a few-kBT/radian scaling argument. Neither is measured junction compliance. Missing/next: Locate joint angular distribution/load protocol and molecular compliance; equipartition requires equilibrium plus a justified angle observable.
- **arp_nucleation** — `arp23.nucleation_rate`. Decision transcription0.037/s per WAVE is used per free Arp2/3 complex, explicitly assuming all complexes NPF-bound. Missing/next: Correct attribution candidate is Li/Bieling2022; denominator transfer needs NPF-bound inventory and surface-area calibration, not only a DOI.
- **arp_birth_reserve** — `arp23.nucleation_reserve_fraction`. Shipped0 is a declared birth-workspace safety decision; historical0.1 sizing is capacity arithmetic. Missing/next: A zero reserve is not measured zero nucleation. Native born-chain constraint admission and protocol-duration capacity remain separate checks.
- **cargo_mass_proxy** — `cargo.density`. Water-density approximation for aqueous cargo lumen; explicitly replaces a different lipid-count construction. Missing/next: Target vesicle lumen/cargo composition and geometry needed; do not promote this as measured vesicle material density.
- **cargo_radius_assay** — `cargo.radius`. 120nm-diameter synthetic liposome assay transfer from Jiang2025. Missing/next: Primary diameter is confirmed; native MCF7 vesicle size distribution and motor arrangement are unresolved.
- **seed_control** — `cell.seed`. Quenched-disorder seed is an experimental replication control. Missing/next: No literature value; replication robustness must be evaluated separately.
- **chemical_environment** — `chem.adp_conc`, `chem.atp_conc`, `chem.ionic_strength`, `chem.mg_free`, `chem.ph`, `chem.pi_conc`. Generic cytosolic setpoints and textbook ranges, not a single matched cellular condition. Missing/next: Identify assay and compartment for each free/total concentration, pH, ionic strength and temperature; jointly consistent preparation is needed.
- **debye_relation** — `chem.debye_length`. Electrolyte consistency formula is explicit; rounded0.8nm is checked against current ionic strength, temperature and water permittivity. Missing/next: Formula applicability assumes ideal symmetric electrolyte; no force-law claim follows from the check.
  Derivation: {"expression": "sqrt(eps_r*eps_0*kBT/(2*e^2*N_A*I))", "assumptions": ["symmetric monovalent electrolyte", "SI concentration conversion"], "status": "declaration_relation"}.
- **atp_free_energy** — `chem.delta_g_atp`. 20kBT approximation is an energetic convention; actual hydrolysis free energy depends on nucleotide/phosphate chemical potentials. Missing/next: Obtain standard-state and activity conventions; do not independently observe deltaG while its chemical environment is unspecified.
- **mgatp_affinity** — `chem.mgatp_kd`. Explicit textbook order-of-magnitude point, not a paper extraction. Missing/next: Primary Mg-ATP affinity at matched ionic strength, pH and temperature; state free-vs-total ATP/Mg.
- **water_permittivity** — `chem.solvent_permittivity`. CRC water property at37C used for screening consistency only. Missing/next: Record edition/table/temperature interpolation and distinguish water from effective crowded-cytosol dielectric.
- **chromatin_density_proxy** — `chromatin.density`. Mbp domain effective mass-density order-of-magnitude. Missing/next: Define DNA/protein/hydration volume and constituent mass; no source is identified.
- **chromatin_model_count** — `chromatin.n_subunits`. 552 is an explicit HeLa10um-diameter published model value. Missing/next: Target genome/domain definition and ploidy needed before interpreting model particles as MCF7 genomic domains.
- **clutch_model** — `clutch.count_per_fa`, `clutch.f_bond`, `clutch.k_off0`, `clutch.k_on`. Chan/Odde2008 motor-clutch model parameters, including model count, not direct molecular or adhesion observations. Missing/next: Extract original supplementary parameter table; count should connect measured integrin density and FA area, and kinetics depend on coarse-graining.
- **cortex_nucleator_fraction** — `cortex.arp23_fraction`. Similar nucleator contribution is transferred from actin-fluorescence mass to fraction of built filaments;0.5 is a declared operating point. Missing/next: Count fraction needs length distributions and differential labeling/nucleation interpretation.
- **cortex_length_convenience** — `cortex.contour`. Source explicitly calls3um convenience and3-30x longer than cited populations. Missing/next: Measure full target population contour distribution with branch/for­min identities and census resolution.
- **cortex_reserve** — `cortex.dormant_fraction`. Reserve scales numerical node capacity with declared elongation, segment length and run duration. Missing/next: Recompute against actual built chains and protocol; not a latent biological concentration.
- **cortex_polarity** — `cortex.polarity_mix`. PI-specified unrectified initial polarity preparation. Missing/next: Target directional distribution if this is to describe observed cortex; preserve as preparation decision meanwhile.
- **cortex_depth_profile** — `cortex.proximal_fraction`. 0.8 chosen from built reach-coverage diagnostics, with qualitative cortex-profile literature. Missing/next: No measured80% in proximal half; Clark uses confocal profile inference, not the declaration claimed super-resolution.
- **cortex_turnover** — `cortex.turnover_rate`. Approximate half-time transferred to a whole-filament turnover rate. Missing/next: Fritzsche2013 has multiple populations and FRAP/FLAP protocols; identify which statistic is being represented. Saved SE110 lacks OK identity.
- **crossbridge_state_selector** — `crossbridge.cycle_states`. Discrete projected kinetic-model selector. Missing/next: Do not learn as a continuous molecular rate; model choice is PI-gated.
- **iib_placeholders** — `crossbridge.iib.f_stall`, `crossbridge.iib.k_off0`, `crossbridge.iib.k_on`, `crossbridge.iib.k_stroke`. Explicit equality stand-ins copied from IIA; declarations admit absent IIB anchors and a known slower-isoform direction for stroke. Missing/next: Find isoform-specific kinetics and state definitions. Equality cannot imply shared measurement or an experimentally identified isoform effect.
- **free_head_gap** — `crossbridge.k_adp_release_free`, `crossbridge.k_atp_isomerize`, `crossbridge.k_pi_release`. Declared rates have no direct numerical source in this corpus. Missing/next: Detached-head versus actin-bound states, ATP saturation and Pi-release gating require primary transient-state assays.
- **atp_encounter** — `crossbridge.k_atp_apparent`. Apparent low-ATP first-passage slope, not a microscopic rate. Missing/next: Need matched low-ATP slope plus saturating ceiling and encounter model; do not sample the three as independent microscopic observations.
- **nmii_biochemical_candidates** — `crossbridge.k_atp_bind`, `crossbridge.k_hydrolysis`. Approximate NMIIA kinetics attributed to Kovacs2003; source identity has duplicate OK/CHECK records. Missing/next: Extract rigor-head ATP binding and detached-head hydrolysis table at stated conditions; avoid reusing actin-bound ADP rate.
- **free_atp_transfer** — `crossbridge.k_atp_bind_free`. Explicitly copies rigor-head ATP coefficient for want of a detached-head measurement. Missing/next: Separate detached apo association from rigor-head apparent dissociation.
- **crossbridge_capture** — `crossbridge.reach`. Capture radius linked to model cortex node spacing; no molecular capture distribution. Missing/next: Determine spatial site resolution and head geometry; reach changes effective encounter rate.
- **stroke_direction_convention** — `crossbridge.stroke_sign`. Builder indexing convention with biological direction unresolved. Missing/next: Map index direction to chain polarity; no scalar literature fit.
- **crosslink_capture** — `crosslink.arm_reach`, `crosslink.radius`, `crosslink.reach`. Effective hydrated/capture geometries, partly half of an inherited whole-link radius. Missing/next: Direct hydrodynamic/capture definitions and dependence on material-site representation remain open.
- **crosslink_abundance** — `crosslink.conc`. Generic alpha-actinin concentration scales finite molecular capacity via actual cytoplasm volume. Missing/next: Primary MCF7 isoform-specific free/total abundance and cytoplasm volume needed.
- **crosslink_effective_stiffness** — `crosslink.k`. PI-selected intact-linker stand-in with thermal/step bounds; Ferrer bond-well curvature was explicitly rejected as whole-rod stiffness. Missing/next: No direct intact-rod axial modulus; changing timestep is not biological evidence. Future yielding-element choice remains separate.
- **crosslink_uncited_on** — `crosslink.k_on`. Literal rate inherited from a code card with no citation. Missing/next: Locate physical attachment observable including free pool and geometric encounter probability.
- **crosslink_rod_size** — `crosslink.length`, `crosslink.molecular_weight`. Rod length and dimer mass are approximate species-specific structural transfers. Missing/next: Trace Sjoblom2008 to primary alpha-actinin structure and isoform/sequence for two103kDa subunits.
- **crosslink_representation** — `crosslink.molecular_model`. Chooses relation-owner representation versus finite two-arm molecular population. Missing/next: Different mechanistic representation, not parameter uncertainty; needs PI/model and device comparison.
- **cytoplasm_contour** — `cytoplasm_actin.contour`. Explicit analogy to cortical band; no cytosolic contour evidence. Missing/next: Obtain compartment-specific free-filament length distribution, without treating cortex analog as a measurement.
- **cytoplasm_reserve** — `cytoplasm_actin.dormant_fraction`. Cortex-style growth capacity reserve. Missing/next: Verify capacity at actual growth protocol, not source as biological fraction.
- **cytoplasm_polarity** — `cytoplasm_actin.polarity_mix`. PI preparation convention copied in meaning from cortex. Missing/next: Target polarity distribution absent.
- **dynein_population** — `dynein.count`. Explicit unknown active-motor count initial point. Missing/next: Define total complex, assembled active complex, cargo-attached and MT-engaged quantities; target census is absent.
- **dynein_compliance** — `dynein.k`. Approximate stalk stiffness stated as PI-GAP with no primary anchor. Missing/next: Find construct/load-direction-specific compliance, separate optical-trap compliance.
- **dynein_detachment** — `dynein.k_off0`. 1/s cites Schnitzer2000, but that paper studies kinesin, not dynein. Missing/next: Replace identity chain through PI review; choose matched mammalian DDB or cortical-pulling complex and load geometry.
- **dynein_attachment** — `dynein.k_on`. Attachment within reach with no quantitative source. Missing/next: Need association normalization, free pool, lattice sites, construct, adaptor and encounter geometry.
- **dynein_cycle_split** — `dynein.primed_fraction`. Declared maximum-entropy equal split of one cycle time into two unmeasured substates. Missing/next: A convention, not an observed occupancy or independently measured rate.
- **dynein_capture** — `dynein.reach`. Carter2011 structural length is used as a maximal capture radius. Missing/next: Identify Carter construct and distinguish stalk length, motor-domain displacement and cargo tether reach.
- **dynein_motility** — `dynein.run_length`, `dynein.stall_force`, `dynein.velocity`. The declaration bundles7pN,1um/s and1um, with Gennerich2007 placed after the stall value. The inspected yeast assay supports the stall scale; velocity sourcing and transfer to the intended mammalian state remain unresolved. Missing/next: Find a coherent mammalian DDB/cortical-pulling parameter set, rather than mixing organisms/assays.
- **dynein_step** — `dynein.step`. 8nm tubulin repeat is used as a fixed motor step; Gennerich reports a distribution including4-24nm. Missing/next: Fixed-step reduction needs explicit model caveat; actual dynein step distribution depends on load.
- **envelope_mass** — `envelope.areal_density`. Double-bilayer areal mass construction. Missing/next: Specify two bilayers, protein contribution and lipid composition; not a measured NE surface mass.
- **envelope_switch** — `envelope.double_sheet`. Single/double-sheet representation selector. Missing/next: Representation control, not inferred material quantity.
- **envelope_bending** — `envelope.kappa_bend`. Shell scaling estimate and device-selected value;4pN.um exceeds stated0.5-2 estimate and was chosen by fold/area results. Missing/next: Dahl modulus is isolated Xenopus oocyte envelope; identify lamina thickness/carrier partition and avoid treating simulation acceptance as evidence.
- **envelope_shear** — `envelope.mu_2d`. Residual shell coefficient chosen after a model estimate of lamina contribution to whole-nucleus mechanics. Missing/next: Whole-nucleus force response does not separately identify envelope and lamina moduli; geometry factor and network nonaffinity are assumptions.
- **nuclear_pore_population** — `envelope.pore_density`. Generic3-10NPC/um2 scale. Missing/next: Target MCF7 NPC census, surface area, cell cycle and nuclear-envelope wrinkling needed.
- **nuclear_pore_transport_geometry** — `envelope.pore_length`, `envelope.pore_radius`. Passive-solute diffusion equivalent channel geometry is interpreted as a water-flow cylinder. Missing/next: Primary equivalent diffusional radius/length are not a directly measured hydraulic pore; r^4 conductance sensitivity and FG resistance matter.
- **nuclear_laplace** — `envelope.pressure`. Explicit Laplace balance, not nucleoplasmic pressure measurement. Missing/next: Radius must represent the built geometry and tension; re-derive when either changes.
  Derivation: {"expression": "2*6pN/um/(7.5um*0.68)=2.35294pN/um^2", "status": "declaration_arithmetic", "assumptions": ["spherical equilibrium", "surface tension interpretation"]}.
- **envelope_spacing** — `envelope.spacing`. Perinuclear gap30-50nm structural scale. Missing/next: Identify cell type, preparation, intermembrane versus bilayer-center spacing and measurement distribution.
- **envelope_tension_proxy** — `envelope.tension`. Tension proxy equals bulk nuclear modulus399Pa times15nm lamina thickness. Missing/next: Bulk indentation modulus times thickness is a modeling conversion, not measured pre-tension; need constitutive relation and thickness source.
- **envelope_osmotic_modulus** — `envelope.volume_modulus`. Ideal-solution volume stiffness derived from osmolarity. Missing/next: Permeant ions and macromolecular colloid have different timescales; formal300mM ideal law does not establish nuclear colloid modulus.
- **envelope_wrinkle** — `envelope.wrinkle_wavelength`. 1um correlation length chosen for excess-area geometry; Li2015 is a sourcing candidate. Missing/next: Locate primary surface spectrum, imaging resolution and cell protocol; correlation length is not an independently established reservoir mechanism.
- **fascin_mechanics** — `fascin.k`, `fascin.x_beta`. Explicit unknown stiffness and Bell length; x_beta borrows filamin initial point. Missing/next: Obtain fascin-specific force-dependent unbinding and compliance; copied linker identity does not transfer quantitatively.
- **fascin_turnover** — `fascin.k_off0`, `fascin.k_on`. Aratyn2007 turnover scale motivates unbinding and an unmeasured on-rate. Missing/next: FRAP turnover does not jointly identify microscopic on/off without bound/free fractions and diffusion. Resolve original primary protocol.
- **fascin_span** — `fascin.length`. Bundle spacing is read as linker center-to-center span; declaration explicitly distinguishes maximum extension. Missing/next: Confirm original Courson/Rock geometry and relate packing to molecular binding-site span.
- **fascin_valence** — `fascin.sites_per_node`. Valence chosen for connected built bundles, bounded by packing neighbors. Missing/next: A graph-connectivity outcome is not molecular occupancy. Binding-site resolution and independent molecular census needed.
- **filamin_geometry** — `filamin.arm_reach`, `filamin.radius`. Independent capture and hydrodynamic geometry assumptions. Missing/next: Identify construct/hydration and capture definition; not whole-dimer structural length.
- **filamin_abundance** — `filamin.conc`. Approximate1uM concentration with PI-GAP. Missing/next: MCF7 FLNa abundance/free pool, cell volume and other isoforms needed.
- **filamin_unknown_mechanics** — `filamin.k`, `filamin.k_on`. Unknown stiffness and on-rate initial points. Missing/next: Measure flexible-linker mechanics and association normalization; no source numeric anchor.
- **filamin_catch_card** — `filamin.k_catch0`, `filamin.x_catch`. Pereverzev code card branch is combined with Ferrer slip rows from a different fit. Missing/next: Locate full original catch model/fit; hybrid branch has no jointly measured covariance or fit validity.
  Derivation: {"expression": "f*=kBT*ln(k_c*x_c/(k_s*x_s))/(x_c+x_s)", "status": "declared_two_pathway_model", "assumptions": ["catch and slip rates add", "shared temperature", "mixed fits are not jointly validated"]}.
- **filamin_off** — `filamin.k_off0`. 0.087/s is a fitted intrinsic dissociation rate in Ferrer2008. Missing/next: Fit is Hummer-Szabo rupture-loading model, not direct unloaded lifetime; preserve joint barrier parameter and assay geometry.
- **filamin_size** — `filamin.length`, `filamin.molecular_weight`. Nakamura2011 structural length and approximate dimer mass transfer. Missing/next: Trace primary whole-dimer conformation and isoform mass; flexible contour and end-to-end span differ.
- **filamin_capture_relation** — `filamin.reach`. Whole-link radius set to rod span, within twice the chosen arm reach, to make current representation geometrically possible. Missing/next: No direct capture probability measurement. Representation and node-resolution changes alter the relationship.
- **filamin_barrier** — `filamin.x_beta`. The declaration names a0.4nm Bell length. Ferrer reports a0.194nm Hummer–Szabo fitted distance; definition translation and author-noted fitting bias preclude a direct contradiction or automatic replacement. Missing/next: Resolve whether another fit/source was intended. Do not replace automatically or infer fascin value.
- **filopodia_preparation** — `filopodium.cap_angle`, `filopodium.contour`, `filopodium.filaments`, `filopodium.tip_clearance`. Architecture specification and polarization/clearance decisions with10-30 filament band; no primary census anchor here. Missing/next: Target epithelial protrusion identity, length/count distribution, imaging and geometric clearance definition.
- **fluid_numerical** — `fluid.box_cells`, `fluid.cells_multiple`, `fluid.padding`, `fluid.spacing_factor`, `fluid.staggered`. Grid type, wall placement, rounding and spacing band are numerical choices. Missing/next: Native box-size/resolution/convergence and boundary influence; not biological sampling targets.
- **cytosol_water** — `fluid.cytosol_water_fraction`. Generic70% water-by-volume textbook transfer. Missing/next: Distinguish cytosolic water from whole-cell water, osmotically inactive volume and excluded macromolecular fraction.
- **membrane_slip** — `fluid.slip_length_membrane`. No-slip boundary-model assumption. Missing/next: A zero boundary slip is not an abundance or measured universal membrane property.
- **footprint_geometry** — `footprint.clearance`, `footprint.z_basal`. Inscribed-square clearance and spherical contact plane are construction choices. Missing/next: Target adherent morphology cannot be inferred from spherical contact geometry.
- **formin_density** — `formin.areal_density`. Explicit unknown cortical nucleator density. Missing/next: Measure active membrane-bound formin count and isoform, not total expression.
- **formin_cp_kinetics** — `formin.capped_k_off`, `formin.capped_k_on`, `formin.k_on`. Shekhar2015 mDia1 single-filament association/ternary-end assay transfer. Missing/next: Retrieve Table1/Fig2 exact constructs/protocol and fit dependencies.
- **formin_processivity** — `formin.elongation_factor`, `formin.k_off`. Kovar2006 acceleration and processive dissociation scales are proxies. Missing/next: Identify formin/profilin/actin concentrations, force and construct; no universal scalar acceleration.
- **if_clearance** — `if.gap`. Incumbent end-clearance convenience. Missing/next: No measured biological gap; relate to compartment geometry.
- **if_failure** — `if.max_strain`. Kreplak2005 single-filament extensibility is interpreted as failure strain. Missing/next: Clarify engineering strain versus extension ratio, AFM geometry and IF subtype; no universal failure cutoff.
- **if_mesh** — `if.mesh`. In-vitro K8/18 1mg/ml400nm mesh transferred to a radial-spoke count formula. Missing/next: Resolve clipped primary paper identity and native MCF7 mesh; network mesh is not automatically spoke spacing.
  Derivation: {"expression": "N_spokes=4*pi*r_mid^2/mesh^2", "status": "PI_declared_geometry_count_relation", "assumptions": ["radial-spoke architecture", "mesh interpreted as area-per-spoke square root"]}.
- **if_stiffening** — `if.stiffening_onset_strain`, `if.stiffening_ratio`. Janmey1991 network stiffening scale; shipped ratio1 is explicitly linear despite an exploratory stiffening range. Missing/next: Network nonlinear shear response does not directly fix single-filament axial tangent ratio; identify IF type and strain definition.
- **if_turnover** — `if.turnover_rate`. Vimentin minutes-hours exchange estimate. Missing/next: MCF7 epithelial keratin population versus vimentin identity, subunit versus whole-filament turnover and assembly state need resolution.
- **integrin_density** — `integrin.areal_density`. Generic100-1000/um2 density with MCF7 gap. Missing/next: Count surface integrin subtype and activated/bound fraction; distinguish global area and FA-local density.
- **kinesin_population** — `kinesin.count`. Explicit unknown active motor count. Missing/next: Separate total KIF pool, cargo-attached motors, MT engagement and KIF5/KIF11 species.
- **kinesin_compliance** — `kinesin.k`. Approximate stalk compliance with no primary anchor. Missing/next: Specify construct, tether and loading axis; full-motor and trap compliance differ.
- **kinesin_detach** — `kinesin.k_off0`. Schnitzer2000 cited for approximately1/s; exact quantitative detachment anchor not located in this pass. Missing/next: Read load/ATP-dependent processivity equations and constructs; independent run length is not a second no-load rate measurement.
- **kinesin_attachment** — `kinesin.k_on`. Explicit attachment initial point within reach. Missing/next: Surface/cargo geometry and motor distribution strongly affect effective on-rate; use calibrated association assay.
- **kinesin_cycle_split** — `kinesin.primed_fraction`. Equal split of a measured cycle-time scale into unobserved substates. Missing/next: No separate occupancy measurement; velocity/step identifies total cycle time.
- **kinesin_capture** — `kinesin.reach`. Hirokawa2009 whole length transferred into capture radius. Missing/next: Distinguish contour, tether flexibility and actual head-to-lattice reach for KIF5 versus kinesin-5.
- **kinesin_motility** — `kinesin.run_length`, `kinesin.stall_force`, `kinesin.velocity`. Bundles Svoboda1994 stall and unspecified Howard velocity/run length. Missing/next: One coherent construct, ATP, load and cargo assay is missing; do not imply one joint fit.
- **kinesin_step** — `kinesin.step`. Tubulin8nm repeat used as fixed motor step. Missing/next: Need motor-specific step evidence and explicit KIF5/KIF11 transfer caveat.
- **lamellipodium_length** — `lamellipodium.contour`. Architecture-spec short-filament assignment. Missing/next: Actual branch-to-end versus whole-filament contour distribution and imaging context absent.
- **lamina_surface_mass** — `lamina.areal_density`. Density times15nm thickness construction. Missing/next: Hydration, filament packing fraction, lamin species and thickness assay missing.
  Derivation: {"expression": "1.35pg/um^3*0.015um=0.02025pg/um^2", "status": "declaration_arithmetic", "assumptions": ["uniform solid material layer"]}.
- **lamina_connectivity** — `lamina.neighbours`. Nearest-neighbor count selected to achieve model average degree. Missing/next: kNN parameter is not experimentally measured node degree; measure resulting graph and preserve experimental/simulation distinction.
- **lamina_turnover** — `lamina.turnover_rate`. Hours-scale lamin A/C exchange approximate. Missing/next: FRAP fraction, assembly state and whole-filament versus subunit exchange; source missing.
- **linc_density** — `linc.areal_density`. Explicit unknown complex density. Missing/next: Quantify nesprin/SUN stoichiometry, surface localization and force-carrying subset.
- **linc_stiffness** — `linc.k`. Explicit gap;8pN tension does not determine100pN/um stiffness. Missing/next: Need extension-force relation and construct geometry, not a tension sensor threshold.
- **linc_tension** — `linc.tension`. Dejardin datum cited as approximate8pN tension; exact interpretation remains unverified. Missing/next: Read sensor calibration and saturation/threshold limits, isoform and cell type before using8pN as mean force.
- **mt_axial_modulus** — `material.microtubule.EA`. E times hollow-annulus area inferred from flexural rigidity/geometry, not a direct EA measurement. Missing/next: Retain cylinder radii and isotropic-continuum assumptions; stabilized microtubule bending does not uniquely identify axial response.
  Derivation: {"expression": "1.2GPa*pi*(12.5^2-7.5^2)nm^2≈3.77e5pN", "status": "declaration_arithmetic", "assumptions": ["homogeneous annular beam", "chosen inner/outer radius", "E inferred from flexure"]}.
- **protein_density** — `material.protein_density`. Typical dry-protein material density, not whole-cell effective density. Missing/next: Primary density/partial-specific-volume source and hydration convention needed across filament species.
- **membrane_area_modulus** — `membrane.area_modulus`. Approximate bilayer area-expansion modulus from Rawicz2000; record is already SE211 OK. Missing/next: Pure-PC micropipette result243mN/m±10% across12lipids is a material-class scale, not exact200mN/m or whole-cell membrane measurement.
- **membrane_mass** — `membrane.areal_density`. 5nm aqueous-density slab gives0.005pg/um2. Missing/next: Lipid/protein composition, both leaflets and water-associated mass definition need a source.
- **channel_area_geometry** — `membrane.channel.excluded_lipid_area`, `membrane.channel.hydrodynamic_radius`. Exploratory excluded lipid footprint and scalar hydrodynamic center radius; structural Piezo dome is a different observable. Missing/next: Derive exclusion area and anisotropic hydrodynamic approximation from a specified structure, not generic dome diameter.
- **channel_initial_state** — `membrane.channel.initial_closed_fraction`, `membrane.channel.initial_open_fraction`. Explicit preparation fractions, not stationary probabilities or native occupancy data. Missing/next: No equilibrium inference; preserve remaining inactive fraction and empty-pore preparation constraints.
- **channel_mass** — `membrane.channel.molecular_mass`. Human canonical sequence monomer mass times trimer architecture; declaration says external primary checked but KB pending. Missing/next: Verify UniProt release/accession, isoform and post-translational modifications; trimer architecture source is not a mass measurement.
  Derivation: {"expression": "286790Da*3=860370Da", "status": "declaration_arithmetic", "assumptions": ["canonical unmodified human peptide", "homotrimer"]}.
- **channel_density** — `membrane.channel_density`. Unknown Piezo1 density initial point. Missing/next: Quantify membrane-localized functional channel population in target cell state, including expression and trafficking.
- **membrane_switches** — `membrane.channel_population_enabled`, `membrane.curvature_law_enabled`, `membrane.inplane_flow_enabled`, `membrane.lipid_tracer_enabled`, `membrane.surface_viscosity_enabled`. Declared mechanism/representation switches. Missing/next: Require model/device checks; no continuous empirical distribution or biochemical interpretation of0/1/2.
- **membrane_hydraulic** — `membrane.hydraulic_conductivity`. Converts assumedPf20um/s via water molar volume andRT; declaration explicitly notes corrected historical unit slip. Missing/next: Need matched37C MCF7 osmotic-shock assay and aquaporin state; freezing-fit permeability is not a physiological substitute.
  Derivation: {"expression": "Lp=Pf*Vw/(R*T);20um/s gives≈1.397e-13m/(Pa*s)=1.397e-7um^3/(pN*s) at310K", "status": "independent_unit_arithmetic", "assumptions": ["Pf20um/s is proxy", "water molar volume18cm^3/mol", "ideal RT relation"]}.
- **membrane_friction** — `membrane.inplane_friction`. Source explicitly memory-based stand-in intended to be replaced by explicit attachment mechanics. Missing/next: Shi2018 tension propagation constrains a porous-membrane model combination; cannot adopt standalone1000 without area modulus/obstacle/viscosity context.
- **gaussian_modulus** — `membrane.kappa_gauss`. Hu2012 approximate negative ratio to bending modulus, relevant only with topology changes. Missing/next: Find specific lipid/computational model and sign convention; preserve correlated ratio assumption.
- **lipid_area** — `membrane.lipid_area_per_molecule`. Kucerka2005 POPC30C area68.3Å2 is a primary structural anchor;70Å2 is rounded generic PC scale. Missing/next: Target composition/temperature and later structural-model revisions need review; exploratory range is not reported confidence interval.
- **lipid_diffusion** — `membrane.lipid_diffusion`. Generic1um2/s tracer diffusion scale without a primary source. Missing/next: Tracer species, membrane domain, probe size and geometry matter; self-diffusion is not tension propagation.
- **lipid_label** — `membrane.lipid_label_fraction`. Observable labeling preparation with chemically identical passive labels. Missing/next: Measurement design, not composition or a latent biological mass fraction.
- **membrane_lysis** — `membrane.lysis_strain`. Evans2003 approximate3-5% lipid area strain. Missing/next: Specify lipid composition, loading rate and rupture protocol; distinguish membrane reservoir unfolding from true bilayer area strain.
- **membrane_shear** — `membrane.mu_2d`. Development-rig10pN/um defines triangular-network edge coefficient; declaration rejects interpreting it as fluid-bilayer shear. Missing/next: Identify physical cortical/spectrin carrier and coarse-graining; device stabilization is not material evidence.
  Derivation: {"expression": "K_edge=4*mu_2d/sqrt(3)", "status": "declared_network_relation", "assumptions": ["affine triangular in-plane network"]}.
- **membrane_pressure** — `membrane.pressure`. HeLa40Pa proxy explicitly called convenience, not MCF7 source. Missing/next: Matched target pressure/tension/radius and osmotic state needed.
- **spontaneous_curvature** — `membrane.spontaneous_curvature`. Zero assumes a symmetric bilayer. Missing/next: Leaflet composition and asymmetry unknown; default zero is a model condition, not observed absence.
- **surface_viscosity** — `membrane.viscosity_2d`. Generic membrane surface-viscosity scale associated with Saffman-Delbruck/Dimova. Missing/next: Separate theory from experimental viscosity fit; specify probe and membrane/cortex context.
- **membrane_volume_modulus** — `membrane.volume_modulus`. Linearized ideal van-t-Hoff modulus from osmotic concentration. Missing/next: Use consistent rounded300mM versus declared300.01552mM and temperature; not an independent observed material modulus.
  Derivation: {"expression": "K_V=c*RT; source arithmetic300*2577=773100Pa", "status": "declaration_arithmetic", "assumptions": ["fixed enclosed solute on short timescale", "ideal solution", "small volume perturbation"]}.
- **membrane_wrinkle** — `membrane.wrinkle_wavelength`. Geometry correlation length mirrors envelope example; declaration says it is not a physical microvillus/caveolar reservoir. Missing/next: Obtain surface fluctuation spectrum and reservoir morphology; copied1um does not imply shared biological length.
- **mt_dynamic_instability** — `microtubule.catastrophe_rate`, `microtubule.growth_speed`, `microtubule.rescue_rate`, `microtubule.shrink_speed`, `microtubule.tubulin_conc`. Generic in-cell growth/shrinkage/catastrophe/rescue and free-tubulin scales, with MCF7 gaps. Missing/next: Matched EB/end-tracking dataset with temperature, drug state, geometry, free pool and definitions is missing.
- **mt_count** — `microtubule.count`. 250-600 epithelial-cell proxy with absent MCF7 count. Missing/next: Count definition, centrosomal/noncentrosomal population and observation recovery need calibration; stationary count depends on lifetime and nucleation.
- **mt_dimer_rise** — `microtubule.dimer_rise`. 8nm structural repeat used as coarse end-stroke unit and speed-to-rate conversion. Missing/next: A full MT layer has13protofilaments; define whether a growth event is a dimer or layer, including mass ledger, before interpreting molecular rates.
  Derivation: {"expression": "k_on=v_growth/(delta*c_tubulin);k_off=v_shrink/delta", "status": "declaration_projection", "assumptions": ["single effective axial growth event", "zero-load operating point declared"]}.
- **mt_growth_controls** — `microtubule.dormant_fraction`, `microtubule.end_segment_band_hi`, `microtubule.end_segment_band_lo`. Pool capacity and insertion/retirement bands copied in meaning from actin. Missing/next: Native timestep/segment-resolution and reserve-duration checks; no biological likelihood.
- **mtoc_size** — `microtubule.mtoc_radius`. Approximate centrosome diameter0.5um converted to radius. Missing/next: Centrosome versus pericentriolar matrix extent, cell-cycle state and MT-origin distribution absent.
- **mt_nucleation** — `microtubule.nucleation_rate`. Unknown MTOC nucleation initial point; count is proposed to derive from lifetime. Missing/next: Need birth process and lifetime/observation model; growth-rescue trajectories and finite geometry influence steady count.
- **microvillus_geometry** — `microvillus.length`, `microvillus.radius`. Generic epithelial protrusion scales; length explicitly has MCF7 gap. Missing/next: Target microvillus identity, morphology and fixation protocol; geometry must match bundle packing and membrane reach.
- **microvillus_clearance** — `microvillus.tip_clearance`. One-fluid-cell numerical tip clearance. Missing/next: Resolution convention should not be presented as a measured membrane-core separation.
- **microvillus_bundler_placeholders** — `microvillus_bundler.k`, `microvillus_bundler.k_off0`, `microvillus_bundler.k_on`, `microvillus_bundler.length`, `microvillus_bundler.x_beta`. Explicit initial-point copying from fascin for espin/fimbrin/villin; molecular identities differ. Missing/next: Need isoform-specific mechanics, kinetics and span.8.5nm copied span is below12nm first shell;0.4nm Bell point inherits unverified filamin chain.
- **microvillus_valence** — `microvillus_bundler.sites_per_node`. Smallest chosen node valence giving connected built bundles, bounded by hex-neighbor geometry. Missing/next: Molecular occupancy, site density and resolution remain distinct from graph connectivity.
- **motor_consistency_band** — `motor.consistency_tolerance`. Cross-assay2x consistency guard for velocity/k_off versus run length, chosen as a band. Missing/next: Not an empirical uncertainty distribution; a consistent triplet may still combine wrong species or wrong kinetic states.
- **nmii_unmeasured_mechanics** — `nmii.arm_kappa`, `nmii.backbone_EA`, `nmii.backbone_kappa`. Orientation/rigid-rod/actin-like axial assumptions with no minifilament material evidence. Missing/next: Need tail-bundle compliance/orientation data and explicit resolution mapping.
- **nmii_drag_geometry** — `nmii.arm_radius`, `nmii.backbone_radius`, `nmii.head_radius`. Approximate S2/tail-bundle/head dimensions converted into drag and mass radii. Missing/next: Hydrated drag radius is not directly structural width. BillingtonFig5 IIA width11.2nm differs from nominal16nm backbone diameter.
- **nmii_object_turnover** — `nmii.assembly_rate`, `nmii.disassembly_rate`. FRAP-timescale proxy is applied to two-state birth/death of whole minifilament objects; stationary assembled fraction is ka/(ka+kd). Missing/next: FRAP protein exchange cannot by itself identify whole-object destruction and reassembly. Need assembled/free inventories plus object tracking.
  Derivation: {"expression": "f_assembled=ka/(ka+kd);N_total=N_assembled/f_assembled", "status": "declared_two_state_object_model", "assumptions": ["constant first-order rates", "two-state object interpretation", "stationarity"]}.
- **nmii_backbone_length** — `nmii.backbone_length`. BillingtonFig5 NMIIA total filament contour301nm supports numeric scale. Missing/next: Total contour is not automatically bare backbone/tail-only length (bare zone167nm); builder quantity and isoform need alignment.
- **nmii_head_offset** — `nmii.head_offset`. Explicitly archived and sourced to nothing. Missing/next: Geometric reference points and protein construct required; affects capture reach.
- **nmii_heads** — `nmii.heads_per_side`. 30heads/end is a PI point motivated by roughly30 two-headed myosin molecules per bipolar filament. Missing/next: Preserve molecule-versus-head conversion, asymmetry and isoform; AFINES10 is a different model scale.
- **nmii_isoform** — `nmii.isoform_iia_fraction`. All-IIA initial point with explicit unknown MCF7 ratio; model assigns isoform per whole object. Missing/next: Measure IIA/IIB/IIC composition and coassembly; homogeneous-object model is not inferred from bulk fractions.
- **nmii_lever_arm** — `nmii.lever_arm`. Howard2001 approximate myosin-II structural scale. Missing/next: Primary construct/isoform lever length and effective stroke geometry needed.
- **nmii_backbone_resolution** — `nmii.n_backbone`. Archived discretization count, not a molecular census. Missing/next: Justify node resolution and mass/drag convergence; do not train as measured subunit count.
- **nmii_life_switch** — `nmii.object_life`. Chooses assembled+dormant object turnover model and changes build count. Missing/next: Declared mechanism switch, not observed population fraction.
- **nmii_head_competence** — `nmii.rlc_phosphorylated_fraction`. 0.3 is explicitly a head-competence initial point, kept separate from assembled object count and assembled fraction. Missing/next: Need site-specific RLC phosphorylation/functional competence and stoichiometry data; not total minifilament assembly or load engagement.
- **osmotic_bath** — `osmotic.external`. Generic300mOsm isotonic preparation; declaration unitmM is osmolar equivalent. Missing/next: Specify experimental medium and effective osmolytes, ionic dissociation/activity and temperature.
- **finite_bath_volume** — `osmotic.external_water_volume`. Finite1nL conservation reservoir is numerical/protocol choice. Missing/next: Actual chamber water volume needed. Declared1e5xcell is inconsistent with7.5um sphere volume (about566x whole-cell volume).
- **osmotic_rest_balance** — `osmotic.internal`. Rest concentration offset derived to balance declared40Pa pressure. Missing/next: Not an independent concentration measurement; depends on temperature, medium and mechanical equilibrium.
  Derivation: {"expression": "300mM+40Pa/(2577.48Pa/mM)=300.015519mM", "status": "declaration_arithmetic", "assumptions": ["ideal osmolar pressure", "same effective solute definition inside/outside", "rest equilibrium"]}.
- **osmotic_reflection** — `osmotic.reflection_coefficient`. Unity is ideal impermeant-solute assumption. Missing/next: Different solutes and channels have different permeability; identify experimental solute/time scale.
- **water_permeation_switch** — `osmotic.water_permeation`. Mechanism selector with explicit alternative pressure/volume-correction requirements. Missing/next: Control semantics and no-double-pressure check; not observed impermeability.
- **arc_geometry** — `sf_arc.lift`, `sf_arc.pitch`. Unsourced plane height and declared pitch test point. Missing/next: Native transverse-arc location/spacing distribution missing.
- **simulation_controls** — `sim.dt`, `sim.fluid_iters`, `sim.inplane_count_floor_fraction`, `sim.inplane_flow_cg_iters`, `sim.surface_diffusion_max_crossings`. Time discretization, solver budgets, positivity floor and path-crossing budget. Missing/next: Native timestep/residual/boundary/exhaustion convergence checks; no biological distributions.
- **sf_geometry** — `stress_fiber.pitch`, `stress_fiber.spacing`. PI-gapped count/packing geometry; count derives from basal disc and pitch. Missing/next: Measure target stress-fiber distribution, packing and geometry together.
- **sf_sarcomere** — `stress_fiber.sarcomere`. Hotulainen2006 band used as a recorded, currently nonplacing value. Missing/next: Find actual repeat definition and imaging context; a recorded parameter does not establish runtime effect.
- **substrate_environment** — `substrate.stiffness`, `substrate.thickness`. Declared experimental substrate condition (5kPa,50um), not an intrinsic cell parameter. Missing/next: Gel calibration method, Poisson ratio, frequency, thickness and actual protocol need specification.
- **transport_partition** — `transport.dynein_cargo_fraction`, `transport.kinesin_cargo_fraction`. Explicit finite-pool species/functional partitions copied from another branch. Missing/next: Measure complex-specific abundance, adaptors and localization; KIF5 dimers versus KIF11 tetramers and DDB versus cortical pulling cannot be mixed into one universal motor law.

## Related inputs

- **R01 / population_state_accounting** — `nmii.areal_density`, `nmii.assembly_rate`, `nmii.disassembly_rate`, `nmii.rlc_phosphorylated_fraction`, `nmii.heads_per_side`, `nmii.isoform_iia_fraction`. Assembled-object census, free/dormant pool, competent heads and occupied crossbridges are separate observables. Two-state fraction fixes object reserve, while head competence acts on assembled heads. Assumptions: stationary two-state object model is declared, not established by FRAP; counted intensity focus need not universally resolve one minifilament; per-object isoform assignment is a model choice.
- **R02 / denominator_transfer** — `arp23.nucleation_rate`, `arp23.conc`, `cortex.arp23_fraction`, `formin.areal_density`, `cortex.contour`. Per-NPF nucleation, free-complex inventory and F-actin fluorescence contribution cannot become one free-complex rate and filament-count fraction. Assumptions: NPF binding fraction; surface versus volume normalization; nucleator-specific length distributions.
- **R03 / published_fit_comparison** — `filamin.k_off0`, `filamin.x_beta`. Ferrer jointly fits filamin dissociation and Hummer–Szabo x‡ to rupture data. Current k_off0 shares the fitted numerical point, but the current Bell length0.4nm has no established definition mapping to fitted x‡0.194nm. No current-parameter joint distribution follows. Assumptions: same Hummer-Szabo fit; loading geometry; no covariance extracted.
- **R04 / cross_fit_and_molecule_transfer** — `filamin.k_catch0`, `filamin.x_catch`, `filamin.k_off0`, `filamin.x_beta`, `fascin.x_beta`, `microvillus_bundler.x_beta`. Mixed catch/slip cards and copied Bell lengths form provenance dependencies, not verified molecular equivalence. Assumptions: different molecules; no jointly validated combined fit.
- **R05 / motor_cycle_projection** — `kinesin.velocity`, `kinesin.step`, `kinesin.k_off0`, `kinesin.run_length`, `kinesin.primed_fraction`, `dynein.velocity`, `dynein.step`, `dynein.k_off0`, `dynein.run_length`, `dynein.primed_fraction`, `motor.consistency_tolerance`. Velocity/step gives effective cycle rate; velocity/koff gives run length only with constant speed and memoryless detachment.2x guard is not uncertainty. Assumptions: matched species/ATP/load/construct; equal substate split is chosen; variable dynein steps.
- **R06 / cargo_encounter_geometry** — `cargo.radius`, `kinesin.count`, `dynein.count`, `kinesin.reach`, `dynein.reach`, `kinesin.k_on`, `dynein.k_on`, `transport.kinesin_cargo_fraction`, `transport.dynein_cargo_fraction`. Total pool, cargo copy number, motor arrangement, reach and effective attachment differ. Jiang shows arrangement affects transport at fixed copy number. Assumptions: synthetic liposome is not native census; KIF5/KIF11 and DDB/cortical species differ.
- **R07 / geometry_population_derivation** — `if.mesh`, `cell.radius`, `cell.nc_ratio`, `microtubule.count`, `microtubule.nucleation_rate`, `stress_fiber.pitch`, `footprint.clearance`, `footprint.z_basal`. Spoke/mesh, basal-disc/pitch and birth/lifetime count formulas are separate architectural models. Assumptions: native morphology; cell cycle/culture/protocol; computed count is not observed census.
- **R08 / osmotic_mechanical_closure** — `osmotic.external`, `osmotic.internal`, `membrane.pressure`, `membrane.volume_modulus`, `envelope.volume_modulus`, `osmotic.pressure_per_mM`, `cell.temperature`. Rest osmotic offset and ideal volume stiffness derive from concentrations/temperature, not independent observations. Assumptions: ideal osmolar equivalents; fixed solute at short times; nuclear permeant-ion/colloid distinction.
- **R09 / water_transport_units** — `membrane.hydraulic_conductivity`, `osmotic.internal`, `cell.temperature`, `cell.radius`, `fluid.cytosol_water_fraction`. Lp=Pf*Vw/RT; relaxation also needs geometry and osmotically responsive volume. Assumptions: Pf20um/s proxy; 310K; cryogenic inactive fraction is not cytosol water fraction.
- **R10 / effective_pore_geometry** — `envelope.pore_radius`, `envelope.pore_length`, `envelope.pore_density`, `envelope.spacing`. Diffusional equivalent dimensions and r^4 hydraulic conductance are distinct inference layers. Assumptions: FG resistance; Xenopus to MCF7 transfer; pore density/area.
- **R11 / distinct_transport_observables** — `membrane.lipid_diffusion`, `membrane.viscosity_2d`, `membrane.inplane_friction`, `membrane.area_modulus`. Tracer diffusion, viscosity and tension diffusion differ; porous membrane transport ties viscosity, obstacle permeability and modulus. Assumptions: model-specific probes; no exact standalone1000 friction support.
- **R12 / assay_and_fit_family** — `actin_chem.profilin_tip_k_off`, `actin_chem.profilin_k_on`, `actin_chem.profilin_tip_kd_atp`, `actin_chem.profilin_tip_kd_adp`, `actin_chem.profilin_tip_kd_adppi`. Funk growth fit and Courtemanche end-affinity fits differ; shared DOI or copied equality is not covariance. Assumptions: AMP-PNP surrogate; isoform/concentration differences; no covariance invented.
- **R13 / resource_capacity** — `actin_chem.severing_reserve_fraction`, `cortex.dormant_fraction`, `cytoplasm_actin.dormant_fraction`, `microtubule.dormant_fraction`, `arp23.nucleation_reserve_fraction`, `sim.dt`. Reserve fractions are capacities sized against flux and duration, not measured abundance fractions. Assumptions: actual runtime length; built inventory; exhaustion and birth-workspace support.
- **R14 / composite_nuclear_mechanics** — `envelope.mu_2d`, `envelope.kappa_bend`, `envelope.tension`, `lamina.areal_density`, `lamina.neighbours`, `material.if.E`. Whole-nucleus response, shell scaling, network shear and tension require separate carrier/geometry projections. Assumptions: Xenopus versus somatic human; E times thickness is not measured prestress; envelope/lamina residual partition unidentifiable.

## Next source work

### 1. Motor population and activation

Pair MCF7 minifilament census/object trajectories with free/assembled pool and RLC phosphosite measurement. Resolve Fritzsche SE110 metadata and use an explicit FRAP observation model.

Required: Cell cycle, count calibration, molecule/head units, phosphorylation stoichiometry and observation time.

### 2. Coherent microtubule motor and cargo assays

Separate mammalian DDB/cortical and KIF5/KIF11 constructs; extract matched motility/load/processivity and native cargo copy-number/organization.

Required: Replace kinesin citation on dynein and mixed yeast stall/mammalian velocity; register identities before eligibility.

### 3. Geometry and nucleation denominators

Resolve Li/Bieling2022 attribution, NPF-bound inventory and nucleator-specific lengths; map fluorescence mass to counts through an observation model. Source target IF/MT architecture.

Required: PerWAVE/percomplex, F-actin amount/filament count, compartment area/volume and imaging resolution.

### 4. Membrane and nuclear transport

Use target37C osmotic volume assay with geometry/aquaporin state; freezing fits are a different context. Audit tracer/obstacle/viscosity jointly and source NPC hydraulic evidence separately from solute diffusion.

Required: Pf-to-Lp units, temperature, water-volume definition, pore geometry and transport observable.

### 5. Binding mechanics and chemical fit provenance

Resolve0.4nm versus primary0.194nm and mixed catch/slip cards; source molecule-specific fascin/bundler kinetics, then finish exact-table chemistry audits/registration.

Required: Joint fit parameterization, uncertainty kind, nucleotide/isoform/label/buffer conditions; no inferred covariance.

## Reference registry

Duplicate DOI records retained. Candidate and saved DOI separate. No OK identity means ineligible even after primary reading.

| Source | DOI/identifier | Saved identities | Access scope |
| --- | --- | --- | --- |
| [Au2008](https://doi.org/10.1021/bi701769u) | 10.1021/bi701769u | unregistered; candidate/ineligible | declaration_only |
| [Bieling2016](https://doi.org/10.1016/j.cell.2015.11.057) | 10.1016/j.cell.2015.11.057 | SE7 OK; SE97 OK | metadata_only |
| [Billington2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3829186/) | 10.1074/jbc.M113.499848 | SE426 OK | primary_fig5_and_abstract |
| [Bindschadler2004](https://pmc.ncbi.nlm.nih.gov/articles/PMC1304143/) | 10.1016/S0006-3495(04)74326-X | unregistered; candidate/ineligible | primary_abstract_table_not_fully_reviewed |
| [Bovellan2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4110400/) | 10.1016/j.cub.2014.05.069 | SE430 OK; SE545 OK | primary_fulltext |
| [ChanOdde2008](https://doi.org/10.1126/science.1163595) | 10.1126/science.1163595 | SE58 OK; SE559 OK | prior_review_source_chain |
| [Chugh2017](https://doi.org/10.1038/ncb3525) | 10.1038/ncb3525 | SE276 OK | metadata_only |
| [Clark2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3736691/) | 10.1016/j.bpj.2013.05.057 | SE411 OK | prior_review_primary |
| [Courson2010](https://doi.org/10.1074/jbc.M110.123117) | 10.1074/jbc.M110.123117 | unregistered; candidate/ineligible | prior_review_numerical_anchor_not_located |
| [Courtemanche2013](https://pubmed.ncbi.nlm.nih.gov/23947767/) | 10.1021/bi400682n | unregistered; candidate/ineligible | primary_metadata_only |
| [Dahl2004](https://doi.org/10.1242/jcs.01357) | 10.1242/jcs.01357 | SE562 OK | metadata_and_declaration |
| [Dejardin2020](https://doi.org/10.1083/jcb.201908036) | 10.1083/jcb.201908036 | SE451 OK | metadata_only |
| [Ferrer2008](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf) | 10.1073/pnas.0706124105 | SE119 OK | primary_fulltext |
| [Fischer2020](https://doi.org/10.3389/fcell.2020.00393) | 10.3389/fcell.2020.00393 | SE462 OK | metadata_and_declaration |
| [Fritzsche2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3596247/) | 10.1091/mbc.E12-06-0485 | SE110 NO_DOI_FOUND (saved DOI None) | primary_fulltext |
| [Fujiwara2007](https://doi.org/10.1073/pnas.0702510104) | 10.1073/pnas.0702510104 | unregistered; candidate/ineligible | declaration_only |
| [Funk2019](https://elifesciences.org/articles/50963.pdf) | 10.7554/eLife.50963 | unregistered; candidate/ineligible | primary_appendix1_table2 |
| [Ge2015](https://doi.org/10.1038/nature15247) | 10.1038/nature15247 | unregistered; candidate/ineligible | declaration_only |
| [Gennerich2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC2851641/) | 10.1016/j.cell.2007.10.016 | unregistered; candidate/ineligible | primary_fulltext |
| [Gittes1993](https://pmc.ncbi.nlm.nih.gov/articles/PMC2200075/) | 10.1083/jcb.120.4.923 | SE117 OK; SE554 OK | prior_review_primary |
| [GuoMacKinnon2017](https://doi.org/10.7554/eLife.33660) | 10.7554/eLife.33660 | unregistered; candidate/ineligible | declaration_only |
| [Hotulainen2006](https://doi.org/10.1083/jcb.200511093) | 10.1083/jcb.200511093 | SE436 OK | metadata_only |
| [Jegou2011](https://doi.org/10.1371/journal.pbio.1001161) | 10.1371/journal.pbio.1001161 | unregistered; candidate/ineligible | declaration_only |
| [Jiang2025](https://www.sciencedirect.com/science/article/abs/pii/S0006349525002796) | 10.1016/j.bpj.2025.04.033 | unregistered; candidate/ineligible | primary_abstract_intro |
| [Keminer1999](https://www.sciencedirect.com/science/article/pii/S0006349599768839) | 10.1016/S0006-3495(99)76883-9 | unregistered; candidate/ineligible | primary_abstract |
| [Kitchen2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7757292/) | 10.1016/j.xpro.2020.100157 | unregistered; candidate/ineligible | primary_protocol |
| [Kovacs2003](https://doi.org/10.1074/jbc.M305453200) | 10.1074/jbc.M305453200 | SE425 CHECK (saved DOI https://doi.org/10.1074/jbc.m305453200); SE550 OK | metadata_and_declaration |
| [Kreplak2005](https://doi.org/10.1016/j.jmb.2005.09.092) | 10.1016/j.jmb.2005.09.092 | SE557 OK | prior_review_primary_abstract |
| [Kucerka2005](https://lipid.phys.cmu.edu/papers05/JMBUnsat-05.pdf) | 10.1007/s00232-005-7006-8 | unregistered; candidate/ineligible | primary_fulltext |
| [Li2015](https://doi.org/10.1016/j.bpj.2015.07.006) | 10.1016/j.bpj.2015.07.006 | unregistered; candidate/ineligible | declaration_only |
| [LiBieling2022](https://elifesciences.org/articles/73145) | 10.7554/eLife.73145 | unregistered; candidate/ineligible | primary_results |
| [Melli2018](https://elifesciences.org/articles/32871) | 10.7554/eLife.32871 | SE547 OK | primary_intro_and_results |
| [Mueller2017](https://doi.org/10.1016/j.cell.2017.07.051) | 10.1016/j.cell.2017.07.051 | SE94 OK | prior_review_primary_pdf |
| [Narita2011](https://pubmed.ncbi.nlm.nih.gov/21378753/) | 10.1038/emboj.2011.48 | unregistered; candidate/ineligible | primary_metadata_only |
| [Nie2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4361371/) | 10.1002/cm.21207 | SE337 OK | prior_review_primary_fulltext |
| [Popov2016](https://doi.org/10.1371/journal.pcbi.1004877) | 10.1371/journal.pcbi.1004877 | SE285 OK | metadata_and_declaration |
| [Rawicz2000](https://doi.org/10.1016/S0006-3495(00)76295-3) | 10.1016/S0006-3495(00)76295-3 | SE211 OK | prior_review_primary_pdf |
| [Schafer1996](https://doi.org/10.1083/jcb.135.1.169) | 10.1083/jcb.135.1.169 | SE487 OK | metadata_only |
| [Schnitzer2000](https://www.nature.com/articles/ncb1000_718) | 10.1038/35036345 | unregistered; candidate/ineligible | primary_abstract |
| [Selden1999](https://pubmed.ncbi.nlm.nih.gov/10052948/) | 10.1021/bi981543c | unregistered; candidate/ineligible | primary_abstract |
| [Shekhar2015](https://www.nature.com/articles/ncomms9730) | 10.1038/ncomms9730 | unregistered; candidate/ineligible | primary_metadata_only |
| [Shi2018](https://cohenweb.rc.fas.harvard.edu/Publications/Shi_Cell_CellMembraneResistFlow_2018.pdf) | 10.1016/j.cell.2018.09.054 | unregistered; candidate/ineligible | primary_fulltext |
| [Splettstoesser2011](https://doi.org/10.1002/prot.23017) | 10.1002/prot.23017 | unregistered; candidate/ineligible | declaration_only |
| [Stam2015](https://doi.org/10.1016/j.bpj.2015.03.030) | 10.1016/j.bpj.2015.03.030 | SE423 OK | metadata_and_declaration |
| [Stephens2017](https://pmc.ncbi.nlm.nih.gov/articles/PMC5541848/) | 10.1091/mbc.E16-09-0653 | SE221 OK; SE560 OK | prior_review_primary |
| [Teo2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3708713/) | 10.1115/1.4024571 | unregistered; candidate/ineligible | primary_fulltext |
| [UniProtQ92508](https://www.uniprot.org/uniprotkb/Q92508/entry) | Q92508 | unregistered; candidate/ineligible | declaration_only |
| [Xue2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4217450/) | 10.1073/pnas.1412271111 | unregistered; candidate/ineligible | primary_intro_cites_prior_assay |

## Validation and limits

- 270 unique exact names; all valued EXAMPLE and non-transition; matched atlas/facets.
- Original declarations unchanged. UIDs/DOIs/audits checked against snapshot; duplicate identities preserved.
- Expected candidate-versus-saved DOI mismatch retained: Fritzsche SE110 blank DOI/NO_DOI_FOUND; candidate DOI separate.
- No training labels, covariance, runtime edits, source promotions, mirror changes or GPU.
- Bounded review: source-text-only is not a completed numeric primary audit.
