import { useState } from 'react';
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
            value="orderpending"
            onClick={() => setTabSelected('orderpending')}
          >
            Tổng quan chờ xử lý
          </TabsTrigger>
          <TabsTrigger
            value="ordershipping"
            onClick={() => setTabSelected('ordershipping')}
          >
            Đơn hàng đang giao
          </TabsTrigger>
          <TabsTrigger
            value="orderdone"
            onClick={() => setTabSelected('orderdone')}
          >
            Đơn hàng đã xử lý
          </TabsTrigger>
        </TabsList>
        <TabsContent value={tabSelected} className="space-y-4">
          <OrderTable
            users={users}
            page={page}
            totalUsers={totalUsers}
            pageCount={pageCount}
          />
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}