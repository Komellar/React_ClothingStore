import React, { useContext } from 'react';
import CartContext from '../store/cart-context';
import Modal from '../UI/Modal';

import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = cartCtx.totalAmount.toFixed(2);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes.items}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes['modal-actions']}>
      <button className={classes['button--close']} onClick={props.onClose}>
        Close
      </button>
      <button className={classes.button}>Order</button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      <React.Fragment>
        {cartItems}
        <div className={classes.total}>
          <h3>Total Amount</h3>
          <p>${totalAmount}</p>
        </div>
        {modalActions}
      </React.Fragment>
    </Modal>
  );
};

export default Cart;
