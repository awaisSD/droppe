import React from "react";
import { ShopApp } from "./shop-app";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "react-modal";

describe("<ShopApp />", () => {

  it("adds a new product", async () => {
    const { getByRole, getAllByRole, getByText } = render(<ShopApp />);
    Modal.setAppElement("body");
    const sendProductProposalButton = getByText("Send product proposal");
    await userEvent.click(sendProductProposalButton);
    const inputs = getAllByRole("input", {hidden: true});
    expect(inputs.length).toBe(2);
    userEvent.type(inputs[0], "Test Product");
    userEvent.type(inputs[1], "189");
    const textArea = getByRole("text-area", {hidden: true});
    userEvent.type(textArea, "Product description");
    const addProductButton = getByText("Add a product");
    await userEvent.click(addProductButton);


    expect(getByText("Test Product")).toBeInTheDocument();
    expect(getByText("Price: $189")).toBeInTheDocument();
    expect(getByText("Product description")).toBeInTheDocument();

    
  });

});