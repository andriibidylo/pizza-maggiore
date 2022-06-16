
import './scss/app.scss';
import Categories from './components/Categories'
import Sort from './components/Sort'
import Header from './components/Header'
import PizzaBlock from './components/PizzaBlock'

const App = () => {
  return (
    <div class="wrapper">
    <Header/>
    <div class="content">
        <div class="container">
          <div class="content__top">
          <Categories/>
          <Sort/>
           </div>
          <h2 class="content__title">All pizzas</h2>
          <div class="content__items">
          <PizzaBlock/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
