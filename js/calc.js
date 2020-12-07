'use strict';
(function() {
  let income = document.querySelector('.income-field');
  let expense = document.querySelector('.expense-field');
  let amount = document.querySelector('.wishful-amount-field');
  let result = document.querySelector('.how-long-answer');
  let buttonCalc = document.querySelector('.calculation-button');
  let buttonReset = document.querySelector('.reset-button');
  let buttonDisabled = document.querySelector('.disabled-button');
  let memoryAlert = document.querySelector('.memory-alert');
  let getDisable = function() {
    buttonCalc.disabled = true;
    buttonCalc.classList.add('disabled-button');
  }
  getDisable();
  let getSaveDisable = function() {
    window.notebook.saveResult.disabled = true;
    window.notebook.saveResult.classList.add('disabled-button');
  }
  getSaveDisable();
  let getSaveEnable = function() {
    window.notebook.saveResult.disabled = false;
    window.notebook.saveResult.classList.remove('disabled-button');
  }
  let getNoteDisable = function() {
    window.notebook.openNotebook.disabled = true;
    window.notebook.openNotebook.classList.add('disabled-button');
  }

  let getNoteEnable = function() {
    window.notebook.openNotebook.disabled = false;
    window.notebook.openNotebook.classList.remove('disabled-button');
  }
  getNoteDisable();

  /*if (localStorage.getItem('addedrow') === null) {
    getNoteDisable();
  } else {
    getNoteEnable();
    let makeFoundationTable = function() {
      let newRow = document.createElement('tr');
      window.notebook.fieldOfRows.appendChild(newRow);
      newRow.classList.add('white-row');
      let tdOne = document.createElement('td');
      tdOne.classList.add('text-table-notebook');
      tdOne.classList.add('date-cast');
      let tdTwo = document.createElement('td');
      tdTwo.classList.add('text-table-notebook');
      let tdThree = document.createElement('td');
      tdThree.classList.add('text-table-notebook');
      let tdFour = document.createElement('td');
      tdFour.classList.add('text-table-notebook');
      let tdFive = document.createElement('td');
      tdFour.classList.add('text-table-notebook');
      let tdSix = document.createElement('td');
      tdSix.classList.add('table-button-del');
      let makeDeleteButton = document.createElement('button');
      makeDeleteButton.classList.add('button-delete-note');
      tdSix.appendChild(makeDeleteButton);

      newRow.appendChild(tdOne);
      newRow.appendChild(tdTwo);
      newRow.appendChild(tdThree);
      newRow.appendChild(tdFour);
      newRow.appendChild(tdFive);
      newRow.appendChild(tdSix);

      tdOne.innerHTML = JSON.parse(localStorage.getItem('addedrow'));
      tdTwo.innerHTML = JSON.parse(localStorage.getItem('addedrow'));
      tdThree.innerHTML = JSON.parse(localStorage.getItem('addedrow'));
      tdFour.innerHTML = JSON.parse(localStorage.getItem('addedrow'));
      tdFive.innerHTML = JSON.parse(localStorage.getItem('addedrow'));



    }
    makeFoundationTable();
  }*/

  let getEnable = function() {
    buttonCalc.disabled = false;
    buttonCalc.classList.remove('disabled-button');
  }
  income.addEventListener('input', function(event) {
    income.value = income.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    if(Number(income.value.replace(/\s/g, '')) <= Number(expense.value.replace(/\s/g, '')) || Number(amount.value.replace(/\s/g, '')) < (Number(income.value.replace(/\s/g, '')) - Number(expense.value.replace(/\s/g, ''))) || Number(expense.value.replace(/\s/g, '')) >= Number(income.value.replace(/\s/g, '')) || Number(income.value.replace(/\s/g, '')) == '' || Number(expense.value.replace(/\s/g, '')) == '' || Number(amount.value.replace(/\s/g, '')) == '') {
      getDisable();
    } else {
      getEnable();
    }
  });
  expense.addEventListener('input', function(event) {
    expense.value = expense.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    if(Number(expense.value.replace(/\s/g, '')) >= Number(income.value.replace(/\s/g, '')) || Number(income.value.replace(/\s/g, '')) <= Number(expense.value.replace(/\s/g, '')) || Number(amount.value.replace(/\s/g, '')) < (Number(income.value.replace(/\s/g, '')) - Number(expense.value.replace(/\s/g, ''))) || Number(expense.value.replace(/\s/g, '')) == '' || Number(income.value.replace(/\s/g, '')) == '' || Number(amount.value.replace(/\s/g, '')) == '') {
      getDisable();
    } else {
      getEnable();
    }
  });
  amount.addEventListener('input', function(event) {
    amount.value = amount.value.replace(/[^\d]/g, '').replace(/\B(?=(?:\d{3})+(?!\d))/g, ' ');
    if(Number(amount.value.replace(/\s/g, '')) < (Number(income.value.replace(/\s/g, '')) - Number(expense.value.replace(/\s/g, ''))) || Number(income.value.replace(/\s/g, '')) <= Number(expense.value.replace(/\s/g, '')) || Number(expense.value.replace(/\s/g, '')) >= Number(income.value.replace(/\s/g, '')) || Number(amount.value.replace(/\s/g, '')) == '' || Number(expense.value.replace(/\s/g, '')) == '' || Number(income.value.replace(/\s/g, '')) == '') {
      getDisable();
    } else {
      getEnable();
    }
  });
  let getResult = function() {
    let balance = Number(income.value.replace(/\s/g, '')) - Number(expense.value.replace(/\s/g, ''));
    let resultFirst = Number(amount.value.replace(/\s/g, '')) / balance;
    return resultFirst;
  }
  buttonCalc.addEventListener('click', function(event) {
    const endings = [' Лет: ', ' Месяцев: '];
    result.textContent = endings[0] + Math.floor(getResult() / 12) + '. ' + endings[1] + Math.round(getResult() % 12) + '. ';
    if(result.textContent !== '' && window.notebook.mainTable.rows.length < 9) {
      getSaveEnable();
    } else {
      getSaveDisable();
      memoryAlert.classList.add('show-alert');
      let getHideAlert = function() {
        memoryAlert.classList.remove('show-alert');
      }
      setTimeout(getHideAlert, 2000);
    }
  });
  buttonReset.addEventListener('click', function(event) {
    result.textContent = '';
    getDisable();
    getSaveDisable();
  });
  window.calc = {
    getNoteEnable: getNoteEnable,
    getNoteDisable: getNoteDisable,
    income: income,
    expense: expense,
    amount: amount,
    result: result,
    getSaveDisable: getSaveDisable,
    getSaveEnable: getSaveEnable,
  }
})();
