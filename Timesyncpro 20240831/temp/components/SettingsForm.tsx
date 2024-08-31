'use client'

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Bell, Calendar, Clock, Moon, Sun } from 'lucide-react';

type SettingsFormData = {
  workDuration: number;
  breakDuration: number;
  googleApiKey: string;
  desktopNotifications: boolean;
  soundNotifications: boolean;
  darkMode: boolean;
};

const SettingsForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    console.log(data);
    // ここでデータを保存または API に送信する処理を実装
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">設定</h2>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <Clock className="mr-2" /> ポモドーロタイマー設定
        </h3>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="workDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              作業時間 (分)
            </label>
            <input
              type="number"
              id="workDuration"
              {...register('workDuration', { required: true, min: 1, max: 120 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.workDuration && <span className="text-red-500 text-sm">有効な作業時間を入力してください</span>}
          </div>
          <div className="flex-1">
            <label htmlFor="breakDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              休憩時間 (分)
            </label>
            <input
              type="number"
              id="breakDuration"
              {...register('breakDuration', { required: true, min: 1, max: 30 })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            {errors.breakDuration && <span className="text-red-500 text-sm">有効な休憩時間を入力してください</span>}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <Calendar className="mr-2" /> Googleカレンダー連携
        </h3>
        <div>
          <label htmlFor="googleApiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Google API キー
          </label>
          <input
            type="text"
            id="googleApiKey"
            {...register('googleApiKey', { required: true })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          {errors.googleApiKey && <span className="text-red-500 text-sm">Google API キーを入力してください</span>}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          <Bell className="mr-2" /> 通知設定
        </h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="desktopNotifications"
              {...register('desktopNotifications')}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label htmlFor="desktopNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              デスクトップ通知を有効にする
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="soundNotifications"
              {...register('soundNotifications')}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <label htmlFor="soundNotifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              音声通知を有効にする
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex items-center">
          {isDarkMode ? <Moon className="mr-2" /> : <Sun className="mr-2" />} テーマ設定
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="darkMode"
            {...register('darkMode')}
            onChange={(e) => setIsDarkMode(e.target.checked)}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
          <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            ダークモードを有効にする
          </label>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          設定を保存
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;