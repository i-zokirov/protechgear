import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrdersListScreen from "./screens/OrderListScreen";
import Notification from "./components/Notification";
import TokenScreen from "./screens/TokenScreen";

const App = () => {
    return (
        <Router>
            <Header />
            <main className="py-3">
                <Container>
                    <Container>
                        <Notification className="justify-content-md-center" />
                    </Container>
                    <Route path="/" component={HomeScreen} exact />
                    <Route path="/verifyToken" component={TokenScreen} exact />
                    <Route path="/page/:pageNumber" component={HomeScreen} />
                    <Route
                        path="/search/:keyword"
                        component={HomeScreen}
                        exact
                    />
                    <Route
                        path="/search/:keyword/page/:pageNumber"
                        component={HomeScreen}
                    />
                    <Route
                        path="/product/:productId"
                        component={ProductScreen}
                    />
                    <Route path="/cart/:productId?" component={CartScreen} />
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/register" component={RegisterScreen} />
                    <Route path="/profile" component={ProfileScreen} />
                    <Route path="/shipping" component={ShippingScreen} />
                    <Route path="/payment" component={PaymentMethodScreen} />
                    <Route path="/placeorder" component={PlaceOrderScreen} />
                    <Route path="/order/:orderId" component={OrderScreen} />
                    <Route
                        path="/admin/users"
                        exact
                        component={UserListScreen}
                    />
                    <Route
                        path="/admin/users/:userId/edit"
                        exact
                        component={UserEditScreen}
                    />
                    <Route
                        path="/admin/products"
                        exact
                        component={ProductListScreen}
                    />
                    <Route
                        path="/admin/products/page/:pageNumber"
                        exact
                        component={ProductListScreen}
                    />
                    <Route
                        path="/admin/products/:productId/edit"
                        exact
                        component={ProductEditScreen}
                    />
                    <Route
                        path="/admin/orders"
                        exact
                        component={OrdersListScreen}
                    />
                    <Route
                        path="/admin/orders/:orderId"
                        component={OrderScreen}
                    />
                </Container>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
