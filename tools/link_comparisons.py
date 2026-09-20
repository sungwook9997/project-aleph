"""Attach explicit comparison protocols without claiming agreement."""
import json
from pathlib import Path
R=Path(__file__).resolve().parents[1];p=R/'data/catalog.json';d=json.loads(p.read_text())
t033={'title':'Tsujita et al. (2021) · membrane tether force · Fig. 1a','url':'https://doi.org/10.1038/s41467-021-26156-4','observable':'광학 집게로 막을 당길 때의 힘 [pN]. MCF7 23, MCF10A 35, MDA-MB-231 ruffling 24 / blebbing 14개 관측값.','protocol':'비교 설계: 같은 세포 조건·탐침 부착·당김 속도·측정 구간을 재현하고, 탐침 반력을 논문과 같은 방법으로 추출해야 합니다.','status':'논문 원자료 확보·원본 96개 셀 값 대조 완료 / Aleph 대응 실험 미실행','gap':'막 구조 이미지나 노드의 최대 힘은 tether force가 아닙니다. 가정한 굽힘 강성으로 힘을 장력으로 바꿔 일치한다고 표시하지 않습니다.','plot':'media/analysis/paper-t033-tether.png'}
t042={'title':'Hosseini et al. (2021) · AFM oscillatory confinement · Tables 1–2','url':'https://doi.org/10.1016/j.bpj.2021.05.006','observable':'AFM 구속 진동 실험으로 저자가 추정한 활성 피질 장력 [mN/m]. 유방 세포주 관련 14개 조건의 중앙값이며 개별 세포 값이 아닙니다.','protocol':'비교 설계: 세포주·세포주기·EMT 상태, 구속 높이와 진동 조건을 맞춰 힘·높이·형상을 저장하고 논문과 같은 관측/추정 절차를 적용해야 합니다.','status':'원문 표·출처 확인 / Aleph 대응 AFM 실험 미실행','gap':'피질·모터뿐 아니라 막·용매·전체 형상이 관측값에 함께 영향을 줍니다. 단일 필라멘트의 힘이나 굽힘을 이 장력과 직접 비교할 수 없습니다.','plot':'media/analysis/paper-t042-cortex.png'}
protocols={
'fluid':('용매의 유동과 압력','같은 경계·점도·외력 조건에서 속도장과 압력장을 비교하고, 격자 수렴 및 이산 발산을 별도로 확인합니다.','세포 전체 점탄성이나 FTSPR의 현탁액 점도를 용매 점도로 취급할 수 없습니다.'),
'filament':('필라멘트 굽힘·신장','재료·길이·온도·끝단 경계를 맞춘 변형 응답이나 충분한 평형 표본의 접선 상관을 비교합니다.','12 µs 단일 궤적은 평형 지속길이나 긴 시간 이완을 추정하기에 충분하다고 확인되지 않았습니다.'),
'motor':('모터의 능동 힘과 운동','모터 종류·ATP·하중·결합 기하를 맞춰 힘–속도·결합 수명·상태 전이를 측정해야 합니다.','현재 영상은 초기 이완이며 모터의 보행, 정지력, 힘–속도 관계 데이터가 아닙니다.'),
'growth':('필라멘트 끝단 성장','단백질 종류·농도·온도와 끝단 상태별 길이–시간 및 성장/축소 전이를 비교합니다.','길이 변화 영상과 논문 성장률을 연결할 조건별 실험이 아직 없습니다.'),
'contact':('접촉과 관통 방지','알려진 형상과 부하에서 간격·반력·침투량·해상도 의존성을 먼저 측정하고 실제 압축 실험에 연결합니다.','실험 전체의 힘 곡선만으로 접촉 구현 단독의 적합성을 판정할 수 없습니다.'),
'envelope':('핵막 변형','핵 형상·구속 조건을 맞춘 힘–변형 및 부피 응답을 비교합니다.','현재 초기 핵막 이미지에는 부하 응답이 없습니다. 대조할 독립 핵 실험 원자료는 아직 연결하지 않았습니다.'),
'lamina':('핵 라미나의 변형 저항','라민 조건·핵 크기·변형률과 속도를 맞춘 핵 인장/압축 실험이 필요합니다.','라미나만의 구조를 전체 핵 강성과 일대일 대응할 수 없습니다.'),
'chromatin':('염색질의 핵 내부 역학','염색질 조건과 핵 기하를 맞추고 작은 변형과 큰 변형의 응답을 라미나 영향과 함께 비교합니다.','초기 분포는 압축 응답이나 재료 특성을 검증하지 않습니다.'),
'microtubule':('미세소관 굽힘과 좌굴','길이·고정 조건·하중에 따른 휨 및 좌굴 응답을 비교합니다.','이 구조 촬영에는 하중 실험이 없습니다.'),
'intermediate_filament':('중간 필라멘트의 큰 변형 응답','단백질 종류·가교·변형률·변형 속도를 맞춘 응력–변형률과 이완을 비교합니다.','초기 고리 형태는 재료의 비선형 응답을 입증하지 않습니다.'),
'stress_fiber':('스트레스 섬유 수축','부착·모터·액틴 배열을 맞춘 장력, 절단 뒤 후퇴, 수축 속도를 비교합니다.','현재 입력에서 집단이 없으므로 실험 대응값도 없습니다.'),
'sf_arc':('액틴 아크 운동','아크 곡률·연결·역행 흐름·모터 조건을 맞춰 위치와 속도를 비교합니다.','현재 입력에서 집단이 없습니다. 피질 결과로 대신 검증하지 않습니다.'),
'lamellipodium':('라멜리포디움 돌출','세포 부착·분지·중합 조건을 맞춘 전면 속도와 액틴 역행 흐름을 비교합니다.','현재 입력에서 집단이 없으며 성장만으로 이동이 입증되지 않습니다.'),
'filopodium':('필로포디움 돌출과 굽힘','묶음 구조·막 부하·중합 조건을 맞춘 길이–시간과 휨을 비교합니다.','현재 입력에서 집단이 없습니다.'),
'microvillus':('미세융모 형상과 응답','액틴 묶음·막 연결·부하 조건을 맞춘 길이 분포와 변형 응답을 비교합니다.','현재 기본 입력의 밀도가 0이므로 대응 촬영과 실험값이 없습니다.'),
'cytoplasm_actin':('세포질 액틴 망의 응답','필라멘트·가교·모터 조건을 맞춘 국소 변위 응답과 시간별 이완을 비교합니다.','전체 세포의 AFM 곡선을 이 집단 단독의 특성으로 해석하지 않습니다.')}
for c in d['cards']:
 key=c['id'];comparisons=[]
 if key in ('membrane','surface','coupling'):comparisons.append(dict(t033))
 if key in ('cortex','nmii','motor','surface','coupling','cytoplasm_actin'):comparisons.append(dict(t042))
 if key in protocols:
  title,protocol,gap=protocols[key]
  comparisons.insert(0,{'title':title+' · 필요한 직접 비교','observable':title,'protocol':protocol,'status':'직접 비교용 독립 원자료·동일 조건 실행 미연결','gap':gap})
 for r in comparisons:
  if 'Tsujita' in r['title']: r['data']='data/literature/T033_tether_force.csv'
  if 'Hosseini' in r['title']: r['data']='data/literature/T042_summary.jsonl'
 c['comparisons']=comparisons
p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
(R/'data/literature/provenance.json').write_text(json.dumps({'T033':{'doi':'10.1038/s41467-021-26156-4','source_audit':'SE213: OK (read-only live KB query, 2026-09-20)','workbook_sha256':'77efc9e921fec32463526c73ff7a5fe969f1ad88f0fa2384d6c52e4273ea577b','verified_original_cells':96,'selection':'Fig.1a breast-cell groups only','data':'T033_tether_force.csv'},'T042':{'doi':'10.1016/j.bpj.2021.05.006','source_audit':'SE180: OK (read-only live KB query, 2026-09-20)','pdf_sha256':'af3381b088df8257fb4c29f77522a19c5cef29617278847eef684b2e42fcbfe1','selection':'14 breast-cell condition medians, Tables 1–2; excludes DU145/A549 rows','data':'T042_summary.jsonl'},'comparison_status':'External observations only. No paired engine protocol or agreement measurement yet.'},indent=2)+'\n')
