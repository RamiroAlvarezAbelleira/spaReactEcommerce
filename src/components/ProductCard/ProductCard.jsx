import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
          {props.images && <Card.Img variant="top" src={`https://apiecommerce-development.up.railway.app/${props.images}`} />}
          <Card.Body className='d-flex flex-column justify-content-end'>
            <Card.Title >{props.description}</Card.Title>
            <Container className='w-100'>
              <Card.Text >
                $ {toThousand(props.price)}
              </Card.Text>
              <Button onClick={handleCartAdd} className='w-100' variant="dark">Agregar al carrito</Button>
              {(user?.roleId === 1) &&
                <Row>
                  <Col>
                    <Link to={`/productos/editar/${props.id}`}><Button className='w-100' variant="dark">Editar</Button></Link>
                  </Col>
                  <Col>
                    <Button className='w-100' variant="danger" onClick={handleDelete}>Eliminar</Button>
                  </Col>
                </Row>
              }
            </Container>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
}

export default ProductCard;