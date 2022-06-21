
import './scss/app.scss';
import Home from './pages/Home'
import Error from './pages/Error'
import Cart from './pages/Cart'
import ItemDetails from './pages/ItemDetails'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router';



const App = () => {

  return (
    <Routes>
      <Route path="/" exact element={<MainLayout />} >
        <Route path="/" exact element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route path="/pizza/:id" exact element={<ItemDetails />} />
        <Route path="*" exact element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
