import React from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white shadow-sm p-5
                  dark:border-slate-800 dark:bg-slate-900
                  text-slate-900 dark:text-slate-100
                  [&_*]:text-inherit
                  ${className}`}
    >
      {title && <h3 className="font-semibold mb-3">{title}</h3>}
      {children}
    </div>
  );
}