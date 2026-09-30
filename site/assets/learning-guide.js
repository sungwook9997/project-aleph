/* Explanatory route animation only. No model calls or generated predictions. */
(() => {
  'use strict';
  document.querySelectorAll('[data-learning-guide]').forEach(root => {
    const choices = [...root.querySelectorAll('[data-lg-route]')];
    const panels = [...root.querySelectorAll('[data-lg-panel]')];
    const play = root.querySelector('[data-lg-play]');
    const restart = root.querySelector('[data-lg-restart]');
    const announcement = root.querySelector('[data-lg-announcement]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let route = 0, step = 0, playing = !motion.matches, onScreen = true;
    let phase = 0, previous = null, frame = null;
    const STEP_MS = 6500, RETURN_MS = 1600;
    const panel = () => panels[route];
    const steps = () => [...panel().querySelectorAll('[data-lg-step]')];
    function controls() {
      play.textContent = playing ? 'Pause path' : 'Play path';
      play.setAttribute('aria-pressed', String(playing));
      root.classList.toggle('lg-playing', playing);
      root.classList.toggle('lg-reduced', motion.matches);
    }
    function showStep(index, announce = false) {
      step = index;
      const buttons = steps();
      buttons.forEach((button, i) => {
        button.setAttribute('aria-pressed', String(i === step));
        button.closest('li').classList.toggle('lg-past', i < step);
      });
      panel().querySelectorAll('.lg-step-detail').forEach((detail, i) => { detail.hidden = i !== step; });
      panel().style.setProperty('--lg-step', step);
      if (announce) announcement.textContent = `${choices[route].querySelector('strong').textContent}. Step ${step + 1}: ${buttons[step].textContent.trim().replace(/^\d+/, '').trim()}.`;
    }
    function showRoute(index, announce = false) {
      route = index; phase = 0; previous = null;
      choices.forEach((button, i) => button.setAttribute('aria-pressed', String(i === route)));
      panels.forEach((p, i) => { p.hidden = i !== route; p.classList.remove('lg-returning'); p.style.setProperty('--lg-progress', 0); });
      showStep(0, announce);
    }
    function schedule() {
      if (frame === null && playing && onScreen && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function tick(now) {
      frame = null;
      if (!playing || !onScreen || document.hidden) { previous = null; return; }
      if (previous !== null) phase += Math.min(100, now - previous);
      previous = now;
      const count = steps().length, forward = count * STEP_MS;
      if (phase >= forward + RETURN_MS) phase %= forward + RETURN_MS;
      const next = Math.min(count - 1, Math.floor(phase / STEP_MS));
      if (next !== step) showStep(next);
      panel().classList.toggle('lg-returning', phase >= forward);
      panel().style.setProperty('--lg-progress', Math.min(1, (phase % STEP_MS) / STEP_MS));
      panel().style.setProperty('--lg-return', Math.max(0, (phase - forward) / RETURN_MS));
      schedule();
    }
    function stop() { playing = false; previous = null; controls(); }
    choices.forEach((button, i) => button.addEventListener('click', () => { stop(); showRoute(i, true); }));
    panels.forEach(p => p.querySelectorAll('[data-lg-step]').forEach(button => button.addEventListener('click', () => {
      stop(); phase = Number(button.dataset.lgStep) * STEP_MS;
      p.classList.remove('lg-returning'); p.style.setProperty('--lg-progress', 0);
      showStep(Number(button.dataset.lgStep), true);
    })));
    play.addEventListener('click', () => { playing = !playing; previous = null; controls(); schedule(); });
    restart.addEventListener('click', () => { phase = 0; previous = null; panel().classList.remove('lg-returning'); panel().style.setProperty('--lg-progress', 0); showStep(0, true); schedule(); });
    const preference = () => { if (motion.matches) stop(); controls(); };
    if (motion.addEventListener) motion.addEventListener('change', preference);
    else if (motion.addListener) motion.addListener(preference);
    document.addEventListener('visibilitychange', () => { previous = null; schedule(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => {
      onScreen = entries[0].isIntersecting; previous = null; schedule();
    }, { threshold: 0 }).observe(root);
    // Deep links retain access to a particular role or stage, including browser back/forward.
    function revealHash() {
      const id = location.hash.slice(1);
      const target = id && document.getElementById(id);
      const p = target && target.closest('[data-lg-panel]');
      if (!p || !root.contains(p)) return;
      stop(); showRoute(panels.indexOf(p));
      const detail = target.closest('.lg-step-detail');
      if (detail) { const i = [...p.querySelectorAll('.lg-step-detail')].indexOf(detail); phase = i * STEP_MS; showStep(i); }
    }
    root.classList.add('lg-ready');
    showRoute(0); controls(); revealHash(); schedule();
    window.addEventListener('hashchange', revealHash);
  });
})();
