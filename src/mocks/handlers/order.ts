import { rest } from 'msw';
import { formatDollarToNumber } from '@/lib/utils/formattingHelper';
import {
  generateSortedList,
  generateStartAndEndDate,
} from '@/lib/utils/generator';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = [
  rest.get('/mock/order', (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));
    const date = req.url.searchParams.get('date');
    const sortType = req.url.searchParams.get('sortType');
    const status = req.url.searchParams.get('status');
    const searchData = req.url.searchParams.get('searchData');

    const dataOfSelectedDate = date
      ? mockData.filter((item) => item.transaction_time.split(' ')[0] === date)
      : mockData;

    const dataOfSearch = searchData
      ? dataOfSelectedDate.filter((item) =>
          item.customer_name.toUpperCase().includes(searchData.toUpperCase()),
        )
      : dataOfSelectedDate;

    const dataOfSortedByTimeOrId = generateSortedList(dataOfSearch, sortType);

    const dataOfFilteredByStatus = status
      ? [...dataOfSortedByTimeOrId].filter(
          (item) => String(item.status) === status,
        )
      : dataOfSortedByTimeOrId;

    const { startDate, endDate } = generateStartAndEndDate(dataOfSelectedDate);

    return res(
      ctx.json({
        order: [...dataOfFilteredByStatus].splice(offset * limit, limit),
        orderInfo: {
          totalCount: dataOfFilteredByStatus.length,
          totalCurrency: dataOfFilteredByStatus.reduce(
            (acc, cur) => acc + formatDollarToNumber(cur.currency),
            0,
          ),
          startDate,
          endDate,
        },
      }),
    );
  }),
];
