import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart-slice';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalCartPrice);

  const cartItems = (
    <ul className={classes.items}>
      {items.map((item) => (
        <CartItem
          key={item.id}
          id={item.id}
          name={item.name}
          price={item.price}
          quantity={item.quantity}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    dispatch(cartActions.resetCart());
  };

  const modalActions = (
    <div className={classes['modal-actions']}>
      <button className={classes['button--close']} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <h3>Total Amount</h3>
          <p>${totalAmount.toFixed(2)}</p>
        </div>
        {modalActions}
      </React.Fragment>
    </Modal>
  );
};

export default Cart;
