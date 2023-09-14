import React, { useState, useEffect } from "react"
import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom"

import { Container, Row, Col } from "react-bootstrap"

import defineSubTree from "../service/defineSubTree"
import { collectChildrenIDs } from "../service/treeOperations"

const serverUrl = process.env.REACT_APP_SERVER_URL

function ProductsPage({ categoriesArr, categoriesTree }) {
    const paramHook = useParams()
    const categoryID = parseInt(paramHook.categoryID)
    const mainCategoriesTree = { id: -1, name: 'All Categories', children: categoriesTree }

    const [currentCategory, setCurrentCategory] = useState(null)
    useEffect(() => {
        if (categoriesTree) {
            setCurrentCategory(
                defineSubTree(mainCategoriesTree, categoryID)
            )
        }
    }, [categoryID])

    const productsURL = (() => {
        if (!currentCategory) return null
        if (currentCategory.id === -1) return `${serverUrl}/products/`
        return (
            `${serverUrl}/products/of-category/${collectChildrenIDs(currentCategory).join(',')}`
            )
    })()

    const { data: products, error: productsError, loading: productsLoading } = useFetch(productsURL)
    console.log(products)


    return (
        <div><h1>{currentCategory?.name}</h1></div>
    )
}

export default ProductsPage