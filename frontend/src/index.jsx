import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import {store,persistor} from './Redusers/store';
import { Provider } from 'react-redux';

// import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


