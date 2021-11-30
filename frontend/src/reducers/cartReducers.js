import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";

export const cartReducer = (state = {cartItems: []}, action )=>{

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
        default:
            return state
    }
}