import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

// GitHub Pages deep-link normalization: '/?/<path>' -> '<base>/<path>'
(() => {
  const l = window.location;
  if (l.search.startsWith("?/")) {
    const decoded = l.search
      .slice(1)
      .split("&")
      .map((s) => s.replace(/~and~/g, "&"))
      .join("?");
    const base = l.pathname.replace(/\/$/, "");
    window.history.replaceState(null, "", base + decoded + l.hash);
  }
})();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);
