// Gallery data and types separated for easier updates

export type IllustItem = {
  kind: "illust";
  title: string;
  thumb: string;
  tags: string[];
  href: string;
};

export type SystemItem = {
  kind: "system";
  title: string;
  desc: string;
  href: string;
  tags?: string[];
  thumb?: string;
};

// 任意のキーを許容（ファイル名から自動解決されます）
export type MotionAnimKey = string;

export type MotionItem = {
  kind: "motion";
  title: string;
  desc?: string;
  tags?: string[];
  /** どのアニメーションを表示するか。未指定なら "character" */
  anim?: MotionAnimKey;
};

export type GalleryItem = IllustItem | SystemItem | MotionItem;

// Initial sample data; update freely
export const GALLERY_ITEMS: GalleryItem[] = [
  { kind: "illust", title: "Playful Bird", thumb: "illust/sample-01.jpg", tags: ["AI Illustration","Character"], href: "illust/sample-01.jpg" },
  { kind: "illust", title: "Night City",   thumb: "illust/sample-02.jpg", tags: ["AI Illustration","Background"], href: "illust/sample-02.jpg" },

  // Motion (animated example rendered in the card)
  { kind: "motion", title: "Animated Character", desc: "Framer Motion / SVG Animated Face", tags: ["Motion","SVG"], anim: "character" },
  { kind: "motion", title: "Animated Bars", desc: "Framer Motion / SVG Animated Face", tags: ["Motion","SVG"], anim: "bars" },
  { kind: "motion", title: "Animated Logo", desc: "Framer Motion / SVG Animated Face", tags: ["Motion","SVG"], anim: "logo" },

  { kind: "system", title: "Team ToDo Board", desc: "Drag & drop Kanban for quick progress sharing.", href: "https://example.com/app2", tags: ["Tool"] },
  // thumb can be omitted; a placeholder will be shown
  { kind: "system", title: "Attendance Visualizer", desc: "Lightweight UI to share office/WFH schedule.", href: "https://example.com/app1", tags: ["Internal"], thumb: "illust/sample-03.jpg" },
];
