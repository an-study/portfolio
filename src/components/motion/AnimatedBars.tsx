import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedBars({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const bars = [0, 1, 2, 3, 4];
  const anim = (i: number) =>
    reduce
      ? {}
      : {
          height: [28, 60, 28],
          transition: { duration: 1.2, delay: i * 0.08, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <svg className={className} viewBox="0 0 240 180" role="img" aria-label="Animated bars">
      <rect x={0} y={0} width={240} height={180} rx={16} fill="currentColor" opacity={0.06} />
      <g transform="translate(40,40)">
        {bars.map((b, i) => (
          <motion.rect
            key={i}
            x={i * 30}
            y={0}
            width={18}
            height={28}
            rx={8}
            fill="currentColor"
            opacity={0.18}
            animate={anim(i)}
            style={{ originY: 14 }}
          />
        ))}
      </g>
      <rect x={32} y={24} width={176} height={132} rx={14} fill="none" stroke="currentColor" strokeOpacity={0.15} />
    </svg>
  );
}
