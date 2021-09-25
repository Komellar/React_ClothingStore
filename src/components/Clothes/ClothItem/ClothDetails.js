import classes from './ClothDetails.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import { Route, useRouteMatch, Link } from 'react-router-dom';
import Comments from '../../Comments/Comments';

const ClothDetails = (props) => {
  const { details } = props;
  const match = useRouteMatch();

  return (
    <div className={classes.content}>
      <h2 className={classes.name}>{details.name}</h2>
      <div className={classes.image}>
        <img src={details.image} alt="item" />
      </div>
      <p className={classes.desc}>{details.description}</p>
      <p className={classes.price}>{`$${details.price}`}</p>
      <p>Average Product Rating</p>
      <div className={classes.stars}>
        <Rating
          className={classes.star}
          readonly={true}
          initialRating={3}
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
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default ClothDetails;

/* <FontAwesomeIcon icon="star" className={classes.star} /> 
<FontAwesomeIcon icon={['far', 'star']} className={classes.star} /> */

/* <p>Rate this product</p> */
