import React, { useContext } from "react"

import { UserContext } from "../hooks/contexts/userContext"

function VisitCounter() {

    const { visitCounter } = useContext(UserContext)

    return(
        <>
        Visits: {visitCounter} 
        </>
    )
}

export default VisitCounter