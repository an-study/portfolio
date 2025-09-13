import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { PROFILE } from "../data/profile";


// アセットのURLを解決（Viteのbase対応）
const asset = (p: string) => {
  const base = import.meta.env.BASE_URL || "/";
  const clean = p.startsWith("/") ? p.slice(1) : p;
  return new URL(clean, window.location.origin + base).toString();
};


// Hero.tsx（上部に追加）
const SOCIAL_ICON: Record<string, { light: string; dark: string }> = {
  note:   { light: "icons/note-dark.svg",   dark: "icons/note-light.svg" },
  X:      { light: "icons/x-dark.svg",      dark: "icons/x-light.svg" },
  GitHub: { light: "icons/github-dark.svg", dark: "icons/github-light.svg" },
};

export function Hero() {
  // 0 → 1（ページ上端 → 下端）で変化する割合
  const { scrollYProgress } = useScroll();

  // ページ上 0%〜25% のスクロールで 56px → 16px に縮む
  const pad = useTransform(scrollYProgress, [0, 0.25], [56, 16]);
  // ちょっとスムーズに
  const padSpring = useSpring(pad, { stiffness: 400, damping: 40, mass: 0.6 });

  return (
    <div
      className="
        relative
        bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200
        dark:from-slate-800 dark:via-slate-900 dark:to-black
      "
    >
      {/* 放射状グラデのオーバーレイ（線形を上書きしない） */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0 opacity-80 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,.6),transparent)] dark:bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(148,163,184,.15),transparent)]
        "
      />

      <motion.div
        style={{ paddingTop: padSpring, paddingBottom: padSpring }}
        className="relative max-w-6xl mx-auto px-4 md:px-6"
      >
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-col gap-6">
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm uppercase tracking-widest text-slate-500">Portfolio</p>
                <ThemeToggle />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900 dark:text-slate-100">
                {PROFILE.name}
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mt-2">{PROFILE.title}</p>
              <p className="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl leading-relaxed">{PROFILE.summary}</p>

            {/* SNSアイコンリンク（サイズ統一＋テーマ対応） */}
              <div className="flex gap-3 mt-5 flex-wrap">
              {PROFILE.socials.map((s) => {
                const icon = SOCIAL_ICON[s.label] ?? SOCIAL_ICON["GitHub"];
                return (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="w-9 h-9 rounded-full inline-flex items-center justify-center
                                bg-slate-100 hover:bg-slate-200
                                dark:bg-slate-800 dark:hover:bg-slate-700 transition cursor-pointer"
                    aria-label={s.label} title={s.label}>
                    <img src={asset(icon.light)} alt={s.label} className="h-5 w-5 block dark:hidden object-contain" />
                    <img src={asset(icon.dark)}  alt={s.label} className="h-5 w-5 hidden dark:block object-contain" />
                  </a>
                );
              })}
            </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
