import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import image from "../../assets/images/logo-BM.png";

function Header() {
  let active = 'col-md-3 col-xl-2 text-center text-decoration-none text-white'
  let notActive = 'col-md-3 col-xl-2 text-center text-decoration-none text-gray-500'
  return (
    <Navbar bg="dark" variant='dark' expand="md">
      <Navbar.Brand href="/"><NavLink to="/"><img src={image} alt="BiciMundo" width="100" /></NavLink></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav  d-flex">
        <Nav className='container-fluid mx-0 justify-content-between'>
          <Container className="row justify-content-start">
            <NavLink to="/" end className={({isActive}) => ( isActive ? active : notActive )}  >
              Home
            </NavLink>
            <NavLink to="/productos" className={({isActive}) => ( isActive ? active : notActive )} >
              Productos
            </NavLink>
          </Container>
          <Container className="row justify-content-end">
            <NavLink to="/login" className={({isActive}) => ( isActive ? active : notActive )} >
              Login
            </NavLink>
            <NavLink to="/register" className={({isActive}) => ( isActive ? active : notActive )} >
              Register
            </NavLink>
          </Container>
        </Nav>
      </Navbar.Collapse>

    </Navbar >
  );
}
export default Header;