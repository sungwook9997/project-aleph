# Membrane channel inputs: structure, mass and preparation

**Advisory source comparison only.** Frozen base `24b3a44cbd33dd34cde338483be19638aec1be1c`; `membrane.channel.*`의 값 선언 6행을 검토했다. **EXAMPLE 5행과 SWEPT 1행**의 값·range·prior·tag를 그대로 보존했다. `channel_density`와 `channel_population_enabled`는 보조 문맥이다. 새 측정 정답, 현재 입력의 공동 fit, 공분산 또는 학습 label은 만들지 않았다.

## 여섯 입력의 의미

| 입력 | 보존한 값 | 확인된 의미와 남은 공백 |
|---|---:|---|
| `excluded_lipid_area` | 0.0001 µm² = 100 nm² | 채널 하나가 대체하는 지질 질량을 계산하는 면적이다. dome 전체 면적, 주변 막 변형 영역, gating 중 투영 면적 변화와 다르다. 현재 수치의 직접 측정은 미확보다. |
| `hydrodynamic_radius` | 0.01 µm = 10 nm | 질량을 가진 중심 노드에 부여하는 단일 반지름이다. 구조의 곡률 반경·dome 입구 반경과 크기가 비슷해도 유체 저항 보정이 성립한 것은 아니다. |
| `initial_closed_fraction` | 0.7 | C/O/I 초기 준비 확률의 C 성분이다. 닫힌 cryo-EM 구조를 관찰했다는 사실은 이 분율의 측정이 아니다. |
| `initial_open_fraction` | 0.02 | 준비 확률의 O 성분이다. I의 0.28은 나머지 산술값이며 정상상태 계산이나 native occupancy가 아니다. |
| `insertion_normal_stiffness` | 10000 pN/µm, **SWEPT** | 현재 막 표면으로부터의 거리 제곱에 곱하는 confinement 계수다. Piezo의 gating stiffness 또는 이탈 장벽 실측값이 아니다. |
| `molecular_mass` | 860370 Da | 사람 canonical sequence의 286790 Da에 trimer 가정을 곱한 산술값이다. 세포 내 완성 채널의 glycoform·isoform·결합 지질 질량 분포는 미확보다. |

## 다섯 출처 카드

- **MC01 · Ge 2015.** Mouse Piezo1을 HEK293T에서 발현하고 정제한 구조 연구다. GST를 제거하거나 Flag를 붙인 시료의 native gel에서 약 900 kDa를 보고하고 EM 대칭성으로 trimer를 뒷받침한다. GST에 따른 복합체 이중화와 비정상적 gel migration도 본문에 명시한다. 약 900 kDa를 정확한 human peptide 질량 측정으로 읽지 않았다. [원문](https://www.nature.com/articles/nature15247)
- **MC02 · Guo–MacKinnon 2017.** 정제한 mouse Piezo1의 닫힌 구조는 dome 입구 지름 약 18 nm, 깊이 약 6 nm다. 이상화한 막 중간면의 곡률 반경은 10.2 nm, 곡면 면적 400 nm², 투영 면적 280 nm²다. 완전히 평평해진다는 가정에서 나온 120 nm²는 투영 면적의 변화다. 원문의 lateral-tension gating 가설은 현재 중심 노드의 normal confinement 계수를 측정하지 않는다. [원문](https://elifesciences.org/articles/33660)
- **MC03 · UniProt Q92508.** 공식 REST 기록은 human canonical sequence 2521 aa, 질량 필드 286790 Da를 제공한다. 조회한 entry version은 192, sequence version은 4이며 sequence 갱신일은 2011-01-11이다. 세 복사본의 합은 현재 선언과 일치한다. Glycosylation 주석은 존재하지만 native glycoform의 점유율·추가 질량을 이 숫자에 추정해 더하지 않았다. [공식 기록](https://rest.uniprot.org/uniprotkb/Q92508.json)
- **MC04 · Haselwandter–MacKinnon 2018.** 앞선 구조 6B3R을 재사용한 막역학 연구다. 모델 중간면에서 약 20%는 단백질, 80%는 지질이며 dome 면적은 약 390 nm²로 둔다. `0.2 × 390 ≈ 78 nm²`는 그 정의를 따른 조건부 산술이며 현재 100 nm²의 검증값이 아니다. 이 논문의 *membrane footprint*는 dome 바깥에서 변형된 지질막이다. 2017년의 약 400 nm²와 별도 독립 측정쌍으로 세지 않았다. [원문](https://elifesciences.org/articles/41968)
- **MC05 · NIST CODATA 2022.** 원자 질량 상수는 `1.66053906892(52) × 10⁻²⁷ kg`이다. kg→pg 단위 환산으로 코드의 `1.66053906892 × 10⁻¹² pg/Da`와 일치한다. kg로 표시한 이 상수는 표준 불확도를 갖는 계량 값이며, 생물학적 질량 prior를 제공하지 않는다. [공식 값](https://physics.nist.gov/cgi-bin/cuu/Value?u)

MC01–05의 DOI/공식 기록은 이 고정 KB의 등록 출처와 일치하는 행이 없으므로 `unregistered_in_saved_snapshot`을 유지했다. 외부 논문·공식 기록의 존재와 현재 입력값을 뒷받침하는 근거는 별개다.

## 고정 코드에서 확인한 관계

1. **질량과 면적은 별도 입력이다.** 채널 수는 built membrane 삼각형 면적에 density를 곱한 뒤 `floor(x + 0.5)`로 정한다. 제거하는 지질 질량은 `N × A_excluded × areal_density`, 추가하는 단백질 질량은 `N × M_Da × u_pg`다. 제거량은 host face의 barycentric 가중치로 분배하고, 기존 노드 질량이 0 이하가 되면 거부한다. `A_excluded = πr_hydro²`라는 관계는 이 경로에 없다.
2. **준비 확률과 실현 상태는 다르다.** `population_plan`은 C/O/I 확률로 개별 상태를 표본추출하므로 유한 개수에서 정확히 70%/2%/28%를 강제하지 않는다. 확인한 `append_channel_nodes`는 위치·질량·반지름·face를 보존하지만 반환된 `state` 배열을 그 table에 복사하지 않는다. 이 caller는 gating chemistry를 켜지 않는다고 명시한다. 전체 외부 호출경로나 실제 실행을 조사했다는 뜻은 아니다.
3. **Normal confinement는 gating과 다른 역할이다.** 고정 법칙의 `E = ½kd²`에 선언값과 4 nm 변위를 넣으면 `0.08 pN·µm`, 310 K에서 약 **18.69 kBT**다. 선언의 “약 20 kBT”를 설명하는 산술이며 새 실측값이 아니다. 삼각형 내부에서는 normal 방향이고 edge·vertex에서는 normal cone과 비매끄러운 전환의 한계가 있다.
4. **스위치는 실행 기록이 아니다.** 고정 템플릿의 `channel_population_enabled=0`을 override 없이 해당 분기까지 사용하면 append 전에 반환한다. 이것은 실제 native run이 채널을 사용하지 않았다는 증거가 아니다.

## 추적 가능성과 한계

JSON은 6개 선언·prior·range·facet, 9개 고정 Git 코드 구간, 10개 역사 기록 및 49 SOURCED·270 EXAMPLE·41 uncertainty 검토의 immutable 파일 pin을 보존한다. 역사 기록은 동일 출처의 재검토이며 새로운 독립 근거로 세지 않는다. 원문/공식 기록 9개 파일과 추출문 구간·JSON pointer를 SHA256으로 연결했다.

Publisher eLife의 빈 응답과 PMC의 browser challenge는 실패 payload로만 기록했다. Guo와 Haselwandter의 읽기 근거는 별도로 확보한 Europe PMC의 원문 JATS XML이다. Ge publisher 본문, UniProt REST 및 NIST 표는 원본 bytes를 보존했다. 논문이나 외부 모델의 코드를 실행하지 않았고, 물리·prior runtime도 import하지 않았다.

현재 입력의 실제 채널 상태, 보정된 drag radius, MCF7 완성 단백질 질량, 정확한 지질 제외 면적, insertion 계수의 실측 근거는 여전히 미확보다. 제시한 식과 출처 연결은 설명·검토용이며 기전 선택이나 수치 채택의 승인이 아니다.
