import imageDataReducer from './imageDataSlice';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    imageData: imageDataReducer,
  },
  middleware: [thunk]
});

export default store;