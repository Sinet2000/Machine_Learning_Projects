import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { predictService } from '../api/services/predict.service';
import { uploadService } from '../api/services/upload.service';


export const predictValue = async (imageData: string) => {
  try {
      console.log("image data:", imageData);
      const response = await predictService.predict(imageData);
      return { payload: response }
  } catch (error: any) {
      return { error: error.message }
  }
}

export const uploadImage = async (imageData: string) => {
  try {
      const response = await uploadService.uploadImage(imageData);
      return { payload: response }
  } catch (error: any) {
      return { error: error.message }
  }
}
