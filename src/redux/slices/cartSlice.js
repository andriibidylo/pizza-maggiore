import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalCaunt: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      
      if (findItem) {
        findItem.count += 1
       
      } else {
        state.items.push(action.payload)
       
      }
      
      state.totalCaunt+=1
      
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price* state.totalCaunt) + sum
      }, 0)

    },
    subtractItem: (state, action) => {
      const findItem = state.items.find(obj => obj.id === action.payload)
      
      if (findItem) {
        findItem.count -= 1
      }
      state.totalCaunt-=1
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price* state.totalCaunt) + sum
      }, 0)
      
    },
    removeItem: (state, action) =>{
      state.items = state.items.filter(obj => obj.id !== action.payload)
      
      // console.log(!!!)
        // state.itmes = state.items.filter(id => id !== action.payload.id)
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },

  },
})

export const { addItem, removeItem, clearCart, subtractItem} = cartSlice.actions

export default cartSlice.reducer