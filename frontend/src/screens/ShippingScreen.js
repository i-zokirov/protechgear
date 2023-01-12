import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {  Form, Button } from 'react-bootstrap'
import {  useFormik  } from 'formik'; 
import * as Yup from 'yup';
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from "../components/FormContainer"
import CheckoutSteps from '../components/CheckoutSteps'


const addressSchema = Yup.object({
  address: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City name is required"),
  postalCode: Yup.string().required("Postal code is required"),
  country: Yup.string().required("Country is required"),
})

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            address: shippingAddress.address,
            city: shippingAddress.city,
            postalCode: shippingAddress.postalCode,
            country: shippingAddress.country,
        },
        validationSchema: addressSchema,
        onSubmit: (values) => {
            dispatch(saveShippingAddress(values)) 
            history.push('/payment')    
        }
    })


    return (
        <React.Fragment>
            <Link to="/"><i className="fas fa-arrow-left"></i> Go back</Link>
            
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h1>Shipping</h1>

                <Form noValidate onSubmit={formik.handleSubmit}>

                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a street name'
                        value={formik.values.address}
                        required
                        onChange={formik.handleChange}
                        isValid={formik.touched.address && !formik.errors.address}
                        isInvalid={!!formik.errors.address}
                        ></Form.Control>
                         <Form.Control.Feedback type="invalid">
                            {formik.errors.address}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a city'
                        value={formik.values.city}
                        required
                        onChange={formik.handleChange}
                        isValid={formik.touched.city && !formik.errors.city}
                        isInvalid={!!formik.errors.city}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.city}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a postal code'
                        value={formik.values.postalCode}
                        required
                        onChange={formik.handleChange}
                        isValid={formik.touched.postalCode && !formik.errors.postalCode}
                        isInvalid={!!formik.errors.postalCode}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.postalCode}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                        type='text'
                        placeholder='Enter a country'
                        value={formik.values.country}
                        required
                        onChange={formik.handleChange}
                        isValid={formik.touched.country && !formik.errors.country}
                        isInvalid={!!formik.errors.country}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.country}
                        </Form.Control.Feedback>
                    </Form.Group>
                    
                    <Button className='btn-mt-20'  type='submit' variant='primary'>
                        Continue
                    </Button>
                
                </Form>
            </FormContainer>
        </React.Fragment>
    )
}

export default ShippingScreen
