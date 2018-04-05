class Account {
  constructor (name, balance = 80, highLimit = 1000, lowLimit = -500) {
    this.name = name
    this.balance = balance
    this.highLimit = highLimit
    this.lowLimit = lowLimit
  }

  credit (amount, forceCreditForTransfer = false) {
    const amountAsInt = parseInt(amount, 10);
    if (!forceCreditForTransfer
      && (isNaN(amountAsInt) || amountAsInt <= 0 || this.balance + amountAsInt > this.highLimit)) {
      throw new Error('Credit impossible')
    }
    this.balance += amountAsInt
    return amountAsInt;
  }

  debit (amount) {
    const amountAsInt = parseInt(amount, 10);
    if (isNaN(amountAsInt) || amountAsInt <= 0 || this.balance - amountAsInt < this.lowLimit) {
      throw new Error('Debit impossible')
    }
    this.balance -= amountAsInt
    return amountAsInt;
  }

  toJson () {
    return {
      name: this.name,
      balance: this.balance
    }
  }
}

module.exports = Account
