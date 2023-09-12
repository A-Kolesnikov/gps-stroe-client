import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons"

function TreeNode({ data }) {
    const [isCollapsed, setCollapsed] = useState(true)

    const toggleCollapse = () => {
        setCollapsed(prevIsCollapsed => !prevIsCollapsed)
    }

    return (
        <Fragment >

            <Row className="tree-node px-0 my-2">
                <Col className="gx-0 text-xl d-flex" style={{ fontSize: 'large' }}>
                    <Link to={`/products/${data.id}`} className="blackTextLink">    {/*Specific for categories tree*/}
                        {data.name}
                    </Link>
                </Col>
                {data.children && data.children.length > 0 && (
                    <Col onClick={toggleCollapse} xs={1} style={{ cursor: 'pointer' }} className="gx-2 cursor-pointer">
                        <FontAwesomeIcon icon={isCollapsed ? faCaretRight : faCaretDown} className="fa-xl text-secondary" />
                    </Col>
                )}
            </Row>
            {!isCollapsed && data.children && data.children.length > 0 && (
                <Fragment>
                    {data.children.map((child) => (
                        <Row key={`collapsable${child.id}`}>
                                <Col style={{ marginLeft: 'auto' }} className="gx-1" xs={1}>
                                </Col>
                                <Col xs={11}>
                                    <TreeNode key={child.id} data={child} />
                                </Col>
                        </Row>
                    ))}
                </Fragment>
            )}

        </Fragment>
    )
}

export default function CollapsableTree({ data, parrentName = null }) {
    if (parrentName) {
        data = [{id: -1, name: parrentName, children: data}]
    } 
    return (
        <Container className="px-0" fluid>
            {data.map((item) => (
                <TreeNode key={`collapsable${item.id}`} data={item} />
            ))}
        </Container>
    )
}