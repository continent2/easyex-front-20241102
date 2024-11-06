export type AdminBankAccount = {
  id: number;
  bankcode: string;
  bankname: string;
  number: string;
  urllogo: string;
  symbol: string;
};

export interface AdminCryptoAccount {
  id: number;
  createdat: string;
  updatedat: string;
  type: string;
  bankcode: any;
  bankname: any;
  number: any;
  holder: any;
  active: number;
  nation: any;
  isdefault: any;
  urllogo: string;
  address: string;
  symbol: string;
  nettype: string;
  typecf: string;
  code: any;
}
