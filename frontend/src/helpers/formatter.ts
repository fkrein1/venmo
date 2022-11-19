export const dateFormatter = new Intl.DateTimeFormat('en')

export const priceFormatter = new Intl.NumberFormat('en', {
  style: 'currency',
  currency: 'USD'
})
