# Cortex / cytoplasmic actin: 수량·분모·원문 검토

**15개 입력과 기존 prior·태그·원문 선언을 그대로 보존했다.** 원문의 mesh, 형광 질량 분율, 추정 길이, 회전율은 코드의 node spacing·daughter count·고정 contour·node death와 같은 측정량이 아니다. Codex의 advisory 검토이며 PI 판정이나 native 실행 검증이 아니다.

## 주요 구분

- **100/µm²는 고정 코드에서 filament 수/명목 mid-shell 면적이다.** node density가 아니다. 원문에서100의 native MCF7 census를 찾지 못했고, 고정 KB-3.18도 representative 모델 수량이라고 기록한다. Belmonte의1500개/반경15µm 패치는 별도 선택한 simulation setup이다.
- **Morone의200nm(NRK)/52nm(FRSK)는 선택된 막 인접 mesh polygon 면적 제곱근의 중앙값이다.** 230/41nm는 비교한 별도 지질 확산 compartment 값이다. 둘 다 따라가는 filament node 간격을 측정하지 않는다. Bovellan의 control 약30nm와 perturbation100–200nm도 함께 평균내지 않는다.
- **Bovellan의 F-actin 형광 기여와0.5 daughter-chain 비율은 분모가 다르다.** Fritzsche2016의 HeLa1.2/0.12µm, M2 0.6/0.06µm는 kinetic model로 추정한 formin/Arp2/3 평균 길이이며, 직접 필라멘트 전수 계수가 아니다.
- **Clark의186±66nm(SD,n42)는 mitotic HeLa의 confocal profile/model 추정이다.** 약200nm 입력과 비교할 수 있지만 MCF7 값을 확정하지 않는다. 모델은 homogeneous cortical intensity를 가정하며, proximal half에80%의 filament가 있다는 측정이 아니다.
- **Fritzsche2013의 τ와 반감기는 다르다.** 단일 지수에서만 τ=1/k, t½=ln2/k. 논문은 다중 성분을 사용하며 대조군 Table1은1.38/s 및0.04/s이다.0.03/s는 cytochalasin D 조건의 slow component에도 등장하므로 단위만으로 근거를 지정하면 안 된다.
- **고정 turnover observer는 live→dead node 비율/Δt의 프레임쌍 중앙값이다.** FRAP의 fluorescent protomer exchange와 동일하지 않으며 프레임 사이 재활성화도 구분하지 못한다. 선언된0.03은 해당 비교의 목표 수치이며 inspected code에서는 dynamics 계수가 아니다.
- **Cytoplasmic50µM와25–100µM sweep은 미확인 MCF7 F-actin 값이다.** Popov12/20µM는 G-actin을 포함한 별도 simulation overall-actin setup이다. builder는 기하학적 band volume으로 polymer length와 filament count를 환산하고 water fraction을 곱하지 않는다.
- **Dormant0.1, polarity0.5, proximal0.8, gap 및 resolution aliases는 준비·기하·할당 선택이다.** 새 실측값으로 바꾸거나 source-derived covariance를 만들지 않았다.

## 15개 보존 행

| 입력 | 값 또는 binding | 태그 | 검토 역할 | 원문/정적 카드 |
|---|---|---|---|---|
| cortex.areal_density | 100.0 1/um^2 | SOURCED | model_density_not_direct_census | CG01, CG07 |
| cortex.arp23_fraction | 0.5 1 | EXAMPLE | quantity_denominator_mismatch | CG02, CG05 |
| cortex.contour | 3.0 um | EXAMPLE | convenience_and_inferred_source_distribution | CG05, CG06 |
| cortex.dormant_fraction | 0.1 1 | EXAMPLE | numerical_capacity | CG09 |
| cortex.polarity_mix | 0.5 1 | EXAMPLE | PI_preparation_choice | CG09 |
| cortex.proximal_fraction | 0.8 1 | EXAMPLE | build_selected_geometry | CG03, CG06, CG09 |
| cortex.seg | → resolution.spacing um | SOURCED | resolution_binding_not_independent_measurement | CG01, CG02, CG10, CG09 |
| cortex.thickness | 0.2 um | SOURCED | rounded_source_value_with_cell_and_method_transfer | CG03, CG06, CG10 |
| cortex.turnover_rate | 0.03 1/s | EXAMPLE | observer_vs_multicomponent_fluorescence_rate | CG04 |
| cytoplasm_actin.contour | 2.0 um | EXAMPLE | compartment_transfer_unresolved | CG05, CG08 |
| cytoplasm_actin.dormant_fraction | 0.1 1 | EXAMPLE | numerical_capacity | CG09 |
| cytoplasm_actin.f_actin_conc | 50.0 uM | SWEPT | unresolved_target_polymer_concentration | CG08 |
| cytoplasm_actin.gap | → if.gap um | EXAMPLE | geometric_clearance_alias | CG09 |
| cytoplasm_actin.polarity_mix | 0.5 1 | EXAMPLE | PI_preparation_choice | CG09 |
| cytoplasm_actin.seg | → resolution.spacing um | EXAMPLE | resolution_binding_not_independent_measurement | CG01, CG02, CG09 |

## 원문 카드

### CG01 · [Morone 2006: near-membrane polygon size, not filament discretization](https://pmc.ncbi.nlm.nih.gov/articles/PMC2064339/)

EM mesh median: NRK 200 nm (area 3.9e4 nm²), FRSK 52 nm (2.7e3 nm²). The 230/41 nm values instead come from phospholipid diffusion compartment measurements compared in Fig.8. These are different observables and different specimens.

**Locator:** Results Determination of MSK mesh size; Figs.6-8; Materials and methods membrane-sheet preparation. **단위/분모:** Square root of a selected 2D mesh polygon area, nm; medians across polygons.

**한계:** No universal 50-100 nm band; no count of complete filaments, molecular crosslinks, or nodes. Near-membrane selection (within roughly 10.2 nm) is not the full cortex thickness.

**저장된 정체성:** candidate_ineligible_no_OK_identity; OK UID 없음. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG02 · [Bovellan 2014: fluorescence contribution differs from daughter-chain fraction](https://pmc.ncbi.nlm.nih.gov/articles/PMC4110400/)

CK666 reduces cortical GFP-actin intensity about 60%. Joint perturbation reduces total-cell F-actin about 27.5%; assuming cortex accounts for about 50% (n=33), authors infer at least 55% cortical F-actin from both nucleators. Control gaps about 30 nm; mDia1 depletion produces 100-200 nm gaps; joint perturbation gives >100 nm mesh.

**Locator:** Results paragraphs preceding Fig.3; Fig.2H/I and Fig.3A-H. **단위/분모:** Relative F-actin fluorescence / actin-protomer contribution and visual mesh gaps.

**한계:** Comparable F-actin contributions do not establish 0.5 of complete filaments as branched daughters. Incomplete depletion, other nucleators and unequal lengths remain; perturbation conditions must not become native mesh bounds.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE430, SE545. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG03 · [Clark 2013: inferred thickness and intensity from confocal profiles](https://pmc.ncbi.nlm.nih.gov/articles/PMC3736691/)

In S-Trityl-L-cysteine prometaphase-blocked HeLa, reported mean h=186±66 nm (SD, n=42 cells), abstract rounded to about 190 nm. The current 200 nm is a rounded cross-cell/state transfer. The source profile model assumes homogeneous cortical intensity; it does not measure 80% of filament counts in the proximal half.

**Locator:** Results thickness extraction associated with Fig.2; Materials and methods Cortex thickness extraction; Fig.2D model. **단위/분모:** Model-inferred radial cortex width h (nm), coupled to fluorescence intensity ic (arbitrary units).

**한계:** Finite PSF/background/profile assumptions enter h. Thickness cannot identify a proximal-half chain-count fraction. The 0.8 declaration records build-selected geometry and remains a decision.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE411. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG04 · [Fritzsche 2013: multicomponent fluorescence turnover and distinct time summaries](https://pmc.ncbi.nlm.nih.gov/articles/PMC3596247/)

Control Table1: rates1.38±0.1/s and0.04±0.01/s, fast fraction0.69±0.06. Text reports recovery half-time12.8±1s; Table2 reports8.6±1s for cortical FRAP and an effective0.04±0.01/s. Their coexistence is retained as unresolved report-level differences; identical cohorts are not assumed. Background20-25s cites earlier studies. Table1 exact0.03/s is a slow component under1µM cytochalasin D, not an unperturbed whole-cortex constant.

**Locator:** Results first-order kinetics and Actin turnover; Tables1-2; FRAP/FLAP data analysis. **단위/분모:** Effective fluorescence-reactive rates ωd,i (s−1), fluorescence component fractions fi; t1/2 differs from τ.

**한계:** Single exponential identity is τ=1/k and t1/2=ln2/k; mixture summaries do not obey a one-rate reduction. Frozen observer counts live→dead nodes per time, a different numerator/denominator. SE110 has blank DOI and NO_DOI_FOUND; this candidate DOI is not a registry repair. A single-exponential20–30s half-time could approximately map to0.0231–0.0347/s, so0.03 is not numerically excluded as an approximation; its exact derivation and equivalence to node death remain unestablished.

**저장된 정체성:** candidate_ineligible_no_OK_identity; OK UID 없음. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG05 · [Fritzsche 2016: inferred length distributions and protomer-weighted populations](https://pmc.ncbi.nlm.nih.gov/articles/PMC4846455/)

Fig.3A gives mean formin/Arp2/3 lengths1200/120 nm in HeLa,600/60 nm in M2. Source concludes <10% of filaments contain20-25% of polymerized actin protomers. These definitions differ from the builder assigning0.5 of equally long3µm chains as daughters.

**Locator:** Results filament-length inference; Fig.3A/D; Tables1-2; Methods FRAP. **단위/분모:** Model-inferred population mean filament length and protomer-mass fraction.

**한계:** Values depend on fitted kinetics, nucleator assumptions and cell type. They do not establish a universal3µm cortex or2µm cytoplasmic contour. Fig.3A resolves the reversed order of M2 numbers in adjacent prose; no current fraction is recalculated.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE325. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG06 · [Chugh 2017: state-dependent thickness/tension relation, not one fixed geometry](https://pmc.ncbi.nlm.nih.gov/articles/PMC5536221/)

Thinner mitotic cortex has higher tension, but both thickness-increasing and thickness-decreasing length-regulator perturbations reduce mitotic tension. The nonmonotonic length–tension mechanism is explored in a separate computational model.

**Locator:** Fig.1c/d; Fig.3; Fig.4 model; Methods Cortex thickness measurements. **단위/분모:** Thickness and inferred cortical tension across cell states/perturbations; model filament length.

**한계:** Population contrasts are not same-cell joint rows or a fitted relation among current parameters. Do not make a universal monotonic thickness/tension edge or equate optical thickness with filament contour.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE276. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG07 · [Belmonte 2017 and frozen KB: density is a model convention](https://pmc.ncbi.nlm.nih.gov/articles/PMC5615920/)

Fig.2 uses1500/(π15²)≈2.12 filaments/µm² as a model setup. It does not measure100/µm². Frozen KB-3.18 explicitly calls the100/µm² count coarse representative filaments; the current builder interprets the input as explicit initial filament count per nominal mid-shell area.

**Locator:** Fig.2 caption; Results numerical simulations; frozen KB-3.18 and SE546. **단위/분모:** Chosen simulated filament count per planar area, not nodes per area or measured endogenous filament density.

**한계:** A method paper or an identity-OK record cannot establish a native biological density. Mesh polygon size, total polymer length, thickness, and contour distribution are needed to relate different density conventions.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE287, SE546. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG08 · [Popov 2016: model actin concentration does not measure MCF7 cytoplasmic F-actin](https://pmc.ncbi.nlm.nih.gov/articles/PMC4847874/)

The cited12–20µM values are simulation inputs with G-actin present, not measured cytoplasmic F-actin monomer-equivalent concentration in MCF7. They do not anchor the current50µM or its25–100µM sweep.

**Locator:** Results MEDYAN contractile networks; small and large simulation-system setup paragraphs. **단위/분모:** Specified overall simulation actin concentration; includes diffusing G-actin and polymer formation.

**한계:** The frozen builder converts F-actin subunit concentration in geometric band volume to length and count; this is distinct from source total actin, whole-cell protein, accessible-water concentration, and cortical enrichment.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE285. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG09 · Frozen preparation and capacity choices are not measurements

Dormant fraction0.1 sizes ceil(fraction×live_nodes), not a quiescent-cell/protein fraction. Polarity0.5 assigns barbed-end ordering along randomly oriented chains. Proximal0.8 splits chain placement across shell halves. Cytoplasmic gap aliases if.gap; both seg values alias resolution.spacing.

**Locator:** Spec declarations and CG_C01-C05. **단위/분모:** Dormant node reserve per live node; polarity Bernoulli probability; half-shell depth allocation; geometric clearance and numerical segment length.

**한계:** These are recorded PI/preparation/capacity choices. Isotropy of filament axes does not measure the probability of barbed-end-last in an arbitrary code ordering. Bound aliases are not additional measurements.

**저장된 정체성:** local_code_decision_not_literature_measurement; OK UID 없음. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

### CG10 · [Chugh–Paluch 2018 is a synthesis, not an extra measurement](https://pmc.ncbi.nlm.nih.gov/articles/PMC6080608/)

Review distinguishes outer-layer surface mesh measurements from transverse cortex organization and summarizes Morone, Bovellan, Clark and Chugh. Its50–200nm mesh description is cell-type dependent, not a numerical segment calibration.

**Locator:** Cortex organization: thickness, density and architecture. **단위/분모:** Secondary descriptions of thickness, mesh and organization.

**한계:** This card is a citation-chain locator only. It adds no independent primary experiment and cannot override the specific primary observables or authorize values.

**저장된 정체성:** registered_identity_OK_claim_support_separate; OK UID SE2, SE83. 정체성 확인은 수치·전이·학습 권한 확인이 아니다.

## 관계와 재현 범위

- **CGR01** (static_count_and_density_definition): N_fil=round(rho*4π*r_shell²); n_seg=round(contour/seg), nodes_per_fil=n_seg+1. Density names filaments, not nodes. Nominal length/area is rho*contour, before rounding and geometric mapping.
- **CGR02** (source_mass_fraction_vs_built_chain_fraction): Builder sets N_d=round(f*N_fil), requires at least one mother, and chooses mothers from the remaining chains. All initial chains share the contour input; source fluorescence/protomer fractions have different denominators and inferred unequal lengths.
- **CGR03** (binding_and_observation_mismatch): Both seg declarations resolve to resolution.spacing=0.05µm. EM mesh gaps and square-root polygon areas are transverse network observables, not along-filament chord/node spacing.
- **CGR04** (optical_profile_vs_preparation_geometry): Clark jointly infers h and ic under a homogeneous intensity profile; frozen geometry sets a radial shell and places fraction f in its proximal half using a piecewise uniform-depth map.
- **CGR05** (source_observer_quantity_mismatch): For one exponential only, tau=1/k and t_half=ln(2)/k; k=0.03/s would imply tau33.33s and half-time23.10s. Source uses multiple reactive components. Frozen observer computes median_f[count(live_f & dead_f+1)/count(live_f)/Δt_f], not fluorescent protomer exchange.
- **CGR06** (static_volume_to_polymer_count): r_in=R_nuc+gap; r_out=r_shell−h/2−gap; V=4π(r_out³−r_in³)/3; L_total=c*602.214/370*V; N_fil=round(L_total/contour). c is polymerized-subunit µM per geometric band volume in this builder.
- **CGR07** (preparation_capacity_not_observation): N_dormant=ceil(f_dormant*N_live_nodes); polarity=+1 if uniform_draw<f_mix else−1, meaning barbed end last. The reserve is node capacity, and the probability is an ordering convention on random chains.
- **CGR08** (condition_specific_comparison_not_parameter_covariance): Chugh links state/perturbation groups to thickness and tension and separately simulates a nonmonotonic length–tension mechanism.

출판물 DOI는 중복 제거 키이며 새로운 독립 실험 수로 세지 않았다. 현재 행의 역할은 관련 논문의 assay 역할과 분리했다. 예를 들어 EM mesh 실측을 density나 numerical seg의 직접 실측으로 물려주지 않는다.

원문 fit/assay 그룹8개는 source provenance일 뿐이며 current_same_fit_groups와 same_fit_groups는 모든 현재 행에서 빈 목록이다. 기존49 SOURCED/270 EXAMPLE/uncertainty/quantity 검토의 관련 기록은 immutable Git snapshot으로 참조하며 중복 독립 근거로 세지 않는다.

고정 입력 commit: `24b3a44cbd33dd34cde338483be19638aec1be1c`. 역사 검토 snapshot: `075a85d36bf7769dc4a959fa8912383cd3ead378`. 원문과 코드의 정확한 파일·구간 SHA, Git locator, BioC passage index/offset, 모든 raw declaration/prior 및 KB DOI 중복 행은 [JSON](cortex_geometry_evidence.json)에 있다. 실제 URL·시각·응답종류·크기·해시는 [retrieval metadata](candidate_sources/cortex_geometry_retrieval.json)에 있다.

Fritzsche2013의 saved SE110은 DOI가 비었고 source_audit는 NO_DOI_FOUND이다. 확인한 후보 DOI를 원본 row에 대입하지 않았다. Clark BioC의200응답은 primary XML이 아닌 오류 HTML이므로 근거로 쓰지 않았고, 성공한 원문 HTML을 별도로 보존했다.

15행 선언/prior를 고정 TOML과 직접 대조했고, 역사 JSON pointer/record identity, source DOI 중복 완전집합,7개 정적 코드 구간, 모든 cache SHA를 확인했다. 코드 import·simulation·학습·prior 실행은 없었다. 부분 호출경로와 제한된 원문 검토이며 포괄적 문헌검색이나 원문 데이터 재분석이 아니다.
