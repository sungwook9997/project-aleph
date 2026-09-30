// The mini cell on the home page as the Aleph studio drew it (tools/studio_render.py tour): ONE video of the flicker
// record's step 100, first built from the inside out while the camera circles, then one transition per story step (the
// outer layers dissolve away, the camera moves in) ending on a still rest. site.js calls Slab.show({id}) as the steps
// scroll by: the next step plays its transition and stops on its rest; any other jump shows that step's rest at once.
// The full-size cell (?cell=native) stays with cell3d_real.js.
(function () {
  if (/[?&]cell=native/.test(location.search)) return;
  var cv = document.getElementById("cell3d"); if (!cv) return;
  window.CellStudio = true;                                   // cell3d_real.js stands down
  document.querySelectorAll(".cell-switch a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-cell") === "mini"); });
  document.querySelectorAll(".stage-meta[data-cell]").forEach(function (m) { m.classList.toggle("on", m.getAttribute("data-cell") === "mini"); });
  var reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var v = document.createElement("video"); v.className = "studio-tour"; v.muted = true; v.playsInline = true;
  v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true"); v.preload = "auto";
  v.poster = "media/studio/tour.jpg"; v.src = "media/studio/tour.mp4";
  cv.replaceWith(v);
  var load = document.getElementById("cell3d-loading"); if (load) load.remove();
  window.Slab = { show: function (conf) { window.Slab._pending = conf; } };   // until the build has begun
  fetch("media/studio/tour.json").then(function (r) { return r.json(); }).then(function (m) {
    var ids = m.steps.map(function (s) { return s.id; }), cur = -1, stop = null, want;
    // stop on the rest frame by the clock, re-armed while the video is still short of it (buffering), then seek to the rest
    // itself: identical still frames fire no video-frame callback, which let the video run 0.25-0.8 s past its rest
    var tm = null;
    function settle(j) {
      if (cur !== j || stop === null) return;
      var left = stop - v.currentTime;
      if (left > 0.04 && !v.paused) { tm = setTimeout(function () { settle(j); }, left * 1000); return; }
      stop = null; v.pause(); v.currentTime = m.steps[j].rest;
    }
    function rest(j) { clearTimeout(tm); stop = null; v.pause(); v.currentTime = m.steps[j].rest; cur = j; }
    function play(j, from) {
      clearTimeout(tm); v.currentTime = from; stop = m.steps[j].rest; cur = j;
      v.play().catch(function () { if (cur === j) rest(j); });   // a play cut short by a later jump leaves that jump alone
      tm = setTimeout(function () { settle(j); }, (stop - from) * 1000);
    }
    function show(conf) {
      var j = ids.indexOf((conf && conf.id) || "cell"); if (j < 0) j = 0; if (j === cur) return;
      if (!reduce && j === cur + 1) play(j, m.steps[j].start); else rest(j);   // the next step plays; any other jump rests
    }
    // the build plays once; a step that scrolls in before it has begun waits for it, so the build never starts over
    function begin() { if (reduce) rest(0); else play(0, 0); want = window.Slab._pending; window.Slab = { show: show }; if (want) show(want); }
    // wait for the logo intro, so the cell is built where people can see it (as the 3-D viewer did)
    if (document.getElementById("aleph-intro") && document.documentElement.getAttribute("data-aleph-intro") !== "done")
      document.addEventListener("aleph-intro:done", begin, { once: true });
    else begin();
  });
})();
