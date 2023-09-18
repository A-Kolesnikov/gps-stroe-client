import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { Button, Card, Col, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faStarHalfStroke, faCheck, faXmark, faTriangleExclamation, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons"

import { UserContext } from "../hooks/contexts/userContext"

//Defining common elements for all types of cards
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

function createInCartIndicator (piecesInCart){
    if(!piecesInCart){
        return null
    }
    return(
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

export function ProductCardVertical({ product }) {

    const { currentCart, handleCartTrigger } = useContext(UserContext)
    const isInCart = currentCart?.find(item => item.product_id == product.id)
    const piecesInCart = !isInCart ? 0 : isInCart.quantity

    const imageUrl = `../${product.main_image}` /*?w=100&h=180*/ /* /100px180 */ /*not working sizing of ReactBootstrap*/
    const cardHeader = createCardHeader(product)
    const priceStyling = createPriceStyling(product)
    const inStcokIndicator = createInStockIndicator(product)
    const buttons = createButtons(product)
    const ratingIndicator = createRatingIndicator(product)
    const inCartIndicator = createInCartIndicator(piecesInCart)


    return (
        <Card className="h-100"> {/*h-100 - to make cards in a row of a same hight*/}

            {cardHeader}
            <Link to={`/product-details/${product.id}`}>
                <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
            </Link>
            <Card.Body className="d-flex flex-column"> {/*d-flex flex-column - to make buttons stay at the bottom*/}

                <Row className="flex-grow-1"> {/*flex-grow-1 - to make buttons stay at the bottom*/}
                    <Link to={`/product-details/${product.id}`} className="blackTextLink">
                        <Card.Title
                            className="text-xl overflow-hidden"
                            style={{ maxHeight: "5.5rem" }}
                            title={product.name}>
                            {product.name}
                        </Card.Title>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Subtitle>{`Reference: ${product.reference}`}</Card.Subtitle>
                            </Col>
                            {ratingIndicator}
                        </Row>
                        <Card.Text
                            className=" text-xl overflow-hidden ellipsis" /*FIND WHY ELLIPSIS NOT WORKING HERE??!!*//*FIND WHY text-xl NOT WORKING HERE?*/
                            style={{ maxHeight: "3rem" }}
                            title={product.short_description}> {/*maybe create cusom tooltip component for bettrer visibility*/}
                            {product.short_description}
                        </Card.Text>
                    </Link>
                </Row>

                <Row className="className=mt-auto"> {/*className=mt-auto - to make buttons stay at the bottom*/}

                    {inCartIndicator}
                    {inStcokIndicator}
                    <Card.Text className="mb-2 text-center">
                        <span style={{ color: "red", fontSize: "x-large", textDecoration: "line-through" }}>
                            {product.discount > 0 ? `${parseFloat(product.price).toFixed(2)} ` : null}
                        </span>
                        <span style={priceStyling}>
                            {(product.price * (1 - product.discount / 100)).toFixed(2)} {currency}
                        </span>
                    </Card.Text>
                </Row>

                {/*buttons*/}
                <div className="d-grid gap-2">
                    {(product.units_in_stock > 0 && product.units_in_stock > piecesInCart) ?
                        <Button onClick={() => handleCartTrigger('add', product.id)} as={Col} variant="primary" disabled>Add to cart</Button> :
                        <Button as={Col} variant="secondary" active>No enough items to add</Button>} {/*className="mb-4 mx-2" */}
                    <Button as={Col} variant="secondary">Add to wishlist</Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export function ProductCardHorizontal({ product }) {

    const { currentCart, handleCartTrigger } = useContext(UserContext)
    const isInCart = currentCart?.find(item => item.product_id == product.id)
    const piecesInCart = !isInCart ? 0 : isInCart.quantity

    const imageUrl = `../${product.main_image}` /*?w=100&h=180*/ /* /100px180 */ /*not working sizing of ReactBootstrap*/
    const cardHeader = createCardHeader(product)
    const priceStyling = createPriceStyling(product)
    const inStcokIndicator = createInStockIndicator(product)
    const buttons = createButtons(product)
    const ratingIndicator = createRatingIndicator(product)
    const inCartIndicator = createInCartIndicator(piecesInCart)

    return (
        <Card className="h-100"> {/*h-100 - to make cards in a row of a same hight*/}
            <Row className="gx-2"> {/*to avoid appearance horizontal scrolling when zoomed by hover*/}
                <Col xs={2}>
                    {cardHeader}
                    <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none" }}>
                        <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
                    </Link>
                </Col>
                <Col xs={10}>
                    <Card.Body> {/*d-flex flex-column - to make buttons stay at the bottom*/}
                        <Row>
                            <Col xs={8}>
                                <Row> {/*flex-grow-1 - to make buttons stay at the bottom*/}
                                    <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                                        <Card.Title
                                            className="overflow-hidden  ellipsis"
                                            style={{ maxHeight: "5.5rem" }}
                                            title={product.name}>
                                            {product.name}
                                        </Card.Title>
                                        <Row className="align-items-center">
                                            <Col>
                                                <Card.Subtitle>{`Reference: ${product.reference}`}</Card.Subtitle>
                                            </Col>
                                            {ratingIndicator}
                                        </Row>
                                        <Card.Text
                                            className="overflow-hidden ellipsis" /*WHY ELLIPSIS NOT WORKING HERE??!!*/
                                            style={{ maxHeight: "6rem" }}
                                            title={product.short_description}> {/*maybe create cusom tooltip component for bettrer visibility*/}
                                            {product.short_description}
                                        </Card.Text>
                                    </Link>
                                </Row>
                            </Col>

                            <Col xs={4}>
                                <Row > {/*className=mt-auto - to make buttons stay at the bottom*/}
                                    {inCartIndicator}
                                    {inStcokIndicator}
                                    <Card.Text className="mb-2 text-center">
                                        <span style={{ color: "red", fontSize: "x-large", textDecoration: "line-through" }}>
                                            {product.discount > 0 ? `${parseFloat(product.price).toFixed(2)} ` : null}
                                        </span>
                                        <span style={priceStyling}>
                                            {(product.price * (1 - product.discount / 100)).toFixed(2)} {currency}
                                        </span>
                                    </Card.Text>
                                </Row>

                                {/*buttons*/}
                                <div className="d-grid gap-2">
                                    {(product.units_in_stock > 0 && product.units_in_stock > piecesInCart) ?
                                        <Button onClick={() => handleCartTrigger('add', product.id)} as={Col} variant="primary" disabled>Add to cart</Button> :
                                        <Button as={Col} variant="secondary" active>No enough to add</Button>} {/*className="mb-4 mx-2" */}
                                    <Button as={Col} variant="secondary">Add to wishlist</Button>
                                </div>
                            </Col>
                        </Row>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}

export function ProductCardAdaptive({ product }) { //not finished

    const imageUrl = `${product.main_image}` /*?w=100&h=180*/ /* /100px180 */ /*not working sizing of ReactBootstrap*/

    const cardHeader = (() => {
        if (!product.tag) return <div className="my-3"></div>
        if (product.tag === 'sale') return (<Card.Header className="cardHeaderSale py-1" style={{ color: 'white' }} as="h5">SALE</Card.Header>)
        if (product.tag === 'new') return (<Card.Header className="cardHeaderNewProduct py-1" style={{ color: 'white' }} as="h5">NEW</Card.Header>)
        return (<Card.Header as="h5">{product.tag}</Card.Header>)
    })()

    const priceStyling = createPriceStyling(product)/*product.units_in_stock > 0 ?
        { color: "green", fontSize: "x-large" }
        :
        { color: "grey", fontSize: "x-large" }*/

    const inStcokIndicator = product.units_in_stock > 0 ?
        <Card.Text className="text-center mt-3 mb-1" title={`${product.units_in_stock} pcs`}>
            In stock
        </Card.Text>
        :
        <Card.Text className="text-center mt-3 mb-1">
            Out of stock
        </Card.Text>

    return (
        <Card className="h-100"> {/*h-100 - to make cards in a row of a same hight*/}
            <Row className="gx-2 flex-fill"> {/*to avoid appearance horizontal scrolling when zoomed by hover*/}
                <Col xs={2} lg={12}>
                    {cardHeader}
                    <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none" }}>
                        <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
                    </Link>
                </Col>
                <Col xs={10} lg={12} className="d-flex flex-fill flex-column">
                    <Card.Body className="d-flex flex-fill flex-column"> {/*d-flex flex-column - to make buttons stay at the bottom*/}
                        <Row className="d-flex flex-fill flex-column">
                            <Col xs={8} lg={12} className="d-flex flex-fill flex-column">
                                <Row> {/*flex-grow-1 - to make buttons stay at the bottom*/}
                                    <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none", color: "black" }}>
                                        <Card.Title
                                            className="overflow-hidden"
                                            style={{ maxHeight: "5.5rem" }}
                                            title={product.name}>
                                            {product.name}
                                        </Card.Title>
                                        <Card.Subtitle>{`Reference: ${product.reference}`}</Card.Subtitle>
                                        <Card.Text
                                            className="overflow-hidden ellipsis" /*WHY ELLIPSIS NOT WORKING HERE??!!*/
                                            style={{ maxHeight: "3rem" }}
                                            title={product.short_description}> {/*maybe create cusom tooltip component for bettrer visibility*/}
                                            {product.short_description}
                                        </Card.Text>
                                    </Link>
                                </Row>
                            </Col>

                            <Col xs={4} lg={12}>
                                <Row > {/*className=mt-auto - to make buttons stay at the bottom*/}
                                    {inStcokIndicator}
                                    <Card.Text className="mb-4 text-center">
                                        <span style={{ color: "red", fontSize: "x-large", textDecoration: "line-through" }}>
                                            {product.discount > 0 ? `${parseFloat(product.price).toFixed(2)} ` : null}
                                        </span>
                                        <span style={priceStyling}>
                                            {(product.price * (1 - product.discount / 100)).toFixed(2)} {currency}
                                        </span>
                                    </Card.Text>
                                </Row>

                                <Row >
                                    {product.units_in_stock > 0 ? <Button as={Col} className="mb-4 mx-2" variant="primary">Add to cart</Button> : null}
                                </Row>
                                <Row>
                                    <Button as={Col} className="mx-2" variant="secondary">Add to wishlist</Button>
                                </Row>
                            </Col>
                        </Row>

                    </Card.Body>
                </Col>
            </Row>
        </Card>
    )
}