import { useEffect, useRef, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'
import axios from '../../api/axios';
import './Detalle.css'
import { ProductSwiper } from '../../components/ProductSwiper';
import credito from '../../assets/images/tarjetas-de-credito.png'
import debito from '../../assets/images/tarjetas-de-debito.png'
import efectivo from '../../assets/images/efectivo.jpeg'
import { useDispatch, useSelector } from 'react-redux';
import { firstCartItem, addCartItem } from '../../redux/states/cart';

function Detalle() {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0)
    const [scrollDirection, setScrollDirection] = useState('down')
    const [onSale, setOnSale] = useState([]);
    const [componentHeight, setComponentHeight] = useState(0);
    const paymentColRef = useRef();
    const [viewHeight, setViewHeight] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            setScrollPosition(currentPosition);
            
            if (currentPosition > scrollPosition) {
                setScrollDirection('down');
            } else if (currentPosition < scrollPosition) {
                setScrollDirection('up');
            }
        }
        const handleResize = () => {
            setViewHeight(window.innerHeight)
        }
        if (viewHeight !== window.innerHeight) {
            handleResize()
        }
        if (paymentColRef.current) {
            setComponentHeight(paymentColRef.current.offsetHeight)
        }
        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    },[scrollPosition, paymentColRef, viewHeight])

    useEffect(() => {


        const detailFetch = async () => {
            setLoading(true)
            let response = await axios.get(`/productos/detalle/${id}`)
            setProduct(response.data.data)
            let onSaleProducts = await axios.get('/productos/destacados');
            setOnSale(onSaleProducts.data.data)
            setLoading(false)
        }

        detailFetch()


    }, [id])

    const handleCartAdd = async (e) => {
        e.preventDefault()
        if (user.id !== 0) {
          let item = {
            productId: product.id,
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
          navigate('/ingresar', {state: { productId: product.id }})
        }
        
      }
    
    let discountPrice;
    if (product.discount && product.discount > 0) {
        discountPrice = Math.round((product.price / 100) * (100 - product.discount));
        discountPrice = toThousand(discountPrice)
    }
    let price = toThousand(+product.price)

    return (
        <div>
        
            {loading ?

                <div className='w-100 d-flex justify-content-center my-5'>
                    <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                </div>

                :
                <Container className='mx-auto my-5 p-4 bg-white border rounded-1 detail-container'>
                    <Row>
                        <Col sm={{ span: 9 }} className='detail-main-container'>
                            <img
                                className="img-fluid p-5 px-sm-4 mt-3 mb-4 border-bottom"
                                style={{ width: 40 + "rem" }}
                                src={`https://apiecommerce-development.up.railway.app${product.images}`}
                                alt={product.category}
                            />
                            <div className='w-100'>
                                <h4 className='mx-5 mt-5 p-5 related-products-title'>Productos que podrian interesarte</h4>
                                <Row className='w-100 related-products-row'>
                                    {loading ?
                                        <div className='w-100 d-flex justify-content-center my-5'>
                                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                                        </div>

                                        :
                                        <ProductSwiper products={onSale} perView={{lg: 3, md:2, sm:1}}/>
                                    }
                                </Row> 
                            </div>
                            <div className='specs-container'>
                                <h4 className='py-5 pl-0 related-products-title'>Especificaciones</h4>
                                <div className='my-5 p-3 w-50 rounded-3 bg-gray-200'>
                                    {product.category && <p className='specs-item'>Categoria: {product.category}</p>}
                                    {product.brand && <p className='specs-item'>Marca: {product.brand}</p>}
                                    {product.model && <p className='specs-item'>Modelo: {product.model}</p>}
                                    {product.size && <p className='specs-item'>Talle: {product.size}</p>}
                                    {product.color && <p className='specs-item'>Color: {product.color}</p>}
                                    {product.frame && <p className='specs-item'>Cuadro: {product.frame}</p>}
                                    {product.wheelSize && <p className='specs-item'>Rodado: {product.wheelSize}</p>}
                                    {product.shift && <p className='specs-item'>Cambios: {product.shift}</p>}
                                    {product.brake && <p className='specs-item'>Frenos: {product.brake}</p>}
                                    {product.suspension && <p className='specs-item'>Suspencion: {product.suspension}</p>}
                                </div>
                            </div>
                            <div className='specs-container'>
                                <h4 className='py-5 pl-0 related-products-title'>Descripcion</h4>
                                <p className='description-text mt-5'>{product.info ? product.info : "Proximamente..."}</p>
                            </div>
                        </Col>
                        <Col sm={{ span: 3 }} ref={paymentColRef} style={scrollDirection === 'up' ? {top: 0} : {top: (viewHeight - componentHeight)}} className={`p-0 payment-col`}>
                            <div className='price-title-container'>
                                <div>
                                    <h1 className='detail-description pb-4'>{product.description}</h1>
                                    {discountPrice && <h4 className='detail-old-price'>$ {price}</h4>}
                                    <h2 className='detail-price'>
                                        $ {discountPrice ? discountPrice : price}
                                        {product.discount > 0 && <span className='detail-discount'> {product.discount}% OFF</span>}
                                    </h2>
                                </div>
                                <div className='mt-4'>
                                    <p className='detail-discount'>Envio gratis!</p>
                                    <p><span className='detail-price'>Stock: </span>22 disponibles</p>
                                </div>
                                {
                                    cart.filter(cartItem => cartItem.productId === product.id).length > 0 ?
                                    <Button variant='success' className='detail-add-to-cart my-5'>Agregado!</Button> :
                                    <Button variant='dark' className='detail-add-to-cart my-5' onClick={(e) => handleCartAdd(e, product.id)}>Agregar al carrito</Button>
                                }
                                <div className='mt-4'>
                                    <p><span className='detail-discount'>Devolución gratis.</span> Tenés 30 días desde que lo recibís.</p>
                                    <p><span className='detail-discount'>Compra Protegida</span>, recibí el producto que esperabas o te devolvemos tu dinero.</p>
                                    <p>12 meses de garantía de fábrica.</p>
                                </div>
                            </div>
                            <div className='price-title-container mt-4'>
                                <h2 className='detail-description pb-4'>Medios de pago</h2>
                                <div className='mt-5'>
                                    <h5 className='pb-3'>Tarjetas de credito.</h5>
                                    <img className='w-100' src={credito} alt='Tarjetas de credito' />
                                </div>
                                <div className='mt-5'>
                                    <h5 className='pb-3'>Tarjetas de debito.</h5>
                                    <img className='w-100' src={debito} alt='Tarjetas de debito' />
                                </div>
                                <div className='mt-5'>
                                    <h5 className='pb-3'>Efectivo.</h5>
                                    <img className='w-50' src={efectivo} alt='Efectivo' />
                                </div>
                            </div>
                        </Col>
                        <Col md={{ span: 6, offset: 1 }} >
                        </Col>
                    </Row>
                </Container>
            }
        
        </div>

    );
}

export default Detalle;