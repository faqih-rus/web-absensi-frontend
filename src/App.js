import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Home from "../src/components/Home";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboards/Dashboard";
import Register from "./components/Register";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home title="HOMEPAGE" description="SELAMAT DATANG WINNICODERS!" />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard title="DASHBOARD" />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={<Login title="MASUK" description="ABSEN KARYAWAN" />}
        />
        <Route
          path="/register"
          element={
            <Register title="DAFTAR" description="ABSEN KARYAWAN" />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
