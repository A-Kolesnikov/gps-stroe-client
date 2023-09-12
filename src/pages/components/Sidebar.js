import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

import CollapsableTree from "./CollapsableTree"

function Sidebar({ categoriesTree }) {
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
    if (location.pathname !== '/login' && location.pathname !== '/register') {
        return (
            <Container fluid>
                Categories:
                {!categoriesTree ? <h5>Loading...</h5> : <CollapsableTree data={categoriesTree} />}
            </Container>
        )
    } else return <></>
}

export default Sidebar