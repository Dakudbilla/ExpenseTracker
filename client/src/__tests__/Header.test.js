import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Header from "./../components/Header";

test("Header renders correctly", () => {
  const { getByTestId } = render(<Header />);
  const headerEl = getByTestId("header");

  expect(headerEl).toBeInTheDocument();
  expect(headerEl).toHaveTextContent("Expense Tracker");
});
