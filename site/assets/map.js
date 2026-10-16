// The Map overview's input explorer (media/map/atlas.json, tools/extract_map.py): every input group of both layers on one
// circle, ENGINE on one arc and CELL on the other, joined where one part of the engine reads both groups. A line is a
// shared reader, never a correlation or a causal link.
(function () {
  var root = document.getElementById("atlas"); if (!root) return;
  var STATE = { executed: "executed on the live path", read: "read by code, not on the live path", unread: "not read by any code" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  fetch(root.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (A) {
    var G = A.groups, P = A.params, parts = A.parts, gi = {}, byName = {}, rowsOf = G.map(function () { return []; });
    G.forEach(function (g, i) { gi[g.id] = i; });
    P.forEach(function (p, i) { byName[p.n] = i; rowsOf[gi[p.g]].push(i); });
    var hubsOf = {}; A.authored.hubs.forEach(function (h, k) { h.p.forEach(function (n) { (hubsOf[n] = hubsOf[n] || []).push(k); }); });
    var links = {};                       // "a|b" -> part indices reading both groups
    parts.forEach(function (pt, k) { var gs = pt.g.map(function (g) { return gi[g]; });
      for (var x = 0; x < gs.length; x++) for (var y = x + 1; y < gs.length; y++) { var a = Math.min(gs[x], gs[y]), b = Math.max(gs[x], gs[y]); (links[a + "|" + b] = links[a + "|" + b] || []).push(k); } });
    var nE = G.filter(function (g) { return g.l === "engine"; }).length, gap = 0.12;
    var pos = G.map(function (g, i) {      // engine arc on the left, cell arc on the right, a gap between them
      var span = Math.PI - gap, a = g.l === "engine" ? Math.PI / 2 + gap / 2 + span * (i + 0.5) / nE : -Math.PI / 2 + gap / 2 + span * (i - nE + 0.5) / (G.length - nE);
      return [360 * Math.cos(a), 360 * Math.sin(a), a]; });
    var sel = gi["cell:cortex"] !== undefined ? gi["cell:cortex"] : 0, focus = false;
    root.innerHTML =
      '<div class="atlas-whole"><div class="whole-system-head"><h3>All input groups, connected</h3><div><button class="atlas-show-all">Show all links</button></div></div>' +
      '<p class="small"><span class="spill dev">ENGINE · ' + A.layers.engine.groups + ' groups · ' + A.layers.engine.rows.toLocaleString() + ' rows</span> <span class="spill approx">CELL · ' + A.layers.cell.groups + ' groups · ' + A.layers.cell.rows.toLocaleString() + ' rows</span></p>' +
      '<div class="atlas-whole-scroll"><svg viewBox="-520 -520 1040 1040" role="group" aria-label="All input groups, joined where one part reads both"></svg></div>' +
      '<p class="small muted">Each dot is an input group (engine left, cell right); each line means one part of the engine reads both groups. Choose a group to see its readers and rows.</p></div>' +
      '<label class="atlas-group-picker">Explore an input group <select>' + ["engine", "cell"].map(function (l) { return '<optgroup label="' + l.toUpperCase() + '">' + G.map(function (g, i) { return g.l === l ? '<option value="' + i + '">' + esc(g.g) + ' · ' + g.n + ' rows</option>' : ""; }).join("") + "</optgroup>"; }).join("") + '</select></label>' +
      '<div class="atlas-grid"><div class="atlas-ring"><div class="atlas-route-heading"></div><div class="atlas-routes"></div></div>' +
      '<div class="atlas-side"><label class="atlas-search">Find an input <input type="search" list="atlas-names" placeholder="e.g. cortex.thickness or newton.tol_F"></label>' +
      '<datalist id="atlas-names">' + P.map(function (p) { return '<option value="' + esc(p.n) + '">'; }).join("") + '</datalist>' +
      '<div class="atlas-group"></div><div class="atlas-detail" aria-live="polite"></div></div></div>';
    var svg = root.querySelector("svg"), NS = "http://www.w3.org/2000/svg";
    function el(tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; }
    function label(i) { return G[i].l.toUpperCase() + " · " + G[i].g; }
    function draw() {
      svg.textContent = "";
      var lines = el("g", { "class": "ring-links" }); svg.appendChild(lines);
      Object.keys(links).forEach(function (key) { var ab = key.split("|").map(Number), a = pos[ab[0]], b = pos[ab[1]], ks = links[key];
        var cross = G[ab[0]].l !== G[ab[1]].l, hit = ab[0] === sel || ab[1] === sel;
        var path = el("path", { d: "M" + a[0] + " " + a[1] + " Q" + (a[0] + b[0]) * 0.18 + " " + (a[1] + b[1]) * 0.18 + " " + b[0] + " " + b[1],
          "class": (cross ? "k-cross" : "k-" + G[ab[0]].l) + (!focus ? "" : hit ? " hot" : " dim"), "stroke-width": Math.min(6, 0.8 + Math.log(ks.length + 1)) });
        var t = el("title", {}); t.textContent = label(ab[0]) + " – " + label(ab[1]) + ": read together by " + ks.map(function (k) { return parts[k].t; }).join(", "); path.appendChild(t);
        lines.appendChild(path); });
      G.forEach(function (g, i) { var p = pos[i], r = 3 + Math.sqrt(g.n) * 0.9;
        var n = el("g", { "class": "ring-node l-" + g.l + (i === sel ? " on" : ""), tabindex: 0, role: "button", "aria-label": label(i) + ", " + g.n + " rows" });
        n.appendChild(el("circle", { cx: p[0], cy: p[1], r: r }));
        var deg = p[2] * 180 / Math.PI, flip = Math.cos(p[2]) < 0, lx = (360 + r + 6) * Math.cos(p[2]), ly = (360 + r + 6) * Math.sin(p[2]);
        var tx = el("text", { x: lx, y: ly, transform: "rotate(" + (flip ? deg + 180 : deg) + " " + lx + " " + ly + ")", "text-anchor": flip ? "end" : "start", dy: "0.35em" });
        tx.textContent = g.g; n.appendChild(tx);
        n.addEventListener("click", function () { pick(i); });
        n.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } });
        svg.appendChild(n); });
      var g = G[sel], readers = g.p.map(function (k) { return parts[k]; }), other = {};
      Object.keys(links).forEach(function (key) { var ab = key.split("|").map(Number); if (ab.indexOf(sel) < 0) return; other[ab[0] === sel ? ab[1] : ab[0]] = links[key]; });
      var ks = Object.keys(other).map(Number).sort(function (a, b) { return other[b].length - other[a].length; });
      root.querySelector(".atlas-route-heading").innerHTML = "<h3>" + esc(label(sel)) + ' <span class="muted">connections</span></h3><p class="small">Read by ' +
        (readers.length ? readers.map(function (pt) { return '<span class="spill ' + (pt.s === "engine" ? "dev" : "approx") + '">' + esc(pt.t) + "</span>"; }).join(" ") : '<span class="spill">no part lists this group</span>') + "</p>";
      root.querySelector(".atlas-routes").innerHTML = ks.length ? ks.map(function (o) { return '<div class="atlas-route-row"><span>' + esc(g.g) + '</span><span class="atlas-route-line">' + other[o].length + " shared part" + (other[o].length > 1 ? "s" : "") + "<small>" + other[o].map(function (k) { return esc(parts[k].t); }).join(" · ") + '</small></span><button data-group="' + o + '">' + esc(label(o)) + " →</button></div>"; }).join("")
        : '<p class="small muted">No other group shares a reader with this one.</p>';
    }
    function chip(i) { return '<button class="pchip st-' + P[i].st + '" data-i="' + i + '">' + esc(P[i].n) + "</button>"; }
    function pick(i, f) { focus = f !== false; sel = i; root.querySelector(".atlas-group-picker select").value = String(i); draw();
      var st = {}; rowsOf[i].forEach(function (j) { st[P[j].st] = (st[P[j].st] || 0) + 1; });
      root.querySelector(".atlas-group").innerHTML = "<h3>" + esc(label(i)) + ' <span class="muted">' + G[i].n + " rows</span></h3><p class=\"small\">" +
        Object.keys(st).map(function (s) { return '<span class="spill ' + (s === "executed" ? "good" : s === "unread" ? "bad" : "") + '">' + st[s] + " " + esc(s) + "</span>"; }).join(" ") + "</p><p>" + rowsOf[i].map(chip).join(" ") + "</p>";
      root.querySelector(".atlas-detail").innerHTML = '<p class="muted">Select an input to read its value and source.</p>'; }
    function show(i) {
      var p = P[i]; if (sel !== gi[p.g]) pick(gi[p.g]);
      var rg = p.rg ? " · range " + esc(p.rg.join("–")) : "";
      var h = "<h3>" + esc(p.n) + '</h3><p class="pval"><b>' + esc(p.v) + "</b> " + esc(p.u || "") + rg + ' <span class="tag ' + esc(p.t) + '">' + esc(p.t.toLowerCase()) + "</span> " +
        '<span class="spill ' + (p.st === "executed" ? "good" : p.st === "unread" ? "bad" : "") + '">' + esc(STATE[p.st]) + "</span></p>";
      if (p.sc || p.c) h += '<p class="small">' + (p.sc ? "Source class: " + esc(p.sc.replace(/_/g, " ").toLowerCase()) : "") + (p.c ? (p.sc ? " · " : "") + "cites " + esc(p.c) : "") + "</p>";
      if (p.s) h += '<p class="psrc">' + esc(p.s) + "</p>";
      var hs = hubsOf[p.n] || [];
      if (hs.length) h += '<details class="fold"><summary><span class="fold-head">' + hs.length + " review record" + (hs.length > 1 ? "s" : "") + '</span> <span class="pills"><span class="spill">authored ' + esc(A.authored.date) + '</span></span><span class="more">More</span></summary><p class="small muted">' + esc(A.authored.note) + "</p>" +
        hs.map(function (k) { var H = A.authored.hubs[k]; return '<div class="hub"><p><b>' + esc(H.title) + "</b></p>" + (H.text ? "<p>" + esc(H.text) + "</p>" : "") + (H.refs && H.refs.length ? '<p class="small muted">Sources: ' + H.refs.map(esc).join(", ") + "</p>" : "") + "</div>"; }).join("") + "</details>";
      root.querySelector(".atlas-detail").innerHTML = h;
    }
    root.addEventListener("click", function (e) { var b = e.target.closest(".pchip"); if (b) show(+b.getAttribute("data-i")); var g = e.target.closest("[data-group]"); if (g) pick(+g.dataset.group); });
    root.querySelector(".atlas-show-all").onclick = function () { focus = false; draw(); };
    var q = root.querySelector(".atlas-search input");
    q.addEventListener("change", function () { if (q.value in byName) show(byName[q.value]); });
    root.querySelector(".atlas-group-picker select").onchange = function () { pick(+this.value); };
    pick(sel, false);
    var want = decodeURIComponent((location.hash.match(/#input=([^&]+)/) || [])[1] || "");
    if (want in byName) show(byName[want]);
  }).catch(function (e) { root.innerHTML = '<p class="warn-line">The map could not load (' + esc(e.message) + ").</p>"; });
})();
