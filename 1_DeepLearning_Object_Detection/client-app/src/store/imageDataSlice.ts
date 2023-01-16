import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RootState {
  imageData: string | null;
  predictedValue: string | null;
}

const initialState: RootState = {
  imageData: null,
  predictedValue: null,
};

const imageDataSlice = createSlice({
  name: "imageData",
  initialState,
  reducers: {
    updateImageData: (state, action: PayloadAction<string>) => {
      state.imageData = action.payload;
    },
    predictValue: (state, action: PayloadAction<string>) => {
      state.predictedValue = action.payload;
    },
  },
});

export const { updateImageData, predictValue } = imageDataSlice.actions;

export default imageDataSlice.reducer;