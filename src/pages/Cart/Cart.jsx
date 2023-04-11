import { useSelector } from "react-redux"
import axios from "../../api/axios";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

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
    const handleDelete = async (e, id) => {
        e.preventDefault()

        let response = await axios.delete(`/carrito/eliminar/${id}`)

        if (response.status === 200) {
            setDeleted(true)
        }
    }

  return ( items &&
    <div>{items.map((item) => {
        return (<Row>
            <Col>{item.product.description}</Col>
            <Col>precio: ${item.product.price}</Col>
            <Col>descuento: {item.product.discount} %</Col>
            <Col>cantidad: {item.quantity}</Col>
            <Col><Button onClick={(e) => handleDelete(e, item.id)}>Eliminar</Button></Col>
        </Row>)
    })}
    </div>
  )
}
export default Cart