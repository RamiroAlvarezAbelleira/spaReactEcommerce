import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { ProductCard } from '../../components/ProductCard'

const Productos = () => {
    const { state } = useLocation()

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const handleState = async () => {
            let url;
            setLoading(true)
            if (state?.keyword !== undefined) {
                url = `https://bicimundo.up.railway.app/productos?search=${state.keyword}`
            } else {
                url = 'https://bicimundo.up.railway.app/productos'
            }
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    setProducts(data.data)
                })
            setLoading(false)
        }

        handleState()

    }, [state])

    return (
        <div className='mx-0 px-0 mt-5'>
            <Container className='mt-5'>
                <h1 className='bg-dark text-light text-center'>Listado de productos</h1>
            </Container>
            <Row className='mx-5 px-0'>
                {loading ?
                    <div className='w-100 d-flex justify-content-center my-5'>
                        <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                    </div>

                    :

                    products.map((product, i) => {
                        return <ProductCard {...product} key={i} />
                    })
                }
            </Row>
        </div>
    )
}

export default Productos