import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
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
        console.log(typeof(product.price))
    }
    let price = toThousand(+product.price)
    return (
        <Card className="col-6 mx-auto my-5 px-0 text-center">
            <Card.Header>{product.description}</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={`http://localhost:3000${product.images}`} />
                <Card.Title>$ { discountPrice ? discountPrice : price}</Card.Title>
                <Card.Text>
                    Marca: {product.brand}
                </Card.Text>
                <Card.Text>
                    Descuento: {product.discount} %
                </Card.Text>
                <Button variant="primary">Agregar al carrito</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    );
}

export default Detalle;