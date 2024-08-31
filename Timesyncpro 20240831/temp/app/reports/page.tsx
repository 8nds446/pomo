import { Metadata } from 'next'
import ProductivityChart from './ProductivityChart'
import { Activity, Calendar, CheckSquare, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: '生産性レポート | TimeSyncPro',
  description: 'あなたの生産性を分析し、詳細なレポートを提供します。',
}

// 仮想データ
const mockData = {
  dailyPomodoros: 12,
  weeklyPomodoros: 65,
  monthlyPomodoros: 280,
  taskCompletionRate: 85,
}

export default function ReportsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">生産性レポート</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Clock className="w-8 h-8 text-blue-500" />}
          title="今日のポモドーロ"
          value={mockData.dailyPomodoros}
        />
        <StatCard
          icon={<Activity className="w-8 h-8 text-green-500" />}
          title="今週のポモドーロ"
          value={mockData.weeklyPomodoros}
        />
        <StatCard
          icon={<Calendar className="w-8 h-8 text-purple-500" />}
          title="今月のポモドーロ"
          value={mockData.monthlyPomodoros}
        />
        <StatCard
          icon={<CheckSquare className="w-8 h-8 text-yellow-500" />}
          title="タスク完了率"
          value={`${mockData.taskCompletionRate}%`}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">ポモドーロ完了数の推移</h2>
        <ProductivityChart />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">カスタムレポート生成</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
              開始日
            </label>
            <input
              type="date"
              id="start-date"
              name="start-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
              終了日
            </label>
            <input
              type="date"
              id="end-date"
              name="end-date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            レポート生成
          </button>
        </form>
      </div>
    </div>
  )
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}