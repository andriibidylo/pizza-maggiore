
import './scss/app.scss';
import Categories from './components/Categories'
import Sort from './components/Sort'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'

const App = () => {
  return (
    <div className="wrapper">
    <Header/>
    <div className="content">
        <div className="container">
          <div className="content__top">
          <Categories/>
          <Sort/>
           </div>
          <h2 className="content__title">All pizzas</h2>
          <div className="content__items">
          <PizzaBlock price="15" title="Сheese-pizza"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
