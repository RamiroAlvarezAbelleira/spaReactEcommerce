import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {MdAddShoppingCart} from 'react-icons/md'
import axios from '../../api/axios';
import './ProductCard.css'

function ProductCard(props) {
  const user = useSelector(state => state.user);
  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleDelete = async (e) => {
    e.preventDefault()

    let response = await axios.delete(`/productos/eliminar/${props.id}`)

    if (response.status === 200) {
      props.setDeleted(true)
    } else {
      console.log(response)
    }
  }

  const handleCartAdd = async (e) => {
    e.preventDefault()
    let item = {
      productId: props.id,
      quantity: 1,
      userId: user.id
    }
    let response = await axios.post(`/carrito/agregar`, item)
  }

  return (
    <Col md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }} xxl={{ span: 2 }} className='d-flex flex-column align-items-stretch'>
      <Link to={`/productos/detalle/${props.id}`} className='text-decoration-none text-dark my-5 h-100 product-card'>
        <Card className='shadow h-100'>
          <div className='image-container' style={{backgroundImage: `url(https://apiecommerce-development.up.railway.app/${props.images})`}}>
            {/* {props.images && <img className='card-image' src={`https://apiecommerce-development.up.railway.app/${props.images}`} />} */}
          </div>
          <Card.Body className='d-flex flex-column justify-content-center'>
            {/* <Card.Title >{props.description}</Card.Title> */}
            <Row className='align-items-center'>
              <Col sm={9}>
                <Card.Text className='fs-5 text-dark'>
                  $ {toThousand(props.price)}
                </Card.Text>
              </Col>
              <Col sm={3}>
                <MdAddShoppingCart className='fs-5 add-to-cart' onClick={handleCartAdd}/>
              </Col>
            </Row>
              {/* <Button  className='w-100' variant="dark">Agregar al carrito</Button> */}
              {(user?.roleId === 1) &&
                <Row className='mt-2'>
                  <Col>
                    <Link to={`/productos/editar/${props.id}`}><Button className='w-100' variant="dark">Editar</Button></Link>
                  </Col>
                  <Col>
                    <Button className='w-100' variant="danger" onClick={handleDelete}>Eliminar</Button>
                  </Col>
                </Row>
              }
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductCard;