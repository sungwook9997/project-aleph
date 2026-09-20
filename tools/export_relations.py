"""Export declared population relations from the pinned census, without engine import."""
import argparse,ast,hashlib,json,subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def export(engine):
 data=json.loads((ROOT/'data/sweep-inputs.json').read_text());sha=data['source']['commit'];path='aleph/cell/language.py'
 blob=subprocess.check_output(['git','show',f'{sha}:{path}'],cwd=engine);tree=ast.parse(blob);tables={}
 for n in tree.body:
  if isinstance(n,ast.AnnAssign) and getattr(n.target,'id','') in ('KINETIC_KINDS','FRONTIER_KINDS','POPULATIONS'):tables[n.target.id]=ast.literal_eval(n.value)
 static=None
 for fn in tree.body:
  if isinstance(fn,ast.FunctionDef) and fn.name=='interaction_graph':
   for n in fn.body:
    if isinstance(n,ast.Assign) and any(getattr(t,'id','')=='static' for t in n.targets):static=ast.literal_eval(n.value)
 assert static is not None
 edges=[]
 for table,status in [('KINETIC_KINDS','wired'),('FRONTIER_KINDS','declared')]:
  for kind,spec in tables[table].items():
   owner='nmii' if spec['owner']=='nmii_head' else spec['owner']
   edges.extend(dict(**{'from':owner,'to':p},kind=kind,status=status) for p in spec['partners'])
 for kind,(a,b) in static.items():edges.append(dict(**{'from':a,'to':b},kind=kind,status='wired'))
 # canonical census uses 'if' for intermediate filaments; preserve the exact identifier.
 names=sorted({e[k] for e in edges for k in ('from','to')})
 labels={'if':'중간 필라멘트','nmii':'NMII','cortex':'피질','membrane':'세포막','envelope':'핵막','lamina':'라미나','chromatin':'염색질','substrate':'기질','stress_fiber':'스트레스 섬유','microtubule':'미세소관','sf_arc':'아크','lamellipodium':'라멜리포디움','cytoplasm_actin':'세포질 액틴'}
 out=dict(source=dict(commit=sha,path=path,sha256=hashlib.sha256(blob).hexdigest()),nodes=[dict(id=n,label=labels.get(n,n)) for n in names],edges=edges,bindings=[{'from':r['name'],'to':r['bound']} for r in data['inputs'] if r['bound']],scope='Declared relation kinds, not measured active bonds. An actual run needs occupancy and force evidence.')
 (ROOT/'data/relations.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n');print(len(edges),'relations',len(out['bindings']),'input bindings')
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--engine',required=True);export(p.parse_args().engine)
