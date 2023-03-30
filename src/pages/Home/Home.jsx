import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { HomeCarousel } from '../../components/HomeCarousel'
import { ProductCard } from '../../components/ProductCard'
import { BeatLoader } from 'react-spinners'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // let url = 'https://bicimundo.up.railway.app/productos/destacados'
        let url = 'http://localhost:3000/productos/'
        setLoading(true)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
            })
        setLoading(false)
    }, [])
console.log(products)
    return (
        <div className='mx-0 px-0'>
            <HomeCarousel />
            <Container className='mt-5'>
                <h1 className='bg-dark text-light text-center'>Destacados</h1>
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

export default Home