import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { HomeCarousel } from '../../components/HomeCarousel'
import { BeatLoader } from 'react-spinners'
import axios from '../../api/axios'
import './Home.css'
import {ProductSwiper} from '../../components/ProductSwiper'

const Home = () => {
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
                <Row className='products-row-container'>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        <ProductSwiper products={onSale} perView={{lg: 4, md:3, sm:2}}/>
                    }
                </Row>

                <Row  className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Accesorios</h1>
                </Row>
                <Row className='products-row-container'>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        <ProductSwiper products={accessories} perView={{lg: 4, md:3, sm:2}}/>
                    }
                </Row>
                <Row  className='pt-5 d-flex justify-content-center'>
                    <h1 className='bg-dark text-light text-center w-50 rounded-pill'>Bicicletas</h1>
                </Row>
                <Row className='products-row-container'>
                    {loading ?
                        <div className='w-100 d-flex justify-content-center my-5'>
                            <BeatLoader className='my-5' color={'#b9b9b9'} loading={loading} size={40} margin={10} />
                        </div>

                        :
                        <ProductSwiper products={bikes} perView={{lg: 4, md:3, sm:2}}/>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Home