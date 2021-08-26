exports.fakeTransaction = () => ({
  _id: "12345",
  text: "Eat",
  amount: 5,
});

exports.fakeManyTransactions = () => [
  {
    _id: "10",
    text: "Drink",
    amount: -8,
  },
  {
    _id: "11",
    text: "Salary",
    amount: 900,
  },
  {
    _id: "12",
    text: "Birthday",
    amount: 600,
  },
];
