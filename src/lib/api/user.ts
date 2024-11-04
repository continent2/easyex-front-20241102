import { defaultAxios } from '@/lib/api/apiClient';

export const getUser = async () => {
  try {
    const response = await defaultAxios.get(`/users/user/myinfo`);
    return response;
  } catch (error) {
    return error;
  }
};
