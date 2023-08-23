import React from "react";

import { Row, Col } from "react-bootstrap";

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
                <div>&copy; Brightcode 2023 A.Kolesnikov</div>
            </section>

        </footer>
    )
}
export default Footer