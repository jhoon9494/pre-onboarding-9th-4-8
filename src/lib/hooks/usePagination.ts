import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrderList } from '@/api/order';
import { IOrderData } from '@/interface/order';
import { PAGE_LENGTH, PER_PAGE } from '@/constants/pagenation';
import { DateFilter } from '../utils/orderDataHelper';

const usePagination = () => {
  const [rawData, setRawData] = useState<IOrderData[]>([]);
  const [searchParams] = useSearchParams({ page: '1' });

  const pageCount = Number(searchParams.get('page'));
  const tabCount = Math.floor(pageCount / (PAGE_LENGTH + 1));

  const filteredData = DateFilter([...rawData], searchParams.get('today'));
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
    getOrderList('mock/mock_data.json').then(setRawData).catch(console.error);
  }, []);

  return { pageData, startPage, endPage, pageSize };
};

export default usePagination;
