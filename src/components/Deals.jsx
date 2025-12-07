import React from 'react';
import ProductList from './ProductList';

const Deals = () => {
  return (
    <div className="container">
      <h1>Ofertas</h1>
      <ProductList category="deals" />
    </div>
  );
};

export default Deals;
