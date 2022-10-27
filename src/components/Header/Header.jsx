import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import foto from "../../assets/images/jordan-walke.png";
import image from "../../assets/images/logo-BM.png";

function Header() {
  return (
    <Navbar bg="dark" variant='dark' expand="md">
      <Container>
        <Navbar.Brand href="/"><Link to="/"><img src={image} alt="BiciMundo" width="100" /></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link href="/" bg="light">
              <Link to="/">Home</Link>
            </Nav.Link>
            <Nav.Link href="/productos">
              <Link to="/productos">Productos</Link>
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/login">
              <Link to="/login">Login</Link>
            </Nav.Link>
            <Nav.Link href="/register">
              <Link to="/register">Register</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;