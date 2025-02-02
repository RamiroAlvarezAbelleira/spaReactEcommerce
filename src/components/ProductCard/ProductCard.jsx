import { Card, Button, Col, Row, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {MdAddShoppingCart} from 'react-icons/md'
import axios from '../../api/axios';
import './ProductCard.css'
import { useEffect, useState } from 'react';
import { firstCartItem, addCartItem } from '../../redux/states/cart';

function ProductCard(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [price, setPrice] = useState(null)
  const [oldPrice, setOldPrice] = useState(null)
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  useEffect(() => {
    if (props.discount && props.discount > 0) {
        setPrice(toThousand(Math.round((Number(props.price) / 100) * (100 - Number(props.discount)))))
        setOldPrice(toThousand(+props.price))
    } else {
      setPrice(toThousand(+props.price))
    }
  },[props])

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
      let response = await axios.post(`/carrito/agregar`, item)
        if (response.status === 201 && cart?.length === 0 ) {
          dispatch(firstCartItem({...response.data.data}))
        } else if (response.status === 201) {
          dispatch(addCartItem({...response.data.data}))
        }
        console.log(response)
    } else {
      navigate('/ingresar', {state: { productId: props.id }})
    }
    
  }

  return (
    <Col className='d-flex flex-column align-items-between product-col'>
      <Link to={`/productos/detalle/${props.id}`} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} className='text-decoration-none text-dark my-5 h-100 product-card'>
        <Card className='shadow h-100'>
          <div className='image-container' style={{backgroundImage: `url(https://apiecommerce-development.up.railway.app${props.images})`}}>
          </div>
          <Card.Body className='d-flex flex-column justify-content-center'>
            <Row className={`price-container justify-content-between ${show ? 'active' : ''}`}>
              {
                oldPrice ? 
                <>
                  <Col className='px-0 w-fit-cont'>
                    <Card.Text className='fs-5 text-dark w-fit-cont'>
                      $ {price}
                    </Card.Text>
                  </Col>
                  {
                    show ?
                    <Col className='px-0 w-fit-cont'>
                      <Card.Text className='w-fit-cont product-card-old-price'>
                        $ {oldPrice}
                      </Card.Text>
                    </Col>
                    :

                    <></>

                  }
                  
                  <Col className='px-0 w-fit-cont product-card-old-price-mobile'>
                    <Card.Text className='w-fit-cont product-card-old-price-mobile'>
                      $ {oldPrice}
                    </Card.Text>
                  </Col>
                </>

                :
                <Col className='px-0 w-fit-cont'>
                  <Card.Text className='fs-5 text-dark w-fit-cont'>
                    $ {price}
                  </Card.Text>
                </Col>
              }
              {
                cart.filter(cartItem => cartItem.productId === props.id).length > 0 ? 
                <Col className='px-0 added-product w-fit-cont'>
                  <Badge bg='success' className='added-product-badge'>Agregado!</Badge>
                </Col> :
                <Col className='px-0 w-fit-cont'>
                  <MdAddShoppingCart className='fs-5 add-to-cart' onClick={(e) => handleCartAdd(e, props.id)}/>
                </Col>
              }
            </Row>
            <Row className={show ? 'description active' : 'description'}>
            {
              show ? 
              
              
                <Card.Text>{props.description}</Card.Text>
              
              :
              <></>
            }
            </Row>
            <Row className={'description-mobile'}>
              <Card.Text>{props.description}</Card.Text>
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