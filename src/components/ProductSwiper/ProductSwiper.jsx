import { Navigation, Scrollbar, A11y } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {MdAddShoppingCart} from 'react-icons/md'
import { Badge, Card, Col, Row } from 'react-bootstrap';
import axios from '../../api/axios';

// Import Swiper styles
import './ProductSwiper.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { firstCartItem, addCartItem } from '../../redux/states/cart';



const ProductSwiper = ({products, perView}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState()
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  const handleCartAdd = async (e, productId) => {
      e.preventDefault()
      if (user.id !== 0) {
        let item = {
          productId: productId,
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
        navigate('/ingresar', {state: {productId: productId}})
      }
    }
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Scrollbar, A11y]}
      breakpoints={{
        576: {
          slidesPerView: perView?.sm,
        },
        1200: {
          slidesPerView: perView?.md,
        },
        1400: {
          slidesPerView: perView?.lg,
        },
      }}
      spaceBetween={0}
      navigation={{ clickable: true }}
      // scrollbar
      className='m-0'
    >
    <div>
    {products.map((product, i) => {
        return (
            <SwiperSlide className='py-5 product-slide' key={i}>
                <Link to={`/productos/detalle/${product.id}`} onMouseEnter={() => setShow(product.id)} onMouseLeave={() => setShow(false)} className='text-decoration-none text-dark h-100 product-card'>
                    <Card className='shadow mx-3 h-100'>
                        <div className='image-container' style={{backgroundImage: `url(https://apiecommerce-development.up.railway.app${product.images})`}}>
                        </div>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                            <Row className={show === product.id ? 'price-container justify-content-center active' : 'price-container justify-content-center'}>
                            <Col sm={9}>
                                <Card.Text className='fs-5 text-dark'>
                                $ {toThousand(product.price)}
                                </Card.Text>
                            </Col>
                            {
                              cart.filter(cartItem => cartItem.productId === product.id).length > 0 ? 
                              <Col sm={3} className='added-product'>
                                <Badge bg='success' className='added-product-badge'>Agregado!</Badge>
                              </Col> :
                              <Col sm={3}>
                                <MdAddShoppingCart className='fs-5 add-to-cart' onClick={(e) => handleCartAdd(e, product.id)}/>
                              </Col>
                            }
                            
                            </Row>
                            <Row className={show === product.id ? 'description active' : 'description'}>
                            {
                            show === product.id ? 
                            
                            
                                <Card.Text>{product.description}</Card.Text>
                            
                            :
                            <></>
                            }
                            </Row>
                        </Card.Body>
                    </Card>
                </Link>
            </SwiperSlide>
        )
    })}
    </div>
    </Swiper>
  )
}
export default ProductSwiper