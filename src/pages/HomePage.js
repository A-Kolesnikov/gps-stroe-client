import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";

import axios from "axios";

import ProductCardVertical from "./components/ProductCardVertical";

function HomePage({currentUser}) {

    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchedData = axios.get('http://localhost:3100/products')
        fetchedData.then(res => {
            setProducts(res.data)
        })
    }, [])

    return (
        <Container>
            <Row>
                <h2>Home page</h2>
                <h3>Hello, {currentUser.id ? currentUser.name : "Guest!"}!</h3>
            </Row>
            <Row>
                
            {products.length === 0 ? <div>Fetching products</div> : products.map((product) => {
                return (
                    <Col key = {`featured-${product.id}`}>
                        <ProductCardVertical product={product} />
                    </Col>
                )
            })}
            </Row>
        </Container>
    )
}

export default HomePage