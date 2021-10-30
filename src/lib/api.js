const FIREBASE_DOMAIN =
  'https://react-clothing-store-b7a1b-default-rtdb.europe-west1.firebasedatabase.app/';

const FIREBASE_API_KEY = 'AIzaSyAXZm_0ROKGRMpfXcxCNUv84NUZY4DcEsY';

export async function registerUser(requestData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: requestData.email,
        password: requestData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Authentication failed.');
  }

  return { data };
}

export async function loginUser(requestData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: requestData.email,
        password: requestData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Authentication failed.');
  }

  return { data };
}

export async function updateUser(requestData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: requestData.idToken,
        displayName: requestData.name,
        photoUrl: requestData.photoUrl,
        deleteAttribute: [],
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Updating user failed.');
  }

  return { data };
}

export async function getUserData(requestData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: requestData.idToken,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Updating user failed.');
  }

  return { data };
}

export async function changeUserPassword(requestData) {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
    {
      method: 'POST',
      body: JSON.stringify({
        idToken: requestData.idToken,
        password: requestData.password,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Updating password failed.');
  }

  return { data };
}

export async function getAllProducts() {
  const response = await fetch(
    "https://fakestoreapi.com/products/category/men's%20clothing"
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get products.');
  }

  const loadedProducts = data.map((clothData) => {
    return {
      id: clothData.id,
      title: clothData.title,
      description: clothData.description,
      price: clothData.price,
      image: clothData.image,
    };
  });

  return loadedProducts;
}

export async function getProductDetails(productId) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${productId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get product data.');
  }

  const productDetails = {
    id: data.id,
    name: data.title,
    description: data.description,
    price: data.price,
    image: data.image,
  };

  return productDetails;
}

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
    throw new Error(data.error.message || 'Could not add comment.');
  }

  return { commentId: data.name };
}

export async function getAllComments(productId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${productId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      comment: data[key].comment,
      rating: data[key].rating,
      username: data[key].username,
      photoUrl: data[key].photoUrl,
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
