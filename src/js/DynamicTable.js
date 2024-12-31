class DynamicTable {
  constructor(tableId, formatter = null) {
    this.table = document.getElementById(tableId);
    this.thead = this.table.querySelector('thead');
    this.tbody = this.table.querySelector('tbody');
    this.formatter = formatter || Formatter;  // Usando o Formatter por padrão se não for fornecido
  }

  buildTableFromAPI(apiResponse) {
    this.clearTable();

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

    apiResponse.data.forEach((rowData) => {
      const row = document.createElement('tr');
    
      if (rowData.rowStyle) {
        row.style = rowData.rowStyle;
      }
      if (rowData.rowClass) {
        row.classList.add(rowData.rowClass); 
      }
    
      let columnIndex = 0; 
    
      apiResponse.columns.forEach((column, index) => {
        const cell = document.createElement('td');
        cell.className = "align-middle text-center";
    
        
        let value = rowData[column.header]?.value != null ? rowData[column.header].value : '-';
        const columnFormat = rowData[column.header]?.format || column.format;
        const columnStyle = rowData[column.header]?.style || column.style;
        const columnClass = rowData[column.header]?.class || column.class;
    
        
        if (columnStyle) {
          cell.style = columnStyle;
        }
        if (columnClass) {
          cell.classList.add(columnClass);
        }
    
        const colspan = rowData[column.header]?.colspan || column.colspan;
        
        if (colspan) {
          cell.colSpan = colspan; 
          columnIndex += colspan - 1; 
        }

        const cellData = rowData[column.header];

        if (cellData?.type === "subTable") {
          cell.colSpan = column.colspan || 1;
          cell.style.padding = "0";
    
          const subTable = this.createSubTable(cellData?.value);
          cell.appendChild(subTable);
        } else if (cellData?.type === "actions") {
          cellData?.value.forEach((action) => {
            if (action === "checkbox") {
              const checkbox = document.createElement('input');
              checkbox.type = 'checkbox';
              checkbox.className = 'form-check-input';
              checkbox.style = 'box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);';
              checkbox.addEventListener('click', (event) => {
                this.handleCheckboxClick(event, rowData);
              });
              cell.appendChild(checkbox);
            } else if (action === "edit") {
              const editButton = document.createElement('button');
              editButton.className = 'btn btn-primary btn-sm';
              editButton.textContent = 'Editar';
              editButton.addEventListener('click', () => {
                this.handleEditClick(rowData);
              });
              cell.appendChild(editButton);
            } else if (action === "new") {
              const newButton = document.createElement('button');
              newButton.className = 'btn btn-success btn-sm';
              newButton.textContent = 'Novo';
              newButton.addEventListener('click', () => {
                this.handleNewClick(rowData);
              });
              cell.appendChild(newButton);
            } else if (action === "delete") {
              const deleteButton = document.createElement('button');
              deleteButton.className = 'btn btn-danger btn-sm';
              deleteButton.textContent = 'Deletar';
              deleteButton.addEventListener('click', () => {
                this.handleDeleteClick(rowData);
              });
              cell.appendChild(deleteButton);
            }
          });
        } else {
          if (!columnFormat) {
            cell.textContent = value;
          } else {
            if (columnFormat === "name") {
              cell.textContent = this.formatter.formatName(value);
            } else if (columnFormat === "date") {
              cell.textContent = this.formatter.formatDate(value);
            } else if (columnFormat === "cnpj") {
              cell.textContent = this.formatter.formatCNPJ(value);
            } else if (columnFormat === "cpf") {
              cell.textContent = this.formatter.formatCPF(value);
            } else if (columnFormat === "phone") {
              cell.textContent = this.formatter.formatPhone(value);
            } else if (columnFormat === "currency" && this.formatter.isNumeric(value)) {
              const { formattedValue, className } = this.formatter.formatCurrency(value);
              cell.textContent = formattedValue;
              cell.className += className;
            } else {
              cell.textContent = value;
            }
          }
        }
        row.appendChild(cell);
        
    
        columnIndex++;
      });

      const cells = row.children;
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const colspan = rowData[apiResponse.columns[i].header]?.colspan;
    
        // Se uma célula tem colspan, exclui as colunas subsequentes no caminho
        if (colspan) {
          for (let j = 1; j < colspan; j++) {
            row.removeChild(cells[i + j]);
          }
          break; // Para de remover, pois já percorremos o colspan
        }
      }
    
      this.tbody.appendChild(row);
    });
  }

  createSubTable(subData) {
    const subTable = document.createElement('table');
    subTable.className = "table table-sm table-bordered sub-table";
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
    this.thead.innerHTML = '';
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

