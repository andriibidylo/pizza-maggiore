import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAllPizzasApi } from '../../api/getPizzas';
import { SortTypeParams } from '../../components/Sort';
import { RootState } from '../store';



export type Pizza = {
  id: string,
  price: number,
  title: string,
  imageUrl: string,
  sizes: number[],
  types: number[]
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}
interface PizzasSliceState {
  status: Status,
  items: Pizza[]
}

const initialState: PizzasSliceState = {
  status: Status.LOADING,
  items: []
}

export type FetchPizzasType = {
  sortType: SortTypeParams,
  categoryId: number,
  currentPage: number,
  searchValue: string,
}

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasType>(
  'users/fetchPizzasStatus',
  async (params) => {
    const { sortType, categoryId, currentPage, searchValue } = params
    return await getAllPizzasApi({ sortType, categoryId, currentPage, searchValue })
  }
)


export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING
      state.items = []
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = Status.SUCCESS
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR
      state.items = []
    })
  },
})

export const selectPizzas = (state: RootState) => state.pizzas
export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer