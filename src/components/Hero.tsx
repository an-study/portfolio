import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";


const asset = (p: string) => {
  const base = (import.meta as any).env?.BASE_URL || "/";
  const clean = p.startsWith("/") ? p.slice(1) : p;
  return new URL(clean, window.location.origin + base).toString();
};


const SOCIALS = [
  /*
  {
    label: "note",
    href: "https://note.com/nishigaki_ao",
    light: "icons/note-dark.svg", // ← ライト背景用（黒/濃色）
    dark:  "icons/note-light.svg", // ← ダーク背景用（白/淡色）
  },
  */
  /*{
    label: "X",
    href: "https://x.com/your_account",
    light: "icons/x-dark.svg",
    dark:  "icons/x-light.svg",
  },
  */
  {
    label: "GitHub",
    href: "https://github.com/an-study",
    light: "icons/github-dark.svg",
    dark:  "icons/github-light.svg",
  },
];


const PROFILE = {
  name: "A.N",
  title: "PdM / UX Designer",
  summary:
    "WebデザイナーからUI / UX デザイナーを経てPdMへキャリア転身。主に業務システムの開発に関わり、現在は社内システムのUX設計・要件定義を推進。業務効率と価値創出の実現を目標にプロジェクトを推進しています。PMP®︎とHCDスペシャリスト資格保有。AIを活用し独自サービスの開発も行っています。",
  links: [
    { label: "note", href: "https://note.com/nishigaki_ao", icon: "icons/note.svg" },
    { label: "X", href: "https://x.com/your_account", icon: "icons/x.svg" },
    { label: "GitHub", href: "https://github.com/an-study", icon: "icons/github.svg" },
  ],
};

export function Hero() {
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 240], [48, 16]); // px

  return (
        <div className="bg-gradient-to-br 
                from-slate-50 via-slate-100 to-slate-200
                dark:from-slate-800 dark:via-slate-900 dark:to-black">
                  <motion.div style={{ paddingTop: pad, paddingBottom: pad }} className="max-w-6xl mx-auto px-4 md:px-6">
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
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full inline-flex items-center justify-center
                            bg-slate-100 hover:bg-slate-200
                            dark:bg-slate-800 dark:hover:bg-slate-700
                            transition cursor-pointer"
                  aria-label={s.label}
                  title={s.label}
                >
                  {/* ライト用ロゴ */}
                  <img
                    src={asset(s.light)}
                    alt={s.label}
                    className="h-5 w-5 block dark:hidden object-contain"
                    loading="lazy"
                  />
                  {/* ダーク用ロゴ（ダーク時のみ表示） */}
                  <img
                    src={asset(s.dark)}
                    alt={s.label}
                    className="h-5 w-5 hidden dark:block object-contain"
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}