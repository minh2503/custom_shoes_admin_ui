import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

const data = [
  {
    name: 'Tháng 1',
    'Cơ sở 1': 12000000,
    'Cơ sở 2': 8400000
  }
];

export default function SalaryGraph() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis fontSize={12} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Cơ sở 1" fill="#03346E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="Cơ sở 2" fill="#6EACDA" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
