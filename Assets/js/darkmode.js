/* ==================================================
   WebZoneBW SC
   darkmode.js
================================================== */

const initDarkMode = () => {
    const darkModeBtn = document.getElementById("darkModeBtn");
    const body = document.body;
    const storedTheme = localStorage.getItem("webzonebw_storehouse_theme") || localStorage.getItem("webzonebw-theme") || "dark";

    const setButtonLabel = (isDark) => {
        if (!darkModeBtn) {
            return;
        }
        darkModeBtn.textContent = isDark ? "â˜€ï¸ Volcanic Porcelain" : "ðŸŒ‹ Red Volcanic";
        darkModeBtn.setAttribute("aria-label", isDark ? "Switch to Volcanic Porcelain (Light)" : "Switch to Red Volcanic (Dark)");
    };

    if (storedTheme === "dark") {
        body.classList.add("dark");
    } else {
        body.classList.remove("dark");
    }

    setButtonLabel(body.classList.contains("dark"));

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            body.classList.toggle("dark");

            const isDark = body.classList.contains("dark");
            const themeValue = isDark ? "dark" : "light";
            localStorage.setItem("webzonebw_storehouse_theme", themeValue);
            localStorage.setItem("webzonebw-theme", themeValue);
            setButtonLabel(isDark);
        });
    }
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDarkMode);
} else {
    initDarkMode();
}
