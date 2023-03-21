import { FormEvent, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchData = searchParams.get('search');

  const onSearch = (e: FormEvent) => {
    e.preventDefault();

    const value = inputRef.current?.value || '';
    searchParams.set('search', value);
    setSearchParams(searchParams);

    formRef.current?.reset();
  };

  const onReset = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  return { onSearch, searchData, formRef, inputRef, onReset };
};

export default useSearch;
