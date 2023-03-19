import { useSearchParams } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';
import useFetch from '@/lib/hooks/usePagination';
import { generatePageList } from '@/lib/utils/pagenationHelper';

const PageButtonList = () => {
  const { startPage, endPage, pageSize } = useFetch();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageNumber = searchParams.get('page');
  const pageList = generatePageList(startPage, endPage);

  const onMovePage = (number: number, option?: number) => {
    if (option) {
      number += option;
    }
    const page = number.toString();
    searchParams.set('page', page);
    setSearchParams(searchParams);
  };

  return (
    <HStack>
      <Button
        type="button"
        onClick={() => onMovePage(Number(pageNumber), -1)}
        isDisabled={Number(pageNumber) === 1 || !pageNumber}
      >
        prev
      </Button>
      {pageList.map((page) => {
        return (
          <Button
            key={`${page}-button`}
            type="button"
            isActive={page === Number(pageNumber)}
            onClick={() => onMovePage(page)}
          >
            {page}
          </Button>
        );
      })}
      <Button
        type="button"
        onClick={() => onMovePage(Number(pageNumber), +1)}
        isDisabled={Number(pageNumber) === pageSize}
      >
        next
      </Button>
    </HStack>
  );
};

export default PageButtonList;
