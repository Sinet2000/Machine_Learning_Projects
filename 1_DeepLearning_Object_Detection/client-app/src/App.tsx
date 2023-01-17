import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import imageDataReducer from './store/imageDataSlice';
import { setLoading, setError, setPredictedValue, setImageData } from './store/imageDataSlice';
import { predictValue, uploadImage } from './store/actions';
import RootState from "./store";
import { makeStyles } from "@material-ui/core";
import Predict from "./components/Predict/Predict";
import Upload from "./components/Upload/Upload";

const App = () => {
  const dispatch = useDispatch();
  const { imageData, predictedValue, loading, error } = useSelector((state: any) => state.imageData);
  const [file, setFile] = useState(null);

  const handleUpload = async (file: any) => {
    console.log(file);
    // event.preventDefault();
    //const file = event.target.files[0];
    setFile(file);
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await uploadImage(file);
      dispatch(setImageData(file));
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handlePredict = async () => {
    dispatch(setLoading(true));
    try {
      if (file) {
        const response = await predictValue(file);
        dispatch(setPredictedValue(response.payload));
      } else {
        dispatch(setError("File is not selected"));
      }
    } catch (err: any) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="App">
      <Upload uploadImage={handleUpload} />
      {imageData 
        && <Predict
            imageData={imageData}
            predictedValue={predictedValue}
            predictValue={handlePredict}
            loading={loading}
            error={error}
          />
      }
      <Predict
        imageData={imageData}
        predictedValue={predictedValue}
        predictValue={handlePredict}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default App;


