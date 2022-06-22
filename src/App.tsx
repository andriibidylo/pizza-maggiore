
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
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<ItemDetails />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
