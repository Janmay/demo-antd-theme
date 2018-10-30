import React, { Component } from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderRoutes from './utils/renderRoutes';
import routes from './config/router.config';
import './App.css';

const App = ({ store }) => (
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </LocaleProvider>
  </Provider>
);

export default App;
