import React, { createContext, useState } from "react"

import useFetch from "../useFetch"
import useCurrentUser from "../useCurrentUser"
import useCart from "../useCart"

export const UserContext = createContext(null)

const serverUrl = process.env.REACT_APP_SERVER_URL

export default function UserContextProvider({ children }) {

    const defaultCartSettings = {action: "show", product_id: null, quantity: 1}
    let cartSettings = defaultCartSettings

    //User details
    const [userTrigger, setUserTrigger] = useState(false)
    const handleUserTrigger = () => {
        cartSettings = defaultCartSettings
        setUserTrigger(prevStatus => !prevStatus)
    }
    const { currentUser, visitCounter, currentWishList, logout } = useCurrentUser(userTrigger, handleUserTrigger)

    //Cart details
    
    /*const [cartMode, setCartMode] = useState({url: !currentUser ? null : `/by-user/${currentUser.id}`, method:'GET', requestBody: null})
    useEffect(()=>{

    }, [currentUser])

    const finalUrl = !currentUser ? null : `${serverUrl}${cartMode.url}`
    const { data: currentCart, error: cartError, loading: cartLoading } = useFetch(finalUrl, cartMode.method, cartMode.requestBody)
    console.log(finalUrl, currentCart)*/

    const [cartTrigger, setCartTrigger] = useState(false)
    const  { data: currentCart } = useCart(cartTrigger, currentUser, cartSettings.action, cartSettings.product_id, cartSettings.quantity)
    const handleCartTrigger = (action = "show", product_id = null, quantity = 1) => {
        cartSettings.action = action
        cartSettings.product_id = product_id
        cartSettings.quantity = quantity
        setCartTrigger(prevStatus => !prevStatus)
    }
    console.log(currentCart)

    return (
        <UserContext.Provider value={{ currentUser, visitCounter, currentCart, currentWishList, logout, handleUserTrigger, handleCartTrigger }}>
            {children}
        </UserContext.Provider>
    )
}