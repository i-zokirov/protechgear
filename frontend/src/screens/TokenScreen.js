import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pushNotification } from '../actions/notificationActions'
import { confirmToken } from '../actions/userActions'
import useQuery from '../customHooks/useQuery'
const TokenScreen = ({history}) => {
    const query = useQuery()
    const dispatch = useDispatch()
    const tokenVerification = useSelector(state => state.tokenVerification)

    
    useEffect(() => {
        const token = query.get("token")  
        if(!token){
             history.push("/")
            
        } 
        dispatch(confirmToken(token))

        
              
    }, [dispatch])

    useEffect(() => {
        if(tokenVerification.success){
            dispatch(pushNotification({type: "success", message: "Your email has been verified!", autoDismiss: true}))
            history.push("/")
        } else if(tokenVerification.error){
            dispatch(pushNotification({type: "error", message: tokenVerification.error, autoDismiss: true}))
            history.push("/")
        }
    }, [tokenVerification])
    return (
        <div></div>
    )
}

export default TokenScreen