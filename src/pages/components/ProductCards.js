import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap"

export function ProductCardVertical({ product }) {
    const currency = '€'
    const imageUrl = `${product.main_image}` /*?w=100&h=180*/ /* /100px180 */ /*not working sizing of ReactBootstrap*/

    const cardHeader = (() => {
        if (!product.tag) return <div className="my-3"></div>
        if (product.tag === 'sale') return (<Card.Header className="cardHeaderSale py-1" style={{ color: 'white' }} as="h5">SALE!!!</Card.Header>)
        if (product.tag === 'new') return (<Card.Header className="cardHeaderNewProduct py-1" style={{ color: 'white' }} as="h5">NEW</Card.Header>)
        return (<Card.Header as="h5">{product.tag}</Card.Header>)
    })()

    const priceStyling = product.units_in_stock > 0 ?
    { color: "green", fontSize: "x-large" }
    :
    { color: "grey", fontSize: "x-large" }

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
            {cardHeader}
            <Link to={`/product-details/${product.id}`} style={{ textDecoration: "none" }}>
                <Card.Img variant="top" src={imageUrl} style={{ width: "100%", height: "180px", objectFit: "contain" }} />
            </Link>
            <Card.Body className="d-flex flex-column"> {/*d-flex flex-column - to make buttons stay at the bottom*/}

                <Row className="flex-grow-1"> {/*flex-grow-1 - to make buttons stay at the bottom*/}
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

                <Row className="className=mt-auto"> {/*className=mt-auto - to make buttons stay at the bottom*/}
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
                <Row>
                    {product.units_in_stock > 0 ? <Button as={Col} className="mb-4 mx-2" variant="primary">Add to cart</Button> : null}
                </Row>
                <Row>
                    <Button as={Col} className="mx-2" variant="secondary">Add to wishlist</Button>
                </Row>

            </Card.Body>
        </Card>
    )
    /*return(
        <div 
        style={{border: "solid 1px black", margin: "10px", padding: "10px", height: "600px"}}>
            <h3>{product.name}</h3>
            <p className="fs-4">${product.price}</p>
            <img src={product.main_image} alt="Kartinka" style = {{display:"block", height:"150px", margin:"0 auto"}}/>
            <p>{product.short_description}</p>
        </div>
    )*/
}

