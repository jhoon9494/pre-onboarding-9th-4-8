import StatsArea from '@/components/StatsArea';
import OrderTableArea from '@/components/OrderTableArea';
import DatePicker from '@/components/DatePicker';
import useSetParams from '@/lib/hooks/useSetParams';
import useGetOrderData from '@/lib/hooks/useGetOrderData';
import useSearch from '@/lib/hooks/useSearch';

const AdminPage = () => {
  const { currentPage, currentDate, sortType, status } = useSetParams();
  const { searchData } = useSearch();
  const { data } = useGetOrderData(
    currentPage,
    currentDate,
    sortType,
    status,
    searchData,
  );
  return (
    <>
      <StatsArea data={data} />
      <DatePicker />
      <OrderTableArea data={data} />
    </>
  );
};

export default AdminPage;
