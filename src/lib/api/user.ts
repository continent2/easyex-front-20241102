import { defaultAxios } from '@/lib/api/apiClient';

export const getUser = async () => {
  try {
    const response = await defaultAxios.get(`/users/user/myinfo`);
    return response;
  } catch (error) {
    return error;
  }
};

// 소셜 로그인 세팅
export const getSocialSettings = async () => {
  try {
    const response = await defaultAxios.get(
      `https://easyex.online:30581/queries/rows/usersettings/key_/SOCIAL-LOGIN?active=1`,
    );
    return response;
  } catch (error) {
    return error;
  }
};
