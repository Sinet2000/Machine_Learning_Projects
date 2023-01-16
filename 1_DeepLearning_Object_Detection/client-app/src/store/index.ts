import { configureStore } from '@reduxjs/toolkit';
import imageDataReducer from './reducer';

const store = configureStore({
  reducer: {
    imageData: imageDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
