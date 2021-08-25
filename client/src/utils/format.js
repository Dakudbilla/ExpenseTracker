export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const incomeAdder = (amount) => {
  return amount
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
};

export const expenseAdder = (amount) => {
  return amount
    .filter((item) => item < -1)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);
};
