import { useRef } from 'react';
import { Navbar, Nav, Container, Form, Button, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import image from "../../assets/images/logo-BM.png";
import { clearUser } from '../../redux/states/user';
import { FaShoppingCart } from 'react-icons/fa'
import "./Header.css"

function Header() {
  const userState = useSelector((store) => store.user);
const dispatch = useDispatch();

const handleLogout = () => {
  dispatch(clearUser())
  navigate('/')
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

  let active = 'col-md-4 col-xl-3 text-center text-decoration-none text-white'
  let notActive = 'col-md-4 col-xl-3 text-center text-decoration-none text-gray-500'

  return (
    <Navbar bg="dark" variant='dark' expand="md" className='header'>
      <Navbar.Brand href="/"><NavLink to="/"><img src={image} alt="BiciMundo" width="100" /></NavLink></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav d-flex">
        <Nav className='header-container'>
          <Container>
          <Row>
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
          <Row>
            <Col className='mt-2 d-flex align-items-center'>
              <NavLink to="/" end className={({ isActive }) => (isActive ? active : notActive)}  >
                Home
              </NavLink>
              <NavLink to="/productos" className={({ isActive }) => (isActive ? active : notActive)} >
                Productos
              </NavLink>
            </Col>
            <Col className='right-links-container mt-2'>
              {
                userState.firstName ?
                  <>
                    <DropdownButton
                      id="nav-dropdown-dark-example"
                      align="end"
                      title={userState.firstName}
                      className='user-dropdown px-1 py-0 m-0'
                      variant="dark"
                    >
                      <Dropdown.Item>
                        <NavLink to="/perfil" className="text-decoration-none text-dark">
                          Perfil
                        </NavLink>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <NavLink to="/carrito" className="text-decoration-none text-dark">
                          Carrito
                        </NavLink>
                      </Dropdown.Item>
                      { userState.roleId === 1 ? 
                        <Dropdown.Item>
                          <NavLink to="/productos/crear" className="text-decoration-none text-dark">
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
                    <NavLink to="/carrito" className={({ isActive }) => `fs-4 d-flex align-items-center justify-content-center ${(isActive ? active : notActive)}`} >
                      <FaShoppingCart className='w-auto h-50 align-self-center'/>
                    </NavLink>
                  </>
                  :
                  <>
                    <NavLink to="/registro" className={({ isActive }) => (isActive ? active : notActive)} >
                      Registro
                    </NavLink>
                    <NavLink to="/ingresar" className={({ isActive }) => (isActive ? active : notActive)} >
                      Ingresar
                    </NavLink>
                  </>
              }
            </Col>
          </Row>
          </Container>
        </Nav>
      </Navbar.Collapse>

    </Navbar >
  );
}
export default Header;