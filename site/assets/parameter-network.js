import {$,esc,el,button,count} from './explorer-ui.js?v=3e6f66bbc6';
import {inputName} from './parameter-guide.js?v=5ebbc9f391';

// This is the original atlas's metadata graph and breadth-first traversal.
// Layout, distance and colour do not encode a biological correlation.
export const edgeTypes = {
  bound_to:['Alias / binding','#687aab'],
  selected_input_to_code_card:['Used in a calculation','#248b8d'],
  selected_input_to_quantity_transform:['Quantity conversion','#4388b7'],
  selected_input_to_example_relation:['Interpretation relationship','#478d6b'],
  parameter_in_shared_fit:['Same published fit','#bc637c'],
  parameter_in_source_comparison:['Source / model comparison','#9472b8'],
  research_review_describes_parameter:['Detailed review of an input','#518d81'],
  research_review_uses_source_card:['Review uses a source','#899855'],
  source_comparison_uses_source_card:['Comparison uses a source','#b08078'],
  review_describes_parameter:['Review of an input','#a87b3e'],
  review_cites_reference:['Review cites a publication','#b38c66'],
  example_review_cites_primary_card:['Primary-source review','#9b8049'],
  reference_has_registry_identity:['Registered source identity','#8c7d99'],
  example_reference_lists_registry_record:['Reference / registry match','#827e9d'],
  record_has_bibliographic_doi:['Shared DOI identity','#8f928c'],
  declaration_mentions_reference:['Citation in source text','#9299a0']
};
const columns = [
  {title:'Parameters',width:1200,color:'#369c95',kinds:['parameter']},
  {title:'Reviews',width:660,color:'#c39a53',kinds:['advisory_review','example_review','research_parameter_review']},
  {title:'Calculations & comparisons',width:620,color:'#a08bd0',kinds:['code_card','example_relation','research_static_transform','research_source_comparison','shared_fit']},
  {title:'Sources & publications',width:720,color:'#689cc9',kinds:['research_source_card','example_primary_review','review_reference','example_reference','registry_source','literal_reference_token','bibliographic_doi_key']}
];
export function graphSubset(G,{view='all',root='',hops=1,filter=''}={}) {
  const pool=filter?G.edges.filter(e=>e.kind===filter):G.edges;
  if(view==='all'){
    const ends=new Set(pool.flatMap(e=>[e.source,e.target]));
    return {nodes:filter?G.nodes.filter(n=>n.kind==='parameter'||ends.has(n.id)):G.nodes,edges:pool,dist:null};
  }
  const dist=new Map([[root,0]]);let frontier=new Set([root]);
  for(let d=1;d<=hops;d++){
    const next=new Set();for(const e of pool){if(frontier.has(e.source)&&!dist.has(e.target))next.add(e.target);if(frontier.has(e.target)&&!dist.has(e.source))next.add(e.source);}
    for(const id of next)dist.set(id,d);frontier=next;
  }
  return {nodes:G.nodes.filter(n=>dist.has(n.id)),edges:pool.filter(e=>dist.has(e.source)&&dist.has(e.target)),dist};
}
const shorten=(s,n)=>s.length>n?s.slice(0,n-1)+'…':s;
const save=(name,type,body)=>{const url=URL.createObjectURL(new Blob([body],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};

export function mountNetwork(host,{G,kinds,onSelect,onState,initial={}}){
  const N=new Map(G.nodes.map(n=>[n.id,n])),allIds=new Set(N.keys());
  let view=initial.view==='all'?'all':'local',filter=edgeTypes[initial.filter]?initial.filter:'',hops=[1,2,3].includes(+initial.hops)?+initial.hops:1;
  let rootId=allIds.has(initial.root)?initial.root:'parameter:cortex.thickness',selected=allIds.has(initial.focus)?initial.focus:null;
  let current,visible,routePage=0,activeEdge=null,flowPaused=matchMedia('(prefers-reduced-motion: reduce)').matches,coords=new Map(),bounds,box,svg,disposed=false,resizeObserver,themeObserver;
  host.className='net-app';
  host.innerHTML=`<div class="net-controls"><div class="net-search"><label class="sr-only" for="network-search">Find any parameter, source or record</label><input id="network-search" type="search" placeholder="Find a parameter, source or record…" autocomplete="off" aria-controls="net-search-results"><div id="net-search-results" class="net-search-results" hidden></div></div><div class="net-view" role="group" aria-label="Graph scope"><button data-view="all">Full map</button><button data-view="local">Neighborhood</button></div><label class="net-filter"><span>Connections</span><select id="net-edge"><option value="">All types</option>${Object.entries(edgeTypes).map(([key,[name]])=>`<option value="${key}">${esc(name)}</option>`).join('')}</select></label><label class="net-depth"><span>Steps away</span><select id="net-hops"><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></label></div>
  <div class="net-scope-pager"></div><div class="net-workbench"><div class="net-canvas-wrap"><div class="net-map" id="net-map" tabindex="0" role="group" aria-label="Interactive evidence graph. Use plus and minus to zoom, arrow keys to pan, and zero to fit."></div><div class="net-map-tools"><button id="net-out" aria-label="Zoom out">−</button><span id="net-zoom">100%</span><button id="net-in" aria-label="Zoom in">+</button><button id="net-fit">Fit map</button><button id="net-expand">Expand map</button><span class="net-tool-gap"></span><button id="net-svg">Save SVG</button><button id="net-json">Save JSON</button></div><div class="net-hover" hidden></div></div><aside class="net-inspector" hidden aria-label="Selected record"><div class="net-inspector-tools"><button id="net-neighbors">Explore these connections</button><button id="net-close" aria-label="Close record details">×</button></div><div id="parameter-detail" class="ex-content" aria-live="polite"></div></aside></div>
  <div class="net-footer"><p id="net-status" aria-live="polite"></p><span>Wheel to zoom · drag to move · select a node</span></div><div class="net-key">${columns.map(c=>`<span><i style="background:${c.color}"></i>${c.title}</span>`).join('')}<small>Recorded links, not measured correlations. Position and distance only organise the map.</small></div>
  <section class="net-route-list" aria-label="Separate relationship paths"></section>
  <details class="ex-disclosure net-edge-table"><summary>Read every connection in this scope as a table</summary><div class="ex-table-scroll"><table><thead><tr><th>From</th><th>Connection</th><th>To</th></tr></thead><tbody></tbody></table></div></details>`;
  const q=s=>$(s,host),search=q('#network-search'),results=q('#net-search-results'),map=q('#net-map'),inspector=q('.net-inspector');
  q('#net-edge').value=filter;q('#net-hops').value=hops;
  const color=n=>columns.find(c=>c.kinds.includes(n.kind))?.color||'#7d9293';
  function state(){return {view,filter,hops,root:rootId,focus:selected};}
  function changed(){onState?.(state());}
  function apply(){if(!svg||!box)return;svg.setAttribute('viewBox',`${box.x} ${box.y} ${box.w} ${box.h}`);q('#net-zoom').textContent=Math.round(100*bounds.w/box.w)+'%';
    // Group labels remain legible at fit scale; individual labels appear on zoom.
    const scale=svg.getScreenCTM()?.a||1;
    svg.style.setProperty('--net-group-size',Math.max(14,11/scale)+'px');
    svg.style.setProperty('--net-heading-size',Math.max(23,12/scale)+'px');
    svg.querySelectorAll('[data-full-title]').forEach(t=>{const limit=Math.max(5,Math.floor(+t.dataset.width/(Math.max(14,11/scale)*.54)));t.textContent=shorten(t.dataset.fullTitle,limit);});
  }
  function fit(){box={...bounds};apply();}
  function readableView(){fit();}
  function zoom(factor,point){const p=point||{x:box.x+box.w/2,y:box.y+box.h/2},w=Math.max(bounds.w/30,Math.min(bounds.w*1.6,box.w*factor)),r=w/box.w;box={x:p.x-(p.x-box.x)*r,y:p.y-(p.y-box.y)*r,w,h:box.h*r};apply();}
  function point(e){const p=svg.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(svg.getScreenCTM().inverse());}
  function status(){q('#net-status').textContent=`${visible.nodes.length<current.nodes.length?count(visible.nodes.length)+' of ':''}${count(current.nodes.length)} records · ${visible.edges.length<current.edges.length?count(visible.edges.length)+' of ':''}${count(current.edges.length)} connections${view==='local'?` · within ${hops} ${hops===1?'step':'steps'} of ${N.get(rootId)?.label}`:' · full map'}${filter?' · filtered':''}`;}
  function highlight(){
    if(!svg)return;const linked=new Set(selected?[selected]:[]);
    svg.querySelectorAll('.net-edge').forEach(e=>{const yes=!!selected&&(e.dataset.source===selected||e.dataset.target===selected);e.classList.toggle('is-related',yes);if(yes){linked.add(e.dataset.source);linked.add(e.dataset.target);}});
    svg.querySelectorAll('[data-node]').forEach(n=>{n.classList.toggle('is-selected',n.dataset.node===selected);n.classList.toggle('is-related',linked.has(n.dataset.node));});svg.classList.toggle('has-selection',!!selected);
  }
  function select(id,{focus=false,notify=true}={}){
    if(!N.has(id))return;
    if(!coords.has(id)){rootId=id;view='local';routePage=0;filter='';q('#net-edge').value='';draw();}
    selected=id;inspector.hidden=false;host.classList.add('has-inspector');highlight();if(view==='all'||hops>1)renderRoutes();onSelect(id);
    q('#parameter-detail').scrollTop=0;
    if(focus){const p=coords.get(id),w=Math.min(bounds.w,720),ratio=map.clientHeight/Math.max(1,map.clientWidth);box={x:p.x-w/2,y:p.y-w*ratio/2,w,h:w*ratio};apply();}
    else apply();
    if(notify)changed();
  }
  function close(){selected=null;inspector.hidden=true;host.classList.remove('has-inspector');highlight();apply();changed();}
  function showLocal(){rootId=selected||rootId;view='local';routePage=0;draw();select(rootId,{notify:false});readableView();changed();}
  function nodeMarkup(n,p,large){const title=`${kinds[n.kind]||n.kind} · ${n.label}`;
    if(!large)return `<circle class="net-dot" data-node="${esc(n.id)}" cx="${p.x}" cy="${p.y}" r="5" fill="${color(n)}" role="button" aria-label="${esc(title)}"><title>${esc(title)}</title></circle>`;
    const label=n.kind==='parameter'?inputName(n.label):n.label;
    return `<g class="net-node" data-node="${esc(n.id)}" role="button" tabindex="0" aria-label="${esc(title)}"><rect x="${p.x}" y="${p.y}" width="248" height="66" rx="5" style="--node-color:${color(n)}"/><text class="net-node-kind" x="${p.x+12}" y="${p.y+19}">${esc(kinds[n.kind]||n.kind)}</text><text class="net-node-name" x="${p.x+12}" y="${p.y+39}">${esc(shorten(label,27))}</text><text class="net-node-code" x="${p.x+12}" y="${p.y+55}">${esc(shorten(n.kind==='parameter'&&label!==n.label?n.label:'',36))}</text><title>${esc(title)}</title></g>`;
  }
  function overview(){
    let clusters='',nodes='',heads='',height=300,x=20;coords=new Map();
    for(const col of columns){const members=visible.nodes.filter(n=>col.kinds.includes(n.kind)),groups=new Map();
      for(const n of members){const key=n.kind==='parameter'?n.label.split('.')[0]:n.kind;if(!groups.has(key))groups.set(key,[]);groups.get(key).push(n);}
      const title=col.title.replace('Calculations & comparisons','Calculations').replace('Sources & publications','Publications & sources');
      heads+=`<text class="net-column-title" x="${x}" y="30">${title} · ${members.length}</text>`;
      const lanes=col.kinds[0]==='parameter'?3:1,ys=Array(lanes).fill(64),gap=14,w=(col.width-gap*(lanes-1))/lanes;
      for(const [key,items] of [...groups].sort(([a],[b])=>a.localeCompare(b))){items.sort((a,b)=>a.label.localeCompare(b.label)||a.id.localeCompare(b.id));const lane=ys.indexOf(Math.min(...ys)),gx=x+lane*(w+gap),y=ys[lane],across=Math.max(1,Math.floor((w-30)/16)),h=48+Math.ceil(items.length/across)*16;
        clusters+=`<rect class="net-cluster" x="${gx}" y="${y}" width="${w}" height="${h}" rx="5"/><text class="net-group-title" data-full-title="${esc((kinds[key]||key)+' · '+items.length)}" data-width="${w-20}" x="${gx+10}" y="${y+26}">${esc(kinds[key]||key)} · ${items.length}</text>`;
        items.forEach((n,i)=>{const p={x:gx+16+(i%across)*16,y:y+46+Math.floor(i/across)*16};coords.set(n.id,p);nodes+=nodeMarkup(n,p,false);});ys[lane]+=h+14;
      }height=Math.max(height,...ys);x+=col.width+36;
    }bounds={x:0,y:0,w:x,h:height+20};return {clusters,nodes,heads,large:false};
  }
  function neighborhood(){
    let nodes='',heads='';coords=new Map();let x=28,height=300;
    if(innerWidth<700&&hops===1){
      const list=[...visible.nodes].sort((a,b)=>a.id===rootId?-1:b.id===rootId?1:a.kind.localeCompare(b.kind)||a.label.localeCompare(b.label));
      list.forEach((n,i)=>{const p={x:64,y:30+i*84};coords.set(n.id,p);nodes+=nodeMarkup(n,p,true);});
      bounds={x:0,y:0,w:336,h:Math.max(220,30+list.length*84)};
      return {clusters:'',nodes,heads,large:true,vertical:true};
    }
    const max=Math.max(0,...visible.dist.values());
    for(let distance=0;distance<=max;distance++){
      const lane=visible.nodes.filter(n=>visible.dist.get(n.id)===distance).sort((a,b)=>a.kind.localeCompare(b.kind)||a.label.localeCompare(b.label));
      const rows=Math.min(6,Math.max(1,lane.length)),cols=Math.ceil(lane.length/rows),laneH=rows*92+64;
      heads+=`<text class="net-column-title" x="${x}" y="28">${distance===0?'Selected record':distance+' step'+(distance===1?'':'s')+' away'}</text>`;
      lane.forEach((n,i)=>{const p={x:x+Math.floor(i/rows)*290,y:52+(i%rows)*92+(distance===0&&hops===1?Math.max(0,(visible.nodes.length-2)*46):0)};coords.set(n.id,p);nodes+=nodeMarkup(n,p,true);});
      height=Math.max(height,laneH);x+=Math.max(1,cols)*290+80;
    }bounds={x:0,y:0,w:x-40,h:height};return {clusters:'',nodes,heads,large:true};
  }
  function draw(keepBox=false){
    current=graphSubset(G,{view,root:rootId,hops,filter});const old=box;
    visible=current;
    if(view==='local'&&hops===1&&current.nodes.length>5){
      const neighbors=current.nodes.filter(n=>n.id!==rootId).sort((a,b)=>a.kind.localeCompare(b.kind)||a.label.localeCompare(b.label));
      routePage=Math.min(routePage,Math.max(0,Math.ceil(neighbors.length/4)-1));
      const ids=new Set([rootId,...neighbors.slice(routePage*4,(routePage+1)*4).map(n=>n.id)]);
      visible={...current,nodes:current.nodes.filter(n=>ids.has(n.id)),edges:current.edges.filter(e=>ids.has(e.source)&&ids.has(e.target))};
    }
    activeEdge=null;
    const layout=view==='local'&&visible.nodes.length<=90?neighborhood():overview();
    let edges='';for(const [index,e] of visible.edges.entries()){const a=coords.get(e.source),b=coords.get(e.target);if(!a||!b)throw Error('A displayed relationship is missing an endpoint.');
      let ax=a.x,ay=a.y,bx=b.x,by=b.y;
      if(layout.large){const forward=bx>ax;if(!layout.vertical){ax+=forward?248:0;bx+=forward?0:248;}ay+=33;by+=33;}
      const middle=ax===bx?ax+40:(ax+bx)/2;
      const port=14+index*10;
      const d=layout.vertical?`M${ax},${ay+(e.source===rootId?index*6-9:0)}H${port}V${by+(e.target===rootId?index*6-9:0)}H${bx}`:`M${ax},${ay} C${middle},${ay} ${middle},${by} ${bx},${by}`;
      edges+=`<path class="net-edge" data-source="${esc(e.source)}" data-target="${esc(e.target)}" stroke="${edgeTypes[e.kind]?.[1]||'#888'}" d="${d}"${layout.large?' marker-end="url(#net-arrow)"':''}><title>${esc(edgeTypes[e.kind]?.[0]||e.kind)}</title></path>`;
    }
    map.innerHTML=`<svg class="net-svg ${layout.large?'is-local':''}" xmlns="http://www.w3.org/2000/svg" role="group" aria-label="${visible.nodes.length} records and ${visible.edges.length} recorded connections"><defs><marker id="net-arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10Z" fill="context-stroke"/></marker></defs>${layout.clusters}<g class="net-edges">${edges}</g>${layout.heads}<g class="net-nodes">${layout.nodes}</g></svg>`;
    svg=q('svg');svg.querySelector('.net-edge')?.classList.add('is-route');renderRoutes();box=keepBox&&old?old:{...bounds};apply();if(view==='local'&&!keepBox)readableView();highlight();status();
    q('#net-hops').disabled=view==='all';host.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.view===view));
    q('.net-edge-table').open=false;q('.net-edge-table tbody').replaceChildren();
    let drag=null,moved=false;svg.addEventListener('wheel',e=>{e.preventDefault();zoom(Math.exp(Math.max(-.8,Math.min(.8,e.deltaY*.002))),point(e));},{passive:false});
    svg.onpointerdown=e=>{if(e.button!==0)return;drag={x:e.clientX,y:e.clientY,box:{...box},scale:1/svg.getScreenCTM().a};moved=false;svg.setPointerCapture(e.pointerId);};
    svg.onpointermove=e=>{const hover=q('.net-hover');if(drag){const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)>4)moved=true;if(moved){map.classList.add('dragging');box={...drag.box,x:drag.box.x-dx*drag.scale,y:drag.box.y-dy*drag.scale};apply();hover.hidden=true;}return;}
      const hit=e.target.closest('[data-node]');if(hit){const n=N.get(hit.dataset.node);hover.textContent=`${kinds[n.kind]||n.kind} · ${n.label}`;hover.hidden=false;}else hover.hidden=true;};
    svg.onpointerleave=()=>{q('.net-hover').hidden=true;};
    svg.onpointerup=e=>{if(!drag)return;const didMove=moved;drag=null;map.classList.remove('dragging');if(svg.hasPointerCapture(e.pointerId))svg.releasePointerCapture(e.pointerId);if(!didMove){const hit=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-node]');if(hit)select(hit.dataset.node);}};
    svg.onpointercancel=()=>{drag=null;map.classList.remove('dragging');};
    svg.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&e.target.dataset.node){e.preventDefault();select(e.target.dataset.node);}};
  }
  function renderRoutes(){
    const panel=q('.net-route-list');panel.replaceChildren();q('.net-scope-pager').replaceChildren();panel.classList.toggle('is-paused',flowPaused);host.classList.toggle('flow-paused',flowPaused);
    panel.append(el('h3','','Read each connection separately'),el('p','','A moving mark traces a recorded relationship. It does not represent electricity, information transfer or a measured causal effect.'));
    const actions=el('div','pw-controls');
    const play=button(flowPaused?'Play connection flow':'Pause connection flow',()=>{flowPaused=!flowPaused;panel.classList.toggle('is-paused',flowPaused);host.classList.toggle('flow-paused',flowPaused);play.textContent=flowPaused?'Play connection flow':'Pause connection flow';play.setAttribute('aria-pressed',String(!flowPaused));});
    play.setAttribute('aria-pressed',String(!flowPaused));actions.append(el('span','','Select “Trace” to isolate a line in the map.'),play);panel.append(actions);
    const edges=view==='local'&&hops===1?visible.edges:current.edges.filter(e=>e.source===(selected||rootId)||e.target===(selected||rootId));
    const pageEdges=view==='local'&&hops===1?edges:edges.slice(0,12);
    for(const e of pageEdges){const row=el('div','net-route-row');
      const recordButton=id=>{const n=N.get(id);return button(`<small>${esc(kinds[n.kind]||n.kind)}</small>${esc(n.kind==='parameter'?inputName(n.label):n.label)}`,()=>select(id),'net-route-record');};
      const trace=button('Trace',()=>{activeEdge=e;svg.classList.add('has-route');svg.querySelectorAll('.net-edge').forEach(p=>p.classList.toggle('is-route',p.dataset.source===e.source&&p.dataset.target===e.target));panel.querySelectorAll('.net-route-row').forEach(p=>p.classList.toggle('is-active',p===row));const a=coords.get(e.source),b=coords.get(e.target);if(a&&b){const margin=45;box={x:Math.min(a.x,b.x)-margin,y:Math.min(a.y,b.y)-margin,w:Math.abs(a.x-b.x)+(view==='local'?248:20)+2*margin,h:Math.abs(a.y-b.y)+(view==='local'?66:20)+2*margin};apply();map.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}});
      row.append(recordButton(e.source),el('span','net-route-kind',esc(edgeTypes[e.kind]?.[0]||e.kind)),recordButton(e.target),trace);panel.append(row);
    }
    if(!pageEdges.length)panel.append(el('p','','No relationships of this type are recorded for the selected input. Choose another connection type or search for another record.'));
    if(view==='local'&&hops===1&&current.nodes.length>5){const total=Math.ceil((current.nodes.length-1)/4),pager=el('div','ex-pager');const prev=button('← Previous connections',()=>{routePage--;draw();}),next=button('Next connections →',()=>{routePage++;draw();});prev.disabled=routePage===0;next.disabled=routePage>=total-1;pager.append(prev,el('span','',`${routePage+1} / ${total}`),next);panel.append(pager);const top=q('.net-scope-pager');top.replaceChildren();const back=button('← Previous',()=>{routePage--;draw();}),forward=button('Next →',()=>{routePage++;draw();});back.disabled=routePage===0;forward.disabled=routePage>=total-1;top.append(el('span','',`Connections ${routePage*4+1}–${Math.min((routePage+1)*4,current.nodes.length-1)} of ${current.nodes.length-1} · one page at a time`),back,forward);}
    else if(edges.length>12)panel.append(el('p','',`Showing the first 12 of ${edges.length} connections for this record. Use Neighborhood with one step for paged paths, or open the complete connection table below.`));
  }
  function searchRecords(){const term=search.value.trim().toLowerCase();results.replaceChildren();results.hidden=!term;if(!term)return;
    const hits=G.nodes.filter(n=>(n.label+' '+(n.kind==='parameter'?inputName(n.label):'')+' '+(kinds[n.kind]||'')).toLowerCase().includes(term));
    results.append(el('p','net-search-count',`${count(hits.length)} matches${hits.length>40?' · first 40 shown; narrow your search':''}`));
    for(const n of hits.slice(0,40))results.append(button(`<strong>${esc(n.kind==='parameter'?inputName(n.label):n.label)}</strong><small>${esc(kinds[n.kind])}${n.kind==='parameter'?' · '+esc(n.label):''}</small>`,()=>{search.value=n.label;results.hidden=true;rootId=n.id;view='local';hops=1;routePage=0;q('#net-hops').value=1;draw();select(n.id);},'net-search-item'));
  }
  search.oninput=searchRecords;search.onkeydown=e=>{if(e.key==='Escape'){results.hidden=true;}if(e.key==='ArrowDown'){e.preventDefault();results.querySelector('button')?.focus();}if(e.key==='Enter'){e.preventDefault();results.querySelector('button')?.click();}};
  results.onkeydown=e=>{const buttons=[...results.querySelectorAll('button')],i=buttons.indexOf(document.activeElement);if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();buttons[Math.max(0,Math.min(buttons.length-1,i+(e.key==='ArrowDown'?1:-1)))]?.focus();}if(e.key==='Escape'){results.hidden=true;search.focus();}};
  host.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{if(b.dataset.view==='local')showLocal();else{view='all';routePage=0;draw();if(selected)select(selected,{notify:false});changed();}});
  q('#net-edge').onchange=e=>{filter=e.target.value;routePage=0;draw();changed();};q('#net-hops').onchange=e=>{hops=+e.target.value;routePage=0;draw();changed();};
  q('#net-close').onclick=close;q('#net-neighbors').onclick=showLocal;q('#net-in').onclick=()=>zoom(.75);q('#net-out').onclick=()=>zoom(1/.75);q('#net-fit').onclick=fit;
  q('#net-expand').onclick=()=>{host.classList.toggle('is-expanded');q('#net-expand').textContent=host.classList.contains('is-expanded')?'Exit expanded view':'Expand map';apply();};
  map.onkeydown=e=>{if(e.target!==map)return;if(['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();if(e.key==='+'||e.key==='=')zoom(.75);else if(e.key==='-')zoom(1/.75);else if(e.key==='0')fit();else{box.x+=(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0)*box.w*.1;box.y+=(e.key==='ArrowDown'?1:e.key==='ArrowUp'?-1:0)*box.h*.1;apply();}}};
  function escape(e){if(e.key==='Escape'&&host.classList.contains('is-expanded')){host.classList.remove('is-expanded');q('#net-expand').textContent='Expand map';apply();}}
  document.addEventListener('keydown',escape);
  q('#net-json').title='Save all records and connections in this scope, including other pages';
  q('#net-json').onclick=()=>save('parameter-evidence-'+view+'.json','application/json',JSON.stringify({schema:'aleph.parameter-evidence-browser/1',graph_provenance:G.provenance,scope:view,root:view==='local'?rootId:null,hops:view==='local'?hops:null,relation_filter:filter||null,traversal:'undirected_metadata_context_only',nodes:current.nodes,edges:current.edges,truncated:false,empirical_covariance:null,supervision_mask:false},null,2));
  q('#net-svg').onclick=()=>{const copy=svg.cloneNode(true),style=document.createElementNS('http://www.w3.org/2000/svg','style');copy.setAttribute('viewBox',`0 0 ${bounds.w} ${bounds.h}`);copy.setAttribute('width',bounds.w);copy.setAttribute('height',bounds.h);copy.classList.remove('has-selection');copy.querySelectorAll('[data-full-title]').forEach(t=>t.textContent=t.dataset.fullTitle);copy.querySelectorAll('.is-related,.is-selected').forEach(e=>e.classList.remove('is-related','is-selected'));
    style.textContent='.net-cluster{fill:#f4f6f8;stroke:#dce0e3}.net-group-title{font:14px sans-serif;fill:#41515b}.net-column-title{font:bold 20px sans-serif;fill:#17232a}.net-dot{stroke:white;stroke-width:1}.net-edge{fill:none;stroke-width:1;opacity:.25}.is-local .net-edge{opacity:.7;stroke-width:1.5}.net-node rect{fill:white;stroke:#9aaab4}.net-node-kind,.net-node-code{font:10px sans-serif;fill:#65717a}.net-node-name{font:15px sans-serif;fill:#17232a}';copy.prepend(style);save('parameter-evidence-'+view+'.svg','image/svg+xml',new XMLSerializer().serializeToString(copy));};
  q('.net-edge-table').addEventListener('toggle',()=>{const table=q('.net-edge-table tbody');if(!q('.net-edge-table').open||table.childElementCount)return;for(const e of current.edges){const row=el('tr','');for(const id of [e.source,null,e.target]){const cell=el('td','');if(id)cell.append(button(esc(N.get(id).label),()=>select(id,{focus:true}),'ex-text-button'));else cell.textContent=edgeTypes[e.kind]?.[0]||e.kind;row.append(cell);}table.append(row);}});
  draw();if(selected){select(selected,{notify:false});if(view==='local')readableView();}resizeObserver=new ResizeObserver(()=>{if(!disposed)apply();});resizeObserver.observe(map);
  themeObserver=new MutationObserver(()=>{if(!disposed)apply();});themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  return {select,showLocal,state,destroy(){disposed=true;resizeObserver.disconnect();themeObserver.disconnect();document.removeEventListener('keydown',escape);}};
}
