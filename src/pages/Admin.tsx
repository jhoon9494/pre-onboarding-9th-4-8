import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  VStack,
  Button,
} from '@chakra-ui/react';
import PageButtonList from '@/components/PageButtonList';
import usePagination from '@/lib/hooks/usePagination';
import useQueryString from '@/lib/hooks/useQueryString';

const Admin = () => {
  const { toggleParam: todayToggle, hasFilter } = useQueryString('today');
  const { pageData, startPage, endPage, pageSize } = usePagination();

  return (
    <VStack maxW="1280px" mx="auto" py="10">
      <Heading>주문 목록</Heading>
      <Button onClick={() => todayToggle('2023-03-08')} isActive={hasFilter}>
        오늘 거래 보기
      </Button>

      <TableContainer w="100%">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>주문 번호</Th>
              <Th>거래 시간</Th>
              <Th>주문 처리상태</Th>
              <Th>고객 번호</Th>
              <Th>고객 이름</Th>
              <Th>가격</Th>
            </Tr>
          </Thead>
          <Tbody>
            {pageData.map((data) => {
              return (
                <Tr key={`order-${data.id}`}>
                  <Td>{data.id}</Td>
                  <Td>{data.transaction_time}</Td>
                  <Td>{data.status ? 'True' : 'False'}</Td>
                  <Td>{data.customer_id}</Td>
                  <Td>{data.customer_name}</Td>
                  <Td>{data.currency}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <PageButtonList
        startPage={startPage}
        endPage={endPage}
        pageSize={pageSize}
      />
    </VStack>
  );
};

export default Admin;
