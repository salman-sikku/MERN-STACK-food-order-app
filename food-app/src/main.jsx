import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from "react-hot-toast";
import {store} from './app/store.js'
import { Provider } from 'react-redux';
import "antd/dist/reset.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>,

)
