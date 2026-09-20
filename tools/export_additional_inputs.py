"""Read context, instrument and operating-point declarations. No runtime or conversion."""
import argparse, hashlib, json, subprocess, tomllib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PATHS={'aleph/cell/context.example.toml':'실험 문맥','aleph/inner/cortical_tension/instruments.toml':'기구','aleph/studio/conditions/row1_operating_point.toml':'실행 설정'}
def export(engine):
    sha=json.loads((ROOT/'data/sweep-inputs.json').read_text())['source']['commit'];rows=[];files=[]
    def walk(tree,prefix,path,category):
        for key,value in tree.items():
            name=f'{prefix}.{key}' if prefix else key
            if isinstance(value,dict) and ('value' in value or 'bound' in value):
                rows.append(dict(name=name,unit=value.get('unit'),value=value.get('value'),tag=value.get('tag'),range=value.get('range'),bound=value.get('bound'),source=value.get('source'),category=category,sourcePath=path,samplable=None,prior=None))
            elif isinstance(value,dict):walk(value,name,path,category)
            else:rows.append(dict(name=name,unit=None,value=value,tag='CONDITION',range=None,bound=None,source=None,category=category,sourcePath=path,samplable=None,prior=None))
    for path,category in PATHS.items():
        blob=subprocess.check_output(['git','show',f'{sha}:{path}'],cwd=engine);files.append(dict(path=path,sha256=hashlib.sha256(blob).hexdigest()))
        walk(tomllib.loads(blob.decode()),'',path,category)
    payload=dict(source=dict(commit=sha,files=files),inputs=rows)
    (ROOT/'data/additional-inputs.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n');print(len(rows),'additional inputs')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--engine',required=True);export(p.parse_args().engine)
