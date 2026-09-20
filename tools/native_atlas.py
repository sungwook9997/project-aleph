"""Fresh full-density cell-builder atlas, rendered by Aleph Studio on allocated CUDA.

This is geometry instrumentation, not a dynamics run. All builders run in canonical
assembly order with the unchanged supplied spec. No population is downsampled.
Raw geometry is retained, including dormant nodes and alive masks. Visible views
contain every active node/relation of the named population, with a fixed camera.
Sanity: lengths um, masses pg; BuiltPart.check validates topology/finite/positive
quantities. dt=0 and steps=0 are explicit; no force, integration or verdict occurs.
"""
from __future__ import annotations
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import time
import numpy as np


def digest(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--engine', type=Path, required=True)
    parser.add_argument('--out', type=Path, required=True)
    parser.add_argument('--commit', required=True)
    args = parser.parse_args()
    if not os.environ.get('SLURM_JOB_ID'):
        raise RuntimeError('Shared workstation capture requires a Slurm allocation')
    actual = subprocess.check_output(['git','rev-parse','HEAD'],cwd=args.engine,text=True).strip()
    dirty = subprocess.check_output(['git','status','--porcelain','--untracked-files=no'],cwd=args.engine,text=True).strip()
    if actual != args.commit or dirty:
        raise RuntimeError('Engine must match the declared clean commit')
    import warp as wp
    from aleph.cell.assemble import build_parts
    from aleph.cell.params import Params
    from aleph.studio.render import default_camera, render_frame
    wp.init()
    devices = wp.get_cuda_devices()
    if not devices:
        raise RuntimeError('CUDA required; no CPU rendering/simulation fallback')
    device = devices[0]
    spec = args.engine/'aleph/cell/spec.example.toml'
    p = Params.load(spec)
    args.out.mkdir(parents=True,exist_ok=True)
    parts = build_parts(p,np.random.default_rng(p.get_int('cell.seed')))
    run = {'schema':'aleph-geometry-atlas-v1','engine_commit':actual,'engine_dirty':False,
           'capture_sha256':digest(__file__),'spec_sha256':digest(spec),'device':str(device),
           'device_name':device.name,'slurm_job':os.environ['SLURM_JOB_ID'],
           'created_utc':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'dt':0,'steps':0,
           'evidence_class':'as-built geometry only; no dynamics or physical validation',
           'parameters':'unchanged canonical spec.example.toml; labels retain source tags',
           'parts':[]}
    for name, part in parts.items():
        print('RENDER',name,part.n,flush=True)
        out=args.out/name; out.mkdir(exist_ok=True)
        part.check()
        active=part.alive('node'); ids=np.flatnonzero(active)
        si=part.seg_ij[part.alive('seg')]
        face=part.faces
        np.savez(out/'geometry.npz',pos=part.pos,radius=part.radius,mass=part.mass,
                 seg_ij=part.seg_ij,faces=part.faces,node_alive=active,
                 seg_alive=part.alive('seg'),tri_ijk=part.tri_ijk,tri_alive=part.alive('tri'))
        meta={**{k:v for k,v in run.items() if k!='parts'},'name':name,
              'n_allocated':part.n,'n_active':int(active.sum()),'n_segments':len(si),
              'n_faces':len(face),'render_visibility':'all active nodes, segments and faces produced by this population builder; inter-population bonds not assembled; bending triples stored but not drawn',
              'raw_sha256':digest(out/'geometry.npz')}
        if len(ids):
            # Reindex only inactive storage slots; this does not subsample an active population.
            remap=np.full(part.n,-1,np.int32); remap[ids]=np.arange(len(ids),dtype=np.int32)
            si=si[active[si].all(axis=1)]; face=face[active[face].all(axis=1)]
            si=remap[si]; face=remap[face]
            pos=part.pos[ids]
            centre=(pos.min(0)+pos.max(0))/2
            extent=max(float(np.linalg.norm(pos-centre,axis=1).max()),0.05)
            scene={'pos':wp.array(pos,dtype=wp.vec3d,device=device),
                   'radius':wp.array(part.radius[ids],dtype=wp.float64,device=device),
                   'label':wp.array(np.full(len(ids),part.label,np.int32),dtype=wp.int32,device=device),
                   'seg_i':wp.array(si[:,0],dtype=wp.int32,device=device),
                   'seg_j':wp.array(si[:,1],dtype=wp.int32,device=device),'n_seg':len(si),
                   'face_i':wp.array(face[:,0],dtype=wp.int32,device=device),
                   'face_j':wp.array(face[:,1],dtype=wp.int32,device=device),
                   'face_k':wp.array(face[:,2],dtype=wp.int32,device=device),'n_face':len(face)}
            cam=default_camera(centre,extent * 1.3,1000,750)
            png,render=render_frame(scene,cam,None,str(device),fmt='png')
            assert render['n_nodes']==len(ids) and render['n_seg']==len(si) and render['n_face']==len(face)
            (out/'poster.png').write_bytes(png)
            meta.update(camera=cam,render=render,n_segments=len(si),n_faces=len(face),extent_um=extent,poster_sha256=digest(out/'poster.png'))
            del scene
        else:
            meta['absence']='The unchanged spec builds no active members; no demonstration was fabricated.'
        (out/'record.json').write_text(json.dumps(meta,indent=2)+'\n')
        run['parts'].append(meta)
    (args.out/'manifest.json').write_text(json.dumps(run,indent=2)+'\n')

if __name__=='__main__':
    main()
