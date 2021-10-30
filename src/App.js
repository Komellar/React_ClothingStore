import React, { Fragment, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './components/FontawesomeIcons';

import './App.css';
import Cart from './components/Cart/Cart';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import Header from './components/Layout/Header';
import ProductDetail from './pages/ProductDetail';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const closeCartHandler = () => {
    setCartIsShown(false);
  };

  const openCartHandler = () => {
    setCartIsShown(true);
  };

  return (
    <Fragment>
      {cartIsShown && <Cart onClose={closeCartHandler} />}
      <Header onOpen={openCartHandler} />
      <main>
        <Switch>
          <Route path="/React_ClothingStore/" exact>
            <Redirect to="/React_ClothingStore/home" />
          </Route>
          <Route path="/React_ClothingStore/home" exact>
            <Products />
          </Route>
          <Route path="/React_ClothingStore/products/:productId">
            <ProductDetail />
          </Route>
          <Route path="/React_ClothingStore/auth" exact>
            <AuthPage />
          </Route>
          <Route path="/React_ClothingStore/profile">
            <ProfilePage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </main>
    </Fragment>
  );
};

export default App;
