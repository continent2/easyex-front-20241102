import { defaultAxios } from '@/lib/api/apiClient';
import storage from '@/lib/storage';

// 출금 정책 조회
export const getWithDrawPolicy = async () => {
  return defaultAxios.get('/txs/policy/withdraw/_');
};

// 출금 환율 조회
export const getExchangeRate = ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: string;
}) => {
  return defaultAxios.get('/exchanges/quote', {
    params: {
      from,
      to,
      amount,
    },
  });
};

// 출금
export const withdraw = (params: {
  from: {
    typecf: string;
    account?: string;
    amount?: string;
    bankname?: string;
    bankcode?: string;
    symbol?: string;
    address?: string;
    txhash?: string;
  };
  to: {
    typecf: string;
    account?: string;
    bankname?: string;
    bankcode?: string;
    symbol?: string;
    address?: string;
    amount?: string;
  };
  quotesignature?: string;
}) => {
  return defaultAxios.post('/txs/withdraw', {
    ...params,
  });
};
