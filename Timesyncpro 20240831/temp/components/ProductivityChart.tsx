'use client'

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from 'chart.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartData = {
  labels: string[];
  completedPomodoros: number[];
  taskCompletionRates: number[];
};

type TimeRange = 'daily' | 'weekly' | 'monthly';

const ProductivityChart: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    completedPomodoros: [],
    taskCompletionRates: [],
  });

  useEffect(() => {
    // ここで実際のデータをフェッチする
    fetchChartData(timeRange);
  }, [timeRange]);

  const fetchChartData = async (range: TimeRange) => {
    // 実際のAPIコールをここに実装する
    // この例では、ダミーデータを使用
    const dummyData: ChartData = {
      labels: ['1日目', '2日目', '3日目', '4日目', '5日目'],
      completedPomodoros: [5, 8, 6, 9, 7],
      taskCompletionRates: [60, 75, 65, 80, 70],
    };
    setChartData(dummyData);
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        type: 'bar' as const,
        label: '完了したポモドーロ数',
        data: chartData.completedPomodoros,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        type: 'line' as const,
        label: 'タスク完了率 (%)',
        data: chartData.taskCompletionRates,
        borderColor: 'rgb(53, 162, 235)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: '完了したポモドーロ数',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'タスク完了率 (%)',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const handleTimeRangeChange = (newRange: TimeRange) => {
    setTimeRange(newRange);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">生産性チャート</h2>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'daily'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleTimeRangeChange('daily')}
          >
            日次
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'weekly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleTimeRangeChange('weekly')}
          >
            週次
          </button>
          <button
            className={`px-3 py-1 rounded ${
              timeRange === 'monthly'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleTimeRangeChange('monthly')}
          >
            月次
          </button>
        </div>
      </div>
      <div className="relative">
        <Bar data={data} options={options} />
      </div>
      <div className="flex justify-between mt-4">
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <ChevronLeft size={20} />
          <span>前へ</span>
        </button>
        <button className="flex items-center text-blue-500 hover:text-blue-700">
          <span>次へ</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProductivityChart;
npm install chart.js react-chartjs-2