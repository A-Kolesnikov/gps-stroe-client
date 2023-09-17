import React, { useContext } from "react"

import { UserContext } from "../hooks/contexts/userContext"

function SessionCounter() {

    const { visitCounter } = useContext(UserContext)

    return(
        <>
        Visits: {visitCounter} 
        </>
    )
}

export default SessionCounter