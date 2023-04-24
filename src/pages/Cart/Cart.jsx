import { useSelector } from "react-redux"
import axios from "../../api/axios";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BsCheckLg} from 'react-icons/bs'
import {MdOutlineClose} from 'react-icons/md'
import './Cart.css'

const Cart = () => {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const user = useSelector(state => state.user);
    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
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
                setTotalPrice(response.data.totalPrice)
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

  return (
    <div>
        <Row className="profile-banner d-flex justify-content-center">
            <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Mi Carrito</h1>
        </Row>
        <Container className="px-0 cart-details">
            {
                items?.length > 0 ? 
                (<>
                    {items.map((item) => {
                    return (
                        <Row className="cart-row" key={item.id}>
                            <Col sm={5} className="d-flex justify-content-center align-items-center">{item.product.description}</Col>
                            <Col sm={2} className="d-flex justify-content-around align-items-center quantity-container">
                                <input 
                                    type="number" 
                                    defaultValue={item.quantity} 
                                    id={item.id}
                                    onChange={handleEditingConfirmation}
                                    className="w-25 text-center"/>
                                { editing.itemId === item.id ? 
                                    <div className="confirm-edit-container">
                                        <div className="confirm-edit-button">
                                            <BsCheckLg onClick={() => handleEditionConfirmed(item.id)}/>
                                        </div>
                                        <div className="cancel-edit-button">
                                            <MdOutlineClose id={0} onClick={handleEditingConfirmation}/>
                                        </div>
                                        
                                        
                                    </div>
                                    :
                                    <></>
                                }
                            </Col>
                            {item.product.discount > 0 ? 
                                <Col className="d-flex flex-column justify-content-center align-items-center" sm={3}>
                                    <p className="old-price">${toThousand(item.product.price)}</p>
                                    <p className="price">${toThousand(Math.round((item.product.price / 100) * (100 - item.product.discount)) * item.quantity)}</p>
                                </Col>
                            :
                                <Col className="d-flex justify-content-center align-items-center" span={3}><p className="price">${toThousand(item.product.price * item.quantity)}</p></Col>
                            }
                            <Col className="d-flex justify-content-center align-items-center" sm={2}>
                                <div className="cart-item-delete d-flex justify-content-center align-items-center">
                                    <RiDeleteBin5Line onClick={(e) => handleDelete(e, item.id)}/>
                                </div>
                            </Col>
                        </Row>
                    )
                    })}
                    <Row className="p-5 justify-content-end">
                        <Col sm={3} className="d-flex align-items-center">
                            <h2 className="text-end m-0">Precio total -</h2>
                        </Col>
                        <Col sm={2} className="d-flex align-items-center">
                            <h3 className="text-end m-0">${toThousand(totalPrice)}</h3>
                        </Col>
                    </Row>
                    </>
                ) 
                :
                (
                    <h2 className="text-center pt-5">No hay productos en tu carrito</h2>
                )
            }
        </Container>
    </div>
  )
}
export default Cart