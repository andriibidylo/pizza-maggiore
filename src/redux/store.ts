import { configureStore } from '@reduxjs/toolkit'
import filters from './filter/slice'
import cart from './cart/slice'
import pizzas from './pizzas/slice'
import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: {
    filters,
    cart,
    pizzas,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 