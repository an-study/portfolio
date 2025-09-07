import React from "react";

type Props = {
  children: React.ReactNode;
  color?: "blue" | "pink" | "green" | "yellow";
};

export function Button({ children, color = "blue" }: Props) {
  const colors = {
    blue: "#3B82F6",
    pink: "#EC4899",
    green: "#22C55E",
    yellow: "#EAB308",
  };
  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-white shadow hover:opacity-90"
      style={{ backgroundColor: colors[color] }}
    >
      {children}
    </button>
  );
}