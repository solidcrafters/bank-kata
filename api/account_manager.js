const { newAccount } = require('./account')

function accountManager () {
  const accounts = {}

  function registerAccount (accountName) {
    const account = newAccount(accountName)
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
