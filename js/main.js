
async function fetchDataAndBuildTable() {
  const data = {
    "columns": [
      { "header": "Ações", "style": "text-align: center;"},
      { "header": "Data", "style": "text-align: center;", "format": "date" },
      { "header": "Conta", "style": "", "format": "capitalize" },
      { "header": "Documento", "style": "", "format": "capitalize" },
      { "header": "S@T", "style": "", "format": "capitalize" },
      { "header": "Cobrança", "style": "", "format": "capitalize" },
      { "header": "Entidade", "style": "", "format": "capitalize" },
      { "header": "Valor", "style": "text-align: right;", "format": "currency" },
      { "header": "Dados baixa", "style": "", "colspan": 2 }
    ],
    "data": [
      {
        "Ações": ["checkbox"],
        "Data": "2024-12-28",
        "Conta": "Conta A",
        "Documento": "DOC001",
        "S@T": "SAT123",
        "Cobrança": "Cobranca A",
        "Entidade": "Entidade X",
        "Valor": -123.45,
        "SubTable": [
          { "Documento": "SUB001", "Valor": 50.5 },
          { "Documento": "SUB002", "Valor": 70.0 }
        ]
      },
      {
        "Ações": ["checkbox"],
        "Data": "2024-12-27",
        "Conta": "Conta B",
        "Documento": "DOC002",
        "S@T": "SAT456",
        "Cobrança": "Cobranca B",
        "Entidade": "Entidade Y",
        "Valor": 345.67,
        "SubTable": null
      },
      {
        "Ações": ["checkbox"],
        "Data": "2024-12-29",
        "Conta": "Conta C",
        "Documento": "DOC003",
        "S@T": "SAT789",
        "Cobrança": "Cobranca C",
        "Entidade": "Entidade Z",
        "Valor": 0,
        "SubTable": null
      }
    ]
  };

  const dynamicTable = new DynamicTable('dynamic-table');
  dynamicTable.buildTableFromAPI(data);
}

fetchDataAndBuildTable();