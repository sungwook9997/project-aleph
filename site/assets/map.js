// The Map page's input explorer: the parameter evidence map (tools/extract_atlas.py -> media/map/atlas.json) as a circle of
// the 52 input groups joined by the records that link their inputs, and a look-up of any one input. A link is a review or
// construction record, never a correlation; its kind is kept, and nothing is weighted by how many links an input has.
(function () {
  var root = document.getElementById("atlas"); if (!root) return;
  var KINDS = [["alias", "Aliases", "One input declared as another's value"], ["construction", "Built together", "Inputs read together where the cell is built (selected, not complete)"],
               ["example", "Reviewed relations", "Inputs discussed together in a review; no joint law inferred"], ["transform", "Conversions", "A static conversion from one quantity to another"],
               ["fit", "Shared fits", "Estimates from the same published fit; covariance unknown"], ["comparison", "Source comparisons", "Inputs compared with the same source, not fitted jointly by it"]];
  var NAME = {}; KINDS.forEach(function (k) { NAME[k[0]] = k[1]; });
  var TAG = { EXAMPLE: "example value", SOURCED: "from the literature", SWEPT: "swept range" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  fetch(root.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (A) {
    var selectedInput = null;
    var P = A.params, on = { alias: 1, construction: 1, example: 1, transform: 1, fit: 1, comparison: 0 };
    var groups = [], gi = {}; P.forEach(function (p, i) { if (!(p.g in gi)) { gi[p.g] = groups.length; groups.push({ g: p.g, ps: [] }); } groups[gi[p.g]].ps.push(i); });
    groups.sort(function (a, b) { return a.g < b.g ? -1 : 1; }); groups.forEach(function (G, i) { gi[G.g] = i; });
    var hubsOf = P.map(function () { return []; }), aliasOf = P.map(function () { return { root: null, deps: [] }; });
    A.hubs.forEach(function (h, k) { h.p.forEach(function (i) { hubsOf[i].push(k); }); });
    A.alias.forEach(function (e) { aliasOf[e[0]].root = e[1]; aliasOf[e[1]].deps.push(e[0]); });
    var byName = {}; P.forEach(function (p, i) { byName[p.n] = i; });
    root.innerHTML =
      '<div class="atlas-kinds" role="group" aria-label="Kinds of link">' + KINDS.map(function (k) {
        return '<label title="' + esc(k[2]) + '"><input type="checkbox" data-k="' + k[0] + '"' + (on[k[0]] ? " checked" : "") + '> <i class="k-' + k[0] + '"></i>' + esc(k[1]) + "</label>"; }).join("") + "</div>" +
      '<label class="atlas-group-picker">Explore an input group <select>' + groups.map(function(G,i){return '<option value="'+i+'">'+esc(G.g)+' · '+G.ps.length+' inputs</option>';}).join('') + '</select></label><div class="atlas-grid"><div class="atlas-ring"><div class="atlas-route-heading"></div><div class="atlas-routes"></div><details class="ex-disclosure"><summary>Complete group topology · all groups</summary><svg viewBox="-470 -470 940 940" role="img" aria-label="The 52 input groups around a circle, joined where records link their inputs"></svg>' +
      '<p class="small muted">Each dot is a group of inputs (area: how many); a line joins two groups when a record of a shown kind links inputs of both (width: how many records). Click a group to list its inputs.</p></details></div>' +
      '<div class="atlas-side"><label class="atlas-search">Find an input <input type="search" list="atlas-names" placeholder="e.g. erm.k_off0 or cortex.thickness"></label>' +
      '<datalist id="atlas-names">' + P.map(function (p) { return '<option value="' + esc(p.n) + '">'; }).join("") + "</datalist>" +
      '<div class="atlas-group"></div><div class="atlas-detail" aria-live="polite"><p class="muted">Pick a group on the circle, or find an input by name.</p></div></div></div>' +
      '<details class="atlas-added"><summary>' + A.added.length + " inputs added to the file since the map was built (no records reviewed for them yet)</summary><ul>" +
      A.added.map(function (a) { return "<li><code>" + esc(a.n) + "</code> " + esc(a.v) + " " + esc(a.u || "") + ' <span class="tag ' + esc(a.t) + '">' + esc((a.t || "").toLowerCase()) + "</span></li>"; }).join("") + "</ul></details>";
    var svg = root.querySelector("svg"), NS = "http://www.w3.org/2000/svg", R = 360, sel = gi.cortex === undefined ? 0 : gi.cortex;
    var pos = groups.map(function (G, i) { var a = 2 * Math.PI * i / groups.length - Math.PI / 2; return [R * Math.cos(a), R * Math.sin(a), a]; });
    function el(tag, at) { var e = document.createElementNS(NS, tag); for (var k in at) e.setAttribute(k, at[k]); return e; }
    function draw() {
      svg.textContent = "";
      var w = {};
      function add(a, b, kind) { if (a === b) return; var key = a < b ? a + "|" + b : b + "|" + a; (w[key] = w[key] || { n: 0, kinds: {} }).n++; w[key].kinds[kind] = 1; }
      if (on.alias) A.alias.forEach(function (e) { add(gi[P[e[0]].g], gi[P[e[1]].g], "alias"); });
      A.hubs.forEach(function (h) { if (!on[h.k]) return; var gs = {}; h.p.forEach(function (i) { gs[gi[P[i].g]] = 1; }); var ks = Object.keys(gs).map(Number);
        for (var x = 0; x < ks.length; x++) for (var y = x + 1; y < ks.length; y++) add(ks[x], ks[y], h.k); });
      var connected = Object.keys(w).map(function(key){var ab=key.split('|').map(Number);return {ab:ab,W:w[key]};}).filter(function(e){return e.ab.indexOf(sel)!==-1;});
      root.querySelector('.atlas-route-heading').innerHTML='<h3>'+esc(groups[sel].g)+' <span class="muted">relationships</span></h3><p class="small muted">Each row is one connection to another input group. The moving mark follows a record link, not a physical signal.</p><button class="atlas-flow-toggle">Pause flow</button>';
      root.querySelector('.atlas-routes').innerHTML=connected.length?connected.map(function(e){var other=e.ab[0]===sel?e.ab[1]:e.ab[0];return '<div class="atlas-route-row"><span>'+esc(groups[sel].g)+'</span><span class="atlas-route-line">'+e.W.n+' records<small>'+Object.keys(e.W.kinds).map(function(k){return esc(NAME[k]);}).join(' · ')+'</small></span><button data-group="'+other+'">'+esc(groups[other].g)+' →</button></div>';}).join(''):'<p class="small muted">No cross-group links of these types. The input records on the right may still link values within this group.</p>';
      var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      root.classList.toggle('atlas-paused',reduced);
      root.querySelector('.atlas-flow-toggle').textContent=reduced?'Play flow':'Pause flow';
      root.querySelector('.atlas-flow-toggle').onclick=function(){root.classList.toggle('atlas-paused');this.textContent=root.classList.contains('atlas-paused')?'Play flow':'Pause flow';};
      var lines = el("g", { "class": "ring-links" }); svg.appendChild(lines);
      Object.keys(w).forEach(function (key) { var ab = key.split("|").map(Number), a = pos[ab[0]], b = pos[ab[1]], W = w[key];
        var kind = Object.keys(W.kinds).length > 1 ? "mixed" : Object.keys(W.kinds)[0];
        var hit = sel !== null && (ab[0] === sel || ab[1] === sel);
        var path = el("path", { d: "M" + a[0] + " " + a[1] + " Q" + (a[0] + b[0]) * 0.18 + " " + (a[1] + b[1]) * 0.18 + " " + b[0] + " " + b[1],
          "class": "k-" + kind + (sel === null ? "" : hit ? " hot" : " dim"), "stroke-width": Math.min(9, 0.8 + 1.4 * Math.log(1 + W.n)) });
        var t = el("title", {}); t.textContent = groups[ab[0]].g + " – " + groups[ab[1]].g + ": " + W.n + " record" + (W.n > 1 ? "s" : ""); path.appendChild(t);
        lines.appendChild(path); });
      groups.forEach(function (G, i) { var p = pos[i], r = 4 + Math.sqrt(G.ps.length) * 1.9;
        var g = el("g", { "class": "ring-node" + (i === sel ? " on" : ""), tabindex: 0, role: "button", "aria-label": G.g + ", " + G.ps.length + " inputs" });
        g.appendChild(el("circle", { cx: p[0], cy: p[1], r: r }));
        var deg = p[2] * 180 / Math.PI, flip = Math.cos(p[2]) < 0, lx = (R + r + 8) * Math.cos(p[2]), ly = (R + r + 8) * Math.sin(p[2]);
        var tx = el("text", { x: lx, y: ly, transform: "rotate(" + (flip ? deg + 180 : deg) + " " + lx + " " + ly + ")", "text-anchor": flip ? "end" : "start", dy: "0.35em" });
        tx.textContent = G.g; g.appendChild(tx);
        g.addEventListener("click", function () { pickGroup(i); });
        g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickGroup(i); } });
        svg.appendChild(g); });
    }
    function chip(i) { var p = P[i]; return '<button class="pchip' + (p.x ? " x" : "") + '" data-i="' + i + '">' + esc(p.n) + "</button>"; }
    function pickGroup(i) { sel = i; selectedInput = null;root.querySelector('.atlas-detail').innerHTML='<p class="muted">Select an input above to read its linked records.</p>'; root.querySelector('.atlas-group-picker select').value=String(i); draw(); var G = groups[i];
      root.querySelector(".atlas-group").innerHTML = "<h3>" + esc(G.g) + ' <span class="muted">' + G.ps.length + " inputs</span></h3><p>" + G.ps.map(chip).join(" ") + "</p>"; }
    function show(i) {
      var p = P[i], al = aliasOf[i];
      if (sel !== gi[p.g]) pickGroup(gi[p.g]);
      var val = p.b ? "alias of <button class=\"pchip\" data-i=\"" + byName[p.b] + "\">" + esc(p.b) + "</button>" : "<b>" + esc(p.v) + "</b> " + esc(p.u || "");
      var h = "<h3>" + esc(p.n) + '</h3><p class="pval">' + val + ' <span class="tag ' + esc(p.t) + '">' + esc(TAG[p.t] || p.t) + "</span></p>";
      if (p.x) h += '<p class="warn-line small">' + (p.x === "removed" ? "Not in the parameter file in use now." : "Changed in the parameter file in use now; the records below were reviewed before the change.") + "</p>";
      if (p.s) h += '<p class="psrc">' + esc(p.s) + "</p>";
      if (p.r) h += '<p class="small muted">Citations named in its source text: ' + p.r.map(esc).join(", ") + " (named, not checked here).</p>";
      if (al.deps.length) h += '<p class="small">Inputs declared as this one\'s value: ' + al.deps.map(chip).join(" ") + "</p>";
      var hs = hubsOf[i].filter(function (k) { return on[A.hubs[k].k]; });
      h += "<h4>" + (hs.length ? "In " + hs.length + " record" + (hs.length > 1 ? "s" : "") + " of the kinds shown" : "No record of the kinds shown links this input") + "</h4>";
      h += hs.map(function (k) { var H = A.hubs[k], others = H.p.filter(function (j) { return j !== i; });
        return '<div class="hub"><p class="hub-k"><i class="k-' + H.k + '"></i>' + esc(NAME[H.k]) + (H.re ? ' <span class="warn-line">reviewed lines changed since: needs re-review</span>' : "") + "</p><p><b>" + esc(H.title) + "</b></p>" +
          (H.text ? "<p>" + esc(H.text) + "</p>" : "") + (H.notes.length ? '<ul class="small">' + H.notes.map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul>" : "") +
          (H.refs.length ? '<p class="small muted">Sources: ' + H.refs.map(esc).join(", ") + "</p>" : "") +
          (others.length ? '<p class="small">With: ' + others.slice(0, 24).map(chip).join(" ") + (others.length > 24 ? " and " + (others.length - 24) + " more" : "") + "</p>" : "") + "</div>"; }).join("");
      root.querySelector(".atlas-detail").innerHTML = h; selectedInput = i;
    }
    root.addEventListener("click", function (e) { var b = e.target.closest(".pchip"); if (b) show(+b.getAttribute("data-i"));var group=e.target.closest("[data-group]");if(group)pickGroup(+group.dataset.group); });
    root.querySelectorAll(".atlas-kinds input").forEach(function (c) { c.addEventListener("change", function () { on[c.getAttribute("data-k")] = c.checked ? 1 : 0; draw(); if(selectedInput !== null)show(selectedInput); }); });
    var q = root.querySelector(".atlas-search input");
    q.addEventListener("change", function () { if (q.value in byName) show(byName[q.value]); });
    root.querySelector('.atlas-group-picker select').onchange=function(){pickGroup(+this.value);};
    pickGroup(sel);
    var want = decodeURIComponent((location.hash.match(/#input=([^&]+)/) || [])[1] || "");
    if (want in byName) show(byName[want]);else if('cortex.thickness' in byName)show(byName['cortex.thickness']);
  }).catch(function (e) { root.innerHTML = '<p class="warn-line">The map could not load (' + esc(e.message) + ").</p>"; });
})();
