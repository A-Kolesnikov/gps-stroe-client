import React, { useState, useEffect, Fragment } from "react"
import useFetch from "./hooks/useFetch"

import { Container, Row, Col } from "react-bootstrap"

import { ProductCardVertical, ProductCardHorizontal } from "./components/ProductCards"

const serverUrl = process.env.REACT_APP_SERVER_URL

function HomePage({ currentUser }) {
    const { data, loading, error } = useFetch(`${serverUrl}/products`)
    if (error) {
        console.log(error)
    }

    return (
        <Container fluid>
            <Row>
                <h2>Home page</h2>
            </Row>
            <Row>
                {loading ?
                    <div>Loading products...</div> :
                    (!data || !data[0]) ?
                        <div>No products available</div> :
                        data.map((product) => {
                            return (
                                <Fragment key={`featured-${product.id}`}>
                                    <Col className="mb-3 d-none d-lg-block" xxl={3} lg={6}>
                                        <ProductCardVertical product={product} />
                                    </Col>
                                    <Col className="mb-3 d-lg-none" xs={12}>
                                        <ProductCardHorizontal product={product} />
                                    </Col>
                                </Fragment>
                            )
                        })}
            </Row>
        </Container>
    )
}

export default HomePage