import { defaultAxios } from '@/lib/api/apiClient';

export const getUser = async () => {
  try {
    const response = await defaultAxios.get(`/users/user/myinfo`);
    return response;
  } catch (error) {
    return error;
  }
};

// 유저 입금 세팅 조회
export const getUserDepositSettings = async () => {
  try {
    const response = await defaultAxios.get(
      `/queries/rows/usersettings/key_/DEPOSIT?active=1`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 유저 출금 세팅 조회
export const getUserWithdrawSettings = async () => {
  try {
    const response = await defaultAxios.get(
      `/queries/rows/usersettings/key_/WITHDRAW?active=1`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 소셜 로그인 세팅 조회
export const getUserSocialSettings = async () => {
  try {
    const response = await defaultAxios.get(
      `/queries/rows/usersettings/key_/SOCIAL-LOGIN?active=1`,
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 유저 정보 조회
export const getUserInfo = async () => {
  try {
    const response = await defaultAxios.get(`/users/user/myinfo`);
    return response;
  } catch (error) {
    return error;
  }
};
