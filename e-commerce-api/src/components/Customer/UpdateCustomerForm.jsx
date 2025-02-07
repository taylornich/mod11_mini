import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

const UpdateCustomerForm = ({ customerId, onCustomerUpdated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/customers/${customerId}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone_number);
      } catch (error) {
        setError(error.response ? error.response.data.error : 'Error fetching customer');
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomer();
    } else {
      setError('Invalid customer ID');
      setLoading(false);
    }
  }, [customerId]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }
    try {
      const response = await axios.put(`${API_URL}/customers/${customerId}`, {
        name,
        email,
        phone_number: phoneNumber,
      });
      onCustomerUpdated(response.data);
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Error updating customer');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Update Customer</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Customer
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCustomerForm;