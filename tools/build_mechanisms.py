"""Bind editorial mechanisms to the exported, commit-pinned input declarations. No physics."""
import argparse
import copy
import hashlib
import json
import subprocess
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def build(engine):
    declared=json.loads((ROOT/'data/sweep-inputs.json').read_text())
    definitions=json.loads((ROOT/'data/mechanism-definitions.json').read_text())
    assert definitions['commit']==declared['source']['commit'], 'Input and mechanism snapshots differ'
    sha=definitions['commit']
    frontier={key for m in definitions['mechanisms'] if m['id'].startswith('frontier-') for key in m['selectors']}
    mechanism_rows=[]
    file_hashes={}
    for original in definitions['mechanisms']:
        m=copy.deepcopy(original)
        selectors=m.pop('selectors')
        m['axes']=[dict(r, wired=False if r['name'] in frontier else None) for r in declared['inputs'] if any(r['name']==s or r['name'].startswith(s) for s in selectors)]
        assert m['axes'],m['id']+' has no declared input'
        for impl in m['implementation']:
            path=impl['path']
            blob=subprocess.check_output(['git','show',f'{sha}:{path}'],cwd=engine)
            file_hashes[path]=hashlib.sha256(blob).hexdigest()
            impl['sha256']=file_hashes[path]
        mechanism_rows.append(m)
    source=dict(declared['source'],path='aleph/cell/spec.example.toml + prior.toml',implementation_files=[dict(path=p,sha256=h) for p,h in sorted(file_hashes.items())])
    payload=dict(source=source,inputCounts=declared['counts'],mechanisms=mechanism_rows)
    (ROOT/'data/mechanisms.json').write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    print(f'{len(mechanism_rows)} mechanisms; {len(file_hashes)} implementation files pinned to {sha}')

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--engine',type=Path,required=True);build(p.parse_args().engine)
