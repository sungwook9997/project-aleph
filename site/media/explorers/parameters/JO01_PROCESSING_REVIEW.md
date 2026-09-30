# JO01 처리 경로 검토: 반복되는 fl2_max 최솟값

**공식 dclab 0.18.0 / ShapeOut 0.9.8의 확인한 읽기·보정·표시·TSV 저장 경로에서 `fl2_max`를 0.1로 만드는 연산을 찾지 못했다.** 로그 화면의 0.1은 다른 종류의 축 범위 대체값이며 이벤트 값을 덮어쓰지 않는다. 이 검토만으로 최초 생성 원인, 검출 한계 또는 censoring 규칙을 확정하지 않는다.

읽기 전용 소프트웨어 출처 검토다. 패키지를 설치·import·실행하지 않았고, 학습이나 물리 실행도 하지 않았다. 기존 JO01 후보·그림·원본 TSV는 수정하지 않았다. 근거는 [기계 판독 기록](JO01_PROCESSING_REVIEW.json)의 공식 commit·파일·행 범위·SHA와 이미 저장된 두 TSV다.

## 원자료에서 직접 확인한 범위

| 보존 TSV | 이벤트 행 | fl2_max의 반복 최솟값 문자열 | 그 값의 행 수 |
|---|---:|---|---:|
| 20191219 CAV1, M1 | 1,286 | `1.0000000149e-01` | 528 |
| 20191219 mock, M2 | 1,404 | `1.0000000149e-01` | 1,244 |

합계는 2,690행 중 1,772행이다. 이 두 열에는 음수와 0이 없었다. 이 수치는 반복된 저장값의 빈도이며, 발현 음성 세포 수나 검출 한계를 뜻하지 않는다. TGBC18TKB 자료이며 MCF7 자료가 아니다.

두 TSV의 첫 두 줄은 모두 **Shape-Out 0.9.8 / dclab 0.18.0**이다. 열 이름은 `fl2_max`이고 `fl2_max_ctc`가 아니다. 이 파일별 저장 기록과 논문의 ShapeOut 1.0.10 표기는 함께 보존해야 한다. 서로 다른 처리 날짜·단계를 반영할 수 있으며, 어느 하나를 다른 파일에 자동 적용하지 않는다.

표준 라이브러리의 숫자 표현 확인에서 binary32의 0.1을 넓힌 값은 `0.10000000149011612`이고, `%.10e` 형식으로 쓰면 위 문자열과 같다. **표현이 일치한다는 사실은 최초 처리 연산이나 원인을 식별하지 않는다.**

## 확인한 경로

| 경로 | 공식 소스에서 읽은 동작 | 이번 질문에 대한 의미 |
|---|---|---|
| HDF5 원래 특성 | 정확한 특성 이름을 찾아 scalar `data[:]` 반환 | 이미 저장된 `events/fl2_max`를 가져오는 경로이며 0.1 대체 없음 |
| TDMS 원래 특성 | `FL2max`를 `fl2_max`로 이름 매핑 | 읽은 열을 저장하며 해당 구간에 진폭 보정 없음 |
| 계층 데이터셋 | 부모 특성에서 선택된 행을 가져옴 | 행 선택이며 값 clipping과 다름 |
| Crosstalk 보정 | 역 spillover 행렬의 선형 조합을 별도 `fl2_max_ctc` 특성으로 제공 | 원래 `fl2_max`와 이름·수량이 다름 |
| 로그 표시 | 새 로그 배열, 축 범위 또는 눈금 위치를 계산 | 저장된 이벤트 진폭을 덮어쓰지 않음 |
| Box filter | 비교 결과를 Boolean 선택 mask에 반영 | 범위 밖 행 제외이며 경계값으로 대체하지 않음 |
| 이벤트 TSV 저장 | 선택된 이름과 filter 상태를 dclab에 전달, `%.10e` 직렬화 | 확인한 writer에 0.1 clipping 없음 |

dclab의 정확한 특성 키가 원래 이벤트에 있으면 ancillary보다 먼저 반환된다. HDF5 scalar 접근과 TDMS 매핑은 각각 [core.py:89–111](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/core.py#L89-L111), [fmt_hdf5.py:60–86](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/fmt_hdf5.py#L60-L86), [TDMS 입력:99–118](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/fmt_tdms/__init__.py#L99-L118)에 고정했다.

보정은 [별도 ancillary 등록](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/ancillaries/af_fl_max_ctc.py#L84-L136)과 [선형 조합](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/features/fl_crosstalk.py#L89-L98)으로 확인했다. 실제 연구의 spillover 설정은 이 두 TSV header만으로 알 수 없다.

ShapeOut의 [이벤트 TSV handler:207–220](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/744741015d2b942c9b70e80ac2d2cf336f10ab6d/shapeout/gui/export.py#L207-L220)는 feature 이름과 filter 상태, 버전 metadata를 전달한다. dclab의 [writer:259–320](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/export.py#L259-L320)는 `ds[c]` 또는 `ds[c][filter.all]`를 쓴다. filter의 [비교/Boolean mask:154–189](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/filter.py#L154-L189)도 경계값 대체 연산이 아니다.

## 0.1 로그축 설정과 구분

ShapeOut 0.9.8의 `get_feat_range_opt`는 plotting 범위를 반환한다. 하한이 0 이하인 fluorescence maximum 특성에는 축 하한 **1**을 사용한다. 다른 특성에서 양의 로그 범위를 정할 수 없을 때 **0.1**을 대체 하한으로 쓴다. 원본 `mm[feature]` 배열에 값을 대입하지 않는다. [공식 구현](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/744741015d2b942c9b70e80ac2d2cf336f10ab6d/shapeout/analysis.py#L237-L306)

공식 test 소스도 `fl2_max`의 선형 범위 `(-1, 5000)`와 로그 범위 `(1, 5000)`를 별도로 기대한다. 다른 일반 특성의 fallback은 `(.1, 1)`이다. 이 test는 **읽기만 했으며 실행하지 않았다.** [test_analysis.py:21–46](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/744741015d2b942c9b70e80ac2d2cf336f10ab6d/tests/test_analysis.py#L21-L46)

dclab의 로그 변환은 새 배열을 만들고, scatter downsampling은 변환 좌표로 선택하더라도 원래 축의 값을 반환한다. 화면 표시와 전체 이벤트 TSV 저장은 별도 경로다. [로그 처리](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/core.py#L140-L179), [scatter 선택 및 반환](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/core.py#L303-L323)

## 추가 확인: raw def와 TSV deform

요청하는 이름은 `deform`이다. HDF5에 `deform`이 있으면 그 저장 특성을 먼저 사용한다. `def`만 존재하고 `deform`이 없다면, 확인한 0.18.0 소스에는 `def → deform` alias가 없으며 `circ`를 필요로 하는 ancillary가 **deform = 1 − circ**를 계산한다. 저장 `def`보다 어떤 변환을 “우선 적용”한다고 표현하기보다, 서로 다른 키라는 점을 구분해야 한다. [계산과 index 생성](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/ancillaries/af_basic.py#L35-L40), [deform 등록](https://github.com/DC-analysis/dclab/blob/f0814042e95e230d6e0956cf52c012421566bef6/dclab/rtdc_dataset/ancillaries/af_basic.py#L62-L74)

따라서 shape 파생량과 원래 fluorescence 열은 각각의 처리 계보가 필요하다. 이번 검토는 raw RTDC를 읽거나 전수 행 결합을 수행하지 않았다. raw→TSV 수치 일치 검토는 부모가 작성하는 별도 원자료 검토의 범위다.

## 버전과 남은 한계

공식 release tag를 다음 commit으로 확인했다.

- dclab 0.18.0: `f0814042e95e230d6e0956cf52c012421566bef6`
- ShapeOut 0.9.8: `744741015d2b942c9b70e80ac2d2cf336f10ab6d`
- ShapeOut 1.0.10: `b5acc675c81b51d95910e77488156147076a1199`

1.0.10에서도 확인한 TSV handler와 로그 범위 분기는 유지된다. 다만 의존성 최소 버전은 [0.9.8의 dclab ≥0.18.0](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/744741015d2b942c9b70e80ac2d2cf336f10ab6d/setup.py#L48-L58)에서 [1.0.10의 ≥0.25.0](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/b5acc675c81b51d95910e77488156147076a1199/setup.py#L59-L69)으로 달라진다. 헤더와 같은 release 소스를 확인한 것이 실제 설치 binary·설정·모든 의존성을 검증한 것은 아니다.

공식 문서는 fluorescence trace와 rolling-median 처리 후 추출하는 peak 특성을 구분한다. 그러나 이번 소스 경로만으로 해당 연구의 acquisition 단계에서 어떤 peak/baseline 규칙이 반복값을 만들었는지는 확인되지 않았다. [공식 fluorescence 설명](https://github.com/ZELLMECHANIK-DRESDEN/ShapeOut/blob/744741015d2b942c9b70e80ac2d2cf336f10ab6d/docs/sec_rtdc_basics.rst#L140-L157)

현재 외부망 문맥에는 다음 제한을 유지한다.

- 반복값을 보존하고, 검출 한계·결측·censoring 처리에 관한 결정은 별도로 명시한다.
- `fl2_max`, `fl2_max_ctc`, 로그 화면 좌표, 절대 단백질 양을 구분한다.
- 획득 단계 clipping, baseline 처리, sentinel 또는 사전 편집은 **가능하지만 미확인인 원인**으로 남긴다.
- 이 검토는 새로운 parameter label, prior, empirical parameter covariance 또는 학습 승인을 제공하지 않는다.

32개 코드·문서 구간에 원문 파일과 구간 SHA를 남겼다. 정적 판독은 실행 경로의 완전한 재현이나 포괄적 소프트웨어 역사 감사가 아니다.
