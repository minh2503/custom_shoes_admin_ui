import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RecentSales() {
  return (
    <div className="space-y-8 overflow-auto">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nguyễn Thị A</p>
          <p className="text-sm text-muted-foreground">
            Đơn hàng customize mới
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p className="text-end">5 phút trước</p>
          <p className="text-red-400">Chưa thanh toán</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nguyễn Thị A</p>
          <p className="text-sm text-muted-foreground">Đơn hàng thường</p>
        </div>
        <div className="ml-auto font-medium">
          <p className="text-end">6 phút trước</p>
          <p className="text-green-400">Đã thanh toán</p>
        </div>
      </div>
    </div>
  );
}
