import React from 'react';

const Account = ({account}) => {
  const balance = account.balance || 0;
  return (
    <div className='account'>
      <h4>{account.name}</h4>
      <div className={`balance ${balance < 0 ? 'text-danger' : 'text-success'}`}>
        {balance} €
      </div>
    </div>
  );
};

export default Account;
