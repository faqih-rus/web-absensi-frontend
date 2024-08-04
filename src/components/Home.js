import React from 'react';
import { Container, Button, Row, Col } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";

const Home = ({ title, description }) => {
  const typingTexts = [title, description].filter(Boolean);

  const backgroundStyle = {
    backgroundImage: `url("https://www.winnicode.com/mazer/images/banner-logo-hitam.png")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    backgroundRepeat: 'no-repeat',
  };

  const contentStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2rem',
    borderRadius: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={backgroundStyle}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div style={contentStyle}>
              <div className="text-center mb-4">
                {typingTexts.length > 0 ? (
                  <ReactTypingEffect
                    text={typingTexts}
                    speed={100}
                    eraseDelay={800}
                    eraseSpeed={100}
                    typingDelay={100}
                    className="fw-bold h3"
                  />
                ) : (
                  <h1 className="fw-bold">Welcome</h1>
                )}
              </div>
              <div className="text-center">
                <p className="mb-4">Selamat datang di PT Winnicode Garuda Teknologi</p>
                <Button href="/login" variant="primary" className="me-3">
                  Login
                </Button>
                <Button href="/register" variant="outline-primary">
                  Register
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;