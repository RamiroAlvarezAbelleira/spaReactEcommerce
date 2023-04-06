import { Card, Button, Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

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

  return (
    <Col md={{ span: 6 }} lg={{ span: 4 }} xl={{ span: 3 }} xxl={{ span: 2 }} className='d-flex flex-column align-items-stretch'>
      <Card className='shadow my-5 h-100'>
        {/* <Card.Img variant="top" src={`https://bicimundo.up.railway.app${props.images}`} /> */}
        {props.images && <Card.Img variant="top" src={`http://localhost:3000${props.images}`} />}
        <Card.Body className='d-flex flex-column justify-content-end'>
          <Card.Title >{props.description}</Card.Title>
          <Container className='w-100'>
            <Card.Text >
              $ {toThousand(props.price)}
            </Card.Text>
            <Link to={`/productos/detalle/${props.id}`}><Button className='w-100' variant="dark">Detalle</Button></Link>
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
    </Col>
  );
}

export default ProductCard;