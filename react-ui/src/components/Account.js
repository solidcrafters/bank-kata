import React from 'react';

const Account = ({account:{name, balance = 0, forbiddenAction}}) => {
  const deadStyle = {
    display: forbiddenAction ? 'block' : 'none',
    textAlign: 'right',
    width: '90%'
  };
  return (
    <div className='account'>
      <h4>{name}</h4>
      <div className={`balance ${balance < 0 ? 'text-danger' : 'text-success'}`}>
        {balance} €
      </div>
      <div style={deadStyle}>
        <h1>☠</h1>
      </div>
    </div>
  );
};

export default Account;
