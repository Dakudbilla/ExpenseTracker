import React from "react";
import { cleanup, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddTransaction from "../components/AddTransaction";
afterEach(cleanup);

describe("<AddTranction/>", () => {
  test("component renders correctly", () => {
    const { getByTestId, getByText } = render(<AddTransaction />);
    const addTransactionEl = getByTestId("add-transaction");
    expect(addTransactionEl).toBeInTheDocument();
    expect(getByText(/Add transaction/)).toBeInTheDocument();
  });

  test("Amount input form works correctly", () => {
    const { getByPlaceholderText } = render(<AddTransaction />);
    const inputEL = getByPlaceholderText(/Enter amount.../);
    fireEvent.change(inputEL, {
      target: {
        value: 30,
      },
    });
    expect(inputEL.value).toBe("30");
  });

  test("Amount input form should not allow letters", () => {
    const { getByPlaceholderText } = render(<AddTransaction />);
    const inputEL = getByPlaceholderText(/Enter amount.../);
    fireEvent.change(inputEL, {
      target: {
        value: "hello",
      },
    });
    expect(inputEL.value).toBe("");
  });

  test("Text input form works correctly", () => {
    const { getByPlaceholderText } = render(<AddTransaction />);
    const inputEL = getByPlaceholderText(/Enter text.../);
    fireEvent.change(inputEL, {
      target: {
        value: "Salary",
      },
    });
    expect(inputEL.value).toBe("Salary");
  });
});
