import { motion } from "framer-motion";

type Option<T extends string> = { value: T; label: string };

export function TogglePills<T extends string>({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  return (
    <div
      className="inline-flex gap-2 relative py-1"
      role="tablist"
      aria-label="Filter"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-xl ${pad} font-medium transition
                        focus:outline-none focus-visible:ring focus-visible:ring-sky-400/40
                        cursor-pointer  
                        ${active ? "text-white dark:text-slate-900" : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
          >
            {/* アクティブ時のピル */}
            {active && (
              <motion.span
                layoutId="toggle-pill"
                className="pointer-events-none absolute inset-0 rounded-xl shadow-sm
                           bg-slate-900 dark:bg-white"
                transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}