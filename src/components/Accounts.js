import React from 'react';
import Account from "./Account";

const Accounts = ({accounts}) => (
  <div className='wrapper'>
    {accounts.map((account, index) => (
      <Account account={account} key={index}/>
    ))
    }
  </div>
);

export default Accounts;
