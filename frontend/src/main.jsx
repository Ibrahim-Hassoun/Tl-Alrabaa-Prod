import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './ui/App';
import { Provider } from 'react-redux';
import { store } from './core/redux/store';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
 
    <App />
  
  </Provider>
);
