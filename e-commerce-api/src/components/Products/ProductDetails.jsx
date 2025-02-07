import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ProductConfirmationModal from './ProductConfirmationModal';

const ProductDetail = ({ productId, onProductDeleted }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching product');
      }
    };
    fetchProduct();
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/products/${productId}`);
      onProductDeleted(productId);
      setShowModal(false);
      history.push('/products');
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error deleting product');
    }
  };

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
    <p>Loading...</p>
  );
};

export default ProductDetail;