import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getOrderList } from '@/api/order';
import { IOrderData } from '@/interface/order';
import { PAGE_LENGTH, PER_PAGE } from '@/constants/pagenation';

const usePagination = () => {
  const [rawData, setRawData] = useState<IOrderData[]>([]);
  const [searchParams] = useSearchParams();

  const pageCount = searchParams.get('page')
    ? Number(searchParams.get('page'))
    : 1;
  const tabCount = Math.floor(pageCount / (PAGE_LENGTH + 1));

  const pageSize = Math.ceil(rawData.length / PER_PAGE);
  const pageData = [...rawData].splice(PER_PAGE * (pageCount - 1), PER_PAGE);

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
