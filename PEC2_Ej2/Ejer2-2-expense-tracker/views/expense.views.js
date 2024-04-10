/**
 * @class View
 *
 * Visual representation of the model.
 */
class ExpenseTrackerView {
  constructor() {
    this.rootElement = document.getElementById('root');

    const container = document.createElement('div');
    container.classList.add('container');

    const header = document.createElement('h2');
    header.textContent = 'Expense Tracker';
    container.appendChild(header);

    const balanceHeader = document.createElement('h4');
    balanceHeader.textContent = 'Your Balance';
    container.appendChild(balanceHeader);

    const balance = document.createElement('h1');
    balance.id = 'balance';
    balance.textContent = '$0.00';
    container.appendChild(balance);

    const incExpContainer = document.createElement('div');
    incExpContainer.classList.add('inc-exp-container');
    container.appendChild(incExpContainer);

    const income = document.createElement('div');
    income.innerHTML =
      '<h4>Income</h4><p id="money-plus" class="money plus">+$0.00</p>';
    incExpContainer.appendChild(income);

    const expense = document.createElement('div');
    expense.innerHTML =
      '<h4>Expense</h4><p id="money-minus" class="money minus">-$0.00</p>';
    incExpContainer.appendChild(expense);

    const historyHeader = document.createElement('h3');
    historyHeader.textContent = 'History';
    container.appendChild(historyHeader);

    const list = document.createElement('ul');
    list.id = 'list';
    list.classList.add('list');
    container.appendChild(list);

    const addTransactionHeader = document.createElement('h3');
    addTransactionHeader.textContent = 'Add new transaction';
    container.appendChild(addTransactionHeader);

    const form = document.createElement('form');
    form.id = 'form';

    const textFormControl = document.createElement('div');
    textFormControl.classList.add('form-control');
    textFormControl.innerHTML =
      '<label for="text">Text</label><input type="text" id="text" placeholder="Enter text..." />';
    form.appendChild(textFormControl);

    const amountFormControl = document.createElement('div');
    amountFormControl.classList.add('form-control');
    amountFormControl.innerHTML =
      '<label for="amount">Amount <br />(negative - expense, positive - income)</label><input type="number" id="amount" placeholder="Enter amount..." />';
    form.appendChild(amountFormControl);

    const addButton = document.createElement('button');
    addButton.classList.add('btn');
    addButton.textContent = 'Add transaction';
    form.appendChild(addButton);

    container.appendChild(form);

    this.rootElement.appendChild(container);
  }

  // Método para agregar una transacción a la lista
  addTransactionToList(transaction) {
    const item = document.createElement('li');
    item.dataset.transactionId = transaction.id;

    const sign = transaction.amount < 0 ? '-' : '+';

    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'x';

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Editar';

    item.innerHTML = `
      <p>${transaction.text} <span>${sign}${Math.abs(
      transaction.amount
    )}</span> </p>
    `;

    item.appendChild(deleteButton);
    item.appendChild(editButton);

    const list = document.getElementById('list');
    list.appendChild(item);
  }

  // Método para actualizar el balance, ingresos y gastos
  updateBalance(total, income, expense) {
    const balance = document.getElementById('balance');
    balance.textContent = `$${total.toFixed(2)}`;
    const moneyPlus = document.getElementById('money-plus');
    moneyPlus.textContent = `$${income.toFixed(2)}`;
    const moneyMinus = document.getElementById('money-minus');
    moneyMinus.textContent = `$${expense.toFixed(2)}`;
  }

  // Método para limpiar la lista de transacciones
  clearTransactionList() {
    const list = document.getElementById('list');
    list.innerHTML = '';
  }

  // Método para manejar el envío del formulario
  bindAddTransaction(handler) {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = form.querySelector('#text').value;
      const amount = parseFloat(form.querySelector('#amount').value);
      handler(text, amount);
      form.querySelector('#text').value = '';
      form.querySelector('#amount').value = '';
    });
  }

  // Método para manejar la eliminación de una transacción
  bindRemoveTransaction(handler) {
    const list = document.getElementById('list');
    list.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-btn')) {
        const transactionId = event.target.parentNode.dataset.transactionId;
        handler(transactionId);
      }
    });
  }

  // Método para manejar la edición de una transacción
  bindEditTransaction(handler) {
    const list = document.getElementById('list');
    list.addEventListener('click', (event) => {
      if (event.target.classList.contains('edit-btn')) {
        const transactionId = event.target.parentNode.dataset.transactionId;
        handler(transactionId);
      }
    });
  }
}
