import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BalanceComponent from "../components/BalanceComponent";
import { numberWithCommas } from "../utils/format";

describe("<BalanceComponent/>", () => {
  test("add comma to numbers function works correctly", () => {
    expect(numberWithCommas(9000)).toBe("9,000");
  });

  test("Balance renders correctly", () => {
    const { getByTestId } = render(<BalanceComponent />);
    const balanceEl = getByTestId("balance");

    expect(balanceEl).toBeInTheDocument();
    expect(balanceEl).toContainElement(getByTestId("balance-title"));
    expect(balanceEl).toContainElement(getByTestId("balance-value"));
  });
});
