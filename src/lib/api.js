const FIREBASE_DOMAIN =
  'https://react-clothing-store-b7a1b-default-rtdb.europe-west1.firebasedatabase.app/';

export async function addComment(requestData) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.productId}.json`,
    {
      method: 'POST',
      body: JSON.stringify(requestData.commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(productId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${productId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      comment: data[key].comment,
      rating: data[key].rating,
      username: data[key].username,
      //   ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
