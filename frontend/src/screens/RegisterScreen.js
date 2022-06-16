import React, { useEffect} from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Form, Button } from 'react-bootstrap'
import {  useFormik  } from 'formik'; 
import * as Yup from 'yup';
import FormContainer from "../components/FormContainer"
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from "../actions/userActions"
import { pushNotification } from '../actions/notificationActions'

const registerSchema = Yup.object({
    name: Yup.string().min(2, "Name must have at least 2 characters").max(30, "Name must be 30 characters or less").required("Name is required"),
    email: Yup.string().email('Invalid email address').required("Email address is required"),
    password: Yup.string().min(8, "Password must be at least 8 characters long").required("Password is required"),
    confirmPassword: Yup.string().min(8, "Password must be at least 8 characters long").required("You need to enter password again").test("confirmPassword", "Passwords not match", (value, context) => value === context.parent.password),
    terms: Yup.boolean().test("terms", "You must agree to terms and conditions before registering", (value, context ) => value === true)
})


const RegisterScreen = ({location, history}) => {
  
//    const [message, setMessage] = useState(null) 
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
            dispatch(pushNotification({type: "success", heading: `Welcome ${userInfo.name}`, message: "Your account has been successfully registered. We have sent you an email to verify your account. Please click the link from the email to confirm your email address.", autoDismiss: false}))
        }
    }, [userInfo, history, redirect, dispatch])


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false
        },
        validationSchema: registerSchema,
        onSubmit: values => {
           dispatch(register(values))
        }
    })
    

    return (
        <FormContainer>
        <h1>Sign Up</h1>
        {/* {message && <Message variant='danger'>{message}</Message>} */}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

                    <Form  noValidate onSubmit={formik.handleSubmit}>
                    
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            name="name"
                            type='text'
                            placeholder='Enter a name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            required
                            isValid={formik.touched.name && !formik.errors.name}
                            isInvalid={!!formik.errors.name}
                            
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                               {formik.errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                    
                    
                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                            name="email"
                            type='email'
                            placeholder='Enter email'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            isValid={formik.touched.email && !formik.errors.email}
                            isInvalid={!!formik.errors.email}
                            required
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>
            
                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            name="password"
                            type='password'
                            placeholder='Enter password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            isValid={formik.touched.password && !formik.errors.password}
                            isInvalid={!!formik.errors.password}
                            required
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword' className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                            name="confirmPassword"
                            type='password'
                            placeholder='Enter your password again'
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                            isInvalid={!!formik.errors.confirmPassword}
                            required
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Check
                            name="terms"
                            required
                            onChange={formik.handleChange}
                            isInvalid={!!formik.errors.terms}
                            label="Agree to terms and conditions"
                            feedback={formik.errors.terms}
                            feedbackType="invalid"
                            id="terms"
                            />
                        </Form.Group>
            
                        <Button className='btn-mt-20' type='submit' variant='primary'>
                            Register
                        </Button>
                    </Form>
  
        <Row className='py-3'>
            <Col>
                Already have an account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
            </Col>
        </Row>
      </FormContainer>
    )
}

export default RegisterScreen
