import React, { useEffect, useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { CartContext } from './CartContext';

const ProductList = ({ category = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useContext(CartContext);


  useEffect(() => {
    let url = 'https://692e49a591e00bafccd3623c.mockapi.io/products';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const filtered = category
          ? data.filter((item) => item.category === category)
          : data;
        setProducts(filtered);
        //
        //setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [category]);


    const handleAgregarAlCarrito = (product) => {
    alert(`Producto ${product.title} agregado al carrito`);
  };



  if (loading) {
    return <div>Loading...</div>;
  }  

  
  return (
    <Row>
      {products.map((product) => (
        // md={3} -> 4 columnas por fila en pantallas medianas o mayores
        <Col xs={12} sm={6} md={3} key={product.id} className="mb-4">
          <ProductCard product={product} agregarAlCarrito={agregarAlCarrito} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
