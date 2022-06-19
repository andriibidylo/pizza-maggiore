import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Categories } from '../components/Categories'
import {Sort, list} from '../components/Sort'
import {PizzaBlock} from '../components/PizzaBlock'
import {Placeholder} from '../components/Placeholder'

import {Pagination} from '../components/Pagination'

import { useEffect, useState, useRef } from 'react';

import { useContext } from 'react'
import { AppContext } from '../context';

import { setCategoryId, setSortType, setCurrentPage, setFilters } from '../redux/slices/filterSlice'

const Home = () => {

  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const { searchValue } = useContext(AppContext)
  const {categoryId, sortType, currentPage} = useSelector(state => state.filters)
  const dispatch = useDispatch()
  
  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"

  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

    const fetchData = async () => {
   
      let searchByCategory = categoryId > 0 ? `&category=${categoryId}` : ""
      
      setIsloading(true)
      try {
        const { data } = await axios
          .get(`${apiEndpoint}/itmes?sortBy=${sortType.sortProperty}${searchByCategory}&order=desc&page=${currentPage}&limit=8&search=${searchValue}`)
        setItems(data)
        setIsloading(false)
      } catch (err) {
        console.error(err)
      }
      window.scrollTo(0, 0)
    }
  

 // If was the first render and params were changed
 useEffect(() => {
  if (isMounted.current) {
    const params = {
      categoryId: categoryId > 0 ? categoryId : null,
      sortProperty: sortType.sortProperty,
      currentPage,
    }
    const queryString = qs.stringify(params, {skipNulls: true });
  
    navigate(`/?${queryString}`);
  }
 
  isMounted.current = true;
}, [categoryId, sortType.sortProperty, currentPage]);

// If was the first then check URl-params and dispatch them to store
useEffect(() => {
  if (window.location.search) {
    const params = qs.parse(window.location.search.substring(1));

    const sortType = list.find((obj) => obj.sortProperty === params.sortProperty);

    dispatch(
      setFilters({
        ...params,
        sortType,
      }),
    );
 
    isSearch.current = true;
  }
}, []);

// Get data from the server
useEffect(() => {
  window.scrollTo(0, 0);

  if (!isSearch.current) {
    fetchData();
  }
 
  isSearch.current = false;
}, [categoryId, sortType.sortProperty, searchValue, currentPage]);

  return (
    <>
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => dispatch(setCategoryId(id))} />
          <Sort value={sortType} onChangeSort={(obj) => dispatch(setSortType(obj))} />
        </div>
        <h2 className="content__title">All pizzas</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(9)].map((_, index) =>
              <Placeholder key={index}
              />
            )
            : items.map((obj) => (
              <PizzaBlock
                key={obj.id}
                {...obj}
              />
            ))}
        </div>
  
      <Pagination currentPage={currentPage} onClickPage={(page)=>dispatch(setCurrentPage(page))} />
    </>
  )
}

export default Home