import { Fragment, useState } from 'react';

import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const showCommentFormHandler = () => {
    setIsAddingComment(true);
  };

  return (
    <Fragment>
      {!isAddingComment && (
        <button onClick={showCommentFormHandler} className={classes['btn-add']}>
          Add Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm />}
    </Fragment>
  );
};

export default Comments;
