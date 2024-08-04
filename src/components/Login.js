import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import ReactTypingEffect from "react-typing-effect";
import axios from "axios";

const Login = ({ title, description }) => {
  const [NIP, setNIP] = useState("");
  const [PASS, setPASS] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("nama") && localStorage.getItem("nip")) {
      console.log("user sudah login");
      window.location.replace("/dashboard");
    }
  }, []);

  const handleNIP = (inputNIP) => {
    setNIP(inputNIP);
  };

  const handlePASS = (inputPASS) => {
    setPASS(inputPASS);
  };

  const userLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!NIP || !PASS) {
      setError("NIP and Password are required.");
      return;
    }

    try {
      console.log("Attempting login with:", { nip: NIP, password: PASS });
      const response = await axios.post("http://localhost:3001/users/login", {
        nip: NIP,
        password: PASS,
      });

      console.log("Server response:", response.data);

      if (response.data && response.data.users) {
        localStorage.setItem("nip", response.data.users.nip);
        localStorage.setItem("nama", response.data.users.nama);
        localStorage.setItem("role", response.data.users.role);
        window.location.replace("/dashboard");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      console.error("Error response:", error.response);
      setError(error.response?.data?.error || "An error occurred during login. Please try again.");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-center fw-bold h3 my-4">
        <ReactTypingEffect
          text={[title, description]}
          speed={100}
          eraseDelay={800}
          eraseSpeed={100}
          typingDelay={100}
        />
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form
        className="w-50 mx-auto p-5 text-white"
        style={{ backgroundColor: "lightblue" }}
        onSubmit={userLogin}
      >
        <Form.Group>
          <Form.Label className="fw-bold">NIP</Form.Label>
          <Form.Control
            type="text"
            placeholder="masukan nip anda"
            required
            onChange={(event) => handleNIP(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="***"
            required
            onChange={(event) => handlePASS(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="mt-4 w-100">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;