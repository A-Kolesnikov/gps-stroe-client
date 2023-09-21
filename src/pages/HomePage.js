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

    const { data: newProducts, loading: newProductsLoading, error: newProductsError } = useFetch(`${serverUrl}/products/by-tag/new`)
    if (newProductsError) {
        console.error(newProductsError)
    }

    const { data: saleProducts, loading: saleProductsLoading, error: saleProductsError } = useFetch(`${serverUrl}/products/by-tag/sale`)
    if (saleProductsError) {
        console.error(saleProductsError)
    }

    return (
        <Container fluid>
            <Row>
                <h2>You may be interested:</h2>
            </Row>
            <Row>
                {newProductsLoading ?
                    <div>Loading products...</div> :
                    (!newProducts || !newProducts[0]) ?
                        <div>No products available</div> :
                        newProducts.map((product) => {
                            return (
                                <ProductCardAdaptiveComplect key={`featured-${product.id}`} product={product}/>
                            )
                        })}
            </Row>

            <Row>
                {saleProductsLoading ?
                    <div>Loading products...</div> :
                    (!saleProducts || !saleProducts[0]) ?
                        <div>No products available</div> :
                        saleProducts.map((product) => {
                            return (
                                <ProductCardAdaptiveComplect key={`featured-${product.id}`} product={product}/>
                            )
                        })}
            </Row>
        </Container>
    )
}

export default HomePage