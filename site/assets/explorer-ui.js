// Shared controls for the native Map pages. Everything inherits the site's theme.
export const $ = (s, root = document) => root.querySelector(s);
export const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const words = value => String(value).replace(/_/g, ' ').replace(/\b\w/, c => c.toUpperCase());
export const el = (tag, cls, html = '') => {const e = document.createElement(tag); e.className = cls; e.innerHTML = html; return e;};
export const count = n => n.toLocaleString();
export function button(label, fn, cls = 'ex-button') {const b = el('button', cls, label); b.type = 'button'; b.onclick = fn; return b;}
export async function data(url) {const r = await fetch(url,{cache:'no-cache'}); if (!r.ok) throw new Error('Could not load the saved records.'); return r.json();}
export function fail(error, root) {root.replaceChildren(el('p', 'ex-note', esc(error.message)), button('Try again', () => location.reload()));}
export function setURL(values, replace = false) {
  const u = new URL(location.href); u.search = ''; u.hash = '';
  for (const [k,v] of Object.entries(values)) if (v !== '' && v != null) u.searchParams.set(k,v);
  history[replace ? 'replaceState' : 'pushState'](null, '', u);
}
export function tabs(root, options, active, select) {
  root.replaceChildren(...options.map(([key,label]) => {const b = button(label, () => select(key), 'ex-tab'); b.setAttribute('aria-pressed', key === active); return b;}));
}
export function empty(text) {return el('p','ex-empty',esc(text));}
export function disclosure(label, content, open = false) {const d = el('details','ex-disclosure'); d.open = open; d.append(el('summary','',esc(label)),content); return d;}
export function lazyDisclosure(label, render) {const d=el('details','ex-disclosure');d.append(el('summary','',esc(label)));let loaded=false;d.addEventListener('toggle',()=>{if(d.open&&!loaded){loaded=true;d.append(render());}});return d;}
export function valueText(value) {return typeof value === 'object' ? JSON.stringify(value) : String(value ?? '—');}
export function safeURL(text) {try {const u = new URL(text, location.href);return ['http:','https:'].includes(u.protocol) ? u.href : null;} catch {return null;}}
// Full records are rendered as labelled fields and expandable sections, never as executable HTML.
export function record(value, depth = 0) {
  if (value == null) return el('span','ex-missing','Not recorded');
  if (typeof value !== 'object') {
    if (typeof value === 'string' && /^https?:\/\/\S+$/.test(value) && safeURL(value)) return reference(value);
    return el('span','',esc(value));
  }
  if (Array.isArray(value)) {
    if (!value.length) return el('span','ex-missing','None recorded');
    const list = el('ul','ex-record-list');
    value.forEach((v,i) => {const li=el('li',''); if (typeof v === 'object' && v !== null) li.append(disclosure(v.title || v.name || v.id || v.parameter || `Record ${i+1}`,record(v,depth+1), value.length < 3 && depth < 2)); else li.append(record(v,depth+1)); list.append(li);}); return list;
  }
  const dl = el('dl','ex-fields');
  for (const [key,v] of Object.entries(value)) {
    const row = el('div',''); row.append(el('dt','',esc(words(key))));
    const dd = el('dd','');
    if (typeof v === 'object' && v !== null && depth > 0) dd.append(disclosure(Array.isArray(v)?`${v.length} records`:'Details',record(v,depth+1)));
    else dd.append(record(v,depth+1));
    row.append(dd); dl.append(row);
  } return dl;
}
export function reference(text) {const a=el('a','ex-reference',esc(text)); const u=safeURL(text);if(u){a.href=u;a.rel='noreferrer';} return a;}
export function reveal(target) {if (innerWidth < 800) target.scrollIntoView({block:'start'});}
