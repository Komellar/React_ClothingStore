import { Fragment, useRef, useState, useReducer, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Rating from 'react-rating';

import classes from './NewCommentForm.module.css';

const validSymbols = /^(?!\s)[A-Za-z_][A-Za-z0-9_():^.?,!\s]+$/;
const hasValue = (value) => value.trim() !== '';
const hasValidSymbols = (value) => validSymbols.test(value);

const nameReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.val,
      isTouched: true,
      isValid: state.isValid,
      error: null,
    };
  }
  if (action.type === 'BLUR') {
    const validateName = () => {
      if (!hasValue(state.value)) {
        return "Username can't be empty!";
      } else if (!hasValidSymbols(state.value)) {
        return 'Use only valid symbols!';
      } else {
        return null;
      }
    };
    return {
      value: state.value,
      isTouched: true,
      isValid:
        !hasValue(state.value) || !hasValidSymbols(state.value) ? false : true,
      error: validateName(),
    };
  }
};

const commentReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.val,
      isTouched: true,
      isValid: state.isValid,
      error: null,
    };
  }
  if (action.type === 'BLUR') {
    const validateComment = () => {
      if (!hasValue(state.value)) {
        return "Comment can't be empty!";
      } else if (!hasValidSymbols(state.value)) {
        return 'Use only valid symbols!';
      } else {
        return null;
      }
    };
    return {
      value: state.value,
      isTouched: true,
      isValid:
        !hasValue(state.value) || !hasValidSymbols(state.value) ? false : true,
      error: validateComment(),
    };
  }
};

const NewCommentForm = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [ratingStars, setRatingStars] = useState(0);
  const nameInputRef = useRef();
  const commentInputRef = useRef();

  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isTouched: false,
    isValid: true,
    error: null,
  });

  const [commentState, dispatchComment] = useReducer(commentReducer, {
    value: '',
    isTouched: false,
    isValid: true,
    error: null,
  });

  useEffect(() => {
    if (
      !nameState.isValid ||
      !nameState.isTouched ||
      !commentState.isValid ||
      !commentState.isTouched ||
      ratingStars === 0
    ) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  }, [
    nameState.isValid,
    nameState.isTouched,
    commentState.isValid,
    commentState.isTouched,
    ratingStars,
  ]);

  const addCommentHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      if (nameState.error) {
        console.log(nameState.error);
      }
      if (commentState.error) {
        console.log(commentState.error);
      }
      return;
    }
    console.log('FORM IS VALID');
    console.log(nameState.value);
    console.log(commentState.value);
    console.log(ratingStars);
  };

  const starsChangeHandler = (amount) => {
    setRatingStars(amount);
    console.log(ratingStars);
  };

  const nameChangeHandler = () => {
    dispatchName({ type: 'INPUT', val: nameInputRef.current.value });
  };

  const commentChangeHandler = () => {
    dispatchComment({ type: 'INPUT', val: commentInputRef.current.value });
  };

  const nameBlurHandler = () => {
    dispatchName({ type: 'BLUR' });
  };

  const commentBlurHandler = () => {
    dispatchComment({ type: 'BLUR' });
  };

  const buttonClasses = !formIsValid
    ? `${classes.btn} ${classes.disabled}`
    : classes.btn;

  // const nameClasses = !nameState.isValid
  //   ? `${classes['form-control']} ${classes['form-error']}`
  //   : classes['form-control'];

  return (
    <Fragment>
      <form onSubmit={addCommentHandler} className={classes.form}>
        <div className={classes.stars}>
          <p>Star Rating</p>
          <Rating
            className={classes.star}
            emptySymbol={<FontAwesomeIcon icon="star" />}
            fullSymbol={
              <FontAwesomeIcon icon="star" className={classes['star-active']} />
            }
            initialRating={ratingStars}
            onClick={starsChangeHandler}
          />
        </div>
        <div className={classes.inputs}>
          <div className={classes['form-control']}>
            <label htmlFor="name">Username</label>
            <input
              ref={nameInputRef}
              type="text"
              name="name"
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            />
            {!nameState.isValid && (
              <p className={classes.error}>{nameState.error}</p>
            )}
          </div>
          <div className={classes['form-control']}>
            <label htmlFor="comment">Your Comment</label>
            <textarea
              ref={commentInputRef}
              name="comment"
              rows="5"
              onChange={commentChangeHandler}
              onBlur={commentBlurHandler}
            ></textarea>
            {!commentState.isValid && (
              <p className={classes.error}>{commentState.error}</p>
            )}
          </div>
        </div>
        <button className={buttonClasses}>
          {/* <button disabled={!formIsValid} type="submit"> */}
          Post Comment
        </button>
      </form>
    </Fragment>
  );
};

export default NewCommentForm;
