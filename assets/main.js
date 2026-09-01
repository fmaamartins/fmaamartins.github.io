async function loadProjects(){
  const res = await fetch('assets/projects.json');
  const data = await res.json();
  return data.projects || [];
}

function projectCard(p){
  const tags = (p.tags||[]).slice(0,4).map(t=>`<span class="chip">${t}</span>`).join('');
  const img = p.cover ? `<div style="height:160px;border-radius:12px;background:#0b1220;border:1px solid rgba(255,255,255,.08);overflow:hidden;margin-bottom:10px"><img src="${p.cover}" alt="" style="width:100%;height:100%;object-fit:cover"/></div>` : '';
  const link = p.link ? `<a class="btn btn-secondary" href="${p.link}" target="_blank" rel="noreferrer">Abrir</a>` : '';
  return `
    <article class="card">
      ${img}
      <h3>${p.title}</h3>
      <p class="small">${p.oneLiner||''}</p>
      <div class="chips">${tags}</div>
      <div class="cta" style="margin-top:12px">${link}</div>
    </article>
  `;
}

(async function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  let projects = [];
  try { projects = await loadProjects(); } catch(e) {}

  const featured = document.getElementById('featured-projects');
  if (featured){
    featured.innerHTML = projects.filter(p=>p.featured).slice(0,6).map(projectCard).join('');
  }

 const grid = document.getElementById('projects-grid');
if (grid){
  const page = (window.location.pathname || '').toLowerCase();

  let filtered = projects;

  if (page.includes('aguas-esgotos.html')) {
    filtered = projects.filter(p => p.type === 'aguas_esgotos');
  } else if (page.includes('estruturas.html')) {
    filtered = projects.filter(p => p.type === 'estruturas');
  }

  grid.innerHTML = filtered.map(projectCard).join('');
}
})();
