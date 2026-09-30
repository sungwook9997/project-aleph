// Scene players for the physics showcase: each <figure class="scene" data-scene="..."> plays one recorded scene of the
// engine on a loop, in 3-D, with no controls. Everything drawn is read from the record; between two saved steps the
// positions are interpolated for display (and the caption says so). A loop ends in a short fade to black and starts
// again from the first saved step: time is never run backwards, so a bond letting go never looks like one forming.
// Needs THREE r128 + examples/js/lines, and DecompressionStream.
(function () {
  if (!window.THREE || !THREE.LineSegments2 || !window.DecompressionStream) return;
  var T = THREE;
  var reduce = false; try { reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}

  function inflate(r) { if (!r.ok) throw new Error(r.status); return new Response(r.body.pipeThrough(new DecompressionStream("gzip"))).arrayBuffer(); }
  function load(base) {
    return Promise.all([fetch(base + ".json").then(function (r) { return r.json(); }), fetch(base + ".bin.gz").then(inflate)]);
  }
  function fat(color, width, opacity) {
    var m = new T.LineMaterial({ color: new T.Color(color), linewidth: width, transparent: opacity < 1, opacity: opacity, depthWrite: opacity >= 1 });
    return m;
  }

  // a vignette and a faint film grain, after the bloom
  var GRADE = { uniforms: { tDiffuse: { value: null }, time: { value: 0 } },
    vertexShader: "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
    fragmentShader: "uniform sampler2D tDiffuse; uniform float time; varying vec2 vUv;" +
      "float h(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }" +
      "void main() { vec4 c = texture2D(tDiffuse, vUv); float d = distance(vUv, vec2(0.5));" +
      " c.rgb *= mix(1.0, 0.62, smoothstep(0.35, 0.78, d)); c.rgb += (h(vUv * 917.0 + time) - 0.5) * 0.018; gl_FragColor = c; }" };

  // reflected light for glossy objects: one CC0 studio HDRI (Poly Haven, studio_small_03), loaded once
  var ENV = null;
  function envInto(scene, r) {
    if (!T.RGBELoader) return;
    if (!ENV) ENV = new Promise(function (ok) {
      new T.RGBELoader().setDataType(T.UnsignedByteType).load(ROOT + "media/env/studio_small_03_1k.hdr", function (tex) {
        var pm = new T.PMREMGenerator(r); var env = pm.fromEquirectangular(tex).texture; tex.dispose(); pm.dispose(); ok(env); }, undefined, function () { ok(null); }); });
    ENV.then(function (env) { if (env) scene.environment = env; });
  }
  var ROOT = (document.currentScript && document.currentScript.src || "").replace(/assets\/scene_player\.js.*$/, "");

  // ---- the shared stage: renderer, camera orbit, fade, loop, visibility ----
  function Stage(fig, opts) {
    var cv = document.createElement("canvas"); cv.className = "scene-cv"; fig.querySelector(".scene-view").appendChild(cv);
    var r = new T.WebGLRenderer({ canvas: cv, antialias: true, alpha: false });
    r.setClearColor(0x05080d, 1);
    var scene = new T.Scene(), world = new T.Group(); scene.add(world);
    scene.fog = new T.Fog(0x05080d, 1, 100);
    scene.add(new T.AmbientLight(0xffffff, 0.55));
    var sun = new T.DirectionalLight(0xffffff, 0.8); sun.position.set(3, 5, 4); scene.add(sun);
    var cam = new T.PerspectiveCamera(opts.fov || 35, 1, 0.01, 200);
    var mats = [], self = { r: r, scene: scene, world: world, cam: cam, cv: cv, mats: mats, visible: false };
    // the look of a game-engine viewport: a soft bloom on what is brightest, a vignette, a whisper of grain;
    // skipped (plain render) when the post-processing scripts are not there
    var comp = null, bloom = null, grade = null;
    if (T.EffectComposer && T.UnrealBloomPass && T.ShaderPass && T.RenderPass) {
      // a multisampled target keeps the lines' anti-aliasing through the passes (WebGL2); plain otherwise
      var rt = r.capabilities.isWebGL2 && T.WebGLMultisampleRenderTarget ? new T.WebGLMultisampleRenderTarget(256, 256, { format: T.RGBAFormat }) : undefined;
      comp = new T.EffectComposer(r, rt); comp.addPass(new T.RenderPass(scene, cam));
      bloom = new T.UnrealBloomPass(new T.Vector2(256, 256), opts.bloom || 0.55, 0.45, opts.threshold || 0.72); comp.addPass(bloom);
      grade = new T.ShaderPass(GRADE); comp.addPass(grade);
    }
    envInto(scene, r);
    self.render = function (t) {
      if (!comp) { r.render(scene, cam); return; }
      grade.uniforms.time.value = t || 0; comp.render();
    };
    var fadeEl = document.createElement("div"); fadeEl.className = "scene-fade"; fig.querySelector(".scene-view").appendChild(fadeEl);
    self.fade = function (a) { fadeEl.style.opacity = a; };
    self.resize = function () {
      var w = cv.clientWidth, h = cv.clientHeight; if (!w || !h) return;
      r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); r.setSize(w, h, false);
      if (comp) { comp.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); comp.setSize(w, h); }
      cam.aspect = w / h; cam.updateProjectionMatrix();
      mats.forEach(function (m) { if (m.resolution) m.resolution.set(w, h); });
    };
    window.addEventListener("resize", self.resize);
    self.dead = false;
    self.kill = function () {              // free the GPU context; the figure can build a new stage later
      self.dead = true; window.removeEventListener("resize", self.resize);
      try { if (comp) comp.renderTarget1.dispose(); r.dispose(); r.forceContextLoss(); } catch (e) {}
      cv.remove(); fadeEl.remove(); fig.classList.remove("ready");
    };
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { es.forEach(function (x) { self.visible = x.isIntersecting; }); },
      { rootMargin: "100px" }).observe(fig);
    else self.visible = true;
    return self;
  }

  // ---- the micro scene: a patch of the native record through its saved steps ----
  function micro(fig, base) {
    var S = Stage(fig, { fov: 32 });
    load(base).then(function (res) {
      var m = res[0], buf = res[1], c = m.counts, o = m.offsets, N = c.nodes, F = m.steps.length;
      var P = new Float32Array(buf, o.pos, F * N * 3), fam = new Uint8Array(buf, o.family, N);
      var seg = new Uint32Array(buf, o.seg, c.segments * 2), tri = new Uint32Array(buf, o.tri, c.triangles * 3);
      var REL = new Int32Array(buf, o.rel, m.rel_offsets[F] * 7);
      var cur = new Float32Array(N * 3);
      // turn the patch so the cell's outside is up: the membrane on top, then the tethers, the cortex, the myosin
      if (m.normal) S.world.quaternion.setFromUnitVectors(new T.Vector3().fromArray(m.normal), new T.Vector3(0, 1, 0));
      function nodeAt(f, a) {          // positions at display time f + a (a in [0, 1))
        var b = Math.min(f + 1, F - 1), p0 = f * N * 3, p1 = b * N * 3;
        for (var i = 0; i < N * 3; i++) cur[i] = P[p0 + i] + (P[p1 + i] - P[p0 + i]) * a;
      }
      // m.color_by "displacement": every strand coloured by how far each node has moved since the first saved step,
      // one viridis scale for the whole scene up to m.displacement_top_um (its 99th percentile), with the legend on screen
      var BYD = m.color_by === "displacement", TOP = m.displacement_top_um || 1;
      var VIR = ["#440154", "#3b528b", "#21918c", "#5ec962", "#fde725"].map(function (h) { return new T.Color(h); });
      function viridis(t, out, o3) { var x = Math.min(1, Math.max(0, t)) * 4, k = Math.min(3, Math.floor(x)), u = x - k, A = VIR[k], B = VIR[k + 1];
        out[o3] = A.r + (B.r - A.r) * u; out[o3 + 1] = A.g + (B.g - A.g) * u; out[o3 + 2] = A.b + (B.b - A.b) * u; }
      // strands: one fat-line set per family
      var strands = m.families.map(function (fm, fi) {
        var list = []; for (var s = 0; s < c.segments; s++) if (fam[seg[2 * s]] === fi) list.push(seg[2 * s], seg[2 * s + 1]);
        if (!list.length || fm.key === "membrane") return null;
        var g = new T.LineSegmentsGeometry(), mat = fat(fm.color, fm.key.indexOf("myosin") >= 0 ? 3.2 : 1.3, 1); S.mats.push(mat);
        if (BYD) { mat.vertexColors = true; mat.color.set(0xffffff); mat.needsUpdate = true; }
        var mesh = new T.LineSegments2(g, mat); mesh.frustumCulled = false; S.world.add(mesh);
        return { idx: new Uint32Array(list), g: g, buf: new Float32Array(list.length * 3), col: BYD ? new Float32Array(list.length * 3) : null };
      });
      // the membrane: its own faces, translucent
      var memb = null;
      if (c.triangles) {
        var mg = new T.BufferGeometry(), mp = new T.BufferAttribute(new Float32Array(N * 3), 3);
        mg.setAttribute("position", mp); mg.setIndex(new T.BufferAttribute(tri, 1));
        var mm = new T.MeshPhongMaterial({ color: 0xafbad1, transparent: true, opacity: 0.28, side: T.DoubleSide, depthWrite: false, shininess: 40 });
        var mesh2 = new T.Mesh(mg, mm); mesh2.frustumCulled = false; mesh2.renderOrder = 2; S.world.add(mesh2);
        memb = { g: mg, attr: mp };
        // data-ghost: the surface's first saved shape as a faint wire, so a slow change of shape can be seen against it
        if (fig.getAttribute("data-ghost")) {
          var gp = new T.BufferGeometry(); gp.setAttribute("position", new T.BufferAttribute(P.slice(0, N * 3), 3)); gp.setIndex(new T.BufferAttribute(tri, 1));
          var gw = new T.LineSegments(new T.WireframeGeometry(new T.Mesh(gp).geometry), new T.LineBasicMaterial({ color: 0x8fb4ff, transparent: true, opacity: 0.18, depthWrite: false }));
          gw.frustumCulled = false; S.world.add(gw);
        }
      }
      // m.ghost_surface: one surface (the membrane, the envelope) as it was at the first saved step, faint and still:
      // where the inside sits, not how the surface moves
      if (m.ghost_surface && c.triangles === 0 && o.gtri !== undefined) {
        var gs = m.ghost_surface, gg = new T.BufferGeometry();
        gg.setAttribute("position", new T.BufferAttribute(new Float32Array(buf, o.gpos, gs.nodes * 3), 3));
        gg.setIndex(new T.BufferAttribute(new Uint32Array(buf, o.gtri, gs.triangles * 3), 1)); gg.computeVertexNormals();
        var gm = new T.Mesh(gg, new T.MeshPhongMaterial({ color: 0xafbad1, transparent: true, opacity: m.ghost_opacity || 0.1, side: T.DoubleSide,
                                                          depthWrite: false, shininess: 30 }));
        gm.frustumCulled = false; gm.renderOrder = 4; S.world.add(gm);
      }
      // instruments the record holds as ONE node with a declared surface (a sphere of radius r; a plane face through the node,
      // its normal into the cell): drawn as that surface at the node's recorded position, step by step
      var probes = (m.probes || []).map(function (pr) {
        var pm = new T.MeshStandardMaterial({ color: 0x7f9cc0, metalness: 0, roughness: 0.7, transparent: true, opacity: 0.32,
                                              depthWrite: false, side: T.DoubleSide, envMapIntensity: 0.15 });   // matte: no glare under the bloom
        var geo = pr.shape === "sphere" ? new T.SphereGeometry(pr.radius, 96, 64) : new T.BoxGeometry(2 * pr.half, 0.12, 2 * pr.half);
        var pmesh = new T.Mesh(geo, pm); pmesh.renderOrder = 3; pmesh.frustumCulled = false;
        var nrm = pr.normal ? new T.Vector3().fromArray(pr.normal).normalize() : null;
        if (nrm) pmesh.quaternion.setFromUnitVectors(new T.Vector3(0, 1, 0), nrm);
        S.world.add(pmesh); return { pr: pr, mesh: pmesh, nrm: nrm };
      });
      function drawProbes(f, a) { probes.forEach(function (Q) { var t0 = Q.pr.track[f], t1 = Q.pr.track[Math.min(f + 1, F - 1)];
        Q.mesh.position.set(t0[0] + (t1[0] - t0[0]) * a, t0[1] + (t1[1] - t0[1]) * a, t0[2] + (t1[2] - t0[2]) * a);
        if (Q.nrm) Q.mesh.position.addScaledVector(Q.nrm, -0.06); }); }   // the slab lies outside its face
      // relations by kind: those that stay, those that let go (fade out), those that form (fade in, brighter)
      var kinds = Object.keys(m.kinds).map(Number), rel = {};
      // m.state_colors {"1": colour, ...}: each relation drawn in the colour of its state (e.g. before / after a stroke)
      var SC = m.state_colors ? Object.keys(m.state_colors).reduce(function (o, k) { o[k] = new T.Color(m.state_colors[k]); return o; }, {}) : null;
      // data-emph="2": the kinds this scene is about, drawn bold; the rest recede
      var emph = (fig.getAttribute("data-emph") || "").split(",").filter(Boolean).map(Number);
      kinds.forEach(function (k) {
        var col = m.kinds[k].color, w = k === 2 ? 3.6 : 1.1, base = k === 2 ? 1 : k === 1 ? 0.4 : 0.6;   // the many dim, the motors bright
        if (emph.length) { var on = emph.indexOf(k) >= 0; w = on ? (m.emph_width || 5) : 0.8; base = on ? 1 : 0.12; }
        rel[k] = ["stay", "leave", "form"].map(function (role) {
          var g = new T.LineSegmentsGeometry(), mat = fat(role === "form" ? "#ffffff" : col, role === "form" ? w * 1.6 : w, 1); S.mats.push(mat);
          mat.transparent = true; mat.depthWrite = false;
          if (SC) { mat.vertexColors = true; mat.color.set(0xffffff); mat.needsUpdate = true; }   // colour by each relation's state
          var mesh = new T.LineSegments2(g, mat); mesh.frustumCulled = false; S.world.add(mesh);
          return { role: role, g: g, mat: mat, rows: [], col: new T.Color(col), base: base };
        });
      });
      // a bound motor head is a few nm from its actin, too short to see as a line: each one is also marked by a glowing
      // bead at the head, amber when bound, pale gold after its stroke, growing as it binds and shrinking as it lets go
      var heads = null;
      if (emph.some(function (k) { return m.kinds[k] && m.kinds[k].name === "crossbridge"; })) {   // head markers: myosin crossbridges only
        var hg = new T.SphereGeometry(1, 20, 14), hm = new T.MeshBasicMaterial({ color: 0xffffff, transparent: true, depthWrite: false });
        heads = new T.InstancedMesh(hg, hm, 512); heads.frustumCulled = false; heads.count = 0; S.world.add(heads);
        heads.instanceColor = new T.InstancedBufferAttribute(new Float32Array(512 * 3), 3);
      }
      // amber sits under the bloom threshold, the post-stroke gold above it: a head that has stroked is the one that glows
      var HEAD_R = m.head_radius || (m.view_dist || 1.75) * 0.0085, amber = new T.Color("#ffb020").multiplyScalar(0.8), pale = new T.Color("#fff0b8"), hmat = new T.Matrix4();
      // data-markers="cargo": that family's nodes drawn as glossy spheres, each leaving the path it took through the saved steps
      var mk = null, mkKey = fig.getAttribute("data-markers") || m.markers, TRAIL = m.trail_steps || 0;
      if (mkKey) {
        var mfi = -1; m.families.forEach(function (fm, i2) { if (fm.key === mkKey) mfi = i2; });
        var ids = []; for (var n2 = 0; n2 < N; n2++) if (fam[n2] === mfi) ids.push(n2);
        if (ids.length) {
          var R0 = m.marker_radius || (m.view_dist || 1.75) * 0.012;
          var mg2 = new T.InstancedMesh(new T.SphereGeometry(1, 24, 16), new T.MeshStandardMaterial({ color: 0xffd166, metalness: 0.3, roughness: 0.3 }), ids.length);
          mg2.frustumCulled = false; S.world.add(mg2);
          var tg2 = new T.LineSegmentsGeometry(), tmat2 = fat(m.families[mfi].color, 1.6, 0.55); tmat2.transparent = true; tmat2.depthWrite = false; S.mats.push(tmat2);
          var tl2 = new T.LineSegments2(tg2, tmat2); tl2.frustumCulled = false; S.world.add(tl2);
          mg2.instanceColor = new T.InstancedBufferAttribute(new Float32Array(ids.length * 3), 3);
          mk = { ids: ids, mesh: mg2, g: tg2, buf: new Float32Array(ids.length * (F - 1) * 6), R: R0, mat: new T.Matrix4(),
                 held: new T.Color("#ffd166"), free: new T.Color("#6b5a3a") };
        }
      }
      function drawMarkers(f) {
        if (!mk) return;
        // held = touched right now by a relation this scene is about (a motor), bright; free, dim
        var held = {};
        emph.forEach(function (k) { rel[k].forEach(function (L) { if (L.role === "leave") return;
          L.rows.forEach(function (rw) { var q0 = rw[L.role === "stay" ? 1 : 0]; held[REL[7 * q0 + 2]] = 1; held[REL[7 * q0 + 3]] = 1; }); }); });
        mk.ids.forEach(function (i, q) {
          mk.mesh.setColorAt(q, !emph.length || held[i] ? mk.held : mk.free);
          mk.mat.makeScale(mk.R, mk.R, mk.R).setPosition(cur[3 * i], cur[3 * i + 1], cur[3 * i + 2]); mk.mesh.setMatrixAt(q, mk.mat);
          for (var g = 0; g < F - 1; g++) {
            var o6 = (q * (F - 1) + g) * 6, a0 = (g * N + i) * 3, a1 = ((g + 1) * N + i) * 3;
            var ex = g < f ? P[a1] : g === f ? cur[3 * i] : P[a0], ey = g < f ? P[a1 + 1] : g === f ? cur[3 * i + 1] : P[a0 + 1],
                ez = g < f ? P[a1 + 2] : g === f ? cur[3 * i + 2] : P[a0 + 2];
            var gone = g > f || (TRAIL && g < f - TRAIL);            // not yet reached, or older than the trail: folded under the bead
            if (gone) { ex = cur[3 * i]; ey = cur[3 * i + 1]; ez = cur[3 * i + 2]; }
            var sx = gone ? ex : P[a0], sy = gone ? ey : P[a0 + 1], sz = gone ? ez : P[a0 + 2];
            mk.buf[o6] = sx; mk.buf[o6 + 1] = sy; mk.buf[o6 + 2] = sz; mk.buf[o6 + 3] = ex; mk.buf[o6 + 4] = ey; mk.buf[o6 + 5] = ez;
          }
        });
        mk.mesh.instanceMatrix.needsUpdate = true; mk.mesh.instanceColor.needsUpdate = true; mk.g.setPositions(mk.buf);
      }
      function rowsOf(f) { var a = m.rel_offsets[f], b = m.rel_offsets[f + 1], out = {}; for (var q = a; q < b; q++) out[REL[7 * q]] = q; return out; }
      var cache = [];
      for (var f = 0; f < F; f++) cache.push(rowsOf(f));
      function assign(f) {            // sort the relations of step f -> f+1 into stay / leave / form, per kind
        var A = cache[f], B = cache[Math.min(f + 1, F - 1)];
        kinds.forEach(function (k) { rel[k].forEach(function (L) { L.rows = []; }); });
        Object.keys(A).forEach(function (slot) { var q = A[slot], k = REL[7 * q + 1], r2 = B[slot];
          if (r2 === undefined) rel[k][1].rows.push([q, q]); else rel[k][0].rows.push([q, r2]); });
        Object.keys(B).forEach(function (slot) { if (A[slot] === undefined) { var q = B[slot]; rel[REL[7 * q + 1]][2].rows.push([q, q]); } });
      }
      function endPoints(q, out, off) {
        var i = REL[7 * q + 2], j = REL[7 * q + 3], jb = REL[7 * q + 4], t = REL[7 * q + 5] / 255, u = 1 - t;
        out[off] = cur[3 * i]; out[off + 1] = cur[3 * i + 1]; out[off + 2] = cur[3 * i + 2];
        out[off + 3] = u * cur[3 * j] + t * cur[3 * jb]; out[off + 4] = u * cur[3 * j + 1] + t * cur[3 * jb + 1]; out[off + 5] = u * cur[3 * j + 2] + t * cur[3 * jb + 2];
      }
      var hud = fig.querySelector(".scene-clock"), counts = fig.querySelector(".scene-counts");
      // a scale bar (true at the cell's centre; the camera does not move in these scenes) and the colour key
      var view = fig.querySelector(".scene-view"), bar = null;
      if (m.scale_bar_um) { var sb = document.createElement("p"); sb.className = "scene-scale";
        sb.innerHTML = "<i></i>" + m.scale_bar_um + " µm"; view.appendChild(sb); bar = sb.querySelector("i"); }
      if (BYD) { var lg = document.createElement("p"); lg.className = "scene-legend";
        lg.innerHTML = "Moved since the first saved step<br><i></i><span>0</span><span>" + Math.round(TOP * 1000) + " nm+</span>"; view.appendChild(lg); }
      else if (m.ghost_surface && counts) counts.innerHTML = m.families.map(function (fm) {
        return '<span><i style="background:' + fm.color + '"></i>' + (fm.label || fm.key) + "</span>"; }).join("");
      var lastF = -1, t0 = null, STEP_S = m.seconds_per_step || 0.75, FADE = 0.6, SPAN = (F - 1) * STEP_S;
      function draw(ts) {
        if (S.dead) return;
        requestAnimationFrame(draw);
        if (!S.visible) { t0 = null; return; }
        if (t0 === null) t0 = ts - (lastF > 0 ? lastF * STEP_S * 1000 : 0);
        var el = (ts - t0) / 1000, loop = SPAN + 2 * FADE, tt = reduce ? SPAN : el % loop;
        var disp = Math.max(0, Math.min(SPAN, tt - FADE)), f = Math.min(F - 2, Math.floor(disp / STEP_S)), a = Math.min(1, disp / STEP_S - f);
        if (disp >= SPAN) { f = F - 2; a = 1; }
        S.fade(reduce ? 0 : tt < FADE ? 1 - tt / FADE : tt > SPAN + FADE ? (tt - SPAN - FADE) / FADE : 0);
        if (f !== lastF) { assign(f); lastF = f;
          if (counts && kinds.length) { var tally = {}; kinds.forEach(function (k) { tally[k] = rel[k].map(function (L) { return L.rows.length; }); });
            counts.innerHTML = kinds.filter(function (k) { return tally[k][0] + tally[k][1] + tally[k][2]; }).map(function (k) {
              return '<span><i style="background:' + m.kinds[k].color + '"></i>' + m.kinds[k].name + ": " + (tally[k][0] + tally[k][1]) +
                     ' bound, <b>+' + tally[k][2] + "</b> / <b>−" + tally[k][1] + "</b> next step</span>"; }).join(""); } }
        nodeAt(f, a);
        strands.forEach(function (s) { if (!s) return; var n2 = s.idx.length;
          for (var q = 0; q < n2; q++) { var i = s.idx[q]; s.buf[3 * q] = cur[3 * i]; s.buf[3 * q + 1] = cur[3 * i + 1]; s.buf[3 * q + 2] = cur[3 * i + 2];
            if (BYD) { var dx = cur[3 * i] - P[3 * i], dy = cur[3 * i + 1] - P[3 * i + 1], dz = cur[3 * i + 2] - P[3 * i + 2];
                       viridis(Math.sqrt(dx * dx + dy * dy + dz * dz) / TOP, s.col, 3 * q); } }
          s.g.setPositions(s.buf); if (BYD) s.g.setColors(s.col); });
        if (memb) { memb.attr.array.set(cur); memb.attr.needsUpdate = true; memb.g.computeVertexNormals(); }
        kinds.forEach(function (k) { rel[k].forEach(function (L) {
          var n3 = L.rows.length, arr = new Float32Array(Math.max(1, n3) * 6);
          for (var q = 0; q < n3; q++) endPoints(L.role === "form" ? L.rows[q][0] : L.rows[q][0], arr, 6 * q);
          L.g.setPositions(arr); L.g.instanceCount = n3;
          if (SC) {
            var ca = new Float32Array(Math.max(1, n3) * 6), wf = L.role === "form" ? 0.6 * (1 - a) : 0;
            for (var q5 = 0; q5 < n3; q5++) { var rq = L.rows[q5][L.role === "stay" ? 1 : 0], c5 = SC[REL[7 * rq + 6]] || L.col;
              var cr = c5.r + (1 - c5.r) * wf, cg = c5.g + (1 - c5.g) * wf, cb = c5.b + (1 - c5.b) * wf;
              ca[6 * q5] = ca[6 * q5 + 3] = cr; ca[6 * q5 + 1] = ca[6 * q5 + 4] = cg; ca[6 * q5 + 2] = ca[6 * q5 + 5] = cb; }
            L.g.setColors(ca);
          }
          L.mat.opacity = L.role === "stay" ? L.base : L.role === "leave" ? L.base * (1 - a) : Math.max(L.base, 0.9) * a;
          if (L.role === "form" && !SC) L.mat.color.copy(L.col).lerp(new T.Color(1, 1, 1), 0.6 * (1 - a));
        }); });
        drawMarkers(f); drawProbes(f, a);
        if (heads) { var hn = 0;
          emph.forEach(function (k) { rel[k].forEach(function (L) { L.rows.forEach(function (rw) { if (hn >= 512) return;
            var q = rw[L.role === "stay" ? 1 : 0], i = REL[7 * q + 2], st = REL[7 * q + 6];
            var sc = HEAD_R * (L.role === "stay" ? 1 : L.role === "leave" ? 1 - a : a);
            hmat.makeScale(sc, sc, sc).setPosition(cur[3 * i], cur[3 * i + 1], cur[3 * i + 2]); heads.setMatrixAt(hn, hmat);
            heads.setColorAt(hn, st >= 2 ? pale : amber); hn++; }); }); });
          heads.count = hn; heads.instanceMatrix.needsUpdate = true; heads.instanceColor.needsUpdate = true; }
        var stepNow = m.steps[f] + a * (m.steps[f + 1] - m.steps[f] || 0);
        if (hud) hud.textContent = m.time_unit ? "step " + Math.round(stepNow) + " of " + m.steps[F - 1] : "t = " + (stepNow * m.dt_s).toPrecision(3) + " s" + (m.time_suffix || "");
        var cam = m.cam || {}, spin = cam.spin !== undefined ? cam.spin : 0.1, elev = cam.elev !== undefined ? cam.elev : 0.31;   // 0 is a value
        var ang = (reduce ? 0.6 : el * spin) + (cam.phase || 0), R = m.view_dist || (m.extent_um ? m.extent_um * 2.6 : 1.75);
        S.cam.position.set(R * Math.sin(ang), R * elev, R * Math.cos(ang)); S.cam.lookAt(0, elev ? -0.03 * R : 0, 0);
        S.scene.fog.near = R * 0.75; S.scene.fog.far = R * 1.8;
        if (bar) { var ppu = S.cv.clientHeight / (2 * S.cam.position.length() * Math.tan(S.cam.fov * Math.PI / 360)), w = Math.round(m.scale_bar_um * ppu) + "px";
                   if (bar.style.width !== w) bar.style.width = w; }
        S.render(ts / 1000);
      }
      S.resize(); requestAnimationFrame(draw);
      fig.classList.add("ready");
    }).catch(function (e) { if (window.console) console.error(e); fig.classList.add("failed"); });
    return S;
  }

  // ---- half floats (the recorded solvent is stored float16) ----
  var HALF = null;
  function halfTable() {
    if (HALF) return HALF; HALF = new Float32Array(65536);
    for (var h = 0; h < 65536; h++) { var s = h & 0x8000 ? -1 : 1, e = (h >> 10) & 31, f = h & 1023;
      HALF[h] = e === 0 ? s * Math.pow(2, -14) * (f / 1024) : e === 31 ? (f ? NaN : s * Infinity) : s * Math.pow(2, e - 15) * (1 + f / 1024); }
    return HALF;
  }

  // ---- the fluid scene: beads (or a steady solve) and the solvent velocity the record kept ----
  // Tracers are drawn, not simulated: each streak is moved through the RECORDED grid velocity (trilinear in space,
  // linear between the kept fields) at the scene's own time scale, and says so in the caption.
  function fluid(fig, base) {
    var S = Stage(fig, { fov: 34 });
    load(base).then(function (res) {
      var m = res[0], buf = res[1], o = m.offsets, H = halfTable();
      var F = m.frames, n = m.nodes, G = m.field.frames, nx = m.field.cells[0], ny = m.field.cells[1], nz = m.field.cells[2];
      var P = new Float32Array(buf, o.pos, F * n * 3), U16 = new Uint16Array(buf, o.u, G * nx * ny * nz * 3);
      var U = new Float32Array(U16.length); for (var q = 0; q < U16.length; q++) U[q] = H[U16[q]];
      var wall = o.wall !== undefined ? new Uint8Array(buf, o.wall, nx * ny * nz) : null;
      var org = m.field.origin, dx = m.field.dx, fsteps = m.field.steps, csz = nx * ny * nz * 3;
      function sample(g0, g1, a, x, y, z, out) {       // trilinear on cell centres, linear between kept fields
        var fx = (x - org[0]) / dx - 0.5, fy = (y - org[1]) / dx - 0.5, fz = (z - org[2]) / dx - 0.5;
        var i = Math.floor(fx), j = Math.floor(fy), k = Math.floor(fz);
        if (i < 0 || j < 0 || k < 0 || i >= nx - 1 || j >= ny - 1 || k >= nz - 1) return false;
        var tx = fx - i, ty = fy - j, tz = fz - k; out[0] = out[1] = out[2] = 0;
        for (var c = 0; c < 8; c++) { var di = c & 1, dj = (c >> 1) & 1, dk = (c >> 2) & 1;
          var w = (di ? tx : 1 - tx) * (dj ? ty : 1 - ty) * (dk ? tz : 1 - tz), cell = (((i + di) * ny + (j + dj)) * nz + (k + dk));
          if (wall && wall[cell]) return false;
          for (var d = 0; d < 3; d++) out[d] += w * (U[g0 * csz + 3 * cell + d] * (1 - a) + U[g1 * csz + 3 * cell + d] * a); }
        return true;
      }
      // what the camera looks at, and the region tracers are born in
      var tgt = m.view.target, box = m.tracers.box, M = m.tracers.count, vmax = m.tracers.vmax;
      S.world.position.set(-tgt[0], -tgt[1], -tgt[2]);
      // beads: glossy spheres at the recorded radius
      var beads = null;
      if (n && m.draw === "rod") {                        // a held rod: its nodes joined in order, drawn as one line
        var rp = new Float32Array((n - 1) * 6);
        for (var ri = 0; ri < n - 1; ri++) for (var rd = 0; rd < 3; rd++) { rp[6 * ri + rd] = P[3 * ri + rd]; rp[6 * ri + 3 + rd] = P[3 * (ri + 1) + rd]; }
        var rg = new T.LineSegmentsGeometry(); rg.setPositions(rp);
        var rmat = fat("#ffd166", 4, 1); S.mats.push(rmat);
        var rod = new T.LineSegments2(rg, rmat); rod.frustumCulled = false; S.world.add(rod);
      } else if (n) {
        var sg = new T.SphereGeometry(1, 32, 20), sm = new T.MeshStandardMaterial({ color: 0xffc766, metalness: 0.35, roughness: 0.28 });
        beads = new T.InstancedMesh(sg, sm, n); beads.frustumCulled = false; S.world.add(beads);
      }
      // walls: the glass as the solver holds it, drawn as the faces between its cells and the water (whole cells, no smoothing)
      if (wall) {
        var W = function (i, j, k) { return i < 0 || j < 0 || k < 0 || i >= nx || j >= ny || k >= nz || wall[(i * ny + j) * nz + k]; };
        var fv = [], h2 = dx / 2;
        for (var c2 = 0; c2 < nx * ny * nz; c2++) if (wall[c2]) {
          var ci = [Math.floor(c2 / (ny * nz)), Math.floor(c2 / nz) % ny, c2 % nz];
          for (var ax = 0; ax < 3; ax++) for (var sg2 = -1; sg2 <= 1; sg2 += 2) {
            var nb = ci.slice(); nb[ax] += sg2; if (W(nb[0], nb[1], nb[2])) continue;
            var cen = ci.map(function (v, d) { return org[d] + (v + 0.5) * dx + (d === ax ? sg2 * h2 : 0); }), u = (ax + 1) % 3, w2 = (ax + 2) % 3;
            [[-1, -1], [1, -1], [1, 1], [-1, -1], [1, 1], [-1, 1]].forEach(function (cr) {
              var pt = cen.slice(); pt[u] += cr[0] * h2; pt[w2] += cr[1] * h2; fv.push(pt[0], pt[1], pt[2]); });
          }
        }
        var wg = new T.BufferGeometry(); wg.setAttribute("position", new T.Float32BufferAttribute(fv, 3)); wg.computeVertexNormals();
        var glass = new T.Mesh(wg, new T.MeshPhongMaterial({ color: 0x9fb8d8, specular: 0x9fc4ff, shininess: 120, transparent: true, opacity: 0.13,
                                                               depthWrite: false, side: T.DoubleSide }));
        glass.frustumCulled = false; S.world.add(glass);
      }
      // streamlines of the recorded water velocity at the moment shown: each traced from a fixed seed, forward and back,
      // through the field (drawn, not simulated); a bright pulse runs along each line, faster where the water is faster
      var NS = m.tracers.lines || 400, PTS = 44, Hs = dx * 0.4, SEG = NS * 2 * PTS;
      var seeds = new Float32Array(NS * 3);
      for (var q3 = 0; q3 < NS; q3++) for (var d0 = 0; d0 < 3; d0++) seeds[3 * q3 + d0] = box[0][d0] + Math.random() * (box[1][d0] - box[0][d0]);
      var tg = new T.LineSegmentsGeometry(), tpos = new Float32Array(SEG * 6), tcol = new Float32Array(SEG * 6);
      var tsp = new Float32Array(SEG), tarc = new Float32Array(SEG), used = 0;
      tg.setPositions(tpos); tg.setColors(tcol);
      var tmat = new T.LineMaterial({ vertexColors: true, linewidth: 1.5, transparent: true, opacity: 0.95, depthWrite: false }); S.mats.push(tmat);
      var tl = new T.LineSegments2(tg, tmat); tl.frustumCulled = false; S.world.add(tl);
      var cold = new T.Color("#2f6bff"), hot = new T.Color("#ffe27a"), tmp = new T.Color(), v = [0, 0, 0], v2 = [0, 0, 0];
      function trace(g0, g1, ga) {
        used = 0;
        for (var q = 0; q < NS; q++) for (var dir = -1; dir <= 1; dir += 2) {
          var x = seeds[3 * q], y = seeds[3 * q + 1], z = seeds[3 * q + 2], arc = 0;
          for (var k = 0; k < PTS; k++) {
            if (!sample(g0, g1, ga, x, y, z, v)) break;
            var sp = Math.hypot(v[0], v[1], v[2]); if (!(sp > 0)) break;
            var mx = x + dir * v[0] / sp * Hs * 0.5, my = y + dir * v[1] / sp * Hs * 0.5, mz = z + dir * v[2] / sp * Hs * 0.5;
            if (!sample(g0, g1, ga, mx, my, mz, v2)) break;                     // midpoint (RK2) along the field's direction
            var s2 = Math.hypot(v2[0], v2[1], v2[2]); if (!(s2 > 0)) break;
            var nx = x + dir * v2[0] / s2 * Hs, ny = y + dir * v2[1] / s2 * Hs, nz = z + dir * v2[2] / s2 * Hs, o6 = used * 6;
            tpos[o6] = x; tpos[o6 + 1] = y; tpos[o6 + 2] = z; tpos[o6 + 3] = nx; tpos[o6 + 4] = ny; tpos[o6 + 5] = nz;
            tsp[used] = s2; tarc[used] = dir * arc; used++;
            x = nx; y = ny; z = nz; arc += Hs;
          }
        }
        tg.setPositions(tpos); tg.instanceCount = used;
      }
      var lastTrace = -1, phase = 0;
      // dye: coloured ink released at declared sources and carried by the RECORDED water velocity (semi-Lagrangian, on the
      // record's own grid), drawn as a volume by ray marching. It is a display of the flow, not something the engine simulated.
      var dye = null;
      if (m.dye && T.DataTexture3D && S.r.capabilities.isWebGL2) {
        var NC = nx * ny * nz, DA = new Float32Array(NC * 2), DB = new Float32Array(NC * 2), D8 = new Uint8Array(NC * 4);   // RGBA: WebGL2 takes it unsized
        var srcCells = [];
        m.dye.sources.forEach(function (sd) {
          for (var i = 0; i < nx; i++) for (var j = 0; j < ny; j++) for (var k = 0; k < nz; k++) {
            var x = org[0] + (i + 0.5) * dx, y = org[1] + (j + 0.5) * dx, z = org[2] + (k + 0.5) * dx;
            if (x < sd.min[0] || x > sd.max[0] || y < sd.min[1] || y > sd.max[1] || z < sd.min[2] || z > sd.max[2]) continue;
            var ch = sd.ch; if (sd.stripes) { var cc = [x, y, z][sd.stripes.axis], ph = Math.floor((cc - sd.min[sd.stripes.axis]) / sd.stripes.period) % 4;
              if (ph % 2) continue; ch = ph / 2; }                    // stripes: colour A, gap, colour B, gap
            srcCells.push(2 * (i + j * nx + k * nx * ny) + ch);
          }
        });
        var tex = new T.DataTexture3D(D8, nx, ny, nz); tex.format = T.RGBAFormat; tex.type = T.UnsignedByteType;
        tex.minFilter = tex.magFilter = T.LinearFilter; tex.unpackAlignment = 1; tex.needsUpdate = true;
        var size = new T.Vector3(nx * dx, ny * dx, nz * dx);
        var vmat = new T.ShaderMaterial({ transparent: true, depthWrite: false, side: T.BackSide,
          uniforms: { uTex: { value: tex }, uSize: { value: size }, uCam: { value: new T.Vector3() }, uGain: { value: m.dye.gain || 6 },
                      uColA: { value: new T.Color(m.dye.colors[0]) }, uColB: { value: new T.Color(m.dye.colors[1]) } },
          vertexShader: "varying vec3 vPos; void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
          fragmentShader: "precision highp float; precision highp sampler3D; uniform sampler3D uTex; uniform vec3 uSize; uniform vec3 uCam;" +
            "uniform float uGain; uniform vec3 uColA; uniform vec3 uColB; varying vec3 vPos;" +
            "void main() { vec3 ro = uCam, rd = normalize(vPos - uCam), h = uSize * 0.5;" +
            " vec3 t0 = (-h - ro) / rd, t1 = (h - ro) / rd, tn3 = min(t0, t1), tf3 = max(t0, t1);" +
            " float tn = max(max(max(tn3.x, tn3.y), tn3.z), 0.0), tf = min(min(tf3.x, tf3.y), tf3.z); if (tf <= tn) discard;" +
            " float dt = (tf - tn) / 96.0; vec3 col = vec3(0.0); float a = 0.0;" +
            " for (int i = 0; i < 96; i++) { vec3 p = ro + rd * (tn + (float(i) + 0.5) * dt); vec2 d = texture(uTex, p / uSize + 0.5).rg;" +
            "  float s = d.r + d.g; if (s < 0.004) continue; vec3 c = (uColA * d.r + uColB * d.g) / s;" +
            "  float al = 1.0 - exp(-s * uGain * dt); col += (1.0 - a) * al * c; a += (1.0 - a) * al; if (a > 0.97) break; }" +
            " gl_FragColor = vec4(col, a); }" });
        var vbox = new T.Mesh(new T.BoxGeometry(size.x, size.y, size.z), vmat); vbox.frustumCulled = false;
        vbox.position.set(org[0] + size.x / 2, org[1] + size.y / 2, org[2] + size.z / 2); vbox.renderOrder = 5; S.world.add(vbox);
        dye = { a: DA, b: DB, tex: tex, box: vbox, mat: vmat, src: srcCells, half: m.dye.half_life_s || 6, emit: m.dye.emit || 0.7, inv: new T.Matrix4(), cam: new T.Vector3() };
        dye.reset = function () { dye.a.fill(0); dye.b.fill(0); };
        dye.step = function (g0, g1, ga, dts, dtw) {    // carry the ink one display frame through the recorded velocity
          var A = dye.a, B = dye.b, cs = dts / dx, gz = nx * ny, keep = Math.pow(0.5, dtw / dye.half);
          for (var k = 0; k < nz; k++) for (var j = 0; j < ny; j++) for (var i = 0; i < nx; i++) {
            var cD = i + j * nx + k * gz, cU = 3 * ((i * ny + j) * nz + k);
            if (wall && wall[(i * ny + j) * nz + k]) { B[2 * cD] = B[2 * cD + 1] = 0; continue; }
            var vx = U[g0 * csz + cU] * (1 - ga) + U[g1 * csz + cU] * ga, vy = U[g0 * csz + cU + 1] * (1 - ga) + U[g1 * csz + cU + 1] * ga,
                vz = U[g0 * csz + cU + 2] * (1 - ga) + U[g1 * csz + cU + 2] * ga;
            var bx = Math.min(nx - 1.001, Math.max(0, i - vx * cs)), by = Math.min(ny - 1.001, Math.max(0, j - vy * cs)), bz = Math.min(nz - 1.001, Math.max(0, k - vz * cs));
            var i0 = bx | 0, j0 = by | 0, k0 = bz | 0, tx = bx - i0, ty = by - j0, tz = bz - k0, r0 = 0, r1 = 0;
            for (var cc = 0; cc < 8; cc++) { var di = cc & 1, dj = (cc >> 1) & 1, dk = (cc >> 2) & 1;
              var w = (di ? tx : 1 - tx) * (dj ? ty : 1 - ty) * (dk ? tz : 1 - tz), q = 2 * ((i0 + di) + (j0 + dj) * nx + (k0 + dk) * gz);
              r0 += w * A[q]; r1 += w * A[q + 1]; }
            B[2 * cD] = r0 * keep; B[2 * cD + 1] = r1 * keep;
          }
          for (var sI = 0; sI < dye.src.length; sI++) B[dye.src[sI]] = dye.emit;
          dye.a = B; dye.b = A;
          for (var q2 = 0, q4 = 0; q2 < B.length; q2 += 2, q4 += 4) { D8[q4] = Math.min(255, B[q2] * 255) | 0; D8[q4 + 1] = Math.min(255, B[q2 + 1] * 255) | 0; }
          dye.tex.needsUpdate = true;
        };
      }
      var hud = fig.querySelector(".scene-clock"), counts = fig.querySelector(".scene-counts");
      var STEP_S = m.display.seconds_per_step, SPAN = F > 1 ? (F - 1) * STEP_S : 30, FADE = 0.6, t0 = null, last = null, mat4 = new T.Matrix4();
      function draw(ts) {
        if (S.dead) return;
        requestAnimationFrame(draw);
        if (!S.visible) { t0 = null; last = null; return; }
        if (t0 === null) t0 = ts;
        var dt = last === null ? 0.016 : Math.min(0.05, (ts - last) / 1000); last = ts;
        var el = (ts - t0) / 1000, loop = SPAN + 2 * FADE, tt = reduce ? SPAN / 2 : el % loop;
        var disp = Math.max(0, Math.min(SPAN, tt - FADE)), sstep = F > 1 ? disp / STEP_S : 0;
        S.fade(reduce ? 0 : tt < FADE ? 1 - tt / FADE : tt > SPAN + FADE ? (tt - SPAN - FADE) / FADE : 0);
        var f = Math.min(Math.max(0, F - 2), Math.floor(sstep)), a = F > 1 ? Math.min(1, sstep - f) : 0;
        if (beads) for (var b = 0; b < n; b++) { var p0 = (f * n + b) * 3, p1 = (Math.min(f + 1, F - 1) * n + b) * 3;
          mat4.makeScale(m.radius, m.radius, m.radius).setPosition(P[p0] + (P[p1] - P[p0]) * a, P[p0 + 1] + (P[p1 + 1] - P[p0 + 1]) * a, P[p0 + 2] + (P[p1 + 2] - P[p0 + 2]) * a);
          beads.setMatrixAt(b, mat4); }
        if (beads) beads.instanceMatrix.needsUpdate = true;
        // the kept fields around the scene step now
        var step = (m.steps[f] || 0) + a * ((m.steps[f + 1] || 0) - (m.steps[f] || 0)), g0 = 0;
        while (g0 < G - 1 && fsteps[g0 + 1] <= step) g0++;
        var g1 = Math.min(G - 1, g0 + 1), ga = g1 > g0 ? Math.max(0, Math.min(1, (step - fsteps[g0]) / (fsteps[g1] - fsteps[g0]))) : 0;
        // retrace when the shown moment has moved on (a steady solve is traced once)
        var key = G > 1 ? Math.round((g0 + ga) * 8) : 0;
        if (key !== lastTrace) { trace(g0, g1, ga); lastTrace = key; }
        phase += dt;
        var lam = dx * 3;
        for (var q4 = 0; q4 < used; q4++) {
          var sp4 = tsp[q4], u01 = Math.min(1, sp4 / vmax);
          var pulse = Math.pow(0.5 + 0.5 * Math.sin(2 * Math.PI * (tarc[q4] / lam - phase * (0.25 + 1.6 * u01))), 6);
          var br = 0.28 + 0.9 * pulse;
          tmp.copy(cold).lerp(hot, u01);
          var c6 = q4 * 6;
          tcol[c6] = tcol[c6 + 3] = tmp.r * br; tcol[c6 + 1] = tcol[c6 + 4] = tmp.g * br; tcol[c6 + 2] = tcol[c6 + 5] = tmp.b * br;
        }
        tg.setColors(tcol); tg.instanceCount = used;
        if (dye) {
          if (tt < FADE && !dye.cleared) { dye.reset(); dye.cleared = true; } else if (tt >= FADE) dye.cleared = false;
          dye.step(g0, g1, ga, dt * m.display.scene_time_per_second, dt);
        }
        if (hud) hud.textContent = m.steady_label || m.display.clock(step);
        if (counts && m.readout) counts.textContent = m.readout(f, a);
        var ang = (reduce ? 0.5 : el * m.view.spin) + m.view.phase, Rc = m.view.dist;
        S.cam.position.set(Rc * Math.sin(ang), Rc * m.view.elev, Rc * Math.cos(ang)); S.cam.lookAt(0, 0, 0);
        S.scene.fog.near = Rc * 0.7; S.scene.fog.far = Rc * 2.2;
        if (dye) { S.world.updateMatrixWorld(); dye.inv.copy(dye.box.matrixWorld).invert(); dye.mat.uniforms.uCam.value.copy(S.cam.position).applyMatrix4(dye.inv); }
        S.render(ts / 1000);
      }
      m.display.clock = function (step) { return (m.clock_prefix || "step ") + step.toFixed(1); };
      S.resize(); requestAnimationFrame(draw); fig.classList.add("ready");
    }).catch(function (e) { if (window.console) console.error(e); fig.classList.add("failed"); });
    return S;
  }

  // ---- the contact scene: C4's signed B3b, a sphere settling onto a plate, with the two forces drawn as arrows ----
  function contact(fig, base) {
    var S = Stage(fig, { fov: 30, bloom: 0.3, threshold: 0.92 });
    fetch(base + ".json").then(function (r) { return r.json(); }).then(function (m) {
      S.world.rotation.x = -Math.PI / 2;                   // the record's z is up
      var b = m.plate_box, sx = b.max[0] - b.min[0], sy = b.max[1] - b.min[1], sz = b.max[2] - b.min[2];
      var plate = new T.Mesh(new T.BoxGeometry(sx, sy, sz), new T.MeshPhysicalMaterial({ color: 0x9fc4ff, metalness: 0.1, roughness: 0.15,
        transparent: true, opacity: 0.55, clearcoat: 1 }));
      plate.position.set((b.max[0] + b.min[0]) / 2, (b.max[1] + b.min[1]) / 2, (b.max[2] + b.min[2]) / 2); S.world.add(plate);
      var ball = new T.Mesh(new T.SphereGeometry(m.R, 64, 40), new T.MeshStandardMaterial({ color: 0xb8863b, metalness: 0.6, roughness: 0.35, envMapIntensity: 0.6 }));
      S.world.add(ball);
      var L = 0.45;                                          // arrow length per pN, µm
      var down = new T.ArrowHelper(new T.Vector3(0, 0, -1), new T.Vector3(), 1, 0xffd166, 0.12, 0.08);
      var up = new T.ArrowHelper(new T.Vector3(0, 0, 1), new T.Vector3(), 1, 0x7fe0ff, 0.12, 0.08);
      S.world.add(down); S.world.add(up);
      var hud = fig.querySelector(".scene-clock"), counts = fig.querySelector(".scene-counts");
      var ST = m.steps, n = ST.length, STEP_S = 1.1, HOLD = 2.5, FADE = 0.6, SPAN = (n - 1) * STEP_S + HOLD, t0 = null;
      function draw(ts) {
        if (S.dead) return;
        requestAnimationFrame(draw);
        if (!S.visible) { t0 = null; return; }
        if (t0 === null) t0 = ts;
        var el = (ts - t0) / 1000, loop = SPAN + 2 * FADE, tt = reduce ? SPAN : el % loop;
        var disp = Math.max(0, Math.min((n - 1) * STEP_S, tt - FADE)), f = Math.min(n - 2, Math.floor(disp / STEP_S)), a = Math.min(1, disp / STEP_S - f);
        S.fade(reduce ? 0 : tt < FADE ? 1 - tt / FADE : tt > SPAN + FADE ? (tt - SPAN - FADE) / FADE : 0);
        var p0 = m.sphere[f], p1 = m.sphere[f + 1], c = [0, 1, 2].map(function (d) { return p0[d] + (p1[d] - p0[d]) * a; });
        ball.position.set(c[0], c[1], c[2]);
        var fc = ST[f].contact_pN + (ST[f + 1].contact_pN - ST[f].contact_pN) * a, gap = ST[f].gap_um + (ST[f + 1].gap_um - ST[f].gap_um) * a;
        down.position.set(c[0], c[1], c[2] + m.R + m.F_pN * L + 0.02); down.setLength(m.F_pN * L, 0.12, 0.08);
        up.visible = fc > 1e-3; up.position.set(c[0], c[1], c[2] - m.R - fc * L - 0.005); up.setLength(Math.max(fc * L, 1e-3), 0.12, 0.08);
        if (hud) hud.textContent = "step " + (f + a).toFixed(1) + " of " + (n - 1);
        if (counts) counts.innerHTML = '<span><i style="background:#ffd166"></i>applied ' + m.F_pN.toFixed(2) + ' pN</span>' +
          '<span><i style="background:#7fe0ff"></i>plate pushes back ' + fc.toFixed(3) + ' pN</span><span>gap ' + (gap * 1000).toFixed(1) + ' nm</span>';
        var ang = (reduce ? 0.5 : el * 0.12) + 0.4, R = 6.2;
        S.cam.position.set(R * Math.sin(ang), 1.6, R * Math.cos(ang)); S.cam.lookAt(0, 0.35, 0);
        S.render(ts / 1000);
      }
      S.resize(); requestAnimationFrame(draw); fig.classList.add("ready");
    }).catch(function (e) { if (window.console) console.error(e); fig.classList.add("failed"); });
    return S;
  }

  var KINDS = { micro: micro, fluid: fluid, contact: contact };
  // a page of scenes keeps at most MAX_LIVE GPU contexts: a scene is built as it nears the screen, and the one out of
  // sight the longest is freed when a new one needs room (it is rebuilt if it comes back)
  var MAX_LIVE = 5, live = [];
  function start(fig) {
    var f = KINDS[fig.getAttribute("data-kind")]; if (!f) return;
    while (live.length >= MAX_LIVE) {
      var old = null; live.forEach(function (L) { if (!L.near && (!old || L.seen < old.seen)) old = L; });
      if (!old) break;
      old.S.kill(); live.splice(live.indexOf(old), 1); old.fig._live = null;
    }
    var L = { fig: fig, S: f(fig, fig.getAttribute("data-scene")), near: true, seen: Date.now() };
    live.push(L); fig._live = L;
  }
  var figs = document.querySelectorAll("figure.scene[data-scene]");
  if (!("IntersectionObserver" in window)) { figs.forEach(start); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
    var fig = e.target, L = fig._live;
    if (e.isIntersecting) { if (L) { L.near = true; L.seen = Date.now(); } else start(fig); }
    else if (L) { L.near = false; L.seen = Date.now(); }
  }); }, { rootMargin: "500px 0px" });
  figs.forEach(function (fig) { io.observe(fig); });
})();
