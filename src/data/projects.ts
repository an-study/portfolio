export type Project = {
  date: string; // "YYYY-MM"
  title: string;
  role: string;
  impact: string[];
  tags: string[];
};

export const PROJECTS: Project[] = [
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
