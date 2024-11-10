import { defaultAxios } from '@/lib/api/apiClient';

// 유저 계좌 전체 조회
export const getAccounts = async ({
  offset,
  limit,
  orderKey,
  order,
  filterkey,
  filterval,
}: {
  offset?: number;
  limit?: number;
  orderKey?: string;
  order?: 'ASC' | 'DESC';
  filterkey?: string;
  filterval?: string;
}) => {
  return defaultAxios.get(
    `/queriesauth/rows/useraccounts/active/1/${offset}/${limit}/${orderKey}/${order}`,
    {
      params: {
        filterkey,
        filterval,
      },
    },
  );
};

// 관리자 계좌 전체 조회
export const getAdminAccounts = async ({
  typecf,
  symbol,
  nettype,
}: {
  typecf: 'F' | 'C';
  symbol?: string;
  nettype?: string;
}) => {
  return defaultAxios.get('/queries/rows/adminaccounts/active/1', {
    params: {
      typecf,
      symbol,
      nettype,
    },
  });
};
