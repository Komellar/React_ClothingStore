import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './Header.css';
import HeaderButton from './HeaderButton';

const Header = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <React.Fragment>
      <header className="header">
        <Link to="/products" className="logo">
          Clothing store
        </Link>
        <HeaderButton onOpen={props.onOpen} itemsQuantity={cartQuantity} />
      </header>
    </React.Fragment>
  );
};

export default Header;
