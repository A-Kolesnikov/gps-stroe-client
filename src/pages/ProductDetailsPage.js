import React, { useState, useEffect } from "react"
import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom"

import { Container, Row, Col } from "react-bootstrap"

function ProductDetailsPage() {

    const paramHook = useParams()
    const id = paramHook.id
    return(
        <div><h1>Product {id} Details</h1></div>
    )
}

export default ProductDetailsPage