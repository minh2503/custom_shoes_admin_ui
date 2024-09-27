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
    header: 'Tên khách hàng 2',
    enableSorting: true
  },
  {
    accessorKey: 'shipAddress',
    header: 'Địa chỉ giao hàng'
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày tạo'
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
    cell: () => <div>Đang giải quyết</div>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
