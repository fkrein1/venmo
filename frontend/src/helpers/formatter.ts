export const dateFormatter = new Intl.DateTimeFormat('en', {
  year: '2-digit',
  month: 'numeric',
  day: 'numeric'
})

export const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD'
})
