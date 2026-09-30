// Progressive filters for the native Evidence and Inputs reading guides.
(function () {
  'use strict';
  function init(root, inputs) {
    var form = root.querySelector('[data-ei-form]');
    if (!form) return;
    var query = form.querySelector('[data-ei-query]');
    var status = form.querySelector('[data-ei-status]');
    var scope = form.querySelector('[data-ei-scope]');
    var namespace = form.querySelector('[data-ei-namespace]');
    var items = Array.from(root.querySelectorAll('[data-ei-item]'));
    var topics = Array.from(root.querySelectorAll('[data-ei-topic]'));
    var pager = root.querySelector('[data-ei-pager]');
    var topic = '', page = 0, pageSize = 40;
    function apply(resetPage) {
      if (resetPage === true) page = 0;
      var terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
      var matched = [];
      items.forEach(function (item) {
        var matches = (!status.value || item.dataset.status === status.value) &&
          (!scope || !scope.value || item.dataset.scope === scope.value) &&
          (!namespace || !namespace.value || item.dataset.namespace === namespace.value) &&
          (!topic || item.dataset.topic === topic) &&
          terms.every(function (term) { return item.dataset.search.indexOf(term) !== -1; });
        item.hidden = true;
        if (matches) matched.push(item);
      });
      var pages = inputs ? Math.max(1, Math.ceil(matched.length / pageSize)) : 1;
      page = Math.min(page, pages - 1);
      var start = inputs ? page * pageSize : 0;
      var end = inputs ? Math.min(start + pageSize, matched.length) : matched.length;
      matched.slice(start, end).forEach(function (item) { item.hidden = false; });
      root.querySelectorAll('[data-ei-group]').forEach(function (group) {
        group.hidden = !Array.from(group.querySelectorAll('[data-ei-item]')).some(function (item) { return !item.hidden; });
      });
      root.querySelector('[data-ei-count]').textContent = matched.length + ' of ' + items.length + (inputs ? ' input rows' : ' recorded checks') +
        (inputs && matched.length ? ' · showing ' + (start + 1) + '–' + end : '');
      root.querySelector('[data-ei-empty]').hidden = matched.length > 0;
      if (pager) {
        pager.hidden = pages <= 1;
        pager.querySelector('[data-ei-prev]').disabled = page === 0;
        pager.querySelector('[data-ei-next]').disabled = page === pages - 1;
        pager.querySelector('[data-ei-page]').textContent = 'Page ' + (page + 1) + ' of ' + pages;
      }
      topics.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.eiTopic === topic)); });
    }
    form.addEventListener('submit', function (event) { event.preventDefault(); });
    form.addEventListener('input', function () { apply(true); });
    form.addEventListener('change', function () { apply(true); });
    form.addEventListener('reset', function () { topic = ''; page = 0; setTimeout(apply, 0); });
    topics.forEach(function (button) {
      button.addEventListener('click', function () { topic = button.dataset.eiTopic; if (namespace) namespace.value = ''; apply(true); });
    });
    if (pager) ['prev', 'next'].forEach(function (direction) {
      pager.querySelector('[data-ei-' + direction + ']').addEventListener('click', function () {
        page += direction === 'next' ? 1 : -1; apply();
        form.scrollIntoView({block: 'start'}); query.focus({preventScroll: true});
      });
    });
    function openTarget() {
      var id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
      if (!id) return;
      var target = document.getElementById(id);
      if (!target || !root.contains(target)) return;
      if (target.matches('[data-ei-item]')) {
        form.reset(); topic = ''; page = inputs ? Math.floor(items.indexOf(target) / pageSize) : 0;
        apply(); target.open = true;
      }
    }
    apply(); openTarget(); addEventListener('hashchange', openTarget);
  }
  document.querySelectorAll('[data-ei-evidence]').forEach(function (root) { init(root, false); });
  document.querySelectorAll('[data-ei-inputs]').forEach(function (root) { init(root, true); });
}());
