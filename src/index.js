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

actions.accountEvent = (event) => store.dispatch(event);

setTimeout(() => connectWS(actions), 1000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
