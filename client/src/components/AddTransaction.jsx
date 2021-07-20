import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const AddTransaction = () => {
  const { addTransaction, editTransaction, editId, deleteTransaction } =
    useContext(GlobalContext);
  const { transactions } = useContext(GlobalContext);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    const transaction = transactions.find(
      (transaction) => transaction._id === editId
    );

    if (transaction) {
      setText(transaction.text);
      setAmount(transaction.amount);
      deleteTransaction(editId);
    }
  }, [editId, transactions, deleteTransaction]);
  //assign transaction to the current form state

  const onsubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: editId ? editId : Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
    };
    text && amount ? addTransaction(newTransaction) : setError(true);

    setTimeout(() => setError(false), 3000);
    editTransaction(0);
    setAmount(0);
    setText("");
  };

  return (
    <>
      <div data-testid="add-transaction">
        {editId ? <h3>Edit Transaction</h3> : <h3>Add new Transaction</h3>}
        <form className="form" onSubmit={onsubmit}>
          <div
            className="error"
            style={{ display: `${!error ? "none" : "block"}` }}
          >
            Please fill in all fields
          </div>
          <div className="form-control">
            <label htmlFor="text">Text</label>
            <input
              value={text}
              type="text"
              id="text"
              placeholder="Enter text..."
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative-expense,positive-income)
            </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              id="amount"
              placeholder="Enter amount..."
            />
          </div>

          {editId ? (
            <button className="btn">Submit transaction Edit</button>
          ) : (
            <button className="btn">Add transaction</button>
          )}
        </form>
      </div>
    </>
  );
};

export default AddTransaction;
