import { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../hooks/use-http';
import { getProductDetails } from '../lib/api';
import ClothDetails from '../components/Clothes/ClothItem/ClothDetails';

const ProductDetail = () => {
  const params = useParams();
  const { productId } = params;

  const {
    sendRequest: getProductRequest,
    data,
    isLoading,
    error,
  } = useHttp(getProductDetails);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      getProductRequest(productId, mounted);
    }, 1);

    return () => (mounted = false);
  }, [getProductRequest, productId]);

  let content = <p className="db-message empty">Found no cloth.</p>;
  if (data) {
    content = <ClothDetails details={data} />;
  }
  if (error) {
    content = (
      <p style={{ fontSize: '3rem', textAlign: 'center', marginTop: '10rem' }}>
        {error}
      </p>
    );
  }
  if (isLoading) {
    content = (
      <p style={{ fontSize: '3rem', textAlign: 'center', marginTop: '10rem' }}>
        Loading...
      </p>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default ProductDetail;
