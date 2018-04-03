import t from 'tcomb';

export const Account = t.struct({
  name: t.String,
  balance: t.Number
});

export const Accounts = t.dict(t.String, Account);

export const initialState = Accounts({});
