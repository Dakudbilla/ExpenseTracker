import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Transaction from "../components/Transaction";
import { GlobalProvider } from "../context/GlobalState";

const mockContext = () => (
  <GlobalProvider>
    <Transaction
      transaction={{
        _id: "6126307fb542dd9be8a44e22",
        text: "Eat",
        amount: 5,
        createdAt: "2021-08-25T11:58:55.019Z",
        updatedAt: "2021-08-25T11:58:55.019Z",
        __v: 0,
      }}
      key="6126307fb542dd9be8a44e22"
    />
  </GlobalProvider>
);

describe("Transaction Component", () => {
  test("should display transaction and edit and delete buttons", () => {
    const { getByText, getByTestId } = render(mockContext());

    const editButton = getByText(/edit/);
    const deleteButton = getByTestId("delete-btn");

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("transaction and edit and delete buttons are not visible until hover", () => {});

  test("delete button press should delete transaction", async () => {});
});
