export function formatCurrency(number, locale = 'en-US',) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: "USD",
    }).format(number);
  }
  
  
  