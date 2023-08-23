import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

function NavBar() {
    return(
    <div className="sticky-top navBar row">
        <Col>
            <Link to='/' className="navLink">Home</Link>
        </Col>
    </div>
    )
}

export default NavBar