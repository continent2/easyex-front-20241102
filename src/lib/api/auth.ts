import { env } from '@/env';
import { defaultAxios } from '@/lib/api/apiClient';

// 로그인
export const login = async ({
  pw,
  phonecountrycode2letter,
  phonenationalnumber,
}: {
  pw: string;
  phonecountrycode2letter: string;
  phonenationalnumber: string;
}) => {
  return defaultAxios.post(
    '/users/login',
    {
      pw,
      phonecountrycode2letter,
      phonenationalnumber,
    },
    {
      params: {
        nettype: env.netType,
      },
    },
  );
};

// 로그아웃
export const logout = async () => {
  try {
    return await defaultAxios.post(`/users/logout`);
  } catch (error) {
    return error;
  }
};

// 휴대폰 인증 코드 발송
export const sendPhoneVerifyCode = async ({
  phonecountrycode2letter,
  phonenationalnumber,
}: {
  phonecountrycode2letter: string;
  phonenationalnumber: string;
}) => {
  try {
    return await defaultAxios.get('/users/phoneverifycode', {
      params: {
        phonecountrycode2letter,
        phonenationalnumber,
      },
    });
  } catch (error) {
    return error;
  }
};