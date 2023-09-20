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
                <Button onClick={() => logout()} className="m-2 mt-3">Logout</Button>
                <Button className="m-2 mt-3">User details</Button>
            </Col>
        } else {
            userSection = <Col xs={2} className="d-flex justify-content-end" >
                <Row className="d-flex justify-content-end align-items-center">
                    <Col xs={12} md={6}>
                        <Button onClick={() => navigate('/login')} className="m-2 mt-3 w-100">Login</Button>
                    </Col>
                    <Col xs={12} md={6}>
                        <Button onClick={() => navigate('/register')} className="m-2 mt-3 w-100">Register</Button>
                    </Col>
                </Row>
            </Col>
        }
    }

    return (
        <header className="container-fluid">
            <Row className="d-flex justify-content-between">
                {/*<Col lg={2} className="withBackground d-none d-lg-block"></Col>*/}
                <Col className="p-3 text-uppercase fs-2">
                    <span>
                    <Image src="../media/logo-03.jpg" className="logo-size" />
                    </span>
                    <span>
                    Welcome to GPS-store{currentUser ? `, ${currentUser.name}!` : "!"}
                    </span>
                </Col>

                {userSection}

            </Row>
        </header>
    )
}
export default Header