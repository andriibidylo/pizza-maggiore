
import './scss/app.scss';
import Header from './components/Header'
import Home from './pages/Home'
import Error from './pages/Error'
import Cart from './pages/Cart'
import { Routes, Route } from 'react-router';
import { AppContext } from './context';
import { useState } from 'react';

const App = () => {

  const [searchValue, setSearchValue] = useState("")

  return (
    <AppContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="*" exact element={<Error />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
