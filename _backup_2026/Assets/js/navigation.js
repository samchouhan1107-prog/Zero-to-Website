/* ==================================================
   WZ Storehouse - navigation.js
   Author  : Sameer Chouhan
   Version : 2.0 (Resilient URL & Path Matching)
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const cleanPath = (p) => {
        if (!p) return "";
        let decoded = p;
        try { decoded = decodeURIComponent(p); } catch (e) {}
        decoded = decoded.replace(/([a-zA-Z0-9])20([a-zA-Z0-9])/g, "$1 $2");
        return decoded.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
    };

    const currentPath = cleanPath(window.location.pathname);
    document.querySelectorAll("nav a, .chapter-nav-links a").forEach((link) => {
        const href = link.getAttribute("href");
        if (!href) return;
        const cleanedHref = cleanPath(href);
        if (currentPath.endsWith(cleanedHref) || cleanedHref.endsWith(currentPath)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});
