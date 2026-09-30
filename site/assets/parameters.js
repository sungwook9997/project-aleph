import {$,esc,el,button,data,fail,tabs,setURL,record,disclosure,lazyDisclosure,reveal,empty,count,valueText,words} from './explorer-ui.js';
import {topics,inputName,displayUnit} from './parameter-guide.js';

const root=$('#parameter-app'),base='../../media/explorers/parameters/';
const kinds={parameter:'Parameters',research_parameter_review:'Research reviews',example_review:'Example reviews',research_source_card:'Source records',bibliographic_doi_key:'Publications',research_source_comparison:'Source comparisons',literal_reference_token:'Reference mentions',registry_source:'Source registry',advisory_review:'Advisory reviews',example_reference:'Example references',review_reference:'Review references',example_primary_review:'Primary reviews',research_static_transform:'Quantity conversions',example_relation:'Example relationships',code_card:'Construction records',shared_fit:'Shared fits'};
const edgeNames={bound_to:'Alias of',research_review_describes_parameter:'Review of',review_describes_parameter:'Review of',parameter_in_source_comparison:'Compared in',research_review_uses_source_card:'Uses source',record_has_bibliographic_doi:'Publication',source_comparison_uses_source_card:'Uses source',review_cites_reference:'Cites',declaration_mentions_reference:'Mentions',selected_input_to_code_card:'Used in construction',selected_input_to_example_relation:'Related in review',selected_input_to_quantity_transform:'Converted in',reference_has_registry_identity:'Registered as',example_reference_lists_registry_record:'Registered as',example_review_cites_primary_card:'Primary source',parameter_in_shared_fit:'Shares fit'};
let A,G,figures,N,P,adjacent,knownFiles,mode='relationships',query='',group='',tag='',page=0,selected='',whole=false,recordKind='';
const pageSize=32;
const tagLabel=t=>({EXAMPLE:'Example',SOURCED:'Sourced',SWEPT:'Swept'}[t]||t);
const parameterMode=()=>mode==='parameters';
let topicId='cortex_shell_population';
const href=id=>'?'+new URLSearchParams(id.startsWith('parameter:')?{parameter:id.slice(10)}:{record:id});
function nodeLink(id,label){const a=el('a','ex-related-link',esc(label||N.get(id)?.label||id));a.href=href(id);a.onclick=e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();select(id);};return a;}
function heading(text){return el('h3','ex-section-title',esc(text));}
function switchMode(next){mode=next;query='';page=0;if(mode==='parameters'){group='';tag='';}setURL(mode==='relationships'?{mode,topic:topicId}:{mode});render();}
function shell(){
  root.innerHTML='<div class="ex-toolbar"><div class="ex-tabs" id="parameter-tabs" aria-label="Ways to explore parameters"></div><label class="ex-search"><span class="sr-only">Search parameters and evidence</span><input id="parameter-search" type="search" placeholder="Find a parameter or topic…"></label></div><div id="parameter-workspace"></div>';
  tabs($('#parameter-tabs'),[['relationships','Relationships'],['parameters','All parameters'],['research','Sources & figures'],['records','Evidence index']],mode==='graph'?'records':mode,switchMode);
  $('#parameter-search').value=query;$('#parameter-search').oninput=e=>{query=e.target.value;page=0;if(parameterMode()&&query.trim()){group='';tag='';$('#parameter-group').value='';$('#parameter-tag').value='';}if(mode==='research')renderResearch();else if(mode==='relationships')renderGuide();else renderList();};
}
function render(){shell();if(mode==='relationships'){renderGuide();return;}if(mode==='research'){renderResearch();return;}
  const work=$('#parameter-workspace');work.className='ex-workspace ex-parameter-workspace';
  work.innerHTML='<aside class="ex-sidebar ex-catalog" aria-label="Parameter and record list"><div class="ex-filters" id="parameter-filters"></div><p id="parameter-count" class="ex-result-count" aria-live="polite"></p><div id="parameter-list"></div><div id="parameter-pager" class="ex-pager"></div></aside><section class="ex-content" id="parameter-detail" aria-live="polite"></section>';
  const filters=$('#parameter-filters');
  if(parameterMode()){
    filters.innerHTML=`<label><span>Group</span><select id="parameter-group"><option value="">All ${A.groups.length} groups</option>${A.groups.map(g=>`<option value="${esc(g.group)}">${esc(g.group)} (${g.rows})</option>`).join('')}</select></label><label><span>Declaration tag</span><select id="parameter-tag"><option value="">All tags</option>${['EXAMPLE','SOURCED','SWEPT'].map(t=>`<option>${t}</option>`).join('')}</select></label>`;
    $('#parameter-group').value=group;$('#parameter-tag').value=tag;
    $('#parameter-group').onchange=e=>{group=e.target.value;page=0;renderList();};$('#parameter-tag').onchange=e=>{tag=e.target.value;page=0;renderList();};
  }else{
    filters.innerHTML=`<label><span>Record type</span><select id="record-kind"><option value="">All ${count(G.nodes.length)} records</option>${Object.entries(kinds).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label>`;
    $('#record-kind').value=recordKind;$('#record-kind').onchange=e=>{recordKind=e.target.value;page=0;renderList();};
    filters.append(button('View all evidence connections →',()=>switchMode('graph'),'ex-text-button'));
  }
  renderList();if(mode==='graph')renderWholeGraph();else renderDetail();
}
function results(){const q=query.toLowerCase().trim();return (parameterMode()?A.parameters:G.nodes).filter(n=>{
  if(parameterMode()&&(group&&n.group!==group||tag&&n.declaration.tag!==tag))return false;
  if(!parameterMode()&&recordKind&&n.kind!==recordKind)return false;
  return !q||(JSON.stringify(n)+' '+inputName(n.name||n.label)).toLowerCase().includes(q);
});}
function renderList(){
  const matches=results(),list=$('#parameter-list');list.replaceChildren();$('#parameter-count').textContent=`${count(matches.length)} ${parameterMode()?'parameters':'records'}`;
  for(const n of matches.slice(page*pageSize,(page+1)*pageSize)){
    const a=nodeLink(n.id);a.className='ex-catalog-item';a.setAttribute('aria-current',selected===n.id?'true':'false');
    a.innerHTML=`<strong>${esc(n.name?inputName(n.name):n.label)}</strong>${n.name&&inputName(n.name)!==n.name?`<small class="ex-input-code">${esc(n.name)}</small>`:''}<span>${n.declaration?`${esc(valueText(n.declaration.value??n.declaration.bound))} ${esc(displayUnit(n.declaration.unit))} <i class="ex-tag ${esc(n.declaration.tag.toLowerCase())}">${tagLabel(n.declaration.tag)}</i>`:esc(kinds[n.kind]||words(n.kind))}</span>`;list.append(a);
  }
  if(!matches.length)list.append(empty('No matches. Clear a filter or try another name.'));
  const pager=$('#parameter-pager');pager.replaceChildren();const prev=button('←',()=>{page--;renderList();});prev.setAttribute('aria-label','Previous results');prev.disabled=page===0;const next=button('→',()=>{page++;renderList();});next.setAttribute('aria-label','Next results');next.disabled=(page+1)*pageSize>=matches.length;pager.append(prev,el('span','',`${matches.length?page*pageSize+1:0}–${Math.min((page+1)*pageSize,matches.length)}`),next);
}
function select(id,push=true){
  if(!N.has(id))return;
  const previous=mode;selected=id;whole=false;
  if(mode==='relationships'){mode=P.has(id)?'parameters':'records';if(P.has(id))group=P.get(id).group;}
  if(mode==='research'||mode==='graph')mode=P.has(id)?'parameters':'records';
  if(push)setURL(P.has(id)?{mode,parameter:id.slice(10)}:{record:id});
  if(mode!==previous)render();else{renderList();renderDetail();}
  reveal($('#parameter-detail'));
}

function renderDetail(){
  const main=$('#parameter-detail'),n=N.get(selected);main.replaceChildren();
  if(!n){main.append(el('h2','','Explore the evidence'),empty('Choose a parameter or record to see its declaration, source context and relationships.'));return;}
  const p=P.get(n.id),d=n.declaration;
  main.innerHTML=`<p class="ex-eyebrow">${esc(kinds[n.kind]||words(n.kind))}${p?' / '+esc(p.group):''}</p><h2 class="ex-parameter-name">${esc(p?inputName(p.name):n.label)}</h2>${p&&inputName(p.name)!==p.name?`<p class="ex-input-code">${esc(p.name)}</p>`:''}`;
  if(p){const paths=topics.filter(t=>N.get('code_card:'+t.id)?.card.parameters.includes(p.name));if(paths.length){const maps=el('div','ex-context-links');maps.append(el('span','','See this input in context:'));paths.forEach(t=>maps.append(button(esc(t.title)+' →',()=>{topicId=t.id;switchMode('relationships');},'ex-text-button')));main.append(maps);}}
  if(d){
    const value=p?.independent_input===false?`<span class="ex-value-prefix">Alias of</span> ${esc(d.bound||p.root)}`:`${esc(valueText(d.value))} <span>${esc(displayUnit(d.unit))}</span>`;
    main.append(el('div','ex-value',`${value}<i class="ex-tag ${esc(d.tag.toLowerCase())}">${tagLabel(d.tag)}</i>`));
    main.append(el('p','ex-tag-explanation',esc({EXAMPLE:'A declared example value. Its source context and transfer limits still need review.',SOURCED:'Tagged as sourced in the saved declaration. The tag alone does not establish applicability to this cell.',SWEPT:'A declared input intended to vary across a sweep.'}[d.tag])));
    main.append(heading('Declared source'),el('p','ex-source-text',esc(d.source||'No source text recorded.')));
    if(p?.binding_chain?.length>1){const chain=el('div','ex-binding');p.binding_chain.forEach((name,i)=>{if(i)chain.append(' → ');chain.append(nodeLink('parameter:'+name,name));});main.append(heading('Alias chain'),chain);}
    if(p?.static_lookup_sites?.length){const use=el('div','ex-locations');for(const site of p.static_lookup_sites){const a=el('a','ex-file-link',`<span>${esc(site.path)}</span><small>${esc(site.function||'')} · line ${site.line}</small>`);a.href='../structure/?'+new URLSearchParams({file:site.path});use.append(a);}main.append(heading('Where the input is read'),use);}
  }else{
    const detail=n.card||n.record||n.review||n.relation||n.reference||n;
    const summary=detail.finding||detail.statement||detail.scope||detail.reviewer_rationale||detail.verdict;
    if(summary)main.append(el('p','ex-source-text',esc(summary)));
  }
  const paths=new Set();function collect(value){if(!value)return;if(typeof value==='object'){if(typeof value.path==='string'&&knownFiles.has(value.path))paths.add(value.path);Object.values(value).forEach(collect);}else if(typeof value==='string')for(const m of value.matchAll(/((?:aleph|neural|dev|tests)\/[\w./-]+\.py)/g))if(knownFiles.has(m[1]))paths.add(m[1]);}collect(p||n);
  for(const site of p?.static_lookup_sites||[])paths.delete(site.path);
  if(paths.size){const links=el('div','ex-locations');for(const path of paths){const a=el('a','ex-file-link',esc(path));a.href='../structure/?'+new URLSearchParams({file:path});links.append(a);}main.append(heading('Related structure'),links);}
  const edges=adjacent.get(n.id)||[];main.append(heading(`Connected evidence · ${edges.length}`),el('p','ex-small','Each link names a recorded relationship. It does not imply causation, correlation or physical validation.'));
  if(edges.length)main.append(neighborhood(n,edges));else main.append(empty('No relationships recorded for this entry.'));
  main.append(disclosure('Complete '+(p?'parameter declaration and context':'evidence record'),record(p||n)));
  if(p){
    for(const [key,label] of [['literature_review','Literature review'],['example_review','Example review'],['uncertainty_review','Uncertainty and prior review']])if(A[key]?.[p.name])main.append(disclosure(label,record(A[key][p.name])));
    const packets=A.research_catalog.packets.filter(packet=>packet.parameter_names?.includes(p.name));if(packets.length){const list=el('div','ex-packet-links');packets.forEach(packet=>list.append(button(esc(packet.title)+' →',()=>openPacket(packet.id),'ex-text-button')));main.append(disclosure(`Research packets (${packets.length})`,list));}
  }
  const copy=button('Copy link to this record',async()=>{try{await navigator.clipboard.writeText(new URL(href(n.id),location.href).href);copy.textContent='Link copied';}catch{copy.textContent='Copy the address from your browser';}},'ex-text-button');main.append(copy);
}
function neighborhood(n,edges){
  const wrap=el('div','ex-neighborhood');
  // Group the complete one-hop neighborhood by relationship, preserving direction and every edge.
  const groups=new Map();for(const e of edges){const outbound=e.source===n.id,other=outbound?e.target:e.source;const k=e.kind+':'+outbound;if(!groups.has(k))groups.set(k,{kind:e.kind,outbound,items:[]});groups.get(k).items.push({id:other,edge:e});}
  for(const g of groups.values()){
    const section=el('section','ex-relation-group');section.append(el('h4','',`${g.outbound?'→':'←'} ${esc(edgeNames[g.kind]||words(g.kind))} <small>${g.items.length}</small>`));
    if(g.items[0].edge.meaning)section.append(el('p','ex-small',esc(g.items[0].edge.meaning)));
    for(const {id,edge} of g.items){const row=el('div','ex-relation-row');row.append(nodeLink(id));const details={...edge};delete details.source;delete details.target;if(Object.keys(details).length>1)row.append(disclosure('Relationship details',record(details)));section.append(row);}wrap.append(section);
  }return wrap;
}
function renderGuide(){
  const work=$('#parameter-workspace');work.className='ex-guide-workspace';
  work.replaceChildren();
  const nav=el('aside','ex-guide-nav');nav.setAttribute('aria-label','Parameter topics');
  const q=query.toLowerCase().trim(),matches=topics.filter(t=>!q||JSON.stringify([t,N.get('code_card:'+t.id)?.card.parameters.map(inputName),N.get('code_card:'+t.id)?.card.parameters]).toLowerCase().includes(q));
  if(q&&!matches.some(t=>t.id===topicId)&&matches.length)topicId=matches[0].id;
  let section='';for(const t of matches){if(t.section!==section){section=t.section;nav.append(el('p','ex-eyebrow',esc(section)));}const b=button(esc(t.title),()=>{topicId=t.id;setURL({mode:'relationships',topic:topicId});renderGuide();reveal($('#parameter-detail'));},'ex-nav-item');b.setAttribute('aria-current',topicId===t.id?'page':'false');nav.append(b);}
  if(!matches.length)nav.append(empty('No topic matches. Search the full parameter list below.'));
  const all=button(q?'Search all 706 parameters →':'Browse all 706 parameters →',()=>{mode='parameters';group='';tag='';page=0;setURL({mode});render();},'ex-text-button');nav.append(all);work.append(nav);
  if(!matches.length){const result=el('section','ex-guide-content','<h2>No matching topic</h2><p class="ex-intro">The reading map covers selected model relationships. Search all parameters for this term.</p>');result.append(button('Search all 706 parameters →',()=>all.click(),'ex-text-button'));work.append(result);return;}
  const t=topics.find(t=>t.id===topicId)||topics[0],n=N.get('code_card:'+t.id),c=n.card;
  const main=el('section','ex-guide-content');main.id='parameter-detail';main.setAttribute('aria-live','polite');work.append(main);
  main.innerHTML=`<p class="ex-eyebrow">${esc(t.section)} / ${esc(t.title)}</p><h2>${esc(t.question)}</h2><p class="ex-intro">${esc(t.intro)}</p>`;
  const flow=el('div','ex-guide-flow');flow.setAttribute('aria-label','Saved model relationship: inputs, calculation and derived quantities');
  const inputs=el('div','ex-guide-inputs','<h3>Inputs <small>Choose one to see its value & source</small></h3>');
  for(const name of c.parameters){const p=P.get('parameter:'+name);if(!p)continue;const a=nodeLink(p.id);a.className='ex-guide-input';a.innerHTML=`<span>${esc(inputName(name))}</span><b>↗</b>`;inputs.append(a);}
  const center=el('div','ex-guide-calculation',`<span class="ex-flow-arrow" aria-hidden="true">→</span><div><span class="ex-eyebrow">Model step</span><strong>${esc(t.calculation)}</strong></div><span class="ex-flow-arrow" aria-hidden="true">→</span>`);
  const outputs=el('div','ex-guide-outputs','<h3>Selected outputs</h3>');t.outputs.forEach(o=>outputs.append(el('p','',esc(o))));
  flow.append(inputs,center,outputs);main.append(flow);
  main.append(el('p','ex-guide-takeaway',esc(t.takeaway)),el('p','ex-small',esc(t.limit)));
  const math=el('div','ex-guide-formula');math.append(el('p','',esc(c.expression)),el('p','ex-small','Output units: '+esc(displayUnit(c.output_units))));main.append(disclosure('Show the saved calculation',math));
  const links=el('div','ex-guide-files');for(const anchor of c.anchors||[]){const a=el('a','ex-file-link',`<span>${esc(anchor.path)}</span><small>Saved reference · line ${anchor.line} → explore this file</small>`);a.href='../structure/?'+new URLSearchParams({file:anchor.path});links.append(a);}main.append(disclosure('Where this appears in the program',links));
  const research=A.research_catalog.packets.filter(packet=>packet.parameter_names?.some(name=>c.parameters.includes(name)));
  const sources=el('div','ex-packet-links');research.forEach(packet=>sources.append(button(esc(packet.title)+' →',()=>openPacket(packet.id),'ex-text-button')));main.append(disclosure(`Sources & research for these inputs (${research.length})`,sources));
  main.append(button('Open the complete relationship record →',()=>select(n.id),'ex-text-button'));
  main.append(el('p','ex-guide-footnote','Reading map of the saved model. Arrows mean “used in this calculation”, not measured biological correlation. The listed inputs follow the selected source record; they are not an exhaustive dependency list.'));
}
function renderWholeGraph(){
  const main=$('#parameter-detail');main.innerHTML=`<p class="ex-eyebrow">All recorded relationships</p><h2>The complete evidence graph</h2><p class="ex-intro">${count(G.nodes.length)} records · ${count(G.edges.length)} relationships. Select a point, or find a named record in the list.</p>`;
  main.append(button('← Return to selected record',()=>{mode=P.has(selected)?'parameters':'records';setURL(P.has(selected)?{parameter:selected.slice(10)}:{record:selected});render();},'ex-back'));
  const holder=el('div','ex-whole-graph'),canvas=document.createElement('canvas');canvas.setAttribute('aria-label','All 2,168 evidence records and 3,031 relationships, grouped by type. Use the record list for keyboard navigation.');canvas.tabIndex=0;holder.append(canvas);main.append(holder);
  const legend=el('div','ex-graph-legend');const kindList=Object.keys(kinds).filter(k=>G.nodes.some(n=>n.kind===k)),colors=['#0b7285','#364fc7','#946200','#c2255c','#2b8a3e','#d9480f'];kindList.forEach((k,i)=>legend.append(el('span','',`<i style="background:${colors[i%colors.length]}"></i>${esc(kinds[k])}`)));main.append(legend);
  let points=[];function draw(){if(!canvas.isConnected)return;const w=holder.clientWidth,h=620,ratio=Math.min(devicePixelRatio,2);canvas.width=w*ratio;canvas.height=h*ratio;canvas.style.height=h+'px';const c=canvas.getContext('2d');c.scale(ratio,ratio);c.clearRect(0,0,w,h);const byKind=new Map(kindList.map(k=>[k,G.nodes.filter(n=>n.kind===k)]));points=[];let pos=new Map();kindList.forEach((k,j)=>{const ns=byKind.get(k),cols=Math.max(1,Math.ceil(ns.length/65)),x=22+(j%4)*(w-44)/4,y=25+Math.floor(j/4)*145;ns.forEach((n,i)=>{const pt={n,x:x+(i%cols)*Math.min(7,(w/4-30)/cols),y:y+Math.floor(i/cols)*1.8,color:colors[j%colors.length]};points.push(pt);pos.set(n.id,pt);});});c.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();c.globalAlpha=.055;c.lineWidth=.6;for(const edge of G.edges){const a=pos.get(edge.source),b=pos.get(edge.target);if(!a||!b)continue;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(b.x,b.y);c.stroke();}c.globalAlpha=1;for(const p of points){c.fillStyle=p.color;c.beginPath();c.arc(p.x,p.y,p.n.id===selected?4:1.7,0,Math.PI*2);c.fill();}}
  canvas.onclick=e=>{const r=canvas.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const p=points.reduce((best,p)=>!best||Math.hypot(x-p.x,y-p.y)<Math.hypot(x-best.x,y-best.y)?p:best,null);if(p&&Math.hypot(x-p.x,y-p.y)<12)select(p.n.id);};
  requestAnimationFrame(draw);const resize=new ResizeObserver(()=>{if(canvas.isConnected)draw();else resize.disconnect();});resize.observe(holder);
}
function renderResearch(){
  const work=$('#parameter-workspace');work.className='';work.innerHTML='<div class="ex-research-head"><p class="ex-eyebrow">Research library</p><h2>Follow a number back to its evidence.</h2><p class="ex-intro">Source readings, quantity conversions and uncertainty reviews from the saved parameter atlas.</p></div>';
  const q=query.toLowerCase(),packets=A.research_catalog.packets.filter(p=>JSON.stringify(p).toLowerCase().includes(q));
  const grid=el('div','ex-research-grid');packets.forEach((p,i)=>{grid.append(button(`<span class="ex-index">${String(i+1).padStart(2,'0')}</span><strong>${esc(p.title)}</strong><span>${esc(words(p.evidence_kind))}</span><small>${p.parameter_names?.length||0} parameters →</small>`,()=>openPacket(p.id),'ex-research-item'));});work.append(grid);if(!packets.length)work.append(empty('No research packets match.'));
  work.append(el('section','ex-packet-detail'));
  work.append(heading('Research figures'));
  const gallery=el('div','ex-figure-grid');for(const f of figures.filter(f=>!q||f.alt.toLowerCase().includes(q)||f.src.toLowerCase().includes(q))){const figure=el('figure','');figure.innerHTML=`<a href="${base+esc(f.src)}" aria-label="Open figure: ${esc(f.alt)}"><img loading="lazy" src="${base+esc(f.src)}" alt="${esc(f.alt)}"></a><figcaption>${esc(f.alt)} <a href="${base+esc(f.src)}">Open full size ↗</a></figcaption>`;gallery.append(figure);}work.append(gallery);
  work.append(heading('Supporting atlas records'));
  const covered=new Set(['parameters','research_packets','research_catalog']);for(const [key,value] of Object.entries(A)){if(covered.has(key))continue;work.append(lazyDisclosure(words(key),()=>record(value)));}
}
function openPacket(id,push=true){const packet=A.research_catalog.packets.find(p=>p.id===id);if(!packet)return;mode='research';if(push)setURL({packet:id});render();const detail=$('.ex-packet-detail');detail.innerHTML=`<p class="ex-eyebrow">Research packet</p><h2>${esc(packet.title)}</h2>`;
  const body=A.research_packets[id];if(body?.scope)detail.append(el('p','ex-intro',esc(body.scope)));
  const links=el('div','ex-packet-parameters');for(const name of packet.parameter_names||[])links.append(nodeLink('parameter:'+name,name));detail.append(disclosure(`Parameters in this packet (${packet.parameter_names?.length||0})`,links));
  if(body){const metaKeys=new Set(['schema','authority_status','created_utc','provenance','scope','input_sha256']);detail.append(record(Object.fromEntries(Object.entries(body).filter(([k])=>!metaKeys.has(k)))));detail.append(disclosure('Provenance and scope',record(Object.fromEntries(Object.entries(body).filter(([k])=>metaKeys.has(k))))));}const a=el('a','ex-text-button','Download the saved record ↗');a.href=base+packet.file;detail.append(a);detail.scrollIntoView({block:'start',behavior:'smooth'});
}
function restore(){const s=new URLSearchParams(location.search);mode=s.get('mode')||(s.has('parameter')?'parameters':'relationships');if(!['relationships','parameters','records','graph','research'].includes(mode))mode='relationships';if(location.hash==='#records')mode='research';selected=s.get('record')||'parameter:'+(s.get('parameter')||'cortex.thickness');if(s.has('record'))mode='records';group=parameterMode()?P.get(selected)?.group||'':'';query='';tag='';recordKind='';page=0;whole=mode==='graph';topicId=topics.some(t=>t.id===s.get('topic'))?s.get('topic'):'cortex_shell_population';render();if(s.has('packet'))openPacket(s.get('packet'),false);}

Promise.all([data('../../media/explorers/native/parameters.json'),data(base+'evidence_graph.json'),data('../../media/explorers/native/figures.json'),data('../../media/explorers/structure/locations.json')]).then(([a,g,f,files])=>{A=a;G=g;figures=f;knownFiles=new Set(files);N=new Map(g.nodes.map(n=>[n.id,n]));P=new Map(a.parameters.map(p=>[p.id,p]));adjacent=new Map();for(const e of G.edges)for(const id of new Set([e.source,e.target])){if(!adjacent.has(id))adjacent.set(id,[]);adjacent.get(id).push(e);}restore();addEventListener('popstate',restore);}).catch(e=>fail(e,root));
