**핵공·물수송 입력의 수량과 원문 근거 검토**

고정 입력 `24b3a44cbd33dd34cde338483be19638aec1be1c`의 EXAMPLE 6행을 그대로 보존한 자문 자료입니다. 원문 카드 NT01–NT10과 관계 NTR01–NTR06은 출처 정체성, 실험 수량, 코드 해석을 나눕니다. 10개 논문 중 3개는 기존 P16–P18을 다시 읽은 기록이며, 독립 근거가 3개 더 생긴 것으로 세지 않습니다. 학습 정답·새 분포·수치 변경·공분산을 만들지 않았습니다.

| 입력 | 고정 값 | 구분해야 할 수량 |
|---|---:|---|
| `envelope.pore_radius` | 0.0045 µm | 용질 확산에서 추정한 유효 반경과 물의 유체 반경 |
| `envelope.pore_length` | 0.05 µm | 확산 모형의 등가 길이, 실제 유동 길이, 막 간격을 더한 가정 |
| `envelope.pore_density` | 5 /µm² | 검출한 NPC 수를 나눈 국소 영상 면적과 생성된 곡면 면적 |
| `envelope.spacing` | 0.04 µm | 국소 막 사이 거리와 코드의 기준 반지름 차이 |
| `membrane.hydraulic_conductivity` | 1.4×10⁻⁷ µm³/(pN·s) | 면적당 수력 전도도와 삼투 투과도 Pf, 채널당 Pu |
| `osmotic.reflection_coefficient` | 1 | 용질·막 조합의 측정량과 검사한 구현의 허용 범위 |

약 9 nm의 의미는 확산으로 추정한 통로 크기입니다. Paine의 양서류 난모세포 실험 초록은 약 45 Å의 기능적 반경을 보고합니다(NT01). 이를 두 배로 바꾸면 지름 9 nm가 되지만, 현재 inventory 문구의 정확한 인용 경로는 확인하지 못했습니다. Keminer는 분리한 Xenopus 난모세포 핵의 덱스트란 통과 자료로 탐침 두 종류의 수송률 비로 반경을 먼저 추정하고, 그 반경과 단일 채널 수송률로 길이를 후속 계산했습니다(NT02). 동시 적합은 아닙니다. 관측 단위는 막 patch의 형광 회복이며, 단일 NPC 수송률 k1도 수송률 히스토그램의 peak에서 추정합니다. 길이 계산에는 탐침의 확산계수·크기와 filter-pore 부피도 필요합니다. 저자가 공개한 전문의 Eq.7–8(인쇄 p219)과 Table2(p226)를 후속 확인했습니다. Mohr의 HeLa 실험은 다른 탐침과 비균일 통로 모형을 비교합니다(NT03). 이 수량들은 구조 영상의 개구부나 물의 유체 반경으로 자동 변환되지 않습니다.

밀도 3–10 /µm² 전체 범위와 현재 MCF7 값의 직접 원문 근거는 확보하지 못했습니다. NRK의 세포주기별 국소 영상(NT04)과 HeLa의 평탄한 ROI 영상(NT05)은 각각의 세포·시점·분모를 가진 별도 자료입니다. 코드의 `pore_count`는 밀도에 생성된 삼각형 표면 면적을 곱한 실수형 메타데이터이며, 실제 구멍을 뚫거나 정수 NPC를 생성했다는 관측이 아닙니다(NTR02).

간격도 같은 길이 단위만으로 같아지지 않습니다. Cain의 TEM 자료는 국소 막 간격 또는 핵마다 가장 넓은 간격을 측정합니다(NT06). 검사한 코드는 내부 표면을 만들 때 기준 반지름에서 `spacing`을 빼고 같은 주름장을 적용합니다. 주름이 있으면 대응 꼭짓점의 방사상 거리는 `spacing × f(direction)`이며, 일정한 법선 방향 내강 너비를 뜻하지 않습니다. 물수송 분기는 이 이중 표면 구성을 거부합니다(NTR03).

Pf→Lp는 조건을 맞춘 정의 변환입니다. `Lp = Pf × Vw / (R × T)`에서 물의 몰부피 18 cm³/mol, Pf 20 µm/s, T 310 K를 대입하면 약 1.3967×10⁻⁷ µm³/(pN·s)가 됩니다. 이는 선언의 반올림과 맞는 산술이며, Pf 20 자체를 측정한 증거는 아닙니다. 37°C calcein 프로토콜은 면적과 부피 보정이 필요하다고 명시합니다(NT08). 소포·AQP 실험의 면적당 Pf와 채널당 Pu도 구분해야 합니다(NT09). 다른 온도의 Pf, 형광 감쇠 상수, 확산 투과도 Pd를 그대로 넣지 않았습니다(NTR05).

MCF7 동결 자료는 기준 온도 273.15 K에서 투과도와 활성화 에너지를 함께 맞춘 결과입니다(NT07). 37°C 값으로 외삽하지 않았습니다. 확보한 PMC HTML Table 2는 투과도 열에 `10^13 m³/(N·s)`라고 표시하며 음수 지수가 보이지 않습니다. 원문 PDF를 확보하지 못해 이 단위 표기는 미해결로 보존하고 SI 수치로 정규화하지 않았습니다. BioC 표 XML에도 양의 지수가 나타나므로 단순 텍스트 추출 문제로 단정하지 않았습니다. 두 표현은 같은 변환 계통일 수 있습니다. 같은 PMC의 BioC 저자 원고는 표 번호도 다릅니다. 실제 저자는 Seawright 등이며, 기존 P17의 Teo2013 별칭은 오류였습니다. P17·해시·기존 비교 ID는 보존하고 정정 주석을 추가했습니다.

반사계수는 용질과 통로를 함께 명시해야 합니다. AQP 난모세포 실험은 시험 용질의 초기 삼투 효과를 그 통로에서 비투과성인 기준 용질과 비교합니다(NT10). 검사한 고정 코드는 `reflection != 1`을 거부하며 불투과성 중성 이상용질만 취급합니다. 따라서 현재 1은 이 코드 범위의 조건이고, 세포막과 핵공에서 실제로 측정한 공통 상수가 아닙니다(NTR06).

Poiseuille 식 `G = πr⁴/(8ηL)`, `Lp = density × G`는 고정 코드의 조건부 관계입니다. `G`의 차원은 µm⁵/(pN·s), 면적당 `Lp`는 µm³/(pN·s)입니다. 기존 `pore_hydraulic_geometry`가 기록한 단위 주석 문제를 연결했으며 새 독립 발견으로 세지 않았습니다. 등가 확산 반경이 실제 유동 경로를 나타낸다는 근거 없이 이 식을 실제 NPC 물투과의 검증된 상한으로 부르지 않았습니다(NTR04).

| 카드 | 원문 | 이번에 확인한 범위 |
|---|---|---|
| NT01 | [Paine 1975](https://pubmed.ncbi.nlm.nih.gov/1117994/) | 초록만; 전문 조건 미확보 |
| NT02 | [Keminer 1999 저자 공개 전문](https://www.researchgate.net/publication/12909970_Permeability_of_Single_Nuclear_Pores) | Eq.7–8·Table2 후속 확인; 반경→조건부 길이 |
| NT03 | [Mohr 2009](https://pmc.ncbi.nlm.nih.gov/articles/PMC2728435/) | 본문·모형 비교·Fig. 3·방법 |
| NT04 | [Dultz 2010](https://pmc.ncbi.nlm.nih.gov/articles/PMC2953446/) | 세포주기·Fig. 1·국소 면적 방법 |
| NT05 | [Otsuka 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC9849139/) | Fig. 1·STED ROI·고정 수축 보정 용도 |
| NT06 | [Cain 2014](https://pmc.ncbi.nlm.nih.gov/articles/PMC4107780/) | Fig. 1/2·TEM·최대 간격 분모 |
| NT07 | [Seawright 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3708713/) | 동결 조건·공동 적합·표 단위 문제; P17 재검토 |
| NT08 | [Kitchen 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7757292/) | 온도·mannitol·면적/부피 보정; P18 재검토 |
| NT09 | [Tong 2012](https://pmc.ncbi.nlm.nih.gov/articles/PMC3491688/) | 소포 Pf·채널 Pu·몰부피; 측정 온도 미확인 |
| NT10 | [Zeuthen 2013](https://pmc.ncbi.nlm.nih.gov/articles/PMC3810806/) | 용질별 반사계수·초기 유량·기준 용질 |

동일 KB 스냅샷에서 10개 카드 DOI와 추가 검색 후보 2개의 등록 행은 찾지 못했습니다. 후보 정체성과 수치 근거를 분리했으며, 전부 학습 부적격 상태로 남깁니다. 이전 P16–P18, U09, `pore_hydraulic_geometry`는 파일 해시·JSON 포인터·불변 Git 객체로 연결했습니다. 확보한 원문 캐시는 ignored 경로에만 있습니다. Keminer 저자 공개 전문의 후속 검토는 웹에 렌더링된 본문을 읽었으며 원시 전문 바이트를 추가 저장하지 않았습니다. 실패 응답을 전문 확보로 세지 않았습니다.

정적 검토는 지정한 함수·분기에 한정됩니다. 고정 템플릿의 두 스위치가 0이라는 사실은 override 없는 해당 분기의 조건일 뿐 실제 실행 비활성 증거가 아닙니다. 시뮬레이션·물리/사전분포 import·학습은 실행하지 않았습니다. 원본 선언, 기존 band/spread, 태그 및 KB를 변경하지 않았습니다.

기계 판독 자료: [nuclear_transport_evidence.json](nuclear_transport_evidence.json). 실제 검색·응답·캐시 해시: [nuclear_transport_retrieval.json](candidate_sources/nuclear_transport_retrieval.json).
