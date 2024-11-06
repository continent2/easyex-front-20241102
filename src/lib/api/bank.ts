import { defaultAxios } from '@/lib/api/apiClient';

// 은행 전체 조회
export const getBanks = async () => {
  return defaultAxios.get('/queries/rows/banks/active/1');
};
