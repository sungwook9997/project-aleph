// The mini cell on the home page as the Aleph studio drew it (tools/studio_render.py): one looping video per story step,
// the flicker record's step 100 with that step's own segments and relations, only the families of the step drawn, the
// camera swaying so each loop joins without a seam. site.js calls Slab.show({id, ...}) as the steps scroll by; the
// step's video fades in over the last one. The full-size cell (?cell=native) stays with cell3d_real.js.
(function () {
  if (/[?&]cell=native/.test(location.search)) return;
  var cv = document.getElementById("cell3d"); if (!cv) return;
  window.CellStudio = true;                                   // cell3d_real.js stands down
  document.querySelectorAll(".cell-switch a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-cell") === "mini"); });
  document.querySelectorAll(".stage-meta[data-cell]").forEach(function (m) { m.classList.toggle("on", m.getAttribute("data-cell") === "mini"); });
  var reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var box = document.createElement("div"); box.className = "studio-stage"; cv.replaceWith(box);
  var load = document.getElementById("cell3d-loading"); if (load) load.remove();
  var ids = Array.prototype.map.call(document.querySelectorAll(".pstep[id^='step-']"), function (s) { return s.id.slice(5); });
  var vids = {}, cur = null, seen = true;
  function video(id) {
    if (vids[id]) return vids[id];
    var v = document.createElement("video"); v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute("playsinline", "");
    v.preload = reduce ? "none" : "auto"; v.poster = "media/studio/home_" + id + ".jpg"; v.setAttribute("aria-hidden", "true");
    if (!reduce) v.src = "media/studio/home_" + id + ".mp4";
    box.appendChild(v); return (vids[id] = v);
  }
  window.Slab = { show: function (conf) {
    var id = (conf && conf.id) || "cell"; if (ids.indexOf(id) < 0) id = "cell";
    var v = video(id); if (v === cur) return;
    Object.keys(vids).forEach(function (k) { if (vids[k] !== v) { vids[k].classList.remove("on"); vids[k].pause(); } });
    v.classList.add("on"); cur = v;
    if (!reduce && seen) v.play().catch(function () {});
    var next = ids[ids.indexOf(id) + 1]; if (next) video(next);   // the next step starts loading now
  } };
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { es.forEach(function (e) {
    seen = e.isIntersecting; if (!cur || reduce) return; if (seen) cur.play().catch(function () {}); else cur.pause(); }); }).observe(box);
  window.Slab.show({ id: "cell" });
})();
