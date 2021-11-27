import React from 'react'
import { Col, Row } from 'react-bootstrap'

import products from '../products'


const HomeScreen = () => {
    
    
    return (
        <React.Fragment>
            <h1>Latest products</h1>
            <Row>
                {products.map((product)=>(
                    <Col sm={12} md={6} lg={3}>
                        <h3>{product.name}</h3>
                    </Col>
                ))}
            </Row>
        </React.Fragment>
    )
}

export default HomeScreen
