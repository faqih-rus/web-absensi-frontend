import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Register = ({ title, description }) => {
  const [NIP, setNIP] = useState('');
  const [NAMA, setNAMA] = useState('');
  const [PASS, setPASS] = useState('');
  const [ROLE, setROLE] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNIP = (inputNIP) => {
    setNIP(inputNIP);
  };

  const handleNAMA = (inputNAMA) => {
    setNAMA(inputNAMA);
  };

  const handlePASS = (inputPASS) => {
    setPASS(inputPASS);
  };

  const handleROLE = (inputROLE) => {
    setROLE(inputROLE);
  };

  const userRegister = async (e) => {
    e.preventDefault();

    const requestingData = {
      nip: NIP,
      nama: NAMA,
      password: PASS,
      role: ROLE,
    };

    try {
      const result = await axios.post('http://localhost:8000/users', requestingData);
      if (result.data.registered) {
        MySwal.fire({
          title: 'Registration Successful',
          icon: 'success',
          text: 'You have successfully registered.',
        }).then(() => {
          navigate('/login');
        });
      } else {
        MySwal.fire({
          title: 'Registration Failed',
          icon: 'error',
          text: 'Please try again.',
        });
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response ? error.response.data : error.message,
      });
    }
  };

  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(
        135deg,
        rgba(255, 107, 0, 0.7),
        rgba(0, 128, 128, 0.7)
      ),
      url("https://www.winnicode.com/mazer/images/logo.png")
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div style={formStyle}>
              <div className="text-center mb-4">
                <ReactTypingEffect
                  text={[title, description]}
                  speed={100}
                  eraseDelay={800}
                  eraseSpeed={100}
                  typingDelay={100}
                  className="fw-bold h3 text-white"
                />
              </div>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={userRegister}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">NIP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your NIP"
                    onChange={(event) => handleNIP(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Nama</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    onChange={(event) => handleNAMA(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your role"
                    onChange={(event) => handleROLE(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={(event) => handlePASS(event.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Daftar Sekarang
                </Button>
                <Button variant="secondary" className="w-100" onClick={() => navigate('/')}>
                  Kembali
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
