import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { expenseAdder, incomeAdder, numberWithCommas } from "../utils/format";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = incomeAdder(amounts);
  const expense = expenseAdder(amounts);

  return (
    <div className="inc-exp-container">
      <div>
        <h4 data-testid="income-header">Income</h4>
        <p className="money plus" data-testid="income-value">
          {/**
           * Decorator pattern
           *
           */}
          ${numberWithCommas(income)}
        </p>
      </div>
      <div>
        <h4>Expense</h4>
        <p data-testid="expense-value" className="money minus">
          -${numberWithCommas(Math.abs(expense))}
        </p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
