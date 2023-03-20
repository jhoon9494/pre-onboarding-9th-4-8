import { useSearchParams } from 'react-router-dom';

const useQueryString = (param: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleParam = (value: string) => {
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

  const getParam = () => {
    return searchParams.get(param) || '';
  };

  const setParam = (value: string) => {
    searchParams.set(param, value);
    setSearchParams(searchParams);
  };

  const hasFilter = !!searchParams.get(param);

  return { toggleParam, hasFilter, setParam, getParam };
};

export default useQueryString;
