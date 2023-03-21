import { ITEMS_PER_PAGE } from '@/constants/units';

export const formatDollarToNumber = (str: string) => Number(str.split('$')[1]);

export const formatNumToDollar = (num: number | undefined = 0) =>
  `$ ${num.toLocaleString('en')}`;

export const formatDate = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const formatPageInfo = (
  currentPage: number,
  currentLength: number | undefined = 0,
  totalLength: number | undefined = 0,
) =>
  `Showing ${currentPage * ITEMS_PER_PAGE - (ITEMS_PER_PAGE - 1)} - ${
    currentPage * ITEMS_PER_PAGE - ITEMS_PER_PAGE + currentLength
  } out of ${totalLength}`;
