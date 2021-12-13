import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Form, Button, Col } from 'react-bootstrap'

import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentMethodScreen = ({history}) => {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    
    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeOrder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>

            <Form onSubmit={submitHandler}>
                
                <Form.Group>
                    <Form.Label as="legend">
                        Select your Payment Method
                    </Form.Label>

                    <Col>
                        <Form.Check
                        type="radio"
                        label="PayPal or Credit Card"
                        id="PayPal"
                        name="paymentMethod"
                        value="PayPal"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>

                    <Col>
                        <Form.Check
                        type="radio"
                        label="Stripe"
                        id="Stripe"
                        name="paymentMethod"
                        value="PayPal"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>
                
                <Button className='btn-mt-20' type="submit" variant='primary'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
