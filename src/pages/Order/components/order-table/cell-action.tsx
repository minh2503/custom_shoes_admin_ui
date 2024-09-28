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
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [listProduct, setListProduct] = useState<Product[]>(initialListProduct);
  const [updatedPrices, setUpdatedPrices] = useState<{ [key: number]: number }>(
    {}
  );
  console.log(data);

  const [isUpdating, setIsUpdating] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const onConfirm = async () => {
    setOpen(false);
  };

  const handleUpdatePrices = async () => {
    // Lấy danh sách sản phẩm tùy chỉnh đã cập nhật giá
    const customizedProducts = listProduct
      .filter(
        (product) =>
          product.isCustomize && updatedPrices[product.id] !== undefined
      )
      .map((product) => ({
        id: product.id,
        price: updatedPrices[product.id]
      }));

    if (customizedProducts.length === 0) {
      setError('Không có giá tiền nào được cập nhập.');
      return;
    }

    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch('/api/update-prices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products: customizedProducts })
      });

      if (!response.ok) {
        throw new Error('Cập nhật giá tiền không thành công.');
      }

      const data = await response.json();
      console.log('Cập nhật thành công:', data);

      const updatedList = listProduct.map((product) =>
        updatedPrices[product.id] !== undefined
          ? { ...product, price: updatedPrices[product.id] }
          : product
      );
      setListProduct(updatedList);

      // Reset trạng thái updatedPrices
      setUpdatedPrices({});
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra.');
    } finally {
      setIsUpdating(false);
    }
  };

  // Hàm tính Tổng tiền (giá tổng của tất cả sản phẩm)
  const calculateTotalPrice = () => {
    return listProduct.reduce((total, product) => {
      const price =
        updatedPrices[product.id] !== undefined
          ? updatedPrices[product.id]
          : product.price;
      return total + price * product.quantity;
    }, 0);
  };

  // Hàm định dạng tiền tệ theo VNĐ
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
        <DialogContent className="h-[80dvh] w-[75%]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[65%,35%]">
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
                            Giá tạm tính:{' '}
                            <span className="text-yellow-500">
                              {formatCurrency(
                                (updatedPrices[product.id] !== undefined
                                  ? updatedPrices[product.id]
                                  : product.price) * product.quantity
                              )}
                            </span>
                          </p>
                          {product.isCustomize && (
                            <div className="flex items-center gap-2">
                              <p className="flex items-center">
                                Giá thực tế
                                <ToolTip description="Giá cuối của 1 sản phẩm sau khi custom" />
                              </p>
                              <Input
                                type="number"
                                className="w-[120px]"
                                value={
                                  updatedPrices[product.id] !== undefined
                                    ? updatedPrices[product.id]
                                    : ''
                                }
                                placeholder="Nhập giá"
                                onChange={(e) => {
                                  const value = e.target.value.trim();
                                  if (value === '') {
                                    // Xóa giá đã cập nhật nếu input trống
                                    const newPrices = { ...updatedPrices };
                                    delete newPrices[product.id];
                                    setUpdatedPrices(newPrices);
                                  } else {
                                    const num = Number(value);
                                    if (!isNaN(num) && num >= 0) {
                                      setUpdatedPrices({
                                        ...updatedPrices,
                                        [product.id]: num
                                      });
                                    }
                                  }
                                }}
                              />
                              đ
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Nút Hành Động */}
                  <div className="flex gap-4">
                    <Button
                      variant="default"
                      className="w-full bg-yellow-300 text-black"
                      onClick={() => {
                        console.log('Tải ảnh sản phẩm clicked');
                      }}
                    >
                      Tải ảnh sản phẩm
                    </Button>
                    <Button
                      variant="default"
                      className="w-full bg-yellow-300 text-black"
                      onClick={handleUpdatePrices}
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                          Cập nhật...
                        </>
                      ) : (
                        'Cập nhập giá tiền'
                      )}
                    </Button>
                  </div>
                  {/* Thông Báo Lỗi */}
                  {error && <p className="mt-2 text-red-500">{error}</p>}
                </div>

                {/* Phần Hóa Đơn */}
                <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
                  <h1 className="text-lg font-bold text-black">Hóa đơn</h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="text-black">
                        Tổng tiền ({listProduct.length} sản phẩm) :
                      </p>
                      <p className="text-yellow-500">
                        {formatCurrency(calculateTotalPrice())}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-black">Phí giao hàng: </p>
                      <p className="text-yellow-500">30,000 đ</p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                    <div className="flex justify-between">
                      <p className="text-black">Tổng cộng (đã bao gồm VAT):</p>
                      <p className="text-yellow-500">
                        {formatCurrency(calculateTotalPrice() + 30000)}
                      </p>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-gray-400"></div>

                  {/* Nút Xác Nhận Đơn Hàng */}
                  <Button
                    variant="default"
                    className="w-full bg-yellow-300 text-black"
                    onClick={() => {
                      // Thực hiện chức năng xác nhận đơn hàng
                      console.log('Xác nhận đơn hàng clicked');
                    }}
                  >
                    Giao hàng
                  </Button>
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
