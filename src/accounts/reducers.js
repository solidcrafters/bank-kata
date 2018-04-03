import {handleActions} from 'redux-actions';
import {
  ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED, ACCOUNT_UNDECLARED,
  AMOUNT_TRANSFERRED
} from "../commons/constants";
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
  [ACCOUNT_UNDECLARED]: (state, {payload:{name, amount}}) =>
    Accounts.update(state, {
      $remove: [name]
    }),
  [AMOUNT_TRANSFERRED]: (state, {payload:{from, to, amount}}) =>
    Accounts.update(state, {
      [from]: {
        balance: {
          $set: state[from].balance - amount
        }
      },
      [to]: {
        balance: {
          $set: state[to].balance + amount
        }
      }
    }),
}, initialState);
