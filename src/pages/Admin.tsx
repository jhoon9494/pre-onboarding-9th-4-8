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
} from '@chakra-ui/react';
import PageButtonList from '@/components/PageButtonList';
import usePagination from '@/lib/hooks/usePagination';

const Admin = () => {
  const { pageData, startPage, endPage, pageSize } = usePagination();

  return (
    <VStack maxW="1280px" mx="auto" py="10">
      <Heading>주문 목록</Heading>

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
