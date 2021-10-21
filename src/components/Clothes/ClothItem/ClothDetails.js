import { Fragment, useEffect } from 'react';
import { Route, useRouteMatch, Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import { useDispatch } from 'react-redux';

import { cartActions } from '../../../store/cart-slice';
import useHttp from '../../../hooks/use-http';
import { getAllComments } from '../../../lib/api';
import classes from './ClothDetails.module.css';
import Comments from '../../Comments/Comments';
import ClothItemForm from './ClothItemForm';

const ClothDetails = (props) => {
  const { details } = props;
  const match = useRouteMatch();
  const params = useParams();
  const { productId } = params;

  const { sendRequest, data } = useHttp(getAllComments);

  const calculateAverageRating = (items) => {
    let sum = 0;
    let count = 0;
    items.forEach((element) => {
      sum += element.rating;
      count++;
    });
    return (sum / count).toFixed(1);
  };

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      sendRequest(productId, mounted);
    }, 10);

    return () => (mounted = false);
  }, [sendRequest, productId]);

  const dispatch = useDispatch();

  const addItemToCartHandler = (quantity) => {
    dispatch(
      cartActions.addItemToCart({
        id: details.id,
        name: details.name,
        price: details.price,
        quantity: quantity,
      })
    );
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <h2 className={classes.name}>{details.name}</h2>
        <div className={classes.image}>
          <img src={details.image} alt="item" />
        </div>
        <p className={classes.desc}>{details.description}</p>
        <p className={classes.price}>{`$${details.price}`}</p>
        <ClothItemForm onAdd={addItemToCartHandler} id={productId} />
        <p className={classes['average-rating']}>Average Product Rating</p>
        <div className={classes.stars}>
          <Rating
            className={classes.star}
            readonly={true}
            initialRating={calculateAverageRating(data)}
            emptySymbol={<FontAwesomeIcon icon="star" />}
            fullSymbol={
              <FontAwesomeIcon icon="star" className={classes['star-active']} />
            }
          />
        </div>
        <Route path={match.path} exact>
          <div className={classes.buttons}>
            <Link
              to={`${match.url}/comments`}
              className={classes['btn-comments']}
            >
              Show Comments
            </Link>
          </div>
        </Route>
        <div className={classes.comments}>
          <Route path={`${match.path}/comments`}>
            <Comments productId={productId} />
          </Route>
        </div>
      </div>
    </Fragment>
  );
};

export default ClothDetails;
