function newAccount (name, balance = 80) {
  return {
    name,
    balance
  }
}

function creditAccount (account, amount) {
  return {
    name: account.name,
    balance: account.balance + amount
  }
}

function debitAccount (account, amount) {
  return creditAccount(account, -amount)
}

module.exports = {
  newAccount,
  creditAccount,
  debitAccount
}