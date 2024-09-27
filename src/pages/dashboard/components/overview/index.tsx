import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import RecentSales from './recent-sales.js';
import Overview from './overview.js';
import {
  Advisory,
  DoanhThu,
  Student,
  StudentAdd
} from '@/constants/SVGIcon.js';
export const ListOverViewDashBoard = [
  {
    id: 1,
    title: 'Tổng doanh thu',
    value: '23.543.000',
    percent: '+20.1 %',
    icon: <DoanhThu />
  },
  {
    id: 2,
    title: 'Tổng học sinh',
    value: '+2350',
    percent: '+180.1%',
    icon: <Student />
  },
  {
    id: 3,
    title: 'Số học sinh mới',
    value: '+43',
    percent: '+19%',
    icon: <StudentAdd />
  },
  {
    id: 4,
    title: 'Lượt cần tư vấn mới',
    value: '+573',
    percent: '+201',
    icon: <Advisory />
  }
];

export function OverViewTab() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ListOverViewDashBoard.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground">
                {item.percent} so với tháng trước
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Danh sách cần tư vấn</CardTitle>
            <CardDescription>Đang có 20 phụ huynh cần tư vấn</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
