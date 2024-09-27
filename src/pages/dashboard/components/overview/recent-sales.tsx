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
            Ngày đặt tư vấn: 13:00 12/12/2021
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p>SĐT: 0941820201</p>
          <p className="text-red-400">Chưa tư vấn</p>
        </div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Nguyễn Thị A</p>
          <p className="text-sm text-muted-foreground">
            Ngày đặt tư vấn: 13:00 12/12/2021
          </p>
        </div>
        <div className="ml-auto font-medium">
          <p>SĐT: 0941820201</p>
          <p className="text-green-400">Đã tư vấn</p>
        </div>
      </div>
    </div>
  );
}
