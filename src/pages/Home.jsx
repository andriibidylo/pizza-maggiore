import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Placeholder from '../components/Placeholder'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '../components/Pagination'
import { useContext } from 'react'
import { AppContext } from '../context';
import { useSelector, useDispatch } from 'react-redux'
import { setCategoryId, setSortType } from '../redux/slices/filterSlice'

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const { searchValue } = useContext(AppContext)
  const {categoryId, sortType } = useSelector(state => state.filters)
  const dispatch = useDispatch()
  
  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"

  

  useEffect(() => {
    (async () => {
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
    })()
  }, [categoryId, sortType, searchValue,currentPage])


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
  
      <Pagination currentPage={currentPage} onClickPage={setCurrentPage} />
    </>
  )
}

export default Home