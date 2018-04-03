import {handleActions} from 'redux-actions';
import {ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED} from "../commons/constants";
import {initialState, Accounts} from "./state";

export const reducer = handleActions({
  [ACCOUNT_DECLARED]: (state, {payload: {name, balance}}) =>
    Accounts.update(state, {
      [name]: {
        $set: {name, balance}
      }
    }),
  [ACCOUNT_CREDITED]: (state, {payload: {name, amount}}) =>
    Accounts.update(state, {
      [name]: {
        $merge: {
          balance: state[name].balance + amount
        }
      }
    }),
  [ACCOUNT_DEBITED]: (state, {payload:{name, amount}}) =>
    Accounts.update(state, {
      [name]: {
        $merge: {
          balance: state[name].balance - amount
        }
      }
    }),
}, initialState);
