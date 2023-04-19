import { Navigation, Scrollbar, A11y } from 'swiper';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {MdAddShoppingCart} from 'react-icons/md'
import { Card, Col, Row } from 'react-bootstrap';
import axios from '../../api/axios';

// Import Swiper styles
import './ProductSwiper.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const ProductSwiper = ({products}) => {
    const [show, setShow] = useState()
    const user = useSelector(state => state.user);
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const handleCartAdd = async (e, productId) => {
        e.preventDefault()
        let item = {
          productId: productId,
          quantity: 1,
          userId: user.id
        }
        let response = await axios.post(`/carrito/agregar`, item)
      }
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Scrollbar, A11y]}
      breakpoints={{
        576: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1400: {
          slidesPerView: 4,
        },
      }}
      spaceBetween={0}
      navigation={{ clickable: true }}
      scrollbar
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
                            <Col sm={3}>
                                <MdAddShoppingCart className='fs-5 add-to-cart' onClick={(e) => handleCartAdd(e, product.id)}/>
                            </Col>
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