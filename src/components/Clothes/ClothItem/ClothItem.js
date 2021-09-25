import React from 'react';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../../store/cart-slice';
import './ClothItem.css';
import ClothItemForm from './ClothItemForm';

const ClothItem = (props) => {
  const dispatch = useDispatch();

  const addItemToCartHandler = (quantity) => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: quantity,
      })
    );
  };

  return (
    <li className="item">
      <div>
        <h3 className="item-name">{props.name}</h3>
        <p className="item-price">${props.price}</p>
        <ClothItemForm onAdd={addItemToCartHandler} id={props.id} />
      </div>
      <div className="item-image-section">
        <img src={props.image} alt="Item" className="item-image" />
      </div>
    </li>
  );
};

export default ClothItem;
