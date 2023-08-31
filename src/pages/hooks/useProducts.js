import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.withCredentials = true // why we need it?

export default function useProducts (rootSuffix = '') {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchedData = axios.get(`http://localhost:3100/products${rootSuffix}`)
        fetchedData.then(res => {
            setProducts(res.data)
        })
    }, [])
}