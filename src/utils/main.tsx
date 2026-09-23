import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./AuthContext.tsx";
import "./index.css";

// Safely trap third-party AdSense TagError (e.g. availableWidth=0 in sandboxes or before layout)
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    if (
      event?.message &&
      (event.message.includes("availableWidth=0") ||
        event.message.includes("No slot size"))
    ) {
      // Prevent uncaught error reporting for third-party ad script timing
      event.preventDefault();
      console.warn("Handled AdSense viewport sizing notice:", event.message);
    }
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
