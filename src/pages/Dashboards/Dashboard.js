import React, { useEffect, useState } from 'react';
import { Container, Button, Badge, Row, Col, Card, Form, Table } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbars from '../../components/Navbars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../style/dashboardStyles.css';

const MySwal = withReactContent(Swal);

const Dashboard = ({ title }) => {
  const [absensiList, setAbsensiList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [absenNotif, setAbsenNotif] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchAbsensiData(token);
    }
  }, [absenNotif, navigate]);

  useEffect(() => {
    const filtered = absensiList.filter(absen =>
      (absen.users_nip.toString().includes(searchTerm) || absen.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'all' || absen.status === filterStatus)
    );
    setFilteredList(filtered);
  }, [searchTerm, filterStatus, absensiList]);

  const fetchAbsensiData = async (token) => {
    try {
      const response = await axios.get('http://localhost:8000/absensi', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAbsensiList(response.data.absensi);
    } catch (error) {
      console.error('Error fetching absensi data:', error);
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const showAlert = (title, text, icon) => {
    MySwal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
    });
  };

  const Attendance = async (params) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `http://localhost:8000/absensi/${params}`,
        { nip: localStorage.getItem('nip') },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAbsenNotif(!absenNotif);
      showAlert('Success', `Check ${params} berhasil!`, 'success');
    } catch (error) {
      console.error('Error during attendance:', error);
      showAlert('Error', `Check ${params} gagal!`, 'error');
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    }
  };

  const getChartData = () => {
    const data = [
      { name: 'Check In', count: absensiList.filter(a => a.status === 'in').length },
      { name: 'Check Out', count: absensiList.filter(a => a.status === 'out').length },
    ];
    return data;
  };

  return (
    <Container fluid className="dashboard-container">
      <Navbars />
      <Row className="my-4">
        <Col>
          <h1 className="text-center">{title}</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={4}>
          <Card className="user-info-card">
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {localStorage.getItem('nama')}
                <br />
                <strong>NIP:</strong> {localStorage.getItem('nip')}
                <br />
                <strong>Role:</strong> {localStorage.getItem('role')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="attendance-card">
            <Card.Body>
              <Card.Title>Attendance</Card.Title>
              <Button onClick={() => Attendance('checkin')} className="me-2 mb-2">
                Check In
              </Button>
              <Button onClick={() => Attendance('checkout')} className="mb-2">
                Check Out
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="chart-card">
            <Card.Body>
              <Card.Title>Attendance Overview</Card.Title>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <Card className="absensi-list-card">
            <Card.Body>
              <Card.Title>Absensi List</Card.Title>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Control
                    type="text"
                    placeholder="Search by NIP or Status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col md={4}>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="in">Check In</option>
                    <option value="out">Check Out</option>
                  </Form.Select>
                </Col>
              </Row>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>NIP</th>
                    <th>Status</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredList.map((absen, i) => {
                    const { users_nip, status, createdAt } = absen;
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{users_nip}</td>
                        <td>
                          <Badge bg={status === 'in' ? 'success' : 'danger'}>
                            {status === 'in' ? 'Check In' : 'Check Out'}
                          </Badge>
                        </td>
                        <td>{new Date(createdAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
