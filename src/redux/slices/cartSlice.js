import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalCaunt: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.items = state.items.push(action.payload)
    },
    removeItems: (state, action) => {
      state.items = state.items.filter(el=> el !== action.payload)
    },
    clearCart:(state)=> {
      state.items=[]
    },
    tatalItems:(state, action)=>{
      state.totalCaunt = action.payload
    }
  },
})

export const { addItems, removeItems, clearCart, tatalItems } = cartSlice.actions

export default cartSlice.reducer