import React, {useState} from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {  Form, Button } from 'react-bootstrap'

import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = ({history}) => {
    console.log(history)
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payments')
    }


    return (
        <React.Fragment>
            <Link to="/"><i className="fas fa-arrow-left"></i> Go back</Link>
            
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>

                <Form onSubmit={(e)=> submitHandler(e)}>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a postal code'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a country'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    
                    <Button type='submit' variant='primary'>
                        Continue
                    </Button>
                
                </Form>
            </FormContainer>
        </React.Fragment>
    )
}

export default ShippingScreen
