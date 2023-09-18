import React, { createContext, useState } from "react"

import useFetch from "../useFetch"
import useCurrentUser from "../useCurrentUser"

export const UserContext = createContext(null)

const serverUrl = process.env.REACT_APP_SERVER_URL

export default function UserContextProvider({ children }) {

    //User details
    const [userTrigger, setUserTrigger] = useState(false)
    const handleUserTrigger = () => {
        setUserTrigger(prevStatus => !prevStatus)
    }
    const { currentUser, visitCounter, currentWishList, currentCart, logout } = useCurrentUser(userTrigger, handleUserTrigger)

    //Cart details
    /*const [cartMode, setCartMode] = useState({url: !currentUser ? null : `/by-user/${currentUser.id}`, method:'GET', requestBody: null})
    useEffect(()=>{

    }, [currentUser])

    const finalUrl = !currentUser ? null : `${serverUrl}${cartMode.url}`
    const { data: currentCart, error: cartError, loading: cartLoading } = useFetch(finalUrl, cartMode.method, cartMode.requestBody)
    console.log(finalUrl, currentCart)*/

    return (
        <UserContext.Provider value={{ currentUser, visitCounter, currentCart, currentWishList, logout, handleUserTrigger }}>
            {children}
        </UserContext.Provider>
    )
}