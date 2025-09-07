import React from "react";

export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-xl border border-slate-200 bg-white px-2 py-0.5 text-xs text-slate-600
                     dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      {children}
    </span>
  );
}