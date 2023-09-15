import React from "react"

export const UserContext = createContext(null)

export default function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <UserContext.Provider value = {{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}