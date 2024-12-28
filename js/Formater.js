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
  
    static capitalize(value) {
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
  }
  