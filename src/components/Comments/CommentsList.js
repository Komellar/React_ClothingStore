import { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  let content = <h2>No Comments</h2>;

  if (props.comments.length > 0) {
    content = (
      <ul className={classes.list}>
        {props.comments.map((comment) => (
          <li key={comment.id} className={classes['list-item']}>
            <img
              src={comment.photoUrl}
              className={classes.avatar}
              alt="User's avatar"
            />
            <div>
              <Rating
                className={classes.star}
                readonly={true}
                initialRating={comment.rating}
                emptySymbol={<FontAwesomeIcon icon="star" />}
                fullSymbol={
                  <FontAwesomeIcon
                    icon="star"
                    className={classes['star-active']}
                  />
                }
              />
              <h5 className={classes.comment}>{comment.comment}</h5>
              <p className={classes.username}>{comment.username}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (props.error) {
    content = 'Error...';
  }
  if (props.loading) {
    content = 'Loading comments...';
  }

  return <Fragment>{content}</Fragment>;
};

export default CommentsList;
