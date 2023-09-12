import React, { useState, Fragment } from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretRight, faCaretDown, faArrowDown, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { left } from "@popperjs/core"

function TreeNode({ data }) {
    const [isCollapsed, setCollapsed] = useState(true)

    const toggleCollapse = () => {
        setCollapsed(prevIsCollapsed => !prevIsCollapsed)
    }

    return (
        <Fragment >

            <Row className="tree-node px-0 my-2">
                <Col className="gx-0 text-xl d-flex" style={{ fontSize: 'large' }}>
                    {data.name}
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
                        <Row>
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


export default function CollapsableTree({ data }) {
    return (
        <Container className="px-0" fluid>
            {data.map((item) => (
                <TreeNode key={item.id} data={item} />
            ))}
        </Container>
    )
}

function TreeNodeOld({ data }) {
    const [isCollapsed, setCollapsed] = useState(true)

    const toggleCollapse = () => {
        setCollapsed(prevIsCollapsed => !prevIsCollapsed)
    }

    return (
        <div>
            <div>
                {data.name} <button onClick={toggleCollapse} style={{ cursor: 'pointer' }}>{isCollapsed ? '▶' : '▼'}</button>
                {!isCollapsed && data.children && data.children.length > 0 && (
                    <div style={{ marginLeft: '20px' }}>
                        {data.children.map((child) => (
                            <TreeNode key={child.id} data={child} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
