/* ============================================================
   The Short List: builds the cards and category buttons from picks-data.js.
   Edit picks there, not here.
   ============================================================ */

(function () {
  const data = window.SHORT_LIST;
  const list = document.getElementById('short-list');
  const filters = document.getElementById('short-list-filters');
  if (!data || !list) return;

  const ICONS = {
    flip: '<rect x="9" y="3" width="14" height="26" rx="3" stroke="currentColor" stroke-width="2.2"/><path d="M9 15h14" stroke="currentColor" stroke-width="2.2"/><circle cx="16" cy="22" r="1.4" fill="currentColor"/>',
    simplephone: '<rect x="9" y="3" width="14" height="26" rx="3" stroke="currentColor" stroke-width="2.2"/><rect x="12" y="7" width="3.5" height="3.5" rx=".8" fill="currentColor"/><rect x="16.5" y="7" width="3.5" height="3.5" rx=".8" fill="currentColor"/><rect x="12" y="12" width="3.5" height="3.5" rx=".8" fill="currentColor"/><rect x="16.5" y="12" width="3.5" height="3.5" rx=".8" fill="currentColor"/>',
    grandpad: '<rect x="5" y="4" width="22" height="24" rx="3" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><circle cx="20" cy="12" r="2.2" fill="currentColor"/><circle cx="12" cy="20" r="2.2" fill="currentColor"/><circle cx="20" cy="20" r="2.2" fill="currentColor"/>',
    tablet: '<rect x="5" y="4" width="22" height="24" rx="3" stroke="currentColor" stroke-width="2.2"/><circle cx="16" cy="24.5" r="1.4" fill="currentColor"/>',
    laptop: '<rect x="6" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2.2"/><path d="M3 25h26" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    display: '<rect x="4" y="7" width="24" height="16" rx="3" stroke="currentColor" stroke-width="2.2"/><path d="M12 27h8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    frame: '<rect x="4" y="6" width="24" height="18" rx="2.5" stroke="currentColor" stroke-width="2.2"/><circle cx="11" cy="12" r="2" fill="currentColor"/><path d="M7 21l6-5 4 3 4-4 4 4" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>',
    calendar: '<rect x="5" y="6" width="22" height="21" rx="2.5" stroke="currentColor" stroke-width="2.2"/><path d="M5 12h22M11 3v6M21 3v6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="18" r="1.6" fill="currentColor"/><circle cx="20" cy="18" r="1.6" fill="currentColor"/>',
    remote: '<rect x="10" y="3" width="12" height="26" rx="4" stroke="currentColor" stroke-width="2.2"/><circle cx="16" cy="9" r="2" fill="currentColor"/><circle cx="16" cy="16" r="2" fill="currentColor"/><circle cx="16" cy="23" r="2" fill="currentColor"/>',
    clock: '<circle cx="16" cy="16" r="11" stroke="currentColor" stroke-width="2.2"/><path d="M16 9v7l5 3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    caption: '<rect x="5" y="5" width="22" height="16" rx="2.5" stroke="currentColor" stroke-width="2.2"/><path d="M9 10h14M9 15h9" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M10 27h12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>',
    headset: '<path d="M6 20v-4a10 10 0 0 1 20 0v4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><rect x="4" y="18" width="6" height="9" rx="2" stroke="currentColor" stroke-width="2.2"/><rect x="22" y="18" width="6" height="9" rx="2" stroke="currentColor" stroke-width="2.2"/>',
    moon: '<path d="M21 5a11 11 0 1 0 6 18A9 9 0 0 1 21 5z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function stars(label, n) {
    const full = Math.floor(n), half = n % 1 ? 1 : 0, off = 5 - full - half;
    return `<div class="pick-scale"><span class="pick-scale__label">${label}</span>` +
      `<span class="pick-scale__stars" role="img" aria-label="${label}: ${n} out of 5">${'★'.repeat(full)}` +
      (half ? '<span class="pick-scale__half">★</span>' : '') +
      `<span class="pick-scale__off">${'★'.repeat(off)}</span></span></div>`;
  }

  const rel = p => data.affiliateLinks && p.paid !== false ? 'sponsored noopener' : 'noopener';
  if (!data.affiliateLinks) document.querySelectorAll('[data-affiliate-note]').forEach(el => { el.hidden = true; });

  function buy(p) {
    if (p.stores) {
      return `<div class="pick-options"><p class="pick-options__head">Where to buy</p>` +
        p.stores.map(o => `<a href="${esc(o.link)}" class="pick-option" target="_blank" rel="${rel(p)}"><span>${esc(o.label)}</span><span aria-hidden="true">→</span></a>`).join('') +
        `</div>`;
    }
    if (p.options) {
      return `<div class="pick-options"><p class="pick-options__head">A few to choose from</p>` +
        p.options.map(o => `<a href="${esc(o.link)}" class="pick-option" target="_blank" rel="${rel(p)}"><span>${esc(o.label)}</span><span aria-hidden="true">→</span></a>`).join('') +
        (p.tested ? '' : '<p class="pick-options__note">Chosen from buyer reviews. Our own hands-on test is coming.</p>') +
        `</div>`;
    }
    return `<div class="shop-card__buy"><a href="${esc(p.link)}" class="btn btn--primary" target="_blank" rel="${rel(p)}">${esc(p.button || "See today's price →")}</a></div>`;
  }

  function card(p) {
    return `<article class="shop-card reveal">
      <div class="shop-card__cover shop-card__cover--${p.cover}">
        <span class="shop-chip">${esc(p.tag)}</span>
        <span class="shop-card__mark" aria-hidden="true"><svg width="46" height="46" viewBox="0 0 32 32" fill="none">${ICONS[p.icon] || ''}</svg></span>
        <span class="shop-card__wordmark">The Short List</span>
      </div>
      <div class="shop-card__body">
        <span class="shop-card__format">${esc(p.format)}</span>
        <h3 class="shop-card__title">${esc(p.name)}</h3>
        <p class="shop-card__desc">${esc(p.desc)}</p>
        <div class="pick-scales">${stars('Easy to learn', p.learn)}${p.can ? stars('Can do', p.can) : ''}</div>
        <p class="pick-why"><strong>Why it made the list</strong>${esc(p.why)}</p>
        ${buy(p)}
      </div>
    </article>`;
  }

  list.innerHTML = data.groups.map((g, i) => `
    <section class="section ${i % 2 ? 'section--white' : 'section--sand'}" data-group="${g.id}" aria-labelledby="group-${g.id}">
      <div class="container">
        <div class="shop-group-head">
          <div>
            <p class="section-label">${esc(g.label)}</p>
            <h2 id="group-${g.id}">${esc(g.heading)} <span style="color:var(--color-terracotta);font-style:italic;">${esc(g.accent)}</span></h2>
          </div>
          ${i === 0 ? `<span class="shop-group-head__note">Updated ${esc(data.updated)}</span>` : ''}
        </div>
        <div class="shop-grid">${data.picks.filter(p => p.group === g.id).map(card).join('')}</div>
      </div>
    </section>`).join('');

  // Category buttons, styled like the workshop filter on the services page
  if (filters) {
    filters.innerHTML = [{ id: 'all', label: 'All' }].concat(data.groups)
      .map((g, i) => `<button class="workshop-filter-tag${i ? '' : ' active'}" data-filter="${g.id}" aria-pressed="${i ? 'false' : 'true'}">${esc(g.label)}</button>`).join('');
    filters.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      filters.querySelectorAll('button').forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', b === btn); });
      list.querySelectorAll('[data-group]').forEach(s => { s.hidden = btn.dataset.filter !== 'all' && s.dataset.group !== btn.dataset.filter; });
    });
  }
})();
