import React from 'react';
import ProductList from './ProductList';

const Essentials = () => {
  return (
    <div className="container">
      <h1>Infaltables</h1>
      <ProductList category="essentials" />
    </div>
  );
};

export default Essentials;
