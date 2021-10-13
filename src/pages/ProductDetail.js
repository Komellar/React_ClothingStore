import { useCallback, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ClothDetails from '../components/Clothes/ClothItem/ClothDetails';

const ProductDetail = () => {
  const [clothDetails, setClothDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const params = useParams();
  const { productId } = params;

  const fetchClothDetailsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();

      setClothDetails(data);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [productId]);

  useEffect(() => {
    fetchClothDetailsHandler();
  }, [fetchClothDetailsHandler]);

  let content = <p className="db-message empty">Found no cloth.</p>;
  if (clothDetails) {
    const details = {
      id: clothDetails.id,
      name: clothDetails.title,
      description: clothDetails.description,
      price: clothDetails.price,
      image: clothDetails.image,
    };
    content = <ClothDetails details={details} />;
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
