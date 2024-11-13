import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Overview from './overview.js';
import {
  Advisory,
  DoanhThu,
  Student,
  StudentAdd
} from '@/constants/SVGIcon.js';
import { PagingModel } from '@/constants/data';
import { useSearchParams } from 'react-router-dom';
import {
  useGetAllOrder,
  useGetOrderByStatus
} from '../../../revenue/queries/cart.query.js';
import { useEffect, useState } from 'react';
export const ListOverViewDashBoard = [
  {
    id: 1,
    title: 'Tổng đơn hàng',
    value: '23.543.000',
    percent: '+20.1 %',
    icon: <DoanhThu />
  },
  {
    id: 2,
    title: 'Đơn hàng đang xử lý ',
    value: '+2350',
    percent: '+180.1%',
    icon: <Student />
  },
  {
    id: 3,
    title: 'Đơn hàng đang vận chuyển',
    value: '+43',
    percent: '+19%',
    icon: <StudentAdd />
  },
  {
    id: 4,
    title: 'Đơn hàng đã hoàn thành',
    value: '+573',
    percent: '+201',
    icon: <Advisory />
  }
];

export function OverViewTab() {
  const [searchParams] = useSearchParams();
  const [listOverView, setListOverView] = useState<any[]>([]);
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 20);
  const [paging] = useState({
    ...PagingModel,
    pageNumber: page,
    pageSize: pageLimit
  });
  const { data: allOrder } = useGetAllOrder(paging);
  const { mutateAsync: refetchOrderByStatus } = useGetOrderByStatus();
  console.log('allOrder', allOrder);

  const monthlyRevenue = Array.from({ length: 12 }, () => ({
    total: 0,
    count: 0
  }));

  // Tổng hợp doanh thu theo tháng
  allOrder?.listObjects?.forEach((order) => {
    const date = new Date(order.createdDate);
    const month = date.getMonth();
    monthlyRevenue[month].total += order.amount;
    monthlyRevenue[month].count += 1;
  });

  // Tính trung bình doanh thu hàng tháng
  const averageMonthlyRevenue = monthlyRevenue.map((month, index) => ({
    name: new Date(0, index).toLocaleString('default', { month: 'short' }),
    total: month.count === 0 ? 0 : Math.floor(month.total / month.count)
  }));

  useEffect(() => {
    const fetchData = async () => {
      const result: any = [];

      // Fetch tổng đơn hàng
      if (allOrder) {
        result.push({
          id: 1,
          title: 'Tổng đơn hàng',
          value: allOrder?.listObjects?.length || 0,
          icon: <DoanhThu />
        });
      }

      const fetchOrderConfirm = async () => {
        const data = await refetchOrderByStatus({ ...paging, orderStatus: 1 });
        result.push({
          id: 2,
          title: 'Đơn hàng đang đã xác nhận',
          value: data?.listObjects?.length || 0,
          icon: <DoanhThu />
        });
      };

      // Fetch đơn hàng đang vận chuyển
      const fetchOrderShipping = async () => {
        const data = await refetchOrderByStatus({ ...paging, orderStatus: 2 });
        result.push({
          id: 3,
          title: 'Đơn hàng đang vận chuyển',
          value: data?.listObjects?.length || 0,
          icon: <Student />
        });
      };

      // Fetch đơn hàng đã hoàn thành
      const fetchOrderDone = async () => {
        const data = await refetchOrderByStatus({ ...paging, orderStatus: 3 });
        result.push({
          id: 4,
          title: 'Đơn hàng đã hoàn thành',
          value: data?.listObjects?.length || 0,
          icon: <Advisory />
        });
      };

      await Promise.all([
        fetchOrderConfirm(),
        fetchOrderShipping(),
        fetchOrderDone()
      ]);
      setListOverView(result);
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {listOverView.map((item) => (
          <Card key={item.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Tổng quan</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={averageMonthlyRevenue} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
