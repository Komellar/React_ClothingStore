import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';

import './ClothItem.css';
import ClothItemForm from './ClothItemForm';

const ClothItem = (props) => {
  const cartCtx = useContext(CartContext);

  const addItemToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
      image: props.image,
      category: props.category,
    });
  };

  return (
    <li className="item">
      <div>
        <h3 className="item-name">{props.name}</h3>
        <p className="item-price">${props.price}</p>
        <ClothItemForm onAdd={addItemToCartHandler} />
      </div>
      <div className="item-image-section">
        <img src={props.image} alt="Item" className="item-image" />
      </div>
    </li>
  );
};

export default ClothItem;
