import React from "react"
import { Row, Col } from "react-bootstrap"

import SessionCounter from "./SessionCounter"

function Footer() {

    return (
        <footer className="d-flex justify-content-center flex-column container-fluid p-4">
            <Row>
                <Col>
                    <section>
                        Contacts
                    </section>
                </Col>
                <Col>
                    <section>
                        About us
                    </section>
                </Col>
            </Row>
            <section>
                <Row>
                    <Col xs={11}>
                        &copy; Brightcode 2023 A.Kolesnikov
                    </Col>
                    <Col xs={1}>
                        <SessionCounter />
                    </Col>
                </Row>
            </section>

        </footer>
    )
}
export default Footer