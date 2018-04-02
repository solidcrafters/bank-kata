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

const store = createStore(
  combineReducers({
    api: apiReducers
  }),
  devToolsEnhancer()
);

const actions = bindActionCreators({
  apiConnected,
  apiError,
  apiClosed
}, store.dispatch);

connectWS(actions);

const accounts = [
  {name: 'Account One'},
  {name: 'Account Two'},
  {name: 'Account Three'},
  {name: 'Account Four'},
  {name: 'Account Five'},
  {name: 'Account Six'},
  {name: 'Account Seven'},
];

ReactDOM.render(
  <Provider store={store}>
    <App accounts={accounts} />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
