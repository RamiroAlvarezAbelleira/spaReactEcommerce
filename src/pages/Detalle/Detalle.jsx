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

    return (
        <Card className="text-center">
            <Card.Header>Featured</Card.Header>
            <Card.Body>
                <Card.Img variant="top" src={`http://localhost:3000${product.images}`} />
                <Card.Title>{product.description}</Card.Title>
                <Card.Text>
                    $ {toThousand(product.price)}
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