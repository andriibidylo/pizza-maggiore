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
      }
      state.items.push(action.payload)


      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price) + sum
      }, 0)

    },
    removeItem: (state, action) => {
      state.items = state.items.filter(el => el !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },

  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer