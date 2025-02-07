import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Alert } from 'react-bootstrap';

const CustomerDetail = ({ customerId, onCustomerDeleted }) => {
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/customers/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching customer');
      }
    };
    fetchCustomer();
  }, [customerId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/customers/${customerId}`);
      onCustomerDeleted(customerId);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error deleting customer');
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;

  return customer ? (
    <Card>
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{customer.email}</Card.Subtitle>
        <Card.Text>Phone: {customer.phone_number}</Card.Text>
        <Button variant="danger" onClick={handleDelete}>
          Delete Customer
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <p>Loading...</p>
  );
};

export default CustomerDetail;