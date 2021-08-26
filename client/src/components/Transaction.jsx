import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const Transaction = ({ transaction: { amount, text, _id } }) => {
  const { deleteTransaction, editTransaction } = useContext(GlobalContext);
  const sign = amount < 0 ? "-" : "";
  const isExpenseclass = amount < 0 ? "minus" : "plus";

  return (
    <li className={isExpenseclass} data-testid={`${_id}`}>
      <button className="edit-btn" onClick={() => editTransaction(_id)}>
        edit
      </button>
      {text}{" "}
      <span>
        {sign}${numberWithCommas(Math.abs(amount))}
      </span>
      <button
        data-testid="delete-btn"
        className="delete-btn"
        onClick={() => deleteTransaction(_id)}
      >
        x
      </button>
    </li>
  );
};

export default Transaction;
