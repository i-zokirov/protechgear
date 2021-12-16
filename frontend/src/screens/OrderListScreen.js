import React, {useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import {Link } from "react-router-dom"
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrdersList} from '../actions/orderActions'

const OrdersListScreen = ({history}) => {
    const dispatch = useDispatch()
    const {loading, orders, error} = useSelector(state => state.ordersList)
    const { userInfo } = useSelector(state => state.userLogin)


    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(getOrdersList())
        } else {
            history.push('/login')
        }    
    }, [dispatch, history, userInfo, ])
    
    return (
        <React.Fragment>
            <h1>Orders</h1>
            {
                loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                               <th>Order ID</th> 
                               <th>Customer name</th> 
                               <th>Total price</th> 
                               <th>Ordered date</th> 
                               <th>Payment status</th> 
                               <th>Delivery status</th> 
                               <th></th> 
                            </tr>
                        </thead>
                        <tbody>
                            {orders.reverse().map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        <Link to={`/admin/users/${order.user._id}/edit`}>
                                            {order.user.name}
                                        </Link>
                                    </td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.createdAt.substring(0, 10) }</td>
                                    <td>{order.isPaid ? order.paidOn.substring(0, 10) : 'Not Paid'}</td>
                                    <td>{order.isDelivered ? order.deliveredOn.substring(0, 10)  : 'Not Delivered'}</td>
                                    <td>
                                        <LinkContainer to={`/admin/orders/${order._id}`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
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

export default OrdersListScreen
