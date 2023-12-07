document.getElementById('income-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const incomeSource = document.getElementById('income-source').value;
    const incomeAmount = parseFloat(document.getElementById('income-amount').value);

    if (!incomeSource.match(/[A-Za-z\s]+/)) {
        alert('Ievadiet tekstu ienākuma nosaukumam!');
        return;
    }

    if (isNaN(incomeAmount)) {
        alert('Ievadiet numurisko summu ienākumam!');
        return;
    }

    const incomeItem = `<li class="list-group-item d-flex justify-content-between align-items-center">${incomeSource}<span class="badge bg-primary rounded-pill">€${incomeAmount.toFixed(2)}</span></li>`;

    document.getElementById('income-list').insertAdjacentHTML('beforeend', incomeItem);

    const totalIncome = parseFloat(document.getElementById('total-income').textContent);
    document.getElementById('total-income').textContent = (totalIncome + incomeAmount).toFixed(2);

    updateBudget();
    this.reset();
});




document.getElementById('expense-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const expenseSource = document.getElementById('expense-source').value;
    const expenseAmount = parseFloat(document.getElementById('expense-amount').value);

    if (!expenseSource.match(/[A-Za-z\s]+/)) {
        alert('Ievadiet tekstu izdevuma nosaukumam!');
        return;
    }

    if (isNaN(expenseAmount)) {
        alert('Ievadiet numurisko summu izdevumam!');
        return;
    }

    const expenseItem = `<li class="list-group-item d-flex justify-content-between align-items-center">${expenseSource}<span class="badge bg-danger rounded-pill">€${expenseAmount.toFixed(2)}</span></li>`;

    document.getElementById('expense-list').insertAdjacentHTML('beforeend', expenseItem);

    const totalExpense = parseFloat(document.getElementById('total-expense').textContent);
    document.getElementById('total-expense').textContent = (totalExpense + expenseAmount).toFixed(2);

    updateBudget();
    this.reset();
});

// Pārējās funkcijas paliek nemainīgas


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

    const expenseProgress = document.getElementById('expense-progress');
    const remainingProgress = document.getElementById('remaining-progress');

    const expenseRatio = totalExpense / totalIncome * 100;
    const remainingRatio = budgetRemaining / totalIncome * 100;

    // Pievienot animētu procentu attēlojumu
    animatePercentage(expenseProgress, expenseRatio);
    animatePercentage(remainingProgress, remainingRatio);
}

// Funkcija, kas animē procentu attēlojumu
function animatePercentage(element, ratio) {
    let start = 0;
    const end = ratio;
    const duration = 1000; // Laiks milisekundēs
    const step = Math.abs(end - start) / duration;

    const animation = setInterval(() => {
        if (start >= end) {
            clearInterval(animation);
        }
        start += step;
        element.style.width = start + '%';
        element.textContent = `${element.id === 'expense-progress' ? 'Izdevumi' : 'Atlikušie ienākumi'}: ${start.toFixed(2)}%`;
    }, 10);
}

// Pēc tam izsaucam updateBudget() funkciju jebkurā vietā, kur tiek atjaunoti ienākumi vai izdevumi

