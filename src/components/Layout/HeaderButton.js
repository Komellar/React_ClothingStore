import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './HeaderButton.module.css';

const HeaderButton = (props) => {
  return (
    <div className={classes['cart-btn']} onClick={props.onOpen}>
      <FontAwesomeIcon icon="shopping-cart" className={classes.icon} />
      <p className={classes.quantity}>{props.itemsQuantity}</p>
    </div>
  );
};

export default HeaderButton;
