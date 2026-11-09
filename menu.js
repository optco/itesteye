(function() {
    function initMenu() {
        // 1. Prevent duplicate injection
        if (document.getElementById('hamburgerMenu')) {
            return;
        }

        // 2. Auto-load Font Awesome if not already present
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            document.head.appendChild(fa);
        }

        // 2b. Auto-load Barlow Condensed if not already present
        if (!document.querySelector('link[href*="Barlow+Condensed"]')) {
            const bf = document.createElement('link');
            bf.rel = 'stylesheet';
            bf.href = 'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&display=swap';
            document.head.appendChild(bf);
        }

        // 3. Inject CSS
        const style = document.createElement('style');
        style.textContent = `
            .hamburger-btn, .hamburger-menu {
                --hm-card: #fff;
                --hm-text: #14202b;
                --hm-line: #d9e0e6;
                --hm-accent: #0284C7;
                --hm-accent-h: #0EA5E9;
                --hm-accent-t: #fff;
                --hm-shadow: 0 4px 12px rgba(20, 32, 43, 0.12);
            }
            @media (prefers-color-scheme: dark) {
                :root:not([data-theme="light"]) .hamburger-btn,
                :root:not([data-theme="light"]) .hamburger-menu {
                    --hm-card: #18222b;
                    --hm-text: #e8eef3;
                    --hm-line: #2b3a46;
                    --hm-accent: #35b7c2;
                    --hm-accent-h: #67d3dc;
                    --hm-accent-t: #06242a;
                    --hm-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                }
            }
            :root[data-theme="dark"] .hamburger-btn,
            :root[data-theme="dark"] .hamburger-menu {
                --hm-card: #18222b;
                --hm-text: #e8eef3;
                --hm-line: #2b3a46;
                --hm-accent: #35b7c2;
                --hm-accent-h: #67d3dc;
                --hm-accent-t: #06242a;
                --hm-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
            }
            .hamburger-btn {
                position: fixed;
                top: calc(16px + env(safe-area-inset-top, 0px));
                right: 16px;
                z-index: 10000;
                width: 48px;
                height: 48px;
                padding: 0;
                border-radius: 999px;
                border: 1px solid var(--hm-accent);
                background: var(--hm-accent);
                color: var(--hm-accent-t);
                font: 600 1.5rem/1 'Barlow Condensed', sans-serif;
                cursor: pointer;
                box-shadow: var(--hm-shadow);
                transition: background .15s, transform .1s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .hamburger-btn:active {
                background: var(--hm-accent-h);
                transform: scale(.95);
            }
            @media (hover: hover) {
                .hamburger-btn:hover { background: var(--hm-accent-h); }
            }
            .hamburger-menu {
                position: fixed;
                top: calc(72px + env(safe-area-inset-top, 0px));
                right: 16px;
                z-index: 9999;
                width: min(280px, calc(100vw - 32px));
                max-height: calc(100vh - 90px);
                overflow-y: auto;
                background: var(--hm-card);
                border: 1px solid var(--hm-line);
                border-radius: 16px;
                padding: 8px;
                box-shadow: var(--hm-shadow);
                opacity: 0;
                visibility: hidden;
                transform: translateY(-8px);
                transition: opacity .15s, transform .15s, visibility .15s;
            }
            .hamburger-menu.active {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            .menu-links {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            .menu-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 14px;
                border-radius: 10px;
                color: var(--hm-text);
                text-decoration: none;
                font-family: 'Barlow Condensed', sans-serif;
                font-size: 1.1rem;
                font-weight: 600;
                letter-spacing: .03em;
                text-transform: uppercase;
                transition: background .15s, color .15s;
            }
            .menu-item i {
                width: 1.4em;
                text-align: center;
                color: var(--hm-accent);
                transition: color .15s;
            }
            .menu-item:active {
                background: var(--hm-accent);
                color: var(--hm-accent-t);
            }
            .menu-item:active i { color: var(--hm-accent-t); }
            @media (hover: hover) {
                .menu-item:hover {
                    background: var(--hm-accent);
                    color: var(--hm-accent-t);
                }
                .menu-item:hover i { color: var(--hm-accent-t); }
            }
            .hamburger-btn:focus-visible,
            .menu-item:focus-visible {
                outline: 3px solid var(--hm-accent);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);

        // 4. Inject HTML
        const menuHTML = `
            <button id="menuBtn" class="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
                <i class="fas fa-bars"></i>
            </button>
            <div id="hamburgerMenu" class="hamburger-menu">
                <div class="menu-links">
                    <a class="menu-item" href="calc.html">
                        <i class="fa fa-random" aria-hidden="true"></i> Calculator
                    </a>
                    <a class="menu-item" href="/letter" target="_blank" rel="noopener noreferrer" title="A valid sick note must be issued and signed by a medical practitioner registered with the HPCSA">
                        <i class="fas fa-file-pen" aria-hidden="true"></i> Letter Maker
                    </a>
                    <a class="menu-item" href="https://itesteye.com/therapeutics" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-prescription-bottle-medical" aria-hidden="true"></i> Therapeutics
                    </a>
                    <a class="menu-item" href="https://theattn.com/poster" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-image" aria-hidden="true"></i> Poster Maker
                    </a>
                    <a class="menu-item" href="https://theattn.com/invoice" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-file-invoice-dollar" aria-hidden="true"></i> Invoice Maker
                    </a>
                    <a class="menu-item" href="https://theattn.com" target="_blank" rel="noopener noreferrer">
                        <i class="fa-solid fa-newspaper" aria-hidden="true"></i> News
                    </a>
                    <a class="menu-item" href="https://amslergr.id/" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-eye" aria-hidden="true"></i> Optometry Charts
                    </a>
                    <a class="menu-item" href="https://gbps.me" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-magnifying-glass" aria-hidden="true"></i> More Tools
                    </a>
                    <a class="menu-item" href="https://shamsi.co.za" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-house-chimney" aria-hidden="true"></i> Properties
                    </a>
                    <a class="menu-item" href="https://instagram.com/itesteye" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-user" aria-hidden="true"></i> Follow Akhtar
                    </a>
                </div>
            </div>
        `;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = menuHTML;
        document.body.appendChild(wrapper);

        // 5. Add Event Listeners
        const btn = document.getElementById('menuBtn');
        const menu = document.getElementById('hamburgerMenu');
        const icon = btn.querySelector('i');

        function closeMenu() {
            menu.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            icon.className = 'fas fa-bars';
        }

        function toggleMenu(e) {
            if (e) e.stopPropagation();
            const isActive = menu.classList.toggle('active');
            btn.setAttribute('aria-expanded', isActive);
            icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
        }

        btn.addEventListener('click', toggleMenu);

        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && !btn.contains(e.target)) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeMenu();
        });

        menu.querySelectorAll('.menu-item').forEach(link => {
            link.addEventListener('click', function() {
                if (this.getAttribute('target') !== '_blank') {
                    closeMenu();
                }
            });
        });
    }

    // Wait for the DOM to be fully parsed before executing, preventing null body errors
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenu);
    } else {
        initMenu();
    }
})();
