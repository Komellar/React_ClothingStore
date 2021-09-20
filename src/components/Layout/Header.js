import React from 'react';
import { useSelector } from 'react-redux';

import './Header.css';
import tiesImage from '../../assets/ties.jpg';
import HeaderButton from './HeaderButton';

const Header = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <React.Fragment>
      <header className="header">
        <h1>Clothing store</h1>
        <HeaderButton onOpen={props.onOpen} itemsQuantity={cartQuantity} />
      </header>
      <div className="image">
        <img src={tiesImage} alt="Ties" />
      </div>
    </React.Fragment>
  );
};

export default Header;
