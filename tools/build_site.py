"""Validate local media references and publish only the explicit website files."""
import argparse
import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def build(out: Path) -> None:
    catalog = json.loads((ROOT / 'data/catalog.json').read_text())
    seen = set()
    for card in catalog['cards']:
        if card['id'] in seen:
            raise ValueError('Duplicate card: ' + card['id'])
        seen.add(card['id'])
        if card['status'] not in {'pending', 'failed', 'geometry', 'recorded', 'absent'}:
            raise ValueError('Unknown evidence status')
        if card['status'] == 'geometry' and (card['video'] or card['run'].get('steps') != 0):
            raise ValueError('Geometry must have zero steps and no motion video')
        if card['status'] in {'recorded', 'geometry'} and not card.get('record'):
            raise ValueError('A captured artifact needs a provenance record')
        for field in ('video', 'poster', 'plot', 'record'):
            value = card.get(field)
            if not value:
                continue
            path = (ROOT / value).resolve()
            if not path.is_relative_to(ROOT / 'data') and not path.is_relative_to(ROOT / 'media'):
                raise ValueError('Media must stay in public data/media: ' + value)
            if not path.is_file():
                raise FileNotFoundError(path)
    out = out.resolve()
    if out == ROOT or ROOT.is_relative_to(out):
        raise ValueError('Output must not replace the repository or its parent')
    if out.exists():
        raise FileExistsError('Use a fresh output directory: ' + str(out))
    out.mkdir(parents=True)
    for name in ('index.html', 'styles.css', 'app.js'):
        shutil.copy2(ROOT / name, out / name)
    for name in ('data', 'media'):
        if (ROOT / name).exists():
            shutil.copytree(ROOT / name, out / name)
    (out / '.nojekyll').touch()
    print(f'Validated {len(seen)} entries; website assembled at {out}')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--out', type=Path, required=True)
    build(parser.parse_args().out)
