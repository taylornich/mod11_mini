import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

const UpdateProductForm = ({ productId, onProductUpdated }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
        setName(response.data.name);
        setPrice(response.data.price);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching product');
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:5000/products/${productId}`, {
        name,
        price,
      });
      onProductUpdated(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error updating product');
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProductForm;