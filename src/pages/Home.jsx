import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Placeholder from '../components/Placeholder'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from '../components/Pagination'
import { useContext } from 'react'
import { AppContext } from '../context';


const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: "popular", sortProperty: "raiting"
  })
  const { searchValue } = useContext(AppContext)

  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"

  useEffect(() => {

    (async () => {
      setIsloading(true)
      try {
        const { data } = await axios
          .get(`${apiEndpoint}/itmes?title=${searchValue}&category=${categoryId > 0 ? categoryId : ""}&sortBy=${sortType.sortProperty}&order=desc`)
        setItems(data)
        setIsloading(false)
      } catch (err) {
        console.error(err)
      }
      window.scrollTo(0, 0)
    })()
  }, [categoryId, sortType,searchValue])


  return (
    <>
     
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(el) => setSortType(el)} />
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
  
      <Pagination />
    </>
  )
}

export default Home