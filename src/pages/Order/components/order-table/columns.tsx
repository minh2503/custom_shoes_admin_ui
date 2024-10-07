import { Checkbox } from '@/components/ui/checkbox';
import { Order } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import helper from '@/helpers/index';
const STATUS = {
  1: 'Chờ xác nhận',
  2: 'Đã xác nhận',
  3: 'Đang giao hàng',
  4: 'Đã giao hàng',
  5: 'Đã hủy'
};

export const columns: ColumnDef<Order>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'orderCode',
    header: 'Mã đơn hàng',

    enableSorting: true
  },
  {
    accessorKey: 'userName',
    header: 'Tên khách hàng 2',
    enableSorting: true
  },
  {
    accessorKey: 'shipAddress',
    header: 'Địa chỉ giao hàng'
  },
  {
    accessorKey: 'phone',
    header: 'Số điện thoại'
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày đặt hàng',
    cell: (info) => {
      const date = info.getValue() as string;
      return <span>{helper.convertToDate(date)}</span>;
    }
  },
  {
    accessorKey: 'shippedDate',
    header: 'Ngày giao hàng'
  },
  {
    accessorKey: 'amount',
    header: 'Tổng tiền'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: (info) => {
      const status = info.getValue() as number;
      return (
        <span
          className={`text-sm font-semibold text-${status == 2 ? 'green' : status == 3 ? 'green' : status == 4 ? 'green' : 'red'}-500`}
        >
          {STATUS[status]}
        </span>
      );
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
