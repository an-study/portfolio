import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
} from "recharts";

/** ====== 可変データ（ここを書き換えるだけでOK） ====== */
const PROFILE = {
  name: "A.N",
  title: "UX Designer / PdM",
  summary:
    "社内コラボレーションツールのUX設計・要件定義・プロトタイピングを推進。「UIからUXへ」の転換をテーマに、業務効率と価値創出を設計します。",
  links: [
    //{ label: "Website", href: "" },
    { label: "note", href: "https://note.com/nishigaki_ao" },
    // { label: "Contact", href: "mailto:あなたのメール" },
  ],
};

// HCD/PMPの5プロジェクト（必要に応じて調整）
const PROJECTS: {
//  year: string; title: string; role: string; impact: string[]; tags: string[];
}[] = [
  {
//   year: "2024.04–12",
    title: "社内コラボレーションシステム",
    role: "PdM / UX Designer",
    impact: [
      "出社状況・予定・タスク・システムリンクを統合",
      "情報検索時間の削減とチーム内フォローの促進",
      "全社員が直感的に使える汎用UIを設計",
    ],
    tags: ["HCD", "Agile", "Internal"],
  },
  {
//   year: "2022.12–2024.07",
    title: "ワークフローシステム",
    role: "PdM / UX Designer",
    impact: [
      "紙/Excel運用をシステム化し、申請〜承認の透明性を可視化",
      "部門差のあるフローを統一・標準化",
      "UI設計と自動入力で申請者の負荷を軽減",
    ],
    tags: ["HCD", "Agile", "Workflow"],
  },
  {
//    year: "2022.06–11",
    title: "デザインシステムガイドライン作成",
    role: "PM / UX Designer",
    impact: [
      "Windowsアプリ向けデザインシステムを構築・納品",
      "他プロジェクトで再利用され開発効率に寄与",
      "WBS運用と日次管理で品質・進捗を統制",
    ],
    tags: ["Design System", "Figma"],
  },
  {
  //  year: "2021.01–2022.04",
    title: "校務管理システム",
    role: "リーダー / UI Designer",
    impact: [
      "学生テスト/教務採点管理を刷新",
      "ナビ最適化で認知負荷を低減し効率改善",
      "アジャイル運用とKPTで段階的に価値提供",
    ],
    tags: ["Education", "UI"],
  },
  {
  //  year: "2018.01–2019.06",
    title: "ハイキャリア向け転職サイト",
    role: "リーダー / UI Designer",
    impact: [
      "プレミアム層向け転職サイトの立上げ〜要件・設計をリード",
      "応募/採用の成功率向上を狙った情報設計・UI設計",
      "15名規模でウォーターフォールを推進",
    ],
    tags: ["Web", "Recruiting"],
  },
];

const SKILLS = [
  { name: "UX設計", level: 88 },
  { name: "要件定義", level: 82 },
  { name: "情報設計", level: 86 },
  { name: "プロトタイプ", level: 78 },
  { name: "プロジェクト管理", level: 75 },
  { name: "UIデザイン", level: 72 },
];

const HIGHLIGHTS = [
  "HCDスペシャリスト申請要件レベルの実務",
  "PMP準拠の計画/実行/振り返りを運用",
  "“伝わる・見つかる・活用できる”UXを推進",
];

/** ====== UI（Tailwind Only） ====== */
const Section = (props: { id?: string; title: string; children: React.ReactNode }) => (
  <section id={props.id} className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 md:mb-8">{props.title}</h2>
    {props.children}
  </section>
);

const Hero = () => (
  <div className="bg-gradient-to-b from-slate-50 to-white">
    <div className="max-w-6xl mx-auto px-4 md:px-6 pt-14 pb-10 md:pt-20 md:pb-16">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-widest text-slate-500">Portfolio</p>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">{PROFILE.name}</h1>
            <p className="text-lg md:text-xl text-slate-700 mt-2">{PROFILE.title}</p>
            <p className="text-slate-600 mt-4 max-w-2xl leading-relaxed">{PROFILE.summary}</p>
            <div className="flex gap-3 mt-5 flex-wrap">
              {PROFILE.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="md:text-right">
            <div className="inline-flex gap-2 flex-wrap">
              {HIGHLIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-1 text-slate-700 text-sm"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const Timeline = () => (
  <div className="relative">
    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />
    <div className="space-y-6 md:space-y-8">
      {PROJECTS.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className={`relative md:grid md:grid-cols-2 gap-6 ${idx % 2 === 0 ? "md:pl-8" : "md:pr-8"}`}
        >
          <div
            className={`absolute left-[14px] md:left-1/2 -translate-x-1/2 top-3 h-3.5 w-3.5 rounded-full ${
              idx % 2 ? "bg-indigo-500" : "bg-sky-500"
            } shadow`}
          />
          <div className={`${idx % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}`}>
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="px-5 pt-4 pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-lg md:text-xl font-semibold">{p.title}</span>
                  <span className="text-xs md:text-sm font-normal text-slate-500">{p.year}</span>
                </div>
              </div>
              <div className="px-5 pb-4">
                <p className="text-slate-600 text-sm md:text-base">{p.role}</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 text-sm md:text-base">
                  {p.impact.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {p.tags.map((t, i) => (
                    <span key={i} className="rounded-xl border border-slate-200 px-2 py-0.5 text-xs text-slate-600">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block" />
        </motion.div>
      ))}
    </div>
  </div>
);

const SkillBars = () => (
  <div className="grid md:grid-cols-2 gap-6">
    {SKILLS.map((s, i) => (
      <div key={i} className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-sm text-slate-600">{s.name}</span>
          <span className="text-xs text-slate-500">{s.level}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-slate-800"
            initial={{ width: 0 }}
            whileInView={{ width: `${s.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
          />
        </div>
      </div>
    ))}
  </div>
);

const SkillRadar = () => {
  const data = useMemo(() => SKILLS.map(s => ({ name: s.name, level: s.level })), []);
  return (
    <div className="h-[320px] md:h-[360px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid />
          <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Radar dataKey="level" stroke="#0f172a" fill="#0f172a" fillOpacity={0.25} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />

      <Section id="roadmap" title="沿革 / Growth Roadmap">
        <p className="text-slate-600 mb-6">
          プロジェクト抜粋
        </p>
        <Timeline />
      </Section>

      <Section id="skills" title="Skills / スキル可視化">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="font-semibold mb-3">レーダーチャート</h3>
            <SkillRadar />
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
            <h3 className="font-semibold mb-3">レベルバー</h3>
            <SkillBars />
          </div>
        </div>
      </Section>

      <footer className="text-center text-xs text-slate-500 py-10">
        © {new Date().getFullYear()} {PROFILE.name}
      </footer>
    </div>
  );
}