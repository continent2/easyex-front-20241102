import { defaultAxios } from '@/lib/api/apiClient';

// 화폐 입금
export const depositFiat = async (depositParams: {
  typecf: 'F' | 'C';
  from: {
    typecf: string;
    symbol: string;
    bankname: string;
    bankcode: string;
    account: string;
    amount: string;
  };
  to: {
    typecf: string;
    symbol: string;
    bankname: string;
    bankcode: string;
    account: string;
    amount: string;
  };
}) => {
  return defaultAxios.post('/txs/deposit', depositParams);
};

// 입금 정책 조회
export const getDepositPolicy = async (typecf: 'F' | 'C') => {
  return defaultAxios.get(`/txs/policy/deposit/${typecf}`);
};

// 가상 화폐 입금
export const depositCrypto = async (depositParams: {
  typecf: 'F' | 'C';
  from: {
    typecf: string;
    symbol: string;
    address?: string;
    amount?: string;
    txhash?: string;
  };
  to: {
    typecf: string;
    symbol: string;
    address: string;
    amount?: string;
  };
}) => {
  return defaultAxios.post('/txs/deposit', depositParams);
};
