import { Checkbox } from '@/components/ui/checkbox';
import { Student } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import helper from '@/helpers/index';
export const columns: ColumnDef<Student>[] = [
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
    accessorKey: 'name',
    header: 'Tên đơn hàng',

    enableSorting: true
  },
  {
    accessorKey: 'nameCustomer',
    header: 'Tên khách hàng',

    enableSorting: true
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày đặt hàng'
  },
  {
    accessorKey: 'shipAddress',
    header: 'Địa chỉ giao hàng'
  },
  {
    accessorKey: 'shipedDate',
    header: 'Ngày giao hàng'
  },
  {
    accessorKey: 'note',
    header: 'Ghi chú'
  },
  {
    accessorKey: 'amount',
    header: 'Tổng tiền'
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: (info) => (
      <div>
        {info.getValue() == 'success' ? (
          <span className="text-green-600">Giao hàng thành công</span>
        ) : (
          <span className="text-orange-500">Đang giao hàng</span>
        )}
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
