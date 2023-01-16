import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Predict } from './components/Predict';
import { Upload } from './components/Upload';

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Upload />
        <Predict />
      </div>
    </Provider>
  );
}

export default App;

