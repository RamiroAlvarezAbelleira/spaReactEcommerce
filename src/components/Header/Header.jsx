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
          <Nav className='container'>
            <Container className="row justify-content-start">
              <Nav.Link className="col-3" href="/" bg="light">
                <Link className='nav-link' to="/">Home</Link>
              </Nav.Link>
              <Nav.Link className="col-3" href="/productos">
                <Link className='nav-link' to="/productos">Productos</Link>
              </Nav.Link>
            </Container>
            <Container className="row justify-content-end">
              <Nav.Link className="col-3" href="/login">
                <Link className='nav-link' to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link className="col-3" href="/register">
                <Link className='nav-link' to="/register">Register</Link>
              </Nav.Link>
            </Container>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;