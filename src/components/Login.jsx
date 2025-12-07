import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState } from 'react'; 
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const Login = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Usuario:', user);
    console.log('Contraseña:', pass);
        if (user === 'admin' && pass === 'admin') {
      navigate('/crud');
    } else {
      alert('Usuario o contraseña incorrectos');
    }
    
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar Sesión</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Usuario (admin)</Form.Label>
                  <Form.Control type="text" value={user} onChange={e => setUser(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña (admin)</Form.Label>
                  <Form.Control type="password" value={pass} onChange={e => setPass(e.target.value)} required />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
