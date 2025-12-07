import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button,Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext';

const Header = () => {
  const { carrito } = useContext(CartContext);
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>       
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="https://placehold.co/130x50?text=Black Goose" alt="Logo"
            className="d-inline-block align-top me-3"
          />
          <span>Tienda de café</span>
        </Navbar.Brand>

        <Nav className="ms-auto align-items-center">
          <Nav.Link as={Link} to="/" className="me-3">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/" className="me-3">Productos</Nav.Link>

          

          <Nav.Link as={Link} to="/deals" className="me-3">Ofertas</Nav.Link>
          <Nav.Link as={Link} to="/essentials" className="me-3">Infaltables</Nav.Link>

          <div className="d-flex align-items-center">
            <Button variant="outline-light" as={Link} to="/administracion" className="me-2">
              Administración
            </Button>
            <Link to="/carrito" className="text-white position-relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                            {totalItems > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
