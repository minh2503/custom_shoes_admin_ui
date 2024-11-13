// src/components/CellAction.jsx or similar
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Edit, MoreHorizontal, Eye } from 'lucide-react'; // Import Eye icon instead of Download
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useUpdateOrder } from '@/pages/revenue/queries/cart.query';
import { useDispatch } from 'react-redux';
import { setOrder } from '@/redux/order.slice';

interface CellActionProps {
  data: any;
}

const STATUS = {
  1: 'Chờ xác nhận',
  2: 'Xác nhận giao hàng',
  3: 'Xác nhận giao thành công',
  4: 'Xác nhận hủy',
  5: 'Đã hủy'
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState('');
  const [orderData, setOrderData] = useState(data);
  const { mutateAsync: updateOrder, isPending } = useUpdateOrder();
  const dispatch = useDispatch();

  const handleUpdatePrice = () => {
    const updatedOrderItems = orderData.orderItemDetailModels.map((item) => {
      if (item.id === data.orderItemDetailModels[0].id) {
        return { ...item, unitPrice: parseFloat(newPrice) };
      }
      return item;
    });

    setOrderData((prev) => ({
      ...prev,
      orderItemDetailModels: updatedOrderItems
    }));

    setIsEditingPrice(false);
    setNewPrice('');
  };

  const totalAmount = orderData?.orderItemDetailModels?.reduce(
    (acc, cur) => acc + cur.unitPrice * cur.quantity,
    0
  );

  const handleUpdateStatus = async (id, status) => {
    const modelUpdate = {
      id: id,
      status: status + 1,
      amount: totalAmount,
      note: orderData?.note,
      shipAddress: orderData?.shipAddress,
      paymentMethod: orderData?.paymentMethod
    };
    try {
      await updateOrder(modelUpdate);
      dispatch(setOrder(true));
      setOpenDialog(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  // Updated function to handle image viewing
  const handleViewImage = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      {/* AlertModal can be re-enabled if needed */}

      {/* Dialog Chi Tiết Đơn Hàng */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="h-[80dvh] w-[75%]">
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
            <DialogDescription>
              <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[45%,55%]">
                <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
                  <h1 className="text-lg font-bold text-black">Sản phẩm</h1>
                  {orderData?.orderItemDetailModels?.map((product) => (
                    <div className="flex w-full" key={product.id}>
                      <div className="relative">
                        <img
                          className="h-[200px] w-[400px] object-cover duration-300 hover:scale-105"
                          src={product.shoesImage.thumbnail}
                          alt={product.shoesModel.name}
                        />
                        {/* View Image Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-2 rounded-full bg-white bg-opacity-75 p-1"
                          onClick={() =>
                            handleViewImage(product.shoesImage.thumbnail)
                          }
                          title="View Image"
                        >
                          <Eye className="h-4 w-4 text-gray-700" />{' '}
                          {/* Changed icon */}
                        </Button>
                      </div>
                      <div className="ml-3 mt-3 flex w-full justify-between">
                        {/* Tên và size sản phẩm */}
                        <div>
                          <p>{product.shoesModel.name}</p>
                          <p className="text-muted-foreground">
                            Size: {product.size}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                          <div className="flex flex-col gap-4">
                            <p>Số lượng: {product.quantity}</p>
                          </div>
                          <div>
                            <p>
                              Giá:{' '}
                              <span className="text-orange">
                                {product.unitPrice * product.quantity}
                              </span>{' '}
                              đ
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phần Hóa Đơn */}
                <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
                  <h1 className="text-lg font-bold text-black">Hóa đơn</h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between">
                      <p className="text-black">Tổng tiền</p>
                      <p className="font-bold text-red">{totalAmount} đ</p>
                    </div>

                    <div className="flex justify-between">
                      <p className="text-black">Phí giao hàng: </p>
                      <p className="font-bold text-red">30,000 đ</p>
                    </div>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                    <div className="flex justify-between">
                      <p className="text-black">Tổng cộng (đã bao gồm VAT):</p>
                      <p className="font-bold text-red">
                        {totalAmount + 30000} đ
                      </p>
                    </div>
                  </div>
                  <div className="h-[1px] w-full bg-gray-400"></div>
                  <div className="mb-4 pb-2">
                    <h1 className="mt-2 text-xl font-bold">
                      Chi tiết đơn hàng
                    </h1>
                    <div className="grid grid-cols-[60%,40%] gap-4">
                      <div className="mt-2 flex flex-col gap-2 border-r-2">
                        <p>Người nhận: {orderData?.note}</p>
                        <p>Địa chỉ: {orderData?.shipAddress}</p>
                      </div>
                      <div>
                        <div>
                          <p className="font-bold"> Phương thức thanh toán: </p>
                          <p className="font-normal">
                            {orderData?.paymentMethod === 1
                              ? 'Thanh toán khi nhận hàng'
                              : 'Chuyển khoản'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Nút Cập Nhật Giá và Trạng Thái Đơn Hàng */}
                  <div className="grid grid-cols-2 gap-4">
                    {isEditingPrice ? (
                      <div className="flex items-center justify-between gap-4">
                        <Input
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          type="number"
                          placeholder="Nhập giá tiền mới"
                          className="w-full"
                        />
                        <Button
                          variant="default"
                          className="w-full bg-green-300 text-black"
                          onClick={handleUpdatePrice}
                          disabled={isPending}
                        >
                          Xác nhận
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        className="w-full bg-yellow-300 text-black"
                        onClick={() => setIsEditingPrice(true)}
                        disabled={orderData?.status !== 2}
                      >
                        Cập nhật giá tiền
                      </Button>
                    )}
                    <Button
                      variant="default"
                      className="w-full bg-yellow-300 text-black"
                      onClick={() =>
                        handleUpdateStatus(orderData?.id, orderData?.status)
                      }
                      disabled={isPending}
                    >
                      {STATUS[orderData?.status]}
                    </Button>
                  </div>
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
