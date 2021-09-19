import React, { useContext, useEffect, useState } from 'react';

import './Header.css';
import tiesImage from '../../assets/ties.jpg';
import HeaderButton from './HeaderButton';
import CartContext from '../store/cart-context';

const Header = (props) => {
  const [quantity, setQuantity] = useState(0);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    let itemsAmount = 0;
    cartCtx.items.forEach((item) => {
      setQuantity((itemsAmount += item.amount));
    });
  }, [cartCtx.items]);

  return (
    <React.Fragment>
      <header className="header">
        <h1>Clothing store</h1>
        <HeaderButton onOpen={props.onOpen} itemsQuantity={quantity} />
      </header>
      <div className="image">
        <img src={tiesImage} alt="Ties" />
      </div>
    </React.Fragment>
  );
};

export default Header;
