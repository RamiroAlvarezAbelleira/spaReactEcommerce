import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
import foto from "../../assets/images/jordan-walke.png";
import image from "../../assets/images/logo-BM.png";

function Header() {
  return (
    <Navbar bg="dark" variant='dark' expand="md">
      <Container>
        <Navbar.Brand href="/"><img src={image} alt="BiciMundo" width="100"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link href="/" bg="light">Home</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;