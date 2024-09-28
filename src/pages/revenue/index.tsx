import { useGetStudents } from './queries/queries';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
import RevenueAnalysis from './components/analysis/revenue-analysis';
import BestBrandSell from './components/analysis/best-brand-sell';
import BestProductSell from './components/analysis/best-product-sell';

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
      <div className="grid grid-cols-2 gap-4">
        <RevenueAnalysis />
        <BestBrandSell />
        <BestProductSell />
      </div>
    </BasePages>
  );
}
