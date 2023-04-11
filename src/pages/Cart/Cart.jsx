import { useSelector } from "react-redux"
import axios from "../../api/axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import './Cart.css'

const Cart = () => {
    const user = useSelector(state => state.user);
    const [items, setItems] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const getItems = async () => {
    
            let response = await axios.get(`/carrito/${user.id}`)
            if (response.status === 200) {
                setItems(response.data.data)
                setDeleted(false)
            } else {
                console.log('no hay productos')
            }
        }

        getItems()
    }, [deleted])

    const handleQuantity = (e) => {
        console.log(e.target.value);
    }

    const handleDelete = async (e, id) => {
        e.preventDefault()

        let response = await axios.delete(`/carrito/eliminar/${id}`)

        if (response.status === 200) {
            setDeleted(true)
        }
    }

  return ( items &&
    <div>
        <Row className="profile-banner d-flex justify-content-center">
            <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Mi Carrito</h1>
        </Row>
        <Container className="px-0 cart-details">
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                    return (
                        <tr>
                            <td>{item.product.description}</td>
                            <td>${item.product.price}</td>
                            <td>{item.product.discount} %</td>
                            <td><input type="number" defaultValue={item.quantity} onClick={handleQuantity}/></td>
                            <td><Button variant="danger" onClick={(e) => handleDelete(e, item.id)}>Eliminar</Button></td>
                        </tr>
                    )
                    })}
                </tbody>
            </Table>
        </Container>
    </div>
  )
}
export default Cart