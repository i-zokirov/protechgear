import React from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

const NotificationWithActionButton = ({type, heading, message, buttonAction, buttonText, show}) => {

    return (
        <Alert show={show} variant={type}>
            <Alert.Heading>{heading}</Alert.Heading>
                <p>{message}</p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={buttonAction} variant="outline-success">
                        {buttonText}
                    </Button>
                </div>
        </Alert>
    )
}
export default NotificationWithActionButton