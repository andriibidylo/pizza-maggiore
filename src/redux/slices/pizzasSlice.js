import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPizzasApi } from '../../api/getPizzas';

export const fetchPizzas = createAsyncThunk(
  'users/fetchPizzasStatus',
  async ({sortType, categoryId, currentPage, searchValue}) => {
    return await getAllPizzasApi({sortType, categoryId, currentPage, searchValue})
  }
)

const initialState = {
  items: []
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchPizzas.pending]: (state, action) => {
      console.log("pending")
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      console.log("rejected")
    },
  },
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer