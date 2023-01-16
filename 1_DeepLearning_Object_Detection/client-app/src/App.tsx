import React from "react";
import { Provider } from "react-redux";
import store from "./store/index";
import { PredictContainer } from "./components/Predict/Predict.container";
import { UploadContainer } from "./components/Upload/Upload.container";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <UploadContainer />
        <PredictContainer />
      </div>
    </Provider>
  );
};

export default App;
