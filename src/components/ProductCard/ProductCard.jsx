import { Card, Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductCard(props) {
  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  return (
    <Col md={{ span: 6 }} lg={{span: 4}} xl={{span: 3}} xxl={{span: 2}}  className='d-flex flex-column align-items-stretch'>
      <Card className='shadow my-5 h-100'>
        {/* <Card.Img variant="top" src={`https://bicimundo.up.railway.app${props.images}`} /> */}
        <Card.Img variant="top" src={`http://localhost:3000${props.images}`} />
        <Card.Body className='d-flex flex-column justify-content-end'>
          <Card.Title >{props.description}</Card.Title>
          <Container className='w-100'>
            <Card.Text >
              $ {toThousand(props.price)}
            </Card.Text>
            <Link to={`/detalle/${props.id}`}><Button className='w-100' variant="dark">Detalle</Button></Link>
          </Container>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;