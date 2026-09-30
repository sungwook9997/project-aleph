# Crossbridge evidence review

Authority: advisory_not_pi_adjudicated. No input, prior, tag, mechanism or training change.

Frozen source: `24b3a44cbd33dd34cde338483be19638aec1be1c`. Atlas input digest: `4476354e6426cd9a9100d2654bc4648370fb93bc0302f49863595cd001d2304e`.

All 19 top-level inputs are retained with exact raw snapshots in JSON. Nine cards cover six papers; four cards from Kovács 2003 are one study, and model compilations are not independent measurements.

## Findings requiring PI review

- Detached NMIIA ADP release was measured, so its declaration’s absence rationale and 100/s example are not supported.
- ATP apparent coefficients differ by actin state and fluorescence reporter. An apparent slope is not automatically a microscopic encounter rate.
- Hydrolysis forward/reverse rates were derived from a measured relaxation sum and burst equilibrium. The current forward-only 20/s does not have the same observable.
- The exact 5.5nm is a Stam model-table value; Veigel’s smooth-muscle assay resolves approximately4+2nm. Intended Clausen intermediary and0.6nm prestroke Bell source remain open.
- x_adp is conditional on a project force/temperature choice. The source’s internal strain was not an independently clamped2pN. Existing prior spreads stay unchanged.
- Static mode1 walk advances by chain topology; the declared stroke×rate product does not establish actual runtime molecular displacement.

## Complete input inventory

|Exact name|Tag / value / unit|Reviewer role|Cards|Finding|
|---|---|---|---|---|
|crossbridge.cycle_states|EXAMPLE / 3 / 1|decision, model_selector|CB07|Discrete projection/extension choice; not a measured quantity. Default 3 omits explicit ATP/hydrolysis/free-head parameters. Extended selector guards are static facts, not confirmation any branch ran.|
|crossbridge.f_stall|SWEPT / 2.0 / pN|PI_sweep, model_force_scale|CB06, CB07|PI sweep [0.5,2] pN supplies an exponential force scale. No matching NMIIA single-head zero-speed stall measurement established here.|
|crossbridge.k|SWEPT / 700.0 / pN/um|published_model, transfer, PI_sweep|CB06, CB07|700 pN/um converts exactly to the 0.7 pN/nm used by Veigel smooth-muscle analysis and Stam Table1. Bounds mix an old test point and another linker; they are not this source’s uncertainty.|
|crossbridge.k_adp_release|SOURCED / 2.7 / 1/s|assay_measurement_fit, transfer|CB02, CB05, CB07, CB09|2.7/s is source-supported NMIIA S1 actin-bound ADP release (rounded 2.68); HMM2.9 and intercept1.72 are different constructs/estimators. Prior spread0.34 still cites old NMIIB~0.35 and stays unchanged.|
|crossbridge.k_adp_release_free|EXAMPLE / 100.0 / 1/s|decision_or_placeholder, unresolved|CB02, CB05|Detached NMIIA ADP release is separately measured (~1/s S1 and3.6/s HMM). The raw claim of no measurement and much faster100/s is contradicted; no numeric replacement proposed.|
|crossbridge.k_atp_apparent|EXAMPLE / 0.5 / 1/(uM.s)|model_constraint, unresolved|CB01, CB06|Current0.5 is an encounter-model low-concentration mean-first-passage slope. NMIIA acto native-ATP slope0.21±0.04 is an apparent fluorescence estimate; source/target observable mapping remains unresolved.|
|crossbridge.k_atp_bind|EXAMPLE / 1.0 / 1/(uM.s)|transfer, unresolved|CB01|Near1 µM−1s−1 belongs to free mantATP apparent binding; source actin-bound native ATP/pyrene slope is0.21±0.04. None is automatically current microscopic encounter kon.|
|crossbridge.k_atp_bind_free|EXAMPLE / 1.0 / 1/(uM.s)|transfer, unresolved|CB01|Separate detached slopes exist (1.03 mant;0.56 native), contradicting absence rationale. Current1.0 is a rounded match to mant apparent slope only; it is not established as a native microscopic association constant.|
|crossbridge.k_atp_isomerize|EXAMPLE / 1000.0 / 1/s|decision_or_placeholder, unresolved|CB01|Current1000/s ceiling has no located primary support. NMIIA Fig2B example gives~190/s; this is an observed relaxation maximum under assay conditions, not an automatic replacement.|
|crossbridge.k_hydrolysis|EXAMPLE / 20.0 / 1/s|source_conditional_derivation, transfer, unresolved|CB03|Current20/s forward edge resembles a measured reversible relaxation sum. Source directional forward rate is derived7±2/s; prior10–100 has no located measurement-interval anchor.|
|crossbridge.k_off0|SWEPT / 0.35 / 1/s|PI_sweep, decision_or_placeholder|CB07, CB09|Historical0.35/s is NMIIB ADP release, as raw declaration now acknowledges. Neither that value nor current0.1–2 sweep is a measured prestroke slip rate.|
|crossbridge.k_on|SWEPT / 0.3 / 1/s|PI_sweep, published_model, model_projection|CB04, CB07|Stam0.2/s is a two-state model coefficient; current0.3/s is a PI-selected three-state attempt hazard coupled to reach/access. No native per-head calibration or matched uncertainty found.|
|crossbridge.k_pi_release|EXAMPLE / 50.0 / 1/s|decision_or_placeholder, unresolved|CB04|Current50/s remains a PI gap. Kovacs2003 did not resolve maximal acto-Pi release from unsaturated actin dependence. FreePi0.016/s is a different biochemical state.|
|crossbridge.k_stroke|SWEPT / 22.0 / 1/s|PI_sweep, derived_model_rationale|CB06, CB07|22/s is declared from0.12um/s divided by5.5nm, with unresolved KB-PIV-4. It is not independently observed NMIIA stroke kinetics; kernel walk magnitude is a separate quantity.|
|crossbridge.reach|EXAMPLE / 0.05 / um|decision, geometry_convention|static only|50nm capture scale and stated32nm mean node spacing are build/geometry rationales. No molecular capture assay establishes this radius or probability of partner access.|
|crossbridge.stroke|SOURCED / 0.0055 / um|published_model, transfer|CB06, CB07, CB08|5.5nm is located in StamTable1; Veigel reports approximate4+2nm smooth-muscle phases. Clausen intermediary unresolved. Frozen mode1 uses magnitude as marker, not molecular displacement.|
|crossbridge.stroke_sign|EXAMPLE / 1.0 / 1|decision, coordinate_convention|static only|+1 chooses ascending chain topology. Biological polarity alignment requires the builder’s meaning layer; it is not supplied by these molecular assays.|
|crossbridge.x_adp|SOURCED / 0.0034 / um|derived, transfer, model_assumption|CB05|3.4nm is rounded project conditional derivation using2pN and310K, not a directly fitted NMIIA Bell length. Branch spread0.15 is model discrepancy; no literature SD/covariance inferred.|
|crossbridge.x_beta|SOURCED / 0.0006 / um|transfer, mechanistic_model_choice, unresolved|CB06, CB07|Veigel main article supports resisting-load slowing with1.3/2.7nm fits; exact0.6nm prestroke slip support remains unlocated. Frozen SE427 audit isOK even though raw source preserves older CHECK text.|

## Source cards and identity registry

### CB01 · Kovács 2003: ATP slopes depend on actin and reporter

[10.1074/jbc.M305453200](https://mk-lab.org/wp-content/uploads/2019/05/J.-Biol.-Chem.-2003-Kov%C3%A1cs-38132-40.pdf) · SE550 OK, SE425 CHECK
Anchor: Table I p.38134; ATP Binding; Fig.2B and Fig.3A–B.

Detached slopes: mantATP 1.03±0.14, native ATP/tryptophan 0.56±0.01. Actin-bound slopes: mantATP 0.14±0.003, native ATP/pyrene-actin 0.21±0.04. Fig.2B example saturates near 190/s (half-saturation 900 µM).

Context: {"protein": "Human NMIIA S1, C-terminal FLAG; baculovirus expression with bovine essential MLC17B and chicken regulatory MLC20; rabbit skeletal actin. S1 unphosphorylated.", "temperature_C": 25, "stopped_flow_default": "25 mM MOPS pH 7, 5 mM MgCl2, 100 mM KCl, 0.1 mM EGTA.", "concentration_convention": "Rapid-mixing kinetic concentrations normally after mixing; affinity amplitudes sometimes pre-mix. Do not collapse panel-specific buffer and concentration conventions."}

Quantity: Apparent composite K1 k2 or K1′ k2′, µM−1 s−1; hyperbolic fluorescence relaxation ceiling, s−1.
Uncertainty: Table I mean±SE, three experimental rounds; not cells, not a physiological interval.

Limit: The near-1 coefficient belongs to detached mantATP. Neither it nor the apparent actin-bound slope identifies a microscopic encounter on-rate. Current 0.5 and 1000 are not located as NMIIA rigor slope/ceiling. The 190/s is an example fitted maximum, without a quoted pooled uncertainty.

### CB02 · Kovács 2003: detached ADP release was measured

[10.1074/jbc.M305453200](https://mk-lab.org/wp-content/uploads/2019/05/J.-Biol.-Chem.-2003-Kov%C3%A1cs-38132-40.pdf) · SE550 OK, SE425 CHECK
Anchor: Table I p.38134; ADP Binding and Dissociation; Fig.5.

Detached: 0.54±0.23 from concentration-intercept and 1.12±0.13 from ATP chase. Actin-bound: 1.72±0.38 and 2.68±0.30 by those methods. The source declaration that detached release was unmeasured and much faster conflicts with this paper.

Context: {"protein": "Human NMIIA S1, C-terminal FLAG; baculovirus expression with bovine essential MLC17B and chicken regulatory MLC20; rabbit skeletal actin. S1 unphosphorylated.", "temperature_C": 25, "stopped_flow_default": "25 mM MOPS pH 7, 5 mM MgCl2, 100 mM KCl, 0.1 mM EGTA.", "concentration_convention": "Rapid-mixing kinetic concentrations normally after mixing; affinity amplitudes sometimes pre-mix. Do not collapse panel-specific buffer and concentration conventions."}

Quantity: S1 mantADP off-rate, with or without actin, s−1.
Uncertainty: Mean±SE across three rounds. Intercept and chase estimates are different estimators within one study.

Limit: The current detached 100/s is not supported. Assay estimates are neither alternative cell populations nor a new prior band. Mant nucleotide and native nucleotide controls must remain distinct. Native ADP/pyrene-actin affinity agreement is not a second independent free off-rate.

### CB03 · Kovács 2003: hydrolysis relaxation versus directional rates

[10.1074/jbc.M305453200](https://mk-lab.org/wp-content/uploads/2019/05/J.-Biol.-Chem.-2003-Kov%C3%A1cs-38132-40.pdf) · SE550 OK, SE425 CHECK
Anchor: Table I p.38134; ATP Hydrolysis pp.38134–38135; Fig.3C–D caption p.38136.

Observed sums: 14.1±0.5 (tryptophan) and 18.1±2.0 (quench). Burst equilibrium K3=0.61±0.07 yields forward 7±2 and reverse 11±3 using k3=K3*(k3+k−3)/(1+K3).

Context: {"protein": "Human NMIIA S1, C-terminal FLAG; baculovirus expression with bovine essential MLC17B and chicken regulatory MLC20; rabbit skeletal actin. S1 unphosphorylated.", "temperature_C": 25, "stopped_flow_default": "25 mM MOPS pH 7, 5 mM MgCl2, 100 mM KCl, 0.1 mM EGTA.", "concentration_convention": "Rapid-mixing kinetic concentrations normally after mixing; affinity amplitudes sometimes pre-mix. Do not collapse panel-specific buffer and concentration conventions.", "hydrolysis_buffer_note": "Methods gives 25 mM MOPS, 5 mM MgCl2, 0.1 mM EGTA; Fig.3C–D caption specifies 10 mM MOPS, 2 mM MgCl2, no KCl. Preserve section-specific conditions."}

Quantity: Observed reversible relaxation k3+k−3 and conditional directional k3,k−3, s−1.
Uncertainty: Table I means±SE; derived directional errors reported by paper, covariance not supplied here.

Limit: Current forward-only 20/s cannot be justified merely by matching the observed sum. Figure example burst near 20/s is not a measured forward constant. The declared 10–100/s band is not identified as a paper uncertainty interval.

### CB04 · Kovács 2003: phosphate release and actin-binding bottleneck

[10.1074/jbc.M305453200](https://mk-lab.org/wp-content/uploads/2019/05/J.-Biol.-Chem.-2003-Kov%C3%A1cs-38132-40.pdf) · SE550 OK, SE425 CHECK
Anchor: Table I p.38134; Phosphate Release; Fig.4; Discussion and kinetic simulation.

Free Pi release is 0.016±0.001/s. Actin-activated observations fail to saturate up to 60 µM actin; maximal acto-Pi-release could not be measured directly. The apparent M.ADP.Pi actin association slope is 0.0013±0.0001 µM−1s−1.

Context: {"protein": "Human NMIIA S1, C-terminal FLAG; baculovirus expression with bovine essential MLC17B and chicken regulatory MLC20; rabbit skeletal actin. S1 unphosphorylated.", "temperature_C": 25, "stopped_flow_default": "25 mM MOPS pH 7, 5 mM MgCl2, 100 mM KCl, 0.1 mM EGTA.", "concentration_convention": "Rapid-mixing kinetic concentrations normally after mixing; affinity amplitudes sometimes pre-mix. Do not collapse panel-specific buffer and concentration conventions.", "Pi_buffer": "10 mM MOPS pH 7, 2 mM MgCl2, 0.15 mM EGTA; MDCC-labelled phosphate-binding protein."}

Quantity: Free phosphate off-rate versus actin-concentration-dependent observed turnover.
Uncertainty: Table I mean±SE; absence of saturation is an identifiability limit, not a confidence band.

Limit: No 50/s source value found. The second-order actin slope is not a 0.3/s per-slot attempt. Source duty fractions are kinetic-model outcomes and depend on ADP/actin assumptions; they do not validate current three-state duty.

### CB05 · Kovács 2007: internal strain and reused single-head kinetics

[10.1073/pnas.0701181104](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/) · SE424 OK
Anchor: Table 1 p.9996 and footnotes; Fig.1–3; Table 2 p.9997; Methods p.9998.

NM2A HMM: unloaded 2.9±1.0, assisting 11±4, resisting 0.59±0.09/s. Imported S1 2.7±0.3/s is not an independent 2007 replication. Table 2 infers load/displacement using smooth-muscle stiffness 0.45 pN/nm and Bell distance 2.7 nm.

Context: {"protein": "Human NM2A/NM2B HMM, thiophosphorylated, doubly bound to one actin filament; separate single-headed values imported from 2003 papers.", "temperature_C": 25, "buffer": "10 mM MOPS pH 7, 2 mM MgCl2, 0.15 mM EGTA, 100 mM KCl.", "protocol": "dmADP fluorescence and ATP/ADP chase; native ADP plus pyrene-actin comparison. HMM concentration is myosin heads; kinetic figure concentrations are premix.", "load": "Internal two-head strain, not a force clamp at a separately measured 2 pN."}

Quantity: Actin-bound ADP release under assisting/resisting internal strain.
Uncertainty: Table 1 mean±SEM; n=3–9 experiments, exact n per entry unspecified. Single-headed values are cited prior work.

Limit: Authors state NM2 mechanical parameters remained undetermined. Current x_adp uses an added 2 pN assumption and 310 K; source kinetics were 25°C. HMM free ADP release is 3.6±0.4/s, also not 100/s. Fold factors from one internally coupled assay do not provide independent uncertainties or covariance. Using a load inferred from an assumed Bell distance to validate that same distance would be circular.

### CB06 · Veigel 2003: smooth-muscle two-phase mechanics

[10.1038/ncb1060](https://www.nature.com/articles/ncb1060.pdf) · SE427 OK
Anchor: Fig.1d p.981; Fig.3 and caption p.983; Fig.4 p.984; Methods pp.985–986.

Working stroke has approximately 4+2 nm phases. Analysis uses crossbridge stiffness 0.7 pN/nm (data not shown). Fitted load distances are 1.3 nm for inverse overall lifetime and 2.7 nm for first-phase rate; resisting load slows the first phase.

Context: {"protein": "Chicken gizzard smooth-muscle S1; unphosphorylated regulatory light chain; rhodamine-phalloidin F-actin.", "temperature_C": 23, "buffer": "25 mM KCl, 25 mM imidazole pH7.4, 4 mM MgCl2, 1 mM EGTA; 10–100 µM ATP, regeneration and scavenger supplements.", "protocol": "Optical tweezers, dynamically imposed load after attachment detection; events shorter than 20 ms excluded."}

Quantity: Single-molecule displacement phases, effective series elasticity and attached-lifetime fit.
Uncertainty: Table 1 gives theoretical lifetime SEM and fit-rate SEM/correlation; these do not supply SEM for every distance/stiffness. No numeric uncertainty for 0.7 stiffness located.

Limit: The exact 0.6 nm prestroke slip length was not located in accessed main article. Exact 5.5 nm appears in Stam’s later model, not established here as an NMIIA measurement. Optical load, smooth-muscle construct, event censoring and low ATP differ from target. No supplement-based absence claim is made. Discussion p.984 says the initial rapid, possibly Pi-associated transition is too fast for this setup; chemical-state assignment is interpretive.

### CB07 · Stam 2015: two-state model tables

[10.1016/j.bpj.2015.03.030](https://pmc.ncbi.nlm.nih.gov/articles/PMC4407263/) · SE423 OK
Anchor: Methods; Table 1, Table 2 and Eq.1.

Table 1 assigns step 5.5 nm and stiffness 0.7 pN/nm citing Veigel. Table 2 assigns kon=0.2/s for both NMII isoforms and koff=1.71/s (IIA) or 0.35/s (IIB). A separate catch/slip mixture uses 2.5/0.4 nm and weights 0.92/0.08.

Context: {"system": "Published two-state myosin-filament model pooling several isoforms and primary papers.", "assumptions": "Weak/strong transition represented by constant binding hazard; fast ATP-binding/hydrolysis states lumped; abundant ATP makes ADP release rate limiting."}

Quantity: Published model coefficients, not a new set of primary measured constants.
Uncertainty: No model-table confidence intervals. Current sweep bounds are not paper measurement intervals.

Limit: These assignments are source-model choices and transfers, not independent observations. Smooth-muscle Table 2 detachment 22/s is not evidence for current NMIIA stroke 22/s. Eq.1 is not the current per-edge single-exponential law.

### CB08 · Clausen 2017: unresolved intermediary citation

[10.1088/1361-6463/aa52a1](https://doi.org/10.1088/1361-6463/aa52a1) · unregistered candidate; ineligible
Anchor: Repository PDF title/DOI and complete main text checked.

The available Clausen 2017 paper concerns cortex microscopy. A myosin parameter Table 1, Veigel citation and exact 5.5 nm anchor were not located in it.

Context: {"paper_identity": "Dissecting the actin cortex density and membrane-cortex distance in living cells by super-resolution microscopy, J. Phys. D 50 064002.", "provenance": "Existing repository PDF; DOI extracted from that PDF, not a guessed replacement bibliography."}

Quantity: Bibliographic claim closure.
Uncertainty: No motor uncertainty evidence.

Limit: This only excludes the available same-author/year repository paper as the located motor-table anchor. The intended Clausen reference remains unresolved. Frozen KB has no exact DOI identity match; candidate stays ineligible.

### CB09 · Wang 2003: NMIIB off-rate belongs to ADP-bound state

[10.1074/jbc.M302510200](https://mk-lab.org/wp-content/uploads/2019/05/J.-Biol.-Chem.-2003-Wang-27439-48.pdf) · unregistered candidate; ineligible
Anchor: Table I p.27442; ADP Binding and Dissociation pp.27443–27444; Methods pp.27439–27440.

Actin-bound off-rates are 0.35±0.03/s (concentration-intercept) and 0.38±0.09/s (ATP chase). Detached ATP-chase off-rate is 0.48±0.11/s. These support the NMIIB ADP identity of the historical 0.35, not a weakly attached prestroke slip interpretation.

Context: {"protein": "Human NMIIB S1 baculovirus construct, rabbit skeletal actin.", "temperature_C": 25, "buffer": "Stopped-flow default 25 mM MOPS pH7, 5 mM MgCl2, 100 mM KCl, 0.1 mM EGTA.", "concentrations": "Cuvette concentrations unless stated otherwise."}

Quantity: MantADP off-rate, actin-bound versus detached.
Uncertainty: Within-paper SD/SE conflict; n=3–4 experimental rounds.

Limit: Exact DOI is not registered in frozen KB, so the primary comparison remains candidate/ineligible. Table I calls errors SE, whereas Methods Data Analysis says SD for three to four rounds. Preserve that inconsistency; do not convert to a prior.

## Relations and source estimation groups

- **CR01** (crossbridge.k_atp_apparent, crossbridge.k_atp_bind, crossbridge.k_atp_isomerize, crossbridge.k_atp_bind_free): Source ATP slopes are apparent composites; detached and acto reporters differ. The selected eight-state mechanism has a chosen microscopic encounter rate, which is not identified by one apparent slope. Source cards: CB01. Assumptions: see referenced source context.

- **CR02** (crossbridge.k_atp_apparent, crossbridge.k_atp_bind, crossbridge.k_atp_isomerize, crossbridge.cycle_states): For code rates a=binding*[ATP], b=c*(binding/apparent−1), c=isomerize, the pure-math first-passage mean is 1/c+(b+c)/(a*c)=1/c+1/(apparent*[ATP]). Matching mean low-slope/ceiling does not alone establish equivalence to a fitted fluorescence eigenvalue. Source cards: CB01. Assumptions: Forward absorbing target; Coefficients both include the same MgATP fraction; Fixed concentration; No runtime execution.

- **CR03** (crossbridge.k_hydrolysis, crossbridge.cycle_states): Primary relaxation sum and burst equilibrium jointly determine directional rates. Current forward-only state reset is not that reversible relaxation observable. Source cards: CB03. Assumptions: Paper K3=k3/k−3; Paper quench signal/model.

- **CR04** (crossbridge.k_adp_release, crossbridge.k_adp_release_free, crossbridge.cycle_states): Keep NMIIA/NMIIB, S1/HMM, actin-bound/free and estimator separate. The current 100/s detached declaration conflicts with measured detached kinetics; no replacement is authorized. Source cards: CB02, CB05, CB09. Assumptions: see referenced source context.

- **CR05** (crossbridge.x_adp, crossbridge.k_adp_release): x=kBT*ln(fold)/assumed_force: at 310 K and 2 pN, ln5 gives 3.44 nm and ln4 gives 2.97 nm. The branch discrepancy is model mismatch, not a sampled SEM/SD. Source force itself was inferred with borrowed smooth-muscle mechanics. Source cards: CB05. Assumptions: Project-chosen 2 pN; Project 310 K; Single Bell form for both branches; Rounded 5-fold and 4-fold factors.

- **CR06** (crossbridge.k, crossbridge.stroke, crossbridge.x_beta, crossbridge.f_stall): Smooth-muscle stiffness and stroke enter a later pooled model. Exact 5.5 nm is a Stam table assignment; 0.6 nm prestroke slip is unlocated in Veigel main text. The Clausen intermediary is unresolved. Source cards: CB06, CB07, CB08. Assumptions: see referenced source context.

- **CR07** (crossbridge.k_on, crossbridge.reach, crossbridge.k_off0, crossbridge.k_adp_release, crossbridge.k_stroke): Stam two-state kon/koff ratio, source bimolecular actin association, and current per-slot hazard plus geometry are different quantities. Three-state duty depends jointly on the declared transition rates and encounter access; no independent calibration of these current inputs was found. Source cards: CB04, CB07, CB09. Assumptions: see referenced source context.

- **CR08** (crossbridge.k_pi_release, crossbridge.k_stroke, crossbridge.cycle_states): Extended cycles require the Pi and stroke inputs to resolve to one binding target. Frozen distinct declarations 50 and 22 are not evidence for two independent transitions and do not satisfy that selector precondition. Source cards: CB04. Assumptions: see referenced source context.

- **CR09** (crossbridge.stroke, crossbridge.k_stroke, crossbridge.stroke_sign, crossbridge.cycle_states): Declared 0.0055 um*22/s=0.121 um/s is a parameter-construction rationale. Frozen mode-1 kernel treats magnitude as a stroke marker and retargets by one chain edge, so the product does not establish actual displacement speed. Source cards: CB06, CB07. Assumptions: Actual branch usage, topology and native motion unmeasured.

- **CR10** (crossbridge.f_stall, crossbridge.x_beta, crossbridge.x_adp): Current f_stall sets exponential stroke suppression; x_beta and x_adp set opposite-signed transition sensitivities. A force at which a rate is reduced by e is not automatically a zero-velocity stall force. Source cards: CB05, CB06, CB07. Assumptions: see referenced source context.

Current same-fit memberships are empty. Source-side shared-assay and conditional derivation groups do not create current covariance or training labels.

The three located numeric matches have different roles: stiffness is a smooth-muscle analysis/model transfer; ADP release is a rounded NMIIA S1 assay estimate; stroke is a published model-table assignment. None is an in-situ MCF7 validation or training label.

## Immutable review history

All 16 records are byte-pinned to `1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09` and retain snapshot plus original record identity. JSON contains path, pointer, file SHA and canonical record SHA.

- HB_literature_parameters_crossbridge_k_adp_release: `aleph/outputs/outer/parameter_atlas_20260929/literature_review.json` `/parameters/20` · `{"parameter": "crossbridge.k_adp_release"}`
- HB_literature_parameters_crossbridge_stroke: `aleph/outputs/outer/parameter_atlas_20260929/literature_review.json` `/parameters/21` · `{"parameter": "crossbridge.stroke"}`
- HB_literature_parameters_crossbridge_x_adp: `aleph/outputs/outer/parameter_atlas_20260929/literature_review.json` `/parameters/22` · `{"parameter": "crossbridge.x_adp"}`
- HB_literature_parameters_crossbridge_x_beta: `aleph/outputs/outer/parameter_atlas_20260929/literature_review.json` `/parameters/23` · `{"parameter": "crossbridge.x_beta"}`
- HB_example_review_groups_crossbridge_state_selector: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/48` · `{"id": "crossbridge_state_selector"}`
- HB_example_review_groups_free_head_gap: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/50` · `{"id": "free_head_gap"}`
- HB_example_review_groups_atp_encounter: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/51` · `{"id": "atp_encounter"}`
- HB_example_review_groups_nmii_biochemical_candidates: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/52` · `{"id": "nmii_biochemical_candidates"}`
- HB_example_review_groups_free_atp_transfer: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/53` · `{"id": "free_atp_transfer"}`
- HB_example_review_groups_crossbridge_capture: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/54` · `{"id": "crossbridge_capture"}`
- HB_example_review_groups_stroke_direction_convention: `aleph/outputs/outer/parameter_atlas_20260929/example_review.json` `/review_groups/55` · `{"id": "stroke_direction_convention"}`
- HB_uncertainty_parameters_crossbridge_k_adp_release: `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json` `/parameters/17` · `{"name": "crossbridge.k_adp_release"}`
- HB_uncertainty_parameters_crossbridge_k_hydrolysis: `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json` `/parameters/18` · `{"name": "crossbridge.k_hydrolysis"}`
- HB_uncertainty_parameters_crossbridge_x_adp: `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json` `/parameters/19` · `{"name": "crossbridge.x_adp"}`
- HB_uncertainty_review_cards_U01: `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json` `/review_cards/0` · `{"id": "U01"}`
- HB_uncertainty_review_cards_U03: `aleph/outputs/outer/parameter_atlas_20260929/uncertainty_review.json` `/review_cards/2` · `{"id": "U03"}`

## Static code scope

- CB_C01: `aleph/cell/bonds.py:131–184` · Base versus IIB fallback, selector guard and three-state assignment. ADP release is a projected detachment; force scale f_stall exponentially suppresses the stroke rate, without a finite-force zero.
- CB_C02: `aleph/cell/bonds.py:248–264` · MgATP coefficient uses the Mg fraction before multiplying total ATP. This code conversion is not an empirical correction of the source buffer.
- CB_C03: `aleph/cell/bonds.py:269–315` · Extended cycles require k_pi_release and k_stroke to resolve to the same target, not merely equal values. Here ADP release preserves attachment and ATP binding detaches.
- CB_C04: `aleph/cell/bonds.py:324–350` · Free-head recovery and reversible ATP encounter rates. Both association coefficients use the same MgATP fraction; ratio is preserved.
- CB_C05: `aleph/physics/kinetics.py:11–22` · Mode-1 stroke length magnitude is a marker; partner walks by chain topology. It is not a direct molecular nanometre displacement.
- CB_C06: `aleph/physics/kinetics.py:1010–1023` · Frozen kernel uses only nonzero stroke marker for mode 1 and sets partner to _chain_target; chain-end saturation is separately counted.
- CB_C07: `aleph/physics/kinetics.py:1140–1177` · First-order per-slot attempt precedes candidate geometry. A bimolecular actin association slope is not this hazard without a mapping.
- CB_C08: `aleph/cell/bonds.py:69–72` · Bell force-characteristic conversion uses kBT at cell.temperature; no experiment was run.

## Validation and boundaries

{
  "unique_parameters": 19,
  "exact_frozen_name_set": true,
  "exact_raw_declarations_and_prior_snapshots": true,
  "SOURCED_rows": 4,
  "EXAMPLE_rows": 10,
  "SWEPT_rows": 5,
  "source_cards": 9,
  "unique_primary_DOIs": 6,
  "source_registry_matches": 5,
  "registered_source_uids": [
    "SE423",
    "SE424",
    "SE425",
    "SE427",
    "SE550"
  ],
  "candidate_cards_ineligible": 2,
  "relations": 10,
  "historical_pins": 16,
  "static_code_anchors": 8,
  "all_historical_pins_from": "1db3e0a5e4f173f1ffd52a5e8634a59d3eabef09",
  "all_training_eligibility_false": true,
  "current_fit_memberships_empty": true,
  "card_and_relation_references_closed": true,
  "local_source_hashes_match": true,
  "retrieval_metadata_hash_matches": true,
  "physics_executed": false,
  "current_parameter_values_changed": false,
  "mismatches": [],
  "source_estimation_groups": 9,
  "full_primary_inspection_cards": 9,
  "current_source_numbers_located": 3,
  "target_MCF7_measurements_established": 0,
  "frozen_kb_provenance_export_hash_matches": true,
  "located_number_roles": {
    "crossbridge.k": "smooth_muscle_mechanics_analysis_value_and_published_model_transfer",
    "crossbridge.k_adp_release": "rounded_NMIIA_actin_bound_S1_assay_off_rate",
    "crossbridge.stroke": "published_model_table_assignment_not_direct_NMIIA_measurement"
  },
  "explicit_mixed_duplicate_UIDs_preserved": {
    "eligible": [
      "SE550"
    ],
    "ineligible": [
      "SE425"
    ]
  },
  "source_number_match_is_not_training_label": true
}

Raw article caches are ignored and local only. Retrieval metadata contains exact source URLs, cache hashes and failed-response flags. No source registration or PI adjudication occurred. The frozen SE427 OK identity is preserved alongside older raw-source CHECK text; the SE425 CHECK duplicate is retained despite SE550 OK.

## Next source work

1. PI review the detached ADP absence assertion, ATP actin-state attribution and hydrolysis observable mapping before choosing any values. (crossbridge.k_adp_release_free, crossbridge.k_atp_bind, crossbridge.k_atp_bind_free, crossbridge.k_hydrolysis)
2. Recover intended Clausen Table1 and exact0.6nm source/state; otherwise keep those claim-support gaps visible. (crossbridge.stroke, crossbridge.x_beta)
3. PI review force/temperature assumptions of x_adp, stale NMIIA prior text and assay error conventions. Do not interpret same-paper branch differences as SD. (crossbridge.x_adp, crossbridge.k_adp_release)
4. Define the measured observable for ATP encounter model and the topology-to-molecular displacement mapping; review selector guards independently of literature sourcing. (crossbridge.k_atp_apparent, crossbridge.k_atp_isomerize, crossbridge.stroke, crossbridge.k_stroke, crossbridge.cycle_states)
5. Obtain isoform/construct-specific actin-association and acto-Pi limits plus target-context geometry if current first-order capture/stroke hazards are to be calibrated. (crossbridge.k_on, crossbridge.reach, crossbridge.k_pi_release, crossbridge.k_off0)
