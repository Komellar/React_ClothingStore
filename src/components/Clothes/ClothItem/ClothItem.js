import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ClothItem.module.css';

const ClothItem = (props) => {
  return (
    <Link
      to={`/React_ClothingStore/products/${props.id}`}
      className={classes.item}
    >
      <div className={classes['image-section']}>
        <img src={props.image} alt="Item" className={classes.image} />
      </div>
      <h3 className={classes.name}>{props.name}</h3>
      <p className={classes.price}>${props.price}</p>
    </Link>
  );
};

export default ClothItem;
