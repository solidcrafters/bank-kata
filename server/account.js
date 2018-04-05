class Account {
  constructor (name, balance = 80, highLimit = 1000, lowLimit = -500) {
    this.name = name
    this.balance = balance
    this.highLimit = highLimit
    this.lowLimit = lowLimit
  }

  credit (amount, forceCreditForTransfer = false) {
    if (!forceCreditForTransfer
      && (amount <= 0 || this.balance + amount > this.highLimit)) {
      throw new Error('Credit impossible')
    }
    this.balance += amount
  }

  debit (amount) {
    if (amount <= 0 || this.balance - amount < this.lowLimit) {
      throw new Error('Debit impossible')
    }
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
