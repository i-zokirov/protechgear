import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import { useDispatch, useSelector } from 'react-redux'
import { dismissNotification } from '../actions/notificationActions';

const Notification = () => {

    const notification = useSelector(state => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {}, [notification])
    const handleClose = () => {
        dispatch(dismissNotification())
    }

    if(notification.message){
        return (
            <Alert variant={notification.type} onClose={handleClose} dismissible>
                <Alert.Heading>{notification.heading} </Alert.Heading>
                <p>{notification.message}</p>
            </Alert>
        )
    }
    return <div></div>
  
}

export default Notification