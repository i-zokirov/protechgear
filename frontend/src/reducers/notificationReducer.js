import {NOTIFICATION_PUSH, NOTIFICATION_DISMISS} from "../constants/notificationSystem"


const notificationReducer = (state = {}, action) => {
    switch(action.type){
        case NOTIFICATION_PUSH:
            return {
                type: action.payload.type,
                message: action.payload.message,
                heading: action.payload.heading,
            }
        case NOTIFICATION_DISMISS:
            return {}
        default:
            return state
    }
}

export default notificationReducer