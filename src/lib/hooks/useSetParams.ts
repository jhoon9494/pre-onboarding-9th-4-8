import { useSearchParams } from 'react-router-dom';
import { IOnSetParams } from '@/interface/main';

const useSetParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentDate = searchParams.get('date');

  const onSetParams = ({ pageValue, dateValue, event }: IOnSetParams) => {
    if (pageValue !== undefined) searchParams.set('page', String(pageValue));
    if (dateValue !== undefined) searchParams.set('date', String(dateValue));
    if (!dateValue) searchParams.delete('date');

    if (event) searchParams.set('date', String(event.target.value));

    setSearchParams(searchParams);
    window.scrollTo(0, 0);
  };

  const sortType = searchParams.get('sort') || 'id';
  const setSortType = (type: string) => {
    if (sortType === type) searchParams.set('sort', `reverse-${type}`);
    else searchParams.set('sort', type);
    setSearchParams(searchParams);
  };

  const status = searchParams.get('status');
  const setStatus = (value: string) => {
    if (!value) searchParams.delete('status');
    else {
      if (status === value) searchParams.set('status', 'false');
      else searchParams.set('status', 'true');
    }
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return {
    currentPage,
    currentDate,
    onSetParams,
    sortType,
    setSortType,
    status,
    setStatus,
  };
};

export default useSetParams;
