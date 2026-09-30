// Native site navigation around the archived, self-contained explorers.
(() => {
  const frame = document.querySelector('.explorer-frame');
  if (!frame) return;
  const tabs = [...document.querySelectorAll('[data-explorer-view]')];
  const locationParams = new URLSearchParams(location.search);
  if (frame.classList.contains('structure-frame') && locationParams.has('file')) {
    frame.src += '#' + new URLSearchParams({file: locationParams.get('file'), line: locationParams.get('line') || '1'});
  }
  function activate(link) {
    tabs.forEach(tab => tab.setAttribute('aria-current', tab === link ? 'page' : 'false'));
    frame.src = link.href;
    frame.title = link.dataset.frameTitle;
    frame.style.height = '1100px';
    history.replaceState(null, '', '#' + link.dataset.explorerView);
  }
  tabs.forEach(link => link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activate(link);
  }));
  const requested = tabs.find(tab => '#' + tab.dataset.explorerView === location.hash);
  if (requested && requested.getAttribute('aria-current') !== 'page') activate(requested);
  addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow || frame.dataset.autosize !== 'true') return;
    if (event.data?.type === 'aleph-explorer-height' && Number.isFinite(event.data.height)) {
      frame.style.height = Math.max(600, Math.min(24000, event.data.height + 2)) + 'px';
    }
  });
})();
