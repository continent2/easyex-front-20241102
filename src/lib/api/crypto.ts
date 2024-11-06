import { env } from '@/env';
import { defaultAxios } from '@/lib/api/apiClient';

// 가상화폐 전체 조회
export const getCryptos = async (typecf: 'F' | 'C') => {
  return defaultAxios.get('/queries/rows/tokens/active/1', {
    params: {
      typecf,
      nettype: env.netType,
    },
  });
};
