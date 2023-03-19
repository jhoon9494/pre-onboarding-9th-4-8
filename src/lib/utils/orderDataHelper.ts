import { IOrderData } from '@/interface/order';

export const generatePageList = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const DateFilter = (data: IOrderData[], dateOption: string | null) => {
  return data.filter((order) => {
    if (dateOption) {
      const orderDate = new Date(order.transaction_time).toDateString();
      const filterDate = new Date(dateOption).toDateString();
      return orderDate === filterDate;
    }
    return order;
  });
};
