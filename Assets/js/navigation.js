/* ==================================================
   WZ Storehouse - navigation.js
   Author  : Sameer Chouhan
   Version : 2.0
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    document.querySelectorAll("nav a, .chapter-nav-links a").forEach((link) => {
        const href = link.getAttribute("href");
        if (href && currentPath.endsWith(href)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
});
