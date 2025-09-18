import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TradeVolumeChart: React.FC = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(32, 128, 141, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#20808D',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#2E565D',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(229, 227, 212, 0.5)',
        },
        ticks: {
          color: '#2E565D',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return '$' + value + 'B';
          },
        },
      },
    },
  };

  const data = {
    labels: ['Nigeria', 'Angola', 'South Africa', 'Ghana', 'Algeria', 'Egypt'],
    datasets: [
      {
        data: [6.2, 4.3, 2.4, 1.4, 1.8, 0.9],
        backgroundColor: [
          'rgba(32, 128, 141, 0.8)',
          'rgba(32, 128, 141, 0.7)',
          'rgba(32, 128, 141, 0.6)',
          'rgba(32, 128, 141, 0.5)',
          'rgba(32, 128, 141, 0.4)',
          'rgba(32, 128, 141, 0.3)',
        ],
        borderColor: '#20808D',
        borderWidth: 1,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="h-64 w-full">
      <Bar options={options} data={data} />
    </div>
  );
};

export default TradeVolumeChart;