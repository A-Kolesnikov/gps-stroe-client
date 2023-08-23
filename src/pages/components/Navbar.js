import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function NavBar() {
    return(
    <div className="sticky-top navBar row">
        <Col>
            <Link to='/' className="navLink">Homie</Link>
        </Col>
    </div>
    )
}

export default NavBar