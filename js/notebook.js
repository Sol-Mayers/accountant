'use strict';
(function() {
  let openNotebook = document.querySelector('.notebook');
  let notebook = document.querySelector('.notebook-popup');
  let closeNotebook = document.querySelector('.exit-button');
  let saveResult = document.querySelector('.save-button');
  let addedIcon = document.querySelector('.added-icon');
  let fieldOfRows = document.querySelector('.fieldOfRows');
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
    let makeTable = function() {
      let newRow = document.createElement('tr');
      fieldOfRows.appendChild(newRow);
      newRow.classList.add('white-row');
      let tdOne = document.createElement('td');
      tdOne.classList.add('text-table-notebook');
      let tdTwo = document.createElement('td');
      tdTwo.classList.add('text-table-notebook');
      let tdThree = document.createElement('td');
      tdThree.classList.add('text-table-notebook');
      let tdFour = document.createElement('td');
      tdFour.classList.add('text-table-notebook');
      let tdFive = document.createElement('td');
      tdFive.classList.add('table-button-del');
      let makeDeleteButton = document.createElement('button');
      makeDeleteButton.classList.add('button-delete-note');
      tdFive.appendChild(makeDeleteButton);
      newRow.appendChild(tdOne);
      newRow.appendChild(tdTwo);
      newRow.appendChild(tdThree);
      newRow.appendChild(tdFour);
      newRow.appendChild(tdFive);
      tdOne.innerHTML = window.calc.income.value;
      tdTwo.innerHTML = window.calc.expense.value;
      tdThree.innerHTML = window.calc.amount.value;
      tdFour.innerHTML = window.calc.result.textContent;
    }
    makeTable();
    window.calc.getSaveDisable();
  });

  fieldOfRows.addEventListener('click', function(event) {
    if(event.target.closest('.button-delete-note')) {
      event.target.closest('tr').remove();
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
          .sort((rowA, rowB) => parseInt(rowA.cells[0].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[0].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  expenseSort.addEventListener('click', function() {
    let sortedRows = Array.from(mainTable.rows)
          .slice(1)
          .sort((rowA, rowB) => parseInt(rowA.cells[1].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[1].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  amountSort.addEventListener('click', function() {
    let sortedRows = Array.from(mainTable.rows)
          .slice(1)
          .sort((rowA, rowB) => parseInt(rowA.cells[2].innerHTML.replace(/\s/g, '')) > parseInt(rowB.cells[2].innerHTML.replace(/\s/g, '')) ? 1 : -1);

    mainTable.tBodies[0].append(...sortedRows);
  });

  window.notebook = {
    saveResult: saveResult,
    openNotebook: openNotebook,
    mainTable: mainTable,
  }
})();
