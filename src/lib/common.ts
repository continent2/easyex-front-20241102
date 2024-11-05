export const safeToLocaleString = (value: number | null | undefined) => {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'number' && isNaN(value))
  ) {
    return '';
  }
  return value.toLocaleString();
};
