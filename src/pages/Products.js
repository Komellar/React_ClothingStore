import React, { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { getAllProducts } from '../lib/api';

import './Products.css';
import tiesImage from '../assets/ties.jpg';
import AvalibleClothes from '../components/Clothes/AvalibleClothes';
import ClothesSummary from '../components/Clothes/ClothesSummary';
import InformationBanner from '../components/Banners/InformationBanner';
import NewCollectionBanner from '../components/Banners/NewCollectionBanner';
import NewsletterBanner from '../components/Banners/NewsletterBanner';

const Products = () => {
  const {
    sendRequest: getProductsRequest,
    data: clothes,
    isLoading,
    error,
  } = useHttp(getAllProducts);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      getProductsRequest(null, mounted);
    }, 1);

    return () => (mounted = false);
  }, [getProductsRequest]);

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

  return (
    <React.Fragment>
      <div className="ties-image">
        <img src={tiesImage} alt="Ties" />
      </div>
      <ClothesSummary />
      <InformationBanner />
      <NewCollectionBanner />
      {content}
      <NewsletterBanner />
    </React.Fragment>
  );
};

export default Products;
