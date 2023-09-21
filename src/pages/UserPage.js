import React, { useContext, Fragment } from "react"
import { Container, Row, Col, Button, Image } from "react-bootstrap"

import useFetch from "./hooks/useFetch"

import { UserContext } from "./hooks/contexts/userContext"

const serverUrl = process.env.REACT_APP_SERVER_URL
const currency = '€'

function UserPage() {

    const { currentUser, currentCart, currentOrders } = useContext(UserContext)
    const { data: userData, error: userError } = useFetch(`${serverUrl}/users/${currentUser?.id}`)
    return (
        <>
            {!currentUser ?
                <h1>Please log in to see user details</h1> :
                <Container>
                    <Row className="m-4">
                        <h2>User name:</h2>
                        <h5>{currentUser?.name}</h5>
                    </Row>
                    <Row className="m-4">
                        <h2>Email:</h2>
                        <h5>{currentUser?.email}</h5>
                    </Row>

                    {!userData || !userData[0]?.telephone ? null :
                        <Row className="m-4">
                            <h2>Phone number:</h2>
                            <h5>
                                {userData[0]?.telephone}
                            </h5>
                        </Row>
                    }

                    {!currentOrders || !currentOrders[0] ? null :
                        <Row className="m-4 mt-5">
                            <h1>Orders history:</h1>
                            {currentOrders.map((order) => {
                                return (
                                    <Fragment key={`orders${order?.id}`}>

                                        <Row className="mt-5" >
                                            <h3>Order #{order?.id}</h3>
                                            <p>{order?.date.substring(0, 10)} ({order?.date.substring(11, 16)})</p>
                                        </Row>

                                        <Row>
                                            <Col className="align-items-center">
                                                <div className="itemInCheckout">
                                                    <h3>Total:</h3>
                                                </div>
                                                <div className="dotted-line"></div>
                                                <div className="priceInCheckout">
                                                    <h5>{order?.total_price} {currency}</h5>
                                                </div>
                                            </Col>

                                            {order.itemList.map((orderProduct) => {
                                                return (
                                                    <Row key={`checkout${orderProduct.product_id}`}>
                                                        <Col className="align-items-center">
                                                            <div className="itemInCheckout">
                                                                {orderProduct.quantity} x <strong>{orderProduct.product_name}</strong>
                                                            </div>
                                                            <div className="dotted-line"></div>
                                                            <div className="priceInCheckout">
                                                                <span>
                                                                    {(orderProduct.quantity * parseFloat(orderProduct.product_price)).toFixed(2)} {currency}
                                                                </span>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                )
                                            })}
                                        </Row>
                                    </Fragment>
                                )
                            })}
                        </Row>

                    }

                </Container>}
        </>
    )
}

export default UserPage