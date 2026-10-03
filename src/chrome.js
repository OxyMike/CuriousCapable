/* ============================================================
   Curious & Capable — Site chrome (nav + footer)
   Injected here, loaded BEFORE scripts.js so handlers find elements.
   ============================================================ */

(function () {
  const SKIP = `<a href="#main-content" class="skip-link">Skip to main content</a>`;

  const NAV = `
    <nav class="nav" aria-label="Main navigation">
      <div class="nav__inner">
        <a href="index.html" class="nav__logo" aria-label="Curious and Capable home">
          <span class="nav__logo-mark"><img src="assets/logo-mark.png" alt=""/></span>
          <span class="nav__logo-text">Curious &amp; Capable<small>Stay Curious. Stay Capable.</small></span>
        </a>
        <button class="nav__hamburger" aria-controls="nav-menu" aria-expanded="false" aria-label="Toggle navigation menu">
          <span></span><span></span><span></span>
        </button>
        <div class="nav__menu" id="nav-menu">
          <ul class="nav__links" role="list">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <a href="contact.html" class="btn btn--primary nav__cta">Get Started</a>
        </div>
      </div>
    </nav>`;

  const FOOTER = `
    <footer class="footer" aria-label="Site footer">
      <div class="footer__inner container">
        <div class="footer__top">
          <div class="footer__brand">
            <div class="footer__brand-logo">
              <span class="footer__brand-mark"><img src="assets/logo-mark.png" alt=""/></span>
              <div>
                <div class="footer__brand-name">Curious &amp; Capable</div>
                <div class="footer__tagline">Stay Curious. Stay Capable.</div>
              </div>
            </div>
            <p class="footer__about">Patient, human technology help for older adults in Central Florida: small-group workshops, in-home visits, and ongoing support for senior living communities. Led by a licensed healthcare professional.</p>
            <div class="footer__socials">
              <a href="https://instagram.com/curiouscapable" class="footer__social" aria-label="Follow Curious &amp; Capable on Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.3" fill="currentColor"/></svg>
                <span>@CuriousCapable</span>
              </a>
              <a href="https://www.youtube.com/@CuriousandCapable" class="footer__social" aria-label="Subscribe to Curious &amp; Capable on YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" stroke-width="2"/><path d="M10 9.5l5 2.5-5 2.5z" fill="currentColor"/></svg>
                <span>@CuriousandCapable</span>
              </a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About</a></li>
              <li><a href="services.html">Services &amp; Workshops</a></li>
              <li><a href="shop.html">Shop</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Get in touch</h4>
            <ul>
              <li><a href="mailto:curiouscapable@gmail.com">curiouscapable@gmail.com</a></li>
              <li><a href="tel:+13212343989">(321) 234-3989</a></li>
              <li>Central Florida</li>
              <li>Mon–Fri, 9am–5pm</li>
            </ul>
          </div>
          <div class="footer__newsletter">
            <h4>Tips by email</h4>
            <p style="font-size:.92rem;margin-bottom:1rem;color:rgba(252,248,236,.78);">A short, friendly note when we publish something useful. No spam.</p>
            <form data-newsletter>
              <label class="sr-only" for="footer-email">Email address</label>
              <input type="email" id="footer-email" placeholder="you@email.com" required />
              <button type="submit" class="btn btn--primary" style="width:100%;min-height:48px;font-size:.95rem;padding:.7rem 1rem;">Subscribe</button>
            </form>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© 2026 Curious &amp; Capable. All rights reserved.</span>
          <span>Made with care in Central Florida.</span>
        </div>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML('afterbegin', SKIP + NAV);
  document.body.insertAdjacentHTML('beforeend', FOOTER);
})();
