export type Project = {
  date: string; // "YYYY-MM"
  title: string;
  role: string;
  impact: string[];
  tags: string[];
};

export const PROJECTS: Project[] = [
    { 
    date: "2025-10", 
    title: "マスタ管理システム構築", 
    role: "PM / ディレクション",
    impact: [
      "社内のマスタ作成、管理業務を効率化し、データの一元管理とリアルタイム更新を目標にプロジェクトを推進中",
      "業務プロセスの可視化と改善を通じて、マスタ管理の正確性と効率性を向上させることを目指す",
      "委託先との連携を強化し、要件定義から導入までの全工程の進行を管理し進行中",
    ],
    tags: ["Waterfall", "PM", "見積もり","ディレクション","Confulence","Jira","Figma","Figjam","gitHub"] 
  },
    { 
    date: "2025-05", 
    title: "社内ノルマ管理システム構築", 
    role: "PdM / UIUX Designer",
    impact: [
      "社内ノルマの達成状況を可視化し、免除業務の申請・承認プロセスを効率化", 
      "ノルマ達成状況のリアルタイム把握と、後追い作業の手間削減を実現",
      "ノルマ管理の透明性向上と、社員のノルマ対応意識の向上に寄与",
    ],
    tags: ["Agile", "HCD", "PM", "UI/UX","Confulence","Jira","Figma","Figjam"] 
  },
  { 
    date: "2024-12", 
    title: "社内コラボレーションシステム構築", 
    role: "PdM / UIUX Designer",
    impact: [
      "散在していた社員情報、業務予定、タスク、システムリンクを統合し、情報の一元化を実現", 
      "情報検索にかかる時間の削減と、打刻漏れなどがすぐにわかる仕組みを導入し、チーム内での相互フォローを促進", 
      "明確な業務要件がない中で、全社員が直感的に利用できるシンプルで柔軟性の高いシステムを構築",
      "利用者から好意的な意見を獲得し、社内コミュニケーションの活性化に寄与",
      "社内サイトにアクセスログ取得ツールの埋め込みを実施し、ユーザー行動の分析基盤を構築",
      "PMP資格取得",
      "HCDスペシャリスト資格取得"
    ],
    tags: ["Agile", "HCD", "PM", "UI/UX","上位下位分析","アクセスログ","Confulence","Jira","Figma","Figjam"] 
  },
  { 
    date: "2024-07", 
    title: "ワークフローシステム構築", 
    role: "PM / UX Designer",
    impact: [
      "紙ベースの承認・認可フローをシステム化し、業務効率の向上と透明性の確保を実現", 
      "フロー全体の進捗状況のリアルタイム把握と承認者の明確化による透明性の確保を実現", 
      "紙やエクセルに分散していたデータを一元管理し、後続業務で再利用可能なデータとして整備",
      "Figmaでのプロトタイプを活用し、頻繁な要件変更への視覚的な合意形成を達成"
    ],
    tags: ["Agile", "HCD", "PM", "UX Design", "Event Storming","Figjam"] 
  },
  { 
    date: "2024-04", 
    title: "UX視点の要件定義プロセス標準化とテンプレート導入", 
    role: "Project Leader / HCD Evangelist",
    impact: [
      "UXを考慮した標準化された要件定義プロセスを確立し、テンプレート化を実現", 
      "インセプションデッキ、カスタマージャーニーマップなどのテンプレートを作成し、社内プロジェクトで活用可能とした", 
      "要件定義プロセスが標準化され、ユーザー視点を反映した設計が可能となり、プロジェクト全体でのスキルばらつきを抑制に貢献",
    ],
    tags: ["HCD", "Standardization", "Template Creation", "Process Design"] 
  },
  { 
    date: "2022-11", 
    title: "デザインシステム構築", 
    role: "PM / UX Designer",
    impact: [
      "Windowsアプリケーションのデザインを刷新し、デザインシステムを構築", 
      "再利用可能なデザインルールとコンポーネントを統一的に管理し、開発効率を向上",
      "納品期限と要件明確化の性質を踏まえ、従来型（Waterfall）とアジャイル手法を組み合わせたハイブリッド型手法を提案・導入",
      "WBSを作成し、具体的な作業項目と顧客向けのデザイン知識向上講座をタスクに組み込み、進捗管理を主導",
      "顧客向けにデザイン知識およびデザインシステムの利点と活用方法を説明するワークショップを開催し、理解促進に寄与"
    ],
    tags: ["Hybrid", "Design System", "PM", "UX Design", "WBS"] 
  },
  { 
    date: "2022-04", 
    title: "教育機関向けテスト管理システム構築", 
    role: "Design Team Leader / UIUX Designer",
    impact: [
      "学生向けテスト画面のユーザビリティを改善し、タブレット操作時の認知負荷を軽減した直感的な操作感を提供", 
      "教務向け採点管理画面の操作性を追求し、採点業務の効率化と正確性を向上（「操作に迷うことがなくなった」と高評価）", 
      "ユーザー調査（行動観察）やプロトタイプレビューのHCDステップをプロジェクトに導入・継続的な取り組みとした",
      "アジャイル手法を採用し、スプリント単位での段階的な成果物提供計画を立案・実行"
    ],
    tags: ["Agile", "HCD", "UI Design", "Prototyping", "User Research","XD","Miro"] 
  },
  { 
    date: "2019-07", 
    title: "デザインチームの設立と体制構築", 
    role: "Team Founder / Design Lead",
    impact: [
      "『デザインのポジションを作る』目標を掲げ、外部パートナーを採用し、2019年7月29日に3名体制のデザインチームを設立", 
      "その後メンバー増員を進め、短期間でチーム体制を拡充",
      "デザイン業務の稼働時間を細分化・可視化する活動を実施",
      "社外へのデザイン情報発信を推進し、デザイン研修の提案・実施を実現",
      "デザインで売り上げを上げることを目標に掲げ、社内でのデザイン認知度向上とデザイン提案を促進",
      "展示会などにも出展しUI/UXデザインの重要性を啓蒙",
      "3年後にはデザイン業務にて通期１億円の売上を達成"
    ],
    tags: ["Organization", "Team Building", "HCD", "Management"] 
  },
  { 
    date: "2019-06", 
    title: "ハイキャリア向け転職サイト構築", 
    role: "Design Team Leader / UI Designer",
    impact: [
      "ハイキャリアをターゲットとした転職サイトのUIデザインを担当", 
      "既存サービスの課題調査と顧客ヒアリングを通じて要件を具体化し、ユーザー中心のデザインを実現",
      "ウォーターフォール型手法に基づきWBS作成、スケジュール管理、リスク管理（ファストトラッキング検討）を実施",
      "プロトタイプを作成し、ターゲット層のニーズ把握と主要画面設計案の作成に使用"
    ],
    tags: ["Waterfall", "WBS", "Prototyping", "Risk Management"] 
  },
  { date: "2015-03", title: "営業資料・モック作成", role: "Web Designer / 販促企画",
    impact: ["業務系システム開発の技術提案資料作成", "提案用プロトタイプ制作"],
    tags: ["Illustrator","HTML","CSS","PowerPoint","JavaScript","BootStrap"] },
  { date: "2012-09", title: "Web制作・CRM制作・コンテンツ企画", role: "Web Designer",
    impact: ["携帯ショップ向けコンテンツ管理システム構築","店舗別会員サイト制作", "Androidアプリ制作", "コンテンツ素材制作", "チラシ制作"],
    tags: ["HTML5","CSS3","Dreamweaver","Fireworks","Flash"] },
  { date: "2008-12", title: "サーバ管理・ユーザーサポート", role: "system administrator",
    impact: ["図書館でのサーバ管理業務","月１回のパソコン教室講師","来館者様のPC操作補助"],
    tags: ["Windowsサーバー","Active Directory","Linux"] },
  { date: "2008-04", title: "Webデザイン", role: "Web管理者 / Web Designer",
    impact: ["シティホテルのWEBサイト作成、館内案内・館内チラシ制作", "予約サイトの更新・管理", "SEO対策", "各部門との折衝"],
    tags: ["HTML","CSS","PHP","illustrator","PhotoShop","IIS","Flash"] },
  { date: "2002-03", title: "データエントリー", role: "スーパーバイザー / Data Entry",
    impact: ["官公庁や銀行などのデータエントリー業務", "入力フォームの改善やスタッフ管理に従事"],
    tags: ["COBOL","スタッフ管理"] },
];
