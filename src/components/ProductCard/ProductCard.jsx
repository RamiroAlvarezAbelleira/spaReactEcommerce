import { Card, Button, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {MdAddShoppingCart} from 'react-icons/md'
import axios from '../../api/axios';
import './ProductCard.css'
import { useState } from 'react';

function ProductCard(props) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
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
    if (user.id !== 0) {
      let item = {
        productId: props.id,
        quantity: 1,
        userId: user.id
      }
      await axios.post(`/carrito/agregar`, item)
    } else {
      navigate('/ingresar', {state: { productId: props.id }})
    }
    
  }

  return (
    <Col className='d-flex flex-column align-items-between product-col'>
      <Link to={`/productos/detalle/${props.id}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='text-decoration-none text-dark my-5 h-100 product-card'>
        <Card className='shadow h-100'>
          <div className='image-container' style={{backgroundImage: `url(https://apiecommerce-development.up.railway.app${props.images})`}}>
            {/* {props.images && <img className='card-image' src={`https://apiecommerce-development.up.railway.app/${props.images}`} />} */}
          </div>
          <Card.Body className='d-flex flex-column justify-content-center'>
            {/* <Card.Title >{props.description}</Card.Title> */}
            <Row className={show ? 'price-container justify-content-center active' : 'price-container justify-content-center'}>
              <Col sm={9}>
                <Card.Text className='fs-5 text-dark'>
                  $ {toThousand(props.price)}
                </Card.Text>
              </Col>
              <Col sm={3}>
                <MdAddShoppingCart className='fs-5 add-to-cart' onClick={handleCartAdd}/>
              </Col>
            </Row>
            <Row className={show ? 'description active' : 'description'}>
            {
              show ? 
              
              
                <Card.Text>{props.description}</Card.Text>
              
              :
              <></>
            }
            </Row>
            
            {(user?.roleId === 1) &&
              <Row className={show ? 'crud-buttons-container active' : 'crud-buttons-container'}>
                <Col>
                  <Link to={`/productos/editar/${props.id}`}><Button className={show ? 'crud-buttons w-100' : 'w-100'} variant="dark">Editar</Button></Link>
                </Col>
                <Col>
                  <Button className={show ? 'crud-buttons w-100' : 'w-100'} variant="danger" onClick={handleDelete}>Eliminar</Button>
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