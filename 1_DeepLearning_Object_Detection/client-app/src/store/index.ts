import { configureStore } from '@reduxjs/toolkit';
import imageDataReducer from './imageDataSlice';
import { predictValue, uploadImage } from './actions';

const store = configureStore({
  reducer: {
    imageData: imageDataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { predictValue, uploadImage },
      },
    }),
});

export default store;