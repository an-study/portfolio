import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
const Profile = lazy(() => import("./pages/Profile"));
const Gallery = lazy(() => import("./pages/Gallery"));
import { Hero } from "./components/Hero";
import { SubNav } from "./components/SubNav";
import { ScrollToTopButton } from "./components/ScrollToTopButton";

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
        <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
