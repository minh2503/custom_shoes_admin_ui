// CellAction.tsx

import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Student } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/ui/icons';
import ToolTip from '@/components/shared/tool-tip';

interface CellActionProps {
  data: Student;
}

interface Product {
  id: number;
  name: string;
  price: number;
  isCustomize: boolean;
  images: string;
  quantity: number;
  size: string;
}

const initialListProduct: Product[] = [
  {
    id: 1,
    name: 'Giày thể thao',
    price: 10000,
    isCustomize: true,
    images:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVVignlv1ddlu3F9cDIR6Tps3Gyyic4AtNQ&s',
    quantity: 2,
    size: '40'
  },
  {
    id: 2,
    name: 'Giày Adidas',
    price: 20000,
    isCustomize: false,
    images:
      'https://bizweb.dktcdn.net/thumb/1024x1024/100/427/145/products/adidas-gradas-white-black-gum-fw3378-2.jpg?v=1688291956197',
    quantity: 1,
    size: '41'
  },
  {
    id: 3, // Đảm bảo ID duy nhất
    name: 'Giày thể thao',
    price: 15000, // Giá khác để minh họa
    isCustomize: true,
    images:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfVVignlv1ddlu3F9cDIR6Tps3Gyyic4AtNQ&s',
    quantity: 1,
    size: '39'
  }
];

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  // Quản lý hiển thị modal xác nhận
  const [open, setOpen] = useState(false);

  // Quản lý hiển thị dialog chi tiết đơn hàng
  const [openDialog, setOpenDialog] = useState(false);

  // Quản lý danh sách sản phẩm, cho phép cập nhật giá
  const [listProduct, setListProduct] = useState<Product[]>(initialListProduct);

  // Quản lý giá đã cập nhật cho các sản phẩm tùy chỉnh
  const [updatedPrices, setUpdatedPrices] = useState<{ [key: number]: number }>(
    {}
  );

  // Quản lý trạng thái đang cập nhật API
  const [isUpdating, setIsUpdating] = useState(false);

  // Quản lý thông báo lỗi
  const [error, setError] = useState<string | null>(null);

  // Hàm xử lý xác nhận trong modal
  const onConfirm = async () => {
    setOpen(false);
    // Thực hiện các logic xác nhận thêm tại đây
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <>
      {/* Modal Xác Nhận */}
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isUpdating}
        title="Xác nhận"
        description="Xác nhận đơn hàng đã được giao thành công"
      />

      {/* Dialog Chi Tiết Đơn Hàng */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="h-[80dvh] w-[65%]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-1">
                {/* Phần Sản Phẩm */}
                <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
                  <h1 className="text-lg font-bold text-black">Sản phẩm</h1>
                  {listProduct.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 space-x-2"
                    >
                      <img
                        loading="lazy"
                        src={product.images}
                        alt={product.name}
                        className="h-[120px] w-[100px] rounded-lg object-cover"
                      />
                      <div className="flex w-full justify-between">
                        <div className="flex flex-col gap-2">
                          <p className="font-bold text-black">
                            {product.name}{' '}
                            {product.isCustomize && '(Sản phẩm custom)'}
                          </p>
                          <p>Số lượng: {product.quantity}</p>
                          <p>Size: {product.size}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-end">
                            Giá sản phẩm:{' '}
                            <span className="text-yellow-500">
                              {formatCurrency(
                                (updatedPrices[product.id] !== undefined
                                  ? updatedPrices[product.id]
                                  : product.price) * product.quantity
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Nút Hành Động */}
                  <div className="flex gap-4">
                    <Button
                      variant="default"
                      className="w-full bg-yellow-300 text-black"
                      disabled={isUpdating}
                    >
                      Xác nhận
                    </Button>
                  </div>
                  {/* Thông Báo Lỗi */}
                  {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Menu</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpenDialog(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Chi tiết đơn hàng
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
