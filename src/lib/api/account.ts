import { defaultAxios } from '@/lib/api/apiClient';

export const getAccounts = async ({
  offset,
  limit,
  orderKey,
  order,
  filterkey,
  filterval,
}: {
  offset: number;
  limit: number;
  orderKey: string;
  order: 'ASC' | 'DESC';
  filterkey: string;
  filterval: string;
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
