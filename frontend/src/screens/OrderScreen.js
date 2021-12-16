import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { PayPalButton } from "react-paypal-button-v2";

import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails, payOrder, makeOrderDelivered } from '../actions/orderActions'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants'


const PlaceOrderScreen = ({match, history}) => {
    const orderId = match.params.orderId
    const dispatch = useDispatch()
    
    // componentlevel state for checking sdk script
    const [sdkReady, setSdkReady] = useState(false)
    // get payment details from state
    const { loading:loadingPay, success:successPay } = useSelector(state => state.orderPay)
    // get order details from state
    const { order, loading, error } = useSelector(state => state.orderDetails)
    
    const {userInfo} = useSelector(state => state.userLogin)
    const {success:successDeliver ,loading:loadingDeliver, error:errorDeliver} = useSelector(state => state.orderDeliver)
    
    // if content is not loading or there is no error with fetching order, dynamically calculate the itemsprice
    if(!loading && !error){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    useEffect(()=>{
        // dynamically adding paypal SDK script to the DOM
        const addPayPalScript = async ()=> {
            const {data: clientId} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!userInfo){
            history.push('/login')
        } else if (userInfo && userInfo.isAdmin){
            history.push(`/admin/orders/${orderId}`) 
        }

        
        // dispatch action to fetch order details based on order Id from params
        if(!order || order._id !== orderId || successPay || successDeliver){
            dispatch({type: ORDER_DELIVER_RESET})
            // Resetting order pay in order to exit the infinite loop on successful payment
            dispatch({type: ORDER_PAY_RESET})
            // dispatching action to get order details
            dispatch(getOrderDetails(orderId))
        } else if(!order.isPaid){
            // injecting paypal script if order is not paid
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, order, successPay, userInfo, history, successDeliver])

    const successPaymentHandler = (paymentResult)=>{
        // dispatch action for payOrder and update the order record 
        dispatch(payOrder(orderId, paymentResult))
    }


    const markOrderDeliveredHandler = ()=>{
        dispatch(makeOrderDelivered(orderId))
    }

    return loading ? <Loader/> 
    : error ? (
        <>
        <Link to="/" className="btn btn-light my-3"><i className="fas fa-arrow-left"></i> Home page</Link>
        <Message variant="danger">{error}</Message>
        </>
    )
    : <React.Fragment>
        <h1>Order - {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>{order.user.name}
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <Message variant='success'>Delivered on {order.deliveredOn}</Message>
                        ) : (
                            <Message variant='danger'>Not Delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant='success'>Paid on {order.paidOn}</Message>
                        ) : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order items</h2>
                        {
                        order.orderItems.length === 0 ?
                        <Message variant='info'>Order is empty</Message> :
                        (
                            <ListGroup variant="flush">
                                {
                                    order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} x {item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        )
                        }
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Price summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col><strong>Total</strong></Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {userInfo && !order.isPaid && !userInfo.isAdmin && (
                            <ListGroup.Item>
                                {loadingPay && <Loader/>}
                                {!sdkReady ? (
                                    <Loader/>
                                ) : (
                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                )}
                            </ListGroup.Item>
                        )}

                        {userInfo && !order.isDelivered && order.isPaid && userInfo.isAdmin && (
                            <ListGroup.Item>
                                {loadingDeliver && <Loader/>}
                                {errorDeliver && <Message>{errorDeliver}</Message>}
                                <Button type="button" className='btn-block' onClick={markOrderDeliveredHandler}>
                                    Mark as Delivered
                                </Button> 
                            </ListGroup.Item>
                        )}
                       
                    </ListGroup>
                </Card>
            </Col>
        </Row>
</React.Fragment>
}

export default PlaceOrderScreen
