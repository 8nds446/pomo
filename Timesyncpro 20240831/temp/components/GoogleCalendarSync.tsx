'use client'

import React, { useState, useEffect } from 'react'
import { Button, Alert, Spinner } from 'your-ui-library'  // 適切なUIライブラリからインポート
import { Calendar, RefreshCw, AlertCircle } from 'lucide-react'
import { googleAuth, syncTasks, SyncStatus } from '../services/googleCalendarService'  // 実際のサービス関数をインポート

const GoogleCalendarSync: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const authStatus = await googleAuth.checkStatus()
      setIsAuthenticated(authStatus)
    } catch (err) {
      setError('認証状態の確認中にエラーが発生しました。')
    }
  }

  const handleAuth = async () => {
    try {
      await googleAuth.authenticate()
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      setError('Google認証中にエラーが発生しました。')
    }
  }

  const handleSync = async () => {
    if (!isAuthenticated) {
      setError('同期を行うには、まずGoogleアカウントで認証を行ってください。')
      return
    }

    setSyncStatus('syncing')
    setError(null)

    try {
      await syncTasks()
      setSyncStatus('success')
    } catch (err) {
      setSyncStatus('error')
      setError('タスクの同期中にエラーが発生しました。')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calendar className="mr-2" />
        Googleカレンダー同期
      </h2>

      {error && (
        <Alert variant="error" className="mb-4">
          <AlertCircle className="mr-2" />
          {error}
        </Alert>
      )}

      {!isAuthenticated ? (
        <Button onClick={handleAuth} className="mb-4">
          Googleアカウントで認証
        </Button>
      ) : (
        <div className="mb-4 text-green-600">認証済み</div>
      )}

      <Button
        onClick={handleSync}
        disabled={!isAuthenticated || syncStatus === 'syncing'}
        className="flex items-center"
      >
        {syncStatus === 'syncing' ? (
          <>
            <Spinner size="small" className="mr-2" />
            同期中...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2" />
            今すぐ同期
          </>
        )}
      </Button>

      {syncStatus === 'success' && (
        <div className="mt-4 text-green-600">同期が完了しました。</div>
      )}
    </div>
  )
}

export default GoogleCalendarSync