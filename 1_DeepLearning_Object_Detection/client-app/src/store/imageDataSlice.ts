import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import { predictValue, uploadImage } from './actions';

const initialState = {
  imageData: null as string | null,
  predictedValue: null as string | null,
  loading: false,
  error: null as string | null
};

const imageDataSlice = createSlice({
  name: 'imageData',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPredictedValue: (state, action) => {
      state.predictedValue = action.payload;
    },
    setImageData: (state, action) => {
      state.imageData = action.payload;
    },
  },
});

export const { setLoading, setError, setPredictedValue, setImageData } = imageDataSlice.actions;

export default imageDataSlice.reducer;