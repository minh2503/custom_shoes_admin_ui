import ChartAnalysis from '../analysis/chart-analysis';

export default function OverView() {
  return (
    <div className="grid h-[80%] grid-cols-2 gap-4">
      <ChartAnalysis
        title="Tổng doanh thu theo loại sản phẩm"
        labels={['Sản phẩm thuần', 'Sản phẩm custom']}
        label="Số lượng sản phẩm bán được"
        backgroundColor="rgba(255, 205, 86, 0.2)"
        borderColor="rgb(255, 205, 86)"
        borderWidth={1}
        TData={[150, 200]}
      />
      <ChartAnalysis
        title="Top 5 brand giày bán chạy nhất"
        labels={['Giày nam', 'Giày nữ', 'Jordan', 'Covert', 'Thể thao']}
        label="Số lượng sản phẩm bán được"
        backgroundColor="rgba(255, 99, 132, 0.2)"
        borderColor="rgb(255, 99, 132)"
        borderWidth={1}
        TData={[150, 200, 120, 180, 90]}
      />
      <ChartAnalysis
        title="Top 5 sản phẩm giày thuần bán chạy nhất"
        labels={['Giày nam', 'Giày nữ', 'Jordan', 'Covert', 'Thể thao']}
        label="Số lượng sản phẩm bán được"
        backgroundColor="rgba(75, 192, 192, 0.2)"
        borderColor="rgba(75, 192, 192, 1)"
        borderWidth={1}
        TData={[150, 200, 120, 180, 90]}
      />
      <ChartAnalysis
        title="Top 5 sản phẩm giày custom chạy nhất"
        labels={['Giày nam', 'Giày nữ', 'Jordan', 'Covert', 'Thể thao']}
        label="Số lượng sản phẩm bán được"
        backgroundColor="rgba(153, 102, 255, 0.2)"
        borderColor="rgb(153, 102, 255)"
        borderWidth={1}
        TData={[150, 200, 120, 180, 90]}
      />
    </div>
  );
}
