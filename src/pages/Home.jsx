import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Placeholder from '../components/Placeholder'
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: "popular", sortProperty: "raiting"
  })

  const apiEndpoint = "https://62aba2a1bd0e5d29af136c7a.mockapi.io"

  useEffect(() => {
    const category = categoryId > 0 ? categoryId : ""
      (async () => {
        setIsloading(true)
        try {
          const { data } = await axios
            .get(`${apiEndpoint}/itmes?category=${category}&sortBy=${sortType.sortProperty}&order=desc`)
          setItems(data)
          setIsloading(false)
        } catch (err) {
          console.error(err)
        }
        window.scrollTo(0, 0)
      })()
  }, [categoryId, sortType])
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


    </>
  )
}

export default Home