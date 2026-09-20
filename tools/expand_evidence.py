"""Postprocess recorded states and source data; no simulation or fitted reference."""
from pathlib import Path
import json, csv, hashlib, shutil
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation, FFMpegWriter
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/Users/sw1/ffn_cellsim')
ENGINE=Path('/Users/sw1/ffn-workers/visual-evidence-0920')
OUT=ROOT/'media/analysis';OUT.mkdir(exist_ok=True,parents=True)
cat=json.loads((ROOT/'data/catalog.json').read_text());cards={c['id']:c for c in cat['cards']}
def save(fig,name):
 fig.tight_layout();fig.savefig(OUT/name,dpi=145);plt.close(fig)
def gallery(key,name,title,caption,kind='image'):
 cards[key].setdefault('gallery',[]).append(dict(path='media/analysis/'+name,title=title,caption=caption,kind=kind))
for c in cards.values(): c['gallery']=[]
# Additional measured observables from the already recorded physical states.
for key in ('filament','motor'):
 folder=ROOT/'media'/key
 paths=sorted(folder.glob('raw_[0-9]*.npz'));raw=[np.load(p) for p in paths]
 tab=np.load(folder/'raw_tables.npz');t=np.array([float(r['time_s']) for r in raw])*1e6
 pos=np.array([r['pos'] for r in raw]);vel=np.array([r['vel'] for r in raw]);force=np.array([r['force'] for r in raw])
 ii,jj=tab['seg_i'],tab['seg_j'];length=np.linalg.norm(pos[:,ii]-pos[:,jj],axis=2)
 rel=(length/length[0]-1)*100
 fig,ax=plt.subplots(1,2,figsize=(10,3.8));ax[0].plot(t,rel.min(1),label='Minimum');ax[0].plot(t,np.median(rel,axis=1),label='Median');ax[0].plot(t,rel.max(1),label='Maximum');ax[0].set(xlabel='Recorded time [µs]',ylabel='Segment length change [%]');ax[0].legend()
 ax[1].plot(t[1:],np.linalg.norm(force,axis=2).max(1)[1:]);ax[1].set(xlabel='Recorded time [µs]',ylabel='Maximum stored node force [pN]',title='Initial force buffer not evaluated; omitted');fig.suptitle(key+' · recorded diagnostics, not validation')
 name=key+'-length-force.png';save(fig,name);gallery(key,name,'길이 변화와 저장된 힘','동일한 12 µs 실행의 추가 관측량. 허용 오차·실험 일치 판정이 아닙니다.')
 fig,ax=plt.subplots(1,2,figsize=(10,3.8));im=ax[0].imshow(np.linalg.norm(pos-pos[0],axis=2).T,aspect='auto',origin='lower',extent=[t[0],t[-1],0,pos.shape[1]]);fig.colorbar(im,ax=ax[0],label='Displacement [µm]');ax[0].set(xlabel='Recorded time [µs]',ylabel='Node index')
 ax[1].plot(t,np.linalg.norm(vel,axis=2).max(1));ax[1].set(xlabel='Recorded time [µs]',ylabel='Maximum stored speed [µm/s]');fig.suptitle(key+' · each saved state, same trajectory')
 name=key+'-node-motion.png';save(fig,name);gallery(key,name,'노드별 변위와 속도','원본 저장 상태에서 계산했습니다. 시간 샘플을 독립 실험으로 세지 않습니다.')
 # A synchronized 2D analytical view of the SAME run, visibly labelled.
 fig,(ax,chart)=plt.subplots(1,2,figsize=(10,4),gridspec_kw={'width_ratios':[1.4,1]})
 lo=pos.min(axis=(0,1));hi=pos.max(axis=(0,1));pad=max(float((hi-lo).max())*.08,.01)
 ax.set(xlim=(lo[0]-pad,hi[0]+pad),ylim=(lo[1]-pad,hi[1]+pad),xlabel='x [µm]',ylabel='y [µm]',aspect='equal')
 lines=[ax.plot([],[],color='#256e80',lw=.9)[0] for _ in ii]
 points=ax.scatter(pos[0,:,0],pos[0,:,1],s=7,c=tab['label'],cmap='viridis');title=ax.set_title('')
 disp=np.sqrt(np.mean(np.sum((pos-pos[0])**2,axis=2),axis=1));chart.plot(t,disp,color='#244a5a');cursor=chart.axvline(0,color='#d4633f');chart.set(xlabel='Physical time [µs]',ylabel='RMS displacement [µm]')
 fig.suptitle('SAME RECORDED RUN · 2D projection + readout · no interpolation',fontsize=10)
 def update(k):
  points.set_offsets(pos[k,:,:2]);title.set_text(f'{key} · t = {t[k]:.1f} µs')
  for l,i,j in zip(lines,ii,jj):l.set_data(pos[k,[i,j],0],pos[k,[i,j],1])
  cursor.set_xdata([t[k],t[k]]);return []
 fig.tight_layout();ani=FuncAnimation(fig,update,frames=len(raw));name=key+'-synchronized.mp4';ani.save(OUT/name,writer=FFMpegWriter(fps=10));plt.close(fig)
 gallery(key,name,'동일 실행: 형태와 변위를 함께 재생','새 실험이 아닌 원본 상태의 2D 분석 영상입니다. 물리 시간 0–12 µs, 보간 없음.',kind='video')
# Fluid pressure/divergence from the native staggered storage.
r=np.load(ROOT/'media/fluid/raw_field.npz');u=[r[k] for k in ('ux','uy','uz')];dx=float(r['dx']);div=sum(np.diff(v,axis=i) for i,v in enumerate(u))/dx
fig,ax=plt.subplots(1,2,figsize=(10,4));mid=div.shape[2]//2
for a,z,title,unit in [(ax[0],r['pressure'],'Stored pressure','pN/µm²'),(ax[1],div,'Discrete divergence','1/s')]:
 im=a.imshow(z[:,:,mid].T,origin='lower',cmap='coolwarm');fig.colorbar(im,ax=a,label=unit);a.set(title=title,xlabel='Grid i',ylabel='Grid j')
fig.suptitle('Steady MAC solution · same recorded field');save(fig,'fluid-pressure-divergence.png');gallery('fluid','fluid-pressure-divergence.png','압력과 이산 발산','속도 그림과 같은 정상 유동장입니다. 발산은 저장된 면 속도의 차분으로 계산했으며, 독립 실험과의 일치 검증은 아닙니다.')
# Full active-population geometry: distributions, not dynamic observables.
for folder in (ROOT/'.local/captures/geometry').iterdir():
 if not folder.is_dir() or folder.name not in cards:continue
 r=np.load(folder/'geometry.npz');active=r['node_alive'].astype(bool)
 if not active.any():continue
 p=r['pos'][active];segs=r['seg_ij'][r['seg_alive'].astype(bool)];length=np.linalg.norm(r['pos'][segs[:,0]]-r['pos'][segs[:,1]],axis=1)
 fig,ax=plt.subplots(1,2,figsize=(10,3.5));ax[0].hist(np.linalg.norm(p,axis=1),bins=60,color='#397d84');ax[0].set(xlabel='Distance from origin [µm]',ylabel='Active node count')
 if len(length):ax[1].hist(length,bins=60,color='#b97740');ax[1].set(xlabel='Active segment length [µm]',ylabel='Segment count')
 else:ax[1].text(.5,.5,'No segment table in this surface builder',ha='center',transform=ax[1].transAxes);ax[1].set_axis_off()
 fig.suptitle(folder.name+' · full active builder population · 0 physical steps');name=folder.name+'-geometry.png';save(fig,name);gallery(folder.name,name,'전체 활성 집단의 공간·길이 분포','저장된 모든 활성 노드와 선분을 집계한 초기 구조 통계입니다. 동역학이나 생리학적 적합성 판정이 아닙니다.')
# Independently sourced paper observations: preserve units and cohort identity.
base=SOURCE/'aleph/outputs/literature/tension_library/extraction_drafts/synthesis/mcf7_20260913'
for name in ('T033_tether_force.csv','T033_manifest.json','T042_summary.jsonl'):
 shutil.copy2(base/name,ROOT/'data/literature'/name)
rows=list(csv.DictReader((base/'T033_tether_force.csv').open()));groups=list(dict.fromkeys(x['cell_condition'] for x in rows))
fig,ax=plt.subplots(figsize=(9,4.5))
for i,g in enumerate(groups):
 vals=np.array([float(x['value']) for x in rows if x['cell_condition']==g]);jitter=np.linspace(-.14,.14,len(vals));ax.scatter(i+jitter,vals,s=18,alpha=.65);ax.plot([i-.2,i+.2],[np.median(vals)]*2,color='black');ax.text(i,max(vals)+2,f'n={len(vals)}',ha='center')
ax.set(xticks=range(len(groups)),xticklabels=groups,ylabel='Experimental tether force [pN]',title='Tsujita et al. 2021 · Fig. 1a Source Data\nIndividual observations; black line = median; no Aleph prediction')
ax.set_ylim(bottom=0);save(fig,'paper-t033-tether.png')
rows=[json.loads(l) for l in (base/'T042_summary.jsonl').read_text().splitlines()]
fig,ax=plt.subplots(figsize=(10,7));ax.barh(range(len(rows)),[x['value'] for x in rows],color='#397d84');ax.set(yticks=range(len(rows)),yticklabels=[x['source_location']['figure_or_table']+' · '+x['condition']+f" · n={x['sample_count']}" for x in rows],xlabel='Author-estimated active cortical tension [mN/m]',title='Hosseini et al. 2021 · Tables 1–2\nPublished medians, not individual cells; no Aleph prediction');ax.invert_yaxis();save(fig,'paper-t042-cortex.png')
# Auditable file mapping, without falsely linking current source to the old public tree.
manifest={'capture_commit':cat['engineCommit'],'public_ffn_cellsim_head':'dc25d528b5f1f10d922c6c912803fae1da1f43c7','note':'The public default branch lacks these current Aleph modules. Paths and SHA256 identify the actual local capture source; this is not a claim those files are public on that branch.','files':{}}
for c in cards.values():
 paths=[c['source'],'aleph/cell/assemble.py','aleph/physics/operators.py','aleph/physics/integrate.py']
 if c['id']=='filament': paths+=['dev/experiments/ladder/rung1_filament.py']
 if c['id']=='motor': paths+=['dev/experiments/ladder/rung4b_pair.py']
 if c['id'] in ('motor','nmii','cortex','membrane'):paths+=['aleph/cell/bonds.py','aleph/physics/kinetics.py']
 c['implementation']=[]
 for path in dict.fromkeys(paths):
  p=ENGINE/path
  if not p.exists():continue
  manifest['files'][path]={'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'commit':cat['engineCommit']}
  role='이번 소규모 시연의 실제 초기 구성' if 'dev/experiments/' in path else '부분의 노드·형상 생성' if '/build/' in path else '부분들을 같은 월드에 조립' if path.endswith('assemble.py') else '공통 물리 연산' if path.endswith('operators.py') else '시간 적분' if path.endswith('integrate.py') else '관계·결합 상태' if path.endswith(('bonds.py','kinetics.py')) else '해당 물리 구현'
  c['implementation'].append({'label':path,'url':'data/implementation.json','role':role+' · 촬영 소스 해시 확인'})
(root:=ROOT/'data/implementation.json').write_text(json.dumps(manifest,indent=2)+'\n')
cat['intro']='현재 Aleph 실행 기록, 실제 구현 연결과 독립 논문 관측값. 논문 데이터 확보와 엔진의 실험 재현은 별도 상태입니다.'
(ROOT/'data/catalog.json').write_text(json.dumps(cat,ensure_ascii=False,indent=2)+'\n')
