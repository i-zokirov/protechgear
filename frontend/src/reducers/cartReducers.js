import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
    CART_RESET 
} from "../constants/cartConstant";

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action )=>{

    switch (action.type){
        case CART_ADD_ITEM:
            const newItem = action.payload
            const itemExists = state.cartItems.find(x => x.product === newItem.product)
            if(itemExists){
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === itemExists.product ? newItem : x)
                }
            } else{
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload )
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
                }
        case CART_RESET:
            localStorage.setItem('cartItems', [])
            return {
                ...state,
                cartItems: []
            }
        default:   
            return state
    }
}