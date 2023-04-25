import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'
import axios from '../../api/axios';
import './Detalle.css'
import { ProductSwiper } from '../../components/ProductSwiper';
import credito from '../../assets/images/tarjetas-de-credito.png'
import debito from '../../assets/images/tarjetas-de-debito.png'
import efectivo from '../../assets/images/efectivo.jpeg'

function Detalle() {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let { id } = useParams()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false);
    const [onSale, setOnSale] = useState([]);

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
                                <p className='description-text mt-5'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit sit libero non similique, vel saepe nostrum nam sint, veniam id doloribus omnis. Nihil nemo amet porro id vitae magnam quia, architecto quisquam pariatur cupiditate, accusantium beatae animi, dolor laborum! Error veritatis mollitia repudiandae nulla aperiam soluta corrupti aliquam iusto minus. Culpa nostrum voluptatum, illum, quo excepturi voluptas facilis est fuga provident soluta veniam atque sequi nisi delectus sed. Fugiat sequi at commodi incidunt sunt eveniet sit doloribus blanditiis nihil soluta adipisci dolore, error et ipsum ab omnis cumque, dolorem praesentium dolores laborum vero officia vel enim sed? Minus voluptatibus repudiandae id atque maiores ad ratione, cupiditate ullam explicabo voluptate incidunt cumque cum animi, saepe totam reiciendis accusamus corporis vel magni. Quibusdam aut tempora accusantium obcaecati veritatis labore maiores consectetur rem possimus amet iusto quas recusandae animi ut perspiciatis sit dignissimos officiis vel atque totam porro debitis eius, molestias itaque. Error, nihil vel dolor ex fugit hic placeat aperiam vero maiores. Beatae, deserunt rem, nam aperiam sapiente perferendis dolorem perspiciatis sunt fuga, eaque hic adipisci voluptate quisquam? Accusamus ipsum, quisquam perferendis saepe neque excepturi dicta eligendi nulla quod ab iure id voluptatem dolore explicabo assumenda, non perspiciatis. Provident quidem nemo nesciunt!</p>
                            </div>
                        </Col>
                        <Col sm={{ span: 3 }} className='p-0 payment-col'>
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
                                <Button variant='dark' className='detail-add-to-cart my-5'>Agregar al carrito</Button>
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