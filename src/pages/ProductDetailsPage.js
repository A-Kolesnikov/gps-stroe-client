import React, { useState, useEffect, useContext } from "react"
import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom"

import { Container, Button, Card, Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfStroke, faCheck, faXmark, faTriangleExclamation, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons"

import { UserContext } from "./hooks/contexts/userContext"

const serverUrl = process.env.REACT_APP_SERVER_URL

const currency = '€'

function createCardHeader(product) {
    if (!product.tag) return <div className="my-3"></div>
    if (product.tag === 'sale') return (<Card.Header className="cardHeaderSale py-1 px-2" style={{ color: 'white' }}>SALE</Card.Header>)
    if (product.tag === 'new') return (<Card.Header className="cardHeaderNewProduct py-1 px-2" style={{ color: 'white' }}>NEW</Card.Header>)
    return (<Card.Header className="py-1 px-2">{product.tag}</Card.Header>)
}

function createInStockIndicator(product) { //FIND WHY cursor-pointer DOESNT WORK?
    if (product.units_in_stock > 5) {
        return (
            <Card.Text className="text-center mt-3 mb-1 cursor-pointer" title={`${product.units_in_stock} pcs`}>
                <FontAwesomeIcon icon={faCheck} className="fa-lg text-success cursor-pointer" /> In stock
            </Card.Text>
        )
    } else if (product.units_in_stock < 1 || !product.units_in_stock) {
        return (
            <Card.Text className="text-center mt-3 mb-1 cursor-pointer">
                <FontAwesomeIcon icon={faXmark} className="fa-lg text-danger" /> Out of stock
            </Card.Text>
        )
    } else {
        return (
            <Card.Text className="text-center mt-1 mb-1 cursor-pointer" title={`${product.units_in_stock} pcs`}>
                <FontAwesomeIcon icon={faTriangleExclamation} className="fa-lg text-warning" /> Last items in stock
            </Card.Text>
        )
    }
}

function createInCartIndicator(piecesInCart) {
    if (!piecesInCart) {
        return null
    }
    return (
        <Card.Text className="text-end mt-3 mb-0 cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} className="fa-sm" /> {`${piecesInCart}pcs`}
        </Card.Text>
    )
}

function createPriceStyling(product) {
    if (product.units_in_stock > 0)
        return { color: "green", fontSize: "x-large" }
    return { color: "grey", fontSize: "x-large" }
}

function createButtons(product) {
    return (
        <div className="d-grid gap-2">
            {product.units_in_stock > 0 ?
                <Button as={Col} variant="primary" disabled>Add to cart</Button> :
                <Button as={Col} variant="secondary" active>No items for cart</Button>} {/*className="mb-4 mx-2" */}
            <Button as={Col} variant="secondary">Add to wishlist</Button>
        </div>
    )
}

function createRatingIndicator(product) {

    let cnt = 5,
        indicator = [],
        comment = null
    if (!product.rating) {
        while (cnt > 0) {
            indicator.push(<FontAwesomeIcon key={`${product.id}${cnt}`} icon={faRegularStar} className="fa-xs text-secondary" />)
            cnt--
        }
    } else {
        let ratingPoints = product.rating
        comment = `(${parseFloat(product.rating).toFixed(1)}) ` //WHY REQUIRED TO parseFloat?
        while (cnt > 0) {
            if (ratingPoints >= 0.75) {
                indicator.push(<FontAwesomeIcon key={`${product.id}${cnt}`} icon={faStar} className="fa-xs text-warning" />)
                ratingPoints--
            } else if (ratingPoints < 0.75 && ratingPoints > 0.2) {
                indicator.push(<FontAwesomeIcon key={`${product.id}${cnt}`} icon={faStarHalfStroke} className="fa-sm text-warning" />)
                ratingPoints = 0
            } else {
                ratingPoints = 0
                indicator.push(<FontAwesomeIcon key={`${product.id}${cnt}`} icon={faRegularStar} className="fa-sm text-warning" />)
            }
            cnt--
        }
    }
    return (
        <Col className="mx-2 px-2 text-end" style={{ fontSize: "smaller" }}>
            {comment}{indicator}
        </Col>
    )
}

function ProductDetailsPage() {

    const paramHook = useParams()
    const id = paramHook.id
    const { data: product, error: productError } = useFetch(`${serverUrl}/products/product/${id}`)
    if (productError) {
        console.log(productError)
    }
    console.log(product)

    const imageUrl = `../${product?.main_image}`
    const { currentCart, handleCartTrigger } = useContext(UserContext)
    const isInCart = !product ? null : currentCart?.find(item => item.product_id == product.id)
    const ratingIndicator = !product ? null : createRatingIndicator(product)
    const inStcokIndicator = !product ? null : createInStockIndicator(product)

    return (
        <>
            {!product ? null :
            <Container>

            
                <Container className="mt-5">
                    <Row>
                        <Col lg={5} md={12}>
                            <Row>
                                <Card.Img src={imageUrl} />
                            </Row>
                        </Col>
                        <Col lg={6} md={12} className="mt-3">
                            <Card.Body>
                                <h2>{product?.name}</h2>
                                <h6>Reference: {product?.reference}</h6>
                                <h4 className="mt-4" style={{ color: "darkgreen", fontWeight: "bold" }}>{product.price}{currency}</h4>
                                <Card.Text className="mt-5">
                                    {product.short_description}
                                </Card.Text>
                                    {ratingIndicator}
                                <Row>
                                    {inStcokIndicator}
                                </Row>
                                <Container className="mt-3">
                                    {/*buttons*/}
                                </Container>
                            </Card.Body>
                        </Col>
                    </Row>
                </Container>
                </Container>
            }
        </>
    )
}

export default ProductDetailsPage