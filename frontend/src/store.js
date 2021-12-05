import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import { productListReducer, productDatailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";


const middleware = [thunk]

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDatailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer
})

// get cart items from local storage to add to the initial state of the redux store
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

// get user information from local storage to add to the initial state of the redux store
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    },
    userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store