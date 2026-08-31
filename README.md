# Kyohei OS

自分が普段使う情報や自作機能へ、ひとつのホーム画面からアクセスするためのモバイルファーストなパーソナル Web アプリです。Ver.0.1 は、毎日気持ちよく開けて、後から小さく育てられる「OS の土台」に集中しています。

## 使用技術

- React + TypeScript
- Vite
- Lucide React（アイコン）
- Web App Manifest + Service Worker（PWA）
- CSS（safe-area、レスポンシブ対応）

## ローカルで起動

Node.js 20 以降を用意し、次を実行します。

```bash
npm install
npm run dev
```

表示された URL をブラウザで開いてください。同じ Wi-Fi の iPhone から試す場合は `npm run dev -- --host` を使います。

## ビルド

```bash
npm run build
npm run preview
```

成果物は `dist/` に生成されます。Service Worker は本番ビルドでのみ登録されます。

## iPhone のホーム画面に追加

1. HTTPS で公開した Kyohei OS を **Safari** で開きます。
2. 画面下部の共有ボタンをタップします。
3. 「ホーム画面に追加」→「追加」を選びます。
4. ホーム画面のアイコンから起動すると standalone 表示になります。

> `public/icons/` はアイコン設定用の場所です。本公開時は各端末向けの PNG（180px、192px、512px）を追加すると、より幅広い環境に対応できます。

## 新しい機能タイルを追加

`src/config/features.ts` の `features` 配列に `id`、名前、説明、Lucide アイコン、アクセント色を持つ要素を追加します。UI 側の変更は不要です。実際の画面を作る段階で、`onSelect` をルーターなどへ置き換えます。

## NOW カードの条件を追加

`src/lib/timeContent.ts` の `getTimeContent` に条件を追加します。現在は時刻だけを受け取りますが、将来は「体重の記録状況」「ジムの最終記録日」「予定」「曜日・記念日」をまとめたコンテキストを引数に加える設計を想定しています。条件を上から優先順に評価すると管理しやすくなります。

## ファイル構成

```text
src/
├── components/        # Header、カード、タイル、ナビ、モーダル
├── config/            # 機能タイルなど、表示設定の一元管理
├── data/              # データ取得層（将来 Supabase/Firebase に交換）
├── lib/               # NOW・挨拶などのドメインロジック
├── App.tsx            # 各部品を組み合わせるホーム画面
├── styles.css         # デザインと safe-area 対応
└── types.ts           # 共有する型
public/
├── icons/             # PWA / Apple Touch Icon
├── manifest.webmanifest
└── sw.js              # オフライン用 Service Worker
```

表示、設定、データ取得、判定ロジックを分離しているため、バックエンドや画面遷移を追加してもホーム画面が巨大な 1 ファイルになりにくい構成です。
