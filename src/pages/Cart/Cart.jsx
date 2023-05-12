import { useDispatch, useSelector } from "react-redux"
import axios from "../../api/axios";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BiPlus, BiMinus} from 'react-icons/bi'
import './Cart.css'
import { clearCart, removeCartItem, updateCartItem } from "../../redux/states/cart";

const Cart = () => {
    const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const dispatch = useDispatch()
    const user = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const [items, setItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [confirmed, setConfirmed] = useState(false)
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        const getItems = async () => {
    
            let response = await axios.get(`/carrito/${user.id}`)
            if (response.status === 200) {
                setItems(response.data.data)
                setTotalPrice(response.data.totalPrice)
                setDeleted(false)
                setConfirmed(false)
            } else {
                console.log('no hay productos')
            }
        }
        getItems()
    }, [deleted, confirmed])

    const handleEdition = async (id, item) => {
        let response;
        let updatedItem;
        if (id === 0) {
            updatedItem = {quantity: (Number(item.quantity) - 1)}
            response = await axios.put(`/carrito/editar/${item.id}`, updatedItem)
        } else {
            updatedItem = {quantity: (Number(item.quantity) + 1)}
            response = await axios.put(`/carrito/editar/${item.id}`, updatedItem)
        }
        

        if (response.status === 201) {
            let newCart = []
            cart.forEach(cartItem => {
                if (cartItem.id === item.id) {
                    let newCartItem = {...cartItem, quantity: Number(updatedItem.quantity)}
                    newCart.push(newCartItem)
                } else {
                    newCart.push(cartItem)
                }
            })
            setConfirmed(true);
            dispatch(updateCartItem(newCart))
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault()

        let response = await axios.delete(`/carrito/eliminar/${id}`)

        if (response.status === 200) {
            let newCart = cart.filter(cartItem => cartItem.id !== id)
            dispatch(removeCartItem(newCart))
            // dispatch(clearCart())
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
                                    <p className="w-25 m-0 fs-4 text-center">{item.quantity}</p>
                                    <div className="confirm-edit-container">
                                        <div className="confirm-edit-button">
                                            <BiPlus onClick={() => handleEdition(1, item)}/>
                                        </div>
                                        {
                                            item.quantity > 1 ? 
                                            <div className="cancel-edit-button">
                                                <BiMinus id={0} onClick={() => handleEdition(0, item)}/>
                                            </div>
                                            :
                                            <></>
                                        }
                                    </div>
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