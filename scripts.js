document.getElementById('income-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const incomeSource = document.getElementById('income-source').value;
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);

    const incomeItem = `<li class="list-group-item d-flex justify-content-between align-items-center">${incomeSource}<span class="badge bg-primary rounded-pill">${incomeAmount}</span></li>`;

    document.getElementById('income-list').insertAdjacentHTML('beforeend', incomeItem);

    const totalIncome = parseFloat(document.getElementById('total-income').textContent);
    document.getElementById('total-income').textContent = totalIncome + incomeAmount;

    updateBudget();
    this.reset();
});

document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseSource = document.getElementById('expense-source').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    const expenseItem = `<li class="list-group-item d-flex justify-content-between align-items-center">${expenseSource}<span class="badge bg-danger rounded-pill">${expenseAmount}</span></li>`;

    document.getElementById('expense-list').insertAdjacentHTML('beforeend', expenseItem);

    const totalExpense = parseFloat(document.getElementById('total-expense').textContent);
    document.getElementById('total-expense').textContent = totalExpense + expenseAmount;

    updateBudget();
    this.reset();
});

document.getElementById('income-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const amount = parseFloat(e.target.querySelector('span').textContent);
        const totalIncome = parseFloat(document.getElementById('total-income').textContent);

        document.getElementById('total-income').textContent = totalIncome - amount;
        e.target.remove();
        updateBudget();
    }
});

document.getElementById('expense-list').addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        const amount = parseFloat(e.target.querySelector('span').textContent);
        const totalExpense = parseFloat(document.getElementById('total-expense').textContent);

        document.getElementById('total-expense').textContent = totalExpense - amount;
        e.target.remove();
        updateBudget();
    }
});

function updateBudget() {
    const totalIncome = parseFloat(document.getElementById('total-income').textContent);
    const totalExpense = parseFloat(document.getElementById('total-expense').textContent);
    const budgetRemaining = totalIncome - totalExpense;

    document.getElementById('budget-remaining').textContent = budgetRemaining.toFixed(2);
}
