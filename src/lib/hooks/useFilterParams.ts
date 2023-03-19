import { useSearchParams } from 'react-router-dom';

const useFilterParams = (param: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleFilter = (value: string) => {
    searchParams.set('page', '1');
    setSearchParams(searchParams);

    if (!searchParams.get(param)) {
      searchParams.append(param, value);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(param);
      setSearchParams(searchParams);
    }
  };

  const hasFilter = !!searchParams.get(param);

  return { toggleFilter, hasFilter };
};

export default useFilterParams;
