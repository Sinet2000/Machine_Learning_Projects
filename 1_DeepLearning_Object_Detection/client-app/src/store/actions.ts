import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { predictService } from '../api/services/predict.service';
import { uploadService } from '../api/services/upload.service';

interface RootState {
  imageData: string | null;
  predictedValue: string | null;
  success: string | null;
}

const initialState: RootState = {
  imageData: null,
  predictedValue: null,
  success: null,
};

const imageDataSlice = createSlice({
  name: "imageData",
  initialState,
  reducers: {
    updateImageData: (state, action: PayloadAction<string>) => {
      state.imageData = action.payload;
    },
    predictValue: async (state: RootState) => {
      state.predictedValue = await predictService.predict(state.imageData);
    },
    updateSuccess: (state, action: PayloadAction<string>) => {
      state.success = action.payload;
    },
    uploadImage: async (state: RootState) => {
      state.success = await uploadService.uploadImage(state.imageData);
    },
  },
});

export const { updateImageData, predictValue, updateSuccess, uploadImage } = imageDataSlice.actions;

export default imageDataSlice.reducer;



// import axios from 'axios';
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface RootState {
//   imageData: string | null;
//   predictedValue: string | null;
//   error: string | null;
// }

// const initialState: RootState = {
//   imageData: null,
//   predictedValue: null,
//   error: null,
// };

// const imageDataSlice = createSlice({
//   name: 'imageData',
//   initialState,
//   reducers: {
//     setImageData: (state, action: PayloadAction<string>) => {
//       state.imageData = action.payload;
//     },
//     predictValueStart: (state) => {
//       state.predictedValue = null;
//       state.error = null;
//     },
//     predictValueSuccess: (state, action: PayloadAction<string>) => {
//       state.predictedValue = action.payload;
//     },
//     predictValueError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setImageData, predictValueStart, predictValueSuccess, predictValueError } = imageDataSlice.actions;

// export const predictValue = (imageData: string) => async (dispatch: any) => {
//   try {
//     dispatch(predictValueStart());
//     const response = await axios.post('/predict', { imageData });
//     dispatch(predictValueSuccess(response.data.predictedValue));
//   } catch (err) {
//     dispatch(predictValueError(err.message));
//   }
// };

// export default imageDataSlice.reducer;
