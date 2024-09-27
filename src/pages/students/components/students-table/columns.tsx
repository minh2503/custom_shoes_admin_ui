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
    header: 'Tên học sinh',
    cell: (info) => info.getValue(),
    enableSorting: true
  },
  {
    accessorKey: 'address',
    header: 'Địa chỉ'
  },
  {
    accessorKey: 'gender',
    header: 'Giới tính',
    cell: (info) => {
      return info.getValue() ? 'Nam' : 'Nữ';
    }
  },
  {
    accessorKey: 'parentName',
    header: 'Tên phụ huynh'
  },
  {
    accessorKey: 'joinAt',
    header: 'Ngày tham gia',
    cell: (info) => helper.convertToDate(info.getValue())
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
