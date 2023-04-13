import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { HomeCarousel } from '../../components/HomeCarousel'
import { ProductCard } from '../../components/ProductCard'
import { BeatLoader } from 'react-spinners'
import axios from '../../api/axios'
import './Home.css'

const Home = ({active = true}) => {
    const [onSale, setOnSale] = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [scroll, setScroll] = useState({
        onSale: false,
        accessories: false,
        bikes: false
    });

    useEffect(() => {
        setLoading(true)
        const productsGet = async () => {
            let onSaleProducts = await axios.get('/productos/destacados');
            setOnSale(onSaleProducts.data.data)

            let accesorios = await axios.get('/productos/accesorios');
            setAccessories(accesorios.data.data)

            let bicicletas = await axios.get('/productos/bicicletas');
            setBikes(bicicletas.data.data)

            return setLoading(false)
        }
        productsGet()
    }, [deleted])
    
    return (
        <div className='mx-0 px-0'>
            <HomeCarousel />
            <Container className='products-container'>
                <Row  className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Ofertas</h1>
                </Row>
                <Row className={`mx-0 px-0 pb-5 products-row ${scroll.onSale ? 'active' : ''}`}>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        onSale.map((product, i) => {
                            return <ProductCard {...product} setDeleted={setDeleted} key={i} />
                        })
                    }
                    
                </Row>
                <Button onClick={() => setScroll({...scroll, onSale: false})}>-</Button>
                <Button onClick={() => setScroll({...scroll, onSale: true})}>+</Button>
                <Row  className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Accesorios</h1>
                </Row>
                <Row className={`mx-0 px-0 pb-5 products-row ${scroll.accessories ? 'active' : ''}`}>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        accessories.map((product, i) => {
                            return <ProductCard {...product} setDeleted={setDeleted} key={i} />
                        })
                    }
                </Row>
                <Button onClick={() => setScroll({...scroll, accessories: false})}>-</Button>
                <Button onClick={() => setScroll({...scroll, accessories: true})}>+</Button>
                <Row  className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Bicicletas</h1>
                </Row>
                <Row className={`mx-0 px-0 products-row ${scroll.bikes ? 'active' : ''}`}>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        bikes.map((product, i) => {
                            return <ProductCard {...product} setDeleted={setDeleted} key={i} />
                        })
                    }
                </Row>
                <Button onClick={() => setScroll({...scroll, bikes: false})}>-</Button>
                <Button onClick={() => setScroll({...scroll, bikes: true})}>+</Button>
            </Container>
        </div>
    )
}

export default Home