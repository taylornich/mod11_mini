import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customers');
        setCustomers(response.data);
      } catch (err) {
        console.error(err);
        setError(`Error fetching customer list: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      <h2>Customer List</h2>

      <ListGroup>
        {customers.map((customer) => (
          <ListGroup.Item key={customer.id}>
            <div className="d-flex justify-content-between">
              <div>
                <h5>{customer.name}</h5>
                <p>{customer.email}</p>
              </div>
              <div>
                <Link to={`/customers/${customer.id}`} className="btn btn-info me-2" aria-label={`View details for ${customer.name}`}>View</Link>
                <Link to={`/customers/${customer.id}/edit`} className="btn btn-warning" aria-label={`Edit ${customer.name}`}>Edit</Link>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CustomerList;