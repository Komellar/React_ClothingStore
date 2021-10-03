import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { cartActions } from '../../../store/cart-slice';
import ClothItemForm from './ClothItemForm';
import classes from './ClothItem.module.css';

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
    // <li className={classes.item}>
    <Link to={`/products/${props.id}`} className={classes.item}>
      <div className={classes['image-section']}>
        <img src={props.image} alt="Item" className={classes.image} />
      </div>
      <h3 className={classes.name}>{props.name}</h3>
      <p className={classes.price}>${props.price}</p>
    </Link>
    // </li>
  );
};

export default ClothItem;
