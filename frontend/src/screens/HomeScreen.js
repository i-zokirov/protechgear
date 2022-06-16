import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProductsList } from '../actions/productActions'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber

    const dispatch = useDispatch({match})

    const productList = useSelector(state=> state.productList)
    const {loading, error, products, page, pages} = productList

    useEffect(()=>{
        dispatch(fetchProductsList(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    
    return (
        <React.Fragment>
            <Meta/>
            {!keyword && <ProductCarousel/>}
            <h1>Latest Products</h1>
            {
            loading ? <Loader/> 
            : error ? <Message variant="danger">{error}</Message> 
            : (
                <>
                <Row>
                    {products.map((product) => (
                        <Col className='align-items-stretch d-flex' key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product  product={product} />
                        </Col>
                    ))}
                </Row>
                
                <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}  />
                </>
            )
            }     
        </React.Fragment>
    )
}

export default HomeScreen
