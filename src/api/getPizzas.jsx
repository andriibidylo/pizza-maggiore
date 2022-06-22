import axios from 'axios';
import { FetchPizzasType, Pizza } from '../redux/slices/pizzasSlice';


export const getAllPizzasApi = async({
  sortType,
  categoryId,
  currentPage,
  searchValue
 }) => {
  
  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"
  let searchByCategory = categoryId > 0 ? `&category=${categoryId}` : ""
  const { data } = await axios
    .get(`${apiEndpoint}/items?sortBy=${sortType.sortProperty}${searchByCategory}&order=desc&page=${currentPage}&limit=8&search=${searchValue}`)
    return data
}
