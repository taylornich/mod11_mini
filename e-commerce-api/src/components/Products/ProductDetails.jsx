import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductConfirmationModal from './ProductConfirmationModal';

const ProductDetail = ({ productId, onProductDeleted }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError('Failed to fetch product details');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      onProductDeleted(productId);
      setShowModal(false);
      navigate('/products');
    } catch (error) {
      setError('Error deleting product');
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return product ? (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Price: ${product.price}</Card.Subtitle>
          <Button variant="danger" onClick={() => setShowModal(true)}>
            Delete Product
          </Button>
        </Card.Body>
      </Card>
      <ProductConfirmationModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  ) : (
    <p>No product found</p>
  );
};

export default ProductDetail;