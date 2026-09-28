// The real cell in 3-D, built node by node (record b496c1527, step 150): every node and every bond of every family,
// the nuclear envelope and the membrane drawn as their own triangles. On load the record's bonds appear from the centre outwards while the cell
// turns, so the cortex and the membrane close over the inside last; the scroll story (site.js calls Slab.show) takes
// the layers away again from the outside in. Positions, bonds and faces are the record's; only the order they appear
// in is ours. Needs THREE r128 + examples/js/lines, and DecompressionStream for the gzip file.
(function () {
  var cv = document.getElementById("cell3d");
  if (!cv || !window.THREE || !THREE.LineSegments2) return;
  var T = THREE;
  function fallback() { var img = document.createElement("img"); img.src = "media/c1/v5_whole.png"; img.alt = "The simulated cell"; img.className = "slab-fallback"; cv.replaceWith(img); }
  if (!window.DecompressionStream) { fallback(); return; }
  var renderer;
  try { renderer = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: false }); } catch (e) { fallback(); return; }
  renderer.setClearColor(0x0a0e14, 1);
  var scene = new T.Scene(), world = new T.Group(), camera = new T.PerspectiveCamera(30, 1, 0.1, 400);
  scene.add(world);
  // the cytoplasmic-actin haze is drawn in a pass of its own, first, so every other layer paints over it
  var hazeScene = new T.Scene(), hazeWorld = new T.Group(); hazeScene.add(hazeWorld); renderer.autoClear = false;
  // depth cue: what lies behind the cell's centre fades toward the background, so a shell reads as a shell
  scene.fog = new T.Fog(0x0a0e14, 20, 50); hazeScene.fog = scene.fog;
  scene.add(new T.AmbientLight(0xffffff, 0.5));
  var sun = new T.DirectionalLight(0xffffff, 0.9); scene.add(sun);
  var groups = {}, R = 7.7, RMAX = 8, ready = false, meta = null, BINS = 2048, POS = null, relState = 0;
  var reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  // line width per layer: the dense shells thinner, so their weave shows
  var WIDTH = { cortex: 0.7, cytoactin: 0.8, if: 0.9 };
  var DENSE = { cortex: 1, cytoactin: 1, if: 1 };   // too many lines to widen when shown: they would fill in solid (the IF cage: 121,440 nodes in a 0.6 um shell)
  // the millions-strong layers are drawn as the GPU's own 1-pixel lines (2 vertices a bond), not as quads (6 triangles a bond):
  // their asked width is under a pixel anyway, and this is what keeps the whole cell interactive
  var THIN = { cortex: 1, cytoactin: 1, r_crosslink: 1, r_filamin: 1, r_erm: 1 };
  function makeIndexed(nodes, index, color, op) {
    var g = new T.BufferGeometry(); g.setAttribute("position", new T.BufferAttribute(nodes, 3)); g.setIndex(new T.BufferAttribute(index, 1));
    var mat = new T.LineBasicMaterial({ color: new T.Color(color), transparent: true, opacity: op, depthWrite: false, fog: true });
    var mesh = new T.LineSegments(g, mat); mesh.frustumCulled = false;
    return { mesh: mesh, mat: mat, w: 0, set: function (n) { g.setDrawRange(0, 2 * n); } };
  }
  function makeLines(P, key, color, w, op) {
    if (THIN[key]) {
      var g = new T.BufferGeometry(); g.setAttribute("position", new T.BufferAttribute(P, 3));
      var mat = new T.LineBasicMaterial({ color: new T.Color(color), transparent: true, opacity: op, depthWrite: false, fog: true });
      var mesh = new T.LineSegments(g, mat); mesh.frustumCulled = false;
      return { mesh: mesh, mat: mat, w: 0, set: function (n) { g.setDrawRange(0, 2 * n); } };
    }
    var g2 = new T.LineSegmentsGeometry(); g2.setPositions(P);
    var mat2 = new T.LineMaterial({ color: new T.Color(color), linewidth: w, transparent: true, opacity: op, depthWrite: false, fog: true });
    mat2.resolution.set(cv.clientWidth || 1, cv.clientHeight || 1);
    var mesh2 = new T.LineSegments2(g2, mat2); mesh2.frustumCulled = false;
    return { mesh: mesh2, mat: mat2, w: w, set: function (n) { g2.instanceCount = n; } };
  }
  // the cytoplasmic actin fills the whole volume: see-through, so the nucleus and the aster read through it
  var OPACITY = { cytoactin: 0.14, envelope: 0.4, membrane: 0.32, if: 0.55 };
  // nothing writes depth, so layers paint in order: the cytoplasmic actin first, as a haze under the rest
  var HAZE = { cytoactin: 1 };
  var FOCUS_OP = { membrane: 0.55, cytoactin: 0.3 };
  // layers that lie inside the cortex: while the cortex is whole and fully opaque they cannot be seen, so they are not drawn
  var INSIDE = { chromatin: 1, lamina: 1, envelope: 1, if: 1, mt: 1, cytoactin: 1, cargo: 1, r_ties: 1, r_motor: 1, r_filamin: 1 };   // a surface shown on its own step; other surfaces keep their own opacity
  // `#build=0.4` holds the build at that fraction, to check one moment of it
  var HOLD = /[#&]build=([\d.]+)/.exec(location.hash);

  var pr = Math.min(window.devicePixelRatio || 1, 2), slow = 0, FLOOR = Math.min(pr, 1.5);   // never below 1.5 on a Retina screen: sharpness is not traded away
  function resize() {
    var w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
    renderer.setPixelRatio(pr); renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    Object.keys(groups).forEach(function (k) { if (groups[k].mat.resolution) groups[k].mat.resolution.set(w, h); });
  }
  window.addEventListener("resize", resize);

  // how many of a layer's items (sorted by radius into BINS bins; `bins` is the running count) lie within radius r
  function countAt(bins, r) { return bins[Math.max(0, Math.min(BINS, Math.ceil(r / RMAX * BINS)))]; }
  function bin(x) { return Math.min(BINS - 1, (x / RMAX * BINS) | 0); }
  function inflate(r) { if (!r.ok) throw new Error(r.status); return new Response(r.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer(); }

  // which cell: the mini cell with microvilli (the flicker record at step 100) by default, the full-size one on ?cell=native
  var CELL = /[?&]cell=native/.test(location.search) ? "native" : "mini", DIR = CELL === "native" ? "media/cell3d/" : "media/cell3d_mini/";
  document.querySelectorAll(".cell-switch a").forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-cell") === CELL); });
  document.querySelectorAll(".stage-meta[data-cell]").forEach(function (m) { m.classList.toggle("on", m.getAttribute("data-cell") === CELL); });
  Promise.all([fetch(DIR + "cell3d.json").then(function (r) { return r.json(); }),
               fetch(DIR + "cell3d.bin.gz").then(inflate)]).then(function (res) {
    meta = res[0]; var buf = res[1], c = meta.counts, o = meta.offsets, N = c.nodes, q = meta.q_um, i, k;
    // positions: three int16 planes, delta-coded along the node order (the sum wraps in int16, as it was written)
    var dq = new Int16Array(buf, o.pos, N * 3), pos = new Float32Array(N * 3), rad = new Float32Array(N);
    for (var ax = 0; ax < 3; ax++) { var v = 0, base = ax * N; for (i = 0; i < N; i++) { v = (v + dq[base + i]) << 16 >> 16; pos[3 * i + ax] = v * q; } }
    RMAX = 0; for (i = 0; i < N; i++) { rad[i] = Math.hypot(pos[3 * i], pos[3 * i + 1], pos[3 * i + 2]); if (rad[i] > RMAX) RMAX = rad[i]; }
    R = meta.radius_um; POS = pos;
    BASE = R * 4.7; distT = dist = BASE;          // the camera's distance scales with the cell shown
    var n0 = 0; for (i = 1; i < N; i++) if (rad[i] < rad[n0]) n0 = i;
    first.position.set(pos[3 * n0], pos[3 * n0 + 1], pos[3 * n0 + 2]);
    var lay = new Uint8Array(buf, o.layer, N), NL = meta.layers.length;
    // bonds: sorted by first node, stored as (step in first node, second - first); counted per layer and radius bin
    var S = c.segments, da = new Uint32Array(buf, o.seg_da, S), db = new Int32Array(buf, o.seg_db, S);
    var A = new Uint32Array(S), B = new Uint32Array(S), Bn = new Uint16Array(S), cnt = [], a = 0;
    for (k = 0; k < NL; k++) cnt.push(new Uint32Array(BINS + 1));
    var cross = new Uint8Array(NL);   // a layer with a bond to another family's node cannot use its own node run as vertices
    for (var s = 0; s < S; s++) { a += da[s]; A[s] = a; B[s] = a + db[s]; Bn[s] = bin(Math.max(rad[a], rad[B[s]])); cnt[lay[a]][Bn[s] + 1]++; if (lay[B[s]] !== lay[a]) cross[lay[a]] = 1; }
    // a thin layer on its own node run is drawn INDEXED: each node's position once, bonds as index pairs (a chain shares its nodes)
    var P = [], IX = [], LO = [], fill = [];
    for (k = 0; k < NL; k++) {
      var cb = cnt[k]; for (var j = 1; j <= BINS; j++) cb[j] += cb[j - 1]; fill.push(cb.slice(0, BINS));
      var idx = THIN[meta.layers[k].key] && !cross[k]; LO.push(idx ? lay.indexOf(k) : -1);
      IX.push(idx ? new Uint32Array(cb[BINS] * 2) : null); P.push(idx ? null : new Float32Array(cb[BINS] * 6));
    }
    for (s = 0; s < S; s++) {
      var l = lay[A[s]], r = fill[l][Bn[s]]++;
      if (IX[l]) { IX[l][2 * r] = A[s] - LO[l]; IX[l][2 * r + 1] = B[s] - LO[l]; continue; }
      var r6 = 6 * r, x = 3 * A[s], y = 3 * B[s], Pl = P[l];
      Pl[r6] = pos[x]; Pl[r6 + 1] = pos[x + 1]; Pl[r6 + 2] = pos[x + 2]; Pl[r6 + 3] = pos[y]; Pl[r6 + 4] = pos[y + 1]; Pl[r6 + 5] = pos[y + 2];
    }
    A = B = Bn = null;
    meta.layers.forEach(function (L, li) {
      var m = cnt[li][BINS]; if (!m) return;
      var op = OPACITY[L.key] || 1, ln = IX[li] ? makeIndexed(pos.subarray(3 * LO[li], 3 * (lay.lastIndexOf(li) + 1)), IX[li], L.color, op)
                                                : makeLines(P[li], L.key, L.color, WIDTH[L.key] || 1.3, op); P[li] = IX[li] = null;
      var holder = new T.Group(); holder.add(ln.mesh); (HAZE[L.key] ? hazeWorld : world).add(holder);
      groups[L.key] = { set: ln.set, bins: cnt[li], mat: ln.mat, holder: holder, n: m, lines: true,
                        op: op, target: op, s: 1, sT: 1, w: ln.w, base: op, big: false, dense: !!DENSE[L.key], haze: !!HAZE[L.key] };
    });
    // the closed surfaces (nuclear envelope, membrane): each its own triangles over its own nodes, one contiguous run
    var Tn = c.triangles, tda = new Uint32Array(buf, o.tri_da, Tn), t1 = new Int32Array(buf, o.tri_d1, Tn), t2 = new Int32Array(buf, o.tri_d2, Tn);
    var T0 = new Uint32Array(Tn), Tb = new Uint16Array(Tn), t0 = 0, surf = {};
    meta.layers.forEach(function (L, li) { if (meta.surface_layers.indexOf(L.key) >= 0) surf[li] = new Uint32Array(BINS + 1); });
    for (i = 0; i < Tn; i++) { t0 += tda[i]; T0[i] = t0; Tb[i] = bin(Math.max(rad[t0], rad[t0 + t1[i]], rad[t0 + t2[i]])); surf[lay[t0]][Tb[i] + 1]++; }
    Object.keys(surf).forEach(function (key) {
      var li = +key, tb = surf[li], L = meta.layers[li];
      for (var jj = 1; jj <= BINS; jj++) tb[jj] += tb[jj - 1];
      var lo = lay.indexOf(li), hi = lay.lastIndexOf(li) + 1, tf = tb.slice(0, BINS), index = new Uint32Array(tb[BINS] * 3);
      for (var ii = 0; ii < Tn; ii++) if (lay[T0[ii]] === li) {
        var r3 = 3 * tf[Tb[ii]]++; index[r3] = T0[ii] - lo; index[r3 + 1] = T0[ii] + t1[ii] - lo; index[r3 + 2] = T0[ii] + t2[ii] - lo;
      }
      var mg = new T.BufferGeometry();
      mg.setAttribute("position", new T.BufferAttribute(pos.slice(3 * lo, 3 * hi), 3)); mg.setIndex(new T.BufferAttribute(index, 1));
      mg.computeVertexNormals();
      var op = OPACITY[L.key];
      var mm = new T.MeshPhongMaterial({ color: new T.Color(L.color), transparent: true, opacity: op, side: T.DoubleSide,
                                         depthWrite: false, shininess: 30, specular: 0x2a2f38 });
      var sm = new T.Mesh(mg, mm); sm.frustumCulled = false;
      var sh = new T.Group(); sh.add(sm); world.add(sh);
      groups[L.key] = { set: function (nn) { mg.setDrawRange(0, 3 * nn); }, bins: tb, mat: mm, holder: sh, n: tb[BINS],
                        op: op, target: op, s: 1, sT: 1, w: 0, base: op, big: false };
    });
    // the centre of the microtubules, for the camera to visit
    var mx = 0, my = 0, mz = 0, mn = 0; for (var t = 0; t < N; t++) if (meta.layers[lay[t]].key === "mt") { mx += pos[3 * t]; my += pos[3 * t + 1]; mz += pos[3 * t + 2]; mn++; }
    meta.mtCentre = mn ? [mx / mn, my / mn, mz / mn] : [0, 0, 0];
    if (meta.mtoc_um) { tag = document.createElement("span"); tag.className = "mtoc-tag"; tag.innerHTML = "<i></i>MTOC (centrosome), as recorded";
      cv.parentNode.appendChild(tag); }
    if (!reduce) Object.keys(groups).forEach(function (kk) { groups[kk].set(0); });
    var ld = document.getElementById("cell3d-loading"); if (ld) ld.remove();
    resize(); ready = true;
    if (window.Slab && window.Slab._pending) window.Slab.show(window.Slab._pending);
  }).catch(function (e) { if (window.console) console.error(e); fallback(); });

  // the relations (ERM, crosslinkers, crossbridges, motors, ties): a second file, fetched the first time a step shows one.
  // Each is a line from node i to its partner end, which may sit at t along the segment j-jb. Hidden unless its step shows it.
  // the many (crosslinkers, tethers) thin, so their weave shows; the few (crossbridges, motors) wide, so they show at all
  var REL_WIDTH = { r_crosslink: 0.6, r_erm: 0.8, r_filamin: 0.8, r_crossbridge: 2.6, r_motor: 3.2, r_ties: 1.6 };
  function loadRelations() {
    if (relState || !ready || !meta.relations) return; relState = 1;
    fetch(DIR + "cell3d_rel.bin.gz").then(inflate).then(function (buf) {
      var RL = meta.relations, o = RL.offsets, n = RL.count, s0 = 0;
      var da = new Int32Array(buf, o.da, n), db = new Int32Array(buf, o.db, n), dc = new Int32Array(buf, o.dc, n), tt = new Uint8Array(buf, o.t, n);
      RL.layers.forEach(function (L) {
        var m = L.count, a = 0; if (!m) return;
        var P = new Float32Array(m * 6);
        for (var r = 0; r < m; r++) {
          var q = s0 + r; a = r ? a + da[q] : da[q];
          var b = a + db[q], c = b + dc[q], t = tt[q] / 255, u = 1 - t;
          P[6 * r] = POS[3 * a]; P[6 * r + 1] = POS[3 * a + 1]; P[6 * r + 2] = POS[3 * a + 2];
          P[6 * r + 3] = u * POS[3 * b] + t * POS[3 * c]; P[6 * r + 4] = u * POS[3 * b + 1] + t * POS[3 * c + 1]; P[6 * r + 5] = u * POS[3 * b + 2] + t * POS[3 * c + 2];
        }
        s0 += m;
        var ln = makeLines(P, L.key, L.color, REL_WIDTH[L.key] || 1.3, 0);
        var holder = new T.Group(); holder.add(ln.mesh); holder.visible = false; world.add(holder);
        groups[L.key] = { set: function () {}, bins: null, mat: ln.mat, holder: holder, n: m, lines: true,
                          op: 0, target: 0, s: 1, sT: 1, w: ln.w, base: 0, big: false, dense: true };
      });
      relState = 2; window.Slab.show(state);
    }).catch(function (e) { relState = 0; if (window.console) console.error(e); });
  }

  // the first node: drawn as wide as a filament line (LINE_PX), at the node nearest the centre
  var LINE_PX = 1.3;
  var first = new T.Mesh(new T.SphereGeometry(1, 16, 12), new T.MeshBasicMaterial({ color: 0xff6fb1, transparent: true, opacity: 0 }));
  world.add(first);

  var tag = null;
  var state = { focus: [], peel: [] }, target = [0, 0, 0], targetT = [0, 0, 0], dist = 36, distT = 36, BASE = 36, spin = 0, elev = 0.08, elevT = 0.08;
  window.Slab = {
    show: function (conf) {
      state = conf || { focus: [], peel: [] };
      if (!ready) { this._pending = conf; }
      if (state.focus.some(function (k) { return k.indexOf("r_") === 0; })) loadRelations();
      var z = conf && conf.zoom ? conf.zoom : 1; distT = BASE / z;
      var tg = conf && conf.target || "centre";
      elevT = tg === "edge" ? 0.75 : 0.08;   // look down on the outer layers so their curve shows
      targetT = tg === "edge" ? [R * 0.8, 0, 0] : tg === "mt" ? (meta && meta.mtCentre || [0, 0, 0]) : tg === "mid" ? [R * 0.5, 0, 0] : [0, 0, 0];
      Object.keys(groups).forEach(function (k) {
        var G = groups[k], pe = state.peel.indexOf(k) >= 0, fo = state.focus.indexOf(k) >= 0;
        G.target = pe ? 0 : fo ? (FOCUS_OP[k] || G.base || 1) : (state.focus.length ? Math.min(0.1, G.base) : G.base); G.sT = pe ? 1.35 : 1; G.big = fo;
        if (reduce) { G.op = G.target; G.s = G.sT; }
      });
      if (reduce) { dist = distT; elev = elevT; target = targetT.slice(); }
    }
  };

  var start = null, last = null, built = reduce, visible = true, go = true;
  // wait for the logo intro, so the cell is built where people can see it
  if (document.getElementById("aleph-intro") && document.documentElement.getAttribute("data-aleph-intro") !== "done") {
    go = false; document.addEventListener("aleph-intro:done", function () { go = true; start = null; }, { once: true });
  }
  if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { es.forEach(function (x) { visible = x.isIntersecting; }); }).observe(cv);
  var BUILD = 9000;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (!visible || !ready || !go) return;
    if (start === null) start = ts;
    var dt = last === null ? 16 : Math.min(ts - last, 200); last = ts;
    var a = reduce ? 1 : 1 - Math.exp(-dt / 320), el = ts - start;
    if (!built) {
      // ease-out in radius: the nucleus comes quickly, the cortex and the membrane close slowly over the last seconds
      var x = HOLD ? +HOLD[1] : Math.max(0, Math.min(1, (el - 500) / BUILD)), r = R * 1.06 * (1 - Math.pow(1 - x, 1.5));
      first.scale.setScalar(0.5 * LINE_PX * 2 * dist * Math.tan(camera.fov * Math.PI / 360) / (cv.clientHeight || 1));
      first.material.opacity = el < 300 ? el / 300 : Math.max(0, 1 - (el - 1500) / 1200);
      Object.keys(groups).forEach(function (k) { if (groups[k].bins) groups[k].set(countAt(groups[k].bins, r)); });
      if (!HOLD && el > BUILD + 700) { built = true; Object.keys(groups).forEach(function (k) { groups[k].set(groups[k].n); }); }
    }
    var C = groups.cortex, shut = built && C && C.op > 0.995 && Math.abs(C.s - 1) < 1e-3;
    Object.keys(groups).forEach(function (k) {
      var G = groups[k]; G.op += (G.target - G.op) * a; G.s += (G.sT - G.s) * a;
      G.mat.opacity = G.op;
      // a fully shown line layer is opaque and writes depth, so the nearest filament wins; while it fades it blends
      if (G.lines && !G.haze) { var solid = G.op > 0.995; G.mat.transparent = !solid; G.mat.depthWrite = solid; }
      if (G.w) G.mat.linewidth = G.w * (G.big && !G.dense ? 1.7 : 1); G.holder.scale.setScalar(G.s); G.holder.visible = G.op > 0.01 && !(shut && INSIDE[k]);
    });
    dist += (distT - dist) * a; elev += (elevT - elev) * a;
    for (var d3 = 0; d3 < 3; d3++) target[d3] += (targetT[d3] - target[d3]) * a;
    // the cell turns slowly about its vertical axis; the camera keeps a slight downward look, the light comes from it
    if (!reduce) spin += dt * 0.00012;
    world.rotation.y = spin; world.rotation.x = 0.28; hazeWorld.rotation.copy(world.rotation);
    var tv = new T.Vector3(target[0], target[1], target[2]).applyEuler(world.rotation);
    camera.position.set(tv.x, tv.y + dist * elev, tv.z + dist);
    camera.lookAt(tv);
    var dc = camera.position.length(); scene.fog.near = Math.max(0.1, dc - R * 0.9); scene.fog.far = dc + R * 1.6;
    sun.position.set(camera.position.x + 8, camera.position.y + 12, camera.position.z);
    renderer.clear(); if (!shut) renderer.render(hazeScene, camera); renderer.render(scene, camera);
    // the aster's hub named where the record puts it, on the step that shows the microtubules
    if (tag) { var on = built && state.focus.indexOf("mt") >= 0;
      if (on) { var pv = new T.Vector3(meta.mtoc_um[0], meta.mtoc_um[1], meta.mtoc_um[2]).applyEuler(world.rotation).project(camera);
        tag.style.transform = "translate(" + ((pv.x + 1) / 2 * cv.clientWidth).toFixed(1) + "px," + ((1 - pv.y) / 2 * cv.clientHeight).toFixed(1) + "px)"; }
      tag.style.opacity = on ? 1 : 0; }
    // if frames stay slow, draw a few fewer pixels: step the pixel ratio down, never below FLOOR
    slow = slow * 0.95 + (dt > 24 ? 0.05 : 0);
    if (slow > 0.6 && pr > FLOOR) { pr = Math.max(FLOOR, pr - 0.25); slow = 0; renderer.setPixelRatio(pr); resize(); }
  }
  requestAnimationFrame(frame);
})();
