import { useRef } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import image from "../../assets/images/logo-BM.png";

function Header() {
  /* states */

  let keyword;

  /* search query logic */

  const search = useRef()

  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    let value = search.current.value
    if (value) {
      keyword = value
    } else {
      keyword = undefined
    }
    navigate('/productos', { state: {keyword: keyword} })
  }

  /* active and inactive link styles*/

  let active = 'col-md-4 col-xl-3 text-center text-decoration-none text-white'
  let notActive = 'col-md-4 col-xl-3 text-center text-decoration-none text-gray-500'

  return (
    <Navbar bg="dark" variant='dark' expand="md">
      <Navbar.Brand href="/"><NavLink to="/"><img src={image} alt="BiciMundo" width="100" /></NavLink></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav  d-flex">
        <Nav className='container-fluid mx-0 justify-content-between'>
          <Container className="row justify-content-start">
            <NavLink to="/" end className={({ isActive }) => (isActive ? active : notActive)}  >
              Home
            </NavLink>
            <NavLink to="/productos" className={({ isActive }) => (isActive ? active : notActive)} >
              Productos
            </NavLink>
          </Container>
          <Form onSubmit={handleSearch} className="d-flex w-100">
            <Form.Control
              type="search"
              placeholder="Buscar"
              className="me-2"
              aria-label="Search"
              ref={search}
            />
            <Button type='submit' variant="outline-light">Buscar</Button>
          </Form>
          <Container className="row justify-content-end">
            <NavLink to="/registro" className={({ isActive }) => (isActive ? active : notActive)} >
              Registro
            </NavLink>
            <NavLink to="/ingresar" className={({ isActive }) => (isActive ? active : notActive)} >
              Ingresar
            </NavLink>
          </Container>
        </Nav>
      </Navbar.Collapse>

    </Navbar >
  );
}
export default Header;