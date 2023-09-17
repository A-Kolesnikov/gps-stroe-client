import React, { createContext, useState } from "react"

import useCurrentUser from "../useCurrentUser"

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
    
    const [userTrigger, setUserTrigger] = useState(false)

    const handleUserTrigger = () => {
        setUserTrigger(prevStatus => !prevStatus)
    }

    const { currentUser, visitCounter, currentCart, currentWishList, logout } = useCurrentUser(userTrigger, handleUserTrigger)

    return (
        <UserContext.Provider value={{ currentUser, visitCounter, currentCart, currentWishList, logout, handleUserTrigger }}>
            {children}
        </UserContext.Provider>
    )
}