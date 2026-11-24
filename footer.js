(function() {
  function init() {
    // --- UNIFIED STYLES (Bumped to v10 to clear cache) ---
    if (!document.getElementById('pl-bottombar-styles-v10')) {
      const old9 = document.getElementById('pl-bottombar-styles-v9');
      if (old9) old9.remove();
      const old8 = document.getElementById('pl-bottombar-styles-v8');
      if (old8) old8.remove();
      const old = document.getElementById('pl-bottombar-styles-v7');
      if (old) old.remove();
      const old6 = document.getElementById('pl-bottombar-styles-v6');
      if (old6) old6.remove();
      const old5 = document.getElementById('pl-bottombar-styles-v5');
      if (old5) old5.remove();

      const style = document.createElement('style');
      style.id = 'pl-bottombar-styles-v10';
      style.textContent = `
        :root {
          --pl-bar-height: 30px;
          --pl-glass-bg: rgba(255, 255, 255, 0.55);
          --pl-glass-border: rgba(255, 255, 255, 0.35);
          --pl-glass-shadow: 0 -4px 24px rgba(0, 0, 0, 0.06);
          --pl-text: #111111;
        }
        @media (prefers-color-scheme: dark) {
          :root {
            --pl-glass-bg: rgba(15, 15, 20, 0.5);
            --pl-glass-border: rgba(255, 255, 255, 0.08);
            --pl-glass-shadow: 0 -4px 24px rgba(0, 0, 0, 0.35);
            --pl-text: #f2f2f2;
          }
        }

        /* --- Fixed Bottom Bar (frosted glass) --- */
        #pl-bottombar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: calc(var(--pl-bar-height) + env(safe-area-inset-bottom, 0px));
          padding: 0 20px env(safe-area-inset-bottom, 0px);
          box-sizing: border-box;
          z-index: 99999;
          display: flex;
          align-items: center;
          background: var(--pl-glass-bg);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          backdrop-filter: blur(14px) saturate(160%);
          border-top: 1px solid var(--pl-glass-border);
          box-shadow: var(--pl-glass-shadow);
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        #pl-bottombar.show {
          transform: translateY(0);
        }
        
        /* Link takes available space, but allows shrinking for ellipsis */
        #pl-bottombar a {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--pl-text);
          flex: 1;
          min-width: 0; 
        }
        
        #pl-bottombar .pl-logo {
          display: block;
          width: 50px;
          height: auto;
          max-height: 24px;
          object-fit: contain;
          margin-right: 12px;
          user-select: none;
          flex-shrink: 0;
        }
        
        #pl-page-title {
          font-size: 15px;
          font-weight: 600;
          color: var(--pl-text);
          font-family: "Barlow Condensed", sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* --- Right Side Container (Copyright + Counter) --- */
        #pl-bar-right {
          display: flex;
          align-items: center;
          gap: 12px;
          font: 600 14px "Barlow Condensed", sans-serif;
          color: var(--pl-text);
          opacity: 0.85;
          white-space: nowrap;
          margin-left: auto; /* This reliably pushes the container to the far right */
          flex-shrink: 0;    /* Prevents the copyright/counter from being squished */
        }
        #pl-copyright {
          font-size: 13px;
          opacity: 0.9;
        }

        /* --- Top-Left Home Icon --- */
        #pl-home {
          position: fixed;
          top: calc(12px + env(safe-area-inset-top, 0px));
          left: 12px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 16px;
          text-decoration: none;
          color: var(--pl-text);
          background: var(--pl-glass-bg);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          backdrop-filter: blur(14px) saturate(160%);
          border: 1px solid var(--pl-glass-border);
          z-index: 99999;
          transition: transform 0.2s ease;
        }
        #pl-home:hover {
          transform: scale(1.1);
        }
      `;
      document.head.appendChild(style);
    }

    // --- BOTTOM BAR ---
    if (!document.getElementById('pl-bottombar')) {
      const rawTitle = document.title || (document.querySelector('title') ? document.querySelector('title').textContent : '');
      const cleanTitle = rawTitle.trim();
      const pageTitle = cleanTitle || window.location.pathname.split('/').pop().replace('.html', '') || 'attn:invoice';

      document.body.style.paddingBottom = 'calc(30px + env(safe-area-inset-bottom, 0px))';

      const bottombar = document.createElement('div');
      bottombar.id = 'pl-bottombar';

      const link = document.createElement('a');
      link.href = '/index.html';
      link.rel = 'noopener';
      link.title = 'Home';

      const titleEl = document.createElement('span');
      titleEl.id = 'pl-page-title';
      titleEl.textContent = pageTitle;

      link.appendChild(titleEl);
      bottombar.appendChild(link);

      // Load Font Awesome only if the page doesn't already have it
      if (!document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
        document.head.appendChild(fa);
      }

      // Top-left home icon
      const homeLink = document.createElement('a');
      homeLink.id = 'pl-home';
      homeLink.href = '/index.html';
      homeLink.title = 'Home';
      homeLink.setAttribute('aria-label', 'Home');
      homeLink.innerHTML = '<i class="fas fa-home"></i>';
      document.body.appendChild(homeLink);

      // --- GLOBAL COPYRIGHT CONTAINER (Shows on ALL domains) ---
      const rightContainer = document.createElement('div');
      rightContainer.id = 'pl-bar-right';

      const copyright = document.createElement('span');
      copyright.id = 'pl-copyright';
      copyright.innerHTML = '&copy; 2026 iTestEye.com All rights reserved';
      
      rightContainer.appendChild(copyright);
      bottombar.appendChild(rightContainer);

      document.body.appendChild(bottombar);

      // --- VISIT COUNTER (Domain Restricted) ---
      if (/(^|\.)itesteye\.com$/.test(location.hostname)) {
        const COUNTER_URL = 'https://counter.tan360.workers.dev/';
        
        const counter = document.createElement('span');
        counter.id = 'pl-visits';
        rightContainer.appendChild(counter); // Appends next to the copyright

        const page = location.pathname;
        let isNew = false;
        try {
          const k = 'pv:' + page;
          if (!sessionStorage.getItem(k)) { sessionStorage.setItem(k, '1'); isNew = true; }
        } catch (e) {}

        fetch(COUNTER_URL + '?p=' + encodeURIComponent(page), { method: isNew ? 'POST' : 'GET' })
          .then(r => r.json())
          .then(d => {
            if (typeof d.n === 'number') counter.textContent = d.n.toLocaleString('en-ZA') + ' visits';
          })
          .catch(() => {});
      }

      // Logo: inserted before the title only if /logo.png actually loads
      const probe = new Image();
      probe.onload = function() {
        if (!probe.naturalWidth) return;
        probe.className = 'pl-logo';
        probe.alt = '';
        probe.draggable = false;
        if (titleEl.parentNode) {
          titleEl.parentNode.insertBefore(probe, titleEl);
        }
      };
      probe.onerror = function() { /* missing logo: render nothing */ };
      probe.src = '/fav/android-chrome-192x192.png';

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bottombar.classList.add('show');
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
