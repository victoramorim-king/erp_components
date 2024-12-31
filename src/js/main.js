
async function fetchDataAndBuildTable() {
  const data = {
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
        "rowStyle": "",
        "rowClass": "subTotal3",
        "Data": { "value": "Saldo anterior não conciliado (329 registros)", "format": null, 'colspan': 2, 'class': 'text-red' },
        "Documento": { "value": null, "format": null },
        "Entidade": { "value": "", "format": "name" },
        "Cobrança": { "value": "", "format": "name" },
        "Entrada": { "value": "", "format": "currency" },
        "Saida": { "value": "", "format": "currency" },
        "Saldo": { "value": -981963.24, "format": null },
        "": "",

      },
      {
        "rowClass": "subTotal3",
        "Data": { "value": "Saldo anterior: Banco Bradesco", "format": null },
        "Documento": { "value": "", "format": "name" },
        "Entidade": { "value": "", "format": "name" },
        "Cobrança": { "value": "", "format": "name" },
        "Entrada": { "value": "", "format": "currency" },
        "Saida": { "value": "", "format": "currency" },
        "Saldo": { "value": -6982734.92, "format": null },
        "": ""
      },
      {
        "rowStyle": "background-color: lightgray;",
        "Data": { "value": "2024-11-01", "format": "date" },
        "Documento": { "value": "59536/I", "format": "name" },
        "Entidade": { "value": "DESIGNTEX INDUSTRIA E COMERCIO DE TECIDOS LTDA", "format": "name" },
        "Cobrança": { "value": null, "format": "name" },
        "Entrada": { "value": null, "format": "currency" },
        "Saida": { "value": -8227.41, "format": "currency" },
        "Saldo": { "value": -6990962.33, "format": "currency" },
        "Ações": {
          "type": "actions",
          "value": ["checkbox", "edit",]
        }
      },
      {
        "Data": { "value": "Baixas (1 Registro(s))", "format": null },
        "Documento": { "value": "", "format": "null" },
        "Entidade": { "value": "", "format": "name" },
        "Cobrança": { "value": "", "format": "name" },
        "Entrada": { "value": "", "format": "currency" },
        "Saida": { "value": "Valor", "format": null },
        "Saldo": { "value": 'Operação', "format": null },
        "": ""
      },
      {
        "Data": { "value": "2024-11-01", "format": "date" },
        "Documento": { "value": "59536/I", "format": "name" },
        "Entidade": { "value": "DESIGNTEX INDUSTRIA E COMERCIO DE TECIDOS LTDA", "format": "name" },
        "Cobrança": { "value": null, "format": "name" },
        "Entrada": { "value": null, "format": "currency" },
        "Saida": { "value": -8227.41, "format": "currency" },
        "Saldo": { "value": "pagar", "format": "name" },
        "Ações": {
          "type": "actions",
          "value": ["checkbox", "edit",]
        }
      },
      {
        "Data": { "value": "2024-11-01", "format": "date" },
        "Documento": { "value": "59536/I", "format": "name" },
        "Entidade": { "value": "DESIGNTEX INDUSTRIA E COMERCIO DE TECIDOS LTDA", "format": "name" },
        "Cobrança": { "value": null, "format": "name" },
        "Entrada": { "value": null, "format": "currency" },
        "Saida": { "value": -8227.41, "format": "currency" },
        "Saldo": {
          "type": "subTable",
          "value": [
            { "Documento": "SUB001", "Valor": 50.5 },
            { "Documento": "SUB002", "Valor": 70.0 }
          ]
        },
        "Ações": {
          "type": "actions",
          "value": ["checkbox", "edit",]
        }
      },
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
          "value": ["checkbox", "edit",]
        }
      }
    ]


  };

  const dynamicTable = new DynamicTable('dynamic-table');
  dynamicTable.buildTableFromAPI(data);
}

fetchDataAndBuildTable();