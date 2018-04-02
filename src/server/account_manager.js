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

  return {
    registerAccount,
    getRegisteredAccount
  }
}

module.exports = accountManager
