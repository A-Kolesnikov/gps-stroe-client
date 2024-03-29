import React, { createContext, useState, useEffect } from "react"

import useFetch from "../useFetch"
import useCurrentUser from "../useCurrentUser"
import useCart from "../useCart"

export const UserContext = createContext(null)

const serverUrl = process.env.REACT_APP_SERVER_URL

export default function UserContextProvider({ children }) {

    //User details
    const [userTrigger, setUserTrigger] = useState(false)
    const handleUserTrigger = () => {
        setUserTrigger(prevStatus => !prevStatus)
    }
    const { currentUser, visitCounter, currentWishList, logout } = useCurrentUser(userTrigger, handleUserTrigger)

    //Cart details

    const [cartTrigger, setCartTrigger] = useState(false)
    const [cartSettings, setCartSettings] = useState({action: "show", product_id: null, quantity: 1})

    const { data: currentCart, error: cartError } = useCart(cartTrigger, currentUser, cartSettings.action, cartSettings.product_id, cartSettings.quantity)
    if(cartError){
        console.error(cartError)
    }

    const handleCartTrigger = (action = "show", product_id = null, quantity = 1) => {
        const newCartSettings = {
            ...cartSettings,
            action: action,
            product_id: product_id,
            quantity: quantity,
        }
        setCartSettings(newCartSettings)
        setCartTrigger(prevStatus => !prevStatus)
    }

    const [ordersTrigger, setOrdersTrigger] = useState(false)
    const handleOrdersTrigger = () => {
        setOrdersTrigger(prevStatus => !prevStatus)
    }
    useEffect(()=>{
        handleOrdersTrigger()
    },[currentUser])

    const { data: currentOrders, error: currentOrdersError} = useFetch(`${serverUrl}/orders/by-user/${currentUser?.id}, 'GET`, null, ordersTrigger)
    console.log(currentOrders)
    return (
        <UserContext.Provider value={{ currentUser, visitCounter, currentCart, currentWishList, currentOrders, logout, handleUserTrigger, handleCartTrigger, handleOrdersTrigger }}>
            {children}
        </UserContext.Provider>
    )
}