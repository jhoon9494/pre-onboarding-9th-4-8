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

  return { currentPage, currentDate, onSetParams, sortType, setSortType };
};

export default useSetParams;
