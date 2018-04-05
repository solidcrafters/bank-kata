import {handleActions} from 'redux-actions';
import {
  ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED, ACCOUNT_UNDECLARED,
  AMOUNT_TRANSFERRED, REQUEST_FORBIDDEN
} from "../commons/constants";
import {initialState, Accounts} from "./state";

export const reducer = handleActions({
  [ACCOUNT_DECLARED]: (state, {payload: {name, balance}}) =>
    Accounts.update(state, {
      [name]: {
        $set: {name, balance, forbiddenAction: false}
      }
    }),
  [ACCOUNT_CREDITED]: (state, {payload: {name, amount}}) =>
    Accounts.update(state, {
      [name]: {
        $merge: {
          balance: state[name].balance + amount,
          forbiddenAction: false
        }
      }
    }),
  [ACCOUNT_DEBITED]: (state, {payload:{name, amount}}) =>
    Accounts.update(state, {
      [name]: {
        $merge: {
          balance: state[name].balance - amount,
          forbiddenAction: false
        }
      }
    }),
  [ACCOUNT_UNDECLARED]: (state, {payload:{name, amount}}) =>
    Accounts.update(state, {
      $remove: [name]
    }),
  [AMOUNT_TRANSFERRED]: (state, {payload:{from, to, amount}}) =>
    Accounts.update(state, {
      [from]: {
        $merge: {
          balance: state[from].balance - amount,
          forbiddenAction: false
        }
      },
      [to]: {
        balance: {
          $set: state[to].balance + amount
        }
      }
    }),
  [REQUEST_FORBIDDEN]: (state, {payload:{name}}) =>
    Accounts.update(state, {
      [name]: {
        forbiddenAction: {
          $set: true
        }
      }
    }),
}, initialState);
