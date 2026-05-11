# exhibit-weekend-2026-05-30

横浜 → 埼玉、2026年5月30日（土）日帰りドライブの記録 LP。

`exhibit-*` カテゴリ（外向き・公開・提示系・ワンショット完成形）に属する。

---

## このプロジェクトの規模

**週末日帰り規模**：1ページ・3〜5セクション・軽い演出のみ・構築 2〜4 時間。

旅行前は「予定」として、旅行後は「記録」として書き換えていく構造。

---

## スタック

### 採用

- Vite + React 18 + TypeScript
- Tailwind CSS v4（CSS-first config、`@theme` ディレクティブ）
- GSAP v3.13+ / `@gsap/react` の `useGSAP` / ScrollTrigger
- Google Fonts（Noto Serif JP / Inter）

### 意図的に外す

`exhibit-*` は単一 LP 想定。以下は不要：

- ルーティング（TanStack Router 等）
- データフェッチ（TanStack Query 等）
- バックエンド（Hono 等）
- 状態管理ライブラリ
- 認証

純粋なプレゼンテーション層構成。

### ホスティング

Cloudflare Pages を標準。出力は static `dist/`。

---

## 構造原則

将来の `exhibit-*` への横展開を意識して：

1. **アニメーションロジックは hooks に切り出す**
   - `src/hooks/useScrollReveal.ts` のような粒度
   - コンポーネントに直書きしない（Hero の timeline のような one-off は除く）

2. **コンテンツデータは `src/content.ts` に集約**
   - 後で Notion DB / MDX に差し替え可能な構造に

3. **演出パターン集の育成**
   - 各 exhibit で使った motion を抽出し、横展開する

---

## アニメーション実装方針

- **1 プロンプト 1 演出**：scaffold 生成と各アニメーション実装を分離する
- **ライブラリ・API バージョン明示**：「GSAP v3.13、`@gsap/react` の `useGSAP`、ScrollTrigger」と固定して提示する
- **反復前提**：duration / easing / stagger / offset は手で詰める。一発で決まらない前提

---

## ファイル構成

```
src/
├── main.tsx
├── App.tsx
├── index.css            # Tailwind v4 + @theme でカスタムトークン定義
├── content.ts           # 旅程・場所・テキストを集約
├── hooks/
│   └── useScrollReveal.ts
└── sections/
    ├── Hero.tsx         # 大きな日付・出発/到着
    ├── Route.tsx        # 時系列ルート
    ├── Itinerary.tsx    # 立ち寄る場所カード
    └── Closing.tsx      # 結びの一言
```

---

## スケール整合性チェック

> 「LP を作ること自体が、その出来事を体験することより優先されていないか」

NO である限り、健全な exhibit。日帰り規模なら 2〜4 時間の制作を超えたら立ち止まる。

---

## 参考リファレンス

- https://expo2025-hyogo-fieldpavilion.jp/travelogue/
- https://sankoudesign.com/category/travel-sightseeing-region/

---

## 命名規約（族全体）

| Prefix | 用途 |
| --- | --- |
| `exhibit-` | ワンショット、完成形、キュレーション済み（このプロジェクト） |
| `show-` | 継続更新の公開ダッシュボード |
| `gallery-` | 複数アイテム集約のコレクション |

サフィックス `-cf` は Cloudflare デプロイ識別子（このリポジトリは未付与）。
