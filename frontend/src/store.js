import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import { productListReducer, productDatailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers"

const middleware = [thunk]

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDatailsReducer,
    cart: cartReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage
    }
}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store