# Actin organization: source quantities and conditional mappings

고정 `24b3a44cb`의 top-level 37행을 검토했다. Arp2/3 7, fascin 6, filamin 12, formin 6, microvillus_bundler 6이며 태그는 모두 EXAMPLE이다. 현재 값·선언 문구·prior·KB 기록은 그대로 보존했다. 10개 카드는 12개 원문의 제한된 재검토를 묶으며 독립 실험 10개나 새 관측 37개를 뜻하지 않는다. Kovar2006은 원문 PDF 획득에 실패하여 저자 페이지·원문 검색 색인 확인만 별도로 남겼다.

모든 검토는 advisory다. 원문의 관측 정의를 현재 입력에 연결하기 위한 검토이며, 새 prior·현재 fit 그룹·공분산·신경망 학습 label을 생성하지 않았다. native physics, 원문 코드, 모델 학습은 실행하지 않았다.

## 핵심 연결

- **Arp2/3:** 70° 분지 각도는 기하 관측이다. 각도 분산만으로 현재 축/각 강성을 측정했다고 볼 수 없다. .037/s의 원문 분모는 표면 WAVE1ΔN이고 현재 코드 분모는 자유 Arp2/3 복합체다. 분지 reserve는 별도 유한 용량이다.
- **Fascin:** Table1의 on 계수는 .8/(µM·s)이고 현재 on 입력은 1/s다. 자유 농도와 결합 자리 정의가 필요하다. FRAP·경쟁자 교환과 전체 두 팔 crosslink 파괴는 같은 관측이 아니다.
- **Filamin:** Ferrer HS 적합의 off-rate, 반응좌표 거리, 에너지 우물 곡률을 전체 단백질의 강성·capture geometry·catch 경로와 구분했다. Pereverzev의 확인된 원문은 selectin 이론 재분석이다.
- **Formin/CP:** 29.1/(µM·s), 1.6/(µM·s), .00634/s는 같은 Shekhar 논문의 서로 다른 추정 절차다. 기존 AK04와 같은 실험이며 새 독립 증거로 세지 않는다.
- **Microvillus bundler:** villin·plastin-1·espin의 역할을 구분하는 원문은 찾았지만, 현재 fascin 복사값을 해당 단백질의 kinetics/force law로 뒷받침하지 않는다.

## 원문 카드

### AO01 · Mullins 1998: branch geometry is not a junction stiffness measurement

[10.1073/pnas.95.11.6181](https://pmc.ncbi.nlm.nih.gov/articles/PMC27619/) · Materials and polymerization buffer

Reported 70 ± 7 degrees is a geometric population summary. Authors infer a rigid attachment; this is not an observed torque-angle constitutive relation.

관측 단위: Angles of 48 end-side junctions in quick-freeze/deep-etch electron micrographs.

조건: Purified Acanthamoeba actin/Arp2/3; preformed gelsolin-capped filaments. 50 mM KCl, 1 mM MgCl2, 1 mM EGTA, 0.2 mM ATP, 10 mM imidazole pH7. Measurement temperature not independently located in inspected angle-assay description.

한계: No axial or angular stiffness estimate supporting 4600 pN/um or .02 pN um/rad² was located. Angle spread has preparation, projection and heterogeneity contributions; equipartition requires additional equilibrium and noise assumptions.

오차: ±7 reported; SD versus SEM is not explicitly identified in the accessed statement.

### AO02 · Le Clainche 2003: debranching trajectory has nucleotide and stabilization conditions

[10.1073/pnas.1130513100](https://pmc.ncbi.nlm.nih.gov/articles/PMC164447/) · Protein source and buffer

Debranching half-time is reported as 800 ± 100 s, compared with ATP hydrolysis (8 ± 1)e-4/s. CrATP and stabilizers change behavior.

관측 단위: Time-dependent branches per micrometer of filament; 5000–30000 um and about 500 early branches counted per time point.

조건: Rabbit muscle actin, bovine-brain Arp2/3 and N-WASP WA; ATP/CrATP perturbations. 5 uM actin; aliquots after 90% polymerization, rhodamine-phalloidin added for imaging; 500-fold dilution. Assay temperature not located; preparation room-temperature steps are not assigned to all measurements.

한계: Current .003/s is declared order-of-magnitude, not this exact reported point. A length-normalized decay must be mapped to survival of existing junctions before assigning a per-junction hazard. Chan2009 not inspected in this bounded pass; no contradiction verdict for the full declared range.

오차: ± type not resolved from accessed text; no covariance reconstructed between hydrolysis and debranching.

### AO03 · Li/Bieling 2022: the .037/s denominator is surface WAVE1ΔN

[10.7554/eLife.73145](https://elifesciences.org/articles/73145) · Fig.3 Arp2/3 incorporation and WAVE-normalized rate

The source .037/s is per WAVE1ΔN molecule. Frozen nucleation reads per free Arp2/3 complex; equal numerical rate requires a specified NPF/complex relationship and activation assumptions.

관측 단위: TIRF incorporation events per surface NPF per second; intensity-decay classification excludes abrupt one-step disappearance.

조건: Purified network growing from WAVE1ΔN-coated surfaces; sparse fluorescent Arp2/3 in 1:5000 labeled:unlabeled mixture. Incorporation event rate divided by WAVE1ΔN surface density 1850/um², itself a cited calibration. No temperature transfer to frozen specimen established in this pass.

한계: Reinspection reuses P07, not another independent observation. Current 2 uM free-shell complex pool is not a direct whole-cell or subunit concentration observation. Existing AP01/AP06/AP07 provenance remains the abundance evidence.

오차: No uncertainty for .037/s supplied in the accessed sentence; event classification and surface-density calibration are shared dependencies.

### AO04 · Aratyn 2007 and Courson 2010: exchange depends on pool and competitor context

[10.1091/mbc.E07-04-0346](https://pmc.ncbi.nlm.nih.gov/articles/PMC1995713/) · FRAP analysis and cell-imaging temperature

Aratyn Table1 reports off .12/s and on .8/(uM s); FLIP infers about .1/s. Current on 1/s has a different denominator. Courson finds .10 ± .007/s fast exchange with competitor, while buffer-only decay tracks bleaching.

관측 단위: Fluorescence recovery/loss of a protein population; not direct survival of every single two-arm crosslink.

조건: Aratyn: B16F1 mouse melanoma/N2a neuroblastoma filopodia and reconstituted human fascin bundles. Courson: purified human fascin bundles with phalloidin-stabilized actin. Aratyn specifies 37 C for cellular localization/fraction imaging; the FRAP/FLIP paragraph does not separately state temperature. Courson exchange temperature not located; no 310 K transfer established. Courson explicitly contrasts washed-out free fascin with 3 uM added fascin or alpha-actinin.

한계: Rapid protein exchange can coexist with persistent bundles. Mapping to slot attachment/exit requires free concentration, rebinding/avidity and site definition. ~97% inferred bound fraction and 1:25–60 fascin:actin do not calibrate three coarse-node slots. Aratyn appendix acquisition failed; its detailed on-rate derivation was not rechecked.

오차: Aratyn in-vivo recovery half-time 6.0 ± 1.6 s (n24; 95% CI), distinct from a time constant. Courson fast-component ±.007/s is SE.

별도 원문: [10.1074/jbc.M110.123117](https://pmc.ncbi.nlm.nih.gov/articles/PMC2924060/) — separate_competitor_exchange_assay. 같은 카드에 있다는 이유로 같은 실험으로 취급하지 않는다.

### AO05 · Jansen 2011: center-to-center filament spacing, not molecular maximum reach

[10.1074/jbc.M111.251439](https://pmc.ncbi.nlm.nih.gov/articles/PMC3191048/) · Human fascin-1 and rabbit actin sources

Table2 WT spacing is 8.1 ± .6 nm from at least 12 bundles. This gives a direct primary spacing anchor separate from the current Courson citation.

관측 단위: Interfilament spacing within selected two-dimensional bundle projections.

조건: Recombinant human fascin-1 with rabbit skeletal actin; negatively stained, overnight-assembled bundles. Selected planar rafts confirmed by ±20-degree tilt; center-to-center distances of neighboring filaments. Room-temperature bundle preparation; not a live-cell thermal fluctuation assay.

한계: Exact 8.5 nm endpoint was not located in inspected originals. A spacing is not maximum protein extension, force-free whole-link rest length, or capture radius. Courson main text inspected here did not provide the cited 8.1–8.5 nm measurement.

오차: ±.6 nm reported; error type is not explicit in Table2 footnotes, which specify sample size and center-to-center definition.

### AO06 · Ferrer 2008: filamin HS rupture fit and energy-well curvature

[10.1073/pnas.0706124105](https://lab.vanderbilt.edu/lang-lab/wp-content/uploads/sites/195/2023/01/FerrerPNAS08.pdf) · Printed p9224, Fig.4 Hummer–Szabo fit discussion

Fit gives off .087 ± .073/s and distance 1.94 ± 1.49 Å (.194 ± .149 nm); the current .4 nm uses a different numerical distance. Curvature 820 ± 551 pN/nm is an energy-well quantity.

관측 단위: Rupture-force distribution for actin–filamin interaction, fitted along a pulling reaction coordinate.

조건: Optical-trap actin–ABP–actin rupture geometry; purified filamin, not whole-cell effective response or isolated Ig unfolding. Hummer–Szabo rupture-force distribution analysis; loading-rate pooling noted by authors. Exact assay temperature/filamin species not established by this reinspection.

한계: This is a fit/quantity mismatch, not statistical disproof of .4 nm. Curvature cannot automatically replace the whole-link stiffness of 1000 pN/um. Combining .087/s with an additional catch channel is not the same Ferrer fit.

오차: Reported ± retained without assigning SD/SEM where unavailable; broadening and multiple coordinates are explicitly discussed by authors.

### AO07 · Nakamura 2007: flexible dimer contour and mass do not fix capture geometry

[10.1083/jcb.200707073](https://pmc.ncbi.nlm.nih.gov/articles/PMC2099194/) · Subunit mass and contour description

Two roughly 280.7 kDa, 80 nm subunits support the dimer mass/contour scale. A ~160 nm end-to-end contour path does not require a straight 160 nm equilibrium separation.

관측 단위: Contour lengths and organization of a flexible two-arm dimer; molecular mass is a protein-composition scale.

조건: Purified recombinant FLNa and detergent-extracted A7 human melanoma cytoskeletons. EM contour tracing and immunogold localization; these geometric observations are separate from the paper's gel-filtration Stokes-radius method. Gel-filtration method: 4 C; actin co-sedimentation: 25 C. Neither is a demonstrated mechanics transfer to the target specimen.

한계: No exact 8 nm full-dimer hydrodynamic radius was located in the inspected main text; Stokes-radius methods exist and supplemental construct results were not inspected. No direct source located for current100nm arm capture,1uM target-cell pool or first-order binding1/s. Declared Nakamura2011 review remains unchanged.

오차: No new uncertainty band; original priors and broad geometry ranges retained.

### AO08 · Pereverzev 2005 and Rognoni 2012: selectin theory and FLNa domain gating are distinct

[10.1529/biophysj.105.062158](https://pmc.ncbi.nlm.nih.gov/articles/PMC1366651/) · Scope and two-pathway model

The located Pereverzev paper is not a filamin/F-actin parameter measurement. Rognoni shows domain-pair opening regulates peptide affinity, not a direct whole actin-link catch-rate calibration.

관측 단위: Theoretical force-dependent escape routes, and separately force-biased domain opening/peptide-binding observations.

조건: Pereverzev models published P/L-selectin–ligand force data. Rognoni measures engineered human FLNa20–21 with target peptides in optical tweezers. DNA handles, ubiquitin spacers, PBS pH7.4; isolated peptide/domain binding is distinct from actin crosslink rupture. Rognoni numeric assay temperature not located in inspected main Methods.

한계: No exact filamin catch .1/s or distance .8 nm support was located. Source lineage from the existing hand_kmc card to these particular values remains unresolved. Preserve SE35 NO_DOI_FOUND and its unrelated suggested DOI rather than relabeling it as the newly located article.

오차: No cross-paper covariance or merged catch/slip fit. Mechanistic interpretations are attributed to their authors.

별도 원문: [10.1073/pnas.1211274109](https://pmc.ncbi.nlm.nih.gov/articles/PMC3511698/) — separate_FLNa_domain_peptide_binding_assay. 같은 카드에 있다는 이유로 같은 실험으로 취급하지 않는다.

### AO09 · Shekhar 2015: formin/CP shared ternary-end experiment

[10.1038/ncomms9730](https://pmc.ncbi.nlm.nih.gov/articles/PMC4660058/) · CP-capped end exposure and derived association

Table1 free-end on 29.1 ± .59/(uM s) is direct; CP-bound on 1.6 ± .5/(uM s) is derived from exposure/uncapping fits. Setup2 formin exit .00634 ± .00009/s shares the total-exit/fate inference with CP exit .00202 ± .00004/s.

관측 단위: Filament-state transitions after controlled exposure; competing fates of a paused ternary end.

조건: Human mDia1 FH1–FH2–DAD; rabbit muscle actin with profilin, distinct free versus CP-bound barbed ends. Microfluidic single-filament microscopy; setup1 spectrin-actin anchored, setup2 formin anchored. Room temperature. 5 mM Tris pH7.8, .2 mM ATP, 1 mM MgCl2, .2 mM EGTA, 50 mM KCl, 10 mM DTT, 1 mM DABCO; typical 1 uM actin/4 uM profilin.

한계: Same experiment as historical AK04, not an independent replicate. Alternative setup/formation-path values remain separate. Kovar2006 exact current factor3 and off .0002/s remain unverified; limited primary index points to different formin constructs. Net elongation acceleration does not automatically map to association-only scaling.

오차: Table1 errors SEM; no covariance published here is reconstructed.

### AO10 · Revenu 2012: intestinal microvillus bundlers are distinct proteins

[10.1091/mbc.E11-09-0765](https://pmc.ncbi.nlm.nih.gov/articles/PMC3258176/) · Scope and molecular identities

Triple knockouts retain protrusions but lose regular dense actin-bundle organization. The study distinguishes villin, plastin-1 and espin; it does not make them kinetically interchangeable with fascin.

관측 단위: Microvillus and actin-bundle organization across genetic perturbations.

조건: Mouse intestinal enterocytes; villin, plastin-1/I-plastin and espin knockout combinations. Differentiated adherent epithelial brush border, not rounded/suspended MCF7. Tissue and isolated brush-border morphology; not molecular association/rupture kinetics.

한계: No direct support located for the six current bundler numerical inputs. Filament spacing, microscopic protein valence and three slots per coarse node are distinct quantities. Protein identity/state must precede any transfer of rates or force response.

오차: No numeric prior or cross-protein uncertainty distribution constructed.

## 현재 선언과 행별 판단

아래 숫자는 고정 선언을 표시한 것이다. 검토 결과로 바꾼 숫자가 아니다. 정확한 source 문구, 위치, prior, KB 비교 원본은 JSON의 `parameter_reviews`에 있다.

| 입력 | 현재 값 | 카드 | 검토 지점 |
|---|---:|---|---|
| `arp23.branch_angle` | 70.0 deg | AO01 | 70-degree source central angle found; junction coordinate and context remain distinct. |
| `arp23.conc` | 2.0 uM | AO03 | AP01/AP06/AP07 already separate species, subunit and volume denominators; 2 uM free cortical-shell complex concentration is not newly measured. |
| `arp23.debranch_rate` | 0.003 1/s | AO02 | Published debranch half-time depends on nucleotide/stabilization and length-normalized observable; exact .003/s not located. |
| `arp23.k` | 4600.0 pN/um | AO01 | No junction stiffness measurement found; mean/spread does not by itself fix constitutive stiffness. |
| `arp23.k_theta` | 0.02 pN*um/rad^2 | AO01 | No junction stiffness measurement found; mean/spread does not by itself fix constitutive stiffness. |
| `arp23.nucleation_rate` | 0.037 1/s | AO03 | Source .037/s is per surface WAVE1ΔN, not per free Arp2/3 complex. |
| `arp23.nucleation_reserve_fraction` | 0.0 1 | AO03 | Frozen zero and prior incident narrative preserved; finite reserve is not a fitted biological fraction. |
| `fascin.k` | 1000.0 pN/um | AO04, AO05 | No direct force-law support for these current fascin values in inspected sources. |
| `fascin.k_off0` | 0.1 1/s | AO04 | About .1/s appears in FLIP/competitor exchange; microscopic whole-link hazard transfer unresolved. |
| `fascin.k_on` | 1.0 1/s | AO04 | Table1 .8/(uM s) requires free concentration/site mapping to a first-order slot rate; current1/s is not that coefficient. |
| `fascin.length` | 0.0085 um | AO05 | 8.1±.6nm center-center spacing found in Jansen2011; exact8.5 endpoint and Courson attribution unresolved. |
| `fascin.sites_per_node` | 3.0 1 | AO04, AO05 | Fascin:actin and bound fraction do not identify three slots per coarse node. |
| `fascin.x_beta` | 0.0004 um | AO04, AO05 | No direct force-law support for these current fascin values in inspected sources. |
| `filamin.arm_reach` | 0.1 um | AO07 | No direct target measurement found for current capture distances or hydrated radius. |
| `filamin.conc` | 1.0 uM | AO07 | No source support located for1uM target-cell active dimer pool or first-order slot binding1/s. |
| `filamin.k` | 1000.0 pN/um | AO06, AO07 | HS curvature and flexible-dimer whole-link stiffness are distinct quantities; current1000pN/um remains a placeholder. |
| `filamin.k_catch0` | 0.1 1/s | AO08 | Located Pereverzev original analyzes selectins; Rognoni domain-peptide gating does not directly supply current whole-link catch coefficients. |
| `filamin.k_off0` | 0.087 1/s | AO06 | HS zero-force .087/s located; it is not the total hazard after another exit channel is added. |
| `filamin.k_on` | 1.0 1/s | AO07 | No source support located for1uM target-cell active dimer pool or first-order slot binding1/s. |
| `filamin.length` | 0.16 um | AO07 | Two approximately280kDa/80nm arms support dimer scale, not a mandatory straight fixed rest separation. |
| `filamin.molecular_weight` | 560000 Da | AO07 | Two approximately280kDa/80nm arms support dimer scale, not a mandatory straight fixed rest separation. |
| `filamin.radius` | 0.008 um | AO07 | No exact current8nm full-dimer hydrodynamic radius located in inspected main text. Nakamura includes a 4 C gel-filtration method; supplemental construct-specific radius results remain uninspected. |
| `filamin.reach` | 0.16 um | AO07 | No direct target measurement found for current capture distances or hydrated radius. |
| `filamin.x_beta` | 0.0004 um | AO06, AO08 | Source HS distance1.94±1.49Å differs from current4Å; this is not statistical disproof or a new value proposal. |
| `filamin.x_catch` | 0.0008 um | AO08 | Located Pereverzev original analyzes selectins; Rognoni domain-peptide gating does not directly supply current whole-link catch coefficients. |
| `formin.areal_density` | 1.0 1/um^2 | AO09 | Exact current3/.0002s^-1/1um^-2 not located; Kovar full original not acquired, and isoform/processivity/growth definitions differ. |
| `formin.capped_k_off` | 0.00634 1/s | AO09 | 6.34e-3/s shares total-exit and fate inference with CP exit in setup2. |
| `formin.capped_k_on` | 1.6 1/(uM.s) | AO09 | 1.6/(uM s) is derived exposure-response association, not a directly timed single binding event. |
| `formin.elongation_factor` | 3.0 1 | AO09 | Exact current3/.0002s^-1/1um^-2 not located; Kovar full original not acquired, and isoform/processivity/growth definitions differ. |
| `formin.k_off` | 0.0002 1/s | AO09 | Exact current3/.0002s^-1/1um^-2 not located; Kovar full original not acquired, and isoform/processivity/growth definitions differ. |
| `formin.k_on` | 29.1 1/(uM.s) | AO09 | 29.1/(uM s) from free-end mDia1 assay; current transfer remains advisory. |
| `microvillus_bundler.k` | 1000.0 pN/um | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |
| `microvillus_bundler.k_off0` | 0.1 1/s | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |
| `microvillus_bundler.k_on` | 1.0 1/s | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |
| `microvillus_bundler.length` | 0.0085 um | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |
| `microvillus_bundler.sites_per_node` | 3.0 1 | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |
| `microvillus_bundler.x_beta` | 0.0004 um | AO10 | Current values preserve explicit fascin-derived placeholders; villin/plastin-1/espin identity and condition must be selected before quantitative transfer. |

## 조건부 관계와 코드 의미

관계는 문헌/정의의 연결이며 인과 화살표가 아니다. `source_estimation_groups`는 원문의 동일 영상 요약, 특정 적합, 공동 추정 또는 별도 조건 비교를 구분한다. 모든 `current_parameter_fit_membership`과 현재 `same_fit_groups`는 빈 목록이다.

| 관계 | 연결하는 정의 |
|---|---|
| OR01 | One angle distribution does not jointly determine axial and angular stiffness; the code triple convention also differs from the microscopy branch angle. Thermal equilibrium, resolved angular coordinate and observation-error model would be prerequisites to an equipartition comparison; none is established here. |
| OR02 | Free-complex shell pool, NPF-normalized source rate, and finite daughter-record reserve are distinct quantities. The static ceiling rate multiplies free-complex count, not surface NPF count. A justified NPF/complex activation mapping is missing. Reserve zero is a frozen implementation choice with historical failure narrative, not a biological measurement or newly repeated experiment. |
| OR03 | Branch-count-per-length decay may inform a hazard only after controlling branch birth, length changes, nucleotide state and observation losses. The published condition is not asserted to be MCF7 junction survival or the universally correct debranch mechanism. |
| OR04 | A bimolecular on coefficient becomes first-order only with a specified free concentration and site model; FRAP or competitor exchange need not be whole-link lifetime. Constant free concentration, accessible-site definition, rebinding and two-arm avidity must be supplied; neither .8/(uM s) nor ~97% bound calibrates three slots per coarse node. |
| OR05 | Measured filament spacing is not a maximum linker extension, molecular valence, Bell length or axial stiffness. Packing reach and the declared length guard are implementation geometry; source bundle dimensions do not identify all four independent inputs. |
| OR06 | Ferrer HS rupture parameters, selectin two-pathway theory and FLNa domain-peptide gating are different evidence units. Current additive exits are not a shared fitted parameter set. Constitutive mapping and biological mechanism require PI adjudication. No source covariance or current same-fit group inferred. |
| OR07 | Flexible dimer contour and mass do not determine capture radius, hydrated radius, active abundance or association. Representation selector changes whole-link versus per-arm interpretation. Frozen crosslink.molecular_model is preserved as context; no native runtime use is claimed. Protein concentration must specify dimers/monomers, free/assembled pools and volume. |
| OR08 | Free-end association, derived CP-bound association and setup2 competing exit come from one paper with different estimators. The .00634/s formin exit and external-scope CP exit share a sum-and-fate inference. Reuse AK04 and its CP relation as historical evidence. Do not count a new replicate or assign current fit membership merely because both inputs cite Table1. |
| OR09 | Isoform, construct, profilin/actin state and load condition govern source processivity/growth observations. Net elongation ratios are distinct from the code association-only multiplier; cortical density is a separate census. Exact factor3, off .0002/s and density1/um² primary support remain unlocated in this bounded pass. |
| OR10 | Shared numerical placeholders with fascin do not create shared experimental evidence for espin, plastin-1 or villin. Choose the intended protein/state and observational unit before any rate/force/spacing mapping; three node slots remain a coarse topological choice. |

고정 코드의 세 가지 의미를 특히 구분했다. (1) bundler length는 packing reach에 대한 허용 검사에 쓰이고 bond rest는 기본 `as_built`다. (2) filamin whole-link kind는 `fixed` length를 쓰며 zero-load exit 두 계수의 합은 .187/s다. 이 산술은 Ferrer의 .087/s fit을 재현했다는 뜻이 아니다. (3) formin factor는 profilin 관련 association을 곱하고 release를 곱하지 않는다. 원문의 net 성장속도 비율과 동일시하려면 추가 관측 변환이 필요하다.

Filamin의 160 nm는 유연한 두 팔의 contour 규모와 연결되며 곧은 평형 길이·capture 반경·수화 반경을 동시에 정하지 않는다. `crosslink.molecular_model=0`인 고정 선언과 mode1의 두 팔 해석을 별도로 보존했다. 코드 span은 정적 의미 확인이며 실제 native 사용 검증이 아니다.

## 서지 동일성과 재사용

- Ferrer SE119 및 Nakamura2007 SE121의 paired DOI/UID audit OK는 서지 동일성만 확인한다. 이 검토가 값의 사용 승인을 내리지 않는다.
- Bieling2016 SE7와 SE97의 같은 DOI 중복 원본을 모두 보존했다. Li2022의 .037/s 원문과 같은 DOI로 합치지 않았다.
- Pereverzev SE35의 DOI null, NO_DOI_FOUND 및 기존 suggested DOI를 그대로 보존했다. 새로 찾은 Biophys J DOI는 별도 미등록 후보이며 기존 audit를 대체하지 않는다.
- `historical_reviews` 40개는 이전 넓은 P/U 그룹, P07/P11/P12, AP01/AP06/AP07, source_crosscheck와 AK04를 파일 SHA→JSON pointer→canonical record SHA로 고정한다. 옛 평가를 새 관측으로 세지 않는다.
- 1차 원문 전문과 추출 텍스트는 ignored `candidate_sources/local_article_cache/actin_organization_*`에만 둔다. 배포 대상은 이 요약, 구조화된 검토, 짧은 retrieval metadata다.

## 남은 구체적 질문

- Specify the intended NPF/free-complex mapping and intact-complex cortical-shell abundance measurement before reviewing arp23 rate transfer.
- Acquire Aratyn appendix and target free-fascin/site measurements; separately identify molecular exchange versus whole-link survival.
- Resolve the filamin catch-card numerical lineage and whole-link/energy-well/domain mechanism distinction with PI; do not fill the gap with selectin coefficients.
- Acquire Kovar2006 original plus the cited earlier processivity data and match exact formin isoform/construct/profilin conditions.
- Choose the intended microvillus bundler species and state before seeking its kinetics, force dependence and spacing; three coarse slots require an observation operator.

Nakamura2007에는 4°C gel-filtration Stokes-radius 방법이 실제로 있다. 본문에서 현재 8 nm full-dimer 값을 찾지 못했고 해당 supplemental construct 결과는 확보하지 않았으므로 “radius 실험이 없다”고 결론 내리지 않는다. Aratyn의 37°C는 localization/fraction imaging에 명시되며 FRAP/FLIP 단락은 온도를 별도로 적지 않는다. 각 assay의 조건을 섞지 않았다.

## 저장 검증

37개 exact declaration/prior, 10카드, 10관계, 14 source estimation group, 12개 고정 코드 span, 40 historical snapshot 및 원문 파일/구간 해시를 메타데이터로 대조했다. 대상 값·태그·prior 수정 0, 현재 fit 그룹 추가 0, 공분산 추가 0, 학습 label 추가 0.

입력 atlas SHA-256: `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a`

KB snapshot SHA-256: `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b`

Exact JSON/retrieval hashes are reported at handoff; this Markdown does not self-hash.
