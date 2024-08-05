import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import ReactTypingEffect from 'react-typing-effect';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = ({ title, description }) => {
  const [NIP, setNIP] = useState('');
  const [PASS, setPASS] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const userLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!NIP || !PASS) {
      setError('NIP and Password are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/users/login', {
        nip: NIP,
        password: PASS,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('nip', response.data.user.nip);
        localStorage.setItem('nama', response.data.user.nama);
        localStorage.setItem('role', response.data.user.role);
        MySwal.fire({
          title: 'Login Successful',
          icon: 'success',
          text: 'You have successfully logged in.',
        }).then(() => {
          navigate('/dashboard');
        });
      } else {
        MySwal.fire({
          title: 'Login Failed',
          icon: 'error',
          text: 'Please check your credentials.',
        });
      }
    } catch (error) {
      MySwal.fire({
        title: 'Error',
        icon: 'error',
        text: error.response?.data?.error || 'An error occurred during login. Please try again.',
      });
    }
  };

  return (
    <div
      style={{
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
      }}
    >
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '15px',
                padding: '2rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
              }}
            >
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
              <Form onSubmit={userLogin}>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">NIP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your NIP"
                    onChange={(event) => setNIP(event.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    onChange={(event) => setPASS(event.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Login
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

export default Login;
