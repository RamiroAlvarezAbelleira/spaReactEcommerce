import { Card, Button, Col } from 'react-bootstrap';

function ProductCard(props) {
  return (
    <Col md={{ span: 3}}>
      <Card>
        <Card.Img variant="top" src={`http://localhost:3000${props.images}`} />
        <Card.Body className='d-flex flex-column'>
          <Card.Title>{props.description}</Card.Title>
          <Card.Text>
            $ {props.price}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;