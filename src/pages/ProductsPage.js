import React, { useState, useEffect, Fragment } from "react"
import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom"
import { Container, Row, Col, Image } from "react-bootstrap"

import ProductCardAdaptiveComplect from "./components/ProductCardAdaptiveComplect"

import { collectChildrenIDs, defineSubTree } from "../service/treeOperations"

const serverUrl = process.env.REACT_APP_SERVER_URL

function ProductsPage({ categoriesArr, categoriesTree }) {
    const paramHook = useParams()
    const categoryID = parseInt(paramHook.categoryID)
    const singleRootCategoriesTree = { id: -1, name: 'All Categories', children: categoriesTree }

    const [currentCategory, setCurrentCategory] = useState(null)
    useEffect(() => {
        if (categoriesTree) {
            setCurrentCategory(
                defineSubTree(singleRootCategoriesTree, categoryID)
            )
        }
    }, [categoriesTree, categoryID])

    const productsURL = (() => {
        if (!currentCategory) return null
        if (currentCategory.id === -1) return `${serverUrl}/products/`
        return (
            `${serverUrl}/products/of-category/${collectChildrenIDs(currentCategory).join(',')}`
        )
    })()

    const { data: products, error: productsError, loading: productsLoading } = useFetch(productsURL)

    return (
        <Container fluid>
            <Row>
                <h1>{currentCategory?.name}</h1>
            </Row>
            <Row>
                {productsLoading ?
                    <div>Loading products...</div> :
                    (!products || !products[0]) ?
                        <div>No products available</div> :
                        products.map((product) => {
                            return <ProductCardAdaptiveComplect key={`byCategory-productID${product.id}`} product={product} />
                        })
                }
            </Row>
        </Container>

    )
}

export default ProductsPage