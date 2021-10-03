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
            <h5 className={classes.comment}>{comment.comment}</h5>
            <div className={classes['comment-span']}>
              <p>{comment.username}</p>
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (props.error) {
    // content = <button onClick={props.onFetch}>Try again</button>;
    content = 'Error...';
  }
  if (props.loading) {
    content = 'Loading comments...';
  }

  return <Fragment>{content}</Fragment>;
};

export default CommentsList;
