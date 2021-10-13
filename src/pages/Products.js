import React, { useState, useEffect, useCallback } from 'react';
// import useHttp from '../hooks/use-http';
// import { getUserData } from '../lib/api';

import AvalibleClothes from '../components/Clothes/AvalibleClothes';
import ClothesSummary from '../components/Clothes/ClothesSummary';
import './Products.css';
import tiesImage from '../assets/ties.jpg';
import InformationBanner from '../components/Banners/InformationBanner';
import NewCollectionBanner from '../components/Banners/NewCollectionBanner';
import NewsletterBanner from '../components/Banners/NewsletterBanner';

const Products = () => {
  const [clothes, setClothes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClothesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/category/men's%20clothing"
      );

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const loadedClothes = data.map((clothData) => {
        return {
          id: clothData.id,
          title: clothData.title,
          description: clothData.description,
          price: clothData.price,
          image: clothData.image,
        };
      });

      setClothes(loadedClothes);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchClothesHandler();
  }, [fetchClothesHandler]);

  let content = <p className="db-message empty">Found no clothes.</p>;
  if (clothes.length > 0) {
    content = <AvalibleClothes clothes={clothes} />;
  }
  if (error) {
    content = <p className="db-message error">{error}</p>;
  }
  if (isLoading) {
    content = <p className="db-message">Loading...</p>;
  }
  // const token = localStorage.getItem('token');
  // const { sendRequest: getData, data: userData } = useHttp(getUserData);

  return (
    <React.Fragment>
      <div className="ties-image">
        <img src={tiesImage} alt="Ties" />
      </div>
      <ClothesSummary />
      {/* <button onClick={() => getData({ idToken: token })}>Get data</button> */}
      {/* <button onClick={() => console.log(userData)}>Print data</button> */}
      <InformationBanner />
      <NewCollectionBanner />
      {content}
      <NewsletterBanner />
    </React.Fragment>
  );
};

export default Products;
