import {$,esc,el,button,data,fail,tabs,setURL,record,disclosure,reveal,empty,count} from './explorer-ui.js';
import {structureGraph,nodeLabels} from './structure-topology.js';

const root=$('#structure-app');
const groups=[['Overview',[0]],['Physics engine',[10,1]],['Inner learning',[2,3]],['Outer models',[5,4,6,7,8]],['Current app',[9]]];
let D,view=0,technical=false,mode='structure',fileQuery='',filePage=0;
const pageSize=40;
let fileMap,incoming;

function viewName(i){return technical ? D.architecture[i].title : D.explanations.views[i].title;}
function lesson(ref){return D.explanations.nodes[ref.path+':'+ref.line];}
function state(){return Object.fromEntries(new URLSearchParams(location.search));}
function activate(i,push=true){view=Number(i);mode='structure';if(push)setURL({view});render();}
function fileLink(path,label=path){const a=el('a','ex-file-link',esc(label));a.href='?'+new URLSearchParams({file:path});a.onclick=e=>{if(e.metaKey||e.ctrlKey)return;e.preventDefault();openFile(path);};return a;}
function shell(){
  root.innerHTML='<div class="ex-toolbar"><div class="ex-tabs" id="structure-tabs" aria-label="Structure views"></div><label class="ex-search"><span class="sr-only">Search files and definitions</span><input type="search" id="file-search" placeholder="Search files and definitions…"></label></div><div class="ex-workspace"><nav class="ex-sidebar" id="structure-nav" aria-label="Browse structure"></nav><section class="ex-content" id="structure-content" aria-live="polite"></section></div>';
  tabs($('#structure-tabs'),[['structure','Structure'],['files','Files & relationships']],mode,next=>{mode=next;setURL(next==='files'?{mode:'files'}:{view});render();});
  const search=$('#file-search');search.value=fileQuery;search.oninput=()=>{fileQuery=search.value;filePage=0;if(fileQuery){mode='files';tabs($('#structure-tabs'),[['structure','Structure'],['files','Files & relationships']],mode,next=>{mode=next;setURL(next==='files'?{mode:'files'}:{view});render();});}renderNavigation();if(mode==='files')renderFiles();};
  renderNavigation();
}
function renderNavigation(){
  const nav=$('#structure-nav');nav.replaceChildren();
  if(mode==='structure'){
    for(const [label,ids] of groups){nav.append(el('p','ex-eyebrow',esc(label)));for(const i of ids){const b=button(esc(viewName(i)),()=>activate(i),'ex-nav-item');b.setAttribute('aria-current',i===view?'page':'false');nav.append(b);}}
  }else{
    nav.append(el('p','ex-eyebrow','File collections'));
    for(const [label,prefix] of [['All files',''],['Physics','aleph/physics/'],['Cell','aleph/cell/'],['Application & studio','@app'],['Inner learning','aleph/inner/'],['Outer models','aleph/outer/'],['Neural app','neural/'],['Tests','tests/']]){
      const b=button(esc(label),()=>{fileQuery=prefix;filePage=0;$('#file-search').value=prefix==='@app'?'Application & studio':prefix;renderFiles();renderNavigation();},'ex-nav-item');b.setAttribute('aria-current',fileQuery===prefix?'page':'false');nav.append(b);
    }
  }
}
function render(){shell(); if(mode==='files')renderFiles();else renderView();}
function renderView(){
  const main=$('#structure-content'),a=D.architecture[view];
  main.innerHTML=`<div class="ex-heading"><div><p class="ex-eyebrow">${view===0?'The whole program':'Structure / '+esc(groups.find(([,ids])=>ids.includes(view))[0])}</p><h2>${esc(view===0?'How Aleph fits together':viewName(view))}</h2></div><div id="ex-language" class="ex-segment"></div></div><p class="ex-intro">${esc(view===0?'Start with a system, then follow its stages and the data passed between them.':technical?a.description:D.explanations.views[view].summary)}</p>`;
  tabs($('#ex-language'),[['plain','Plain'],['technical','Technical']],technical?'technical':'plain',key=>{technical=key==='technical';renderNavigation();renderView();});
  if(view===0){
    const lanes=[['01','Physics engine','Build the cell, apply forces, and compute its motion.',10,'Inputs → World → Motion → Records'],['02','Inner learning','Read observations and estimate possible internal states.',2,'Observations → Summaries → Possible states'],['03','Outer models','Interpret force records, images and published measurements.',5,'Force records · Images · Literature'],['04','Prediction app','Use an existing model to predict by experiment condition.',9,'Conditions → Saved model → Prediction']];
    const list=el('div','ex-system-list');
    lanes.forEach(([n,title,desc,i,flow])=>list.append(button(`<span class="ex-index">${n}</span><span><strong>${title}</strong><span class="ex-system-desc">${desc}</span><span class="ex-flow-text">${flow}</span></span><span class="ex-arrow">↗</span>`,()=>activate(i),'ex-system')));main.append(list);
    main.append(el('p','ex-note','These systems have separate roles. Their placement here does not imply an active data or training connection.'));
    main.append(disclosure('All '+a.nodes.length+' recorded structure entries',stepList(a)));
  } else {
    const graph=structureGraph(view,a,drawDiagram); if(graph) main.append(graph);
    const list=stepList(a); main.append(graph?disclosure(`All ${a.nodes.length} stages and references`,list):list);
    if(a.note)main.append(disclosure('How to read this structure',el('p','ex-note',esc(a.note))));
  }
  main.append(el('section','ex-step-detail','<p class="ex-empty">Select a stage to read its inputs, work and outputs.</p>'));
}
function stepList(a){const list=el('div','ex-step-list');a.nodes.forEach((n,i)=>{const l=lesson(n);list.append(button(`<span class="ex-index">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(!technical&&l?l.title:n.title)}</strong><small>${esc(!technical&&l?l.why:n.description)}</small></span><span>→</span>`,()=>showStep(n),'ex-step-row'));});return list;}
function drawDiagram(nodes,edges,width,height){
  const wrap=el('div','ex-diagram');const byId=new Map(nodes.map(n=>[n.id,n]));
  let svg=`<svg viewBox="0 0 ${width} ${height}" aria-label="${esc(viewName(view))}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="flow-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z"/></marker></defs>`;
  for(const e of edges){const a=byId.get(e.a),b=byId.get(e.b);if(!a||!b)continue;const d=e.d||`M${a.x+a.w} ${a.y+a.h/2}H${(a.x+a.w+b.x)/2}V${b.y+b.h/2}H${b.x}`;svg+=`<path class="ex-edge" d="${d}" marker-end="url(#flow-arrow)" ${e.dashed?'stroke-dasharray="5 5"':''}/>`;if(e.label)svg+=`<text class="ex-edge-label" x="${e.tx}" y="${e.ty}">${esc(e.label)}</text>`;}
  nodes.forEach((n,i)=>{const mapped=!technical&&nodeLabels[view]?.[n.id];const label=mapped?mapped[0]:n.label,detail=mapped?[mapped[1]]:n.detail||[];
    svg+=`<g class="ex-diagram-node" data-node="${i}" tabindex="0" role="button" aria-label="${esc(label)}"><rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="8"/><text class="ex-node-title" x="${n.x+14}" y="${n.y+29}">${esc(label)}</text>${detail.map((t,k)=>`<text class="ex-node-sub" x="${n.x+14}" y="${n.y+51+k*18}">${esc(t)}</text>`).join('')}</g>`;});
  wrap.innerHTML=svg+'</svg>';
  wrap.querySelectorAll('[data-node]').forEach(g=>{const go=()=>{wrap.querySelectorAll('[aria-pressed]').forEach(n=>n.removeAttribute('aria-pressed'));g.setAttribute('aria-pressed','true');const n=nodes[Number(g.dataset.node)];showStep({...n.ref,title:n.label});};g.onclick=go;g.onkeydown=e=>{if(['Enter',' '].includes(e.key)){e.preventDefault();go();}};});
  return wrap;
}
function showStep(n){
  const panel=$('.ex-step-detail'),l=lesson(n);panel.replaceChildren();
  panel.append(el('p','ex-eyebrow','Inside this stage'),el('h3','',esc(l?.title||n.title)));
  if(l){panel.append(el('p','ex-intro',esc(l.why)));const flow=el('div','ex-stage-io');for(const [k,label] of [['input','01 / Inputs'],['action','02 / Work'],['output','03 / Outputs']])flow.append(el('div','',`<h4>${label}</h4><p>${esc(l[k])}</p>`));panel.append(flow);if(l.limit)panel.append(el('p','ex-note',esc(l.limit)));if(l.terms?.length)panel.append(disclosure('Terms used in this stage',record(l.terms)));}
  const node=D.architecture.flatMap(a=>a.nodes).find(a=>a.path===n.path&&a.line===n.line);
  if(node)panel.append(disclosure('Technical description',el('p','',esc(node.description))));
  panel.append(fileLink(n.path,`Explore related file · ${n.path}`));
  panel.scrollIntoView({block:'nearest',behavior:'smooth'});
}
function matchingFiles(){const q=fileQuery.toLowerCase().trim();return D.files.filter(f=>q==='@app'?/^aleph\/(application|studio)\//.test(f.path):!q||f.path.toLowerCase().includes(q)||f.symbols.some(s=>s.name.toLowerCase().includes(q)));}
function renderFiles(){
  const main=$('#structure-content'),files=matchingFiles();
  main.innerHTML=`<p class="ex-eyebrow">File relationships</p><h2>${fileQuery?'Matching files':'Browse the program'}</h2><p class="ex-intro">${count(files.length)} files. Open a file to see its definitions, imports and related parameters.</p>`;
  const list=el('div','ex-file-list');files.slice(filePage*pageSize,(filePage+1)*pageSize).forEach(f=>{const a=fileLink(f.path);a.classList.add('ex-file-row');a.innerHTML=`<span>${esc(f.path)}</span><small>${count(f.lines)} lines · ${f.symbols.length} definitions</small><span>→</span>`;list.append(a);});main.append(list);
  if(!files.length)main.append(empty('No files match. Try a folder name such as physics or a definition name.'));
  const pager=el('div','ex-pager');const prev=button('← Previous',()=>{filePage--;renderFiles();});prev.disabled=!filePage;const next=button('Next →',()=>{filePage++;renderFiles();});next.disabled=(filePage+1)*pageSize>=files.length;pager.append(prev,el('span','',`${files.length?filePage*pageSize+1:0}–${Math.min((filePage+1)*pageSize,files.length)} of ${count(files.length)}`),next);main.append(pager);
}
function openFile(path,push=true){
  const f=fileMap.get(path);if(!f){mode='files';render();$('#structure-content').prepend(empty('This file is not included in the saved structure snapshot.'));return;}
  mode='files';if(push)setURL({file:path});shell();const main=$('#structure-content');
  main.append(button('← Browse files',()=>{setURL({mode:'files'});renderFiles();},'ex-back'),el('p','ex-eyebrow','File / '+f.category),el('h2','ex-file-title',esc(path.split('/').at(-1))),el('p','ex-file-path',esc(path)),el('p','ex-intro',`${count(f.lines)} lines · ${f.symbols.length} definitions · snapshot ${D.commit.slice(0,9)}`));
  const relations=el('div','ex-file-relations');
  for(const [label,ids] of [['Imports', [...new Set(f.imports.map(([i])=>i))]],['Imported by',incoming.get(path)||[]]]){const section=el('section','');section.append(el('h3','',`${label} <small>${ids.length}</small>`));if(!ids.length)section.append(empty('None recorded in this snapshot.'));for(const id of ids.slice(0,8))section.append(fileLink(D.files[id].path));if(ids.length>8){const more=el('div','');for(const id of ids.slice(8))more.append(fileLink(D.files[id].path));section.append(disclosure(`Show ${ids.length-8} more files`,more));}relations.append(section);}main.append(relations,el('p','ex-note','These are static import relationships. They do not establish a runtime call.'));
  const lessons=Object.entries(D.explanations.nodes).filter(([k])=>k.startsWith(path+':'));if(lessons.length){const list=el('div','ex-lesson-links');lessons.forEach(([key,l])=>list.append(disclosure(l.title,record(l))));main.append(disclosure('Roles in the structure explorer',list));}
  const defs=el('div','ex-definitions');f.symbols.forEach(s=>defs.append(el('div','',`<code>${esc(s.name)}</code><span>${esc(s.kind)} · line ${s.line}</span>`)));main.append(disclosure(`Definitions (${f.symbols.length})`,defs));
  const models=D.models.filter(m=>m.path===path);if(models.length)main.append(disclosure('Model layers recorded in this file',record(models)));
  const matches=el('section','ex-file-parameters','<h3>Parameters read here</h3><p class="ex-small">Loading parameter locations…</p>');main.append(matches);
  data('../../media/explorers/native/parameters.json').then(a=>{if(!matches.isConnected)return;const ps=a.parameters.filter(p=>p.static_lookup_sites.some(s=>s.path===path));matches.innerHTML=`<h3>Parameters read here <small>${ps.length}</small></h3>`;if(!ps.length)matches.append(empty('No literal parameter lookup is listed for this file in the parameter snapshot.'));ps.forEach(p=>{const link=el('a','ex-file-link',esc(p.name));link.href='../parameters/?'+new URLSearchParams({parameter:p.name});matches.append(link);});}).catch(e=>{matches.append(empty(e.message));});
  reveal(main);
}
function restore(){const s=state();fileQuery='';view=Math.min(10,Math.max(0,Number(s.view)||0));mode=s.mode==='files'||s.file?'files':'structure';render();if(s.file)openFile(s.file,false);}
data('../../media/explorers/native/structure.json').then(d=>{D=d;fileMap=new Map(D.files.map(f=>[f.path,f]));incoming=new Map();D.files.forEach((f,i)=>{for(const [id] of f.imports){const path=D.files[id]?.path;if(!path)continue;if(!incoming.has(path))incoming.set(path,[]);if(!incoming.get(path).includes(i))incoming.get(path).push(i);}});restore();addEventListener('popstate',restore);}).catch(e=>fail(e,root));
