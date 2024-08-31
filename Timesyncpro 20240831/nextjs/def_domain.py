# TimeSyncPro - Googleカレンダー連携ポモドーロタイマーの定義

import os
from nextjs.def_concept import concept, dir_structure
from nextjs.def_constraints import page_tsx

# プロジェクトTimeSyncProの詳細定義
def_domain = concept + dir_structure

# 作成するファイルの定義
files = [
    ('app', 'page.tsx',
     def_domain + page_tsx + """
     page.tsxファイルにメインダッシュボード画面を実装してください。
     - 現在のポモドーロタイマーの状態と残り時間を表示
     - 今日のタスクリストと進捗状況
     - 生産性サマリー（完了したポモドーロ数、総作業時間など）
     - Googleカレンダーとの同期状態
     サーバーコンポーネントとして実装し、React hooksは使用しないでください。
     Timer.tsxとTaskList.tsxコンポーネントを呼び出してください。
     """
    ),
    ('app/tasks', 'page.tsx',
     def_domain + page_tsx + """
     tasks/page.tsxファイルにタスク管理ページを実装してください。
     - タスクの一覧表示（優先順位、締め切り、進捗状況を含む）
     - 新しいタスクの追加フォーム
     - タスクの編集、削除機能
     - Googleカレンダーからのタスクインポート機能
     サーバーコンポーネントとして実装し、React hooksは使用しないでください。
     ただし、Next.js固有のhooks（useSearchParams, usePathname, useRouter）は使用可能です。
     TaskList.tsxとGoogleCalendarSync.tsxコンポーネントを呼び出してください。
     """
    ),
    ('app/reports', 'page.tsx',
     def_domain + page_tsx + """
     reports/page.tsxファイルに生産性レポートページを実装してください。
     - 日次/週次/月次の生産性レポート表示
     - 完了したポモドーロセッション数のグラフ
     - タスク完了率の統計
     - カスタム日付範囲でのレポート生成機能
     サーバーコンポーネントとして実装し、React hooksは使用しないでください。
     ただし、Next.js固有のhooks（useSearchParams, usePathname, useRouter）は使用可能です。
     ProductivityChart.tsxコンポーネントを呼び出してください。
     """
    ),
    ('app/settings', 'page.tsx',
     def_domain + page_tsx + """
     settings/page.tsxファイルに設定ページを実装してください。
     - ポモドーロタイマーの作業/休憩時間のカスタマイズ
     - Googleカレンダー連携の設定
     - 通知設定
     - テーマ設定（ダークモード/ライトモード）
     サーバーコンポーネントとして実装し、React hooksは使用しないでください。
     ただし、Next.js固有のhooks（useSearchParams, usePathname, useRouter）は使用可能です。
     SettingsForm.tsxコンポーネントを呼び出してください。
     """
    ),
    ('components', 'Timer.tsx',
     def_domain + """
     components/Timer.tsxファイルにポモドーロタイマーコンポーネントを実装してください。
     - 25分の作業時間と5分の休憩時間を交互に切り替えるタイマー
     - スタート、一時停止、リセット機能
     - 現在の状態（作業中/休憩中）と残り時間の表示
     - タイマー完了時の通知機能
     クライアントコンポーネントとして実装し、'use client'ディレクティブを使用してください。
     """
    ),
    ('components', 'TaskList.tsx',
     def_domain + """
     components/TaskList.tsxファイルにタスクリストコンポーネントを実装してください。
     - タスクの一覧表示（タイトル、優先順位、締め切り、進捗状況）
     - タスクの追加、編集、削除機能
     - ドラッグ＆ドロップによる優先順位の変更
     - タスクの完了/未完了の切り替え
     クライアントコンポーネントとして実装し、'use client'ディレクティブを使用してください。
     """
    ),
    ('components', 'GoogleCalendarSync.tsx',
     def_domain + """
     components/GoogleCalendarSync.tsxファイルにGoogleカレンダー同期コンポーネントを実装してください。
     - Googleカレンダーとの認証機能
     - タスクのインポート/エクスポート機能
     - 同期状態の表示と手動同期ボタン
     - 同期エラーの表示と再試行機能
     クライアントコンポーネントとして実装し、'use client'ディレクティブを使用してください。
     """
    ),
    ('components', 'ProductivityChart.tsx',
     def_domain + """
     components/ProductivityChart.tsxファイルに生産性チャートコンポーネントを実装してください。
     - 完了したポモドーロセッション数の棒グラフ
     - タスク完了率の折れ線グラフ
     - 日次/週次/月次の切り替え機能
     - ホバーで詳細情報を表示
     クライアントコンポーネントとして実装し、'use client'ディレクティブを使用してください。
     Chart.jsまたはD3.jsなどのライブラリを使用してグラフを描画してください。
     """
    ),
    ('components', 'SettingsForm.tsx',
     def_domain + """
     components/SettingsForm.tsxファイルに設定フォームコンポーネントを実装してください。
     - ポモドーロタイマーの作業/休憩時間設定フォーム
     - Googleカレンダー連携の設定（APIキーの入力など）
     - 通知設定（デスクトップ通知、音声通知など）
     - テーマ設定（ダークモード/ライトモードの切り替え）
     クライアントコンポーネントとして実装し、'use client'ディレクティブを使用してください。
     フォームのバリデーションとサブミット処理を実装してください。
     """
    ),
]