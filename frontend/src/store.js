import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

import { productListReducer, productDatailsReducer } from "./reducers/productReducers";


const middleware = [thunk]
const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDatailsReducer,
})
const initialState = {}

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store