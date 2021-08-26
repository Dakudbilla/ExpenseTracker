const tailFactorial = require("../tailFactorial");

describe("tailFactorial", () => {
  it("should return the factorial of a number ", () => {
    expect(tailFactorial(3)).toBe(6);
  });
});
