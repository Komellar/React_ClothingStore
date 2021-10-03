import { useEffect, useState, useCallback } from 'react';
import useHttp from '../../hooks/use-http';

import NewCommentForm from './NewCommentForm';
import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import { getAllComments } from '../../lib/api';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { productId } = props;
  const showCommentFormHandler = () => {
    setIsAddingComment(true);
  };

  const { sendRequest, data, isLoading, error } = useHttp(getAllComments);

  useEffect(() => {
    let mounted = true;

    setTimeout(() => {
      sendRequest(productId, mounted);
    }, 1);

    return () => (mounted = false);
  }, [sendRequest, productId]);

  const commentAddHandler = useCallback(() => {
    sendRequest(productId);
  }, [sendRequest, productId]);

  return (
    <section
    // className={classes.comments}
    >
      <h2 className={classes.center}>Comments</h2>
      {!isAddingComment && (
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

//
//
//
//
//
//
//
//
//
//

// const [comments, setComments] = useState([]);
// const { isLoading, error, sendRequest: fetchComments } = useHttp();

// const transformComments = (commentsObj) => {
//   const loadedComments = [];

//   for (const commentKey in commentsObj) {
//     loadedComments.push({
//       id: commentKey,
//       text: commentsObj[commentKey].comment,
//     });
//   }
//   setComments(loadedComments);
// };
//
//
// const fetchData = useCallback(
//   async (mounted) => {
//     await fetchComments(
//       {
//         url: `https://react-clothing-store-b7a1b-default-rtdb.europe-west1.firebasedatabase.app/comments/${productId}.json`,
//       },
//       transformComments,
//       mounted
//     );
//   },
//   [fetchComments, productId]
// );

// useEffect(() => {
//   let mounted = true;
//   setTimeout(() => {
//     fetchData(mounted);
//   }, 1);

//   return () => (mounted = false);
// }, [fetchData]);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// import { Fragment, useEffect, useState } from 'react';

// import NewCommentForm from './NewCommentForm';
// import classes from './Comments.module.css';
// import useHttp from '../../hooks/use-http';
// import CommentsList from './CommentsList';

// const Comments = (props) => {
//   const [isAddingComment, setIsAddingComment] = useState(false);
//   const [comments, setComments] = useState([]);

//   const { productId } = props;
//   const showCommentFormHandler = () => {
//     setIsAddingComment(true);
//   };

//   // const { isLoading, error, sendRequest: fetchComments } = useHttp();

//   useEffect(() => {
//     let mounted = true;

//     const transformComments = (commentsObj) => {
//       const loadedComments = [];

//       for (const commentKey in commentsObj) {
//         loadedComments.push({
//           id: commentKey,
//           text: commentsObj[commentKey].comment,
//         });
//       }

//       setComments(loadedComments);
//     };

//     const fetchComments = async () => {
//       const response = await fetch(
//         `https://react-clothing-store-b7a1b-default-rtdb.europe-west1.firebasedatabase.app/comments/${productId}.json`
//       );

//       if (!response.ok) {
//         throw new Error('Request failed');
//       }

//       if (mounted) {
//         const data = await response.json();
//         transformComments(data);
//       }
//     };

//     fetchComments();

//     return () => (mounted = false);
//   }, []);

//   return (
//     <Fragment>
//       {!isAddingComment && (
//         <button onClick={showCommentFormHandler} className={classes['btn-add']}>
//           Add Comment
//         </button>
//       )}
//       {isAddingComment && <NewCommentForm />}
//       <CommentsList
//         comments={comments}
//         // loading={isLoading} error={error}
//       />
//     </Fragment>
//   );
// };

// export default Comments;