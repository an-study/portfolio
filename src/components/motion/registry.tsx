import React, { lazy } from "react";

export type MotionComponent = React.ComponentType<{ className?: string }>;

// Auto-discover all Animated*.tsx under this folder
const modules = import.meta.glob<{ default: MotionComponent }>("./Animated*.tsx");

const toKey = (path: string) => {
  // e.g. "./AnimatedBars.tsx" -> "bars"
  const m = path.match(/Animated([A-Za-z0-9]+)\.tsx$/);
  if (!m) return null;
  const name = m[1];
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/^-+/, "");
};

const registry: Record<string, React.LazyExoticComponent<MotionComponent>> = {};
for (const [path, loader] of Object.entries(modules)) {
  const key = toKey(path);
  if (!key) continue;
  registry[key] = lazy(async () => {
    const mod = await loader();
    return { default: mod.default };
  });
}

export function resolveMotionComponent(name?: string) {
  const key = (name ?? "character").toLowerCase();
  const Comp = registry[key] ?? registry["character"] ?? lazy(() => import("./AnimatedCharacter"));
  return Comp;
}
