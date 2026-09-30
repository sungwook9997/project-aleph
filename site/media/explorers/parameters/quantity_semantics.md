# 입력 수량과 분모 사전

Advisory only · `aleph.parameter-quantity-semantics/1` · 고정 소스 `24b3a44cbd33dd34cde338483be19638aec1be1c`

대상 17개 입력의 선언 문구와 코드 해석을 분리했습니다. 같은 µM·1/s·비율이라는 사실만으로 관측값을 현재 입력에 대입할 수 없습니다. 원문 근거 패킷은 독립 계보이며 이 사전은 숫자·태그·모델을 변경하지 않습니다.

## 가장 중요한 구분

- 용존 actin/PFN/thymosin/CP: 기하학적 세포질 부피. cofilin: 그 부피 × 물분율. Arp2/3: 피질 껍질 부피 × 물분율.
- G-actin 총량은 용존 인벤토리입니다. 이미 만든 F-actin과 자동으로 합치거나 차감하지 않습니다.
- NMII isoform 비율의 분모는 조립+휴면 전체 할당 객체입니다. 두 prefix의 겹침 때문에 처음 조립된 객체의 isoform 비율과 일반적으로 다릅니다.
- 구조적 head 수, competence 선택 수, 활성 객체의 competent head 수, 실제 결합/하중 head 수는 별개입니다.
- frozen template의 unit_chemistry_enabled=0 및 nucleation_reserve_fraction=0은 override 없이 해당 분기를 사용할 경우의 조건입니다. 실제 실행 상태의 증거가 아닙니다.

## 출처 고정

- Atlas SHA-256: `523bdfbb39947a51c26f1a32be73e44de973ea99c476be9034dd0cc8d969f09a`
- KB SHA-256: `134097bcc8c5758c62ea42952b86321b6900a06dbf21f596819456beefdfa24b`
- 17개 소스 파일, 52개 span은 JSON에 Git object/blob, 파일 SHA-256, excerpt SHA-256을 보존했습니다.
- KB source_evidence/source_audit 원본 행만 복사했습니다. `OK`는 서지 정체성만 뜻하며 수치·분모·전이의 승인이 아닙니다.

## 분모 지도

| 경로 | 분모 | 적용 |
|---|---|---|
| geometric_cytoplasm | `V_geom = membrane.volume0 - envelope.volume0` | `actin_chem.g_actin_total`, `actin_chem.g_actin_free`, `actin_chem.profilin_conc`, `actin_chem.thymosin_conc`, `actin_chem.capping_conc` |
| cytoplasmic_water | `V_geom * fluid.cytosol_water_fraction` | `actin_chem.cofilin_conc` |
| cortical_shell_water | `4*pi*r_shell^2*cortex.thickness*fluid.cytosol_water_fraction` | `arp23.conc` |
| geometric_polymer_annulus | `(4*pi/3)*(r_out^3-r_in^3)` | `cytoplasm_actin.contour` |

## 17개 입력

### `actin_chem.g_actin_total`

원본: **100.0 uM · EXAMPLE**

> total unpolymerised actin in a non-muscle cell ~100 uM (Pollard 2000; BNID). not in KB source_audit — register before SOURCED

**선언 수량:** Declared total unpolymerised actin concentration, not total cellular actin. Generic non-muscle/secondary source wording does not identify a same-specimen denominator.

**코드 해석:** Sets dissolved actin count split into free plus profilin-bound plus thymosin-bound actin before tip preparation. Already constructed F-actin is a separate inventory.

**분모·공간:** Geometric V_geom = membrane.volume0 - envelope.volume0 in the inspected growth route; no water-fraction multiplier.

**세는 단위:** Actin monomer equivalents in soluble species, one actin per counted complex.

**변환:** Q01, Q02

**정적 입력 의존:** `actin_chem.g_actin_free`, `actin_chem.profilin_conc`, `actin_chem.thymosin_conc`, `actin_chem.profilin_kd`, `actin_chem.thymosin_kd`, `actin_chem.unit_chemistry_enabled`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- A whole-cell total-actin assay can include polymer and therefore is not this input.
- Auxiliary binding activity is not the imposed free concentration; independent inputs need not be an equilibrium pair.

**관측 연결에 필요한 것:** Separate G from F; measure soluble free and buffer-bound pools using the same cell state and volume convention.

**고정 코드:** `aleph/cell/assemble.py:877–894`; `aleph/cell/assemble.py:933–947`; `aleph/cell/unit_chemistry.py:37–70`; `aleph/cell/growth_preparation.py:64–103`; `aleph/cell/unit_chemistry.py:18–34`; `aleph/cell/assemble.py:972–981`; `aleph/cell/unit_chemistry.py:233–283`

**조건부 경로:** In the inspected assemble.wire_growth route, finite unit chemistry is called only if this value != 0 and growth exists. The frozen template has 0. This statement applies only when that template reaches this branch without overrides; it is not evidence of any archived run state.

### `actin_chem.g_actin_free`

원본: **0.5 uM · EXAMPLE**

> free ATP-G-actin near the barbed-end critical concentration (~0.1-1 uM); most G-actin is profilin- or thymosin-bound. PI-GAP for MCF7. not in KB source_audit — register before SOURCED

**선언 수량:** Declared free ATP-G-actin near a critical-concentration scale; a critical concentration is not itself an endogenous free-pool measurement.

**코드 해석:** Directly configures the base growth concentration; when finite unit chemistry is selected, sets initial free ATP-actin integer count separately from imposed total.

**분모·공간:** Geometric cytoplasm volume V_geom; µM per that volume, with no water-fraction multiplier in the inspected route.

**세는 단위:** Initially unbuffered soluble ATP-actin monomer equivalents; not PFN-actin and not all polymerization-competent species.

**변환:** Q01, Q02

**정적 입력 의존:** `actin_chem.g_actin_total`, `actin_chem.unit_chemistry_enabled`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- PFN-actin enters a separate soluble species and cannot be silently combined with free ATP-actin.
- The finite chemistry branch and base constant-concentration configuration must be distinguished.

**관측 연결에 필요한 것:** Record bound/free assay definition, nucleotide state, buffer partners and accessible versus geometric volume.

**고정 코드:** `aleph/cell/assemble.py:877–894`; `aleph/cell/assemble.py:933–947`; `aleph/cell/unit_chemistry.py:37–70`; `aleph/cell/growth_preparation.py:64–103`; `aleph/cell/unit_chemistry.py:18–34`; `aleph/cell/assemble.py:972–981`; `aleph/cell/unit_chemistry.py:233–283`

**조건부 경로:** Base growth reads this row if growth exists; full finite-pool preparation additionally needs unit_chemistry_enabled != 0. No actual execution established.

### `actin_chem.profilin_conc`

원본: **50.0 uM · EXAMPLE**

> profilin ~20-100 uM (Pollard 2000). PI-GAP for MCF7. not in KB source_audit — register before SOURCED

**선언 수량:** Declared generic profilin concentration and MCF7 gap; source text does not identify free versus total profilin.

**코드 해석:** Initial B_P is total soluble buffer-protein concentration; bound PFN-actin and free PFN sum to its rounded inventory. Later end preparation can consume free PFN into tip states.

**분모·공간:** V_geom, shared with soluble actin initialization, without water-fraction correction.

**세는 단위:** Profilin protein equivalents; not PFN-actin complex alone and not free PFN alone.

**변환:** Q01, Q02

**정적 입력 의존:** `actin_chem.g_actin_total`, `actin_chem.g_actin_free`, `actin_chem.profilin_kd`, `actin_chem.thymosin_conc`, `actin_chem.thymosin_kd`, `actin_chem.unit_chemistry_enabled`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- Isoform composition and other binding partners are not identified by this scalar.
- Comparing a free-PFN or PFN-actin assay requires its occupancy partition.

**관측 연결에 필요한 것:** Specify total/free/actin-bound PFN, isoforms and volume convention; paired pool constraints are required.

**고정 코드:** `aleph/cell/assemble.py:877–894`; `aleph/cell/assemble.py:933–947`; `aleph/cell/unit_chemistry.py:37–70`; `aleph/cell/growth_preparation.py:64–103`; `aleph/cell/unit_chemistry.py:18–34`; `aleph/cell/assemble.py:972–981`; `aleph/cell/unit_chemistry.py:233–283`

**조건부 경로:** In the inspected assemble.wire_growth route, finite unit chemistry is called only if this value != 0 and growth exists. The frozen template has 0. This statement applies only when that template reaches this branch without overrides; it is not evidence of any archived run state.

### `actin_chem.thymosin_conc`

원본: **200.0 uM · EXAMPLE**

> thymosin-beta4 ~100-500 uM (Pollard 2000). PI-GAP. not in KB source_audit — register before SOURCED

**선언 수량:** Declared thymosin-beta4 concentration with a broad generic range and an unresolved target context.

**코드 해석:** Initial B_T is total soluble buffer inventory, partitioned between thymosin-bound actin and free thymosin.

**분모·공간:** V_geom with no water-fraction correction in this initialization.

**세는 단위:** Thymosin buffer-protein equivalents; one per bound actin complex in the represented pool.

**변환:** Q01, Q02

**정적 입력 의존:** `actin_chem.g_actin_total`, `actin_chem.g_actin_free`, `actin_chem.thymosin_kd`, `actin_chem.profilin_conc`, `actin_chem.profilin_kd`, `actin_chem.unit_chemistry_enabled`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- A literature assumption of thymosin abundance is not a measurement.
- The represented finite buffer does not establish all cellular thymosin states or compartments.

**관측 연결에 필요한 것:** Separate total/free/actin-bound thymosin in the same specimen and denominator as actin/profilin.

**고정 코드:** `aleph/cell/assemble.py:877–894`; `aleph/cell/assemble.py:933–947`; `aleph/cell/unit_chemistry.py:37–70`; `aleph/cell/growth_preparation.py:64–103`; `aleph/cell/unit_chemistry.py:18–34`; `aleph/cell/assemble.py:972–981`; `aleph/cell/unit_chemistry.py:233–283`

**조건부 경로:** In the inspected assemble.wire_growth route, finite unit chemistry is called only if this value != 0 and growth exists. The frozen template has 0. This statement applies only when that template reaches this branch without overrides; it is not evidence of any archived run state.

### `actin_chem.capping_conc`

원본: **1.0 uM · EXAMPLE**

> capping protein ~1 uM (Pollard 2000). not in KB source_audit — register before SOURCED

**선언 수량:** Declared capping protein concentration; source wording does not establish total versus functionally available capper.

**코드 해석:** Rounded into FREE_C before finite end preparation; initial end binding subtracts CP from this inventory. The separate legacy constant-concentration route is explicitly retired/refusing by default.

**분모·공간:** V_geom for finite unit chemistry. The retired route instead multiplies the stated concentration by capping_k_on without a finite census.

**세는 단위:** Available represented capper units before tip binding; free plus subsequently tip-bound represented CP, not necessarily whole-cell total protein.

**변환:** Q01, Q03

**정적 입력 의존:** `actin_chem.capping_k_on`, `actin_chem.capping_k_off`, `actin_chem.unit_chemistry_enabled`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- Biochemical total CP can include unavailable or sequestered protein outside this represented inventory.
- Static legacy reads must not be counted as an active normal runtime route.

**관측 연결에 필요한 것:** State whether an assay reports total abundance, soluble active capper or free barbed-end-binding activity.

**고정 코드:** `aleph/cell/unit_chemistry.py:37–70`; `aleph/cell/unit_chemistry.py:18–34`; `aleph/cell/unit_chemistry.py:233–283`; `aleph/cell/assemble.py:933–947`; `aleph/cell/assemble.py:972–981`; `aleph/cell/growth_chemistry.py:51–73`

**조건부 경로:** In the inspected assemble.wire_growth route, finite unit chemistry is called only if this value != 0 and growth exists. The frozen template has 0. This statement applies only when that template reaches this branch without overrides; it is not evidence of any archived run state.

### `actin_chem.cofilin_conc`

원본: **20.0 uM · EXAMPLE**

> cofilin ~10-40 uM; PI-GAP for MCF7. not in KB source_audit — register before SOURCED

**선언 수량:** Declared cofilin concentration with an explicit MCF7 gap and no precise assay denominator.

**코드 해석:** Used as a supply ceiling for a separately declared decorated fraction. The cut coefficient is severing_rate times decorated_fraction; this concentration is not a fitted binding law or a dynamically depleted cofilin pool in the inspected path.

**분모·공간:** V_geom times fluid.cytosol_water_fraction. The decoration denominator is built protomers of growing families with reserve records, not automatically all cellular F-actin.

**세는 단위:** Available cofilin molecule budget under one cofilin per decorated protomer; no isoform or phosphorylation-state partition is inferred.

**변환:** Q04

**정적 입력 의존:** `fluid.cytosol_water_fraction`, `actin_chem.cofilin_decorated_fraction`, `actin_chem.cofilin_severing_rate`, `actin_chem.monomer_rise`, `actin_chem.severing_reserve_fraction`, `cell.radius`, `cell.nc_ratio`, `membrane.mesh`, `envelope.mesh`

**남은 차이와 한계:**
- Water-adjusted denominator differs from the soluble actin/PFN/thymosin/CP initialization.
- Concentration only bounds declared decoration; same µM does not establish bound fraction or severing hazard.

**관측 연결에 필요한 것:** Distinguish total, active and filament-bound cofilin; quantify matching F-actin protomers and water volume.

**고정 코드:** `aleph/cell/assemble.py:877–894`; `aleph/cell/assemble.py:954–967`; `aleph/cell/severing.py:73–105`; `aleph/cell/severing.py:123–139`; `aleph/cell/severing.py:48–53`

**조건부 경로:** assemble.wire_growth invokes family_coefficients only when reserve records exist; coefficient is assigned only to served families. No execution established.

### `arp23.conc`

원본: **2.0 uM · EXAMPLE**

> Arp2/3 complex ~1-2 uM (Pollard 2000). PI-GAP. not in KB source_audit — register before SOURCED

**선언 수량:** Declared Arp2/3 complex concentration; generic source text does not resolve free versus bound intact complex, subunit abundance or compartment.

**코드 해석:** Initial_bath interprets it as initial free intact-complex concentration in cortical-shell water. Counts share one bath unit but receive a volume-ratio activity factor. A successful new junction consumes one complex, debranching returns one.

**분모·공간:** Cortical water volume V_shell_water = f_water * 4*pi*r_shell^2*h; not whole-cell water or packed-cell volume.

**세는 단위:** Intact free Arp2/3 complexes, not separately measured Arp2/Arp3 subunits or NPF molecules.

**변환:** Q05

**정적 입력 의존:** `fluid.cytosol_water_fraction`, `cell.radius`, `cortex.thickness`, `membrane.mesh`, `erm.r0`, `arp23.nucleation_rate`, `arp23.nucleation_reserve_fraction`, `chem.atp_conc`

**남은 차이와 한계:**
- Equal µM does not reconcile intact-complex versus subunit counting or local versus bulk volume.
- The per-free-complex rate has a separately declared per-WAVE/NPF source-denominator conflict; concentration cannot repair it.
- Finite reserve/site availability limits total propensity.

**관측 연결에 필요한 것:** Resolve intact/free/NPF-bound complex fractions, local enrichment and cortical water volume; count NPF and complex separately.

**고정 코드:** `aleph/cell/build/part.py:916–938`; `aleph/cell/assemble.py:1271–1281`; `aleph/cell/nucleotide_composition.py:164–196`; `aleph/cell/nucleotide_composition.py:121–133`; `aleph/cell/nucleation.py:26–40`; `aleph/cell/nucleation.py:73–96`; `aleph/cell/nucleotide_composition.py:60–65`

**조건부 경로:** Bath construction needs chem.atp_conc and membrane in the inspected adapter. New sites require positive nucleation_reserve_fraction; its frozen template value is 0. These are conditional code facts, not proof that any run had no nucleation.

### `nmii.assembly_rate`

원본: **0.03 1/s · EXAMPLE**

> minifilament assembly/exchange, FRAP t1/2 ~10-30 s ORDER OF MAGNITUDE. PI-GAP. READ (nmii-life lane, 2026-09-21): with nmii.disassembly_rate it is the two-state life of a whole minifilament OBJECT (physics/object_life), and the ratio ka/(ka+kd) is the stationary ASSEMBLED fraction, so the free pool the build carries as dormant objects is assembled x (kd/ka). not in KB source_audit — register before SOURCED

**선언 수량:** Declared FRAP/assembly-exchange order-of-magnitude placeholder; current source text explicitly says whole-minifilament object life. No source kinetic label is established by the declaration.

**코드 해석:** A first-order whole-object entry rate. With life enabled, rates determine total allocated reserve and per-object present/parked transition probabilities. With life off, reservoir arithmetic is still reported by molecule_report.

**분모·공간:** One allocated minifilament object, conditional on being parked (assembly) or present (disassembly); not per head, per heavy chain or per concentration.

**세는 단위:** Whole modeled object switches state with its node/segment/triple/relation blocks.

**변환:** Q06

**정적 입력 의존:** `nmii.areal_density`, `cell.radius`, `cortex.thickness`, `membrane.mesh`, `erm.r0`, `nmii.object_life`, `nmii.disassembly_rate`

**남은 차이와 한계:**
- FRAP recovery, intensity growth, subunit exchange, optical track loss and object disappearance are different observables.
- kd/ka stationary-population bookkeeping is a code assumption, not measured equilibrium or an abundance fit.

**관측 연결에 필요한 것:** Supply an observation model linking assay detection/recovery and object identity to these conditional hazards.

**고정 코드:** `aleph/cell/build/nmii.py:37–55`; `aleph/cell/nmii_molecules.py:119–146`; `aleph/cell/nmii_molecules.py:151–216`; `aleph/cell/build/nmii.py:233–263`; `aleph/physics/object_life.py:9–33`

**조건부 경로:** Frozen nmii.object_life=1 when used without override; downstream object execution and actual rates require the run record.

### `nmii.disassembly_rate`

원본: **0.03 1/s · EXAMPLE**

> as nmii.assembly_rate; PI-GAP. READ (nmii-life lane, 2026-09-21) as the rate at which an assembled minifilament object leaves the world, releasing every crossbridge relation it owns. Disassembly WITHOUT reassembly is not a partial implementation but a destructive one (95 % of the population gone in 100 s), so the two rows are wired as one law or not at all — physics/object_life.object_blocks refuses ka = 0 with kd > 0. not in KB source_audit — register before SOURCED

**선언 수량:** Declared FRAP/assembly-exchange order-of-magnitude placeholder; current source text explicitly says whole-minifilament object life. No source kinetic label is established by the declaration.

**코드 해석:** A first-order whole-object exit rate. With life enabled, rates determine total allocated reserve and per-object present/parked transition probabilities. With life off, reservoir arithmetic is still reported by molecule_report.

**분모·공간:** One allocated minifilament object, conditional on being parked (assembly) or present (disassembly); not per head, per heavy chain or per concentration.

**세는 단위:** Whole modeled object switches state with its node/segment/triple/relation blocks.

**변환:** Q06

**정적 입력 의존:** `nmii.areal_density`, `cell.radius`, `cortex.thickness`, `membrane.mesh`, `erm.r0`, `nmii.object_life`, `nmii.assembly_rate`

**남은 차이와 한계:**
- FRAP recovery, intensity growth, subunit exchange, optical track loss and object disappearance are different observables.
- kd/ka stationary-population bookkeeping is a code assumption, not measured equilibrium or an abundance fit.

**관측 연결에 필요한 것:** Supply an observation model linking assay detection/recovery and object identity to these conditional hazards.

**고정 코드:** `aleph/cell/build/nmii.py:37–55`; `aleph/cell/nmii_molecules.py:119–146`; `aleph/cell/nmii_molecules.py:151–216`; `aleph/cell/build/nmii.py:233–263`; `aleph/physics/object_life.py:9–33`

**조건부 경로:** Frozen nmii.object_life=1 when used without override; downstream object execution and actual rates require the run record.

### `nmii.rlc_phosphorylated_fraction`

원본: **0.3 1 · EXAMPLE**

> active (RLC-phosphorylated) fraction — PI-GAP (a target Aleph must find; the number is an initial point). WHICH READING THE BUILD TAKES (nmii-life lane, 2026-09-21, after three rows were found to claim one quantity): this row is HEAD COMPETENCE and nothing else — cell/bonds.kinetic_owners gives a crossbridge relation to only this fraction of heads, and the built OBJECT count does not depend on it. The clause that stood here until today — the one asserting that this row fixed the assembled-minifilament fraction, quoted verbatim as the sentinel _ASSEMBLY_CLAIM in cell/nmii_molecules.py and deliberately NOT repeated in this file, so that restoring it here is what trips the refusal — is the reading the build does NOT take: nmii.areal_density (SOURCED, Nie 2015) already counts ASSEMBLED minifilaments and nmii.assembly_rate/nmii.disassembly_rate already fix the assembled fraction at ka/(ka+kd) = 0.5, so applying this row to the object count as well would reduce one population twice and would declare one fraction to be both 0.3 and 0.5. NEITHER VALUE WAS CHANGED to reconcile them — the readings were made disjoint and cell/nmii_molecules.assembled_population refuses the double count with the numbers. not in KB source_audit — register before SOURCED

**선언 수량:** Declaration explicitly selects head competence, rejects assembled-object-fraction interpretation and leaves the physiological value unresolved.

**코드 해석:** Uniformly selects round(f*owner_range_size) head owners independently within each isoform range. Selected heads can own a crossbridge relation; nodes/mass remain and object count is unchanged.

**분모·공간:** Each isoform owner range contains heads of allocated assembled plus dormant objects. Active competent heads require intersection with the initial/live object mask.

**세는 단위:** Represented individual head competence; not assembled fraction, duty ratio, force-bound fraction or bulk RLC phosphopeptide fraction.

**변환:** Q07, Q08

**정적 입력 의존:** `nmii.heads_per_side`, `nmii.isoform_iia_fraction`, `nmii.areal_density`, `nmii.assembly_rate`, `nmii.disassembly_rate`, `nmii.object_life`, `cell.seed`

**남은 차이와 한계:**
- RLC assay denominator and biochemical competence mapping are separate from this discrete head selection.
- Rounded competent-head metadata over all heads can differ from sum of per-isoform rounded owner counts; neither is necessarily the number of active bound heads.

**관측 연결에 필요한 것:** Measure phosphorylation site/stoichiometry and establish mapping to individual motor competence in the same assembled population.

**고정 코드:** `aleph/cell/nmii_molecules.py:101–116`; `aleph/cell/bonds.py:893–903`; `aleph/cell/build/nmii.py:233–263`; `aleph/cell/build/nmii.py:97–107`; `aleph/cell/nmii_molecules.py:151–216`

### `nmii.isoform_iia_fraction`

원본: **1.0 1 · EXAMPLE**

> NMIIA:IIB ratio — MCF7 unknown; 1.0 = all IIA. PI-GAP. READ (nmii-life lane, 2026-09-21) by cell/build/nmii: the isoform is assigned PER MINIFILAMENT (co-assembly of mixed bipolar filaments is real, but no row in this file gives a mixing rule, so a per-head draw would be an invented law), deterministically in cell.seed, and the IIB minifilaments' heads own a second crossbridge kind reading the crossbridge.iib.* rows below. At 1.0 no IIB head exists, the second kind is not built, and the build is the pre-2026-09-21 one bit for bit. not in KB source_audit — register before SOURCED

**선언 수량:** Declared NMIIA:IIB ratio becomes explicitly a per-minifilament assignment, with no mixed-object composition rule and no IIC population.

**코드 해석:** N_IIA=round(f*N_allocated); IIB is the remainder. The IIA prefix and initially assembled prefix overlap, so the initially assembled isoform ratio generally differs from the input allocated-object ratio.

**분모·공간:** All allocated minifilament objects, including dormant reserve; only modeled IIA and IIB.

**세는 단위:** Pure-isoform object label; no direct conversion from bulk heavy-chain/peptide abundance, mixed-object composition or cell-wide paralog shares.

**변환:** Q06, Q08

**정적 입력 의존:** `nmii.areal_density`, `nmii.assembly_rate`, `nmii.disassembly_rate`, `nmii.object_life`, `nmii.heads_per_side`, `cell.seed`

**남은 차이와 한계:**
- The source text notes real coassembly but code does not infer its mixing law.
- Initial alive/isoform prefix coupling matters even after a hypothetical abundance-to-object conversion. At f=1, this issue is invisible because all objects are IIA.

**관측 연결에 필요한 것:** Separate A/B/C heavy-chain abundance, per-object composition, object size and assembled/free populations. Observe initial live labels rather than substituting total allocation shares.

**고정 코드:** `aleph/cell/build/nmii.py:37–55`; `aleph/cell/nmii_molecules.py:219–241`; `aleph/cell/build/nmii.py:97–107`; `aleph/cell/build/nmii.py:233–263`

### `nmii.heads_per_side`

원본: **30 1 · EXAMPLE**

> PI decision 6 test point (no band ratified); Billington 2013 28, Melli 2018 / Tripathi 2021 ~30 per end; AFINES 10

**선언 수량:** Declared structural head number per pole; source mentions approximately 30 and multiple model/experimental contexts. It is not a competent-head count.

**코드 해석:** Integer H creates 2*H head nodes per allocated object; extra backbone and arm nodes are geometry subdivisions, not additional proteins or heads.

**분모·공간:** One pole of one allocated bipolar object; total heads use two poles.

**세는 단위:** Individual modeled head nodes. Two-headed myosin molecule equivalence requires an explicit structural/polarity mapping; not H molecules per side.

**변환:** Q07

**정적 입력 의존:** `nmii.areal_density`, `nmii.assembly_rate`, `nmii.disassembly_rate`, `nmii.object_life`, `nmii.rlc_phosphorylated_fraction`, `nmii.isoform_iia_fraction`, `nmii.n_backbone`, `nmii.arm_seg`

**남은 차이와 한계:**
- Structural head number does not determine active, phosphorylated, actin-bound or force-producing head number.
- A molecule estimate is not an independent head count; balanced polarity and two-head composition are additional conversion assumptions.

**관측 연결에 필요한 것:** Distinguish heads, two-headed molecules, poles and entire bipolar objects; record size distributions and active-state subset.

**고정 코드:** `aleph/cell/build/nmii.py:37–55`; `aleph/cell/build/nmii.py:114–128`; `aleph/cell/build/nmii.py:233–263`; `aleph/cell/bonds.py:893–903`

### `nmii.areal_density`

원본: **0.625 1/um^2 · SOURCED**

> Nie 2015 — the only DIRECT cortical NMII minifilament areal density in the corpus (16-21/um^2 band is a back-calculated GAP target)

**선언 수량:** Declaration calls this an assembled cortical minifilament areal density and describes the source as DIRECT. That source wording is preserved as a claim, not reverified here.

**코드 해석:** N_assembled=round(rho*4*pi*r_shell^2). The stationary-life model can allocate additional dormant objects; phosphorylation does not multiply this count.

**분모·공간:** Smooth mid-shell reference area 4*pi*r_shell^2, not wrinkled membrane area0, optical projected ROI area or cortex volume.

**세는 단위:** Initially assembled minifilament objects; not total heads or all soluble NMII molecules.

**변환:** Q06

**정적 입력 의존:** `cell.radius`, `cortex.thickness`, `membrane.mesh`, `erm.r0`, `nmii.object_life`, `nmii.assembly_rate`, `nmii.disassembly_rate`

**남은 차이와 한계:**
- Source object-detection/counting method and planar-versus-curved area need separate primary review; code comments repeating DIRECT/OBSERVED are not additional measurement evidence.
- The same areal density can map to different total allocated counts when object-life rate ratio changes.

**관측 연결에 필요한 것:** Record ROI projection, cortical location and detection/calibration definition; establish conversion to assembled objects on the modeled shell.

**고정 코드:** `aleph/cell/build/part.py:916–938`; `aleph/cell/build/nmii.py:37–55`; `aleph/cell/nmii_molecules.py:151–216`; `aleph/cell/build/nmii.py:233–263`

### `cell.radius`

원본: **7.5 um · SOURCED**

> MCF7 cell volume 1760 um^3 (BNID 115154, Gamcsik 1995 via Wagner 2011) -> sphere-equivalent R 7.49 um; photoacoustic sizing n=37. laws/cell_geometry.MCF7_GEOMETRY

**선언 수량:** Declared sphere-equivalent radius derived from a whole-cell volume; appended photoacoustic cohort wording is a distinct provenance chain.

**코드 해석:** Reference radius drives membrane surface and shell/nuclear construction. Pool volumes are taken from built surface volume0, not assumed to equal the analytic sphere after every geometry option.

**분모·공간:** One reference cell geometry; downstream areas/volumes must state their actual surface/compartment definitions.

**세는 단위:** Geometric length in µm, not volume, diameter or a local curved-surface distance.

**변환:** Q09, Q05, Q06, Q10

**정적 입력 의존:** `cell.nc_ratio`, `membrane.mesh`, `membrane.excess_area`, `cortex.thickness`, `erm.r0`

**남은 차이와 한계:**
- A radius obtained from population mean volume is not the same operation as averaging individual radii.
- The quoted source cohorts and all downstream concentrations are not thereby same-specimen observations.

**관측 연결에 필요한 것:** Retain original volume/diameter/radius observable, geometry assumption and cohort; pair with compartment volumes for concentration conversion.

**고정 코드:** `aleph/cell/build/membrane.py:30–64`; `aleph/cell/build/part.py:916–938`; `aleph/cell/build/envelope.py:17–22`; `aleph/cell/assemble.py:877–894`

### `cell.nc_ratio`

원본: **0.68 1 · SOURCED**

> nucleus:cell RADIUS ratio 0.68 +/- 0.08 — imaging flow cytometry n=2164 (PMC7000884); photoacoustic n=37 (10.1007/s10765-016-2129-y). laws/cell_geometry

**선언 수량:** Declaration says nucleus:cell RADIUS ratio, although N/C terminology elsewhere can denote area or volume.

**코드 해석:** R_nucleus=q*R_cell with 0<q<1; code uses the same linear ratio in placement maps.

**분모·공간:** Nuclear radius divided by cell radius; for matching spherical conventions also diameter ratio.

**세는 단위:** Dimensionless linear-size ratio, not nuclear/cytoplasmic volume ratio.

**변환:** Q09, Q10

**정적 입력 의존:** `cell.radius`, `cytoplasm_actin.gap`, `cortex.thickness`

**남은 차이와 한계:**
- q^3 is a nuclear/whole-cell volume fraction only for the same concentric spherical geometry; q^3/(1-q^3) is nuclear/cytoplasmic volume ratio under that assumption.
- Observed projected area ratios cannot be substituted without a stated geometry/model.

**관측 연결에 필요한 것:** Preserve measurement projection, numerator/denominator and paired cell/nucleus identity.

**고정 코드:** `aleph/cell/build/envelope.py:17–22`; `aleph/cell/build/part.py:772–800`; `aleph/cell/build/cytoplasm_actin.py:21–52`

### `cortex.thickness`

원본: **0.2 um · SOURCED**

> h_cortex ~200 nm — Salbreux 2012 TCB, Charras 2008 BJ, Clark 2013 BJ (KB-3.1 / KB-3.5)

**선언 수량:** Declared cortical thickness around 200 nm, with literature/context transfer remaining distinct from the chosen geometric shell.

**코드 해석:** Sets radial shell thickness h and shifts mid-shell radius by h/2; used in thin-shell volume, available motor depth and cytoplasmic band boundary.

**분모·공간:** Radial shell thickness around nominal mid-shell, not an optical profile width automatically.

**세는 단위:** Length in µm; affects area/volume/count transforms but is not itself a filament count or concentration.

**변환:** Q05, Q06, Q10

**정적 입력 의존:** `cell.radius`, `membrane.mesh`, `erm.r0`, `cytoplasm_actin.gap`

**남은 차이와 한계:**
- Finite optical resolution/profile interpretation and target-cell transfer require separate evidence.
- Thin-shell volume is an approximation using the nominal shell, not an integration over the wrinkled surface.

**관측 연결에 필요한 것:** State thickness inference method, location and cell state; match its geometric convention before defining shell water.

**고정 코드:** `aleph/cell/build/part.py:916–938`; `aleph/cell/build/nmii.py:37–55`; `aleph/cell/build/cytoplasm_actin.py:21–52`

### `cytoplasm_actin.contour`

원본: **2.0 um · EXAMPLE**

> by analogy with KB-3.18 cortical band 1-10 um; cytosolic filament length unsourced

**선언 수량:** Declared analogy to a cortical length band; cytosolic filament length explicitly unsourced.

**코드 해석:** Fixed nominal arc contour divides requested total polymer length to obtain rounded initial filament count; round(contour/seg) sets arc resolution. Mapped geometry and optional integer-rise preparation can change realized rest contour.

**분모·공간:** One initial cytoplasmic filament arc within the shell-to-nucleus band; does not define soluble G-actin pool.

**세는 단위:** Filament contour length, not a monomer length, persistence length or measured population length distribution.

**변환:** Q10

**정적 입력 의존:** `cytoplasm_actin.f_actin_conc`, `cytoplasm_actin.seg`, `cytoplasm_actin.gap`, `cell.radius`, `cell.nc_ratio`, `cortex.thickness`, `membrane.mesh`, `erm.r0`, `actin_chem.monomer_rise`

**남은 차이와 한계:**
- Polymer count conversion uses stored 370 subunits/µm, whereas explicit rise preparation uses the monomer_rise input; they must not be silently treated as identical algebra.
- Nominal arc contour, chord-summed built rest length, mapped contour and prepared integer-rise length are distinct recorded quantities.

**관측 연결에 필요한 것:** Measure cytoplasmic filament lengths and polymer concentration in the same compartment; retain distributions and preparation-stage definitions.

**고정 코드:** `aleph/cell/build/cytoplasm_actin.py:21–52`; `aleph/cell/build/cortex.py:50–63`; `aleph/cell/build/part.py:772–800`; `aleph/cell/growth_preparation.py:15–60`

## 변환과 제한

### Q01 · Soluble concentration to integer count

`Vg=surface.volume0[membrane]-surface.volume0[envelope]; u=1/(602.214*Vg); integer(x)=floor(x+0.5); N=integer(c/u).`

단위: c:uM; Vg:um^3; u:uM per monomer/unit; N:count

- No fluid.cytosol_water_fraction multiplier in this route.
- For buffers and CP, count unit means represented protein equivalents.
- Count rounding is half-up here, unlike Python round used for motor object counts.

### Q02 · Finite soluble buffer partition

`T=Gtotal-Gfree; solve sum_i B_i*a/(Kd_i+a)=T; bound_i=B_i*a/(Kd_i+a). Round total/free and buffer counts first; bound_total=Ntotal-Nfree; PFN bound count is clamped to [max(0,bound_total-NT), min(bound_total,NP)]; thymosin bound is the remainder.`

단위: All concentration terms and auxiliary a:uM; integer inventories:counts

- Requires 0<=Gfree<=Gtotal and total-free<=sum B.
- a is an auxiliary allocation activity, explicitly not imposed Gfree or an equilibrium assertion.
- Initial soluble actin species are ATP-labelled; existing polymer is separate.

### Q03 · Available capper before and after end preparation

`N_CP_initial=floor(c_CP/u+0.5); N_CP_free_after=N_CP_initial-N_CP_on_initial_tips.`

단위: CP counts; c_CP:uM

- Conditional finite chemistry path.
- Legacy retired route k_cap_on*c_CP is not a finite inventory and refuses normal use by default.

### Q04 · Cofilin capacity versus cut coefficient

`N_cofilin=c_cofilin*602.214*Vg*f_water; P_served=sum(rest_contour_f/delta_f over reserve-served families); decoration_ceiling=N_cofilin/P_served; cut_coefficient=severing_rate*decorated_fraction.`

단위: N/P:counts; decoration_ceiling:dimensionless; cut coefficient:1/(um*s) as declared by the inspected function

- Ceiling is infinity if no protomers; decorated fraction separately constrained to [0,1].
- The ceiling arithmetic does not round N into a dynamically consumed protein pool.
- No binding isotherm or concentration-to-occupancy inference is established.

### Q05 · Cortical Arp2/3 pool

`r=R-sagitta-erm.r0-h/2; sagitta=a_mesh^2/(6R); Vs=4*pi*r^2*h; Vsw=f_water*Vs; Vw=f_water*Vg; u_bath=1/(602.214076*Vw); N_Arp=floor(c_Arp*602.214076*Vsw+0.5); activity_Arp=Vw/Vsw; c_realized=N_Arp*u_bath*activity_Arp.`

단위: R,r,h:um; volume:um^3; c:uM; N:intact-complex count; activity:dimensionless

- Thin-shell nominal geometry, not an exact wrinkled-shell integral.
- For positive site count, per-site coefficient=k_b0*602.214076*Vsw/n_sites; total propensity=k_b0*N_free*n_free_sites/n_sites.
- This makes the per-complex versus per-NPF source mismatch visible; no conversion is invented.

### Q06 · Assembled versus allocated NMII objects

`Na=int(round(rho*4*pi*r^2)); if object_life off: Ntot=Na; else ratio=kd/ka if ka>0 else 0; pa=1/(1+ratio); Ntot=int(round(Na/pa)); Ndormant=Ntot-Na.`

단위: rho:1/um^2; Na/Ntot:objects; ka,kd:1/s

- Finite nonnegative rates required; ka=0,kd>0 refused; ka=kd=0 yields ratio0 and pa1 in build arithmetic.
- For ka+kd>0, pa=ka/(ka+kd); exact two-state transition uses exp(-(ka+kd)*dt).
- Python round supplies ties-to-even integer rounding; these are template-derived counts, not observed abundance.

### Q07 · Structural versus competent motor heads

`N_heads=2*H*Ntot; per isoform owner range j: N_comp_j=int(round(f_RLC*2*H*N_j)); selected owner IDs drawn uniformly without replacement.`

단위: H:head nodes per pole; N_heads and N_comp:head counts

- Includes allocated dormant objects. Active competent heads require intersection with alive-object mask; actin-bound/force-bearing heads require further state observations.
- Metadata n_heads_competent=int(round(f_RLC*N_heads)) need not equal the sum of separately rounded isoform selections.
- A structural two-headed-molecule conversion is an extra model/measurement assumption.

### Q08 · Allocated isoform share versus initial live share

`NA=int(round(f_A*Ntot)); NB=Ntot-NA; IIA labels original indices i<NA; initially alive iff i<Na. Therefore NA_alive=min(NA,Na); NB_alive=max(0,Na-NA); fA_alive=min(NA,Na)/Na for Na>0.`

단위: Object counts and dimensionless fractions

- Exact integer consequence of the inspected prefix logic, not an empirical relation.
- For ka=kd>0 with life enabled, Ntot=2Na; condition f_A=0.5 implies NA=Na and all initially live objects are IIA despite 50% total allocation. This is symbolic bookkeeping, not a simulated specimen or parameter recommendation.
- When f_A=1, all allocated/live objects are IIA. No IIC or mixed-object heavy-chain mapping exists here.

### Q09 · Linear nuclear ratio and reference sphere

`R_from_volume=(3V/(4*pi))^(1/3); Rn=q*R. Only under matching concentric spheres: Vn/Vcell=q^3 and Vn/Vcytoplasm=q^3/(1-q^3).`

단위: Lengths:um; volumes:um^3; ratios:dimensionless

- Actual pool conversion reads built surface volume0.
- The radius-from-volume relation is the declared source transformation, not a newly inspected primary assay.
- Cohort means and nonlinear transformations cannot be freely interchanged.

### Q10 · Cytoplasmic polymer census and contour

`rin=q*R+gap; rout=r-h/2-gap; Vband=(4*pi/3)*(rout^3-rin^3); Lrequested=c_F*602.214/370*Vband; Nfil=int(round(Lrequested/contour)); nseg=int(round(contour/seg)); arc_step=contour/nseg.`

단위: c_F:uM monomer equivalents; Vband:um^3; L/contour/seg:um; 370:subunits/um; Nfil:filaments

- Geometric annulus concentration convention, no water multiplier in this census.
- Need rout>rin and at least one filament; at least 3 nodes per arc.
- Chord-summed/mapped/prepared rest lengths may differ from nominal contour; optional whole-rise preparation rounds realized rest length to monomer_rise units.
- Polymer inventory is independent of declared soluble Gtotal and is not silently subtracted from it.

## 고정 소스 파일

| 파일 | SHA-256 |
|---|---|
| `aleph/cell/assemble.py` | `da13bf88decb033fdeec51a533dcc87f8926c882d4f320446e117e9bf9ea13bd` |
| `aleph/cell/bonds.py` | `ec55962fa8f1d41573824ea57ee9cb65a7f1cc38117128f94d9be2494a1806e7` |
| `aleph/cell/build/cortex.py` | `57e8151bef69cdb006ef989ad197b0dab1388f5860a61a172da6cd83fe7eac06` |
| `aleph/cell/build/cytoplasm_actin.py` | `dad9d899f742b9a38dadfa52e86dc8d3ecdedbe525b57d5d99b8135e7c33ab47` |
| `aleph/cell/build/envelope.py` | `511efe828f23363d3ad60f6dd05e5ef86e2018e3c0b98cd42bae8f60f6a9d669` |
| `aleph/cell/build/membrane.py` | `66d2a5110aa563da64d6d15fbef540a954ecbebb343e5fcc29d94324ba6f35aa` |
| `aleph/cell/build/nmii.py` | `03248ec35111c91ff57f077dd20c544da52ac3947c8308a5ac08b5731dcf337f` |
| `aleph/cell/build/part.py` | `3d5fbf0a6d82a250149b8d4a62ea4bc9376cb6ddf06d17e9b69b6fda380c4e0a` |
| `aleph/cell/growth_chemistry.py` | `98e096ef519f16e97d9fc734dbf632b3a951b302def4d1b42f485c210af817aa` |
| `aleph/cell/growth_preparation.py` | `65a85ec06a84485647db42af8d7dd0f0a2a6c2b1228e40282335c6734a8655d6` |
| `aleph/cell/nmii_molecules.py` | `1570ed3fd1c40a55d5199f2d96774976d211c873e9403df7c3971b92c5757923` |
| `aleph/cell/nucleation.py` | `4c03f9a83f92b1d266ed420336e9562e170feeb6c097bea40278a81cef435517` |
| `aleph/cell/nucleotide_composition.py` | `d57be7d9c1a62a8ee0a33da1069e92e7dca7e45086a3210be02491485acbcbcd` |
| `aleph/cell/severing.py` | `8d6d9c55f78424d5d65fc304e01ed5fbabff09a6adb5cf0d4f67b534d6eb0da3` |
| `aleph/cell/spec.example.toml` | `f288ede3105affb05bb19d3e57eeb1a0c16138f28288acbe0ebcf0913daa52a7` |
| `aleph/cell/unit_chemistry.py` | `8737ccf27a039b4621c2cd9757c76a7af48b057480486eb27072b96be1a2f70f` |
| `aleph/physics/object_life.py` | `38ba5f79f8559d6c7aae19a9507d75645b16f8eaf496f9388b3e69c583dcf090` |

## 한계

- Source semantic definitions here describe the unchanged declaration wording and the quantity mapping needed by code; primary-source numerical/assay adjudication belongs to the independent evidence packets.
- Only enumerated source files and shown spans were read. Literal .get/.get_int/.entry extraction is bounded; f-strings, aliases, helper arguments, external drivers and archived driver copies are not an exhaustive call-path analysis.
- Geometry, pool and object constructors were inspected as text only. No build, physics, prior or parameter runtime was imported or executed.
- No claim is made about current live-root semantics, driver overrides, archived effective values or native observables. Cross-revision and run-context packets are separate.
- Candidate reference identities were not created or repaired; unresolved declaration references are left unresolved.
- No source upgrade, mechanistic decision, parameter/prior change or automatic cross-version equality is proposed.

검증: 17개 원본 선언 대조, dependency 이름 확인, Git 파일·span 해시 확인, 고정 KB 원본 행 대조. 시뮬레이션이나 prior 런타임은 실행하지 않았습니다.
