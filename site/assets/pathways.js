import {esc,el,button} from './explorer-ui.js?v=3e6f66bbc6';

// Playback explains an authored route. It is never a running engine or network.
export function mountRoutes(host, routes, {onStep, compact=false}={}) {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  host.classList.add('pw-routes');
  routes.forEach((route,index)=>{
    const article=el(compact?'details':'article','pw-route');
    if(compact)article.open=index===0;
    if(route.id)article.id=route.id;
    const head=el(compact?'summary':'header','pw-heading',`<span class="pw-number">${String(index+1).padStart(2,'0')}</span><span><h3>${esc(route.title)}</h3><span class="pw-purpose">${esc(route.purpose||'')}</span></span>${compact?'<span class="pw-open">Open path</span>':''}`);
    const body=el('div','pw-body');
    body.innerHTML=`<p class="pw-status">${esc(route.status||'Saved structure · explanatory sequence')}</p>`;
    const controls=el('div','pw-controls');
    let paused=reduced,active=0;
    const toggle=button(paused?'Play flow':'Pause flow',()=>{paused=!paused;article.classList.toggle('is-paused',paused);toggle.textContent=paused?'Play flow':'Pause flow';toggle.setAttribute('aria-pressed',String(!paused));},'pw-toggle');
    toggle.setAttribute('aria-pressed',String(!paused));
    controls.append(el('span','','Animated guide · not live execution'),toggle);
    article.classList.toggle('is-paused',paused);
    const steps=el('ol','pw-steps'+(route.steps.length>5?' pw-long':''));
    const detail=el('div','pw-stage-detail');
    function choose(i){active=i;steps.querySelectorAll('button').forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)));const s=route.steps[i];detail.innerHTML=`<span>Step ${i+1} / ${route.steps.length}</span><h4>${esc(s.title)}</h4><p>${esc(s.text||s.subtitle||'')}</p>`;if(s.ref&&onStep)detail.append(button('Read inputs, work and outputs →',()=>onStep(s.ref),'ex-text-button'));}
    steps.style.setProperty('--pw-count',route.steps.length);
    route.steps.forEach((step,i)=>{const li=el('li','');li.style.setProperty('--pw-i',i);li.append(button(`<span class="pw-stage-number">${String(i+1).padStart(2,'0')}</span><strong>${esc(step.title)}</strong>${step.subtitle?`<small>${esc(step.subtitle)}</small>`:''}`,()=>choose(i),'pw-stage'));steps.append(li);});
    body.append(controls,steps,detail);
    if(route.href){const a=el('a','pw-link',esc(route.link||'Explore this path')+' →');a.href=route.href;body.append(a);}
    article.append(head,body);host.append(article);choose(active);
  });
}

const overview=document.querySelector('[data-pathway-data]');
if(overview){const source=document.getElementById(overview.dataset.pathwayData);if(source)mountRoutes(overview,JSON.parse(source.textContent));}

// Keep the complete topology present. Hover/focus highlights context without removing it.
document.querySelectorAll('.whole-system').forEach(panel=>{
  const toggle=panel.querySelector('[data-whole-pause]');
  let paused=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const apply=()=>{panel.classList.toggle('is-paused',paused);toggle.textContent=paused?'Play flow':'Pause flow';toggle.setAttribute('aria-pressed',String(!paused));};
  toggle.onclick=()=>{paused=!paused;apply();};apply();
  const reset=()=>panel.querySelectorAll('.sm-connection').forEach(p=>p.classList.remove('is-highlighted'));
  panel.querySelectorAll('[data-system-node]').forEach(n=>{
    const focus=()=>{reset();panel.querySelectorAll('.sm-connection').forEach(p=>p.classList.toggle('is-highlighted',p.dataset.from===n.dataset.systemNode||p.dataset.to===n.dataset.systemNode));};
    n.onmouseenter=focus;n.onfocus=focus;n.onmouseleave=reset;n.onblur=reset;
  });
});
