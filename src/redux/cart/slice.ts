import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCartItemsFromLS } from '../../utils/getCartItemsFromLS'
import {calcTotalPrice} from '../../utils/calcTotalPrice'
import { CartItemType, CartSliceState } from './types'



const { items, totalPrice, totalCaunt} = getCartItemsFromLS()

const initialState: CartSliceState = {
  totalCaunt,
  totalPrice,
  items

}


export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemType>) => {
      const findItem = state.items.find(obj => obj.id === action.payload.id)

      if (findItem) {
        findItem.count += 1

      } else {
        state.items.push(action.payload) 
      }
      state.totalCaunt += 1
   
      state.totalPrice = calcTotalPrice(state.items)
    },
    subtractItem: (state, action:PayloadAction<string>) => {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count -= 1
      }
      state.totalCaunt -= 1
      state.totalPrice = calcTotalPrice(state.items);

    },
    removeItem: (state, action:PayloadAction<string>) => {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalCaunt = state.items.reduce((sum, obj) => {
        return (obj.count) + sum
      }, 0)
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * state.totalCaunt) + sum
      }, 0)
    },
    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },

  },
})

export const { addItem, removeItem, clearCart, subtractItem } = cartSlice.actions

export default cartSlice.reducer