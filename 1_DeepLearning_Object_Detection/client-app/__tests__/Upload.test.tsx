import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Upload from "../src/components/Upload/Upload";
import "@types/jest";

test("Upload component dispatches setImageData action", async () => {
  // Create a mock function to check if the action is dispatched
  const mockSetImageData = jest.fn();
  const { getByLabelText, getByText } = render(
    <Upload setImageData={mockSetImageData} />
  );
  // Simulate a file being selected
  const input = getByLabelText("Upload Image");
  fireEvent.change(input, {
    target: { files: [new File([], "test.jpg", { type: "image/jpeg" })] },
  });
  // Simulate the button being clicked
  const button = getByText("Upload");
  fireEvent.click(button);
  // Check if the action was dispatched
  expect(mockSetImageData).toHaveBeenCalled();
});
