import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from './Header.module.css';
import HeaderButton from './HeaderButton';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';

const Header = (props) => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes.span}>
          <Link to="/React_ClothingStore/home" className={classes.logo}>
            Clothing store
          </Link>
          <HeaderButton onOpen={props.onOpen} itemsQuantity={cartQuantity} />
        </div>
        <div className={classes['header-buttons']}>
          <ProfileButton />
          <LoginButton />
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
