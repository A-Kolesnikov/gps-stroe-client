import React, { useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Row, Col, Button, Image } from "react-bootstrap"

import { UserContext } from "../hooks/contexts/userContext"

function Header() {
    const location = useLocation()
    const navigate = useNavigate()

    const { currentUser, logout } = useContext(UserContext)

    let userSection = null
    if (location.pathname !== '/login' && location.pathname !== '/register') {
        if (currentUser) /*(Object.keys(currentUser).length > 0)*/ {
            userSection = <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={() => logout()} className="px-2 m-2 mt-3">Logout</Button>
                <Button className="px-2 m-2 mt-3">User details</Button>
            </Col>
        } else {
            userSection = <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={() => navigate('/login')} className="px-2 m-2 mt-3">Login</Button>
                <Button onClick={() => navigate('/register')} className="px-2 m-2 mt-3">Register</Button>
            </Col>
        }
    }

    return (
        <header className="container-fluid">
            <Row className="d-flex justify-content-between">
                <Col lg={2} className="withBackground d-none d-lg-block"></Col>
                <Col className="p-3 text-uppercase fs-2">

                        {/*<Image src="../media/logo-03.jpg" className="logo-size" />*/}

                        Welcome to GPS-store{currentUser ? `, ${currentUser.name}!` : "!"}

                </Col>

                {userSection}

            </Row>
        </header>
    )
}
export default Header