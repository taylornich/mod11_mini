import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

const PlaceOrderForm = ({ customerId, onOrderPlaced }) => {
  const [products, setProducts] = useState([]);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [orderDate, setOrderDate] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        customer_id: customerId,
        product_ids: selectedProductIds,
        order_date: orderDate,
      };
      const response = await axios.post('http://127.0.0.1:5000/orders', orderData);
      onOrderPlaced(response.data);
      setOrderDate('');
      setSelectedProductIds([]);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error placing order');
    }
  };

  const handleProductSelect = (productId) => {
    setSelectedProductIds((prev) => 
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h2>Place Order</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="orderDate">
          <Form.Label>Order Date</Form.Label>
          <Form.Control
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="products">
          <Form.Label>Select Products</Form.Label>
          {products.map((product) => (
            <Form.Check
              key={product.id}
              type="checkbox"
              label={`${product.name} - $${product.price}`}
              value={product.id}
              checked={selectedProductIds.includes(product.id)}
              onChange={() => handleProductSelect(product.id)}
            />
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
};

export default PlaceOrderForm;