"""Assemble the published site for the Pages workflow: copy the prebuilt site/ to --out, unchanged.

The site itself is built by the aleph-site builder (build.py) and committed here as site/.
"""
import argparse
import shutil
from pathlib import Path

ap = argparse.ArgumentParser(description=__doc__)
ap.add_argument("--out", required=True)
a = ap.parse_args()
src, out = Path(__file__).resolve().parents[1] / "site", Path(a.out)
if out.exists():
    shutil.rmtree(out)
shutil.copytree(src, out)
print(f"copied {sum(1 for p in out.rglob('*') if p.is_file())} files from {src} to {out}")
