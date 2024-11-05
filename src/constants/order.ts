export const orderStatusMap: Record<number, string> = {
  0: 'WAITING',
  1: 'PROCESSED',
  2: 'FAILED',
  3: 'EXPIRED',
  4: 'CANCELED',
  5: 'SUCCESS',
};

export const orderStatusClassNameMap: Record<number, string> = {
  0: '',
  1: '',
  2: '.fail',
  3: '',
  4: '',
  5: '',
};
