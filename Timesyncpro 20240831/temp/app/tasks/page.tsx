import { Metadata } from 'next'
import TaskList from './TaskList'
import GoogleCalendarSync from './GoogleCalendarSync'

export const metadata: Metadata = {
  title: 'タスク管理 | TimeSyncPro',
  description: 'TimeSyncProのタスク管理ページです。タスクの追加、編集、削除、およびGoogleカレンダーとの同期が可能です。',
}

const TasksPage = async () => {
  // 注: この部分は将来的にAPIからデータを取得する際に使用します
  // const tasks = await fetchTasks()

  // 仮のタスクデータ
  const tasks = [
    { id: 1, title: 'プロジェクト計画書作成', priority: 'high', deadline: '2023-06-30', progress: 50 },
    { id: 2, title: 'クライアントミーティング', priority: 'medium', deadline: '2023-06-25', progress: 0 },
    { id: 3, title: 'バグ修正', priority: 'low', deadline: '2023-06-28', progress: 75 },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">タスク管理</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">新しいタスクの追加</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="タスク名"
            className="w-full p-2 border rounded"
          />
          <select className="w-full p-2 border rounded">
            <option value="">優先順位を選択</option>
            <option value="high">高</option>
            <option value="medium">中</option>
            <option value="low">低</option>
          </select>
          <input
            type="date"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            タスクを追加
          </button>
        </form>
      </div>

      <TaskList tasks={tasks} />
      
      <div className="mt-8">
        <GoogleCalendarSync />
      </div>
    </div>
  )
}

export default TasksPage