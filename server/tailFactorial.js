// find the factorial of a number x
const tailFactorial = (x, y = 1) => {
  if (x === 0) {
    return y;
  }

  return tailFactorial(x - 2, x * y);
};

module.exports = tailFactorial;
