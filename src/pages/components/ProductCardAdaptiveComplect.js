import React, { Fragment } from "react"
import { Container, Row, Col } from "react-bootstrap"

import { ProductCardVertical, ProductCardHorizontal } from "./ProductCards"

export default function ProductCardAdaptiveComplect ({ product }) {
    return (
        <Fragment>
            <Col className="mb-3 d-none d-lg-block" xxl={3} lg={6}>
                <ProductCardVertical product={product} />
            </Col>
            <Col className="mb-3 d-lg-none" xs={12}>
                <ProductCardHorizontal product={product} />
            </Col>
        </Fragment>
    )
}