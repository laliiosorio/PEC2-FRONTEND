/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class ExpenseTrackerController {
  constructor(service, view) {
    this.service = service;
    this.view = view;

    this.view.bindAddTransaction(this.handleAddTransaction.bind(this));
    this.view.bindRemoveTransaction(this.handleRemoveTransaction.bind(this));
    this.view.bindEditTransaction(this.handleEditTransaction.bind(this));

    this.updateView();
  }

  handleAddTransaction(text, amount) {
    const newTransaction = this.service.addTransaction(text, amount);
    this.updateView();
  }

  handleRemoveTransaction(id) {
    this.service.removeTransaction(id);
    this.updateView();
  }

  handleEditTransaction(id) {
    const transactionToUpdate = this.service.getTransactionById(id);
    if (!transactionToUpdate) {
      console.error('Transacción no encontrada');
      return;
    }

    const newText = prompt('Ingrese el nuevo texto:', transactionToUpdate.text);
    const newAmount = parseFloat(
      prompt('Ingrese el nuevo monto:', transactionToUpdate.amount)
    );

    // Verificar si se ingresó un nuevo texto y un nuevo monto
    if (newText !== null && !isNaN(newAmount)) {
      this.service.updateTransaction(id, newText, newAmount);
      this.updateView();
    }
  }

  updateView() {
    const transactions = this.service.getTransactions();
    const total = this.service.calculateTotal();
    const income = this.service.calculateIncome();
    const expense = this.service.calculateExpense();

    this.view.clearTransactionList();
    transactions.forEach((transaction) =>
      this.view.addTransactionToList(transaction)
    );
    this.view.updateBalance(total, income, expense);
  }
}
