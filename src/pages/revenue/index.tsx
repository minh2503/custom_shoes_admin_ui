// import { useState, useEffect } from 'react';
// import BasePages from '@/components/shared/base-pages';
// import { Input } from '@/components/ui/input';
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger
// } from '@/components/ui/tabs.js';
// import OverView from './components/overview';
// import { useDebounce } from '@/hooks/debounce';
// // Custom debounce hook

// type ProductType = {
//   id: string;
//   name: string;
// }[];

// export default function CheckInPage() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [products, setProducts] = useState<ProductType>([]);
//   const [isFocused, setIsFocused] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   useEffect(() => {
//     if (debouncedSearchTerm) {
//       setLoading(true);
//       fetch(`/api/search-products?query=${debouncedSearchTerm}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setProducts(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching products:', error);
//           setLoading(false);
//         });
//     } else {
//       setProducts([]);
//     }
//   }, [debouncedSearchTerm]);

//   return (
//     <BasePages
//       breadcrumbs={[
//         { title: 'Trang chủ', link: '/' },
//         { title: 'Doanh thu', link: '/revenue' }
//       ]}
//       pageHead="Quản lý doanh thu | Happy Kids"
//       className="h-full p-4 md:px-8"
//     >
//       <div className="flex w-full flex-col gap-2">
//         <div>
//           <Tabs defaultValue="all" className="space-y-4">
//             <TabsList>
//               <TabsTrigger value="all">Thống kê tổng quan</TabsTrigger>
//               <TabsTrigger value="product">Thống kê sản phẩm</TabsTrigger>
//             </TabsList>
//             <TabsContent value="all" className="space-y-4">
//               <OverView />
//             </TabsContent>
//             <TabsContent value="product" className="space-y-4">
//               <div className="relative flex flex-col gap-4">
//                 {/* Thanh tìm kiếm */}
//                 <Input
//                   placeholder="Tìm kiếm sản phẩm"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setTimeout(() => setIsFocused(false), 200)}
//                 />

//                 {/* Hiển thị loading */}
//                 {loading && (
//                   <div className="p-2 text-gray-500">Đang tải...</div>
//                 )}

//                 {/* Hiển thị danh sách sản phẩm */}
//                 {isFocused && searchTerm && !loading && (
//                   <div className="absolute left-0 right-0 top-12 z-10 max-h-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
//                     {products.length > 0 ? (
//                       products.map((product) => (
//                         <div
//                           key={product.id}
//                           className="cursor-pointer p-2 hover:bg-gray-100"
//                         >
//                           {product.name}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-2 text-gray-500">
//                         Không có sản phẩm phù hợp
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </BasePages>
//   );
// }

import { useState, useEffect } from 'react';
import BasePages from '@/components/shared/base-pages';
import { Input } from '@/components/ui/input';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.js';
import OverView from './components/overview';
import { useDebounce } from '@/hooks/debounce';

// Custom debounce hook

type ProductType = {
  id: string;
  name: string;
  price: string;
  sales: number;
};

export default function CheckInPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType>(); // State để lưu trữ sản phẩm được chọn

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Fake data (dữ liệu giả cho sản phẩm)
  useEffect(() => {
    const fakeData: ProductType[] = [
      { id: '1', name: 'Sản phẩm A', price: '200,000 VND', sales: 150 },
      { id: '2', name: 'Sản phẩm B', price: '300,000 VND', sales: 100 },
      { id: '3', name: 'Sản phẩm C', price: '500,000 VND', sales: 200 }
    ];

    if (debouncedSearchTerm) {
      setLoading(true);

      // Giả lập gọi API bằng cách lọc danh sách sản phẩm giả dựa trên từ khóa tìm kiếm
      const filteredProducts = fakeData.filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      setTimeout(() => {
        setProducts(filteredProducts);
        setLoading(false);
      }, 500); // Giả lập độ trễ của API
    } else {
      setProducts([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <BasePages
      breadcrumbs={[
        { title: 'Trang chủ', link: '/' },
        { title: 'Doanh thu', link: '/revenue' }
      ]}
      pageHead="Quản lý doanh thu | Happy Kids"
      className="h-full p-4 md:px-8"
    >
      <div className="flex w-full flex-col gap-2">
        <div>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Thống kê tổng quan</TabsTrigger>
              <TabsTrigger value="product">Thống kê sản phẩm</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <OverView />
            </TabsContent>
            <TabsContent value="product" className="space-y-4">
              <div className="relative flex flex-col gap-4">
                {/* Thanh tìm kiếm */}
                <Input
                  placeholder="Tìm kiếm sản phẩm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                />

                {/* Hiển thị loading */}
                {loading && (
                  <div className="p-2 text-gray-500">Đang tải...</div>
                )}

                {/* Hiển thị danh sách sản phẩm */}
                {isFocused && searchTerm && !loading && (
                  <div className="absolute left-0 right-0 top-12 z-10 max-h-48 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div
                          key={product.id}
                          className="cursor-pointer p-2 hover:bg-gray-100"
                          onClick={() => setSelectedProduct(product)} // Cập nhật sản phẩm được chọn
                        >
                          {product.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">
                        Không có sản phẩm phù hợp
                      </div>
                    )}
                  </div>
                )}

                {/* Hiển thị chi tiết sản phẩm được chọn */}
                {selectedProduct && (
                  <div className="mt-4 rounded-md border bg-gray-50 p-4">
                    <h3 className="text-xl font-bold">
                      {selectedProduct.name}
                    </h3>
                    <p>Giá: {selectedProduct.price}</p>
                    <p>Lượt bán: {selectedProduct.sales}</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </BasePages>
  );
}
