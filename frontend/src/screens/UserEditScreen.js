import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import FormContainer from "../components/FormContainer"
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from "../actions/userActions"
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({match, history}) => {
    const userId = match.params.userId
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const {loading:loadingOnUpdate, error:errorOnUpdate, success:successOnUpdate} = userUpdate

    useEffect(() => {
       if(successOnUpdate){
           dispatch({type: USER_UPDATE_RESET})
           history.push('/admin/users')
       } else {
        if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
       } 
       
    }, [user, userId, dispatch, successOnUpdate, history])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(updateUser({_id: userId, name, email, isAdmin}))
    }

    return (
        <React.Fragment>
            <Link to="/admin/users" className="btn btn-light my-3"><i className="fas fa-arrow-left"></i> Go back</Link>
            
            <FormContainer>
                <h1>Edit user</h1>
                {loadingOnUpdate && <Loader/>}
                {errorOnUpdate && <Message variant='danger'>{errorOnUpdate}</Message>}
                {
                    loading ? <Loader/>
                    : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>
                
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                type='text'
                                placeholder='Enter a name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                        
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                type='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isAdmin'>
                                <Form.Label>Admin account</Form.Label>
                                <Form.Check
                                type='checkbox'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                            </Form.Group>

                            <Button className='btn-mt-20' type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )
                }
        </FormContainer>
      </React.Fragment>
    )
}

export default UserEditScreen
