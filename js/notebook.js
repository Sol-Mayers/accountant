'use strict';
(function() {
  let fieldOfRows = document.querySelector('.fieldOfRows');
  let openNotebook = document.querySelector('.notebook');
  let notebook = document.querySelector('.notebook-popup');
  let closeNotebook = document.querySelector('.exit-button');
  let saveResult = document.querySelector('.save-button');
  let addedIcon = document.querySelector('.added-icon');
  let mainTable = document.querySelector('.notebook-table');
  let deleteButton = document.querySelector('.button-delete-note');
  let incomeSort = document.querySelector('.income-sort');
  let expenseSort = document.querySelector('.expense-sort');
  let amountSort = document.querySelector('.amount-sort');
  let wall = document.querySelector('.gray-wall');
  let textTable = document.querySelector('.text-table-notebook');

  openNotebook.addEventListener('click', function(event) {
    notebook.classList.add('show-popup-anim');
    notebook.classList.remove('hide-popup-anim');
    wall.classList.add('add-anim');
  });
  closeNotebook.addEventListener('click', function(event) {
    notebook.classList.remove('show-popup-anim');
    notebook.classList.add('hide-popup-anim');
    wall.classList.remove('add-anim');
  });
  let getMoove = function() {
    addedIcon.classList.add('shift-icon');
  }
  let deleteMoove = function() {
    addedIcon.classList.remove('shift-icon');
  }
  saveResult.addEventListener('click', function(event) {
    getMoove();
    setTimeout(deleteMoove, 1500);
    window.calc.getNoteEnable();

    let data = new Date();
    let year = data.getFullYear();
    let month = data.getMonth();
    let day = data.getDate();

    const date = (day + '.' + (month + Number(1)) + '.' + year)
    window.journal.addRow({
      datetime: date,
      income: window.calc.income.value,
      expense: window.calc.expense.value,
      amount: window.calc.amount.value,
      result: window.calc.result.textContent,
    });

    window.journal.saveRow({
      datetime: date,
      income: window.calc.income.value,
      expense: window.calc.expense.value,
      amount: window.calc.amount.value,
      result: window.calc.result.textContent,
    });
    window.calc.getSaveDisable();
  });


    fieldOfRows.addEventListener('click', function(event) {
      if(event.target.closest('.button-delete-note')) {
        event.target.closest('tr').remove();
        localStorage.removeItem('addedrow');
      }
      if(mainTable.rows.length === 1) {
        notebook.classList.remove('show-popup-anim');
        notebook.classList.add('hide-popup-anim');
        wall.classList.remove('add-anim');
        window.calc.getNoteDisable();
      }
      if(mainTable.rows.length === 8) {
        window.calc.getSaveEnable();
      }
    });

  incomeSort.addEventListener('click', function() {
    let sortedRows = Array.from(mainTable.rows)
          .slice(1)
          .sort((rowA, rowB) => parseInt(rowA.cells[1].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[1].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  expenseSort.addEventListener('click', function() {
    let sortedRows = Array.from(mainTable.rows)
          .slice(1)
          .sort((rowA, rowB) => parseInt(rowA.cells[2].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[2].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  amountSort.addEventListener('click', function() {
    let sortedRows = Array.from(mainTable.rows)
          .slice(1)
          .sort((rowA, rowB) => parseInt(rowA.cells[3].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[3].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  window.notebook = {
    saveResult: saveResult,
    openNotebook: openNotebook,
    mainTable: mainTable,
  }
})();
