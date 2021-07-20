import React from "react";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import appReducer from "../context/AppReducer";
afterEach(cleanup);
test("reducers works correctly", () => {
  expect(
    appReducer([], {
      type: "GET_TRANSACTION",
      payload: { id: 1, data: "reducer works" },
    })
  ).toEqual({ loading: false, transactions: { data: "reducer works", id: 1 } });
});
