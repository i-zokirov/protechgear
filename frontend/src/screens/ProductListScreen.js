import React, {useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button, Row, Col } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'

import { deleteProduct, fetchProductsList, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const {loading, products, error} = useSelector(state => state.productList)
    const { userInfo } = useSelector(state => state.userLogin)
    
    const {loading:loadingDelete,sucess:successDelete, error:errorDelete} = useSelector(state => state.productDelete)
    const {loading:loadingCreate, success:successCreate, error:errorCreate, product:createdProduct} = useSelector(state => state.productCreate)
    
    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESET})
        
        if(!userInfo.isAdmin){
            history.push('/login')
        } 
        
        if(successCreate){
            history.push(`/admin/products/${createdProduct._id}/edit`)
        } else {
            dispatch(fetchProductsList())
        }
        
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct])
    
    const deleteProductHandler = (productId)=>{
        // dipatch delete product by id
        if(window.confirm('Are you sure you want to delete this product?')){
            dispatch(deleteProduct(productId))
        }
    }

    const createProductHandler = ()=> {
        dispatch(createProduct())
    }
    return (
        <React.Fragment>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Add new
                    </Button>
                </Col>

            </Row>
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {
                loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                               <th>ID</th> 
                               <th>Name</th> 
                               <th>Price</th> 
                               <th>Category</th> 
                               <th>Brand</th>
                               <th>Stock count</th>
                               <th></th> 
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.countInStock > 0 ? product.countInStock : 'out of stock'}</td>
                                    <td>
                                        <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }
        </React.Fragment>
    )
}

export default ProductListScreen
