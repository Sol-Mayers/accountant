'use strict';
(function(fieldOfRows) {
    window.journal = {
      addRow: function ({
                          datetime,
                          income,
                          expense,
                          amount,
                          result,
                        }) {
        let fieldOfRows = document.querySelector('.fieldOfRows');
        let newRow = document.createElement('tr');
        fieldOfRows.appendChild(newRow);
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

        tdOne.innerHTML = datetime;
        tdTwo.innerHTML = income
        tdThree.innerHTML = expense;
        tdFour.innerHTML = amount;
        tdFive.innerHTML = result;

      },
      saveRow: function ({
                           datetime,
                           income,
                           expense,
                           amount,
                           result,
                         }) {

        let allRows = [];

        if (localStorage.getItem('addedrow'))
          allRows = JSON.parse(localStorage.getItem('addedrow'));

        let addRow = {
          one: datetime,
          two: income,
          three: expense,
          four: amount,
          five: result,
        }

        allRows.push(addRow);

        localStorage.setItem('addedrow', JSON.stringify(allRows));
      }
    }
})()