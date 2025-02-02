import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { ProductCard } from '../../components/ProductCard'
import axios from '../../api/axios'

const Productos = () => {
    const { state } = useLocation()

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        const handleState = async () => {
            let url;
            setLoading(true)
            if (state?.keyword !== undefined) {
                url = `/productos?search=${state.keyword}`
            } else {
                url = '/productos'
            }
            let response = await axios.get(url)
            setProducts(response.data.data)
            setLoading(false)
        }

        handleState()

    }, [state, deleted])

    return (
        <div className='mx-0 px-0'>
            <Container className='products-container pt-5'>
                <Row className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Listado de productos</h1>
                </Row>
                <Row className='mx-5 px-0 justify-content-center'>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :

                        products.map((product, i) => {
                            return <ProductCard {...product} setDeleted={setDeleted} key={i} />
                        })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Productos