import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";

const loginSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("You need to enter your email address"),
    password: Yup.string().required("You need to enter your password"),
});

const LoginScreen = ({ location, history }) => {
    const redirect = location.search ? location.search.split("=")[1] : "/";
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    const formik = useFormik({
        initialValues: {
            email: "admin@example.com",
            password: "123",
        },
        validationSchema: loginSchema,
        onSubmit: ({ email, password }) => {
            dispatch(login(email, password));
        },
    });

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        autoFocus={true}
                        placeholder="Enter email"
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

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isValid={
                            formik.touched.password && !formik.errors.password
                        }
                        isInvalid={!!formik.errors.password}
                        required
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="btn-mt-20" type="submit" variant="primary">
                    Sign In
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer?{" "}
                    <Link
                        to={
                            redirect
                                ? `/register?redirect=${redirect}`
                                : "/register"
                        }
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
