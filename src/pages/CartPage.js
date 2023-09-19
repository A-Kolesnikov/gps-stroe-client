import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"
import useFetch from "./hooks/useFetch"

import { ProductCardInCart, ProductCardHorizontal } from "./components/ProductCards"

const serverUrl = process.env.REACT_APP_SERVER_URL
const currency = '€'

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

    const orderProducts = products?.map((product) => {
        const cartItem = currentCart?.find((item) => item.product_id === product.id)
        if (cartItem) {

            return { ...product, quantity: cartItem.quantity }
        }
    })

    const [orderList, setOrderList] = useState([])
    const [unavailableProducts, setUnavailableProducts] = useState([])
    useEffect(() => {
        if (products && currentCart) {
            const unavailable = []
            const result = products.map((product) => {
                const cartItem = currentCart.find((item) => item.product_id === product.id)
                if (cartItem) {
                    if(cartItem.quantity > product.units_in_stock){
                        unavailable.push(product)
                    }
                    return { ...product, quantity: cartItem.quantity }
                }
            })

            setUnavailableProducts([...unavailable])
            setOrderList([...result])
        }

    }, [products, currentCart])

console.log(unavailableProducts)

    const totalPrice = (() => {
        if (!orderList || !orderList[0]) {
            return 0
        }
        const result = orderList.reduce((acc, item) => {
            const itemCost = item.quantity * parseFloat(item.price)
            return acc + itemCost
        }, 0)
        return (result.toFixed(2))
    })()

    //const [unavailableProducts, setUnavailableProducts] = useState([])
    /*const unavailableProducts2 = []
    if (orderProducts && orderProducts[0]){
        for (const item of orderProducts){
            if (item.quantitty > item.units_in_stock){
                unavailableProducts.push(item)
            }
        }
    }
    console.log(unavailableProducts)*/


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
                                <Col key={`byCategory-productID${product.id}`} xs={12} className="my-1">
                                    <ProductCardInCart product={product} />
                                </Col>
                            )
                        })
                }
            </Row>
            {!orderProducts ? null :
                <Row>
                    <Col className="align-items-center">
                        <div className="itemInCheckout">
                            <h3>Total:</h3>
                        </div>
                        <div className="dotted-line"></div>
                        <div className="priceInCheckout">
                            <h5>{totalPrice} {currency}</h5>
                        </div>
                    </Col>
                </Row>
            }

            {/*!orderProducts ? null :
                orderProducts.map((orderProduct) => {
                    if(orderProduct.quantity > orderProduct.units_in_stock){
                    }
                    return (
                        <Row key={`checkout${orderProduct.id}`}>
                            <Col className="align-items-center">
                                <div className="itemInCheckout">
                                    <p>{orderProduct.quantity} pcs</p>
                                    <strong>{orderProduct.name}</strong>
                                </div>
                                <div className="dotted-line"></div>
                                <div className="priceInCheckout">
                                    <span>
                                        {(orderProduct.quantity * parseFloat(orderProduct.price)*(1-orderProduct.discount*0.01)).toFixed(2)} {currency}
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    )
                })
            */}

        </Container>
    )
}

export default CartPage