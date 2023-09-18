import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"

import { UserContext } from "../hooks/contexts/userContext"

import { useLocation } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHome, faCartShopping } from "@fortawesome/free-solid-svg-icons"

import CollapsableTree from "./CollapsableTree"

function NavBar({ categoriesTree }) {
    const { currentCart } = useContext(UserContext)
    const totalInCart = (() => {
        if (!currentCart) {
            return null
        } else {
            const total = currentCart.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
            return total
        }
    })()

    const tree = []
    function createHierarchy(arr, depth = 0) {

        for (const element of arr) {
            if (!element.children) {
                tree.push(<div key={element.id}>{element.name} lvl{depth}</div>)
            } else {
                tree.push(<div key={element.id}>{element.name}</div>)
                { createHierarchy(element.children, depth + 1) }
            }
        }
    }
    createHierarchy(tree)
    const location = useLocation()

    return (
        <div className="sticky-top navBar row p-1">
            <Row>
                <Col>
                    <Link to='/' className="navLink">
                        <FontAwesomeIcon icon={faHome} className="fa-lg" />
                    </Link>
                </Col>
                <Col className="text-end">
                    <Link to='/cart' className="navLink">
                        {totalInCart} <FontAwesomeIcon icon={faCartShopping} className="fa-lg" />
                    </Link>
                </Col>
            </Row>

            <Row>
                <Col className="px-3 mt-2 d-lg-none">
                    {!categoriesTree ? <h5>Loading...</h5> : <CollapsableTree data={categoriesTree} parrentName={'Categories'} scheme={'b'} />}
                </Col>
            </Row>
        </div>
    )
}

export default NavBar