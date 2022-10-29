import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Detalle() {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let { id } = useParams()

    const [product, setProduct] = useState({})

    useEffect(() => {
        let url = `http://localhost:3000/productos/detalle/${id}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProduct(data.data)
            })
    }, [id])
    let discountPrice;
    if (product.discount > 0) {
        discountPrice = Math.round((product.price / 100) * (100 - product.discount));
        discountPrice = toThousand(discountPrice)
    }
    let price = toThousand(+product.price)
    return (
        <Container className='mx-auto my-5 p-4 bg-white border rounded-1'>
            <Row>
                <Col md={{ span: 7}} className='border-bottom border-dark'>
                    <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: 40 + "rem" }}
                        src={`http://localhost:3000${product.images}`}
                        alt={product.category}
                    />
                </Col>
                <Col md={{ span: 4, offset: 1}} className='p-4 d-flex flex-column justify-content-between align-items-end border rounded-1'>
                    <h1 className='text-start fs-4 mx-auto text-dark'>{product.description}</h1>
                    { discountPrice && <h4 className='text-decoration-line-through fs-5'>$ {price}</h4>}
                    {product.discount > 0 && <h3 className='fs-5'>Con un {product.discount}% de descuento</h3>}
                    <h2 className='fs-4 text-dark'>$ { discountPrice ? discountPrice : price }</h2>
                    <Button variant='dark' className='w-50'>Agregar al carrito</Button>
                </Col>
            </Row>
            <Row>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Detalle;