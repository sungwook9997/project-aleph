// Aleph site — theme, mobile menu, input-table filter. No dependencies.
(function () {
  var root = document.documentElement;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var tbtn = document.getElementById("theme");
  function updateThemeLabel() { if (tbtn) tbtn.textContent = root.dataset.theme === "dark" ? "Light" : "Dark"; }
  updateThemeLabel();
  if (tbtn) tbtn.addEventListener("click", function () {
    root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
    store("aleph-theme", root.dataset.theme);
    updateThemeLabel();
  });

  var mbtn = document.getElementById("menu"), nav = document.getElementById("nav");
  if (mbtn && nav) mbtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    mbtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  var q = document.getElementById("q"), table = document.getElementById("rows");
  if (q && table) {
    var rows = Array.prototype.slice.call(table.tBodies[0].rows);
    var boxes = Array.prototype.slice.call(document.querySelectorAll("[data-tag]"));
    var count = document.getElementById("count");
    function apply() {
      var s = q.value.trim().toLowerCase(), shown = 0;
      var on = boxes.filter(function (b) { return b.checked; }).map(function (b) { return b.dataset.tag; });
      rows.forEach(function (r) {
        var ok = (!s || r.textContent.toLowerCase().indexOf(s) >= 0) && on.indexOf(r.dataset.tag) >= 0;
        r.hidden = !ok; if (ok) shown++;
      });
      if (count) count.textContent = shown + " of " + rows.length + " rows";
    }
    q.addEventListener("input", apply);
    boxes.forEach(function (b) { b.addEventListener("change", apply); });
    apply();
  }

  // story: the step in view tells the real-cell slice (slab3d.js) which layers to take away and where to look
  var label = document.getElementById("story-label");
  var steps = Array.prototype.slice.call(document.querySelectorAll(".pstep"));
  if (steps.length && "IntersectionObserver" in window) {
    function words(s) { return (s || "").split(" ").filter(Boolean); }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var st = e.target;
      if (window.Slab) window.Slab.show({ id: st.id ? st.id.replace(/^step-/, "") : "cell", focus: words(st.dataset.focus), peel: words(st.dataset.peel), zoom: parseFloat(st.dataset.zoom) || 1, target: st.dataset.target });
      if (label) { label.textContent = st.dataset.title || ""; label.classList.toggle("on", !!st.dataset.title); }
      st.dispatchEvent(new CustomEvent("scene:enter", { bubbles: true }));
    }); }, { rootMargin: "-45% 0px -45% 0px" });
    steps.forEach(function (s) { io.observe(s); });
  }

  // the 3-D assembly: one family added per still, from the inside out, then hold on the whole cell
  var asm = document.getElementById("assembly");
  if (asm) {
    var ai = Array.prototype.slice.call(asm.querySelectorAll("img")), al = document.getElementById("asm-label"), at = null;
    var reduceA = false; try { reduceA = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
    function showA(i) { ai.forEach(function (im, k) { im.classList.toggle("on", k === i); }); if (al) al.textContent = ai[i].dataset.label; }
    function runA(i) { clearTimeout(at); showA(i); if (i < ai.length - 1) at = setTimeout(function () { runA(i + 1); }, 1100); }
    if (reduceA) showA(ai.length - 1);
    else if (document.getElementById("aleph-intro") && document.documentElement.getAttribute("data-aleph-intro") !== "done")
      document.addEventListener("aleph-intro:done", function () { runA(0); }, { once: true });
    else runA(0);
    var rb = document.getElementById("asm-replay"); if (rb) rb.addEventListener("click", function () { runA(0); });
  }
})();
// Switch recordings without combining their videos or measurements.
(function () {
  function select(group, id) {
    group.querySelectorAll(':scope > .record-view').forEach(function (p) {
      p.hidden = p.id !== id;
      if (p.hidden) p.querySelectorAll('video').forEach(function (v) { v.pause(); });
    });
    group.querySelectorAll(':scope > .record-view-controls button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.viewFor === id)); });
    window.dispatchEvent(new Event('resize'));
  }
  document.querySelectorAll('[data-record-views]').forEach(function (group) {
    var buttons = group.querySelectorAll(':scope > .record-view-controls button');
    buttons.forEach(function (b) { b.addEventListener('click', function () { select(group, b.dataset.viewFor); }); });
    if (buttons.length) select(group, buttons[0].dataset.viewFor);
  });
  function reveal() {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!target) return;
    var panel = target.closest('.record-view');
    while (panel) { select(panel.parentElement, panel.id); panel = panel.parentElement.closest('.record-view'); }
  }
  window.addEventListener('hashchange', reveal); reveal();
})();
// C1's loops: fetched and played only while on screen
(function () {
  // studio videos (figure.vscene): the simulated clock from the video's own time; a scale bar true at the camera target,
  // sized from the view's height in um and how object-fit: cover scales the frame into the box
  document.querySelectorAll("figure.vscene").forEach(function (f) {
    var v = f.querySelector("video"), clock = f.querySelector(".scene-clock"), bar = f.querySelector(".scene-scale i");
    var t0 = +f.dataset.t0, t1 = +f.dataset.t1, vh = +f.dataset.vh, um = +f.dataset.bar;
    function size() { var W = v.videoWidth || 1600, H = v.videoHeight || 1000, k = (getComputedStyle(v).objectFit === "contain" ? Math.min : Math.max)(v.clientWidth / W, v.clientHeight / H);
      if (bar) bar.style.width = (um / vh * H * k) + "px"; }
    size(); window.addEventListener("resize", size); v.addEventListener("loadedmetadata", size);
    function tick() { if (clock && v.duration) clock.textContent = "t = " + (function (value) { return t1 < 0.001 ? (value * 1e6).toFixed(2) + " µs recorded" : value.toFixed(2) + " s recorded"; })(t0 + (t1 - t0) * Math.min(1, v.currentTime / (v.duration - (f.dataset.fps ? 1 / +f.dataset.fps : 0)))); }
    v.addEventListener("timeupdate", tick); tick();
  });
  var vs = document.querySelectorAll("video[data-src]"); if (!vs.length) return;
  var reduced = false; try { reduced = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  vs.forEach(function (v) {
    var view = v.parentElement;
    var player = document.createElement("div"); player.className = "recording-player";
    view.replaceWith(player); player.appendChild(view);
    var controls = document.createElement("div"); controls.className = "recording-controls";
    var toggle = document.createElement("button"); toggle.type = "button"; toggle.textContent = "Play";
    var seek = document.createElement("input"); seek.type = "range"; seek.min = 0; seek.max = 1000; seek.step = 1; seek.value = 0;
    seek.setAttribute("aria-label", "Seek recording: " + (v.getAttribute("aria-label") || "recorded scene"));
    var time = document.createElement("span"); time.className = "recording-time"; time.textContent = "Recorded playback";
    var expand = document.createElement("button"); expand.type = "button"; expand.textContent = "Expand";
    expand.setAttribute("aria-label", "Expand recording");
    expand.addEventListener("click", function () {
      if (player.requestFullscreen) player.requestFullscreen().catch(function () {});
      else if (v.webkitEnterFullscreen) v.webkitEnterFullscreen();
    });
    controls.append(toggle, seek, time, expand); player.appendChild(controls);
    var userPaused = reduced, onscreen = false, loaded = false;
    function load() { if (!loaded) { v.src = v.dataset.src; loaded = true; } }
    function sync() {
      toggle.textContent = v.paused ? "Play" : "Pause";
      toggle.setAttribute("aria-label", (v.paused ? "Play" : "Pause") + " recording");
      if (Number.isFinite(v.duration) && v.duration > 0) {
        seek.value = Math.round(v.currentTime / v.duration * 1000);
        time.textContent = v.currentTime.toFixed(1) + " / " + v.duration.toFixed(1) + " s playback";
      }
    }
    function play() { load(); v.play().then(sync).catch(function () { sync(); time.textContent = "Press Play to start"; }); }
    toggle.addEventListener("click", function () { if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); } });
    seek.addEventListener("input", function () { load(); if (Number.isFinite(v.duration)) { v.currentTime = v.duration * Number(seek.value) / 1000; sync(); } });
    ["play", "pause", "timeupdate", "loadedmetadata"].forEach(function (event) { v.addEventListener(event, sync); });
    v.addEventListener("error", function () { time.textContent = "Recording could not load"; });
    v.controls = false; v.style.opacity = 1;
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) {
        onscreen = entry.isIntersecting;
        if (onscreen) { load(); if (!userPaused) play(); } else v.pause();
      }); }, { threshold: 0.05 });
      observer.observe(view);
    } else { load(); }
    sync();
  });
})();

// a link to something inside a folded section opens the fold first (open the fold), so the anchor is visible
(function () {
  function openTo() { var id = location.hash.slice(1); if (!id) return; var el = document.getElementById(id); if (!el) return;
    var d = el.closest("details"); while (d) { d.open = true; d = d.parentElement && d.parentElement.closest("details"); }
    setTimeout(function () { el.scrollIntoView(); }, 30); }
  window.addEventListener("hashchange", openTo); if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", openTo); else openTo();
})();
