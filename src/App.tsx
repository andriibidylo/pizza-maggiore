import { Suspense, lazy } from 'react';
import './scss/app.scss';
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router';

// lazy loading (Split bundle on chunks and download them if needed)

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'))
const Error = lazy(() => import(/* webpackChunkName: "Error" */'./pages/Error'))
const ItemDetails = lazy(() => import(/* webpackChunkName: "ItemDetails" */'./pages/ItemDetails'))

const App = () => {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={
          <Suspense fallback={<div>"Loading ..."</div>} >
            <Cart />
          </Suspense>
        } />
        <Route path="/pizza/:id" element={
          <Suspense fallback={<div>"Loading ..."</div>} >
            <ItemDetails />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>"Loading ..."</div>} >
            <Error />
          </Suspense>
        } />
      </Route>
    </Routes>
  );
}

export default App;
