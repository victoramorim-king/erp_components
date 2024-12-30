class Formatter {
    static formatCurrency(value) {
      const numericValue = Number(value);
      if (numericValue === null || numericValue === undefined || isNaN(numericValue)) {
        return { formattedValue: '-', className: ' text-dark' };
      }
  
      if (numericValue === 0) {
        return { formattedValue: 'R$ 0,00', className: ' text-dark' };
      }
  
      const formattedValue = numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  
      let className;
      if (numericValue > 0) {
        className = ' text-success';
      } else if (numericValue < 0) {
        className = ' text-danger';
      } else {
        className = ' text-dark';
      }
  
      return { formattedValue, className };
    }
  
    static formatName(value) {
      if (typeof value !== 'string') return value;
      return value.replace(/\b\w/g, char => char.toUpperCase());
    }
  
    static formatDate(value) {
      if (isNaN(Date.parse(value))) return value;
      const date = new Date(value);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
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
  