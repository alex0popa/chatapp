import React from 'react';

import ReactDOM from 'react-dom';
import "antd/dist/antd.css";

import App from './App';
import { ContextProvider } from './context/AppContext';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
