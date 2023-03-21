import { Button, Stack } from '@chakra-ui/react';
import useSetParams from '@/lib/hooks/useSetParams';
import { ITEMS_PER_PAGE } from '@/constants/units';
import { generateZeroToNArr } from '@/lib/utils/generator';

const TablePagination = ({
  totalCount = 0,
}: {
  totalCount: number | undefined;
}) => {
  const { currentPage, onSetParams } = useSetParams();

  return (
    <Stack spacing={2} direction="row" align="center">
      {generateZeroToNArr(Math.ceil(totalCount / ITEMS_PER_PAGE)).map((num) => (
        <Button
          type="button"
          colorScheme="blue"
          size="sm"
          key={num}
          onClick={() => onSetParams({ pageValue: num + 1 })}
          variant={currentPage === num + 1 ? 'solid' : 'outline'}
        >
          {num + 1}
        </Button>
      ))}
    </Stack>
  );
};

export default TablePagination;
