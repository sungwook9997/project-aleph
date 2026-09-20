"""Import actual capture artifacts; never create substitutes for missing captures."""
import argparse
import hashlib
import json
import shutil
import subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(p): return json.loads(p.read_text())
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('capture',type=Path);a=ap.parse_args()
 catalog=read(ROOT/'data/catalog.json');cards={c['id']:c for c in catalog['cards']}
 manifest=read(a.capture/'diagnostics/manifest.json')
 for key in ('fluid','filament','motor'):
  src=a.capture/'diagnostics'/key
  if not (src/'metrics.json').exists(): continue
  m=read(src/'metrics.json');c=cards[key];dst=ROOT/'media'/key;dst.mkdir(parents=True,exist_ok=True)
  c['status']=m['status'];c['record']=f'media/{key}/record.json'
  c['limits']='이번 실행은 별도 소규모 진단입니다. 독립 기준 비교와 전체 세포 동역학 검증은 아직 수행하지 않았습니다.'
  if key=='motor':
   c['description']='현재 NMII 구성과 결합 종류로 만든 작은 모터·액틴 복합체의 초기 이완과 열운동을 관찰합니다.'
   c['limits']+=' 총 12 µs의 짧은 기록이며, 이 영상만으로 모터 보행이나 생리학적 수축을 입증하지 않습니다.'
  for name,field in [('poster.png','poster'),('plot.png','plot')]:
   if (src/name).exists(): shutil.copy2(src/name,dst/name);c[field]=f'media/{key}/{name}'
  frames=m.get('frames',[])
  if len(frames)>1:
   subprocess.run(['ffmpeg','-y','-loglevel','error','-framerate','10','-i',str(src/'frames/%05d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(dst/'video.mp4')],check=True)
   c['video']=f'media/{key}/video.mp4'
   m['playback']={'fps':10,'physical_frame_times_s':[f['time_s'] for f in frames],'interpolated':False,'note':'10 saved states per playback second, not real-time playback'}
  pars=m.get('parameters',{});c['run']={'device':manifest.get('device_name',manifest['device']),'commit':manifest['engine_commit'],'dt':pars.get('dt_s'),'steps':m.get('rows',[{}])[-1].get('step') if m.get('rows') else 0,'population':m.get('population',m.get('cells'))}
  files={p.name:sha(p) for p in src.glob('raw*.npz')}
  for p in src.glob('raw*.npz'): shutil.copy2(p,dst/p.name)
  record={'run':manifest,'measurement':m,'raw_files_sha256':files,'media_sha256':{p.name:sha(p) for p in dst.iterdir() if p.suffix in ('.png','.mp4')}}
  (dst/'record.json').write_text(json.dumps(record,indent=2)+'\n')
 geometry=a.capture/'geometry'
 if (geometry/'manifest.json').exists():
  gm=read(geometry/'manifest.json')
  for m in gm['parts']:
   key=m['name']
   if key not in cards: continue
   c=cards[key];src=geometry/key;dst=ROOT/'media'/key;dst.mkdir(parents=True,exist_ok=True)
   shutil.copy2(src/'record.json',dst/'record.json');c['record']=f'media/{key}/record.json'
   c['run']={'device':m['device_name'],'commit':m['engine_commit'],'dt':0,'steps':0,'population':m['n_active']}
   if (src/'poster.png').exists():
    shutil.copy2(src/'poster.png',dst/'poster.png');c['poster']=f'media/{key}/poster.png';c['status']='geometry'
   c['observe']='이 구성에서 생성된 모든 활성 노드·선분·면을 렌더러에 전달한 초기 구조. 다른 집단과의 결합은 조립하지 않았습니다.'
   c['limits']='0 스텝 구조 촬영입니다. 가림은 존재하며 굽힘 삼중항과 집단 사이 결합은 그림에 표시하지 않습니다. 정상 동역학이나 생리학적 적합성은 별도 검증이 필요합니다.'
   # Large geometry remains a separate downloadable archive, not duplicated into Pages.
   c['description']=c['description'].replace('촬영합니다.','촬영했습니다.')
 (ROOT/'data/catalog.json').write_text(json.dumps(catalog,ensure_ascii=False,indent=2)+'\n')
if __name__=='__main__': main()
