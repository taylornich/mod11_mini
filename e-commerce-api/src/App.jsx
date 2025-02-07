import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import CreateCustomerForm from './components/Customer/CreatCustomerForm';
import CustomerList from './components/Customer/CustomerList';
import UpdateCustomerForm from './components/Customer/UpdateCustomerForm';
import CustomerDetail from './components/Customer/CustomerDetails';
import ProductList from './components/Products/ProductList';
import CreateProductForm from './components/Products/CreateProductForm';
import UpdateProductForm from './components/Products/UpdateProductForm';
import ProductDetail from './components/Products/ProductDetails';
import PlaceOrderForm from './components/Orders/PlaceOrderForm';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">E-Commerce App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/customers">Customers</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Nav.Link as={Link} to="/orders/place">Place Order</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container>
        <h1 className="text-center mt-4">Welcome to the E-Commerce Application</h1>
        <Routes>
          <Route path="/customers" exact component={CustomerList} />
          <Route path="/customers/create" component={CreateCustomerForm} />
          <Route path="/customers/update/:id" component={UpdateCustomerForm} />
          <Route path="/customers/:id" component={CustomerDetail} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/create" component={CreateProductForm} />
          <Route path="/products/update/:id" component={UpdateProductForm} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/orders/place" component={PlaceOrderForm} />
          <Route path="/" exact>
            <h3 className="text-center">Welcome to the E-Commerce App!</h3>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;