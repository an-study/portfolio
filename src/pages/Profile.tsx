import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";

type Project = {
  date: string; // "YYYY-MM"
  title: string;
  role: string;
  impact: string[];
  tags: string[];
};

const PROJECTS: Project[] = [
  { date: "2025-12", title: "台帳制作システム", role: "PdM / UX Designer",
    impact: ["出社状況・予定・タスク・システムリンクを統合", "情報検索時間の削減とチーム内フォローの促進", "全社員が直感的に使える汎用UIを設計"],
    tags: ["HCD","Agile","Internal"] },
  { date: "2025-08", title: "ミッション管理システム", role: "PdM / UX Designer",
    impact: ["出社状況・予定・タスク・システムリンクを統合", "情報検索時間の削減とチーム内フォローの促進", "全社員が直感的に使える汎用UIを設計"],
    tags: ["HCD","Agile","Internal"] },
  { date: "2024-11", title: "社内コラボレーションシステム", role: "PdM / UX Designer",
    impact: ["出社状況・予定・タスク・システムリンクを統合", "情報検索時間の削減とチーム内フォローの促進", "全社員が直感的に使える汎用UIを設計"],
    tags: ["HCD","Agile","Internal"] },
  { date: "2024-05", title: "ワークフローシステム", role: "PdM / UX Designer",
    impact: ["紙/Excel運用をシステム化", "申請〜承認の透明性を可視化", "UI設計と自動入力で負荷軽減"],
    tags: ["HCD","Workflow"] },
  { date: "2022-09", title: "デザインシステムガイドライン作成", role: "PM / UX Designer",
    impact: ["Windows向けデザインシステム構築", "再利用で開発効率に寄与", "WBS運用で品質/進捗を統制"],
    tags: ["Design System","Figma"] },
  { date: "2021-06", title: "校務管理システム", role: "リーダー / UI Designer",
    impact: ["テスト/採点管理を刷新", "ナビ最適化で認知負荷を低減", "アジャイル+KPTで価値提供"],
    tags: ["Education","UI"] },
  { date: "2019-03", title: "ハイキャリア向け転職サイト", role: "リーダー / UI Designer",
    impact: ["立上げ〜要件・設計をリード", "成功率向上を狙った情報設計", "15名規模でWF推進"],
    tags: ["Web","Recruiting"] },
  { date: "2012-09", title: "Web制作・CRM制作", role: "Web Designer",
    impact: ["携帯ショップ向けコンテンツ管理システム", "Androidアプリ制作", "コンテンツ素材制作"],
    tags: ["HTML5","CSS3","Dreamweaver","Fireworks","Flash"] },
  { date: "2008-04", title: "Webデザイン", role: "Web管理者 / Web Designer",
    impact: ["シティホテルのWEB、館内案内、館内DPT制作", "予約サイトの更新・管理"],
    tags: ["HTML","CSS","PHP","illustrator","IIS"] },
  { date: "2008-12", title: "サーバ管理・ユーザーサポート", role: "system administrator",
    impact: ["図書館でのサーバ管理業務","月１回のパソコン教室講師、来館者様のPC操作補助"],
    tags: ["Windowsサーバー","Active Directory","Linux"] },
  { date: "2002-03", title: "データエントリー", role: "スーパーバイザー / Data Entry",
    impact: ["官公庁や銀行などのデータエントリー業務", "入力フォームの改善やスタッフ管理に従事"],
    tags: ["COBOL","スタッフ管理"] },
];

// レーダー（大分類）
const SKILLS_RADAR = [
  { name: "UX設計", level: 88 },
  { name: "要件定義", level: 82 },
  { name: "情報設計", level: 86 },
  { name: "プロトタイプ", level: 60 },
  { name: "プロマネ", level: 75 },
  { name: "UIデザイン", level: 68 },
];

// レベルバー（詳細）
const SKILLS_DETAIL = [
  { name: "ユーザー調査設計", level: 86 },
  { name: "課題仮説の言語化", level: 84 },
  { name: "要求/要件の整理", level: 82 },
  { name: "IA/ナビ設計", level: 85 },
  { name: "ワイヤ/プロト作成", level: 80 },
  { name: "UIコンポ設計", level: 74 },
  { name: "タスク/WBS管理", level: 76 },
  { name: "KPI/効果測定", level: 73 },
];

const ACCENTS = ["#3B82F6", "#EC4899", "#22C55E", "#EAB308"];
const getAccent = (i: number) => ACCENTS[i % ACCENTS.length];

const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
    <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-6 md:mb-8">{title}</h2>
    {children}
  </section>
);

// 年ごとにグルーピング（降順）。YYYY / YYYY-MM 混在OK
function groupByYear(projects: Project[]) {
  const yearMap = new Map<string, Project[]>();

  // YYYY/MM を比較しやすいキーに（YYYY-00 を下限として扱う）
  const toSortKey = (d: string) => {
    const [y, m] = d.split("-");
    const mm = m ? m.padStart(2, "0") : "00";
    return `${y}-${mm}`; // 例: 2024-11 / 2012-00
  };

  // 年単位で Map に詰める
  projects.forEach((p) => {
    const year = p.date.split("-")[0];
    if (!yearMap.has(year)) yearMap.set(year, []);
    yearMap.get(year)!.push(p);
  });

  // 年の降順
  const years = Array.from(yearMap.keys()).sort((a, b) => (a < b ? 1 : -1));

  // 各年内も降順（月が無ければ "-00" として末尾寄りになる）
  return years.map((year) => {
    const items = yearMap.get(year)!.slice().sort((a, b) => {
      const ka = toSortKey(a.date);
      const kb = toSortKey(b.date);
      return ka < kb ? 1 : -1;
    });
    return { year, items };
  });
}

const Timeline = () => {
  const groups = useMemo(() => groupByYear(PROJECTS), []);
  return (
    <div className="relative">
      {/* 中央スパイン */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />

      <div className="space-y-10">
        {groups.map((g, gi) => {
          const accent = getAccent(gi); // ← 年単位のカラー
          return (
            <div key={g.year} className="relative w-full">
              {/* === 年ラベル（中央） === */}
  <div className="pl-2 md:pl-0">
  <span
    className="block w-fit ml-0 md:mx-auto inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm
               bg-white text-slate-700 dark:text-slate-200 dark:bg-slate-900"
    style={{ borderColor: accent }}
  >
    <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
    {g.year}
  </span>
</div>

              {/* === 同年のカード群（左右交互） === */}
              <div className="mt-5 space-y-6">
                {g.items.map((p, i) => {
                  const leftSide = (gi + i) % 2 === 0;
                  return (
                    <motion.div
                      key={`${g.year}-${i}`}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4 }}
                      className={`relative md:grid md:grid-cols-2 gap-6 ${leftSide ? "md:pl-8" : "md:pr-8"}`}
                    >
                      {/* ピン */}
                      <div
                        className="absolute left-[14px] md:left-1/2 -translate-x-1/2 top-3 h-3.5 w-3.5 rounded-full shadow"
                        style={{ backgroundColor: accent }}
                      />

                      {/* カード */}
                      <div className={leftSide ? "md:col-start-1" : "md:col-start-2"}>
                        <Card
                          className="border-2"
                          // 年ラベルと同じ色で枠を強調
                          //style={{ borderColor: accent }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-lg md:text-xl font-semibold">{p.title}</span>
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base mt-1">
                            {p.role}
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-700 dark:text-slate-200 text-sm md:text-base">
                            {p.impact.map((it, idx) => (
                              <li key={idx}>{it}</li>
                            ))}
                          </ul>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            {p.tags.map((t, idx) => (
                              <Chip key={idx}>{t}</Chip>
                            ))}
                          </div>
                        </Card>
                      </div>

                      <div className="hidden md:block" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillBars = () => (
  <div className="grid md:grid-cols-2 gap-6">
    {SKILLS_DETAIL.map((s, i) => (
      <div key={i} className="space-y-2">
        <div className="flex items-end justify-between">
          <span className="text-sm text-slate-600 dark:text-slate-300">{s.name}</span>
          <span className="text-xs text-slate-500">{s.level}%</span>
        </div>
        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: getAccent(i) }}
            initial={{ width: 0 }}
            whileInView={{ width: `${s.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.04 }}
          />
        </div>
      </div>
    ))}
  </div>
);

const SkillRadar = () => {
  const data = useMemo(() => SKILLS_RADAR.map(s => ({ name: s.name, level: s.level })), []);

  return (
    // ここで文字色＝基準色を決める（ライト/ダークで自動切替）
    <div className="h-[320px] md:h-[360px] text-slate-900 dark:text-slate-100">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          {/* グリッド線も currentColor を薄くして表示 */}
          <PolarGrid stroke="currentColor" strokeOpacity={0.18} />
          {/* 角度方向のラベル（凡例） */}
          <PolarAngleAxis
            dataKey="name"
            tick={{ fill: "currentColor", fontSize: 12, opacity: 0.85 }}
            tickLine={false}
          />
          {/* 半径方向のメモリ */}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fill: "currentColor", fontSize: 10, opacity: 0.7 }}
            axisLine={{ stroke: "currentColor", strokeOpacity: 0.2 }}
            tickLine={false}
          />
          {/* 実データ（線と面）も currentColor を使用 */}
          <Radar
            dataKey="level"
            stroke="currentColor"
            fill="currentColor"
            fillOpacity={0.25}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function Profile() {
  return (
    <>
      <Section id="skills" title="Skills">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <Card title="レーダーチャート（大分類）">
            <SkillRadar />
          </Card>
          <Card title="レベルバー（詳細項目）">
            <SkillBars />
          </Card>
        </div>
      </Section>

      <Section id="roadmap" title="Career Timeline">
        <Timeline />
      </Section>
    </>
  );
}