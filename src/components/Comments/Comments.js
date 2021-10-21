import { useEffect, useState, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { useSelector } from 'react-redux';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import { getAllComments } from '../../lib/api';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const isLogged = useSelector((state) => state.auth.isLoggedIn);

  const { productId } = props;
  const showCommentFormHandler = () => {
    setIsAddingComment(true);
  };

  const {
    sendRequest: getCommentsRequest,
    data,
    isLoading,
    error,
  } = useHttp(getAllComments);

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      getCommentsRequest(productId, mounted);
    }, 1);

    return () => (mounted = false);
  }, [getCommentsRequest, productId]);

  const commentAddHandler = useCallback(() => {
    getCommentsRequest(productId);
    setIsAddingComment(false);
  }, [getCommentsRequest, productId]);

  return (
    <section>
      <h2 className={classes.center}>Comments</h2>
      {!isLogged && (
        <p className={classes.centered}>Sign in to add a comment.</p>
      )}
      {!isAddingComment && isLogged && (
        <button onClick={showCommentFormHandler} className={classes['btn-add']}>
          Add Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={commentAddHandler} />}
      <CommentsList comments={data} loading={isLoading} error={error} />
    </section>
  );
};

export default Comments;
