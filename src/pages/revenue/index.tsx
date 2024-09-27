import { useGetStudents } from './queries/queries';
import StudentsTable from './checkin-table/index';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs.js';
import Student from './components/students/index';
import Teacher from './components/teachers/index';

export default function CheckInPage() {
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
        { title: 'Doanh thu', link: '/revenue' }
      ]}
      pageHead="Quản lý doanh thu | Happy Kids"
      className="p-4 md:px-8"
    >
      <h1 className="mb-4 text-2xl font-bold">
        Doanh thu tháng 9 - Happy Kids
      </h1>
      <Tabs defaultValue="student" className="space-y-4">
        <TabsList>
          <TabsTrigger value="student">Học sinh</TabsTrigger>
          <TabsTrigger value="teacher">Giáo viên</TabsTrigger>
        </TabsList>
        <Student />
        <Teacher />
      </Tabs>
      <StudentsTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </BasePages>
  );
}
