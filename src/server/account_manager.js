const Account = require('./account')

function accountManager () {
  const accounts = {}

  function registerAccount (accountName) {
    const account = new Account(accountName)
    accounts[accountName] = account
    return account
  }

  function getRegisteredAccount (accountName) {
    return accounts[accountName]
  }

  function getRegisteredAccounts () {
    return accounts;
  }

  return {
    registerAccount,
    getRegisteredAccount,
    getRegisteredAccounts
  }
}

module.exports = accountManager
