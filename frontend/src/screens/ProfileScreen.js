import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Form, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import NotificationWithActionButton from "../components/NotificationWithActionButton";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
    getUserDetails,
    sendEmailVerificationLink,
    updateUserProfile,
} from "../actions/userActions";
import { getUserOrdersList } from "../actions/orderActions";

import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileVerified, setProfileVerified] = useState(false);
    const [message, setMessage] = useState(null);
    const [showEmailVerificationState, setshowEmailVerificationState] =
        useState(true);
    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userOrdersList = useSelector((state) => state.userOrdersList);
    const {
        error: errorOnOrders,
        loading: loadingOrders,
        orders,
    } = userOrdersList;

    const emailVerification = useSelector((state) => state.emailVerification);

    useEffect(() => {
        if (!userInfo) {
            history.push("/login");
        } else {
            if (!user.name || !user || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails("profile"));
                dispatch(getUserOrdersList());
            } else {
                setName(user.name);
                setEmail(user.email);
                setProfileVerified(user.verified);
            }
        }
    }, [userInfo, history, dispatch, user, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
        } else {
            // dispatch update profile
            dispatch(
                updateUserProfile({ id: user._id, name, email, password })
            );
        }
    };

    const handleSendEmail = () => {
        dispatch(sendEmailVerificationLink("profile"));
        setshowEmailVerificationState(false);
    };

    return (
        <Row>
            <Col md={3}>
                <Link to="/" className="btn btn-light my-3">
                    <i className="fas fa-arrow-left"></i> Go back
                </Link>
                <h2>My Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {success && (
                    <Message variant="success">
                        {"Profile has been updated!"}
                    </Message>
                )}
                {loading || emailVerification.loading ? <Loader /> : ""}

                {!profileVerified && (
                    <NotificationWithActionButton
                        show={showEmailVerificationState}
                        type="warning"
                        message="Your email address was not verified. If you haven`t received email from us, check your spam folders or click the button below to resend."
                        buttonText="Resend"
                        buttonAction={handleSendEmail}
                    />
                )}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter a name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password again"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        className="btn-mt-20"
                        type="submit"
                        variant="primary"
                    >
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h3>My Orders</h3>
                {loadingOrders ? (
                    <Loader />
                ) : errorOnOrders ? (
                    <Message variant="danger">{errorOnOrders}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className="table-sm"
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidOn.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDelivered ? (
                                            order.deliveredOn.substring(0, 10)
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order._id}`}
                                        >
                                            <Button
                                                className="btn-sm"
                                                variant="light"
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default ProfileScreen;
