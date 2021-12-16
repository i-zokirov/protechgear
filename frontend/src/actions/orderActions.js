import axios from "axios";
import { 
    ORDER_CREATE_SUCCESS, 
    ORDER_CREATE_FAILURE,
    ORDER_CREATE_REQUEST,
    ORDER_DETAILS_SUCCESS, 
    ORDER_DETAILS_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_SUCCESS, 
    ORDER_PAY_FAILURE,
    ORDER_PAY_REQUEST,
    USER_ORDER_LIST_SUCCESS, 
    USER_ORDER_LIST_FAILURE,
    USER_ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS, 
    ORDER_LIST_FAILURE,
    ORDER_LIST_REQUEST,
    ORDER_DELIVER_SUCCESS, 
    ORDER_DELIVER_FAILURE,
    ORDER_DELIVER_REQUEST,
} from "../constants/orderConstants";
import { CART_RESET } from "../constants/cartConstant";

export const createOrder = (order) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_CREATE_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post('/api/orders', order, config)
            dispatch({type: ORDER_CREATE_SUCCESS, payload: data})
            dispatch({type: CART_RESET})
            
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}


export const getOrderDetails = (orderId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_DETAILS_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/orders/${orderId}`, config)
            dispatch({type: ORDER_DETAILS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}

export const payOrder = (orderId, paymentResult) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_PAY_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
            dispatch({type: ORDER_PAY_SUCCESS, payload: data})
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}


export const getUserOrdersList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: USER_ORDER_LIST_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get('/api/orders/myorders',  config)
            dispatch({type: USER_ORDER_LIST_SUCCESS, payload: data})
        } catch (error) {
            dispatch({
                type: USER_ORDER_LIST_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}

export const getOrdersList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_LIST_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get('/api/orders',  config)
            dispatch({type: ORDER_LIST_SUCCESS, payload: data})
        } catch (error) {
            dispatch({
                type: ORDER_LIST_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}


export const makeOrderDelivered = (orderId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({type: ORDER_DELIVER_REQUEST})

            const { userLogin: { userInfo } } = getState()
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, config)
            dispatch({type: ORDER_DELIVER_SUCCESS, payload: data})
        } catch (error) {
            dispatch({
                type: ORDER_DELIVER_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}