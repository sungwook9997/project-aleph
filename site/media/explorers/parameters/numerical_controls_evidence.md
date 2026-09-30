# 수치·준비 설정 8개와 관측 해석의 경계

이 패킷은 논문에서 세포 물성을 찾는 목록이 아니다. 난수 초기값, 공간·시간 해상도, 반복 예산, 수치 guard를 **고정 코드의 역할**로 정리한다. 원래 태그·prior·범위는 그대로이며, 기존 guard 임계값을 바꾸거나 새 성공 기준을 만들지 않았다. 새 실험 카드와 실측 정답은 없다.

| 입력 | 보존한 값 | 관측과 구분할 의미 |
|---|---:|---|
| `cell.seed` | 0 | 선택한 생성·확률 과정의 난수 초기값. 연속 세포 특성이나 확인된 독립 배양 반복 ID가 아님 |
| `resolution.spacing` | 0.05 µm | segment·mesh·grid에 공유되는 명목 길이. 만들어진 모든 edge 길이나 native 수렴을 보장하지 않음 |
| `motor.consistency_tolerance` | 2 | `(v/k_off)/L`에 적용하는 기존 배율 guard. 표본 SD·95% CI·생물학 prior가 아님 |
| `sim.dt` | 10⁻⁵ s | template 시간 간격. 확인한 caller에서는 명시적 `--dt`가 우선함 |
| `sim.fluid_iters` | 20 | 선언된 예산. 확인한 `_step_check`는 이 행 대신 command-line 값을 사용함 |
| `sim.inplane_flow_cg_iters` | 64 | 고정 반복 예산. 물성 계수·충분한 정확도의 실측값이 아님 |
| `sim.inplane_count_floor_fraction` | 0.05 | built count를 기준으로 하는 수치 floor. 세포의 최저 lipid 함량을 측정한 값이 아님 |
| `sim.surface_diffusion_max_crossings` | 32 | passive label의 한 단계 triangle crossing 예산. 물리 확산계수와 별개 |

고정 기준은 `24b3a44cbd33dd34cde338483be19638aec1be1c`다. JSON은 8개 선언·prior, 16개 정확한 resolution alias, 앞선 검토 7개, 코드 10구간 및 조건부 관계 6개를 보존한다. source span은 읽기만 했고 runtime 모듈을 import하거나 실행하지 않았다.

`sim.fluid_iters`의 literal lookup이 없다는 사실은 **검사한 범위**에 대한 정보다. 모든 외부 driver나 동적 키 접근에서 영원히 읽히지 않는다는 주장이 아니다. 확인한 caller의 실제 fluid iteration 설정과 dt override는 원래 spec export와 별도로 기록돼야 한다. [실행 입력 대조](run_context_review.md)의 앞선 결과와 연결되는 문제이며 새 독립 관측으로 세지 않는다.

막 count-flow 소스는 built count에 floor fraction을 곱하고 edge flux allowance에 적용한다. 수가 보존되거나 유한한 값이 나왔다는 사실만으로 재분배가 충분히 정확하다고 판정할 수 없다. 이번 검토에서는 native floor 활성화·반복 수렴·응답 오차를 측정하지 않았다.

표면 확산 소스에서는 crossing 예산을 소진하면 남은 변위를 저장하고 nonzero status를 남긴다. 다음 호출은 그 status의 label을 건너뛴다. **남은 벡터를 보존했다는 사실은 자동 재개를 뜻하지 않는다.** 전체 복원 경로나 실제 장치에서의 소진·편향을 확인한 것은 아니며 메커니즘 변경도 하지 않았다.

외부 신경망에 전달할 때는 이 입력들을 관측 조건·수치 구현의 문맥으로 유지한다. nominal spacing이나 반복 예산에서 세포의 상태를 추론하거나, seed를 새로운 생물학적 표본으로 세지 않는다. 같은 설정에서 얻은 수치가 어떤 실제 관측과 비교 가능한지는 별도의 관측 대응과 native 검증이 필요하다.
