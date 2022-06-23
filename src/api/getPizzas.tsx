import axios from 'axios';
import { FetchPizzasType} from '../redux/pizzas/slice';
import {Pizza} from '../redux/pizzas/types'


export const getAllPizzasApi = async ({
  sortType,
  categoryId,
  currentPage,
  searchValue
}: FetchPizzasType
) => {

  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"
  let searchByCategory = categoryId > 0 ? `&category=${categoryId}` : ""
  const { data } = await axios
    .get<Pizza[]>(`${apiEndpoint}/items?sortBy=${sortType.sortProperty}${searchByCategory}&order=asc&page=${currentPage}&limit=8&search=${searchValue}`)
  return data
}
