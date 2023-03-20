import { Button, HStack } from '@chakra-ui/react';
import { generatePageList } from '@/lib/utils/orderDataHelper';
import { IPageButtonList } from '@/interface/props';
import useQueryString from '@/lib/hooks/useQueryString';

const PageButtonList = ({ startPage, endPage, pageSize }: IPageButtonList) => {
  const { getParam, setParam } = useQueryString('page');
  const pageNumber = getParam();
  const pageList = generatePageList(startPage, endPage);

  const onMovePage = (number: number, option?: number) => {
    if (option) {
      number += option;
    }
    const page = number.toString();
    setParam(page);
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
              index === 0 && !getParam() ? true : page === Number(pageNumber)
            }
            onClick={() => onMovePage(page)}
          >
            {page}
          </Button>
        );
      })}
      <Button
        type="button"
        onClick={() => {
          if (!getParam()) onMovePage(Number(pageNumber), 2);
          else onMovePage(Number(pageNumber), 1);
        }}
        isDisabled={Number(pageNumber) === pageSize}
      >
        next
      </Button>
    </HStack>
  );
};

export default PageButtonList;
