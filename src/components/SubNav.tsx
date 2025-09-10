import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export function SubNav() {
  const base =
    "relative px-4 py-2 rounded-xl text-sm transition focus:outline-none " +
    "focus-visible:ring focus-visible:ring-sky-400/40";
  const inactive =
    "text-slate-700 hover:bg-slate-100 " +
    "dark:text-slate-300 dark:hover:bg-slate-800";
  const activeText = "text-white dark:text-slate-900";

  const renderTab = (to: string, label: string, end?: boolean) => (
    <NavLink to={to} end={end ?? false}
      className={({ isActive }) =>
        `${base} ${isActive ? activeText : inactive}`
      }
    >
      {({ isActive }) => (
        <>
          {/* 背景ピル（ボタン内に配置してサイズ自動フィット） */}
          {isActive && (
            <motion.span
              layoutId="subnav-pill"
              className="pointer-events-none absolute inset-0 rounded-xl shadow-sm
                         bg-slate-900 dark:bg-white"
              transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
            />
          )}
          {/* テキストは前面に */}
          <span className="relative z-10 font-medium">{label}</span>
        </>
      )}
    </NavLink>
  );

  return (
    <div className="bg-white/90 dark:bg-slate-950/90 backdrop-blur
                    border-b border-slate-200 dark:border-slate-800
                    sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 flex items-center justify-center">
        <nav className="flex gap-2 py-2">


// 変更点：to="/" → to=""（ルート相対）、to="/gallery" → "gallery"
{renderTab("", "Skills", true)}
{renderTab("gallery", "Job Gallery")}

        </nav>
      </div>
    </div>
  );
}