import React from 'react';

import './HeaderButton.css';

const HeaderButton = (props) => {
  return (
    <div className="header-cart" onClick={props.onOpen}>
      <h2>Your Cart</h2>
      <p>{props.itemsQuantity}</p>
    </div>
  );
};

export default HeaderButton;
