# 수량과 원문 맥락을 함께 조회하기

`research_query.research_context(directory, names)`는 기존 parameter context에 추가 원문 검토와 수량 사전을 붙입니다. 현재 입력의 값·단위·태그·prior와 바인딩은 유지하고, 문헌에서 나온 숫자는 원문 카드 안에 남깁니다. 기존 `query.context_packet` API는 바꾸지 않았습니다.

## 포함 범위

| 패킷 | 입력 범위 | 제공하는 관계 |
|---|---:|---|
| quantity_semantics | 17개 | 10개 코드 변환, 공간·분모·준비 단계, 52개 고정 위치 |
| actin_pool | 7개 | 14개 원문 카드, 원문의 조건부 적합·pool accounting |
| motor_population | 6개 | 7개 원문 카드, 객체·head·isoform 수량 대응의 조건 |
| transport_motor | 20개 | 9개 원문 카드, assay·construct·ATP·load 조건과 제한된 계산 관계 |
| actin_kinetic | 40개 | 16개 검토 카드, 10개 관계, 직접 관측·조건부 적합·원문 가정 |
| chemical_context | 11개 | 11개 카드, 5개 조건부 관계, 화학종·기준 상태·온도 경로 |
| nuclear_transport | 6개 | 10개 카드, 6개 관계, 확산 반경·길이·물 전도도의 대응 한계 |
| membrane_material | 9개 | 9개 카드, 7개 관계, bilayer·세포막·단백질 확산의 관측 차이 |
| crosslink | 11개 | 10개 카드, 10개 관계, 분자 결합·전체 단백질·두 팔 모형의 구분 |
| crossbridge | 19개 | 9개 카드, 10개 관계, 단백질 상태·관측 속도·미시적 단계의 구분 |
| nuclear_mechanics | 25개 | 10개 카드, 12개 관계, 핵 모델 설정·probe 응답·영상 통계의 구분 |
| cortex_geometry | 15개 | 10개 카드, 8개 관계, filament 수·망 간격·형광 분획·회복 시간의 구분 |
| adhesion_coupling | 16개 | 10개 카드, 8개 관계, ERM 교환·분자 이탈·clutch 모델·LINC sensor 구분 |
| filament_material | 27개 | 10개 카드, 12개 관계, 재료 계수·단면 가정·동역학 상태·코드 선택자 구분 |
| actin_organization | 37개 | 10개 카드, 10개 관계, NPF·Arp 분모·다발 교환·분자 geometry·문헌 재사용 |
| membrane_state | 21개 | 10개 카드, 14개 관계, 면적 분모·tension/pressure·feature 선택 구분 |
| fluid_osmotic | 16개 | 7개 카드, 8개 관계, 물성·분율·compartment/bath·기준 온도 구분 |
| motor_geometry | 15개 | 9개 카드, 7개 관계, 전체 윤곽·분자 구조·화물·수치 객체 구분 |
| numerical_controls | 8개 | 6개 정적 관계, seed·시간 간격·수치 반복·관측 추적 한계 |
| kinetic_source_inputs | 14개 | 5개 카드, 8개 관계, end별 겉보기 속도·IIB construct/isoform·유도값 |
| protrusion_geometry | 18개 | 8개 카드, 7개 관계, 방향분포·분지각·다발 census·기질 기하 |
| membrane_channel | 6개 | 5개 카드, 5개 관계, 면적·질량·반지름·초기 확률·normal confinement |

겹치는 범위를 합하면 **347개 고유 선언 행**입니다. 이는 전이 스키마 필드를 제외한 직접 입력 339개 전부와 별칭 8개입니다. 전이 필드 226개는 별도의 선언 구성 검토에 남아 있으며, 정적 설정 8개에는 문헌 관측을 붙이지 않았습니다. 액틴 반응 속도의 40행에는 바인딩 2개가 포함되고, 화학의 11행에는 온도 맥락 1개가 포함됩니다. `osmotic.reference_temperature`는 화학의 보조 맥락 및 유체·삼투의 직접 검토로 보존합니다. 전체 카드 189개에는 직접 관측, 적합, 모델, 문헌 요약, 출처번호 확인과 공식 정의가 포함됩니다. 카탈로그의 기존 필드명 `primary_card_ids`는 이 카드들의 식별자를 담으며 전부 1차 실험이라는 뜻이 아닙니다. 위 숫자는 독립 관측 개수나 독립 논문 수가 아닙니다. Transport의 Schnitzer 2000은 앞선 P10의 확장 검토이며, 역사 검토를 새 관측으로 세지 않습니다.

## 실제 호출

[Code block omitted from the public edition; the surrounding record and references are retained.]

프로젝트 환경의 인터프리터로 다음 모듈도 실행할 수 있습니다.

```text
-m aleph.outer.parameter_atlas.research_query
  --atlas-dir aleph/outputs/outer/parameter_atlas_20260929
  --name actin_chem.g_actin_free
  --name nmii.isoform_iia_fraction
  --name kinesin.k
  --out outer_quantity_context.json
```

동일 호출의 저장 예시는 `outer_quantity_context_example.json`입니다. GUI의 입력 상세에도 같은 검증을 통과한 원문 카드와 수량 정의가 표시됩니다.

`outer_definition_context_example.json`은 IF의 정적 이름 선택 경로, filamin의 미해결 UID, clutch 모델 버전, fascin 반응 분모를 함께 조회한 추가 예시입니다. 원래 선언과 미확정 상태를 보존합니다.

## 관계를 읽는 방법

- `parameter_rows`: 해당 패킷의 원본 검토 행입니다. 선언을 덮어쓰지 않습니다.
- `static_transforms`: 조사한 코드·기하 계산입니다. 관측된 상관관계가 아닙니다.
- `source_comparison_relations`: 원문 분석이나 조건부 변환의 관계입니다. 현재 입력의 공동 fit을 뜻하지 않습니다.
- `source_cards`: 요청 입력뿐 아니라 선택한 관계가 필요로 하는 원문까지 포함합니다. `source_card_inclusion`은 직접 입력 맥락과 관계의 비교 맥락을 나눕니다. 예를 들어 dynein의 이탈률 관계를 이해하려고 포함된 kinesin 논문을 dynein 측정으로 읽으면 안 됩니다.
- `historical_review_pins`: 앞선 검토를 보존합니다. 새 독립 관측으로 계산하지 않습니다. NMII의 역사 메모는 패킷 전체 범위이며 요청 입력과 직접 관련 없는 항목도 포함할 수 있습니다.

바인딩 행을 요청하면 그 최종 입력의 검토도 가져오지만, 별칭을 새로운 측정으로 만들지는 않습니다. 기존 broad EXAMPLE 검토의 `not_primary_checked`는 당시 검토 범위를 뜻합니다. 뒤에 추가된 원문 카드의 조사 범위와 구분해 보존했습니다.

## 검증과 한계

카탈로그는 각 패킷의 원본 바이트 SHA-256, 정확한 선언 범위와 카드 식별자를 고정합니다. 로더는 같은 atlas/KB 스냅샷인지, 원본 선언과 일치하는지, 카드·변환·출처 참조가 빠지지 않았는지 확인합니다. 복사된 source_evidence/source_audit/paper_refs 행과 서지 정체성 상태도 고정 KB와 대조하며 중복 DOI 행을 보존합니다.

학습 정답, 현재값 변경, 원문 fit의 현재 입력 fit 승격, 공분산 생성은 거부합니다. 결과의 `supervision_mask`는 false, `empirical_pairs`는 빈 목록, `empirical_covariance`는 null입니다. 기존 입력·prior·physics 코드는 변경하지 않았습니다.

이 검증은 **메타데이터의 일관성 검사**입니다. 자연어 해석의 완전한 증명, 생리적 전이 승인, 식별가능성 분석, native 물리 검증을 대신하지 않습니다. 실제 관측 학습 자료는 별도의 데이터 입수·검증 경로를 거쳐야 합니다.

새 관계 지도는 상세 검토, 원문의 조건부 비교, 수량 변환과 서지 DOI 키를 별도로 연결합니다. DOI는 검토·카드 경로를 통해 찾으며, 후보 인용과 실제 등록 기록의 식별 역할을 유지합니다. 같은 DOI라도 원문 카드와 UID를 합치거나 독립 관측 개수를 늘리지 않습니다.

핵공·막 물성·가교 단백질의 역사 검토는 원본 파일과 행의 해시·식별자까지 대조합니다. 옛 스키마의 비적격 문자열 예외는 바이트 대조를 통과한 역사 스냅샷 안에서만 허용합니다. 가교·crossbridge·핵역학·피질의 source_estimation_groups는 원문 안의 추정 묶음이며 현재 입력의 공동 fit은 계속 빈 목록입니다.

전체 706행의 직접 검토·별칭 맥락·이전 검토와 남은 질문은 [검토 범위 표](REVIEW_COVERAGE.md)에 있습니다. 새 공동 관측 후보 JO01–03은 [별도 자료 목록](joint_observation_candidates_v2.md)으로 제공하며 이 파라미터 조회 API의 정답으로 넣지 않습니다.

DOI가 없는 SE35는 UID로만 고정 원본과 대조합니다. 저장된 NO_DOI_FOUND 기록과 새 Pereverzev 논문 후보는 별도 객체이며 자동 해소하지 않습니다. `static_definition_findings`는 요청 입력에 해당하는 정적 정의 문제와 한계를 함께 반환하며, `runtime_verified` 승격을 거부합니다.

`outer_state_geometry_context_example.json`은 막 excess-area 별칭, 초기 nuclear-water fraction 별칭, NMII selector와 cargo radius를 함께 조회합니다. 추가된 원문 범위는 전체 자료의 독립 관측 수를 늘리는 방식으로 사용하지 않습니다.

출처 그룹은 요청 행·관계의 카드에서 시작해 카드와 그룹의 참조가 모두 닫히도록 선택합니다. 추가된 `source_group_context`는 그 연결로 포함된 카드임을 나타내며 독립 표본·현재 fit을 뜻하지 않습니다. `primary_record_roles`의 별도 DOI도 그래프에 연결하되, 원래 역할과 감사 기록을 연결에 남깁니다. 등록됐지만 OK가 없는 기록은 `registered_no_OK_identity`로, 등록 기록 자체가 없는 경우와 구분합니다.
