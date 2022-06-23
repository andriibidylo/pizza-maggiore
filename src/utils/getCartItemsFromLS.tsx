export const getCartItemsFromLS = () => {
  const data = localStorage.getItem('cart')
console.log(data ? JSON.parse(data):[])
  return data ? JSON.parse(data) : [] 
}

