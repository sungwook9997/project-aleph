# 유체·삼투 입력: 물성, 관측량, 코드 조건의 분리

이 검토는 고정 atlas `24b3a44cbd33dd34cde338483be19638aec1be1c`의 fluid 9개, osmotic 7개 **총 16개 값 입력**을 다룬 advisory 기록이다. 원래 선언·값·단위·태그·prior를 그대로 복사했고 4개 bound alias를 별도 보존했다. `osmotic.reference_temperature`는 기존 chemical-context의 같은 입력이므로 새로운 독립 입력이나 근거로 세지 않는다. 현재 입력의 실측 정답, 학습 라벨, 공분산, 공동 적합, 분포 또는 메커니즘 변경을 승인하지 않는다.

원문 카드 7개, 조건부 관계 8개와 고정 소스 span 18개를 연결했다. 원문 캐시는 열람용이며 배포하지 않는다. 프로젝트 runtime·physics·prior를 import하거나 실행하지 않았고, 네이티브 실행에 대한 결론을 내리지 않았다.

## 핵심 구분

- **용매 물성과 세포 물성:** IAPWS 공식 상관식은 0.1 MPa, 310.15 K에서 점도 `0.0006913034 Pa·s`, 밀도 `993.3292 kg/m³`를 준다. 현재 점도 `0.000692 pN·s/µm²`는 가까운 물 기준이고, 밀도 `1 pg/µm³`는 근사다. `1 g/cm³ = 1 pg/µm³`라는 환산은 정확하지만 물의 밀도가 온도 불변 상수라는 뜻은 아니다. 세포 전체 밀도나 복합 세포질 점도의 측정값으로 승격하지 않는다. 정확한 CRC 판·표는 확보하지 못했다. [IAPWS SR6-08(2011), pp.3–4,8,11](https://iapws.org/technical-guidance/release/LiquidWater.download)
- **물분율의 분모:** 선언이 가리키는 책의 해당 문단은 다른 생물종의 whole-cell **질량 분율**을 설명한다. 이것은 MCF7 cytosol의 geometric volume 중 물이 차지하는 비율과 다르다. 별도로 Seawright의 MCF7 freezing 실험은 `Vb/V0 = 0.31 ± 0.02`인 osmotically inactive whole-cell volume을 보고한다. 그 보수 0.69도 37 °C cytosol water fraction 0.7의 직접 검증이 아니다. [책의 물분율 설명](https://book.bionumbers.org/what-is-the-density-of-cells/), [Seawright et al., Table1·Fig.7](https://pmc.ncbi.nlm.nih.gov/articles/PMC3708713/)
- **기준 온도와 실제 압력:** 310 K의 `RT = 2577.4834 Pa/mM`는 SI 정의와 조건부 산술이다. 코드의 reference_temperature 검사는 이 환산을 확인하고, 실제 압력식은 `cell.temperature`의 `kBT`와 pool의 용질 수/물 부피를 사용한다. 310 K와 37 °C = 310.15 K도 구분한다. [NIST SI 정의](https://www.nist.gov/si-redefinition/meet-constants)
- **농도와 반사계수:** 현재 300 mM은 코드상 ideal osmolyte equivalent / water volume로 읽힌다. 임의의 염 300 mM, osmolality, 측정된 osmotic activity가 서로 같은 양은 아니다. `sigma = 1`은 검토한 transport가 허용하는 impermeant-solute 범위다. AQP의 용질·채널별 초기 수축 관측은 다른 실험 맥락이며, 원문의 `sigma Pf`와 기준 `Pf`를 분리해야 한다. [IUPAC osmotic pressure 정의](https://goldbook.iupac.org/terms/view/O04344/plain), [AQP 원문 Methods·Figs2–3](https://pmc.ncbi.nlm.nih.gov/articles/PMC3810806/)

## 16개 원래 값과 검토 역할

전체 raw 선언 및 prior는 JSON `parameter_reviews`에 그대로 있다. 다음 표는 새 수치를 채택하는 표가 아니다.

| 입력 | 보존한 값·단위 | 검토한 역할 |
|---|---:|---|
| fluid.box_cells | 0, 1 | 위치와 padding에서 계산하도록 하는 수치 선택 |
| fluid.cells_multiple | 1, 1 | 대칭 box cell-count 반올림 규칙 |
| fluid.cytosol_water_fraction | 0.7, 1 | 초기 compartment/shell water 분모; 측정 전이 미해결 |
| fluid.density | 1, pg/µm³ | 근사 용매 기준, 검토한 코드에서는 Reynolds guard |
| fluid.eta_solvent | 0.000692, pN·s/µm² | 물 기준 용매 점도; 복합 세포질 점도와 구분 |
| fluid.padding | 0.375, µm | 최대 node 좌표 밖 수치 영역 여유 |
| fluid.slip_length_membrane | 0, µm | 정확 tangential no-slip 제약을 선택하는 모델 입력 |
| fluid.spacing_factor | 2, 1 | dx/marker-spacing 수치 허용대; 생물학적 분산 아님 |
| fluid.staggered | 0, 1 | collocated/MAC pressure discretization 선택 |
| osmotic.external | 300, mM | 실험 배지/활동도 맥락이 미확보인 osmolyte 입력 |
| osmotic.external_water_volume | 1,000,000, µm³ | finite closed-bath water reservoir |
| osmotic.internal | 300.01552, mM | 40 Pa/RT 압력 균형을 설명하는 선언 산술 |
| osmotic.pressure_per_mM | 2577, pN/µm²/mM | 선언된 310 K에서 RT의 반올림 값 |
| osmotic.reference_temperature | 310, K | 환산 검사 기준 조건; 실제 온도와 별도 |
| osmotic.reflection_coefficient | 1, 1 | 검토한 impermeant ideal-solute 모델의 적용 범위 |
| osmotic.water_permeation | 0, 1 | 메커니즘 제어 입력; 실측 impermeability 아님 |

Bound alias는 `fluid.dx → resolution.spacing`, `fluid.nucleoplasm_water_fraction → fluid.cytosol_water_fraction`, `fluid.slip_length_envelope → fluid.slip_length_membrane`, `osmotic.nucleoplasm → osmotic.internal`이다. 별도 측정 4개로 세지 않는다. 이름이 가리키는 계가 다르다는 이유만으로 결합이 실측된 것도 아니다.

## 코드가 실제로 표현하는 분모와 조건

아래는 고정 코드의 조건부 해석이다. 실행·검증 상태를 주장하지 않는다. 자세한 Git ref, 전체 파일 SHA, span SHA 및 원문은 JSON `source_code_anchors`에 있다.

1. `transport_build.py:205–238`은 as-built 막·핵막 폐곡면 부피에서 초기 물을 나눈다. cytosol water는 `f_c(V_mem−V_nuc)`, nuclear water는 `f_n V_nuc`이고, bath water는 별도 입력이다. `N = 602214.076 × c_mM × V_µm³`로 초기 용질 수를 만든다. 숫자 환산은 맞지만 같은 파일 67행의 설명은 `1e−18 litre/µm³`라고 적혀 있다. 실제로는 `1e−15 litre/µm³ × 1e−3 mol/mmol`이 함께 `1e−18`을 준다. 설명 오류를 값 변경으로 이어가지 않았다.
2. `surface_transport.py:107–157`에서는 **비물 부피와 용질 수를 고정**하고, 물 부피는 표면의 signed volume과 total-water residual로 계산한다. 초기 물분율 0.7이 시간이 지나도 계속 일정하다는 식이 아니다. 여기의 incidence matrix 변수 `sigma`는 solute reflection coefficient와도 다르다.
3. `transport_build.py:161–190`, `surface_transport.py:348–366,420–450`을 따르면 **template를 override 없이 이 분기까지 사용한 경우** switch 0에서 transport가 구성되지 않는다. enabled 경로는 MAC grid, reflection 1, finite closed bath를 요구하며 held pressure outlet 및 별도 nonzero pressure/volume-modulus 입력과의 동시 사용을 거부한다. 실제 driver override나 저장 run은 이 패킷에서 검토하지 않았다.
4. `assemble.py:238–278`의 grid box는 `max|constructed position| + padding`에서 반올림한다. bath water reservoir를 이 box의 부피로 정의하지 않는다. MAC은 별도로 16의 배수로 올림하면서 lower origin을 유지한다. raw 선언의 362/368, 315³ 설명을 현재 realised geometry로 채택하지 않았다. 동일 고정 함수 docstring은 362/368의 native 귀속을 이미 철회한다.
5. `surface_slip.py:210–238`의 양의 slip length에서는 두 solvent 면의 저항이 `2ηA/b`이고, 0에서는 face당 두 tangent constraint row다. Yasuda 논문의 intermonolayer friction 기호 `b`는 이 코드의 길이 `b`와 다른 양이다. 원문은 continuum theory이며 MCF7 zero-slip을 측정하지 않는다. [Yasuda et al., Eqs4–6·11–12](https://arxiv.org/html/1802.03893v2)

`1e6 µm³ = 1 nL`는 정확하다. 다만 radius 7.5 µm인 설명용 구의 부피는 약 1767 µm³이므로 1 nL는 약 **566 whole-cell volumes**, 두 compartment가 모두 0.7 물분율이라면 약 **808 cell-water volumes**다. 기존 example review에 기록된 `~1e5 × a cell` 문제를 연장한 산술이며 새 독립 발견이나 실제 chamber 측정이 아니다.

## 역사 기록과 불확실성의 보존

`literature_review`, `example_review`, `source_derivations`, `chemical_context_evidence`, `nuclear_transport_evidence`의 선택 기록을 immutable Git `fd67d1e122600efec9968562db714a0fb1aa2f42`의 파일·JSON pointer·record hash로 고정했다. 입력 범위에서 해당하는 uncertainty review 행은 없었고, 기존 prior family를 그대로 보존했다. `source_derivations`의 RT, chemical-context의 온도 및 nuclear-transport의 Pf/Lp·sigma·pore 관계를 다시 independent evidence로 세지 않는다.

Seawright 논문의 과거 `Teo2013` 별칭과 원문 cache 이름은 역사 snapshot에 그대로 남는다. 올바른 저자 귀속을 별도 설명했으며 원래 파일은 고치지 않았다. 기존 단일 pore conductance 단위 문제도 NTR04의 연장으로 연결했다. Poiseuille 식은 matched geometry·viscosity·boundary assumptions의 조건부 식이며 실제 NPC water flux의 측정 근거가 아니다.

IUPAC 정의는 공식 web 결과로 읽었지만 직접 원문 파일 요청은 403, old host는 TLS 실패였다. 그 카드에는 local original SHA가 없음을 명시했다. 다른 cache 및 코드 span은 exact-byte hash를 확인했다. IAPWS scalar 식은 Table8의 260, 298.15, 375 K 값과 인쇄 정밀도까지 맞춰 전사 오류를 검사했다. 이것은 source 산술 검증이며 물리 runtime 검증이 아니다.

후속 관측 설계의 PI 제안은 같은 표본의 온도, 막면적/부피, 정확한 osmolyte·활동도, 초기 volume slope 및 impermeant-reference calibration을 연결하는 것이다. 이 패킷은 그 관측이 확보됐거나 현재 파라미터를 식별한다고 주장하지 않는다.
