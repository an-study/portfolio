import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import { Hero } from "./components/Hero";
import { SubNav } from "./components/SubNav";
import { ScrollToTopButton } from "./components/ScrollToTopButton";
import { useEffect } from "react";

function Footer() {
  return (
    <footer className="text-center text-xs text-slate-500 py-10 border-t border-slate-200">
   © {new Date().getFullYear()} A.N All rights reserved.
    </footer>
  );
}

export default function App() {

  useEffect(() => {
    // Appが描画できたことを確認してからスプラッシュを消す
    const splash = document.getElementById("splash");
    if (splash) splash.remove(); // or splash.style.display = "none";
  }, []);



  return (
<div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-300">      <Hero />
      {/* ← ここが“Heroの外”。stickyが最後まで効くようになる */}
      <SubNav />

      <main>
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}