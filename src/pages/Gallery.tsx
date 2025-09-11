import React, { useMemo, useState } from "react";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { Monitor, Image as ImageIcon, ExternalLink, X, PlayCircle } from "lucide-react";
import { TogglePills } from "../components/TogglePills";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCharacter from "../components/AnimatedCharacter";

/** 画像パス -> 絶対URL（GitHub Pages /portfolio/ 対応） */
const asset = (p: string) => {
  const base = (import.meta as any).env?.BASE_URL || "/";
  const clean = p.startsWith("/") ? p.slice(1) : p;
  return new URL(clean, window.location.origin + base).toString();
};

/** データ型 */
type IllustItem = { kind: "illust"; title: string; thumb: string; tags: string[]; href: string };
type SystemItem = { kind: "system"; title: string; desc: string; href: string; tags?: string[]; thumb?: string };
type MotionItem = { kind: "motion"; title: string; desc?: string; tags?: string[] };
type Item = IllustItem | SystemItem | MotionItem;

/** サンプルデータ */
const ITEMS: Item[] = [
  { kind: "illust", title: "Playful Bird", thumb: "illust/sample-01.jpg", tags: ["AI Illustration","Character"], href: "illust/sample-01.jpg" },
  { kind: "illust", title: "Night City",   thumb: "illust/sample-02.jpg", tags: ["AI Illustration","Background"], href: "illust/sample-02.jpg" },

  // ← ここが “動くイラスト（Lottie風）”
  { kind: "motion", title: "Animated Character", desc: "Framer Motion / SVG Animated Face", tags: ["Motion","SVG"] },

  { kind: "system", title: "Team ToDo Board", desc: "Drag & drop Kanban for quick progress sharing.", href: "https://example.com/app2", tags: ["Tool"] },
  // サンプル画像がなければ thumb は省略OK（プレースホルダ表示）
  { kind: "system", title: "Attendance Visualizer", desc: "Lightweight UI to share office/WFH schedule.", href: "https://example.com/app1", tags: ["Internal"], thumb: "illust/sample-03.jpg" },
];

/** セクション */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 md:mb-8">{title}</h2>
    {children}
  </section>
);

/** アニメーション定義（入場・退場） */
const itemV = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show:   { opacity: 1, y: 0,  scale: 1.0 },
};

type Tab = "all" | "illust" | "system" | "motion";

export default function Gallery() {
  const [tab, setTab] = useState<Tab>("all");
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);

  const filtered = useMemo(() => {
    if (tab === "all") return ITEMS;
    return ITEMS.filter((it) => it.kind === tab);
  }, [tab]);

  const openLightbox = (src: string, title: string) => setLightbox({ src, title });
  const closeLightbox = () => setLightbox(null);

  return (
    <>
      <Section title="Job Gallery">
        {/* トグル（All / Illustrations / Motion / Systems） */}
        <div className="mb-6">
          <TogglePills
            options={[
              { value: "all", label: "All" },
              { value: "illust", label: "Illustrations" },
              { value: "motion", label: "Motion" },
              { value: "system", label: "Systems" },
            ]}
            value={tab}
            onChange={setTab}
          />
        </div>

        {/* マソンリ：columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          <AnimatePresence mode="popLayout">
            {filtered.map((it, i) => {
              const isIllust = it.kind === "illust";
              const isSystem = it.kind === "system";
              const isMotion = it.kind === "motion";

              const thumbSrc =
                isIllust
                  ? asset((it as IllustItem).thumb)
                  : isSystem && (it as SystemItem).thumb
                  ? asset((it as SystemItem).thumb!)
                  : null;

              const href = isIllust ? asset((it as IllustItem).href) : isSystem ? (it as SystemItem).href : undefined;

              return (
                <motion.div
                  key={`${it.kind}:${it.title}`}
                  className="mb-6 break-inside-avoid"
                  variants={itemV}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.25 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, delay: (i % 8) * 0.03, ease: "easeOut" }}
                >
                  <Card className="flex flex-col">
                    {/* メディア */}
                    <div className="relative overflow-hidden rounded-xl mb-3 bg-slate-100 dark:bg-slate-800 grid place-items-center
                                    aspect-[4/3]">
                      {/* 種別バッジ（白黒統一） */}
                      <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold
                                       bg-white text-slate-900 border border-slate-300
                                       dark:bg-slate-900 dark:text-white dark:border-slate-600">
                        {isIllust ? <ImageIcon size={12}/> : isSystem ? <ExternalLink size={12}/> : <PlayCircle size={12}/>}
                        {isIllust ? "Illustration" : isSystem ? "System" : "Motion"}
                      </span>

                      {/* 種別ごとの中身 */}
                      {isIllust ? (
                        <motion.img
                          src={thumbSrc!}
                          alt={it.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.2 }}
                        />
                      ) : isSystem ? (
                        thumbSrc ? (
                          <motion.img
                            src={thumbSrc}
                            alt={it.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.2 }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-slate-200/80 to-slate-300/60 dark:from-slate-700/60 dark:to-slate-800/60 grid place-items-center">
                            <Monitor className="opacity-60" size={40} />
                          </div>
                        )
                      ) : (
                        // Motion（ここに“動くキャラ”）
                        <div className="h-full w-full p-4">
                        <AnimatedCharacter className="w-full h-full text-slate-700 dark:text-slate-200" />
                        </div>
                      )}
                    </div>

                    {/* タイトル */}
                    <div className="font-medium line-clamp-2">{it.title}</div>

                    {/* 説明/タグ */}
                    {isIllust ? (
                      <div className="mt-2 flex gap-2 flex-wrap">
                        {(it as IllustItem).tags.map((t, j) => <Chip key={j}>{t}</Chip>)}
                      </div>
                    ) : isSystem ? (
                      <>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
                          {(it as SystemItem).desc}
                        </p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {((it as SystemItem).tags ?? []).map((t, j) => <Chip key={j}>{t}</Chip>)}
                        </div>
                      </>
                    ) : (
                      <>
                        {(it as MotionItem).desc && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            {(it as MotionItem).desc}
                          </p>
                        )}
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {((it as MotionItem).tags ?? []).map((t, j) => <Chip key={j}>{t}</Chip>)}
                        </div>
                      </>
                    )}

                    {/* CTA */}
                    <div className="mt-4">
                      {isIllust ? (
                        <button
                          onClick={() => openLightbox(href!, it.title)}
                          className="px-3 py-2 rounded-xl text-sm border transition cursor-pointer
                                     border-slate-200 hover:bg-slate-50
                                     dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          画像を表示
                        </button>
                      ) : isSystem ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition
                                     border-slate-200 hover:bg-slate-50
                                     dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          アプリを開く <ExternalLink size={14}/>
                        </a>
                      ) : (
                        <span className="inline-flex items-center text-xs text-slate-500 dark:text-slate-400">
                          Loop animation
                        </span>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </Section>

      {/* 画像用ライトボックス */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-label="Image viewer"
        >
          <button
            className="absolute top-4 right-4 rounded-full p-2 bg-white/90 text-slate-900 hover:bg-white cursor-pointer"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            aria-label="Close"
          >
            <X size={18}/>
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="mt-3 text-white/90 text-sm" onClick={(e) => e.stopPropagation()}>
            {lightbox.title}
          </div>
        </div>
      )}
    </>
  );
}