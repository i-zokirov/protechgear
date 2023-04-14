import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { fetchProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.productId;
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);
    const dispatch = useDispatch();

    const [errorOnUpload, setErrorOnUpload] = useState(null);

    const productDetails = useSelector((state) => state.productDetail);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;

    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push("/admin/products");
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(fetchProductDetails(productId));
            } else if (product) {
                setName(product.name);
                setImage(product.image);
                setDescription(product.description);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setPrice(product.price);
            }
        }
    }, [product, productId, dispatch, history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                image,
                price,
                description,
                brand,
                category,
                countInStock,
            })
        );
    };
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.post("/api/upload", formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            setUploading(false);
            setErrorOnUpload(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    };
    return (
        <React.Fragment>
            <Link to="/admin/products" className="btn btn-light my-3">
                <i className="fas fa-arrow-left"></i> Go back
            </Link>

            <FormContainer>
                <h1>Edit product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && (
                    <Message variant="danger">{errorUpdate}</Message>
                )}
                {errorOnUpload && (
                    <Message variant="danger">{errorOnUpload}</Message>
                )}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
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

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>

                            <Form.Control
                                type="text"
                                placeholder="Enter an image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="image-file">
                            {uploading && <Loader />}
                            <Form.Label>Upload image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={uploadFileHandler}
                            />
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter brand"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter countInStock"
                                value={countInStock}
                                onChange={(e) =>
                                    setCountInStock(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                as="textarea"
                                rows={5}
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
                )}
            </FormContainer>
        </React.Fragment>
    );
};

export default ProductEditScreen;
