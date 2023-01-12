import { 
    createStore, 
    combineReducers, 
    applyMiddleware 
} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import { 
    productListReducer, 
    productDatailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers"

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    verifyEmailReducer,
    verifyTokenReducer
} from "./reducers/userReducers";

import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer,
    userOrderListReducer,
    ordersListReducer,
    orderDeliverReducer
} from "./reducers/orderReducers";
import notificationReducer from "./reducers/notificationReducer";

const middleware = [thunk]

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDatailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTop: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userOrdersList: userOrderListReducer,
    usersList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    ordersList: ordersListReducer,
    notification: notificationReducer,
    emailVerification: verifyEmailReducer,
    tokenVerification: verifyTokenReducer

})

// get cart items from local storage to add to the initial state of the redux store
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// get user information from local storage to add to the initial state of the redux store
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

// get shippingAddress from local storage if it is found in localstorage
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

export const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    },

}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store