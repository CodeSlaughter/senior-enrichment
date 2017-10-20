'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import { HashRouter as Router } from 'react-router-dom';
import  Main  from './components/Main';

ReactDOM.render(
  <Provider store={store}>
      <Main />
  </Provider>,
  document.getElementById('main')
);
