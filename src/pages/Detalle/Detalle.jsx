import { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners'

function Detalle() {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let { id } = useParams()

    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        const detailFetch = async () => {
            setLoading(true)
            let url = `https://bicimundo.up.railway.app/productos/detalle/${id}`
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setProduct(data.data)
                })
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
                <Container className='mx-auto my-5 p-4 bg-white border rounded-1'>
                <Row>
                    <Col md={{ span: 7 }}>
                        <img
                            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                            style={{ width: 40 + "rem" }}
                            src={`https://bicimundo.up.railway.app${product.images}`}
                            alt={product.category}
                        />
                    </Col>
                    <Col md={{ span: 4, offset: 1 }} className='p-4 d-flex flex-column justify-content-between align-items-end border rounded-1'>
                        <h1 className='text-start fs-4 mx-auto text-dark'>{product.description}</h1>
                        {discountPrice && <h4 className='text-decoration-line-through fs-5'>$ {price}</h4>}
                        {product.discount > 0 && <h3 className='fs-5'>Con un {product.discount}% de descuento</h3>}
                        <h2 className='fs-4 text-dark'>$ {discountPrice ? discountPrice : price}</h2>
                        <Button variant='dark' className='w-50'>Agregar al carrito</Button>
                    </Col>
                    <Col md={{ span: 6, offset: 1 }} className='mt-5 border rounded-1 bg-gray-200'>
                        <h3 className='border-bottom border-white'>Especificaciones</h3>
                        {product.category && <p className='border-bottom border-light'>Categoria: {product.category}</p>}
                        {product.brand && <p className='border-bottom border-light'>Marca: {product.brand}</p>}
                        {product.model && <p className='border-bottom border-light'>Modelo: {product.model}</p>}
                        {product.size && <p className='border-bottom border-light'>Talle: {product.size}</p>}
                        {product.color && <p className='border-bottom border-light'>Color: {product.color}</p>}
                        {product.frame && <p className='border-bottom border-light'>Cuadro: {product.frame}</p>}
                        {product.wheelSize && <p className='border-bottom border-light'>Rodado: {product.wheelSize}</p>}
                        {product.shift && <p className='border-bottom border-light'>Cambios: {product.shift}</p>}
                        {product.brake && <p className='border-bottom border-light'>Frenos: {product.brake}</p>}
                        {product.suspension && <p className='border-bottom border-light'>Suspencion: {product.suspension}</p>}
                    </Col>
                </Row>
                </Container>
            }
        
        </div>

    );
}

export default Detalle;