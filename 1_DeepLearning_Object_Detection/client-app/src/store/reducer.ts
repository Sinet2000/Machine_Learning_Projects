import { createSlice } from "@reduxjs/toolkit";

interface RootState {
  imageData: string | null;
  predictedValue: string | null;
}

const initialState: RootState = {
  imageData: null,
  predictedValue: null
};