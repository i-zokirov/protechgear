import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductsList } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state=> state.productList)
    const {loading, error, products} = productList

    useEffect(()=>{
        dispatch(fetchProductsList())
    }, [dispatch])

    const renderProducts = (products)=>{
        return (
            <Row>
                {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        )
    }
    return (
        <React.Fragment>
            <h1>Latest Products</h1>
            {
            loading ? <Loader/> 
            : error ? <Message variant="danger">{error}</Message> 
            : renderProducts(products)
            }     
        </React.Fragment>
    )
}

export default HomeScreen
