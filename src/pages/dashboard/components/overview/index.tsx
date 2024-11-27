import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Overview from './overview.js';
import { Advisory, DoanhThu, Student } from '@/constants/SVGIcon.js';
import { PagingModel } from '@/constants/data';
import { useSearchParams } from 'react-router-dom';
import {
  useGetAllOrder,
  useGetOrderByStatus
} from '../../../revenue/queries/cart.query.js';
import { useEffect, useState } from 'react';
type MonthlyRevenue = {
  name: string;
  total: number;
};
export const OverViewTab = () => {
  const [searchParams] = useSearchParams();
  const [listOverView, setListOverView] = useState<any[]>([]);
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 20);
  const paging = { ...PagingModel, pageNumber: page, pageSize: pageLimit };

  const { data: allOrder } = useGetAllOrder(paging);
  const { mutateAsync: refetchOrderByStatus } = useGetOrderByStatus();

  const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState<
    MonthlyRevenue[]
  >([]);

  useEffect(() => {
    if (allOrder?.listObjects) {
      const monthlyRevenue = Array.from({ length: 12 }, () => ({
        total: 0,
        count: 0
      }));

      allOrder.listObjects.forEach((order) => {
        if (!order.createdDate || !order.amount) return;
        const date = new Date(order.createdDate);
        const month = date.getMonth();
        monthlyRevenue[month].total += order.amount;
        monthlyRevenue[month].count += 1;
      });

      const calculatedRevenue: MonthlyRevenue[] = monthlyRevenue.map(
        (month, index) => ({
          name: new Date(0, index).toLocaleString('default', {
            month: 'short'
          }),
          total: month.count === 0 ? 0 : Math.floor(month.total / month.count)
        })
      );

      setAverageMonthlyRevenue(calculatedRevenue);
    }
  }, [allOrder]);

  useEffect(() => {
    const fetchData = async () => {
      const result: any = [];
      try {
        // Fetch tổng đơn hàng
        if (allOrder?.listObjects) {
          result.push({
            id: 1,
            title: 'Tổng đơn hàng',
            value: allOrder.listObjects.length || 0,
            icon: <DoanhThu />
          });
        }

        // Gọi các API khác đồng thời
        const [orderConfirm, orderShipping, orderDone] = await Promise.all([
          refetchOrderByStatus({ ...paging, orderStatus: 1 }),
          refetchOrderByStatus({ ...paging, orderStatus: 2 }),
          refetchOrderByStatus({ ...paging, orderStatus: 3 })
        ]);

        // Thêm kết quả vào danh sách
        result.push(
          {
            id: 2,
            title: 'Đơn hàng đã xác nhận',
            value: orderConfirm?.listObjects?.length || 0,
            icon: <DoanhThu />
          },
          {
            id: 3,
            title: 'Đơn hàng đang vận chuyển',
            value: orderShipping?.listObjects?.length || 0,
            icon: <Student />
          },
          {
            id: 4,
            title: 'Đơn hàng đã hoàn thành',
            value: orderDone?.listObjects?.length || 0,
            icon: <Advisory />
          }
        );
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
      setListOverView(result);
    };

    fetchData();
  }, [allOrder]);

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
};
