import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { asset, loadLottie } from "./lottie";

export default function AnimatedLogo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    let anim: { destroy: () => void } | null = null;
    if (reduce) return; // respect prefers-reduced-motion

    let mounted = true;
    (async () => {
      try {
        const lottie = await loadLottie();
        if (!mounted || !containerRef.current) return;
        // Place your Lottie JSON at: public/lottie/logo.json
        anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          path: asset("lottie/logo.json"),
        });
      } catch {
        // noop; component renders a static fallback box
      }
    })();

    return () => {
      mounted = false;
      if (anim) anim.destroy();
    };
  }, [reduce]);

  return (
    <div
      className={(className ? className + " " : "") + "relative w-full h-full overflow-hidden"}
      role="img"
      aria-label="Animated logo"
    >
      {/* background panel */}
      <div className="absolute inset-0 rounded-[16px] bg-current opacity-5" />
      {/* lottie canvas fills box */}
      <div ref={containerRef} className="absolute inset-0" />
      {/* border overlay */}
      <div className="absolute inset-0 rounded-[14px] border border-current/15 pointer-events-none" />
    </div>
  );
}
