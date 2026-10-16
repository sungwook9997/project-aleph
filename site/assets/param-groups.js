// Map → Parameters: every input row of both layers (media/map/atlas.json, tools/extract_map.py), by group, with filters.
(function () {
  var root = document.getElementById("parameter-app"); if (!root) return;
  var SHOW = 200, STATE = { executed: "executed", read: "read", unread: "unread" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  fetch(root.getAttribute("data-src")).then(function (r) { return r.json(); }).then(function (A) {
    var P = A.params, G = A.groups, parts = A.parts, cur = { g: "", l: "", t: "", st: "", q: "" };
    var want = new URLSearchParams(location.search).get("parameter") || "";
    if (want) cur.q = want.toLowerCase();
    function opts(_, vals) { return vals.map(function (v) { return '<option value="' + esc(v) + '">' + esc(v || "any") + "</option>"; }).join(""); }
    function uniq(f) { var s = {}; P.forEach(function (p) { s[f(p)] = 1; }); return Object.keys(s).sort(); }
    root.innerHTML =
      ["engine", "cell", "instrument"].map(function (l) { return '<details class="pg-layer"' + (l === "engine" ? " open" : "") + '><summary><h3>' + l.toUpperCase() + ' layer <span class="muted">' + A.layers[l].rows.toLocaleString() + " rows · " + A.layers[l].groups + ' groups</span></h3><div class="pg-groups ' + l + '">' +
        G.map(function (g) { return g.l === l ? '<button data-g="' + esc(g.id) + '" aria-pressed="false"><b>' + g.n + "</b>" + esc(g.g) + "</button>" : ""; }).join("") + "</div></details>"; }).join("") +
      '<form class="inp-filters" onsubmit="return false"><input type="search" name="q" placeholder="Name, unit, citation or source…" aria-label="Search" value="' + esc(want) + '">' +
      '<select name="l" aria-label="Layer"><option value="">All layers</option><option value="engine">ENGINE</option><option value="cell">CELL</option><option value="instrument">INSTRUMENT</option></select>' +
      '<select name="t" aria-label="Tag"><option value="">All tags</option>' + opts("t", uniq(function (p) { return p.t; })) + "</select>" +
      '<select name="st" aria-label="Wiring state"><option value="">Any state</option><option>executed</option><option>read</option><option>unread</option></select>' +
      '<button type="reset">Clear</button></form><p class="small muted pg-count" role="status"></p><div class="pg-readers small"></div>' +
      '<div class="tablewrap inp-tw"><table class="rows" id="inp-table"><thead><tr><th>Parameter (open for source)</th><th>Layer · group</th><th>Value</th><th>Unit</th><th>Range</th><th>Tag</th><th>Source class · citation</th><th>State</th></tr></thead><tbody></tbody></table></div>';
    var f = root.querySelector("form"), tb = root.querySelector("tbody");
    function row(p) {
      return "<tr><td><details><summary><code>" + esc(p.n) + "</code></summary><p>" + (esc(p.s) || "No source statement.") + "</p><p class=\"muted\">" + esc(p.k) + "</p></details></td><td>" + p.l.toUpperCase() + " · " + esc(p.g.split(":")[1]) +
        '</td><td class="v">' + esc(p.v) + "</td><td>" + esc(p.u) + '</td><td class="v">' + (p.rg ? esc(p.rg.join("–")) : "") + '</td><td><span class="tag ' + esc(p.t) + '">' + esc(p.t.toLowerCase()) + "</span></td><td>" +
        esc(p.sc.replace(/_/g, " ").toLowerCase()) + (p.c ? ' <span class="inp-cite">' + esc(p.c) + "</span>" : "") + '</td><td><span class="spill ' + (p.st === "executed" ? "good" : p.st === "unread" ? "bad" : "") + '">' + STATE[p.st] + "</span></td></tr>";
    }
    function go() {
      cur.q = f.q.value.trim().toLowerCase(); cur.l = f.l.value; cur.t = f.t.value; cur.st = f.st.value;
      var m = P.filter(function (p) { return (!cur.g || p.g === cur.g) && (!cur.l || p.l === cur.l) && (!cur.t || p.t === cur.t) && (!cur.st || p.st === cur.st) &&
        (!cur.q || (p.n + " " + p.u + " " + p.c + " " + p.s).toLowerCase().indexOf(cur.q) >= 0); });
      tb.innerHTML = m.slice(0, SHOW).map(row).join("");
      root.querySelector(".pg-count").textContent = (m.length > SHOW ? "Showing " + SHOW + " of " + m.length.toLocaleString() : m.length.toLocaleString()) + " matching rows" + (cur.g ? " in " + cur.g.split(":")[0].toUpperCase() + " · " + cur.g.split(":")[1] : "") + ".";
      var g = G.filter(function (x) { return x.id === cur.g; })[0];
      root.querySelector(".pg-readers").innerHTML = g ? "Read by " + (g.p.length ? g.p.map(function (k) { return '<span class="spill ' + (parts[k].s === "engine" ? "dev" : "approx") + '">' + esc(parts[k].t) + "</span>"; }).join(" ") : '<span class="spill">no part lists this group</span>') : "";
      root.querySelectorAll(".pg-groups button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.g === cur.g)); });
    }
    root.querySelectorAll(".pg-groups button").forEach(function (b) { b.onclick = function () { cur.g = cur.g === b.dataset.g ? "" : b.dataset.g; go(); }; });
    f.addEventListener("input", go); f.addEventListener("reset", function () { cur.g = ""; setTimeout(go); });
    go();
  }).catch(function (e) { root.innerHTML = '<p class="warn-line">The parameters could not load (' + esc(e.message) + ").</p>"; });
})();
