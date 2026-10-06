/* ============================================================
   Curious & Capable — scripts.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const html = document.documentElement;

  // ── Restore prefs ──
  const savedTextSize = localStorage.getItem('cc-text-size') || 'normal';
  const savedContrast = localStorage.getItem('cc-high-contrast') || 'false';
  const savedMotion   = localStorage.getItem('cc-reduce-motion') || 'false';
  const savedTheme    = localStorage.getItem('cc-theme') || 'light';
  const savedFonts    = localStorage.getItem('cc-fonts') || 'default';
  const savedRadius   = localStorage.getItem('cc-radius') || '1';
  const savedDensity  = localStorage.getItem('cc-density') || '1';
  const savedHero     = localStorage.getItem('cc-hero-variant') || 'default';

  html.setAttribute('data-text-size', savedTextSize);
  html.setAttribute('data-high-contrast', savedContrast);
  html.setAttribute('data-reduce-motion', savedMotion);
  html.setAttribute('data-theme', savedTheme);
  html.setAttribute('data-fonts', savedFonts);
  html.style.setProperty('--radius-scale', savedRadius);
  html.style.setProperty('--density', savedDensity);
  document.querySelectorAll('.hero[data-variant]').forEach(h => h.setAttribute('data-variant', savedHero));

  syncTextSizeButtons(savedTextSize);
  syncToggleButton('contrast-btn', savedContrast === 'true');
  syncToggleButton('motion-btn', savedMotion === 'true');

  // ── Text size ──
  document.querySelectorAll('[data-text-size-set]').forEach(btn => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.textSizeSet;
      html.setAttribute('data-text-size', size);
      localStorage.setItem('cc-text-size', size);
      syncTextSizeButtons(size);
      announce('Text size: ' + { normal: 'normal', large: 'large', xlarge: 'extra large' }[size]);
    });
  });
  function syncTextSizeButtons(active) {
    document.querySelectorAll('[data-text-size-set]').forEach(b => {
      const on = b.dataset.textSizeSet === active;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }

  // ── Contrast toggle ──
  const contrastBtn = document.getElementById('contrast-btn');
  if (contrastBtn) contrastBtn.addEventListener('click', () => {
    const on = html.getAttribute('data-high-contrast') === 'true';
    html.setAttribute('data-high-contrast', String(!on));
    localStorage.setItem('cc-high-contrast', String(!on));
    syncToggleButton('contrast-btn', !on);
    announce('High contrast ' + (!on ? 'on' : 'off'));
  });

  // ── Motion toggle ──
  const motionBtn = document.getElementById('motion-btn');
  if (motionBtn) motionBtn.addEventListener('click', () => {
    const on = html.getAttribute('data-reduce-motion') === 'true';
    html.setAttribute('data-reduce-motion', String(!on));
    localStorage.setItem('cc-reduce-motion', String(!on));
    syncToggleButton('motion-btn', !on);
    announce('Reduce motion ' + (!on ? 'on' : 'off'));
  });

  function syncToggleButton(id, on) {
    const b = document.getElementById(id); if (!b) return;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  }
  function announce(msg) {
    let live = document.getElementById('a11y-live');
    if (!live) {
      live = document.createElement('div');
      live.id = 'a11y-live';
      live.setAttribute('aria-live', 'polite');
      live.setAttribute('aria-atomic', 'true');
      live.className = 'sr-only';
      document.body.appendChild(live);
    }
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = msg; });
  }

  // ── Mobile nav ──
  const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('.nav__menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('is-open', !open);
    });
    document.addEventListener('click', e => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        hamburger.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        hamburger.focus();
      }
    });
    navMenu.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('is-open');
    }));
  }

  // ── Active nav ──
  let cur = window.location.pathname.split('/').pop() || 'index.html';
  if (/^post-/.test(cur)) cur = 'blog.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const h = a.getAttribute('href');
    if (h === cur || (cur === '' && h === 'index.html')) a.setAttribute('aria-current', 'page');
  });

  // ── FAQ ──
  document.querySelectorAll('.faq__trigger').forEach(t => {
    t.addEventListener('click', () => {
      const item = t.closest('.faq__item');
      const panel = item.querySelector('.faq__panel');
      const open = t.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq__trigger').forEach(o => {
        if (o !== t) {
          o.setAttribute('aria-expanded', 'false');
          o.closest('.faq__item').setAttribute('data-open', 'false');
          o.closest('.faq__item').querySelector('.faq__panel').style.maxHeight = '0';
        }
      });
      t.setAttribute('aria-expanded', String(!open));
      item.setAttribute('data-open', String(!open));
      panel.style.maxHeight = open ? '0' : panel.scrollHeight + 'px';
    });
  });

  // ── Blog filter ──
  const tags = document.querySelectorAll('.category-tag');
  const cards = document.querySelectorAll('.blog-card[data-category]');
  tags.forEach(tag => tag.addEventListener('click', () => {
    tags.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
    tag.classList.add('active');
    tag.setAttribute('aria-pressed','true');
    const f = tag.dataset.filter;
    cards.forEach(c => {
      const show = f === 'all' || c.dataset.category === f;
      c.style.display = show ? '' : 'none';
    });
    announce('Showing ' + tag.textContent + ' posts');
  }));

  // ── Contact form ──
  const form = document.querySelector('#contact-form');
  if (form) {
    function showErr(f, m) {
      const e = document.getElementById(f.id + '-error');
      f.classList.add('has-error');
      f.setAttribute('aria-describedby', f.id + '-error');
      if (e) { e.textContent = m; e.classList.add('is-visible'); }
    }
    function clearErr(f) {
      const e = document.getElementById(f.id + '-error');
      f.classList.remove('has-error');
      f.removeAttribute('aria-describedby');
      if (e) e.classList.remove('is-visible');
    }
    form.querySelectorAll('input,select,textarea').forEach(f => {
      f.addEventListener('input', () => clearErr(f));
      f.addEventListener('change', () => clearErr(f));
    });
    const submitBtn = form.querySelector('.form-submit');
    const submitOriginalText = submitBtn ? submitBtn.textContent : '';
    const notice = document.querySelector('#form-notice');

    function showNotice(html, kind) {
      if (!notice) return;
      notice.innerHTML = html;
      notice.dataset.kind = kind || 'success';
      notice.style.display = 'block';
      notice.focus();
    }

    form.addEventListener('submit', async e => {
      e.preventDefault();
      let first = null;
      const name = document.getElementById('contact-name');
      const email = document.getElementById('contact-email');
      const type = document.getElementById('contact-type');
      const msg = document.getElementById('contact-message');
      [name, email, type, msg].forEach(clearErr);
      if (!name.value.trim()) { showErr(name,'Please enter your full name.'); first = first || name; }
      if (!email.value.trim()) { showErr(email,'Please enter your email address.'); first = first || email; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { showErr(email,'Please enter a valid email (you@email.com).'); first = first || email; }
      if (!type.value) { showErr(type,'Please tell us who you are.'); first = first || type; }
      if (!msg.value.trim()) { showErr(msg,'Please write a short message.'); first = first || msg; }
      if (first) { first.focus(); return; }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      try {
        const fd = new FormData(form);
        const nl = document.getElementById('contact-newsletter');
        fd.set('newsletter', nl && nl.checked ? 'Yes' : 'No');
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || data.success === false) throw new Error(data.message || 'Send failed');
        if (nl && nl.checked) subscribeEmail(email.value.trim());
        showNotice(
          "<strong>Thank you! Your message is on its way to Michael.</strong><br/>" +
          "You'll hear back within one business day, usually sooner. " +
          "If it's urgent, feel free to call <a href=\"tel:+13212343989\">(321) 234-3989</a> and leave a friendly message.",
          'success'
        );
        form.reset();
      } catch (err) {
        showNotice(
          "<strong>Sorry, your message didn't go through.</strong><br/>" +
          "Please try again, or reach Michael directly at <a href=\"mailto:curiouscapable@gmail.com\">curiouscapable@gmail.com</a> or <a href=\"tel:+13212343989\">(321) 234-3989</a>.",
          'error'
        );
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitOriginalText; }
    });
  }

  // ── Contact form: prefill from URL + community fields ──
  (function(){
    const type=document.getElementById('contact-type'); if(!type) return;
    const ws=document.getElementById('contact-workshop');
    const cf=document.getElementById('community-fields');
    const q=new URLSearchParams(location.search);
    if(q.get('type')&&[...type.options].some(o=>o.value===q.get('type'))) type.value=q.get('type');
    if(q.get('workshop')&&ws){const o=[...ws.options].find(o=>o.textContent.trim().startsWith(q.get('workshop')));if(o) ws.value=o.value||o.textContent;}
    const sync=()=>{if(cf) cf.hidden=!['workshop','group'].includes(type.value);};
    type.addEventListener('change',sync); sync();
  })();

  // ── Newsletter (Substack) ──
  function subscribeEmail(addr) {
    const body = new URLSearchParams({ email: addr, first_url: location.href, current_url: location.href });
    return fetch('https://curiouscapable.substack.com/api/v1/free', { method: 'POST', mode: 'no-cors', body });
  }
  document.querySelectorAll('form[data-newsletter]').forEach(nf => {
    nf.addEventListener('submit', async e => {
      e.preventDefault();
      const input = nf.querySelector('input[type="email"]');
      const btn = nf.querySelector('button');
      const addr = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) { input.focus(); return; }
      const orig = btn.textContent;
      btn.disabled = true; btn.textContent = 'Subscribing…';
      try {
        await subscribeEmail(addr);
        btn.textContent = '✓ Check your inbox to confirm';
        input.value = '';
        announce('Almost done. Check your email to confirm your subscription.');
      } catch (err) {
        window.open('https://curiouscapable.substack.com/subscribe?email=' + encodeURIComponent(addr), '_blank', 'noopener');
        btn.disabled = false; btn.textContent = orig;
      }
    });
  });

  // ── Workshop filter (services page) ──
  const wTags = document.querySelectorAll('.workshop-filter-tag');
  const wCards = document.querySelectorAll('.workshop-detail-card[data-track]');
  wTags.forEach(tag => tag.addEventListener('click', () => {
    wTags.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
    tag.classList.add('active');
    tag.setAttribute('aria-pressed','true');
    const f = tag.dataset.filter;
    wCards.forEach(c => {
      const show = f === 'all' || c.dataset.track === f;
      c.style.display = show ? '' : 'none';
    });
  }));

  // ── Testimonial carousel ──
  const carousels = document.querySelectorAll('.testimonial-carousel');
  carousels.forEach(setupCarousel);

  function setupCarousel(root) {
    const track = root.querySelector('.testimonial-slides');
    const slides = root.querySelectorAll('.testimonial-slide');
    const prev = root.querySelector('.testimonial-btn--prev');
    const next = root.querySelector('.testimonial-btn--next');
    const dotsWrap = root.querySelector('.testimonial-dots');
    if (!track || slides.length === 0) return;
    let idx = 0;
    const dots = [];
    slides.forEach((s, i) => {
      const d = document.createElement('button');
      d.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
      d.setAttribute('aria-label', 'Go to testimonial ' + (i+1));
      d.addEventListener('click', () => go(i));
      dotsWrap && dotsWrap.appendChild(d);
      dots.push(d);
    });
    function go(i) {
      idx = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('is-active', j === idx));
    }
    prev && prev.addEventListener('click', () => { go(idx - 1); restart(); });
    next && next.addEventListener('click', () => { go(idx + 1); restart(); });

    let timer;
    function start() {
      if (html.getAttribute('data-reduce-motion') === 'true') return;
      timer = setInterval(() => go(idx + 1), 11000);
    }
    function restart() { clearInterval(timer); start(); }
    start();
    root.addEventListener('mouseenter', () => clearInterval(timer));
    root.addEventListener('mouseleave', start);
  }

  // ── Reveal on scroll ──
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  // ── Smooth scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t && a.getAttribute('href') !== '#') {
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: html.getAttribute('data-reduce-motion') === 'true' ? 'auto' : 'smooth' });
      }
    });
  });
});
