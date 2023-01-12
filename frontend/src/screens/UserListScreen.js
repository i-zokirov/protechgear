import React, {useEffect} from 'react'
import {LinkContainer} from "react-router-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'

import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({history}) => {
    const dispatch = useDispatch()
    const {loading, users, error} = useSelector(state => state.usersList)
    const { userInfo } = useSelector(state => state.userLogin)
    const {success:successDelete} = useSelector(state => state.userDelete)

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            history.push('/login')
        }    
    }, [dispatch, history, userInfo, successDelete])
    
    const deleteAccountHandler = (userId)=>{
        if(window.confirm('Are you sure you want to delete this account?')){
            dispatch(deleteUser(userId))
        }
    }
    return (
        <React.Fragment>
            <h1>Users</h1>
            {
                loading ? <Loader/>
                : error ? <Message variant='danger'>{error}</Message>
                : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                               <th>ID</th> 
                               <th>Name</th> 
                               <th>Email</th> 
                               <th>Account type</th> 
                               <th></th> 
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                    <td>{user.isAdmin ? 'Admin' : 'Customer'}</td>
                                    <td>
                                        <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button variant='danger' className='btn-sm' onClick={() => deleteAccountHandler(user._id)}>
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

export default UserListScreen
