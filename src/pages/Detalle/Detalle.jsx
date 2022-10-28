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
        <Container className='mx-auto my-5 '>
            <Row>
                <Col>
                    <img
                        className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                        style={{ width: 40 + "rem" }}
                        src={`http://localhost:3000${product.images}`}
                        alt={product.category}
                    />
                </Col>
                <Col className='d-flex flex-column justify-content-between align-items-end'>
                    <h1 className='text-end'>{product.description}</h1>
                    <h2 className=''>$ { discountPrice ? discountPrice : price }</h2>
                    {product.discount > 0 && <h3 className='mb-5'>{product.discount} %</h3>}
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