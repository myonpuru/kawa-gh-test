# タスク管理アプリ

Next.js 15とReact 19で構築された日本語タスク管理アプリケーションです。

## 機能

- ✅ タスクの作成・編集・削除
- 🎯 優先度レベル設定（高・中・低）
- 🔍 フィルタリング機能（すべて・完了・未完了）
- 📊 進捗率の可視化
- 💾 ローカルストレージによるデータ永続化
- 📱 レスポンシブデザイン
- 🎨 モダンなグラデーションUI

## 技術スタック

- **Next.js** 15.5.4 (App Router + Turbopack)
- **React** 19.1.0
- **TypeScript** 5
- **Tailwind CSS** 4
- **ESLint**

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 開発コマンド

```bash
# 開発サーバー（Turbopack使用）
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# ESLint実行
npm run lint
```

## UI改善ポイント

このバージョンでは以下のUI改善を実装しています：

- 🎨 グラデーション背景とモダンなカラースキーム
- 📊 統計情報カード（総タスク数、完了数、達成率）
- 📈 アニメーション付きプログレスバー
- ✨ ホバーエフェクトとトランジション
- 🎯 視覚的な優先度インジケーター
- 📱 改善されたレスポンシブレイアウト
- 🔲 カスタムチェックボックスデザイン
- 🗑️ 直感的な削除ボタン

## プロジェクト構造

```
task-manager-test/
├── src/
│   └── app/
│       ├── page.tsx         # メインタスク管理コンポーネント
│       ├── layout.tsx       # ルートレイアウト
│       └── globals.css      # グローバルスタイル
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## ライセンス

MIT
