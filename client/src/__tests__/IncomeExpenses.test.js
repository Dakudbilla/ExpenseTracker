import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IncomeExpenses from "../components/IncomeExpenses";
import { expenseAdder, incomeAdder } from "../utils/format";

test("Income header renders correctly", () => {
  const { getByTestId } = render(<IncomeExpenses />);

  const headerEl = getByTestId("income-header");
  expect(headerEl).toBeInTheDocument();
  expect(headerEl).toHaveTextContent("Income");
});

test("Income and expense values renders correctly", () => {
  const { getByText } = render(<IncomeExpenses />);

  const expenseEl = getByText(/Expense/);
  const incomeEl = getByText(/Income/);
  expect(incomeEl).toBeInTheDocument();
  expect(expenseEl).toBeInTheDocument();
});

test("income adder util function should add income values", () => {
  const income = [10, 20, 55];
  expect(Number(incomeAdder(income))).toBeCloseTo(85.0);
});

test("Expense adder util function should add income values", () => {
  const income = [-10, -20, -55];
  expect(Number(expenseAdder(income))).toBeCloseTo(-85.0);
});
