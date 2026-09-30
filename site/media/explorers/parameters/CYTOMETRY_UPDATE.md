# 같은 이벤트의 추가 관측 업데이트: 독립 검토

고정 결과 `a975149740e9c7c27fade4efdb9149a9b1453f03`에서 원본 TSV와 저장 배열을 독립 집계했다. Reporter와 nominal arm을 함께 입력받는 full NN은 추가 면적 관측 뒤 변형도 MAE가 10.38–10.54%, 추가 변형도 관측 뒤 면적 MAE가 9.70–9.87% 줄었다. 이는 같은 모형에 새 관측을 주기 전후의 비교다. 두 모형 모두 새 관측을 받은 뒤 비교하면 full NN의 ridge 대비 이득은 각각 0.31–0.41%, 0.62–0.85%였다. 조건만 입력받는 NN의 면적 MAE는 갱신된 ridge보다 0.38–0.47% 나빴다. 이번 단계에서 학습 가중치가 바뀌지는 않았다.

[전체 설정과 날짜별 결과 그림](cytometry_observation_update.png) · [PDF](cytometry_observation_update.pdf) · [SVG](cytometry_observation_update.svg)

결론은 advisory이며 PI 판정, 독립 생물학 검증 또는 native 물리 검증을 대신하지 않는다. 모든 날짜가 이미 노출된 동일 제공자 개발 자료라는 한계를 유지한다.

- 외부 결과: `[local path omitted]`
- 실행 전 recipe: `05cc64487bdb22f9b067def6ac49e42fc2d9c224`
- 기존 학습 결과: `3cd09556b10a28f9a788aee4fe7c7631d29d9184`
- 원자료: TGBC18TKB, RT-FDC, nominal CAV1-plasmid/mock file arms, transfection 72 h 뒤. 입력은 기록된 dTomato FL2 maximum이며 절대 CAV1 농도가 아니다. [Figshare v2](https://doi.org/10.6084/m9.figshare.14481432.v2), [원 논문](https://doi.org/10.7554/eLife.87930).
- 상세 검토: `cytometry_update_review.json`, SHA-256 `c67eca3570c5ad93a1d5be2f3008bb88c98ce2c736f088dbb4e825ec9c0e357a`.

## 범위와 선택 규칙

20개 원본 TSV의 67,449 export rows 중 finite primary values, 면적 60–600 µm², area-ratio 1–1.05 조건을 만족한 39,053 positional events를 확인했다. 원 논문의 전체 fluorescence/aspect gate를 재현한 모집단은 아니다. Export index는 유일한 세포 ID로 간주하지 않고 파일과 positional row를 사용한다.

9개 모형 설정 × 9개 평가 날짜 × 2개 관측 방향 × matched/permutation = 324 calls다. 1,405,908 scalar comparisons는 같은 39,053 events를 36회 재채점한 수이며, 새로운 독립 세포·실험 수가 아니다. 전체 324개 날짜별 결과와 36개 집계는 JSON의 `date_results`와 `pooled_results`에 보존했다.

기존 각 fold는 7개 날짜로 fit하고, 다음 날짜 하나의 group-balanced original-unit joint NLL로 0/50/100/150/200 epoch 중 최소값을 선택한다. 동률이면 이른 epoch, selection refit 없음이다. 남은 날짜 하나를 평가한다. 54개 NN의 270개 저장 selection laws를 원본 selection-date 관측으로 다시 채점했고, 선택된 checkpoint 54개 모두 일치했다. 이번 update는 기존 81개 bundles 전부를 재사용하며 유리한 날짜·모형을 다시 선택하지 않는다.

각 날짜에서 nominal arm 두 개를 동일 가중하고 그 arm 내 event를 동일 가중한다. 최종 수치는 날짜 9개의 동일 가중 평균이다. 20200313의 여러 파일은 같은 날짜·arm 안에 합쳐지므로 파일별 동일 가중과 다르다.

Permutation은 consumed coordinate만 원래 파일 안에서 섞으며 seed는 20260929다. Reporter는 원래 event에 남고 donor lineage를 보존한다. 파일 내부 고정점은 허용된다. 이 진단은 consumed–query와 consumed–reporter 연결을 함께 깨므로 특정 생물학적 관계 하나만 분리해 입증하지 않는다.

## 모든 설정의 집계

MAE는 예측 주변분포의 중앙값에 대한 **평균 절대오차**다. 아래 before는 추가 관측 전, matched는 같은 event의 관측을 사용한 뒤, permuted는 파일 내 donor 관측을 사용한 뒤다. NLL은 선언된 원래 단위의 연속밀도이므로 음수일 수 있으며, 면적과 변형도의 NLL 절댓값끼리 비교하지 않는다.

### 면적을 관측하고 변형도를 예측 (무차원)

| 설정 | MAE before | MAE matched | MAE permuted | NLL before | NLL matched | NLL permuted |
|---|---:|---:|---:|---:|---:|---:|
| global | 0.0070573765 | 0.0063379753 | 0.007516522 | -3.3507354 | -3.4467916 | -3.2659798 |
| condition | 0.0070522057 | 0.0063238132 | 0.0075087038 | -3.3518165 | -3.4491227 | -3.2665927 |
| ridge | 0.0070521078 | 0.0063216677 | 0.0075238188 | -3.3516872 | -3.4500417 | -3.263966 |
| nn_condition_17 | 0.0070530065 | 0.0063011973 | 0.0076342321 | -3.3512889 | -3.4502566 | -3.2362985 |
| nn_condition_29 | 0.0070516268 | 0.0063040308 | 0.0076088595 | -3.3511908 | -3.4500508 | -3.2403876 |
| nn_condition_43 | 0.0070527265 | 0.0063039492 | 0.007612183 | -3.3513084 | -3.4501568 | -3.2401132 |
| nn_full_17 | 0.0070380905 | 0.006295951 | 0.0075710313 | -3.3541941 | -3.4527941 | -3.2451767 |
| nn_full_29 | 0.0070313765 | 0.006301822 | 0.0075506835 | -3.355218 | -3.4527641 | -3.2495153 |
| nn_full_43 | 0.0070374244 | 0.0062980703 | 0.0075639023 | -3.3542966 | -3.4529269 | -3.2466242 |

### 변형도를 관측하고 면적을 예측 (µm²)

| 설정 | MAE before | MAE matched | MAE permuted | NLL before | NLL matched | NLL permuted |
|---|---:|---:|---:|---:|---:|---:|
| global | 65.542159 | 59.266855 | 69.644767 | 5.7890048 | 5.6929487 | 5.8719046 |
| condition | 65.549866 | 59.201298 | 69.651468 | 5.7890728 | 5.6917666 | 5.8724253 |
| ridge | 65.120727 | 58.726035 | 69.293536 | 5.7832324 | 5.6848779 | 5.8686517 |
| nn_condition_17 | 65.549324 | 58.946772 | 70.695182 | 5.7879353 | 5.6889676 | 5.9007394 |
| nn_condition_29 | 65.556251 | 59.003632 | 70.489541 | 5.7880057 | 5.6891457 | 5.896681 |
| nn_condition_43 | 65.560381 | 58.979946 | 70.545773 | 5.7878353 | 5.6889869 | 5.8969311 |
| nn_full_17 | 64.587391 | 58.22433 | 69.210374 | 5.7774879 | 5.6788879 | 5.8829759 |
| nn_full_29 | 64.630703 | 58.362705 | 68.945417 | 5.7793097 | 5.6817637 | 5.8803492 |
| nn_full_43 | 64.628038 | 58.249183 | 69.025924 | 5.7770126 | 5.6783822 | 5.8804204 |

모든 162개 matched 날짜/설정/방향 조합이 같은 모형의 추가 관측 전 MAE와 NLL보다 좋아졌다. 그러나 full NN은 갱신된 ridge에 비해 변형도 MAE 5/27, NLL 7/27, 면적 MAE 6/27, NLL 6/27 날짜·seed 비교에서 졌다. 첫 날짜에서는 세 seed 모두 두 관측량의 MAE와 NLL에서 ridge에 졌다. 전체 event 각각의 오차가 줄었다는 뜻도 아니다.

## 불확실성

| Query | Full NN seed | 95% coverage before | matched | permuted | 95% matched 평균 폭 |
|---|---:|---:|---:|---:|---:|
| deform | 17 | 94.5252% | 94.7730% | 90.1888% | 0.032517682 |
| deform | 29 | 94.4146% | 94.7946% | 90.2470% | 0.032508678 |
| deform | 43 | 94.4552% | 94.7543% | 90.1990% | 0.032499758 |
| area_um | 17 | 94.5177% | 95.1212% | 90.3078% | 293.89076 |
| area_um | 29 | 94.2861% | 94.8099% | 90.2271% | 289.72682 |
| area_um | 43 | 94.4164% | 94.9719% | 90.3233% | 291.18046 |

50/80/95% coverage와 interval width 전부는 JSON에 있다. 이 비율은 노출된 개발 자료의 점 추정이며 독립 생물학적 calibration 보장이 아니다. 세 seed도 최적화 반복이지 생물학적 반복이 아니다. 소비한 좌표를 오차 없는 값으로 취급하며, segmentation/instrument noise, 학습 가중치 불확실성, event 간 공분산을 분해하지 않는다. 관측 범위 밖 lognormal 꼬리 확률은 잘라내지 않고 저장한다.

자연로그 좌표에서 업데이트 식은 다음과 같다.

`mu_after = mu_q + Sigma_qo / Sigma_oo × (log(observed) − mu_o)`  
`variance_after = Sigma_qq − Sigma_qo² / Sigma_oo`

이는 고정된 학습 관측분포를 조건화한 결과다. 조건부 log variance 수축은 이 가정 아래의 수학적 성질이며 생물학적 확실성의 실증 증가가 아니다. 동일 seed로 생성한 before/after draws에 물리적 쌍 관계를 부여하지 않는다.

## 관측 관계의 의미

원 논문의 Methods 및 Figure 1 supplement 1은 면적과 변형도가 같은 fitted image contour에서 계산된다고 명시한다. 원본 `circ + deform`은 1과 최대 약 2.98×10⁻⁸ 차이로 일치했다. 이는 처리된 shape descriptors의 수학적 연관성을 뒷받침하며, 면적 하나만으로 변형도가 결정된다는 뜻은 아니다.

같은 reporter/condition `x`와 matched event에서 두 방향의 NLL gain은 모두 `log p(A,D|x) − log p(A|x) − log p(D|x)`다. 따라서 두 방향의 이득이 같다는 사실을 독립 확인 두 번으로 세면 안 된다. 저장된 모든 matched event에서 이 항등식의 최대 차이는 2.05×10⁻¹⁴ 미만이었다.

신경망이 출력하는 Cholesky factor의 관측 공분산, fit 잔차에 0.1 diagonal shrinkage를 적용한 기준모형 공분산, 평가 event들의 단순 경험 공분산은 서로 다르다. JSON은 평가 날짜의 raw/log 경험 상관과 모형의 조건부 log 상관 요약을 나란히 보존하지만 어느 쪽도 문헌 상수·기계론 파라미터의 공분산으로 승격하지 않는다. 실제 CAV1 abundance, 세포 강성, cortical tension, 인과효과 또는 inner native 대응은 여기서 식별되지 않는다.

## 독립 검사와 남은 범위

독립 metadata/scalar checks 23,786개, 불일치 0개다. 원본 archive와 extracted TSV 일치, recipe/registry/parent asset 해시, 모든 request의 donor·단위·row identity, 실제 평가 날짜 분리, 저장 parent law 불변, 324개 조건부 법칙의 평균·분산·NLL·intervals·coverage·support tail, 전체 집계와 270개 checkpoint-selection scores를 대조했다. 허용차는 기존 계획의 atol 1e−10 / rtol 1e−9이며 새 물리 threshold가 아니다.

사용한 것은 고정 Git bytes와 stdlib/numpy 후처리뿐이다. 외부 모델, Aleph runtime, physics, torch를 실행하거나 import하지 않았고 학습·모델 채택·값·tag·prior 수정도 하지 않았다. 외부 receipt에 기록된 17 tests, portable CLI 실행과 32-draw 전체 replay를 이 검토에서 다시 실행한 것으로 부르지 않는다. 원문·코드·결과 blob 경로와 SHA-256은 JSON의 `input_blob_manifest`에 있다.

모든 날짜가 개발 과정에서 이미 노출되어 있어 새로운 study/culture와 acquisition calibration, image/source join, native observation operator 및 실제 출력이 확보되기 전에는 독립 생물학·물리 검증으로 해석할 수 없다.

독립 검산 프로그램 다섯 개와 실행 순서를 [재현 안내](audit_code/README.md)에 보존했습니다. 새 출력 폴더에서 다시 실행해 23,786개 검사가 모두 통과했고, 생성 시각·로컬 체크아웃 경로 두 항목을 제외한 결과 전체가 고정 원본과 같았습니다. [재현 기록](cytometry_update_reproduction.json)과 그림용 별도 792개 집계 대조를 남겼습니다.
