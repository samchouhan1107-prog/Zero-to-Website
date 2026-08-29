/* ==================================================
   WZ Storehouse
   main.js
================================================== */

const loadDarkModeScript = () => {
    if (document.getElementById("darkmode-script")) {
        return;
    }

    const currentScript = document.currentScript || document.querySelector('script[src*="main.js"]');
    const currentScriptSrc = currentScript && currentScript.src ? currentScript.src : "";
    const darkModeScriptUrl = currentScriptSrc
        ? new URL("darkmode.js", currentScriptSrc).href
        : new URL("/Assets/js/darkmode.js", window.location.origin).href;

    const script = document.createElement("script");
    script.id = "darkmode-script";
    script.src = darkModeScriptUrl;
    script.async = false;
    document.head.appendChild(script);
};

const initTabs = () => {
    const tabWrappers = document.querySelectorAll(".tabs-wrapper");

    tabWrappers.forEach((tabsWrapper) => {
        const tabs = tabsWrapper.querySelectorAll(".tab-button");
        const panels = tabsWrapper.querySelectorAll(".tab-panel");

        if (!tabs.length || !panels.length) {
            return;
        }

        const activateTab = (selectedTab) => {
            tabs.forEach((btn) => {
                const isActive = btn === selectedTab;
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-selected", isActive ? "true" : "false");
            });

            panels.forEach((panel) => {
                panel.classList.toggle("active", panel.id === selectedTab.dataset.panel);
            });
        };

        const initialTab = tabsWrapper.querySelector(".tab-button.active") || tabs[0];
        if (initialTab) {
            activateTab(initialTab);
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => activateTab(tab));

            tab.addEventListener("keydown", (event) => {
                let nextIndex = null;

                if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    nextIndex = (index + 1) % tabs.length;
                } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    nextIndex = (index - 1 + tabs.length) % tabs.length;
                }

                if (nextIndex !== null) {
                    event.preventDefault();
                    activateTab(tabs[nextIndex]);
                    tabs[nextIndex].focus();
                }
            });
        });
    });
};

const renderCommandCenter = (panel) => {
    if (!panel) return;

    panel.innerHTML = `
        <div class="settings-panel-header">
            <div class="header-copy">
                <span class="command-icon">⚙</span>
                <div>
                    <p class="command-subtitle">SETTINGS</p>
                    <h3>Command Center</h3>
                </div>
            </div>
            <button id="closeSettingsBtn" type="button" class="close-btn" aria-label="Close command center">✖</button>
        </div>

        <section class="command-section">
            <p class="command-section-heading">Appearance</p>
            <button id="darkModeBtn" type="button" class="command-btn">🌙 Dark Mode</button>
            <button id="fontSizeBtn" type="button" class="command-btn">🔤 Font Size</button>
            <button id="languageBtn" type="button" class="command-btn">🌐 Language</button>
        </section>

        <div class="command-divider"></div>

        <section class="command-section">
            <p class="command-section-heading">Learning</p>
            <button id="readingModeBtn" type="button" class="command-btn">📖 Reading Mode</button>
            <button id="notesBtn" type="button" class="command-btn">📝 Notes</button>
            <button id="bookmarksBtn" type="button" class="command-btn">🔖 Bookmarks</button>
            <button id="progressBtn" type="button" class="command-btn">📈 Progress</button>
        </section>

        <div class="command-divider"></div>

        <section class="command-section">
            <p class="command-section-heading">Utilities</p>
            <button id="calculatorBtn" type="button" class="command-btn">🧮 Calculator</button>
            <button id="cheatSheetsBtn" type="button" class="command-btn">📑 Cheat Sheets</button>
            <button id="shortcutsBtn" type="button" class="command-btn">⌨ Shortcuts</button>
        </section>

        <div class="command-divider"></div>

        <section class="command-section">
            <p class="command-section-heading">Support</p>
            <button id="helpBtn" type="button" class="command-btn">❓ Help</button>
            <button id="aboutBtn" type="button" class="command-btn">ℹ About</button>
        </section>
    `;
};

const attachCommandBackdrop = () => {
    let backdrop = document.querySelector('.settings-panel-backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'settings-panel-backdrop';
        document.body.appendChild(backdrop);
    }
    return backdrop;
};

document.addEventListener("DOMContentLoaded", () => {

    const settingsBtn = document.getElementById("settingsBtn");
    const settingsPanel = document.getElementById("settingsPanel");
    const roadmapButtons = document.querySelectorAll(".roadmap-btn");
    const currentUrl = new URL(window.location.href);
    const siteRootHref = currentUrl.href.replace(/\/Chapters\/.*$/, "/");
    const rootUrl = new URL("index.html", siteRootHref).href;
    const introUrl = new URL("Chapters/Chapter-00-Introduction/index.html", siteRootHref).href;

    renderCommandCenter(settingsPanel);
    loadDarkModeScript();
    initTabs();

    const backdrop = attachCommandBackdrop();

    if (settingsBtn) {
        settingsBtn.textContent = "⚙ Settings";
        settingsBtn.setAttribute("aria-label", "Open settings panel");
    }

    const closeSettingsBtn = document.getElementById("closeSettingsBtn");
    if (closeSettingsBtn && settingsPanel && backdrop) {
        const hidePanel = () => {
            settingsPanel.classList.remove("show");
            backdrop.classList.remove("show");
        };

        closeSettingsBtn.addEventListener("click", hidePanel);
        backdrop.addEventListener("click", hidePanel);
    }

    if (settingsBtn && settingsPanel && backdrop) {
        settingsBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            const isOpen = settingsPanel.classList.toggle("show");
            backdrop.classList.toggle("show", isOpen);
        });
    }

    document.querySelectorAll("nav a").forEach((link) => {
        const label = link.textContent.trim().toLowerCase();

        if (label === "home" || label === "🏠 home") {
            link.setAttribute("href", rootUrl);
        }

        if (label === "start learning") {
            link.setAttribute("href", introUrl);
        }
    });

    roadmapButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetUrl = button.getAttribute("data-url");
            if (targetUrl) {
                window.location.href = targetUrl;
            }
        });
    });

});