'use client'

import React, { useState, useEffect } from 'react'
import { Play, Pause, RotateCcw, Bell } from 'lucide-react'

type TimerState = 'work' | 'break'

const Timer: React.FC = () => {
  const [time, setTime] = useState(25 * 60) // 25分をデフォルトに設定
  const [isActive, setIsActive] = useState(false)
  const [timerState, setTimerState] = useState<TimerState>('work')

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1)
      }, 1000)
    } else if (time === 0) {
      handleTimerComplete()
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, time])

  const handleTimerComplete = () => {
    setIsActive(false)
    if (timerState === 'work') {
      setTimerState('break')
      setTime(5 * 60) // 5分の休憩時間
    } else {
      setTimerState('work')
      setTime(25 * 60) // 25分の作業時間
    }
    showNotification()
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setTimerState('work')
    setTime(25 * 60)
  }

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('ポモドーロタイマー', {
        body: timerState === 'work' ? '休憩時間です！' : '作業を再開しましょう！',
        icon: '/icon.png' // アプリのアイコンパスを指定
      })
    }
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        {timerState === 'work' ? '作業時間' : '休憩時間'}
      </h2>
      <div className="text-6xl font-bold mb-8 text-blue-600">{formatTime(time)}</div>
      <div className="flex space-x-4">
        <button
          onClick={toggleTimer}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {isActive ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
        >
          <RotateCcw size={24} />
        </button>
      </div>
      <div className="mt-8 text-gray-600">
        <Bell size={20} className="inline-block mr-2" />
        タイマー完了時に通知が表示されます
      </div>
    </div>
  )
}

export default Timer