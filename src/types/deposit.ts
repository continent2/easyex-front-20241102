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

export interface DepositInfo {
  from: {
    id: number;
    createdat: string;
    updatedat: string;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    writer: any;
    active: number;
    nettype: string;
    istoken: number;
    urllogo: string;
    isdefault: any;
    uuid: string;
    deployer: any;
    isadminadded: any;
    totalsupply: any;
    typestr: string;
    nation: any;
    typecf: string;
    policy: any;
    mindeposit: string;
    maxdeposit: string;
    minwithdraw: string;
    precision: number;
    maxwithdraw: string;
    validatesymbol: string;
    available: number;
  };
  to: {
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
  };
}
