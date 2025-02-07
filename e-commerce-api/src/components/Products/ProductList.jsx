import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Alert } from 'react-bootstrap';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching products');
      }
    };
    fetchProducts();
  }, []);

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Product List</h2>
      <ListGroup>
        {products.map((product) => (
          <ListGroup.Item key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default ProductList;