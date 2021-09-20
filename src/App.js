import React, { Fragment, useState } from 'react';
import './App.css';
import Cart from './components/Cart/Cart';
import Clothes from './components/Clothes/Clothes';
import Header from './components/Layout/Header';

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
        <Clothes />
      </main>
    </Fragment>
  );
};

export default App;
