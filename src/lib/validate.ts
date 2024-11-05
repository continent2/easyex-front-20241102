import * as coinValidator from 'multicoin-address-validator';

const symbolMap: Record<string, string> = {
  ETH: 'ETH',
  'USDT@ETH': 'ETH',
  BTC: 'BTC',
  'USDT@TRON': 'TRON',
  'USDT@BNB': 'BNB',
  'USDT@POLYGON': 'POLYGON',
};

export const validateCrypto = (account: string, symbol: string) => {
  if (symbolMap?.[symbol]) {
    return coinValidator.validate(account, symbolMap[symbol]);
  } else {
    return false;
  }
};

export const validateHex64Or66 = (value: string) => {
  return /^(0x)?[0-9a-fA-F]{64}$|^(0x)?[0-9a-fA-F]{66}$/.test(value);
};

export const validatePositiveDecimal = (value: string) => {
  return /^(?!0$)(\d+(\.\d+)?|\.\d+)$/.test(value);
};

export const validatePositiveNumber = (value: string) => {
  return /^(?!0$)[1-9]\d*$/.test(value);
};
