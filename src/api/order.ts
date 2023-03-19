import { orderAPI } from '@/api';

export const getOrderList = async (url: string) => {
  try {
    const res = await orderAPI.get(url);
    return res.data;
  } catch (e) {
    throw new Error('데이터가 없습니다.');
  }
};
