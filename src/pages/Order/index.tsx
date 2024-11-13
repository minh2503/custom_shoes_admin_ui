// src/pages/revenue/OrderPage.jsx or similar
import { useEffect, useState } from 'react';
import OrderTable from './components/order-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import BasePages from '@/components/shared/base-pages';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setOrder } from '@/redux/order.slice';

const STATUS = {
  orderconfirm: 2,
  ordershipping: 3,
  orderdone: 4
};

export default function OrderPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 20);
  const orderRedux = useSelector((state: RootState) => state.order);
  const [paging, setPaging] = useState({
    ...PagingModel,
    pageNumber: page,
    pageSize: pageLimit
  });
  const [tabSelected, setTabSelected] = useState('all_order');
  const dispatch = useDispatch();

  const {
    data: allOrder,
    isLoading: loadingAllOrder,
    refetch: refetchAllOrder
  } = useGetAllOrder(paging);
  const { data: orderByStatus, mutateAsync: refetchOrderByStatus } =
    useGetOrderByStatus();

  useEffect(() => {
    handleFetchData(tabSelected, paging);
  }, [tabSelected, refetchAllOrder, orderRedux]);

  const handleFetchData = async (tabSelected, paging) => {
    if (orderRedux?.updated == true) {
      await refetchAllOrder();
      await refetchOrderByStatus(paging);
      dispatch(setOrder(false));
    } else if (tabSelected === 'all_order') {
      await refetchAllOrder();
    } else {
      console.log('tabSelected', tabSelected);
      const model = { ...paging, orderStatus: STATUS[tabSelected] };
      await refetchOrderByStatus(model);
    }
  };

  const listOrder =
    tabSelected === 'all_order'
      ? allOrder?.listObjects || []
      : orderByStatus?.listObjects || [];

  const handleTabChange = (status, tabName) => {
    setTabSelected(tabName);
    setPaging((prev) => ({ ...prev, orderStatus: status }));
  };

  if (loadingAllOrder) {
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
      <Tabs
        value={tabSelected}
        onValueChange={setTabSelected}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger
            value="all_order"
            onClick={() => handleTabChange(1, 'all_order')}
          >
            Tất cả đơn hàng
          </TabsTrigger>
          <TabsTrigger
            value="orderconfirm"
            onClick={() => handleTabChange(2, 'orderconfirm')}
          >
            Đã xác nhận
          </TabsTrigger>
          <TabsTrigger
            value="ordershipping"
            onClick={() => handleTabChange(3, 'ordershipping')}
          >
            Đang giao
          </TabsTrigger>
          <TabsTrigger
            value="orderdone"
            onClick={() => handleTabChange(4, 'orderdone')}
          >
            Giao thành công
          </TabsTrigger>
        </TabsList>
        <TabsContent value={tabSelected} className="space-y-4">
          {listOrder.length > 0 ? (
            <OrderTable
              users={listOrder}
              page={page}
              totalUsers={
                allOrder?.total_users || orderByStatus?.total_users || 0
              }
              pageCount={Math.ceil(
                (allOrder?.total_users || orderByStatus?.total_users || 0) /
                  pageLimit
              )}
            />
          ) : (
            <OrderTable users={[]} page={page} totalUsers={0} pageCount={0} />
          )}
        </TabsContent>
      </Tabs>
    </BasePages>
  );
}
