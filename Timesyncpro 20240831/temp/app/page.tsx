'use client'

import { useEffect, useState } from 'react'
import { Home, Calendar, Activity, Clock, CheckSquare, Settings, Menu, X } from 'lucide-react'
import Timer from './Timer'
import TaskList from './TaskList'

// 仮想データ
const mockData = {
  pomodoroCount: 5,
  totalWorkTime: 150, // 分単位
  syncStatus: '同期済み',
}

export default function Dashboard() {
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const [totalWorkTime, setTotalWorkTime] = useState(0)
  const [syncStatus, setSyncStatus] = useState('')

  useEffect(() => {
    // 仮想データの取得をシミュレート
    setTimeout(() => {
      setPomodoroCount(mockData.pomodoroCount)
      setTotalWorkTime(mockData.totalWorkTime)
      setSyncStatus(mockData.syncStatus)
    }, 1000)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ダッシュボード</h1>
          <Menu className="h-6 w-6 text-gray-500 cursor-pointer" />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Timer />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <TaskList />
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">生産性サマリー</h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col border-t border-gray-100 pt-4">
                  <dt className="text-sm font-medium text-gray-500">完了したポモドーロ</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{pomodoroCount}</dd>
                </div>
                <div className="flex flex-col border-t border-gray-100 pt-4">
                  <dt className="text-sm font-medium text-gray-500">総作業時間</dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalWorkTime}分</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Googleカレンダー同期状態</h3>
            <p className="text-sm text-gray-500">{syncStatus}</p>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          © 2023 TimeSyncPro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}