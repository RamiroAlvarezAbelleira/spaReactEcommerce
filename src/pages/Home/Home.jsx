import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { HomeCarousel } from '../../components/HomeCarousel'
import { ProductCard } from '../../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let url = 'http://localhost:3000/productos/destacados'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
            })

    }, [])

    return (
        <div className='mx-0 px-0'>
            <HomeCarousel />
            <Container className='mt-5'>
                <h1 className='bg-dark text-light text-center'>Destacados</h1>
            </Container>
            <Row className='mx-5 px-0'>
                {
                    products.map((product, i) => {
                        return <ProductCard {...product} key={i} />
                    })
                }
            </Row>
        </div>
    )
}

export default Home