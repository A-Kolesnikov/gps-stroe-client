import React, { useState, useEffect, Fragment, useContext } from "react"
import useFetch from "./hooks/useFetch"

import { Container, Row, Col } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"

import { ProductCardVertical, ProductCardHorizontal } from "./components/ProductCards"
import ProductCardAdaptiveComplect from "./components/ProductCardAdaptiveComplect"

const serverUrl = process.env.REACT_APP_SERVER_URL

function HomePage() {
    const { currentUser } = useContext(UserContext) //Will be used for contextual products

    const { data, loading, error } = useFetch(`${serverUrl}/products`)
    if (error) {
        console.error(error)
    }

    return (
        <Container fluid>
            <Row>
                <h2>You may be interested:</h2>
            </Row>
            <Row>
                {loading ?
                    <div>Loading products...</div> :
                    (!data || !data[0]) ?
                        <div>No products available</div> :
                        data.map((product) => {
                            return (
                                <ProductCardAdaptiveComplect key={`featured-${product.id}`} product={product}/>
                            )
                        })}
            </Row>
        </Container>
    )
}

export default HomePage