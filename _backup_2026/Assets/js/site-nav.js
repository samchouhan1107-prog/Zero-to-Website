/* ==================================================
   WebZoneBW SC — Shared Site Navigation (static pages)
   One navigation experience shared with the React Home.
   - Brand → Home
   - Full destination nav with active state (aria-current)
   - Theme sync with the React app (localStorage wz_storehouse_theme)
   - Accessible focus states, responsive mobile menu
   - Optional breadcrumbs via <body data-breadcrumb="Home::/ | Learn::/learn.html">
   - Optional deep-title: <body data-breadcrumb-title="Flexbox Studio">
================================================== */
(function () {
  "use strict";

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

  var THEME_KEY = "wz_storehouse_theme";
  var LEGACY_THEME_KEY = "wz-theme";

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
    var html = '<nav class="wz-breadcrumbs" aria-label="Breadcrumb"><ol>';
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

    var mount = document.getElementById("wz-site-nav");
    if (!mount) {
      mount = document.createElement("div");
      mount.id = "wz-site-nav";
      document.body.insertBefore(mount, document.body.firstChild);
    }

    var here = currentPath();
    var linksHtml = NAV_LINKS.map(function (link) {
      var linkPath = link.href;
      var active = here === linkPath || here === linkPath.toLowerCase() ||
        (linkPath === "/index.html" && here === "/");
      return '<li><a href="' + link.href + '"' +
        (active ? ' class="wz-nav-link wz-active" aria-current="page"' : ' class="wz-nav-link"') +
        ">" + link.label + "</a></li>";
    }).join("");

    var brandLogo =
      '<svg viewBox="0 0 40 40" aria-hidden="true" class="wz-nav-logo">' +
      '<rect x="2" y="2" width="36" height="36" rx="10" fill="url(#wznavgrad)"/>' +
      '<defs><linearGradient id="wznavgrad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#8b5cf6"/>' +
      "</linearGradient></defs>" +
      '<text x="20" y="27" text-anchor="middle" font-size="18" font-weight="800" fill="#fff" font-family="Inter,system-ui,sans-serif">W</text></svg>';

    mount.innerHTML =
      '<a href="#main-content" class="wz-skip-link">Skip to main content</a>' +
      '<header class="wz-site-header" role="banner">' +
      '<div class="wz-header-inner">' +
      '<div class="wz-header-left">' +
      '<button type="button" class="wz-menu-toggle" aria-label="Toggle site navigation menu" aria-expanded="false" aria-controls="wz-nav-menu">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>' +
      "</button>" +
      '<a href="/" class="wz-brand" aria-label="WebZoneBW SC Home">' +
      brandLogo +
      '<span class="wz-brand-text"><span class="wz-brand-name">WebZoneBW <em>SC</em></span>' +
      '<span class="wz-brand-sub">Learn · Build · Ship</span></span></a>' +
      "</div>" +
      '<nav class="wz-desktop-nav" aria-label="Primary"><ul>' + linksHtml + "</ul></nav>" +
      '<div class="wz-header-right">' +
      '<button type="button" id="wz-theme-toggle" class="wz-theme-toggle" aria-label="Toggle light / dark theme">' +
      '<span class="wz-theme-icon wz-theme-moon" aria-hidden="true">🌙</span>' +
      '<span class="wz-theme-icon wz-theme-sun" aria-hidden="true">☀️</span>' +
      "</button>" +
      "</div>" +
      "</div>" +
      '<div id="wz-nav-menu" class="wz-mobile-nav" hidden><ul>' + linksHtml + "</ul></div>" +
      "</header>" +
      buildBreadcrumbs();

    // Theme toggle
    var toggle = document.getElementById("wz-theme-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        var isDark = document.documentElement.classList.contains("dark");
        applyTheme(isDark ? "light" : "dark");
      });
    }

    // Mobile menu
    var menuBtn = mount.querySelector(".wz-menu-toggle");
    var menu = document.getElementById("wz-nav-menu");
    if (menuBtn && menu) {
      menuBtn.addEventListener("click", function () {
        var open = menu.hidden;
        menu.hidden = !open;
        menuBtn.setAttribute("aria-expanded", String(open));
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
