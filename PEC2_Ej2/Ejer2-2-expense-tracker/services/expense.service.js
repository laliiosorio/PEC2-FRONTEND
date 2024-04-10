/**
 * @class Service
 *
 * Manages the data of the application.
 */
class ExpenseTrackerService {
  constructor() {
    this.transactions = (
      JSON.parse(localStorage.getItem('transactions')) || []
    ).map((expense) => new ExpenseTracker(expense));
  }

  addTransaction(text, amount) {
    const transaction = {
      text,
      amount,
    };

    this.transactions.push(new ExpenseTracker(transaction));
    this._updateLocalStorage();

    return transaction;
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    this._updateLocalStorage();
  }

  updateTransaction(id, newText, newAmount) {
    const transactionToUpdate = this.transactions.find(
      (transaction) => transaction.id === id
    );

    if (transactionToUpdate) {
      transactionToUpdate.text = newText;
      transactionToUpdate.amount = newAmount;
      this._updateLocalStorage();
    }
  }

  _updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  getTransactions() {
    return this.transactions;
  }

  getTransactionById(id) {
    return this.transactions.find((transaction) => transaction.id === id);
  }

  calculateTotal() {
    return this.transactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  }

  calculateIncome() {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.amount > 0) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  }

  calculateExpense() {
    return this.transactions.reduce((total, transaction) => {
      if (transaction.amount < 0) {
        return total + transaction.amount;
      }
      return total;
    }, 0);
  }
}
