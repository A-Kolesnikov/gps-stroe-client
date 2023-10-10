import React, { useState, useEffect, useContext } from "react"
import { Container, Row, Col, Button } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"
import useFetch from "./hooks/useFetch"

import { useNavigate } from "react-router-dom"

import { ProductCardInCart } from "./components/ProductCards"
import createOrder from "../service/DAL/createOrder"

const serverUrl = process.env.REACT_APP_SERVER_URL
const currency = '€'

function CartPage() {

    const navigate = useNavigate()
    const { currentUser, currentCart, handleCartTrigger, handleOrdersTrigger } = useContext(UserContext)

    const productsURL = (() => {
        if (!currentCart || !currentCart[0]) return null
        return (
            `${serverUrl}/products/with-ids/${currentCart.map(item => item.product_id).join(',')}` //Here cart is mapped with id of product which had been deleted?
        )
    })()

    const { data: products, error: productsError, loading: productsLoading } = useFetch(productsURL)
    if (productsError) {
        console.error(productsError)
    }

    const [orderList, setOrderList] = useState([])
    const [unavailableProducts, setUnavailableProducts] = useState([])
    useEffect(() => {
        if (products && currentCart) {
            const unavailable = []
            const result = products.map((product) => {
                const cartItem = currentCart.find((item) => item.product_id === product.id)
                if (cartItem) {
                    if (cartItem?.quantity > product.units_in_stock) {
                        unavailable.push({ ...product, quantity: cartItem.quantity })
                    }
                    return { ...product, quantity: cartItem?.quantity }
                }
            })
            setUnavailableProducts([...unavailable])
            setOrderList([...result])
        }
    }, [products, currentCart])

    const totalPrice = (() => {
        if (!orderList || !orderList[0]) {
            return 0
        }
        const result = orderList.reduce((acc, item) => {
            const itemCost = item?.quantity * parseFloat(item?.price)
            return acc + itemCost
        }, 0)
        return (result.toFixed(2))
    })()

    const handleClick = async ()=>{
        try{
            await createOrder(currentUser.id, totalPrice, orderList)
            handleCartTrigger()
            handleOrdersTrigger()
            navigate('/user')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Container>
            <h1>Cart</h1>
            <Row>
                {productsLoading ?
                    <div>Loading products...</div> :
                    (!products || !products[0]) ?
                        <div>Cart is empty</div> :
                        products.map((product) => {
                            return (
                                <Col key={`byCategory-productID${product.id}`} xs={12} className="my-1">
                                    <ProductCardInCart product={product} />
                                </Col>
                            )
                        })
                }
            </Row>

            {(!orderList || !orderList[0] || !products) ? null :
                <>
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

                    {orderList.map((orderProduct) => { {/*Somehow null orderProduct gets here if I delete not 0th element*/}
                        return ( 
                            <Row key={`checkout${orderProduct?.id}`}>
                                <Col className="align-items-center">
                                    <div className="itemInCheckout">
                                        {orderProduct?.quantity} x <strong>{orderProduct?.name}</strong>
                                    </div>
                                    <div className="dotted-line"></div>
                                    <div className="priceInCheckout">
                                        <span>
                                            {(orderProduct?.quantity * parseFloat(orderProduct?.price) * (1 - orderProduct?.discount * 0.01)).toFixed(2)} {currency} {/*Temporary measure with .?*/}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })}

                    <Row className="my-3 d-flex justify-content-center">
                        {
                            (!unavailableProducts[0]) ?
                                <Button onClick={handleClick} as={Col} xs={8} lg={5} xxl={3}>Checkout</Button> :
                                <Col>
                                    Sorry! Not all items are available in the required quantity at the moment. To continue, please consider removing items from your cart or reducing the quantity of:
                                    <ul>
                                        {unavailableProducts.map(product =>
                                            <li key={`notEnough${product.id}`} className="text-danger">{product.name}</li>
                                        )}
                                    </ul>
                                </Col>
                        }
                    </Row>

                </>
            }


        </Container>
    )
}

export default CartPage