import React, { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"
import useFetch from "./hooks/useFetch"

import ProductCardAdaptiveComplect from "./components/ProductCardAdaptiveComplect"
import { ProductCardInCart, ProductCardHorizontal } from "./components/ProductCards"

const serverUrl = process.env.REACT_APP_SERVER_URL

function CartPage() {
    const { currentUser, currentCart, handleCartTrigger } = useContext(UserContext)

    const productsURL = (() => {
        if (!currentCart || !currentCart[0]) return null
        return (
            `${serverUrl}/products/with-ids/${currentCart.map(item => item.product_id).join(',')}`
        )
    })()

    const { data: products, error: productsError, loading: productsLoading } = useFetch(productsURL)
    if (productsError) {
        console.log(productsError)
    }

    return (
        <Container>
            <h1>Cart</h1>
            <Row>
                {productsLoading ?
                    <div>Loading products...</div> :
                    (!products || !products[0]) ?
                        <div>No products available</div> :
                        products.map((product) => {
                            return (
                                <Col key={`byCategory-productID${product.id}`} xxl={3} lg={6} xxs={12} className="my-1">
                                    <ProductCardInCart product={product} />
                                </Col>
                            )
                        })
                }
            </Row>
        </Container>
    )
}

export default CartPage