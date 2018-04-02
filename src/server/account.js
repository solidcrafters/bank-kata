class Account {
  constructor (name, balance = 80) {
    this.name = name
    this.balance = balance
  }

  credit (amount) {
    this.balance += amount
  }

  debit (amount) {
    this.balance -= amount
  }

  toJson () {
    return {
      name: this.name,
      balance: this.balance
    }
  }
}

module.exports = Account
