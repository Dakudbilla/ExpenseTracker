import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddTransaction from "../components/AddTransaction";

describe("<AddTranction/>", () => {
  test("component renders correctly", () => {
    const { getByTestId } = render(<AddTransaction />);
    const addTransactionEl = getByTestId("add-transaction");
    expect(addTransactionEl).toBeInTheDocument();
  });
});
