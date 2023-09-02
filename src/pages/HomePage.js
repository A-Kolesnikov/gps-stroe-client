import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";

import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";

import { ProductCardVertical } from "./components/ProductCards";

const serverUrl = 'http://localhost:3100' //put into config

function HomePage({ currentUser }) {
    axios.defaults.withCredentials = true
    const { data, loading, error } = useFetch(`${serverUrl}/products`)
    if (error) {
        console.log(error)
    }

    return (
        <Container>
            <Row>
                <h2>Home page</h2>
            </Row>
            <Row>
                {loading ? <div>Loading products...</div> : (!data || !data[0]) ? <div>No products available</div> : data.map((product) => {
                    return (
                        <Col  className="mb-3" xxl={3} lg={6} key={`featured-${product.id}`}>
                            <ProductCardVertical product={product} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default HomePage