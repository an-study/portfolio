import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

// Reactが描画できたらスプラッシュを外す
const s = document.getElementById("splash"); if (s) s.style.display = "none";