import {NOTIFICATION_PUSH, NOTIFICATION_DISMISS} from "../constants/notificationSystem"



export const dismissNotification = () => (dispatch) => {
    dispatch({type: NOTIFICATION_DISMISS})
}


export const pushNotification = ({type, heading, message, autoDismiss}) => {
    return (dispatch) => {
        dispatch({type: NOTIFICATION_PUSH, payload: {type, heading, message}})

        if(autoDismiss){
            setTimeout(() => {
                    dispatch({type: NOTIFICATION_DISMISS})
                }, 3000);
        }
        
    }
}