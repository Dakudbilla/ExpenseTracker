import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TransactionList from "../components/TransactionList";
import { GlobalProvider } from "../context/GlobalState";
const mockContext = () => (
  <GlobalProvider>
    <TransactionList />
  </GlobalProvider>
);
describe("Test Transaction List", () => {
  test("should have have list of transaction", () => {
    const { getByTestId, getByText } = render(mockContext());
    const transactionListTitleEl = getByText(/History/);

    expect(transactionListTitleEl).toBeInTheDocument();

    const transactionListEl = getByTestId("transaction-list");

    expect(transactionListEl).toBeInTheDocument();
  });
});
