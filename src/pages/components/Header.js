import React, { useContext } from "react"
import Context from "../hooks/contexts/Context"

import { useLocation, useNavigate } from "react-router-dom"

import { Row, Col, Button } from "react-bootstrap"

function Header({logout}) {
    const location = useLocation()
    const navigate = useNavigate()

    const { currentUser } = useContext(Context)

    let userSection = null
    if (location.pathname !== '/login' && location.pathname !== '/register'){
        if (currentUser) /*(Object.keys(currentUser).length > 0)*/{
            userSection = <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={()=>logout()} className="m-2 mt-3">Logout</Button>
                <Button className="m-2 mt-3">User details</Button>
            </Col>
        } else {
            userSection = <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={()=>navigate('/login')} className="m-2 mt-3">Login</Button>
                <Button onClick={()=>navigate('/register')} className="m-2 mt-3">Register</Button>
            </Col>
        }
    }

    return (
        <header className="container-fluid">
            <Row className="d-flex justify-content-between">
                <Col  className="p-3 text-uppercase fs-2">
                    Welcome to GPS-store{currentUser ? `, ${currentUser.name}!` : "!"}
                </Col>

                {userSection}

            </Row>
        </header>
    )
}
export default Header