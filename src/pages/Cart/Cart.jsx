import { useSelector } from "react-redux"
import axios from "../../api/axios";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import './Cart.css'

const Cart = () => {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const user = useSelector(state => state.user);
    const [items, setItems] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [editing, setEditing] = useState({
        itemId: 0,
        quantity: 1
    });

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
    }, [deleted, editing])

    const handleEditingConfirmation = (e) => {
        let id = Number(e.target.id)
        if (id !== 0 ) {
            setEditing({
            itemId: id,
            quantity: e.target.value
            })
        } else {
            setEditing({
            itemId: id,
            quantity: 1
            })
        }
    }

    const handleEditionConfirmed = async (id) => {
        let updatedItem = {quantity: editing.quantity}
        let response = await axios.put(`/carrito/editar/${id}`, updatedItem)

        if (response.status === 201) {
            setEditing({
                itemId: 0,
                quantity: 1
                })
        }
        console.log(response)
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
                        <th>Cantidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.product.description}</td>
                            {item.product.discount > 0 ? 
                                <td>
                                    ${toThousand(Math.round((item.product.price / 100) * (100 - item.product.discount)))} - {item.product.discount} % de descuento aplicado
                                </td>
                            :
                                <td>${item.product.price}</td>
                            }
                            <td>
                                <input 
                                    type="number" 
                                    defaultValue={item.quantity} 
                                    id={item.id}
                                    onChange={handleEditingConfirmation}/>
                                { editing.itemId === item.id ? 
                                    <>
                                        <Button variant="success" onClick={() => handleEditionConfirmed(item.id)}>+</Button>
                                        <Button variant="danger" id={0} onClick={handleEditingConfirmation}>-</Button>
                                    </>
                                    :
                                    <></>
                                }
                            </td>
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