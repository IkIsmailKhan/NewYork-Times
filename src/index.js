import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/index';
import { Provider } from 'react-redux'
import { store } from './store/index'
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);