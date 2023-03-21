import { useQuery } from '@tanstack/react-query';
import { getOrderData } from '@/api/order';
import { IFetchData } from '@/interface/main';

const useGetOrderData = (
  pageNum = 1,
  date: string | null,
  sortType: string | null,
  status: string | null,
  searchData: string | null,
) => {
  return useQuery<IFetchData>({
    queryKey: ['/mock/order', pageNum, date, sortType, status, searchData],
    queryFn: () =>
      getOrderData(pageNum - 1, date, sortType, status, searchData).then(
        (res) => res.data,
      ),
    refetchInterval: 5000,
  });
};

export default useGetOrderData;
