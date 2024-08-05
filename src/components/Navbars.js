import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/navbarStyles.css'; 

const Navbars = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container fluid>
        <Navbar.Brand href="/">
          <img
            src="https://winnicode.com/mazer/images/banner-logo.png"
            height="40"
            className="d-inline-block align-top"
            alt="Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link> 
          </Nav>
          <Nav className="ms-auto">
            <Nav.Item className="d-flex align-items-center">
              <h5 className="mb-0 me-3">{localStorage.getItem("nama")}</h5>
              <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
