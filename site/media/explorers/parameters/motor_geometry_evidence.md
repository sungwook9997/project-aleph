# Motor geometry, cargo and transport allocation: primary-source review

**Advisory source comparison only.** Frozen base `24b3a44cbd33dd34cde338483be19638aec1be1c`; 15 valued top-level inputs, all `EXAMPLE`. No value, tag, prior, model, source-audit record or training eligibility changed. The accompanying JSON preserves exact declarations, prior/location snapshots, KB comparison rows, UID/DOI/audit pairs, source and code spans, and immutable earlier reviews.

검토 대상은 기존 motor_population 6개를 제외한 NMII 11개, cargo 2개, transport 2개다. `nmii.arm_seg`는 값 선언이 아니라 `resolution.spacing`에 묶인 문맥 입력으로만 보존했다. 9개 원문 카드는 분자 구조, 필라멘트 이미지, 계산 탄성, 합성 화물 관측과 수치 구현을 구분한다. 현재 입력의 공동 fit, 공분산, 독립 관측쌍 또는 신경망 label은 생성하지 않았다.

## Current rows and observation definitions

| Current input | Preserved value | Source mapping or remaining gap |
|---|---:|---|
| `nmii.backbone_length` | 0.301 um | Billington의 NMIIA **전체 필라멘트 윤곽** 301 nm와 일치한다. 중앙 bare zone과는 다른 길이다. |
| `nmii.backbone_radius` | 0.008 um | 입력 반지름은 16 nm 지름에 해당한다. 원문의 bare-zone 폭 11.2 nm와 관측 정의 및 시료 조건이 다르다. |
| `nmii.head_offset` | 0.2 um | 코드에서 anchor부터 **옆 방향** 머리 변위다. bare-zone 길이나 분자 lever 길이로 대체 해석할 수 없다. |
| `nmii.arm_radius` | 0.002 um | 선언의 “약 2 nm across”와 입력의 2 nm **radius**가 같은 정의인지 미해결이다. |
| `nmii.head_radius` | 0.005 um | 약 10 nm motor-domain 묘사와 drag/mass용 단일 반지름의 연결 근거가 미확보다. |
| `nmii.backbone_EA` | 44000 pN | 선언에 actin-like 가정이 있다. 인간 NMII 다중 tail backbone 실측 근거는 찾지 못했다. |
| `nmii.backbone_kappa` | 1 pN um² | 선언된 stiff-rod 계수이며 현재 수치의 직접 근거는 미확보다. |
| `nmii.arm_kappa` | 0.01 pN um² | 분자 S2의 끝점 변위 stiffness와 단위·경계조건이 다르다. |
| `nmii.lever_arm` | 0.0075 um | Howard 2001의 정확한 쪽수와 7.5 nm의 1차 측정 계보가 미확보다. |
| `nmii.n_backbone` | 14 | 수치 노드 수다. 필라멘트당 myosin 분자 수 또는 영상 해상도가 아니다. |
| `nmii.object_life` | 1 | 0/1 선택자다. 1초 또는 측정된 수명을 의미하지 않는다. |
| `cargo.radius` | 0.06 um | Jiang의 명목상 약 120 nm 지름 합성 리포솜 규모와 연결된다. 세포 내 화물 분포와 동일하지 않다. |
| `cargo.density` | 1 pg/um³ | 수용액 밀도 대용값이다. 리포솜 flotation 과정은 이 밀도의 측정이 아니다. |
| `transport.kinesin_cargo_fraction` | 0.8 | 선언한 generic motor object 전체 수 중 cargo 역할 비율이다. 해당 세포 분율 관측은 미확보다. |
| `transport.dynein_cargo_fraction` | 0.6 | 같은 수치 분모의 역할 배정이다. 정제 DDB의 활성화 실험에서 얻은 분율이 아니다. |

미확보는 거짓 판정이 아니다. 모든 target prior의 기존 `UNASSIGNED` 상태와 원본 수치는 JSON에 그대로 남겼다.

## Nine bounded source cards

- **MG01 · Billington 2013, Fig. 5.** Human heavy chain과 bovine/chicken light chain을 Sf9에서 발현한 음성 염색 EM이다. ATP가 없는 150 mM KCl 조건의 paralog당 100개 필라멘트에서 NMIIA 총 윤곽 301 ± 24 nm, bare-zone 길이 167 ± 19 nm, 폭 11.2 ± 2.4 nm를 보고한다(SD). 전체 윤곽을 coarse backbone으로 옮기는 정의는 별도 판단이다. EM은 실온이며 다른 ATPase assay의 25°C를 이 값에 붙이지 않았다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC3829186/)
- **MG02 · Liu 2017, Table 2.** Heavy chain은 human NM2A/B와 mouse NM2C이고, human RLC·mouse ELC를 Sf9에서 함께 발현했다. ATP와 RLC phosphorylation별 기하를 구분한다. 표에는 NMIIB baseline bare-zone 151.2 ± 18.6 nm, n=78이 실제 있다. 따라서 SE548의 “NM2B baseline … lacks a bare-zone value”라는 과거 note는 원문과 다르며 원본 note를 삭제하지 않았다. 표의 치수별 n이 다르고 ±의 SD/SEM 종류는 접근한 본문에서 명확하지 않았다. 괄호 속 Billington 수치는 재사용 기록이다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC5559010/)
- **MG03 · Melli 2018.** 정제 human NM2A/B의 필라멘트 운동과 혼합 조성 실험이다. 서론의 약 300 nm·30 myosin molecules는 앞선 문헌을 인용하므로 새로운 기하 관측으로 세지 않는다. 무거운 사슬 두 개와 light chain으로 이루어진 myosin molecule, bipolar filament, 수치 노드의 단위를 구분했다. 첫 결과 문단의 1 mM ATP와 일반 Methods의 2 mM ATP도 하나의 조건으로 합치지 않았다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC5829915/)
- **MG04 · Heissler 2026, Fig. 1/Methods.** Human NM2B의 접힌 10S 분자 구조이며 약 532 Å 길이, 181 Å 폭을 기술한다. 4.10–9.84 Å는 reconstruction 해상도이며 분자 집단의 SD가 아니다. ATP·고정 처리 및 composite modeling 조건이 존재한다. 최종 DOI와 2025 preprint DOI를 분리하고 같은 연구의 버전으로 보존했다. 이 구조로 bead radius, 각 stiffness 또는 온전한 coarse object 수명을 측정했다고 하지 않는다. [Final primary article](https://www.nature.com/articles/s41467-026-74674-w)
- **MG05 · Adamovic 2008.** 약 10 nm scallop muscle S2에 대한 **출판된 계산**이다. 300 K 분자동역학·normal modes와 rod 가정으로 60 nm S2에 환산한 축 stiffness 60–80 pN/nm, 측방 stiffness 약 0.010 pN/nm를 보고한다. 이것은 `EA` 또는 `kappa` 그 자체가 아니며 인간의 여러 tail로 구성된 필라멘트로의 전이도 미확인이다. SE552의 audit `OK`와 anchor `CHECK`를 모두 보존했다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC2367198/)
- **MG06 · Uyeda 1996.** 공식 초록에서는 Dictyostelium neck-length 변이와 in-vitro sliding의 관계를 확인했다. 스캔 전문 및 정확한 Methods는 확보하지 못했으므로 인간 NMII의 7.5 nm, 온도, ATP 조건을 확인한 것으로 기록하지 않았다. Howard 책에서 이 1차 실험으로 이어지는 수치 계보도 미해결이다. [Official primary abstract](https://pmc.ncbi.nlm.nih.gov/articles/PMC39560/)
- **MG07 · Jiang 2025, Fig. 1B/2.** Drosophila kinesin-1 K406 construct와 합성 리포솜의 실험이다. DLS fit은 지름 μ=123 ± 2 nm, σ=48 ± 2 nm이고 두 ±는 **fit 95% CI**다. 그래프의 점별 오차는 세 시료의 SE다. 운동과 GFP motor-density 측정은 서로 다른 ATP/AMPPNP 조건과 n을 사용하므로 같은 화물별 pairing으로 읽지 않았다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC12256910/)
- **MG08 · McKenney 2014.** 정제 dynein–dynactin–adapter 복합체의 활성화·운동을 관측한다. 전체 세포 dynein 중 cargo 비율 0.6의 측정이 아니다. 기존 TM08과 같은 논문이며 새로운 독립 증거로 세지 않는다. [Primary article](https://pmc.ncbi.nlm.nih.gov/articles/PMC4224444/)
- **MG09 · Kapitein 2005.** 공식 초록은 homotetrameric Eg5의 두 microtubule 간 sliding 역할을 다룬다. Kinesin-1 cargo dimer와 같은 generic pool 또는 0.8 배정 분율을 관측하지 않는다. 전문 Methods 미확보로 construct·종·온도·ATP 세부조건은 미확인으로 남겼다. [Publisher abstract](https://www.nature.com/articles/nature03503)

## Relationships that can be shown without promoting evidence

7개 관계는 다음 경계를 설명한다. 원문의 공동 추정이 있더라도 그것은 **원문 수량의 관계**이며 현재 입력들의 fit membership이 아니다.

1. 총 윤곽·bare-zone 폭·옆 방향 offset·노드 수를 서로 다른 좌표와 관측 단위로 연결한다.
2. 균일한 작은 변형 rod에서 `EA/L`과 `3EI/L³`는 길이 및 경계조건을 전제로 한 비교식이다. 현재 builder의 계수와 backbone constraint 표기를 함께 보존했으며 실제 native force 기여는 검증하지 않았다.
3. 원자 구조의 폭과 bead의 drag/mass 반지름을 분리한다. 현재 mass 배정은 끝점별 반지름과 반쪽 segment cylinder를 사용하므로 head 하나의 구형 분자 질량으로 읽지 않는다.
4. `stroke = 2L sin(theta/2)`는 강체 lever와 특정 변위 좌표를 가정한 기하 일관성 관계다. 이 값으로 실제 step 크기나 원문의 공동 fit을 선언하지 않는다.
5. 접힌 분자, 작은 oligomer, 조립된 필라멘트와 coarse dormant object를 분리한다. `object_life`와 두 상태 정상상태 reserve 식을 실측 수명으로 승격하지 않는다.
6. 화물의 `rho × (4/3)πr³`는 균일 구의 질량 환산이다. DLS 지름 오차와 수용액 밀도 대용값은 독립 실측 한 쌍이 아니다.
7. 현재 cargo count는 각 모터 object count에 역할 분율을 곱해 반올림한 합이다. 화물당 모터 relation 하나인 현재 구조와 여러 모터가 달린 원문 리포솜을 별도 단위로 남긴다.

## Provenance, access limits and validation

과거 broad 49 SOURCED, 270 EXAMPLE, uncertainty 41행 검토의 immutable 파일 SHA를 보존했다. 현재 범위에 직접 해당하는 과거 P01/P02/P13 및 review groups, MP05/TM08/CB06은 총 16개 JSON pointer·canonical hash로 연결했다. 그 중 실제 source-context 재사용을 새로운 독립 관측으로 세지 않는다.

Jiang의 [공개 데이터 저장소](https://scholarsphere.psu.edu/resources/a4409f2b-40e4-4475-9e44-86d4dab8c87b)에서 XLSX, CSV ZIP, README 목록은 확인했다. 다운로드는 traffic-control HTML을 반환했으므로 raw 열·ID·pairing을 확인하지 못했다. 본문 및 실패 payload는 ignored local cache에만 남겼다. 이 패킷에는 source data나 논문 코드 실행 결과가 없다.

Host-only metadata 검사는 15개 원본 선언·prior, 9개 source card, 16개 역사 snapshot, 7개 관계, 10개 source-estimation group, 8개 고정 코드 span, 27개 local cache record의 참조 및 SHA를 확인했다. 신규 현재 fit group 0, 공분산 0, 학습 label 0, 값·출처 변경 0이다. 이는 native 물리 검증이나 PI 승인 기록이 아니다.
