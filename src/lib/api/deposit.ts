import { env } from '@/env';
import { defaultAxios } from '@/lib/api/apiClient';

// 은행 전체 조회
export const getBanks = async () => {
  return defaultAxios.get('/queries/rows/banks/active/1');
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

// 가상화폐 전체 조회
export const getCryptos = async (typecf: 'F' | 'C') => {
  return defaultAxios.get('/queries/rows/tokens/active/1', {
    params: {
      typecf,
      nettype: env.netType,
    },
  });
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
