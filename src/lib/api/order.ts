import { defaultAxios } from '@/lib/api/apiClient';

export const getOrders = async ({
  offset,
  limit,
}: {
  offset: number;
  limit: number;
}) => {
  return defaultAxios.get(
    `/queriesauth/rows/txorders/${offset}/${limit}/createdat/DESC`,
  );
};

export const deleteOrder = async (uuid: string) => {
  return defaultAxios.delete(`/queriesauth/txorders/soft/uuid/${uuid}`);
};
