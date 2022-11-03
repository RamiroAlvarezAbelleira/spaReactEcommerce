import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navbar, Nav, Container, Form, Button } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import image from "../../assets/images/logo-BM.png";

function Header() {
  /* states */

  const [searchedProducts, setSearchedProducts] = useState([])
  const [keyword, setKeyword] = useState(undefined)

  /* search query logic */

  const search = useRef()

  const navigate = useNavigate()

  

  

  useEffect(() => {
    if (keyword) {
      let url = `http://localhost:3000/productos?search=${keyword}`
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data.data)) {
            setSearchedProducts(data.data)
          } else {
            setSearchedProducts([])
          }
        })
    }
  }, [keyword])

const handleSearch = (e) => {
    e.preventDefault()
    let value = search.current.value
    if (value) {
      setKeyword(value)
      navigate('/productos', {state:[...searchedProducts]})
    } else {
      setKeyword(undefined)
    }
  }

  /* active and inactive link styles*/

  let active = 'col-md-4 col-xl-2 text-center text-decoration-none text-white'
  let notActive = 'col-md-4 col-xl-2 text-center text-decoration-none text-gray-500'

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
            <NavLink to="/register" className={({ isActive }) => (isActive ? active : notActive)} >
              Registro
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? active : notActive)} >
              Ingresa
            </NavLink>
          </Container>
        </Nav>
      </Navbar.Collapse>

    </Navbar >
  );
}
export default Header;