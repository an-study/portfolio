import { motion, useReducedMotion } from "framer-motion";

/**
 * 依存のない安全なSVGアニメ。
 * - viewBox固定で数値属性(cx/cy/r/…）は常に定義済み
 * - prefers-reduced-motion に配慮
 * - 親が縦横比を決める（例: aspect-[4/3] の枠内に入れる）
 */
export default function AnimatedCharacter({
  className,
}: {
  className?: string;
}) {
  const reduce = useReducedMotion();

  // アニメ設定（reduce時は停止）
  const float = reduce
    ? {}
    : {
        y: [0, -3, 0],
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
      };

  const blink = reduce
    ? {}
    : {
        scaleY: [1, 1, 0.1, 1],
        transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut", times: [0, 0.45, 0.5, 1] },
      };

  const wave = reduce
    ? {}
    : {
        rotate: [0, 8, 0],
        transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <svg
      className={className}
      viewBox="0 0 240 180"
      width="100%"
      height="100%"
      role="img"
      aria-label="Animated character"
    >
      {/* 背景パネル */}
      <rect x={0} y={0} width={240} height={180} rx={16} fill="currentColor" opacity={0.06} />

      {/* 影 */}
      <ellipse cx={120} cy={138} rx={38} ry={8} fill="currentColor" opacity={0.08} />

      {/* 体（浮遊） */}
      <motion.g {...float}>
        {/* 胴体 */}
        <rect x={88} y={68} width={64} height={52} rx={16} fill="currentColor" opacity={0.12} />

        {/* 顔の円 */}
        <circle cx={120} cy={68} r={24} fill="currentColor" opacity={0.12} />

        {/* 目 */}
        <g transform="translate(0, -2)">
          <motion.ellipse
            cx={112}
            cy={66}
            rx={3}
            ry={3}
            fill="currentColor"
            animate={blink}
            style={{ originY: "50%" }}
          />
          <motion.ellipse
            cx={128}
            cy={66}
            rx={3}
            ry={3}
            fill="currentColor"
            animate={blink}
            style={{ originY: "50%" }}
          />
        </g>

        {/* 口 */}
        <path
          d="M112 76 Q120 82 128 76"
          stroke="currentColor"
          strokeWidth={2}
          fill="none"
          opacity={0.7}
        />

        {/* 右手（ひらひら） */}
        <motion.g transform="translate(152,82)" style={{ originX: 0, originY: 8 }} {...wave}>
          <rect x={0} y={0} width={20} height={10} rx={5} fill="currentColor" opacity={0.12} />
        </motion.g>

        {/* 左手（ひらひら） */}
        <motion.g transform="translate(68,82)" style={{ originX: 20, originY: 8 }} {...wave}>
          <rect x={0} y={0} width={20} height={10} rx={5} fill="currentColor" opacity={0.12} />
        </motion.g>
      </motion.g>

      {/* 囲いのアクセント */}
      <rect
        x={32}
        y={24}
        width={176}
        height={132}
        rx={14}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.15}
      />
    </svg>
  );
}
