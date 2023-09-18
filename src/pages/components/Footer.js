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
                <Col xs={3} lg={1}>
                    <SessionCounter />
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
                </Row>
            </section>

        </footer>
    )
}
export default Footer