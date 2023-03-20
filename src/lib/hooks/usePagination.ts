import { useEffect, useState } from 'react';
import { getOrderList } from '@/api/order';
import { IOrderData } from '@/interface/order';
import { PAGE_LENGTH, PER_PAGE } from '@/constants/pagenation';
import { DateFilter } from '../utils/orderDataHelper';
import useQueryString from './useQueryString';

const usePagination = () => {
  const [rawData, setRawData] = useState<IOrderData[]>([]);
  const { getParam: getPage } = useQueryString('page');
  const { getParam: getToday } = useQueryString('today');

  const pageCount = getPage() ? Number(getPage()) : 1;
  const tabCount = Math.floor(pageCount / (PAGE_LENGTH + 1));

  const filteredData = DateFilter([...rawData], getToday());
  const pageSize = Math.ceil(filteredData.length / PER_PAGE);
  const pageData = [...filteredData].splice(
    PER_PAGE * (pageCount - 1),
    PER_PAGE,
  );

  const startPage = PAGE_LENGTH * tabCount + 1;
  const endPage =
    startPage + PAGE_LENGTH - 1 < pageSize
      ? startPage + PAGE_LENGTH - 1
      : pageSize;

  useEffect(() => {
    const fetchData = () => {
      getOrderList('mock/mock_data.json').then(setRawData).catch(console.error);
    };

    let timer: NodeJS.Timeout;
    const refetch = () => {
      fetchData();
      timer = setTimeout(refetch, 5000);
    };
    refetch();
    return () => clearInterval(timer);
  }, []);

  return { pageData, startPage, endPage, pageSize };
};

export default usePagination;
