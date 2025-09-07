import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: 'class',
theme: {
  extend: {
    colors: {
      ink:  { 900: '#0F172A', 700: '#334155', 600: '#475569', 500: '#64748B' }, // モノトーン側
      base: { 50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1' }, // 背景/ボーダー
      acc:  { blue:'#3B82F6', pink:'#EC4899', green:'#22C55E', yellow:'#EAB308' } // 差し色
    },
    fontFamily: {
      sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      xl2: '1rem', // 16px（カードやボタンを少し丸める）
    }
  }
},
  plugins: [],
} satisfies Config;
