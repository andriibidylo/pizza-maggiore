import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItemType = {
  id: string,
  title: string,
  price: number,
  imageUrl: string,
  type: string,
  size: number,
  count: number,
}

interface CartSliceState {
  totalPrice: number,
  totalCaunt: number,
  items: CartItemType[]
}
const initialState: CartSliceState = {
  totalPrice: 0,
  totalCaunt: 0,
  items: []
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

      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * state.totalCaunt) + sum
      }, 0)

    },
    subtractItem: (state, action:PayloadAction<string>) => {
      const findItem = state.items.find(obj => obj.id === action.payload)

      if (findItem) {
        findItem.count -= 1
      }
      state.totalCaunt -= 1
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (obj.price * state.totalCaunt) + sum
      }, 0)

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

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id)
export const { addItem, removeItem, clearCart, subtractItem } = cartSlice.actions

export default cartSlice.reducer