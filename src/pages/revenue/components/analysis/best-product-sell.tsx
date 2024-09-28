// App.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BestProductSell = () => {
  // Dữ liệu thương hiệu và số lượng sản phẩm bán được
  const data = {
    labels: ['Brand A', 'Brand B', 'Brand C', 'Brand D', 'Brand E'],
    datasets: [
      {
        label: 'Số lượng sản phẩm bán được',
        data: [150, 200, 120, 180, 90], // Đây là dữ liệu về số sản phẩm bán được của mỗi thương hiệu
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền của các cột
        borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của các cột
        borderWidth: 1 // Độ dày viền
      }
    ]
  };

  // Các tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Top 5 sản phẩm bán chạy nhất</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
};

export default BestProductSell;
