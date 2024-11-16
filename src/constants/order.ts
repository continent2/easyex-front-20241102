export const orderStatusMap: Record<number, string> = {
  0: 'WAITING',
  1: 'PROCESSED',
  2: 'FAILED',
  3: 'EXPIRED',
  4: 'CANCELED',
};

export const orderStatusClassNameMap: Record<number, string> = {
  0: 'waiting',
  1: 'processed',
  2: 'fail',
  3: 'expired',
  4: 'canceled',
};
