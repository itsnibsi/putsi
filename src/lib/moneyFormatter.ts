const formatterWithDecimals = (decimals: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

const formatters: { [key: number]: Intl.NumberFormat } = {};

export default function formatMoney(amount: number, decimals: number = 2) {
  if (!formatters[decimals]) {
    formatters[decimals] = formatterWithDecimals(decimals);
  }
  return formatters[decimals].format(amount);
}
