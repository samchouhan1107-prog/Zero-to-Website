/* ==================================================
   WebZoneBW SC
   WebZoneBW SC â€” Shared Site Navigation (static pages)
   One navigation experience shared with the React Home.
   - Brand â†’ Home
   - Full destination nav with active state (aria-current)
   - Theme sync with the React app (localStorage webzonebw_storehouse_theme)
   - Accessible focus states, responsive mobile menu
   - Optional breadcrumbs via <body data-breadcrumb="Home::/ | Learn::/learn.html">
   - Optional deep-title: <body data-breadcrumb-title="Flexbox Studio">
================================================== */
(function () {
  "use strict";

  var FOOTER_HTML =
    '<footer class="webzonebw-app-footer">' +
    '<div class="webzonebw-footer-inner">' +
    '<div class="webzonebw-footer-grid">' +
    '<div class="webzonebw-footer-section">' +
    '<div class="webzonebw-footer-brand">' +
    '<span class="webzonebw-footer-brand-icon" aria-hidden="true">ðŸ“š</span>' +
    '<span class="webzonebw-footer-brand-text">WebZoneBW SC</span></div>' +
    '<p>Free interactive web development platform with comprehensive tools, tutorials, and hands-on learning experiences for developers of all skill levels.</p>' +
    '<div class="webzonebw-footer-social">' +
    '<a href="https://webzonebw.in/" target="_blank" rel="noopener noreferrer" aria-label="Official Website">ðŸŒ</a>' +
    '<a href="mailto:enquiry@webzonebw.in" aria-label="Email Contact">ðŸ“§</a>' +
    '</div></div>' +
    '<div class="webzonebw-footer-section"><h3>Quick Links</h3><ul class="webzonebw-footer-links">' +
    '<li><a href="/index.html">Home</a></li>' +
    '<li><a href="/Workspace.html">Workspace</a></li>' +
    '<li><a href="/webtools.html">Web Tools</a></li>' +
    '<li><a href="/imagetools.html">Image Tools</a></li>' +
    '<li><a href="/developertools.html">Developer Tools</a></li>' +
    '<li><a href="/learn.html">Learn</a></li>' +
    '<li><a href="/blog.html">Blog</a></li>' +
    '<li><a href="/about.html">About</a></li>' +
    '</ul></div>' +
    '<div class="webzonebw-footer-section"><h3>Resources</h3><ul class="webzonebw-footer-links">' +
    '<li><a href="/privacy-policy.html">Privacy Policy</a></li>' +
    '<li><a href="/terms-of-service.html">Terms of Service</a></li>' +
    '<li><a href="/cookie-policy.html">Cookie Policy</a></li>' +
    '<li><a href="/contact.html">Contact</a></li>' +
    '<li><a href="https://webzonebw.in/" target="_blank" rel="noopener noreferrer">Official Portal</a></li>' +
    '<li><a href="https://webzonebw.in/" target="_blank" rel="noopener noreferrer">Data Transparency</a></li>' +
    '</ul></div>' +
    '<div class="webzonebw-footer-section"><h3>Learning Path</h3><ul class="webzonebw-footer-links">' +
    '<li><a href="/learn.html">Web Development Course</a></li>' +
    '<li><a href="/webtools.html">Interactive Tools</a></li>' +
    '<li><a href="/Workspace.html">Practice Environment</a></li>' +
    '<li><a href="/developertools.html">Developer Utilities</a></li>' +
    '<li><a href="/blog.html">Tutorials &amp; Articles</a></li>' +
    '</ul></div>' +
    '</div>' +
    '<div class="webzonebw-footer-bottom">' +
    '<div class="webzonebw-footer-bottom-links">' +
    '<a href="/privacy-policy.html" rel="nofollow">Privacy Policy</a>' +
    '<span class="webzonebw-footer-divider">Â·</span>' +
    '<a href="/cookie-policy.html" rel="nofollow">Cookie Policy</a>' +
    '<span class="webzonebw-footer-divider">Â·</span>' +
    '<a href="/terms-of-service.html" rel="nofollow">Terms of Service</a>' +
    '<span class="webzonebw-footer-divider">Â·</span>' +
    '<a href="/contact.html" rel="nofollow">Contact</a>' +
    '<span class="webzonebw-footer-divider">Â·</span>' +
    '<a href="https://webzonebw.in/" target="_blank" rel="noopener noreferrer">Reach Out &amp; Enquiry</a>' +
    '</div>' +
    '<p class="webzonebw-footer-copyright">&copy; 2026 WebZoneBW SC. Connected with <a href="https://webzonebw.in/">webzonebw.in</a> for inquiries and data transparency.</p>' +
    '</div>' +
    '</div></footer>';

  function renderFooter() {
    var existing = document.querySelector("footer.webzonebw-app-footer, #app-footer");
    if (existing) return; // page supplies its own footer â€” don't duplicate
    var foot = document.createElement("div");
    foot.id = "webzonebw-site-footer";
    foot.innerHTML = FOOTER_HTML;
    document.body.appendChild(foot);
  }

  var NAV_LINKS = [
    { label: "Home", href: "/index.html", match: ["/", "/index.html"] },
    { label: "Workspace", href: "/Workspace.html" },
    { label: "Web Tools", href: "/webtools.html" },
    { label: "Image Tools", href: "/imagetools.html" },
    { label: "Developer Tools", href: "/developertools.html" },
    { label: "Learn", href: "/learn.html" },
    { label: "Blog", href: "/blog.html" },
    { label: "About", href: "/about.html" },
  ];

  var THEME_KEY = "webzonebw_storehouse_theme";
  var LEGACY_THEME_KEY = "webzonebw-theme";

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || localStorage.getItem(LEGACY_THEME_KEY) || "dark";
    } catch (e) {
      return "dark";
    }
  }

  function applyTheme(theme) {
    var isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.classList.toggle("light", !isDark);
    document.body.classList.toggle("dark", isDark);
    document.body.classList.toggle("light", !isDark);
    try {
      localStorage.setItem(THEME_KEY, theme);
      localStorage.setItem(LEGACY_THEME_KEY, theme);
    } catch (e) { /* storage unavailable */ }
  }

  function currentPath() {
    var p = window.location.pathname;
    p = p.replace(/\/index\.html$/, "/");
    if (p.charAt(p.length - 1) !== "/" && !/\.html$/.test(p)) p += "/";
    return p;
  }

  function isActive(link) {
    var here = window.location.pathname.replace(/\\/g, "/");
    if (link.match) return link.match.indexOf(here) !== -1 || link.match.indexOf("/index.html") !== -1 && here === "/";
    return here === link.href || here === link.href.toLowerCase();
  }

  function buildBreadcrumbs() {
    var raw = document.body.getAttribute("data-breadcrumb");
    if (!raw) return "";
    var title = document.body.getAttribute("data-breadcrumb-title");
    var parts = raw.split("|").map(function (s) { return s.trim(); }).filter(Boolean);
    var html = '<nav class="webzonebw-breadcrumbs" aria-label="Breadcrumb"><ol>';
    parts.forEach(function (part, i) {
      var seg = part.split("::").map(function (s) { return s.trim(); });
      var label = seg[0];
      var href = seg[1];
      var isLast = i === parts.length - 1 && !title;
      if (isLast || !href) {
        html += '<li><span aria-current="page">' + label + "</span></li>";
      } else {
        html += '<li><a href="' + href + '">' + label + "</a></li>";
      }
    });
    if (title) {
      html += '<li><span aria-current="page">' + title + "</span></li>";
    }
    html += "</ol></nav>";
    return html;
  }

  function render() {
    applyTheme(getStoredTheme());

    var mount = document.getElementById("webzonebw-site-nav");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "webzonebw-site-nav";
      document.body.insertBefore(mount, document.body.firstChild);
    }

    var here = currentPath();
    var linksHtml = NAV_LINKS.map(function (link) {
      var linkPath = link.href;
      var active = here === linkPath || here === linkPath.toLowerCase() ||
        (linkPath === "/index.html" && here === "/");
      return '<li><a href="' + link.href + '"' +
        (active ? ' class="webzonebw-nav-link webzonebw-active" aria-current="page"' : ' class="webzonebw-nav-link"') +
        ">" + link.label + "</a></li>";
    }).join("");

    var brandLogo =
      '<svg viewBox="0 0 40 40" aria-hidden="true" class="webzonebw-nav-logo">' +
      '<rect x="2" y="2" width="36" height="36" rx="10" fill="url(#webzonebw-navgrad)"/>' +
      '<defs><linearGradient id="webzonebw-navgrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/>' +
      "</linearGradient></defs>" +
      '<text x="20" y="27" text-anchor="middle" font-size="18" font-weight="800" fill="#fff" font-family="Inter,system-ui,sans-serif">W</text></svg>';

    mount.innerHTML =
      '<a href="#main-content" class="webzonebw-skip-link">Skip to main content</a>' +
      '<header class="webzonebw-site-header" role="banner">' +
      '<div class="webzonebw-header-inner">' +
      '<div class="webzonebw-header-left">' +
      '<button type="button" class="webzonebw-menu-toggle" aria-label="Toggle site navigation menu" aria-expanded="false" aria-controls="webzonebw-nav-menu">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>' +
      "</button>" +
      '<a href="/" class="webzonebw-brand" aria-label="WebZoneBW SC Home">' +
      brandLogo +
      '<span class="webzonebw-brand-text"><span class="webzonebw-brand-name">WebZoneBW <em>SC</em></span>' +
      '<span class="webzonebw-brand-sub">Learn Â· Build Â· Ship</span></span></a>' +
      "</div>" +
      '<nav class="webzonebw-desktop-nav" aria-label="Primary"><ul>' + linksHtml + "</ul></nav>" +
      '<div class="webzonebw-header-right">' +
      '<button type="button" id="webzonebw-theme-toggle" class="webzonebw-theme-toggle" aria-label="Toggle light / dark theme">' +
      '<span class="webzonebw-theme-icon webzonebw-theme-moon" aria-hidden="true">ðŸŒ™</span>' +
      '<span class="webzonebw-theme-icon webzonebw-theme-sun" aria-hidden="true">â˜€ï¸</span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div id="webzonebw-nav-menu" class="webzonebw-mobile-nav" hidden><ul>' + linksHtml + "</ul></div>" +
      "</header>" +
      buildBreadcrumbs();

    // Theme toggle
    var toggle = document.getElementById("webzonebw-theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var isDark = document.documentElement.classList.contains("dark");
        applyTheme(isDark ? "light" : "dark");
      });
    }

    // Mobile menu
    var menuBtn = mount.querySelector(".webzonebw-menu-toggle");
    var menu = document.getElementById("webzonebw-nav-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.hidden;
        menu.hidden = !open;
        menuBtn.setAttribute("aria-expanded", String(open));
      });
    }

    renderFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
