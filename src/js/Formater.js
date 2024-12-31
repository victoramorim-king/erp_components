class Formatter {
  static formatCurrency(value) {
    const numericValue = Number(value);
    
    if (isNaN(numericValue) || numericValue === null || numericValue === undefined) {
      return { formattedValue: '-', className: ' text-dark' };
    }
  
    if (numericValue === 0) {
      return { formattedValue: 'R$ 0,00', className: ' text-dark' };
    }
  
    const formattedValue = numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
    // Substitua o R$ formatado por um R$ padrão
    const standardizedValue = formattedValue.replace("R$ ", "R$ ");
  
    let className;
    if (numericValue > 0) {
      className = ' text-success';
    } else if (numericValue < 0) {
      className = ' text-danger';
    } else {
      className = ' text-dark';
    }
  
    return { formattedValue: standardizedValue, className };
  }
  
  
    static formatName(value) {
      if (typeof value !== 'string') return value;
      return value.replace(/\b\w/g, char => char.toUpperCase());
    }
  
    static formatDate(value) {
      // Verifica se a data é válida
      if (isNaN(Date.parse(value))) return value;
      
      const dateParts = value.split('-'); // Divide a string 'yyyy-mm-dd'
      
      // Cria a data usando Date.UTC para garantir que não haja alteração de fuso horário
      const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
      
      // Garante o formato DD/MM/YYYY
      const day = String(date.getUTCDate()).padStart(2, '0');
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      const year = date.getUTCFullYear();
      
      // Retorna no formato desejado
      return `${day}/${month}/${year}`;
    }
    
    
  
    static isNumeric(value) {
      return !isNaN(value) && value !== null && value !== '';
    }
  
    static formatPhone(value) {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length === 10) {
        // Format: (XX) XXXX-XXXX
        return numericValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else if (numericValue.length === 11) {
        // Format: (XX) XXXXX-XXXX
        return numericValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
      return value; // Return the original value if it's not a valid phone number
    }
  
    static formatCPF(value) {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length === 11) {
        // Format: XXX.XXX.XXX-XX
        return numericValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      }
      return value; // Return the original value if it's not a valid CPF
    }
  
    static formatCNPJ(value) {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length === 14) {
        // Format: XX.XXX.XXX/XXXX-XX
        return numericValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
      }
      return value; // Return the original value if it's not a valid CNPJ
    }
  }
  