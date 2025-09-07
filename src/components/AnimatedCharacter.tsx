import { motion } from "framer-motion";

export default function AnimatedCharacter() {
  return (
    <div className="flex justify-center items-center h-40 bg-slate-50 dark:bg-slate-900 rounded-xl">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        className="w-24 h-24"
      >
        {/* 顔 */}
        <circle cx="60" cy="60" r="40" fill="#FDE68A" stroke="#F59E0B" strokeWidth="4" />

        {/* 目 */}
        <motion.circle
          cx="45"
          cy="55"
          r="5"
          fill="#111827"
          animate={{ cy: [55, 52, 55] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="75"
          cy="55"
          r="5"
          fill="#111827"
          animate={{ cy: [55, 52, 55] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />

        {/* 口 */}
        <motion.path
          d="M45 75 Q60 90 75 75"
          stroke="#111827"
          strokeWidth="4"
          fill="transparent"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}