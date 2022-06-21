import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPizzasApi } from '../../api/getPizzas';

export const fetchPizzas = createAsyncThunk(
  'users/fetchPizzasStatus',
  async ({sortType, categoryId, currentPage, searchValue}) => {
    return await getAllPizzasApi({sortType, categoryId, currentPage, searchValue})
  }
)

const initialState = {
  status: '',
  items: []
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      state.status = "loading"
      state.items = []
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
      state.status = "success"
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error"
      state.items = []
    },
  },
})

export const selectPizzas = state => state.pizzas
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer