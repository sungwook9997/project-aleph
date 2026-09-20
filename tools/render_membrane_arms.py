"""Historical native-state postprocessing only; no physics/runtime imports."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/Users/sw1/ffn_cellsim/aleph/outputs/physics/volume_20260909')
RAW=Path('/Users/sw1/ffn_cellsim_runs_incoming/workstation_20260909/job70_vx_0909_2235')
DATA=ROOT/'data/historical-membrane'
MEDIA=ROOT/'media/historical-membrane'
LIMITS=[
 'Historical canonical snapshot, not validation of the current engine or comparison with a paper.',
 '2026-09-10 audit: these builds placed cortex on the smooth sphere under a wrinkled membrane (17.97% outside), and had zero ERM bonds; cortex–membrane coupling was absent.',
 'Commit is hand-deployed COMMIT_STAMP fdf7a43c; independent host-code receipt is not established.',
 'One seed, 200 steps at dt=1e-6 s. Sampled stored states are not independent replicates.',
 'Projection includes every stored membrane node, binned into display pixels; other populations are hidden, not removed from the original simulation.',
 'No interpolation, invented motion, new dynamics, pass threshold or external-data agreement.',
 'Historical RESULT prose differs from stored rows (e.g. X0 final volume: prose 1772.64, raw 1773.639138 um^3). All graphs use preserved raw rows, not prose summaries.',
 'Recorded scalar t=k*dt uses zero-based pre-increment k; frame filenames use completed steps k+1. Plots use completed-step elapsed time, retaining source t unchanged in raw files.'
]

def digest(p):
 h=hashlib.sha256()
 with p.open('rb') as f:
  for chunk in iter(lambda:f.read(1024*1024),b''):h.update(chunk)
 return h.hexdigest()

def main():
 DATA.mkdir(parents=True,exist_ok=True);MEDIA.mkdir(parents=True,exist_ok=True)
 records={};manifest={'classification':'historical native condition comparison only','limitations':LIMITS,'arms':{},'plots':[],'script_sha256':digest(Path(__file__))}
 for name in ('X0','X100','X1000'):
  rows_path=SOURCE/f'arm_{name}_steps.jsonl';run_path=SOURCE/f'arm_{name}_run_manifest.json'
  rows=[json.loads(s) for s in rows_path.read_text().splitlines() if s.strip()]
  run=json.loads(run_path.read_text());rec=json.loads((RAW/f'arm_{name}/manifest.json').read_text())
  for p in (rows_path,run_path):shutil.copy2(p,DATA/p.name)
  dt=run['conditions']['time']['dt'];t=np.array([(r['k']+1)*dt*1e6 for r in rows])
  records[name]=(rows,t)
  manifest['arms'][name]={'axis':'solver.surface_impermeable','value':run['conditions']['solver']['surface_impermeable'],
   'unit':'dimensionless normal-drag multiplier; 0 disables option','commit':run['commit'],'population':run['census']['n'],
   'dt_s':dt,'seed':run['conditions']['rng']['seed'],'source_spec_sha256':run['cell']['sha256'],
   'sources':[{'path':str(p),'sha256':digest(p)} for p in (rows_path,run_path,RAW/f'arm_{name}/manifest.json')],
   'frames':[],'membrane_range':rec['ranges']['membrane']}
 # Identical plotting protocol across arms; no fitted comparisons or inferred thresholds.
 for filename,keys,title in [
  ('volume-response.png',[('membrane','signed_volume_um3'),('envelope','signed_volume_um3')],'Enclosed-volume response'),
  ('area-response.png',[('membrane','area_um2'),('envelope','area_um2')],'Surface-area response')]:
  fig,axs=plt.subplots(1,2,figsize=(11,4))
  for ax,(surface,field) in zip(axs,keys):
   for name,(rows,t) in records.items():
    v=np.array([r['surfaces'][surface][field] for r in rows]);ax.plot(t,(v/v[0]-1)*100,'o-',ms=3,label=name)
   ax.set(title=surface,xlabel='Completed-step elapsed time [µs]',ylabel='Change from first stored sample [%]');ax.axhline(0,c='grey',lw=.5);ax.legend()
  fig.suptitle(title+' · historical build with no ERM bonds · not validation');fig.tight_layout();fig.savefig(MEDIA/filename,dpi=145);plt.close(fig);manifest['plots'].append('media/historical-membrane/'+filename)
 fig,axs=plt.subplots(1,2,figsize=(11,4))
 for name,(rows,t) in records.items():
  axs[0].plot(t,[r['area_constraint_relative_residual'] for r in rows],'o-',ms=3,label=name)
  axs[1].plot(t,[r['cg_residual'] for r in rows],'o-',ms=3,label=name)
 for ax,label in zip(axs,['Area-constraint relative residual [1]','Stored solver residual [pN]']):ax.set(xlabel='Completed-step elapsed time [µs]',ylabel=label,ylim=(0,None));ax.legend()
 fig.suptitle('Recorded solver diagnostics · historical build · no new verdict');fig.tight_layout();fig.savefig(MEDIA/'solver-response.png',dpi=145);plt.close(fig);manifest['plots'].append('media/historical-membrane/solver-response.png')
 # One fixed projection and scale across all three arms. Every membrane point contributes.
 extent=0.0
 for name,a in manifest['arms'].items():
  lo,hi=a['membrane_range']
  for f in sorted((RAW/f'arm_{name}/frames').glob('*_pos.npy')):
   p=np.load(f,mmap_mode='r')[lo:hi];extent=max(extent,float(np.abs(p[:,[0,2]]).max()))
 extent*=1.03
 for name,a in manifest['arms'].items():
  dest=MEDIA/name;dest.mkdir(exist_ok=True);lo,hi=a['membrane_range']
  for index,f in enumerate(sorted((RAW/f'arm_{name}/frames').glob('*_pos.npy'))):
   step=int(f.name.split('_')[0]);p=np.load(f,mmap_mode='r')[lo:hi]
   if not np.isfinite(p).all():raise ValueError(f'nonfinite coordinates: {f}')
   counts,_,_=np.histogram2d(p[:,0],p[:,2],bins=650,range=[[-extent,extent],[-extent,extent]])
   assert int(counts.sum())==hi-lo
   fig,ax=plt.subplots(figsize=(8,6));im=ax.imshow(np.log1p(counts.T),origin='lower',extent=[-extent,extent,-extent,extent],cmap='magma',vmin=0,vmax=np.log1p(150))
   fig.colorbar(im,ax=ax,label='log(1 + projected node count / pixel), display only')
   ax.set(xlabel='x [µm]',ylabel='z [µm]',title=f'{name}: surface_impermeable={a["value"]:g} · elapsed {step*a["dt_s"]*1e6:.0f} µs\nAll {hi-lo:,} membrane nodes · fixed projection · no interpolation')
   fig.text(.5,.015,'Historical 2026-09-09 build · ERM absent / cortex geometry defect · not current validation',ha='center',fontsize=8)
   fig.tight_layout(rect=[0,.025,1,1]);target=dest/f'{index:05d}.png';fig.savefig(target,dpi=120);plt.close(fig)
   a['frames'].append({'file':'media/historical-membrane/'+name+'/'+target.name,'completed_step':step,'elapsed_s':step*a['dt_s'],'source':str(f),'sha256':digest(f),'nodes_projected':hi-lo})
  subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-framerate','5','-i',str(dest/'%05d.png'),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',str(MEDIA/f'{name}.mp4')],check=True)
  a['video']='media/historical-membrane/'+name+'.mp4';a['poster']=a['frames'][0]['file']
  print(name,'rendered',len(a['frames']),'actual states',flush=True)
 manifest['display']={'projection':'x-z all membrane nodes','density_transform':'log1p, display only','density_color_max_count':150,'fixed_extent_um':extent,'fps':5,'interpolation':False}
 (DATA/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')

if __name__=='__main__':main()
