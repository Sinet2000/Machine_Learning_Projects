import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Predict from "../src/components/Predict/Predict";
import "@types/jest";

test("Predict component dispatches setPredictedValue action", async () => {
  // Create a mock function to check if the action is dispatched
  const mockSetPredictedValue = jest.fn();
  const { getByText } = render(
    <Predict
      imageData={new File([], "test.jpg", { type: "image/jpeg" })}
      setPredictedValue={mockSetPredictedValue}
    />
  );
  // Simulate the button being clicked
  const button = getByText("Predict");
  fireEvent.click(button);
  // Check if the action was dispatched
  expect(mockSetPredictedValue).toHaveBeenCalled();
});
