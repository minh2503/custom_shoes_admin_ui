// App.js
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ChartAnalysisProps = {
  title: string;
  labels: string[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  TData: number[];
  options?: any;
};

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

export default function ChartAnalysis({
  title,
  labels,
  label,
  backgroundColor,
  borderColor,
  borderWidth,
  TData,
  options = {
    responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  }
}: ChartAnalysisProps) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: label,
        data: TData, // Đây là dữ liệu về số sản phẩm bán được của mỗi thương hiệu
        backgroundColor: backgroundColor, // Màu nền của các cột
        borderColor: borderColor, // Màu viền của các cột
        borderWidth: borderWidth // Độ dày viền
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7">
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={data} options={options} />
        </CardContent>
      </Card>
    </div>
  );
}
