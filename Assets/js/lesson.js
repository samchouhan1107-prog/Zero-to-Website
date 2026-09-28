/* ==================================================
   WZ Storehouse - lesson.js
   Author  : Sameer Chouhan
   Version : 2.0
================================================== */

function runHTML() {
    const editor = document.getElementById("htmlEditor");
    const preview = document.getElementById("previewWindow");
    if (!editor || !preview) return;

    preview.srcdoc = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: system-ui, sans-serif; padding: 16px; margin: 0; color: #1e293b; }
    </style>
</head>
<body>
    ${editor.value}
</body>
</html>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("runCodeBtn") || document.querySelector("button[onclick='runHTML()']");
    if (runBtn) {
        runBtn.addEventListener("click", runHTML);
    }
    // Initial run on load if elements present
    if (document.getElementById("htmlEditor") && document.getElementById("previewWindow")) {
        runHTML();
    }
});
