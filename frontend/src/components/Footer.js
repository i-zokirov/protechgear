import React from "react";

import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; ProTechGear 2022 <br />
                        Made with &hearts; by{" "}
                        <a href="https://github.com/i-zokirov">i-zokirov</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
