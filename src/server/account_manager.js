const Account = require('./account')

function accountManager () {
  const accounts = {}

  function registerAccount (accountName) {
    const account = new Account(accountName)
    accounts[accountName] = account
    return account
  }

  function unregisterAccount (accountName) {
    delete accounts[accountName]
  }

  function getRegisteredAccount (accountName) {
    return accounts[accountName]
  }

  function getRegisteredAccounts () {
    return accounts;
  }

  return {
    registerAccount,
    unregisterAccount,
    getRegisteredAccount,
    getRegisteredAccounts
  }
}

module.exports = accountManager
