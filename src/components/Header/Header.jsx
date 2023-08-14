import { useEffect, useRef, useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Dropdown, DropdownButton, Row, Col, Badge, Offcanvas } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import image from "../../assets/images/logo-BM.png";
import { clearUser } from '../../redux/states/user';
import { FaShoppingCart } from 'react-icons/fa'
import "./Header.css"

function Header() {
  const userState = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const [cartTotalItems, setCartTotalItems] = useState(0)
  const [offcanvasShow, setOffcancasShow] = useState(false)
const dispatch = useDispatch();

useEffect(() => {
  let totalItems = 0
  cart.forEach(cartItem => {
    totalItems += cartItem.quantity
  })
  setCartTotalItems(Number(totalItems))
},[cart])

const handleLogout = () => {
  dispatch(clearUser())
  navigate('/')
}

const handleLinkClick = () => {
  setOffcancasShow(false)
}

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
    navigate('/productos', { state: { keyword: keyword } })
  }

  /* active and inactive link styles*/

  let active = 'col-md-4 col-xl-3 text-center text-decoration-none text-white active-link'
  let notActive = 'col-md-4 col-xl-3 text-center text-decoration-none text-gray-500'

  return (
    <Navbar bg="dark" variant='dark' expand="md" className='header'>
      <Navbar.Brand href="/"><NavLink to="/"><img src={image} alt="BiciMundo" width="100" /></NavLink></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setOffcancasShow(true)}/>
      <Navbar.Offcanvas id="basic-navbar-nav d-flex" show={offcanvasShow} onHide={() => setOffcancasShow(false)}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className='header-container'>
          <Container>
          <Row className='search-bar-row-mobile'>
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
          </Row>
          <Row className='nav-links-row'>
            <Col className='mt-2 d-flex align-items-center'>
              <NavLink to="/" end className={({ isActive }) => (isActive ? active : notActive)}  onClick={handleLinkClick}>
                Home
              </NavLink>
              <NavLink to="/productos" className={({ isActive }) => (isActive ? active : notActive)} onClick={handleLinkClick}>
                Productos
              </NavLink>
            </Col>
            <>
              {
                userState.firstName ?
                  <Col className='right-links-container mt-2 loggedin-links'>
                    <DropdownButton
                      id="nav-dropdown-dark-example"
                      align="end"
                      title={userState.firstName}
                      className='user-dropdown px-1 py-0 m-0'
                      variant="dark"
                    >
                      <Dropdown.Item>
                        <NavLink to="/perfil" className="text-decoration-none text-dark px-0" onClick={handleLinkClick}>
                          Perfil
                        </NavLink>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <NavLink to="/carrito" className="text-decoration-none text-dark px-0" onClick={handleLinkClick}>
                          Carrito
                        </NavLink>
                      </Dropdown.Item>
                      { userState.roleId === 1 ? 
                        <Dropdown.Item>
                          <NavLink to="/productos/crear" className="text-decoration-none text-dark" onClick={handleLinkClick}>
                            Cargar producto
                          </NavLink>
                        </Dropdown.Item> 
                        
                        :
                      
                        <></>
                      }
                      <Dropdown.Divider />

                      <Dropdown.Item onClick={handleLogout}>
                        Cerrar sesion
                      </Dropdown.Item>
                    </DropdownButton>
                    <NavLink to="/carrito" className={({ isActive }) => `fs-4 d-flex align-items-center justify-content-center navbar-cart-mobile-cont ${(isActive ? active : notActive)}`} onClick={handleLinkClick}>
                      <FaShoppingCart className='w-auto h-50 align-self-center navbar-cart-mobile'/>
                    </NavLink>
                    {cartTotalItems > 0 ?
                     <Badge bg='danger' className='cart-total-items-badge'>{cartTotalItems}</Badge> :
                     <></>
                    }
                  </Col>
                  :
                  <Col className='right-links-container mt-2'>
                    <NavLink to="/registro" className={({ isActive }) => (isActive ? active : notActive)} onClick={handleLinkClick}>
                      Registro
                    </NavLink>
                    <NavLink to="/ingresar" className={({ isActive }) => (isActive ? active : notActive)} onClick={handleLinkClick}>
                      Ingresar
                    </NavLink>
                  </Col>
              }
            </>
          </Row>
          </Container>
        </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>

    </Navbar >
  );
}
export default Header;