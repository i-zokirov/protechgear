import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Row,
    Col,
    Image,
    ListGroup,
    Card,
    Button,
    Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import {
    fetchProductDetails,
    createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetail);
    const { product, loading, error } = productDetails;

    const productReviewCreate = useSelector(
        (state) => state.productReviewCreate
    );
    const {
        loading: productReivewLoading,
        error: errorProductReview,
        success: successProductReview,
    } = productReviewCreate;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (successProductReview) {
            alert("Review submitted!");
            setRating("");
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(fetchProductDetails(match.params.productId));
    }, [dispatch, match.params.productId, successProductReview]);

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.productId}?qty=${qty}`);
    };
    const formSubmitHandler = (e) => {
        e.preventDefault();
        // dispatch action to create a review
        dispatch(
            createProductReview(match.params.productId, { rating, comment })
        );
    };
    const renderProductDetails = (product) => {
        return (
            <>
                <Meta title={product.name} />
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numReviews} reviews`}
                                />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>
                                            {" "}
                                            <strong>
                                                ${product.price}
                                            </strong>{" "}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {product.countInStock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity: </Col>
                                            <Col>
                                                <Form.Control
                                                    as="select"
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[
                                                        ...Array(
                                                            product.countInStock
                                                        ).keys(),
                                                    ].map((x) => (
                                                        <option
                                                            key={x + 1}
                                                            value={x + 1}
                                                        >
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button
                                        onClick={addToCardHandler}
                                        className="btn-block"
                                        type="button"
                                        disabled={
                                            parseInt(product.countInStock) <= 0
                                                ? true
                                                : false
                                        }
                                    >
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <ListGroup>
                            <h2>Write a product review</h2>
                            {errorProductReview && (
                                <Message variant="danger">
                                    {errorProductReview}
                                </Message>
                            )}
                            {productReivewLoading && <Loader />}
                            {userInfo ? (
                                <Form onSubmit={formSubmitHandler}>
                                    <Form.Group controlId="ratingField">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            onChange={(e) =>
                                                setRating(e.target.value)
                                            }
                                        >
                                            <option disabled value="">
                                                Select...
                                            </option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">
                                                4 - Very Good
                                            </option>
                                            <option value="5">
                                                5 - Excellent
                                            </option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            onChange={(e) =>
                                                setComment(e.target.value)
                                            }
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        className="btn-mt-20"
                                        type="submit"
                                        variant="primary"
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">sign in</Link> to
                                    write a review
                                </Message>
                            )}
                        </ListGroup>
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 && (
                            <Message>No reviews</Message>
                        )}
                        <ListGroup variant="flush">
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </>
        );
    };

    return (
        <React.Fragment>
            <Link to="/" className="btn btn-light my-3">
                <i className="fas fa-arrow-left"></i> Go back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger"> {error} </Message>
            ) : (
                renderProductDetails(product)
            )}
        </React.Fragment>
    );
};

export default ProductScreen;
