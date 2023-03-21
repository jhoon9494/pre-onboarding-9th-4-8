import { useQuery } from '@tanstack/react-query';
import { getOrderData } from '@/api/order';

const useGetOrderData = (
  pageNum = 1,
  date: string | null,
  sortType: string | null,
  status: string | null,
) => {
  return useQuery({
    queryKey: ['/mock/order', pageNum, date, sortType, status],
    queryFn: () =>
      getOrderData(pageNum - 1, date, sortType, status).then((res) => res.data),
    refetchInterval: 5000,
  });
};

export default useGetOrderData;
