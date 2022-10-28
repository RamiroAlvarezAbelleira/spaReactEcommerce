import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Row } from 'react-bootstrap'
import { HomeCarousel } from '../../components/HomeCarousel'
import { ProductCard } from '../../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let url = 'http://localhost:3000/productos'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
                console.log(data.data)
            })
            
    }, [])

  return (
    <div className='mx-0 px-0'>
        <HomeCarousel />
        <Row>
        {
            products.map( ( product, i) => {
                return <ProductCard {...product} key={i} />
            })
        }
        </Row>
    </div>
  )
}

export default Home