import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface State {
  imageData: string | null;
  predictedValue: string | null;
}

const initialState: State = {
  imageData: null,
  predictedValue: null,
};

const slice = createSlice({
  name: "imageData",
  initialState,
  reducers: {
    updateImageData: (state, action: PayloadAction<string>) => {
      state.imageData = action.payload;
    },
    predictValue: (state: RootState) => {
      // make prediction here
      state.predictedValue = "3";
    },
  },
});

export const { updateImageData, predictValue } = slice.actions;

export default slice.reducer;
