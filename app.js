'use strict';
const $ = (selector) => document.querySelector(selector);
let cards = [], activeId = null, filter = 'all', query = '';
const labels = {absent: '현재 입력에서 없음', recorded: '실행 기록 있음', pending: '촬영 대기', failed: '실행 확인 필요', geometry: '구조 촬영 · 동역학 미검증'};
function element(tag, className, text) { const node = document.createElement(tag); if (className) node.className = className; if (text !== undefined) node.textContent = text; return node; }
function safePath(value) { if (typeof value !== 'string' || !value.trim()) return null; try { const url = new URL(value, location.href); if (!['http:', 'https:'].includes(url.protocol)) return null; return url.href; } catch { return null; } }
function link(text, href) { const a = element('a', '', text); a.href = safePath(href); a.target = '_blank'; a.rel = 'noopener'; return a; }
function currentHash() { const match = location.hash.match(/^#part=(.+)$/); if (!match) return null; try { return decodeURIComponent(match[1]); } catch { return null; } }
function renderList() {
  const visible = cards.filter(card => (filter === 'all' || card.group === filter) && `${card.title} ${card.subtitle} ${card.description}`.toLocaleLowerCase().includes(query));
  $('#result-count').textContent = `${visible.length}`;
  const list = $('#component-list'); list.replaceChildren();
  if (!visible.length) list.append(element('p', 'empty-state', '검색 조건에 맞는 구성 요소가 없습니다.'));
  visible.forEach(card => {
    const button = element('button', `component${card.id === activeId ? ' selected' : ''}`); button.type = 'button'; button.setAttribute('aria-pressed', String(card.id === activeId)); button.setAttribute('aria-label', `${card.title}, ${labels[card.status] || labels.pending}`);
    const top = element('span', 'component-top'); top.append(element('strong', '', card.title), element('span', `status-dot ${card.status}`)); button.append(top, element('small', '', card.subtitle || (card.group === 'cell' ? '세포 구성' : '물리 엔진')));
    button.addEventListener('click', () => { activeId = card.id; history.replaceState(null, '', `#part=${encodeURIComponent(card.id)}`); renderList(); renderDetail(card); document.querySelector('.component.selected')?.focus({preventScroll:true}); }); list.append(button);
  });
}
function addImage(parent, path, title, className, alt) { const src = safePath(path); if (!src) return; const section = element('section', className); section.append(element('h4', '', title)); const image = element('img'); image.src = src; image.alt = alt; image.loading = 'lazy'; image.addEventListener('error', () => { image.replaceWith(element('p', 'media-caption', '이미지를 불러오지 못했습니다. 원본 기록에서 확인해 주세요.')); }, {once: true}); section.append(image); parent.append(section); }
function evidenceSection(title, eyebrow) {
  const section = element('section', 'evidence-extension');
  section.append(element('span', 'extension-eyebrow', eyebrow), element('h4', 'extension-title', title));
  return section;
}
function renderExtensions(panel, card) {
  if (Array.isArray(card.implementation) && card.implementation.length) {
    const section = evidenceSection('코드와 세포역학의 연결', 'IMPLEMENTATION');
    const list = element('ul', 'implementation-list');
    card.implementation.forEach(item => {
      const row = element('li');
      const title = element('div', 'implementation-name');
      if (safePath(item.url)) title.append(link(`${item.label || '구현 코드'} ↗`, item.url));
      else title.append(element('span', '', item.label || '구현 코드'));
      row.append(title, element('p', '', item.role || '이 구현의 역할은 아직 설명되지 않았습니다.'));
      list.append(row);
    });
    section.append(list); panel.append(section);
  }
  if (Array.isArray(card.comparisons) && card.comparisons.length) {
    const section = evidenceSection('논문 데이터와 어떻게 비교하나요', 'REFERENCE & COMPARISON');
    card.comparisons.forEach(item => {
      const comparison = element('article', 'comparison-card');
      const title = element('h5');
      if (safePath(item.url)) title.append(link(`${item.title || '비교 자료'} ↗`, item.url));
      else title.textContent = item.title || '비교 자료';
      comparison.append(title, element('span', 'comparison-status', item.status || '비교 상태 미기재'));
      const dl = element('dl', 'comparison-fields');
      for (const [label, text] of [['비교할 관측량',item.observable],['비교 방법',item.protocol]]) {
        dl.append(element('dt', '', label), element('dd', '', text || '아직 정의되지 않았습니다.'));
      }
      comparison.append(dl);
      const gap = element('div', 'comparison-gap');
      gap.append(element('strong', '', '현재 근거와 남은 차이'), element('p', '', item.gap || '비교 결과와 남은 차이가 아직 공개되지 않았습니다.'));
      comparison.append(gap);
      if (item.plot) addImage(comparison, item.plot, '비교 관측 그래프', 'plot', `${item.title || card.title} 비교 그래프`);
      if (item.data) comparison.append(link('논문 수치 데이터 내려받기 ↗',item.data));
      section.append(comparison);
    });
    panel.append(section);
  }
  if (Array.isArray(card.gallery) && card.gallery.length) {
    const section = evidenceSection('추가 관측 그래프와 영상', 'ADDITIONAL OBSERVATIONS');
    const grid = element('div', 'observation-gallery');
    card.gallery.forEach(item => {
      const path = safePath(item.path); if (!path) return;
      const figure = element('figure', 'observation-item');
      figure.append(element('h5', '', item.title || '추가 관측'));
      let media;
      if (item.kind === 'video') {
        media = element('video'); media.controls = true; media.playsInline = true; media.preload = 'metadata';
        media.setAttribute('aria-label', item.title || `${card.title} 추가 관측 영상`);
      } else {
        media = element('img'); media.alt = item.title || `${card.title} 추가 관측 그래프`; media.loading = 'lazy';
      }
      media.src = path;
      media.addEventListener('error', () => { media.replaceWith(element('p', 'media-caption', '미디어를 불러오지 못했습니다. 아래 원본 링크를 확인해 주세요.')); }, {once:true});
      const caption = element('figcaption');
      if (item.caption) caption.append(element('p', '', item.caption));
      caption.append(link(item.kind === 'video' ? '원본 영상 보기 ↗' : '원본 이미지 보기 ↗', item.path));
      figure.append(media, caption); grid.append(figure);
    });
    if (grid.children.length) { section.append(grid); panel.append(section); }
  }
}
function renderDetail(card) {
  const panel = $('#detail'); panel.replaceChildren();
  if (!card) { panel.append(element('p', 'empty-state', '공개된 구성 요소 기록이 아직 없습니다.')); return; }
  const kicker = element('div', 'detail-kicker'); kicker.append(element('span', '', card.group === 'cell' ? 'CELL COMPOSITION' : 'PHYSICS ENGINE'), element('span', `status-badge ${card.status}`, labels[card.status] || labels.pending));
  panel.append(kicker, element('h3', '', card.title), element('p', 'subtitle', card.subtitle || ''), element('p', 'description', card.description || '설명을 준비하고 있습니다.'));
  const media = element('div', 'media-frame'); const videoPath = safePath(card.video); const posterPath = safePath(card.poster);
  if (videoPath) { const video = element('video'); video.controls = true; video.playsInline = true; video.preload = 'metadata'; video.setAttribute('aria-label', `${card.title} 실제 엔진 실행 영상`); if (posterPath) video.poster = posterPath; video.src = videoPath; video.append(element('p', '', '브라우저가 영상 재생을 지원하지 않습니다.')); video.addEventListener('error', () => { media.append(element('p', 'media-caption', '영상을 불러오지 못했습니다. 아래 원본 영상 링크를 확인해 주세요.')); }, {once:true}); media.append(video); }
  else if (posterPath) { const still = element('img'); still.src = posterPath; still.alt = `${card.title} 엔진 실행 정지 이미지`; media.append(still); }
  else { const placeholder = element('div', 'media-placeholder'); placeholder.append(element('span', '', 'EVIDENCE IN PROGRESS'), element('h4', '', card.status === 'absent' ? '현재 입력에는 이 집단이 없습니다' : card.status === 'failed' ? '실행을 확인하고 있습니다' : '실제 실행 장면을 준비합니다'), element('p', '', card.status === 'absent' ? '입력과 생성 기록을 확인할 수 있습니다. 존재하지 않는 구조를 연출하지 않습니다.' : '촬영된 엔진 기록이 연결되면 이곳에서 확인할 수 있습니다. 현재 표시할 영상은 없습니다.')); media.append(placeholder); }
  panel.append(media, element('div', 'media-caption', card.caption || (card.status === 'geometry' ? '초기 구조 촬영 · 0 스텝 · 동역학이나 안정성을 검증한 기록이 아닙니다.' : videoPath ? '실제 실행 기록 · 재생 속도와 물리 시간은 영상 및 원본 기록을 확인하세요.' : posterPath ? '실행 정지 이미지 · 영상 기록은 촬영 대기입니다.' : '미촬영 항목 · 물리적 적합성을 확인한 상태가 아닙니다.')));
  const copy = element('div', 'evidence-copy'); for (const [title, value] of [['무엇을 관찰하나요', card.observe], ['무엇을 측정하나요', card.measure]]) { const section = element('section'); section.append(element('h4', '', title), element('p', '', value || '측정 설명을 준비하고 있습니다.')); copy.append(section); } panel.append(copy);
  const limits = element('div', 'limits'); limits.append(element('strong', '', '이 기록이 말할 수 있는 범위'), element('p', '', card.limits || '기록의 조건과 검증 범위가 아직 공개되지 않았습니다. 이 항목만으로 전체 세포의 정상 작동을 결론 내릴 수 없습니다.')); panel.append(limits);
  if (videoPath && posterPath) addImage(panel, card.poster, '실행 장면 · 정지 이미지', 'still', `${card.title} 기록된 상태`);
  addImage(panel, card.plot, '측정 결과 · 단위와 비교 기준은 그림 및 원본 기록 참조', 'plot', `${card.title} 물리 측정 결과 그래프`);
  renderExtensions(panel, card);
  const provenance = element('section', 'provenance'); provenance.append(element('h4', '', 'RUN PROVENANCE / 실행 출처')); const dl = element('dl'); const run = card.run || {}; for (const [name, value] of [['장치',run.device],['코드 버전',run.commit],['시간 간격 (s)',run.dt],['스텝',run.steps],[Array.isArray(run.population) ? '격자 크기' : '개체수',run.population]]) { if (value !== undefined && value !== null && value !== '') dl.append(element('dt', '', name), element('dd', '', typeof value === 'object' ? JSON.stringify(value) : String(value))); } if (dl.children.length) provenance.append(dl); else provenance.append(element('p', 'media-caption', '실행 출처는 기록 생성 후 공개됩니다.'));
  const links = element('div', 'record-links'); for (const [text, path] of [['원본 기록 JSON ↗',card.record],['원본 영상 ↗',card.video],['원본 데이터 내려받기 ↗',card.raw]]) if (safePath(path)) links.append(link(text,path)); if (typeof card.source === 'string' && card.source) { if (/^https:\/\//.test(card.source)) links.append(link('구현 코드 ↗', card.source)); else { const source = element('p', 'media-caption'); source.append(document.createTextNode('구현 경로 · '), element('code', '', card.source)); provenance.append(source); } } provenance.append(links); panel.append(provenance);
}
function chooseFromHash() { const id = currentHash(); const card = cards.find(c => c.id === id) || cards.find(c => c.id === activeId) || cards[0]; activeId = card?.id || null; renderList(); renderDetail(card); }
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; document.querySelectorAll('[data-filter]').forEach(item => { item.classList.toggle('active',item === button); item.setAttribute('aria-pressed',String(item === button)); }); renderList(); }));
$('#search').addEventListener('input', event => { query = event.target.value.trim().toLocaleLowerCase(); renderList(); });
window.addEventListener('hashchange',chooseFromHash);
fetch('./data/catalog.json').then(response => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then(data => { if (!Array.isArray(data.cards)) throw new Error('Invalid catalog'); cards = data.cards; const coverage = $('#coverage'); for (const [count,title] of [[cards.length,'공개 구성 요소'],[cards.filter(c=>c.status==='geometry').length,'구조 촬영'],[cards.filter(c=>c.video).length,'동역학 실행'],[new Set(cards.flatMap(c=>[c.video,...(c.gallery||[]).filter(g=>g.kind==='video').map(g=>g.path)]).filter(Boolean)).size,'영상 보기'],[new Set(cards.flatMap(c=>[c.plot,...(c.gallery||[]).filter(g=>g.kind==='image').map(g=>g.path),...(c.comparisons||[]).map(r=>r.plot)]).filter(Boolean)).size,'관측·구조·논문 그래프'],[cards.filter(c=>c.status==='pending').length,'촬영 대기'],[cards.filter(c=>c.status==='absent').length,'현재 입력에서 없음']]) { const item = element('span'); item.append(element('strong','',String(count)), document.createTextNode(title)); coverage.append(item); } if (data.updated) $('#updated').textContent = `Updated ${data.updated}`; chooseFromHash(); }).catch(() => { $('#load-error').hidden = false; $('#load-error').textContent = '실행 목록을 불러오지 못했습니다. 잠시 후 새로고침하거나 GitHub의 공개 기록을 확인해 주세요.'; $('#detail').replaceChildren(element('p','empty-state','근거 목록 연결 대기')); });
