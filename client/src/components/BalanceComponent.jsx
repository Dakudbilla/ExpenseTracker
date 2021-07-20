import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

const BalanceComponent = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <div data-testid="balance">
      <h4 data-testid="balance-title">Your Balance</h4>
      <h1 data-testid="balance-value" id="balance">
        ${numberWithCommas(total)}
      </h1>
    </div>
  );
};

export default BalanceComponent;
