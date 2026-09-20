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
        paths = [card.get(field) for field in ('video', 'poster', 'plot', 'record', 'raw')]
        paths += [item.get('path') for item in card.get('gallery', [])]
        paths += [item.get('plot') for item in card.get('comparisons', [])]
        paths += [item.get('url') for item in card.get('implementation', [])]
        for value in paths:
            if not value or value.startswith('https://'):
                continue
            path = (ROOT / value).resolve()
            if not path.is_relative_to(ROOT / 'data') and not path.is_relative_to(ROOT / 'media'):
                raise ValueError('Media must stay in public data/media: ' + value)
            if not path.is_file():
                raise FileNotFoundError(path)
    out = out.resolve()
    mechanisms = json.loads((ROOT / 'data/mechanisms.json').read_text())
    inputs = json.loads((ROOT / 'data/sweep-inputs.json').read_text())
    relations = json.loads((ROOT / 'data/relations.json').read_text())
    additional = json.loads((ROOT / 'data/additional-inputs.json').read_text())
    if len({x['source']['commit'] for x in (mechanisms, inputs, relations, additional)}) != 1:
        raise ValueError('Declaration snapshots must use the same source commit')
    by_name = {row['name']: row for row in inputs['inputs']}
    mapped = set()
    mechanism_ids = set()
    for mechanism in mechanisms['mechanisms']:
        if mechanism['id'] in mechanism_ids:
            raise ValueError('Duplicate mechanism')
        mechanism_ids.add(mechanism['id'])
        for row in mechanism['axes']:
            original = by_name[row['name']]
            for field in ('value', 'unit', 'tag', 'range', 'bound', 'prior', 'samplable'):
                if row[field] != original[field]:
                    raise ValueError('Input mapping drift: ' + row['name'])
            mapped.add(row['name'])
        for part in mechanism.get('parts', []):
            if part not in seen:
                raise ValueError('Unknown linked capture: ' + part)
        for item in mechanism.get('evidence', []):
            for key in ('plot', 'video', 'poster', 'record'):
                if not item.get(key):
                    continue
                path = (ROOT / item[key]).resolve()
                if not any(path.is_relative_to(ROOT / base) for base in ('data', 'media')):
                    raise ValueError('Evidence must be inside public data/media')
                if not path.is_file():
                    raise FileNotFoundError(path)
    required = {r['name'] for r in inputs['inputs'] if r['samplable'] or r['tag'] == 'SWEPT'}
    if required - mapped:
        raise ValueError('Unmapped declared axes: ' + str(sorted(required - mapped)))
    for row in inputs['inputs']:
        if row['bound'] and row['bound'] not in by_name:
            raise ValueError('Missing bound input target')
    nodes = {n['id'] for n in relations['nodes']}
    if any(e['from'] not in nodes or e['to'] not in nodes for e in relations['edges']):
        raise ValueError('Unknown relation endpoint')
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
