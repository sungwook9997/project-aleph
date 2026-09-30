# 남은 14개 동역학 입력의 근거와 관측량

고정 기준은 `24b3a44cbd33dd34cde338483be19638aec1be1c`이다. ATP/ADP actin 양끝 on/off 8개와 NMIIB 6개, 총 **14행(9 SOURCED, 1 SWEPT, 4 EXAMPLE)**을 검토했다. 원래 선언·prior·태그는 보존했다. 이 기록은 `advisory_not_pi_adjudicated`이며 현재 관측 정답·학습 라벨·공분산·공동 적합·모델 변경을 승인하지 않는다.

## 관측값과 입력의 차이

**Pollard의 8개 중심값은 원문의 elongation 회귀값과 일치한다.** 정제 rabbit skeletal actin, Limulus sperm acrosomal nuclei, 22°C 실험이다. on은 농도 대비 기울기, off는 절편으로 추정한다. Table I의 ATP SD와 ADP C/D 평균을 같은 분산 자료로 다루지 않는다. Table I/초록의 EGTA 1 mM와 Fig.5의 1.1 mM는 서로 다른 원문 위치의 조건이다. 310 K의 세포 입력으로 옮기는 온도·단백질·환경 전이는 해결되지 않았다. [Pollard 1986](https://pubmed.ncbi.nlm.nih.gov/3793756/)

`actin_chem.k_on_barbed_atp`의 3.4–12.3 범위는 Table II의 연구 C/B 양끝값과 연결되지만 **두 연구 모두 EM/acrosomal-process 방법**이다. 현재 선언의 cross-method라는 표현은 범위를 정확하게 설명하지 않는다. 이 범위는 선택된 연구 간 비교를 사용하는 sweep이며 SD·SEM·신뢰구간이 아니다. 원래 값과 범위는 변경하지 않았다.

**Pointed ATP off 0.8/s는 상태별 미시 속도와의 동일성이 미해결이다.** Fujiwara 2007은 0.8을 겉보기 절편으로 설명하고, 세부 nucleotide/neighborhood 모델의 intrinsic off와 구분한다. 논문의 0.16/s는 detailed-balance를 위한 모델 가정이다. 이 검토는 0.16을 대체값으로 제안하지 않는다. 해당 DOI는 frozen KB에 없으므로 primary를 읽었어도 candidate/ineligible이다. 기존 AK01과 같은 논문이며 새 독립 관측으로 세지 않는다. [Fujiwara, Fig.5 및 Pointed end reactions](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885587/)

**NMIIB 0.38/s와 5.3 nm는 서로 다른 근거 역할이다.** 0.38±0.09/s는 Wang 2003의 actin-bound S1 mantADP ATP-chase 값이고 Kovács 2007이 인용한다. HMM unloaded 0.27±0.06/s나 free S1 0.48±0.11/s와 합치지 않는다. Wang Methods는 SD, Table I는 SE라고 하므로 그 충돌을 남긴다. Kovács Table 1의 SEM·n=3–9 표기만으로 이전 연구의 표본과 오차정의를 확정하지 않는다. [Wang, Table I·ADP experiments](https://doi.org/10.1074/jbc.M302510200), [Kovács, Table 1](https://pmc.ncbi.nlm.nih.gov/articles/PMC1885822/)

5.3 nm는 HMM의 약 12배 slowing과 **가정한 2 pN·310 K**를 `x=kBT ln(12)/F`에 넣어 얻는 5.3177 nm의 반올림이다. 실제 HMM Table 1 중앙값의 비는 0.27/0.023≈11.739이다. Source Table 2는 smooth-muscle stiffness와 Bell distance를 가정하여 load를 계산하므로, 독립 측정 2 pN으로 이 Bell length를 검증한 것이 아니다. `f_char≈0.80486 pN`도 같은 식의 종속 결과다. S1 baseline과 HMM strain ratio의 construct 차이도 남긴다. IIB prior spread 0.15는 IIA의 두 branch 차이에서 물려온 것으로 NMIIB 측정 오차가 아니다.

## 14행 판정표

| 정확한 이름 | 보존한 값 | 근거 역할 / 남은 문제 |
|---|---:|---|
| `actin_chem.k_off_barbed_adp` | 7.2 1/s | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `actin_chem.k_off_barbed_atp` | 1.4 1/s | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `actin_chem.k_off_pointed_adp` | 0.27 1/s | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `actin_chem.k_off_pointed_atp` | 0.8 1/s | Pollard 겉보기 off 절편; 현재 terminal-state microscopic off와 동일성 미해결 |
| `actin_chem.k_on_barbed_adp` | 3.8 1/(uM.s) | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `actin_chem.k_on_barbed_atp` | 11.6 1/(uM.s) | Pollard 회귀 중심값; 3.4–12.3은 연구 간 sweep, 동일 EM 방법의 양끝 |
| `actin_chem.k_on_pointed_adp` | 0.16 1/(uM.s) | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `actin_chem.k_on_pointed_atp` | 1.3 1/(uM.s) | Pollard end/nucleotide별 회귀값; 22°C→310 K transfer |
| `crossbridge.iib.f_stall` | 2 pN | IIA sweep endpoint placeholder; 현재 코드의 stroke force scale, 실측 IIB stall 아님 |
| `crossbridge.iib.k_adp_release` | 0.38 1/s | Actin-bound S1 ADP-chase; HMM/free와 구분, SD/SE 충돌 |
| `crossbridge.iib.k_off0` | 0.35 1/s | IIA equality placeholder; 0.35/s ADP release는 prestroke off 근거가 아님 |
| `crossbridge.iib.k_on` | 0.3 1/s | IIA equality placeholder; Stam 0.2/s는 source model input |
| `crossbridge.iib.k_stroke` | 22 1/s | IIA derived scale의 placeholder; IIB stroke 실측 없음 |
| `crossbridge.iib.x_adp` | 0.0053 um | HMM ratio + assumed force/temperature 조건부 유도 |

Stam의 두-state 모델은 NMIIA와 NMIIB 모두 `kon=0.2/s`, NMIIB의 ADP-limited `koff=0.35/s`를 사용한다. 이는 현재 세-state의 productive encounter·weak prestroke detachment·stroke rate를 따로 측정한 데이터가 아니다. Smooth-muscle의 22/s detachment도 현재 NMIIB stroke 22/s를 검증하지 않는다. 0.0055 µm×22/s≈0.121 µm/s라는 선언 산술과 실제 isoform-specific ensemble velocity를 분리했다. [Stam, Tables 1–2](https://pmc.ncbi.nlm.nih.gov/articles/PMC4407263/)

## 정적 코드와 활성 조건

고정 `unit_chemistry.py:101–139`는 동적 이름으로 ATP/ADP-Pi/ADP의 on/off를 읽는다. `chain_chemistry.py:277–302`는 on×농도×load의 association propensity와 실제 terminal nucleotide의 off를 사용한다. 따라서 atlas의 literal lookup 목록이 비었다고 ADP의 reader가 없다고 결론 내릴 수 없다. raw 선언의 과거 no-reader 문구는 그대로 보존하고 차이를 설명했다.

동시에 frozen `actin_chem.unit_chemistry_enabled=0`이고, 옛 two-state `growth_chemistry`는 기본 호출에서 거부한다. NMIIB kind는 `nmii.isoform_iia_fraction<1`일 때 만들어지며 frozen fraction은 1이다. 확인한 `bonds.py:152–161`은 IIB의 확장 5/7/8-state cycle 요청을 항상 거부하며, 별도 rate 입력의 존재를 검사해 허용하는 경로는 아니다. 이 조건부 정적 해석은 실제 driver override나 native run의 활성 여부를 검증하지 않는다.

## 원문 접근과 보존

KS01 Pollard는 앞선 literature49의 immutable 기록을 보존하고 이번에 web-indexed primary Table I/II·Methods·Fig.5를 대조했다. 원래 Yale PDF는 현재 404이고 대체 직접 요청도 실패했다. 새로 받은 공식 BioC XML은 초록만 포함하며 숫자 표가 없다. **이번 pass에서 새 PDF 원문 파일이나 표 이미지를 확보했다고 주장하지 않는다.** Web-only 숫자/조건 대조와 기존 full-table 검토를 구분했다. 후속 작업은 안정적인 원문 스캔의 exact-byte 확보다.

KS02 Fujiwara, KS03 Kovács, KS04 Wang, KS05 Stam은 기존 원문 cache를 다시 읽었으며 새 독립 연구로 세지 않는다. Frozen identity는 KS01 SE483 OK, KS03 SE424 OK, KS05 SE423 OK이며 KS02·KS04는 미등록 candidate/ineligible이다. OK는 신원 검증만 의미한다. 관련 과거 review의 source UID와 CHECK 기록도 원래 snapshot에 남는다.

History는 immutable `baba079c8d02016367e9649e1564d62476a725f2`의 JSON pointer·파일 hash·canonical record hash·record identity로 보존했다. 26개 역사 기록, 5개 source card, 6개 source estimation group, 8개 관계, 8개 고정 코드 span이 있다. 모든 current fit membership은 빈 목록이고 training eligibility는 false다.

PI 검토 제안은 원문 관측량과 현 상태 전이의 대응을 점검하는 것이다. 우선순위는 pointed ATP apparent off의 의미, NMIIB의 실측되지 않은 weak off/encounter/stroke force dependence, Bell derivation의 독립 load calibration, Wang SD/SE 정의다. 값·prior·태그·메커니즘 수정은 이 패킷에서 하지 않았다.
