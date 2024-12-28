class DynamicTable {
  constructor(tableId, formatter = null) {
    this.table = document.getElementById(tableId);
    this.thead = this.table.querySelector('thead');
    this.tbody = this.table.querySelector('tbody');
    this.formatter = formatter || Formatter;  // Usando o Formatter por padrão se não for fornecido
  }

  buildTableFromAPI(apiResponse) {
    console.log(apiResponse);

    this.clearTable();

    // Cria os cabeçalhos
    const headerRow = document.createElement('tr');
    apiResponse.columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column.header;
      th.style.cssText = column.style;
      if (column.colspan) {
        th.colSpan = column.colspan;
      }
      th.className = "table-primary";

      const sortIcon = document.createElement('span');
      sortIcon.textContent = ' ⇅';
      sortIcon.style.cursor = 'pointer';
      sortIcon.style.marginLeft = '5px';

      let sortState = 'neutral';
      sortIcon.addEventListener('click', () => {
        if (sortState === 'neutral') {
          sortState = 'asc';
          sortIcon.textContent = ' ⇧';
        } else if (sortState === 'asc') {
          sortState = 'desc';
          sortIcon.textContent = ' ⇩';
        } else {
          sortState = 'neutral';
          sortIcon.textContent = ' ⇅';
        }
        console.log(`Ordenar coluna: ${column.header}, Estado: ${sortState}`);
      });

      th.appendChild(sortIcon);
      headerRow.appendChild(th);
    });

    this.thead.appendChild(headerRow);

    // Cria as linhas de dados
    apiResponse.data.forEach(rowData => {
      const row = document.createElement('tr');
      row.className = "text-black";

      apiResponse.columns.forEach(column => {
        const cell = document.createElement('td');
        cell.className = "align-middle text-center";

        let value = rowData[column.header] != null ? rowData[column.header] : '-';

        if (column.header === "Ações" && rowData.Ações) {
          rowData.Ações.forEach(action => {
            if (action === "checkbox") {
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.className = 'form-check-input';
              checkbox.style = 'box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);';
              checkbox.addEventListener('click', (event) => {
                this.handleCheckboxClick(event, rowData);
              });
              cell.appendChild(checkbox);
            }
          });
        } else if (column.header === "Dados baixa" && rowData.SubTable) {
          cell.colSpan = column.colspan || 1;
          cell.style.padding = "0";

          const subTable = this.createSubTable(rowData.SubTable);
          cell.appendChild(subTable);
        } else {
          // Usando o formatter fornecido (ou o padrão Formatter)
          if (column.format === "capitalize") {
            cell.textContent = this.formatter.capitalize(value);
          } else if (column.format === "date") {
            cell.textContent = this.formatter.formatDate(value);
          } else if (column.format === "currency" && this.formatter.isNumeric(value)) {
            const { formattedValue, className } = this.formatter.formatCurrency(value);
            cell.textContent = formattedValue;
            cell.className += className;
          } else {
            cell.textContent = value;
          }
        }

        row.appendChild(cell);
      });
      this.tbody.appendChild(row);
    });
  }

  createSubTable(subData) {
    const subTable = document.createElement('table');
    subTable.className = "table table-sm table-bordered";
    subTable.style = "margin: 0;";
    subData.forEach(subRow => {
      const subRowElement = document.createElement('tr');
      Object.keys(subRow).forEach(key => {
        const subCell = document.createElement('td');
        subCell.className = key === "Valor" ? 'text-end' : '';
        let value = subRow[key];
        if (this.formatter.isNumeric(value)) {
          const { formattedValue, className } = this.formatter.formatCurrency(value);
          subCell.textContent = formattedValue;
          subCell.className += className;
        } else {
          subCell.textContent = value;
        }
        subRowElement.appendChild(subCell);
      });
      subTable.appendChild(subRowElement);
    });

    return subTable;
  }

  clearTable() {
    this.tbody.innerHTML = '';
  }

  handleCheckboxClick(event, rowData) {
    if (event.target.checked) {
      console.log("Checkbox marcado", rowData);
    } else {
      console.log("Checkbox desmarcado", rowData);
    }
  }
}
