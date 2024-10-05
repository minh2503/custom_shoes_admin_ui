import { useEffect, useState } from 'react';
import OrderTable from './components/order-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
import { useGetStudents } from './queries/queries';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import {
  useGetAllOrder,
  useGetOrderByStatus
} from '../revenue/queries/cart.query';
import { PagingModel } from '@/constants/data';

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const country = searchParams.get('search') || null;
  const offset = (page - 1) * pageLimit;
  const { data, isLoading } = useGetStudents(offset, pageLimit, country);
  const users = data?.users;
  const totalUsers = data?.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const [tabSelected, setTabSelected] = useState('all_order');
  const [paging, setPaging] = useState({ ...PagingModel, orderStatus: 1 });
  const { mutateAsync } = useGetOrderByStatus();
  const { data: allOrder } = useGetAllOrder();
  const listOrder = allOrder?.listObjects;
  console.log('allOrder', listOrder);

  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Đơn hàng', link: '/student' }
      ]}
      pageHead="Quản lý đơn hàng | G-Local Shoes"
      className="p-4 md:px-8"
    >
      <Tabs defaultValue={tabSelected} className="space-y-4">
        <TabsList>
          <TabsTrigger
            value="all_order"
            onClick={() => setTabSelected('all_order')}
          >
            Tất cả đơn hàng
          </TabsTrigger>
          <TabsTrigger
            value="orderconfirm"
            onClick={() => setTabSelected('orderconfirm')}
          >
            Đã xác nhận
          </TabsTrigger>
          <TabsTrigger
            value="ordershipping"
            onClick={() => setTabSelected('ordershipping')}
          >
            Đang giao
          </TabsTrigger>
          <TabsTrigger
            value="orderdone"
            onClick={() => setTabSelected('orderdone')}
          >
            Giao thành công
          </TabsTrigger>
        </TabsList>
        <TabsContent value={tabSelected} className="space-y-4">
          <OrderTable
            users={listOrder}
            page={page}
            totalUsers={totalUsers}
            pageCount={pageCount}
          />
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
