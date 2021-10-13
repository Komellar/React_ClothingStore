import { useDispatch } from 'react-redux';

import { cartActions } from '../../store/cart-slice';
import classes from './CartItem.module.css';

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.id,
        name: props.name,
        price: props.price,
        quantity: 1,
      })
    );
  };

  const removeFromCartHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.id));
  };

  return (
    <li className={classes['cart-item']}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.summary}>
          <span className={classes.price}>${props.price.toFixed(2)}</span>
          <span className={classes.amount}>x{props.quantity}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeFromCartHandler}>-</button>
        <button onClick={addToCartHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
