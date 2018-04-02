import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, combineReducers, bindActionCreators} from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {connectWS} from "./webSocket";

import {apiConnected, apiError, apiClosed} from './api/actions';
import {reducers as apiReducers} from './api/reducers';
import {reducer as accountsReducer} from './accounts/reducers';
import {ACCOUNT_DECLARED} from "./commons/constants";

const store = createStore(
  combineReducers({
    api: apiReducers,
    accounts: accountsReducer
  }),
  devToolsEnhancer()
);

const actions = bindActionCreators({
  apiConnected,
  apiError,
  apiClosed
}, store.dispatch);

connectWS(actions);

[
  {name: 'Account One'},
  {name: 'Account Two'},
  {name: 'Account Three'},
  {name: 'Account Four'},
  {name: 'Account Five'},
  {name: 'Account Six'},
  {name: 'Account Seven'},
].forEach(({name}, index) => {
  setTimeout(() => {
    store.dispatch({
      type: ACCOUNT_DECLARED,
      payload: {
        name,
        balance: Math.trunc(Math.random() * 2000 - 1000)
      }
    });
  }, index * 1000 + 500)
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
