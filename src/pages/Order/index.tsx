import OrderDoneTable from './components/order-done-table';
import OrderPendingTable from './components/order-pending-table';
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
      <Tabs defaultValue="orderpending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orderpending">Đơn hàng chờ xử lý</TabsTrigger>
          <TabsTrigger value="orderdone">Đơn hàng đã xử lý</TabsTrigger>
        </TabsList>
        <TabsContent value="orderdone" className="space-y-4">
          <OrderDoneTable
            users={users}
            page={page}
            totalUsers={totalUsers}
            pageCount={pageCount}
          />
        </TabsContent>
        <TabsContent value="orderpending" className="space-y-4">
          <OrderPendingTable
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
