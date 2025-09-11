import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";
import { Card } from "../components/Card";
import { Chip } from "../components/Chip";
import { SKILLS_DETAIL, SKILLS_RADAR } from "../data/skills";
import { PROJECTS } from "../data/projects";

type Project = {
  date: string; // "YYYY-MM"
  title: string;
  role: string;
  impact: string[];
  tags: string[];
};

// アクセントカラーを順番にループ
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
      {/* 中央軸 */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200" />

      <div className="space-y-10">
        {groups.map((g, gi) => {
          const accent = getAccent(gi); // ← 年単位のカラー
          return (
            <div key={g.year} className="relative w-full">
              {/* === 年ラベル（中央） === */}
  <div className="pl-2 md:pl-0 block w-fit ml-0 md:mx-auto">
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
