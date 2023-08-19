import React, { useState, useEffect } from "react";

import axios from "axios";

import ProductCardVertical from "./components/ProductCardVertical";

function HomePage(){
    const data = axios.get('http://localhost:3100/products')
    data.then(res => {
        console.log(res.data)
    })
    const [products, setProducts] = useState([])
    return(
        <div>
            <h2>Home page</h2>
            <ProductCardVertical products={products}/>
        </div>
    )
}

export default HomePage