
import './scss/app.scss';
import Categories from './components/Categories'
import Sort from './components/Sort'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'
import Placeholder from './components/Placeholder'
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {

  const [items, setItems] = useState([])
  const [isLoading, setIsloading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://62aba2a1bd0e5d29af136c7a.mockapi.io/itmes")
        setItems(data)
        setIsloading(false)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
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
        </div>
      </div>
    </div>
  );
}

export default App;
