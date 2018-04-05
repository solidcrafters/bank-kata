/* global describe, it, expect */

import {reducer} from './reducers';
import {
  ACCOUNT_CREDITED, ACCOUNT_DEBITED, ACCOUNT_DECLARED, ACCOUNT_UNDECLARED,
  AMOUNT_TRANSFERRED, REQUEST_FORBIDDEN
} from "../commons/constants";

describe('accounts reducers', () => {
  describe('account declared', () => {
    it('should declare an account', () => {
      var state;
      const action = {
        type: ACCOUNT_DECLARED,
        payload: {
          balance: 10,
          name: 'abitbol'
        }
      };

      const newState = reducer(state, action);

      expect(newState).toMatchObject({
        abitbol: {
          balance: 10,
          name: 'abitbol',
          forbiddenAction: false
        }
      });
    });

    it('should declare an account, next to others', () => {
      const state = {
        steven: {
          balance: 0,
          name: 'steven'
        }
      };
      const action = {
        type: ACCOUNT_DECLARED,
        payload: {
          balance: 10,
          name: 'abitbol'
        }
      };

      const newState = reducer(state, action);

      expect(newState).toMatchObject({
        steven: {
          balance: 0,
          name: 'steven'
        },
        abitbol: {
          balance: 10,
          name: 'abitbol'
        }
      });
    });
  });

  describe('account credited', () => {
    it('should credit an account', () => {
      const state = {
        abitbol: {
          balance: 10,
          name: 'abitbol',
          forbiddenAction: true
        }
      };

      const action = {
        type: ACCOUNT_CREDITED,
        payload: {
          amount: 13,
          name: 'abitbol'
        }
      };

      const newState = reducer(state, action);

      expect(newState).toMatchObject({
        abitbol: {
          balance: 23,
          name: 'abitbol',
          forbiddenAction: false
        }
      });
    });
  });

  describe('account debited', () => {
    it('should debit an account', () => {
      const state = {
        abitbol: {
          balance: 10,
          name: 'abitbol',
          forbiddenAction: true
        }
      };

      const action = {
        type: ACCOUNT_DEBITED,
        payload: {
          amount: 13,
          name: 'abitbol'
        }
      };

      const newState = reducer(state, action);

      expect(newState).toMatchObject({
        abitbol: {
          balance: -3,
          name: 'abitbol',
          forbiddenAction: false
        }
      });
    });
  });

  describe('account undeclared', () => {
    it('should undeclare an account', () => {
      const state = {
        abitbol: {
          balance: 10,
          name: 'abitbol'
        }
      };

      const action = {
        type: ACCOUNT_UNDECLARED,
        payload: {
          name: 'abitbol'
        }
      };

      const newState = reducer(state, action);

      expect(newState.abitbol).toBeUndefined();
    });
  });

  describe('amount transferred', () => {
    it('should transfer a certain amount from an account to a destination account', () => {
      const state = {
        peter: {
          balance: 100,
          name: 'peter',
          forbiddenAction: true
        },
        steven: {
          balance: 10,
          name: 'steven',
          forbiddenAction: true
        },
      };

      const action = {
        type: AMOUNT_TRANSFERRED,
        payload: {
          from: 'peter',
          to: 'steven',
          amount: 50
        }
      };

      const newState = reducer(state, action);

      expect(newState.peter.balance).toBe(50);
      expect(newState.peter.forbiddenAction).toBe(false);
      expect(newState.steven.balance).toBe(60);
      expect(newState.steven.forbiddenAction).toBe(true);
    });
  });

  describe('forbidden request', () => {
    it('should flag forbidden request', () => {
      const state = {
        peter: {
          balance: 100,
          name: 'peter',
          forbiddenAction: false
        },
        steven: {
          balance: 10,
          name: 'steven',
          forbiddenAction: false
        },
      };

      const action = {
        type: REQUEST_FORBIDDEN,
        payload: {
          name: 'peter',
        }
      };

      const newState = reducer(state, action);

      expect(newState.peter.forbiddenAction).toBe(true);
      expect(newState.steven.forbiddenAction).toBe(false);
    });
  });
});