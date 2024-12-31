describe('DynamicTable', () => {

  let dynamicTable;

  it('should format date correctly', () => {
    let mockData = {
      "columns": [
        { "header": "Data", "style": "text-align: center;", "format": "date" },
      ],
      "data": [
        {
          "Data": { "value": "2024-11-01", "format": "date" },
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const dateCell = document.querySelector('#dynamic-table tr td:nth-child(1)');
    expect(dateCell.textContent).toBe('01/11/2024');  // Verifies the formatted date
  });

  it('should create table headers', () => {
    let mockData = {
      "columns": [
        { "header": "Data", "style": "text-align: center;", "format": "date" },
        { "header": "Documento", "style": "", "format": "name" },
        { "header": "Entidade", "style": "", "format": "name" },
        { "header": "Cobrança", "style": "", "format": "name" },
        { "header": "Entrada", "style": "text-align: right;", "format": "currency" },
        { "header": "Saida", "style": "text-align: right;", "format": "currency" },
        { "header": "Saldo", "style": "text-align: right;", "format": "currency" },
        { "header": "Ações", "style": "text-align: center;" }
      ],
      "data": [
        {
          "Data": { "value": "2024-11-01", "format": "date" },
          "Documento": { "value": "59536/I", "format": "name" },
          "Entidade": { "value": "DESIGNTEX INDUSTRIA E COMERCIO DE TECIDOS LTDA", "format": "name" },
          "Cobrança": { "value": "00623904000173", "format": "cnpj" },
          "Entrada": { "value": "23081293871", "format": "cpf" },
          "Saida": { "value": "11951584923", "format": "phone" },
          "Saldo": {
            "type": "subTable",
            "value": [
              { "Documento": "SUB001", "Valor": 50.5 },
              { "Documento": "SUB002", "Valor": 70.0 }
            ]
          },
          "Ações": {
            "type": "actions",
            "value": ["checkbox", "edit"]
          }
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const headers = document.querySelectorAll('#dynamic-table th');
    expect(headers.length).toBeGreaterThan(0);  // Ensure headers are created
  });

  it('should populate rows with data', () => {
    let mockData = {
      "columns": [
        { "header": "Data", "style": "text-align: center;", "format": "date" },
        { "header": "Documento", "style": "", "format": "name" },
        { "header": "Entidade", "style": "", "format": "name" },
        { "header": "Cobrança", "style": "", "format": "name" },
        { "header": "Entrada", "style": "text-align: right;", "format": "currency" },
        { "header": "Saida", "style": "text-align: right;", "format": "currency" },
        { "header": "Saldo", "style": "text-align: right;", "format": "currency" },
        { "header": "Ações", "style": "text-align: center;" }
      ],
      "data": [
        {
          "Data": { "value": "2024-11-01", "format": "date" },
          "Documento": { "value": "59536/I", "format": "name" },
          "Entidade": { "value": "DESIGNTEX INDUSTRIA E COMERCIO DE TECIDOS LTDA", "format": "name" },
          "Cobrança": { "value": "00623904000173", "format": "cnpj" },
          "Entrada": { "value": "23081293871", "format": "cpf" },
          "Saida": { "value": "11951584923", "format": "phone" },
          "Saldo": {
            "type": "subTable",
            "value": [
              { "Documento": "SUB001", "Valor": 50.5 },
              { "Documento": "SUB002", "Valor": 70.0 }
            ]
          },
          "Ações": {
            "type": "actions",
            "value": ["checkbox", "edit"]
          }
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const rows = document.querySelectorAll('#dynamic-table tr');
    expect(rows.length).toBeGreaterThan(1);  // Ensure there are multiple rows in the table
  });

  it('should format currency correctly', () => {
    let mockData = {
      "columns": [
        { "header": "Entrada", "style": "text-align: right;", "format": "currency" },
        { "header": "Saida", "style": "text-align: right;", "format": "currency" }
      ],
      "data": [
        {
          "Entrada": { "value": 1, "format": "currency" },
          "Saida": { "value": 1, "format": "currency" }
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const entradaCell = document.querySelector('#dynamic-table > tbody > tr > td:nth-child(1)');
    const saidaCell = document.querySelector('#dynamic-table > tbody > tr > td:nth-child(2)');

    expect(entradaCell.textContent).toEqual("R$ 1,00");
    expect(saidaCell.textContent).toEqual("R$ 1,00");
  });

  it('should format name correctly', () => {
    let mockData = {
      "columns": [
        { "header": "Documento", "style": "", "format": "name" },
        { "header": "Entidade", "style": "", "format": "name" }
      ],
      "data": [
        {
          "Documento": { "value": "59536/I", "format": "name" },
          "Entidade": { "value": "victor sousa amorim chagas", "format": "name" }
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const documentoCell = document.querySelector('#dynamic-table tr td:nth-child(1)');
    const entidadeCell = document.querySelector('#dynamic-table tr td:nth-child(2)');

    expect(documentoCell.textContent).toBe('59536/I');
    expect(entidadeCell.textContent).toBe('Victor Sousa Amorim Chagas');
  });

  it('should handle subTable type correctly', () => {
    let mockData = {
      "columns": [
        { "header": "Saldo", "style": "text-align: right;", "format": "currency" }
      ],
      "data": [
        {
          "Saldo": {
            "type": "subTable",
            "value": [
              { "Documento": "SUB001", "Valor": 50.5 },
              { "Documento": "SUB002", "Valor": 70.0 }
            ]
          }
        }
      ]
    };

    dynamicTable = new DynamicTable('dynamic-table');
    dynamicTable.buildTableFromAPI(mockData);

    const subTableRows = document.querySelectorAll('#dynamic-table .sub-table tr');
    expect(subTableRows.length).toBe(2);  // Ensure there are 2 rows in the sub-table

    const subTableFirstRow = subTableRows[0].querySelectorAll('td');
    expect(subTableFirstRow[0].textContent).toBe('SUB001');
    expect(subTableFirstRow[1].textContent).toBe('R$ 50,50');

    const subTableSecondRow = subTableRows[1].querySelectorAll('td');
    expect(subTableSecondRow[0].textContent).toBe('SUB002');
    expect(subTableSecondRow[1].textContent).toBe('R$ 70,00');
  });
});
