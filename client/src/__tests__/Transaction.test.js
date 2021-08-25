import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Transaction from "../components/Transaction";
import { GlobalProvider } from "../context/GlobalState";
import { deleteTransactionAction } from "../context/actions";

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

  test("transaction and edit and delete buttons are not visible until hover", () => {
    const { getByText, getByTestId } = render(mockContext());

    const editButton = getByText(/edit/);
    const deleteButton = getByTestId("delete-btn");
    const transaction = getByTestId("6126307fb542dd9be8a44e22");
    fireEvent.mouseOver(transaction);
    expect(editButton.style.opacity).toMatch("0");

    expect(editButton).toBeFalsy();
    expect(deleteButton).toBeFalsy();
  });
  test("delete button press should delete transaction", async () => {
    const { getByTestId, findByTestId, queryByText } = render(mockContext());
    const deleteButton = getByTestId("delete-btn");

    const deletedTransaction = await findByTestId("6126307fb542dd9be8a44e22");
    fireEvent.mouseOver(deletedTransaction);
    fireEvent.click(deleteButton);
    await waitForElementToBeRemoved(queryByText("Eat"), { timeout: 6000 }).then(
      () => {
        expect(deleteTransactionAction).toVe();
      }
    );
  });
});
