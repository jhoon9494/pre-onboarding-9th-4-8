import { useSearchParams } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';
import { generatePageList } from '@/lib/utils/orderDataHelper';
import { IPageButtonList } from '@/interface/props';

const PageButtonList = ({ startPage, endPage, pageSize }: IPageButtonList) => {
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
      {pageList.map((page, index) => {
        return (
          <Button
            key={`${page}-button`}
            type="button"
            isActive={
              index === 0 && !searchParams.get('page')
                ? true
                : page === Number(pageNumber)
            }
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
