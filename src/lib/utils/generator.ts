import { IOrderItem } from '@/interface/main';
import { formatDate } from './formattingHelper';

const maxDate = (dates: Date[]) => new Date(Math.max(...dates.map(Number)));
const minDate = (dates: Date[]) => new Date(Math.min(...dates.map(Number)));
const DateToNum = (date: string) => Number(new Date(date));

export const generateStartAndEndDate = (data: IOrderItem[]) => {
  const dateList = data.map(
    ({ transaction_time }) => new Date(transaction_time),
  );

  const startDate = formatDate(minDate(dateList));
  const endDate = formatDate(maxDate(dateList));

  return { startDate, endDate };
};

export const generateZeroToNArr = (n: number) => Array.from(Array(n).keys());

export const generateSortedList = (
  array: IOrderItem[],
  sortType: string | null,
) => {
  return [...array].sort((a, b) => {
    if (sortType === 'id') {
      return a.id - b.id;
    }
    if (sortType === 'reverse-id') {
      return b.id - a.id;
    }
    if (sortType === 'time') {
      return DateToNum(b.transaction_time) - DateToNum(a.transaction_time);
    }
    if (sortType === 'reverse-time') {
      return DateToNum(a.transaction_time) - DateToNum(b.transaction_time);
    }
    return a.id - b.id;
  });
};
