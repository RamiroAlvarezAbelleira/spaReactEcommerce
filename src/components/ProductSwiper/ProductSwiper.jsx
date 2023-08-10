import { Navigation, Scrollbar, A11y } from 'swiper';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
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
  const [productArr, setProductArr] = useState()
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  
  useEffect(() => {
    let newProducts = []
    let oldPrice
    products.forEach(product => {
      if (product.discount && product.discount > 0) {
        product.price = Math.round((Number(product.price) / 100) * (100 - Number(product.discount)))
        oldPrice = product.price
        newProducts.push({...product, oldPrice})
      } else {
        newProducts.push({...product})
      }
    })
    setProductArr(newProducts)
  },[products])

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
        636: {
          slidesPerView: perView?.sm,
        },
        1400: {
          slidesPerView: perView?.md,
        },
        1900: {
          slidesPerView: perView?.lg,
        },
      }}
      spaceBetween={0}
      navigation={{ clickable: true }}
      // scrollbar
      className='m-0'
    >
    <div>
    {productArr && productArr.map((product, i) => {
        return (
            <SwiperSlide className='py-5 product-slide' key={i}>
                <Link to={`/productos/detalle/${product.id}`} onMouseEnter={() => setShow(product.id)} onMouseLeave={() => setShow(false)} className='text-decoration-none text-dark h-100 product-card'>
                    <Card className='shadow mx-auto h-100 swiper-card'>
                        <div className='image-container' style={{backgroundImage: `url(https://apiecommerce-development.up.railway.app${product.images})`}}>
                        </div>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                            <Row className={`price-container justify-content-between ${show === product.id ? 'active' : ''}`}>
                            {
                              product.oldPrice ? 
                              <>
                                <Col className='px-0 w-fit-cont'>
                                  <Card.Text className='fs-5 text-dark w-fit-cont'>
                                    $ {toThousand(product.price)}
                                  </Card.Text>
                                </Col>
                                {
                                  show === product.id ?
                                  <Col className='px-0 w-fit-cont'>
                                    <Card.Text className='w-fit-cont product-card-old-price'>
                                      $ {toThousand(product.oldPrice)}
                                    </Card.Text>
                                  </Col>
                                  :

                                  <></>

                                }
                                
                                <Col className='px-0 w-fit-cont product-card-old-price-mobile'>
                                  <Card.Text className='w-fit-cont product-card-old-price-mobile'>
                                    $ {toThousand(product.oldPrice)}
                                  </Card.Text>
                                </Col>
                              </>

                              :
                              <Col className='px-0 w-fit-cont'>
                                <Card.Text className='fs-5 text-dark w-fit-cont'>
                                  $ {toThousand(product.price)}
                                </Card.Text>
                              </Col>
                            }
                            {
                              cart.filter(cartItem => cartItem.productId === product.id).length > 0 ? 
                              <Col className='px-0 added-product w-fit-cont'>
                                <Badge bg='success' className='added-product-badge'>Agregado!</Badge>
                              </Col> :
                              <Col className='px-0 w-fit-cont'>
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
                            <Row className={'description-mobile'}>
                                <Card.Text>{product.description}</Card.Text>
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