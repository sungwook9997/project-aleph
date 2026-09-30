# Actin kinetic evidence review

Authority: `advisory_not_pi_adjudicated`. Frozen source: `24b3a44cbd33dd34cde338483be19638aec1be1c`.

This advisory inventory covers **40 exact declarations: 38 values and 2 bound aliases**. It contains16 review cards,20 references and10 explicit dependency records. P19–P21 are pinned antecedent reviews; card counts are not independent-study counts. No parameters, tags, priors or mechanisms were changed.

JSON: [actin_kinetic_evidence.json](actin_kinetic_evidence.json) · SHA-256 `4626352e394413e22ef3653162044761aa01613d5f28133cb07c2c4546265fee`.

## Main findings

- **K01 declaration_anchor_error:** Reaction3/4 affinities and fitted constants are Table2, not Table1; Table1 does support the measured loss values.
- **K02 declaration_vs_frozen_registry_drift:** Source prose says not in source_audit, while frozen KB has Schafer1996 SE487/OK. Identity OK is not tag-promotion authority.
- **K03 fit_identifiability_and_limit:** Selected ADP fit is positivity constrained; association is an upper limit and individual affinities are not independent determinations.
- **K04 protocol_mix:** Current .21 and .00202 select setup1 and setup2 respectively.
- **K05 cross_study_code_derivation:** Static code reconstructs tip on-rates from Funk off-rate and Courtemanche affinities across nucleotide states; literature does not establish one matched cycle.

Direct numerical support remains unlocated for the .17uM profilin-ADP primary table, the .01/(decorated um·s) cofilin rate and the declared bulk-Pi range. Pointed-end2/s and soluble-Pi10000/s are supported as published-model choices, not direct measurements.

## Exact declaration inventory

Raw declarations, locations, priors, binding chains and facets are preserved in every JSON row. The following table is a compact index. All current `same_fit_groups` are empty; comparison groups describe the original sources only.

| Exact parameter | Frozen value/binding | Role | Support | Cards | Issue |
|---|---|---|---|---|---|
| `actin_chem.capping_formin_k_off` | 0.00202 1/s | derived, kinetic_fit, transfer | primary_numerical_support_found | AK04 | Setup2 competing-fate release estimate, not direct departure timing. |
| `actin_chem.capping_formin_k_on` | 0.21 1/(uM.s) | kinetic_fit, transfer | primary_numerical_support_found | AK04 | Setup1 CP association to formin end; separate protocol from current release. |
| `actin_chem.capping_k_off` | 0.0004 1/s | kinetic_fit, transfer | primary_numerical_support_found | AK12 | Bulk-curve fit summaries; generic CP transfer; stale unregistered language despite SE487/OK. |
| `actin_chem.capping_k_on` | 3.5 1/(uM.s) | kinetic_fit, transfer | primary_numerical_support_found | AK12 | Bulk-curve fit summaries; generic CP transfer; stale unregistered language despite SE487/OK. |
| `actin_chem.cofilin_decorated_fraction` | 0.05 1 | decision, placeholder | no_measurement_claimed | AK15 | Declared occupancy placeholder; finite stoichiometric ceiling is not binding kinetics. |
| `actin_chem.cofilin_severing_rate` | 0.01 1/(um.s) | order_of_magnitude, transfer, unresolved | primary_numeric_support_not_located | AK15 | Per decorated-length .01 rate lacks an exact original quantitative anchor. |
| `actin_chem.end_segment_band_hi` | 2.0 1 | numerical, control | computational_declaration |  | Rest-length discretization bands; biological measurement status does not apply. |
| `actin_chem.end_segment_band_lo` | 0.5 1 | numerical, control | computational_declaration |  | Rest-length discretization bands; biological measurement status does not apply. |
| `actin_chem.g_actin_exchange` | 0.009 1/s | measurement, effective_rate, transfer | primary_support_reused_P19 | AK11 | ADP-release assay plus rapid ATP rebinding approximation. |
| `actin_chem.g_actin_pi_release` | 10000.0 1/s | published_model, assigned_fast_rate | published_model_numeric_not_measurement | AK06 | Assigned effectively immediate soluble Pi rate. |
| `actin_chem.k_hydrolysis` | 0.3 1/s | measurement, transfer | primary_abstract_numerical_support_found | AK13 | Mg-filament hydrolysis; full conditions and original uncertainty missing. |
| `actin_chem.k_off_barbed_adppi` | 0.2 1/s | measurement, transfer | primary_numerical_support_found | AK01 | Selected direct shortening rates; do not substitute intercept-derived error. |
| `actin_chem.k_off_pointed_adppi` | 0.02 1/s | measurement, transfer | primary_numerical_support_found | AK01 | Selected direct shortening rates; do not substitute intercept-derived error. |
| `actin_chem.k_on_barbed_adppi` | 3.4 1/(uM.s) | slope_fit, transfer | primary_numerical_support_found | AK01 | High-Pi TIRF elongation-concentration slope estimates. |
| `actin_chem.k_on_pointed_adppi` | 0.11 1/(uM.s) | slope_fit, transfer | primary_numerical_support_found | AK01 | High-Pi TIRF elongation-concentration slope estimates. |
| `actin_chem.k_pi_release` | 0.003 1/s | published_model, transfer, unresolved_band | model_point_found_measurement_band_unresolved | AK01, AK03, AK16 | Current .003 appears as model input; declared .002–.006 is not verified statistical uncertainty. |
| `actin_chem.k_pi_release_barbed` | 1.8 1/s | derived, kinetic_fit, transfer | primary_numerical_support_found_as_derived | AK03 | Two-route terminal Pi estimate; bare vs profilin-bearing end distinction. |
| `actin_chem.k_pi_release_pointed` | 2.0 1/s | published_model, transfer | published_model_numeric_not_measurement | AK07 | 2/s at either end is a model assignment. |
| `actin_chem.monomer_rise` | 0.0027 um | structural_conversion, published_model, unresolved_primary | declaration_lineage_only |  | 2.7nm adopted structural conversion; Splettstoesser original structural derivation not reexamined. |
| `actin_chem.profilin_adp_kd` | 0.17 uM | cited_measurement, transfer, unresolved_primary | primary_numeric_support_not_located | AK10 | Trace Xue reference14 to Kinosian; .17 primary numerical table not obtained. |
| `actin_chem.profilin_adppi_kd` | → actin_chem.profilin_kd uM | resolution_binding, published_model, equivalence_assumption | published_model_equivalence_not_measurement | AK06 | ADP-Pi=ATP affinity alias; no separate measurement or independent prior axis. |
| `actin_chem.profilin_exchange` | 1.4 1/s | measurement, effective_rate, transfer | primary_support_reused_P19 | AK11 | ADP-release assay plus rapid ATP rebinding approximation. |
| `actin_chem.profilin_k_off_barbed_adp` | 12.2 1/s | measurement, transfer | primary_numerical_support_found | AK02 | High-profilin end-shortening rates; reaction summary is Table2. |
| `actin_chem.profilin_k_off_barbed_adppi` | 8.6 1/s | measurement, transfer | primary_numerical_support_found | AK02 | High-profilin end-shortening rates; reaction summary is Table2. |
| `actin_chem.profilin_k_off_barbed_atp` | 52.4 1/s | measurement, surrogate_transfer | primary_numerical_support_for_surrogate | AK02 | AMP-PNP52.4, not the separately reported ATP30.3. |
| `actin_chem.profilin_k_on` | 40.0 1/(uM.s) | slope_fit, transfer | primary_numerical_support_found | AK08 | Soluble ATP association assay with latrunculinB; shared-nucleotide transfer. |
| `actin_chem.profilin_k_on_barbed_adp` | 0.3 1/(uM.s) | constrained_fit, upper_limit, transfer | primary_numerical_support_as_fit_limit | AK02 | Positive-affinity constrained association upper limit; not an unconstrained point measurement. |
| `actin_chem.profilin_k_on_barbed_adppi` | 4.1 1/(uM.s) | model_fit, transfer | primary_numerical_support_found_as_fit | AK02 | Eq4 fit; individual constants less constrained than ratios. |
| `actin_chem.profilin_k_on_barbed_atp` | 11.4 1/(uM.s) | model_fit, surrogate_transfer | primary_numerical_support_for_surrogate_fit | AK02 | AMP-PNP Eq4 fit; current ATP equivalence requires transfer. |
| `actin_chem.profilin_kd` | 0.1 uM | equilibrium_measurement, transfer | primary_abstract_numerical_support_found | AK09 | Amoeba profilin/amoeba MgATP-actin .1uM; species and label effects explicit. |
| `actin_chem.profilin_tip_k_off` | 495.0 1/s | model_fit, transfer | primary_support_reused_P20_extended | AK08 | 495/s fitted elongation asymptote; common off-rate across nt states is model assumption. |
| `actin_chem.profilin_tip_kd_adp` | 0.9 uM | constrained_fit, transfer | primary_numerical_support_found_as_constrained_fit | AK02 | Selected positivity-constrained tip affinity; no independently measured reaction3 rates. |
| `actin_chem.profilin_tip_kd_adppi` | 10.2 uM | model_fit, transfer | primary_numerical_support_found_as_fit | AK02 | End affinity inferred with reaction4 fit; free profilin-to-tip binding. |
| `actin_chem.profilin_tip_kd_atp` | 226.0 uM | model_fit, surrogate_transfer | primary_numerical_support_for_surrogate_fit | AK02 | AMP-PNP end affinity; combines with independently sourced terminal off-rate in static code. |
| `actin_chem.severing_reserve_fraction` | 0.5 1 | derived, computational_capacity, decision | computational_declaration |  | Storage headroom derived from declared rate×occupancy×contour×duration and selected headroom factor; not an empirical stoichiometry. |
| `actin_chem.thymosin_adp_kd` | 100.0 uM | derived_equilibrium, transfer | primary_numerical_support_found_as_derived | AK06, AK14 | 100uM is one critical-concentration-derived estimate; not an uncertainty bound. |
| `actin_chem.thymosin_adppi_kd` | → actin_chem.thymosin_kd uM | resolution_binding, published_model, equivalence_assumption | published_model_equivalence_not_measurement | AK06 | ADP-Pi=ATP affinity alias; no separate measurement or independent prior axis. |
| `actin_chem.thymosin_k_on` | 1.7 1/(uM.s) | slope_fit, transfer | primary_numerical_support_found | AK05 | Low-salt22°C MgATP-AEDANS actin assay; current nucleotide sharing unverified. |
| `actin_chem.thymosin_kd` | 2.0 uM | derived_equilibrium, transfer | primary_numerical_support_found_as_derived | AK05, AK14 | 2uM antecedent found in Carlier; Au reports different assay affinity, not replacement. |
| `actin_chem.unit_chemistry_enabled` | 0 1 | control, switch | computational_declaration |  | Frozen switch0 leaves finite-pool ordered-unit chemistry disabled in this template; static reading is not a live-run claim. |

## Source cards

All non-OK or unregistered references remain candidate/ineligible, even when the original paper contains a numerical match. SE487 and SE285 have frozen OK identity only; this does not approve a source/tag/value change.

### AK01 · primary_quantitative_assay

ADP-Pi association constants come from elongation-versus-concentration slopes; selected off-rates are direct filament shortening observations. The .003/s bulk Pi rate in Figure3 is a model input.

References: [Fujiwara2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885587/) (unregistered/ineligible). Anchor: Table1 and footnotes; Figures1–3; Materials and Methods.

- **organism and proteins:** Rabbit skeletal-muscle actin; 30% Alexa488 lysine labeling.
- **assay:** TIRF, room temperature, MgADP with saturating phosphate for ADP-Pi.
- **buffer:** 50mM KCl, 1mM MgCl2, 1mM EGTA, 10mM imidazole pH7, .2mM ADP, 100mM DTT, .5% methylcellulose and oxygen scavengers. Pi/sulfate total160mM for high-Pi comparisons; no sulfate at low Pi.
- **denominator:** Per filament end and free actin monomer concentration; not a whole-cell turnover rate.
- **Uncertainty/sample:** Table1 reports ± values without a universal n/uncertainty label in its footnotes; Figure2 defines rate error bars as 1 SD. Do not assign that definition to every table coefficient or infer covariance.
- **Transfer:** In-vitro labeled muscle actin and high phosphate are transferred to generic cell chemistry. ATP constants in Table1 are cited from earlier work, not new data here.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| barbed ADP-Pi association | 3.4 ± 0.08 | 1/(uM.s) | slope_fit |
| barbed ADP-Pi dissociation | 0.2 ± 0.1 | 1/s | direct_shortening |
| pointed ADP-Pi association | 0.11 ± 0.04 | 1/(uM.s) | slope_fit |
| pointed ADP-Pi dissociation | 0.02 ± 0.02 | 1/s | direct_shortening |
| bulk Pi release Figure3 | 0.003 | 1/s | model_input |

Assumptions: Association is a slope estimate; direct off-rate differs from intercept-derived off-rate (.2±.25/s barbed).

Missing: A matched human-cell assay; original quantitative source for the declared bulk-Pi range.

### AK02 · primary_assay_plus_constrained_fit

Declaration reaction/affinity anchors belong to Table2. Reaction4 loss rates are measured at 750uM profilin; association and tip-affinity constants are fitted. ATP-named rows use AMP-PNP. The ADP .3 association estimate is an upper limit from a positivity-constrained fit.

References: [Courtemanche2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3823579/) (unregistered/ineligible). Anchor: Table2 reactions3–4 and footnotes; Table1; Eq4; Results ADP fit; Methods.

- **organism and proteins:** Chicken skeletal-muscle actin; human profilin1 expressed in E.coli.
- **assay:** TIRF. Figure3 uses 20% Alexa-labeled actin. Assay temperature not located; preparation at room temperature is not an assay-temperature statement.
- **buffer:** 50mM KCl, 1mM MgCl2, 10mM imidazole pH7, 1mM EGTA, 50mM DTT, .5% methylcellulose plus oxygen scavengers; ATP .3mM, AMP-PNP .37mM, or ADP/hexokinase; ADP-Pi uses12.5mM phosphate.
- **denominator:** End loss in subunits/s; end association per uM profilin-actin; reaction3 Kd for free profilin binding an end.
- **Uncertainty/sample:** Table1 ± values retained without assigning a new uncertainty family. Strongly constrained Kd3/Kd4 ratio does not identify every individual constant. No joint covariance recovered.
- **Transfer:** AMP-PNP transfer and positivity-limited ADP fits must remain explicit. Combining these tip affinities with Funk495/s does not establish a matched kinetic cycle.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| reaction4 association AMP-PNP/ADP-Pi/ADP | [11.4, 4.1, 0.3] | 1/(uM.s) | model_fit |
| reaction4 loss AMP-PNP/ADP-Pi/ADP | [52.4, 8.6, 12.2] ± [4.9, 1.1, 2.8] | 1/s | direct_shortening |
| reaction3 tip Kd AMP-PNP/ADP-Pi/ADP | [226, 10.2, 0.9] | uM | model_fit |
| actual ATP loss Table1 | 30.3 ± 3.3 | 1/s | direct_shortening |

Assumptions: Fitted reaction4 Kd values4.6/2.1/36.7uM are not independent dissociation timings. Rounded table association values need not exactly reproduce ratios. Some near-zero growth points were omitted because of possible photochemical crosslinking. Published buffer repeats EGTA; duplicate printed entries are not summed.

Missing: Full fit covariance, uncertainty kind for each tabulated rate, and physiological ATP validation for AMP-PNP-derived constants.

### AK03 · primary_assay_derived_rates

Terminal Pi release1.8/s is calculated from two depolymerization routes; bulk release .0068/s is fitted from filament age profiles. These are different quantities. Profilin changes the terminal result in the same study.

References: [Jegou2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3181223/) (unregistered/ineligible). Anchor: Table1; Figure3; Results two-route depolymerization; Materials and Methods.

- **organism and proteins:** Rabbit muscle actin, mouse profilin1; human erythrocyte spectrin-actin seeds.
- **assay:** Microfluidic single-filament TIRF, room temperature; 12% Alexa-actin, label-fraction controls7–20%; CrATP or100mM Pi supports ADP-Pi comparison.
- **buffer:** 5mM Tris pH7.8, .2mM ATP, .1mM CaCl2,100mM KCl,1mM MgCl2,.2mM EGTA,10mM DTT,1mM DABCO; high-Pi experiments have a distinct pH7 formulation.
- **denominator:** Exposed terminal subunit versus bulk filament protomer.
- **Uncertainty/sample:** Reported ± are SD. Age-profile fits include20filaments; comparison shortening groups include11 ADP,13 high-Pi,21 CrATP filaments. Filament variation is not a cell-population prior.
- **Transfer:** The code also uses the barbed rate for regulated end states; the bare-end measurement alone cannot validate that reuse. CrATP is a nucleotide surrogate.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| barbed terminal Pi release | 1.8 ± 0.6 | 1/s | derived_two_route |
| bulk filament Pi release | 0.0068 ± 0.0021 | 1/s | age_profile_fit |
| terminal Pi release with saturating profilin | 6.1 ± 0.3 | 1/s | derived_two_route |

Assumptions: Random bulk hydrolysis/release model and measured shortening pathways enter inference.

### AK04 · primary_assay_plus_partition_fit

The current association .21 and release .00202 are reported, but come from different setups. Association to formin-bound ends is .21 in setup1 and .08 in setup2. Release in setup2 is inferred from resumption of growth and competing fates.

References: [Shekhar2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4660058/) (unregistered/ineligible). Anchor: Table1; Figures1–2; Methods.

- **organism and proteins:** Rabbit muscle actin; human mDia1 FH1-FH2-DAD. Exact CP/profilin isoforms not extracted from cited preparation methods.
- **assay:** Room-temperature microfluidic TIRF. Setup1 pointed-seed anchoring/10% labeled actin; setup2 anchored formin, labeled seed then unlabeled elongation segment.
- **buffer:** 50mM KCl,5mM Tris pH7.8,.2mM ATP,1mM MgCl2,.2mM EGTA,10mM DTT,1mM DABCO; typical1uM actin/4uM profilin.
- **denominator:** CP binding a formin-bearing end; release from a ternary end, not free-end uncapping.
- **Uncertainty/sample:** Table1 errors SEM. Setup1 association groups n36/27/29 filaments at200/100/50nM CP. Off inference combines total exit rate and fate fraction; no covariance matrix provided.
- **Transfer:** Do not treat the current pair as one fitted pair or interpret setup differences as a statistical interval.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| CP association BF setup1 | 0.21 ± 0.01 | 1/(uM.s) | waiting_time_slope |
| CP association BF setup2 | 0.08 ± 0.0012 | 1/(uM.s) | waiting_time_slope |
| CP release BFC setup2 | 0.00202 ± 4e-05 | 1/s | competing_fate_fit |

Assumptions: Exponential survival and competing CP/formin exit partition; resumption identifies fate indirectly.

### AK05 · primary_stopped_flow_assay

The 1.7 association rate is supported for WT Tβ4 binding MgATP-AEDANS-actin in low salt. Equilibrium and kinetic affinities are separately estimated and are not the current2uM declaration.

References: [Au2008](https://pmc.ncbi.nlm.nih.gov/articles/PMC2587058/) (unregistered/ineligible). Anchor: Table1 WT and footnotes; Figures2–3/5; Methods uncertainty statement.

- **organism and proteins:** Rabbit muscle actin labeled at Cys374 with AEDANS; WT Tβ4 from bovine spleen; recombinant human variants also studied.
- **assay:** Stopped-flow and equilibrium fluorescence at22°C.
- **buffer:** Table1:2mM Tris pH8,.2mM ATP,.5mM DTT,1mM NaN3,40uM MgCl2. This is low-salt assay buffer, not the preparation buffer.
- **denominator:** Soluble Tβ4–MgATP-actin association per free-partner concentration.
- **Uncertainty/sample:** Errors are standard errors of fits unless otherwise stated. Association data include two days/two preparations; this does not supply biological-population SD.
- **Transfer:** Current code shares association across nucleotides and combines it with affinities from other studies. This paper does not validate that transfer.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| WT association | 1.7 ± 0.1 | 1/(uM.s) | stopped_flow_slope |
| WT direct time-course dissociation | 1.4 ± 0.01 | 1/s | dissociation_timecourse |
| WT equilibrium Kd | 1.1 ± 0.2 | uM | equilibrium_fit |
| WT kinetic Kd | 0.8 ± 0.1 | uM | ratio_derived |

Assumptions: Pseudo-first-order apparent association slope; intercept off-rate was not distinguishable from zero. Use time-course off-rate for reported kinetic Kd.

### AK06 · published_model_assumptions

Table1 assigns10000/s soluble Pi release as effectively immediate. ADP-Pi affinities are equated to ATP affinities. The100uM thymosin-ADP affinity is cited to Carlier1993, not measured by this model.

References: [Bindschadler2004](https://pmc.ncbi.nlm.nih.gov/articles/PMC1304143/) (unregistered/ineligible). Anchor: Table1 and discussion of assigned rates.

- **organism and proteins:** Generic mechanistic actin-cycle model assembled from heterogeneous literature.
- **assay:** No direct assay for the assigned fast Pi rate or affinity equivalences.
- **buffer:** No single matched experimental buffer.
- **denominator:** Soluble nucleotide-state transitions and equilibrium binding constants.
- **Uncertainty/sample:** No empirical uncertainty for10000/s or the ADP-Pi=ATP equivalence.
- **Transfer:** Published model equivalence is not measured equality; current ATP affinities differ from some Table1 choices. Binding aliases do not create independent evidence.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| soluble Pi release | 10000 | 1/s | assigned_fast_model_rate |
| Tβ4 ADP Kd | 100 | uM | cited_value |
| Tβ4 ATP and ADP-Pi Kd | 0.9 | uM | cited_ATP_and_assigned_equivalence |

Assumptions: Rapid soluble Pi release; ADP-Pi binding resembles ATP.

Missing: Direct soluble Pi rate and nucleotide-specific profilin/Tβ4 measurements under matching conditions.

### AK07 · published_model_transfer

The2/s terminal Pi-release rate is used at either filament end in simulations. It is not a measured pointed-end Pi-release rate from the structural experiment.

References: [Narita2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3094112/) (unregistered/ineligible). Anchor: Figure8A simulation parameter description.

- **organism and proteins:** Structural actin study plus a kinetic end model.
- **assay:** Selected rate is a simulation input.
- **buffer:** No assay buffer can be assigned to this rate.
- **denominator:** Terminal actin subunit at either end in the model.
- **Uncertainty/sample:** No measured uncertainty for2/s recovered.
- **Transfer:** An explicit published-model transfer to the current pointed-end rate; direct pointed-end measurement remains missing.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| Pi release at either end | 2 | 1/s | model_assigned |
| bulk Pi release | 0.003 | 1/s | model_input |

Missing: Direct terminal pointed-end Pi-release assay and uncertainty.

### AK08 · primary_extension_of_existing_P20

Appendix1Table1 gives soluble association40. Stopped-flow association uses latrunculinB and25°C; the P20 terminal495 is an elongation-model fit from a different assay. Only two growth-model parameters are reliably identifiable; detailed balance cannot be checked from growth alone.

References: [Funk2019](https://elifesciences.org/articles/50963) (unregistered/ineligible). Anchor: Appendix1Tables1–2; Methods stopped-flow/TIRF; Appendix identifiability discussion.

- **organism and proteins:** Native bovine-thymus β/γ-actin or recombinant human β-actin; human profilin1 protocols.
- **assay:** Association: .5uM actin, tryptophan quenching,25°C,1.5uM latrunculinB. Growth: room-temperature TIRF using labeled UTRN/Lifeact rather than direct actin labeling.
- **buffer:** Association:20mM Hepes pH7,100mM KCl,1.5mM MgCl2,1mM EGTA,20mM β-mercaptoethanol,1mM ATP. Growth has additional imaging components.
- **denominator:** Soluble bimolecular binding versus fitted profilin-bearing-end elongation loss.
- **Uncertainty/sample:** 40 is a rounded table point without uncertainty there.495±15 is fitted; no new distribution assigned. Soluble off-rate in this study is Kd×on with propagated error, not independently timed.
- **Transfer:** 40 and495 are not a matched on/off pair. Shared-nucleotide use is not established by ATP assays. This extends P20 and is not a new independent paper.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| soluble profilin association model table | 40 | 1/(uM.s) | stopped_flow_slope |
| WT fitted terminal loss | 495 ± 15 | 1/s | growth_model_fit |

Assumptions: At saturation, growth-model asymptote maps to terminal profilin loss. Two other model parameters are weakly identified.

Pinned prior review: P20; not a new independent measurement.

### AK09 · primary_abstract_quantitative

The .1uM affinity is explicitly measured for Acanthamoeba profilins binding amoeba MgATP-actin, using three assays. Rabbit muscle affinity is weaker and fluorescent labels can change it.

References: [Vinson1998](https://pubmed.ncbi.nlm.nih.gov/9692980/) (unregistered/ineligible). Anchor: Abstract.

- **organism and proteins:** Acanthamoeba profilin and actin; rabbit muscle actin comparison.
- **assay:** Rhodamine-profilin anisotropy, intrinsic fluorescence and nucleotide exchange.
- **buffer:** Full temperature/buffer not recovered from abstract.
- **denominator:** Monomeric profilin–actin equilibrium affinity.
- **Uncertainty/sample:** No numerical SD/SEM/n in the abstract.
- **Transfer:** The declaration is not a measured human-cell value. Rabbit muscle affinity is about4fold weaker; pyrene-Cys374 muscle labeling weakens affinity about10fold.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| amoeba profilin–MgATP-actin Kd | 0.1 | uM | equilibrium_assay |

Missing: Full assay conditions and isoform-matched human measurement.

### AK10 · primary_lineage_trace_without_numeric_confirmation

P21 .17uM is a cited introductory value. Reference14 resolves to Kinosian2000; its primary abstract describes bovine non-muscle actin/cation coupling, but does not expose the .17uM result.

References: [Xue2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4217450/) (unregistered/ineligible); [Kinosian2000](https://pubmed.ncbi.nlm.nih.gov/11052670/) (unregistered/ineligible). Anchor: Xue Introduction/reference14; Kinosian primary abstract.

- **organism and proteins:** Kinosian: bovine-spleen β/γ non-muscle actin.
- **assay:** Affinity and nucleotide/cation-binding study; full numerical table not retrieved.
- **buffer:** Physiological ionic conditions described broadly; exact temperature/Mg not extracted.
- **denominator:** Profilin affinity for monomeric ADP-actin, not affinity for a filament end.
- **Uncertainty/sample:** No uncertainty assigned.
- **Transfer:** Lineage is improved, but primary numerical support for .17 remains unlocated. Do not turn a structural-paper citation into a new affinity experiment.

Missing: Kinosian table/figure identifying .17uM, cation concentration, assay temperature, uncertainty and n.

Pinned prior review: P21; not a new independent measurement.

### AK11 · pinned_previous_review_no_new_independent_evidence

P19 already found .009/s MgADP release and1.4/s profilin-assisted release. They become effective ATP exchange only with rapid ATP rebinding; exchange is not hydrolysis.

References: [Selden1999](https://pubmed.ncbi.nlm.nih.gov/10052948/) (unregistered/ineligible). Anchor: Pinned example_review P19; primary abstract.

- **organism and proteins:** Monomeric Mg-actin; complete preparation/isoforms not extracted.
- **assay:** Primary abstract and pinned P19.
- **buffer:** Full assay conditions not recovered.
- **denominator:** ADP dissociation per monomer or profilin–actin complex.
- **Uncertainty/sample:** No uncertainty family or n extracted.
- **Transfer:** Current irreversible ADP→ATP event also assumes an ATP bath and fast rebinding. No separate new measurement counted.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| MgADP release | 0.009 | 1/s | release_assay |
| profilin-assisted MgADP release | 1.4 | 1/s | release_assay |

Assumptions: Rapid ATP rebinding approximation.

Missing: Full methods and nucleotide rebinding regime.

Pinned prior review: P19; not a new independent measurement.

### AK12 · primary_bulk_kinetic_fit

3.5/uM/s summarizes three CPβ1–α-actin determinations.4e-4/s summarizes six uncapping determinations. FITSIM fits bulk seeded-polymerization curves; these are not individual CP binding/dwell observations.

References: [Schafer1996](https://pmc.ncbi.nlm.nih.gov/articles/PMC2121029/) (SE487:OK). Anchor: Printed pp170–173; Kinetic Rate Constants; Table1/footnotes (full-text OCR).

- **organism and proteins:** CPβ1 chicken skeletal muscle; β2 kidney/brain comparisons. Actin includes chicken-muscle α, bovine-erythrocyte β and chicken-brain βγ.
- **assay:** 25°C,1.5uM actin,5–10% pyrene label, spectrin-actin seeds; each fit combines4–5 curves.
- **buffer:** MKEI:100mM KCl,2mM MgCl2,1mM EGTA,20mM imidazole pH7. PIP2 uncapping assays use a different buffer.
- **denominator:** Free CP association to a barbed end and uncapping per capped end.
- **Uncertainty/sample:** Table individual uncertainties are fit-algorithm errors. No SD for the quoted cross-experiment means is supplied. Alternative Kd×on estimates cross-check the off-rate.
- **Transfer:** The generic current CP rates mix summary estimates and do not identify one isoform-matched fitted pair. Frozen KB contains SE487/OK despite the declaration saying unregistered.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| CPβ1 capping α-actin mean | 3.5 | 1/(uM.s) | bulk_kinetic_fit |
| uncapping mean | 0.0004 | 1/s | bulk_kinetic_fit |

Assumptions: Fixed actin elongation constants and fitted seed concentration from control; negligible pointed-end contribution.

### AK13 · primary_abstract_quantitative

Mechanical quenched-flow supports .3/s ATP hydrolysis for polymerized Mg-actin; polymerized Ca-actin gives .05/s. This is hydrolysis, not phosphate release.

References: [Blanchoin2002](https://pubmed.ncbi.nlm.nih.gov/11781099/) (unregistered/ineligible). Anchor: Abstract.

- **organism and proteins:** Polymerized actin with Mg or Ca; full isoform preparation not recovered in this pass.
- **assay:** Mechanical quenched-flow; similar hydrolysis for growth at either end.
- **buffer:** Complete temperature/buffer not obtained; author-lab PDF attempt returned404.
- **denominator:** ATP cleavage in a filament-bound subunit.
- **Uncertainty/sample:** No uncertainty or n from the abstract.
- **Transfer:** Divalent-cation dependence prevents a universal context-free interpretation. Do not copy uncertainty from later reviews.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| polymerized Mg-actin ATP hydrolysis | 0.3 | 1/s | quenched_flow |
| polymerized Ca-actin ATP hydrolysis | 0.05 | 1/s | quenched_flow |

Missing: Full Methods and original error estimates.

### AK14 · primary_derived_equilibrium_affinity

Critical-concentration shifts yield ATP Kd1.7uM and2uM in separate experiments, and ADP Kd85/80uM and100uM in other experiments.100 is one estimate later used by Bindschadler; these numbers are not a confidence interval.

References: [Carlier1993](https://www.researchgate.net/publication/14693667_Modulation_of_the_interaction_between_G-actin_and_thymosin_beta_4_by_the_ATPADP_ratio_possible_implication_in_the_regulation_of_actin_dynamics) (unregistered/ineligible); [Pollard2000](https://doi.org/10.1146/annurev.biophys.29.1.545) (unregistered/ineligible); [Bindschadler2004](https://pmc.ncbi.nlm.nih.gov/articles/PMC1304143/) (unregistered/ineligible). Anchor: Original author copy, pp5035–5036 Results/Figures1–2; Materials.

- **organism and proteins:** Sheep-spleen Tβ4; muscle actin preparation cited to earlier work.
- **assay:** Bulk polymerization/critical-concentration comparison; ADP experiments use sonication and pyrene reporter.
- **buffer:** ATP Figure1:5mM Tris pH7.5,.1mM Ca,.2mM EGTA,.2mM ATP,50uM Mg,100mM KCl; do not silently reuse for every ADP experiment. Assay temperature not located.
- **denominator:** 1:1 nonpolymerizable monomer complex inferred from steady-state concentration shifts.
- **Uncertainty/sample:** Separate experiment values are not SD/SEM; no covariance recovered.
- **Transfer:** Numerical antecedents are now located, but no matched-cell affinity or shared fit with Au association is established. Pyrene affects binding.

| Source quantity | Reported value | Units | Evidence |
|---|---|---|---|
| ATP Kd separate experiments | [1.7, 2] | uM | critical_concentration_derived |
| ADP Kd separate experiments | [85, 80, 100] | uM | critical_concentration_derived |

Assumptions: 1:1 sequestration; critical-concentration shift model.

Missing: Temperature and exact actin species from preparation antecedent; matched unlabeled physiological assay.

### AK15 · primary_qualitative_only_numeric_anchor_missing

Primary imaging supports severing preference at low/intermediate cofilin density, not monotone occupancy dependence. The specific .01/(um.s) and .05 decoration are not located as measured values.

References: [Andrianantoandro2006](https://pubmed.ncbi.nlm.nih.gov/17018289/) (unregistered/ineligible). Anchor: Primary abstract.

- **organism and proteins:** Fission-yeast, human and amoeba ADF/cofilins compared.
- **assay:** Evanescent-wave filament microscopy.
- **buffer:** Full rate-normalization protocol, temperature and buffer not recovered.
- **denominator:** Need to distinguish breaks per total length, decorated length, protomer or decorated/bare boundary.
- **Uncertainty/sample:** No numeric uncertainty/n for the current values.
- **Transfer:** The declaration already calls .05 an inference placeholder and .01 an order-of-magnitude value. Static code multiplies rate by decoration; this does not establish the source occupancy law.

Missing: Primary figure/data and denominator that justify .01 per decorated um per second; a measured decoration fraction under target cell conditions.

### AK16 · lineage_with_unresolved_declared_band

Carlier directly establishes a minutes-lived ADP-Pi intermediate, but the exact .003 and .002–.006 range were not located in the primary abstract. Fujiwara uses .003 as a model input; Jegou independently derives .0068 with a different assay/model.

References: [Carlier1986](https://pubmed.ncbi.nlm.nih.gov/3801442/) (unregistered/ineligible); [Fujiwara2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885587/) (unregistered/ineligible); [Jegou2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3181223/) (unregistered/ineligible). Anchor: Carlier primary abstract; Fujiwara Figure3 model; Jegou Table1.

- **organism and proteins:** Different purified-actin preparations across studies.
- **assay:** Carlier double-labeled ATP/filter separation; later fluorescence kinetics differ.
- **buffer:** No shared condition across these claims established.
- **denominator:** Bulk filament-protomer Pi loss; distinct from exposed-end loss.
- **Uncertainty/sample:** No uncertainty conversion or alternative band is proposed.
- **Transfer:** The declared exploration band is not validated as a measurement SD, SEM or interval. The existing prior is preserved.

Missing: Carlier full quantitative table/figure and temperature/buffer; reason for selected band endpoints.

## Dependency records

These retain source conditional estimates and formula inputs. Static current-code records are labeled separately. They are not a covariance model, training targets or permission to change the model.

| ID | Scope | Dependency | Qualification |
|---|---|---|---|
| AKR01 | original_source | Measured reaction4 loss + elongation-versus-profilin curves → Eq4 affinity fit; association4 = loss4 / Kd4. | Independent fits for nucleotide conditions; AMP-PNP surrogate. ADP fit selected for positive affinities; association upper limit. Individual affinity constants are less identifiable than their ratio. No current input covariance inferred. |
| AKR02 | original_source | k_observed = k_off_CP + k_off_formin; fraction_BF = k_off_CP / k_observed. | Exponential exit and fate identification; CP departure is inferred. Current association .21 comes from setup1, so no matched current on/off fit is asserted. |
| AKR03 | original_source | K_d_kinetic = k_off_timecourse / k_on; equilibrium Kd is fitted separately. | Apparent one-step binding interpretation; timecourse off chosen because intercept off not resolved. Current2uM Kd comes from a different source comparison, not this ratio. |
| AKR04 | original_source | Critical-concentration shifts + 1:1 nonpolymerizable Tβ4–actin sequestration model → equilibrium Kd estimates. | Experiments/protocols differ; listed values are not one uncertainty distribution. No joint fit or covariance with Au association constants. |
| AKR05 | original_source | In the high-profilin-affinity limit, maximal growth velocity = k_minus2; growth curve identifies maximal velocity and Michaelis constant. | Same paper/evidence lineage as pinned P20. Other reaction constants cannot all be recovered; detailed balance cannot be established by growth curves alone. |
| AKR06 | source_model_and_current_alias_comparison | ADP-Pi affinity := ATP affinity for each binder. | Published model equivalence, not experimental equality. No independent parameter or independent evidence count. |
| AKR07 | static_current_code | For each nucleotide and binder: soluble k_off = shared k_on × nucleotide-specific Kd. | Rates and affinities originate in different experiments/species/conditions. Static construction is not evidence of matched detailed balance or actual runtime usage. |
| AKR08 | static_current_code | Tip profilin k_on(nt) = shared profilin_tip_k_off / profilin_tip_kd(nt). | Different assays, species preparations and nucleotide conditions; source cycle compatibility unverified. No replacement values, detailed-balance enforcement or current same-fit assertion. |
| AKR09 | static_current_code_vs_source_quantity | Current per-length cut coefficient = declared severing rate × declared decorated fraction; storage reserve follows declared cut-rate×contour×duration plus selected headroom. | Current occupancy law is not derived from source decorated/bare-boundary data. Raw source explicitly calls this a placeholder. Storage capacity is not a measured biochemical parameter. |
| AKR10 | source_assay_to_current_effective_rate | ADP dissociation rate → effective ADP-to-ATP exchange only when ATP rebinding is rapid. | Pinned P19 reused; not new independent evidence. Release is not hydrolysis and does not by itself measure complete exchange under every nucleotide bath. |

## Frozen static-code comparison

This is a source read, not a runtime test. The template switch `actin_chem.unit_chemistry_enabled=0` gates the finite-pool ordered-unit branch. The review does not claim these dormant tables were consumed by a run.

- **C01:** [aleph/cell/unit_chemistry.py:73]([local path omitted] lines73–101. _pool_reactions: soluble kon shared across ATP/ADP-Pi/ADP; koff=kon×Kd; soluble Pi rate shared across free/P/T complexes; release-based effective ADP→ATP exchange. SHA-256 `8737ccf27a039b4621c2cd9757c76a7af48b057480486eb27072b96be1a2f70f`.
- **C02:** [aleph/cell/unit_chemistry.py:104]([local path omitted] lines104–195. _tables: bulk/end nucleotide aging; tip association reconstructed as profilin_tip_k_off/Kd_nt; regulated ends use barbed Pi rate; separate CP/free/formin end states. SHA-256 `8737ccf27a039b4621c2cd9757c76a7af48b057480486eb27072b96be1a2f70f`.
- **C03:** [aleph/cell/assemble.py:872]([local path omitted] lines872–992. Base growth reads free monomer concentration and monomer rise; finite ordered-unit preparation is gated by unit_chemistry_enabled at977; frozen value0. SHA-256 `da13bf88decb033fdeec51a533dcc87f8926c882d4f320446e117e9bf9ea13bd`.
- **C04:** [aleph/cell/severing.py:108]([local path omitted] lines108–159. family_coefficients combines severing rate×decoration; finite cofilin ceiling and storage reserve are not measured binding kinetics. SHA-256 `8d6d9c55f78424d5d65fc304e01ed5fbabff09a6adb5cf0d4f67b534d6eb0da3`.
- **C05:** [aleph/cell/growth_preparation.py:14]([local path omitted] lines14–103. Monomer-rise length conversion and buffer/discretization preparation; no biochemical equilibrium inference. SHA-256 `65a85ec06a84485647db42af8d7dd0f0a2a6c2b1228e40282335c6734a8655d6`.

## Reference registry

| Key | DOI | Frozen UID:audit | Access |
|---|---|---|---|
| [Fujiwara2007](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885587/) | 10.1073/pnas.0702510104 | candidate/ineligible; no OK identity | primary_fulltext |
| [Courtemanche2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3823579/) | 10.1021/bi400682n | candidate/ineligible; no OK identity | primary_fulltext |
| [Jegou2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3181223/) | 10.1371/journal.pbio.1001161 | candidate/ineligible; no OK identity | primary_fulltext |
| [Shekhar2015](https://pmc.ncbi.nlm.nih.gov/articles/PMC4660058/) | 10.1038/ncomms9730 | candidate/ineligible; no OK identity | primary_fulltext |
| [Au2008](https://pmc.ncbi.nlm.nih.gov/articles/PMC2587058/) | 10.1021/bi701769u | candidate/ineligible; no OK identity | primary_fulltext |
| [Bindschadler2004](https://pmc.ncbi.nlm.nih.gov/articles/PMC1304143/) | 10.1016/S0006-3495(04)74326-X | candidate/ineligible; no OK identity | published_model_fulltext |
| [Narita2011](https://pmc.ncbi.nlm.nih.gov/articles/PMC3094112/) | 10.1038/emboj.2011.48 | candidate/ineligible; no OK identity | published_model_with_structural_experiment |
| [Funk2019](https://elifesciences.org/articles/50963) | 10.7554/eLife.50963 | candidate/ineligible; no OK identity | primary_fulltext_existing_review_extension |
| [Vinson1998](https://pubmed.ncbi.nlm.nih.gov/9692980/) | 10.1021/bi980093l | candidate/ineligible; no OK identity | primary_abstract_only |
| [Xue2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4217450/) | 10.1073/pnas.1412271111 | candidate/ineligible; no OK identity | primary_structural_paper_citing_affinity |
| [Kinosian2000](https://pubmed.ncbi.nlm.nih.gov/11052670/) | 10.1021/bi001520+ | candidate/ineligible; no OK identity | primary_abstract_only |
| [Selden1999](https://pubmed.ncbi.nlm.nih.gov/10052948/) | 10.1021/bi981543c | candidate/ineligible; no OK identity | pinned_P19_primary_abstract |
| [Schafer1996](https://pmc.ncbi.nlm.nih.gov/articles/PMC2121029/) | 10.1083/jcb.135.1.169 | SE487:OK | primary_fulltext_OCR |
| [Blanchoin2002](https://pubmed.ncbi.nlm.nih.gov/11781099/) | 10.1021/bi011214b | candidate/ineligible; no OK identity | primary_abstract_only |
| [Carlier1993](https://www.researchgate.net/publication/14693667_Modulation_of_the_interaction_between_G-actin_and_thymosin_beta_4_by_the_ATPADP_ratio_possible_implication_in_the_regulation_of_actin_dynamics) | 10.1073/pnas.90.11.5034 | candidate/ineligible; no OK identity | author_uploaded_original_primary_article |
| [Andrianantoandro2006](https://pubmed.ncbi.nlm.nih.gov/17018289/) | 10.1016/j.molcel.2006.08.006 | candidate/ineligible; no OK identity | primary_abstract_only |
| [Carlier1986](https://pubmed.ncbi.nlm.nih.gov/3801442/) | 10.1021/bi00372a001 | candidate/ineligible; no OK identity | primary_abstract_only |
| [Popov2016](https://doi.org/10.1371/journal.pcbi.1004877) | 10.1371/journal.pcbi.1004877 | SE285:OK | declaration_lineage_not_new_primary_verification |
| [Splettstoesser2011](https://doi.org/10.1002/prot.23017) | 10.1002/prot.23017 | candidate/ineligible; no OK identity | declaration_lineage_unexamined |
| [Pollard2000](https://doi.org/10.1146/annurev.biophys.29.1.545) | 10.1146/annurev.biophys.29.1.545 | candidate/ineligible; no OK identity | review_lineage_not_independent_measurement |

The JSON keeps every matching frozen DOI UID and its complete source/audit snapshot. Raw full texts remain in ignored local-only caches; cache hashes and retrieval paths are recorded without packaging the articles.

## Review proposals and validation

1. Kinosian2000 original numeric affinity table, buffer/Mg/temperature and uncertainty; .17 remains secondary numeric citation.
2. Original severing curve and total/decorated/boundary normalization; target-condition occupancy measurement.
3. Original bulk Pi numeric anchor and band rationale; a direct pointed-terminal release measurement.
4. PI review of nucleotide/assay compatibility for reconstructed tip on-rates. No automatic detailed-balance adjustment.
5. Matched isoforms, nucleotide states, Mg/salt, temperature and labeling/drug conditions; separate assay estimates are not joint equilibrium data.

All 16 metadata checks passed: exact40-name scope,38/2 value/alias split, raw declaration/prior/facet identity, card/reference consistency, exact UID/audit snapshots and duplicate preservation, ineligible candidates, empty current-fit membership, no numeric changes/training labels, frozen-code hashes, pinned P19–P21, cache hashes and relation cross-references. No GPU/runtime/physics/native-run verification was performed.

Input hashes:

- `atlas.json`: `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a`
- `declaration_facets.json`: `db0024384de846b9dc68bee6ca53d63084d4acbad0880c2786ba7808974ac43e`
- `kb_snapshot.json`: `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b`
- `example_review.json`: `96cc07083e3a1f0b0ff900fd63eef2c57dc95e93a0f2e94096b0331cd6783437`
- `actin_kinetic_retrieval.json`: `dc40d80c70c0bf256bb01895e5a3df0c012a8d50c629cbd329aec6399899dce5`

Limitations:

- Every conclusion is advisory; no tags, values, priors, mechanism, thresholds or source registry changed.
- Only a bounded primary-source pass. No matched live-cell kinetic set or covariance is inferred; source errors do not become priors.
- Candidates lacking frozen OK identity remain ineligible even when a primary numerical value was found. Identity OK alone is not quantitative claim or transfer validation.
- Card count is an organizational count, not independent experiments. AK08 extends P20, AK10 traces P21, AK11 reuses P19; no double counting.
- Concentration inputs were handled separately. This packet does not reinterpret concentration denominators or create a joint equilibrium from separate studies.
- Static code comparison is conditional on the recorded source and template. Switch0 is a template fact, not verification of runtime configuration.
- Raw full articles remain in ignored local-only caches. Distributed packet contains compact factual paraphrases and metadata; no redistributed full text.

Independent comparison note for AK04: Figure 2c and Results also report nearly overlapping BFC-to-BF regrowth curves across the two setups, allowing CP exit to be inferred in both. The setup distinction alone is not evidence of contradictory release kinetics.
