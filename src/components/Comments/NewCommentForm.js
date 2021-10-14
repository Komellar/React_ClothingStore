import { Fragment, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import Rating from 'react-rating';
import classes from './NewCommentForm.module.css';
import { getUserData, addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  // const nameInputRef = useRef();
  const commentInputRef = useRef();

  const params = useParams();
  const { productId } = params;

  const token = localStorage.getItem('token');
  const { sendRequest: getUserRequest, data: userData } = useHttp(getUserData);

  useEffect(() => {
    getUserRequest({ idToken: token });
  }, [getUserRequest, token]);

  const {
    sendRequest: addCommentRequest,
    error,
    isLoading,
  } = useHttp(addComment);

  const {
    inputValue: commentValue,
    isTouched: commentIsTouched,
    isValid: commentIsValid,
    error: commentError,
    changeValue: changeComment,
    checkValidity: checkComment,
  } = useInput();

  const addCommentHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    await addCommentRequest({
      commentData: {
        username: userData.data.users[0].displayName,
        comment: commentValue,
        rating: ratingStars,
      },
      productId: productId,
    });

    props.onAddComment(productId);
  };

  useEffect(() => {
    if (!commentIsValid || !commentIsTouched || ratingStars === 0) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [commentIsValid, commentIsTouched, ratingStars]);

  const commentClasses = commentError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  const buttonClasses = !formIsValid
    ? `${classes.btn} ${classes.disabled}`
    : classes.btn;

  return (
    <Fragment>
      <form onSubmit={addCommentHandler} className={classes.form}>
        {error && <h3 className={classes['error-sending']}>{error}</h3>}
        <div className={classes.stars}>
          <p>Star Rating</p>
          <Rating
            className={classes.star}
            emptySymbol={<FontAwesomeIcon icon="star" />}
            fullSymbol={
              <FontAwesomeIcon icon="star" className={classes['star-active']} />
            }
            initialRating={ratingStars}
            onClick={(quantity) => setRatingStars(quantity)}
          />
        </div>
        <div className={classes.inputs}>
          <div className={commentClasses}>
            <label htmlFor="comment">Your Comment</label>
            <textarea
              ref={commentInputRef}
              name="comment"
              rows="5"
              onChange={() => changeComment(commentInputRef.current.value)}
              onBlur={checkComment}
            ></textarea>
            {!commentIsValid && <p className={classes.error}>{commentError}</p>}
          </div>
        </div>
        {!error && isLoading && (
          <button className={`${classes.btn} ${classes['btn-loading']}`}>
            Processing...
          </button>
        )}
        {!error && !isLoading && (
          <button className={buttonClasses}>Post Comment</button>
        )}
      </form>
    </Fragment>
  );
};

export default NewCommentForm;
