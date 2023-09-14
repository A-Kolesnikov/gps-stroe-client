import React, { useState, useEffect } from "react"
import useFetch from "./hooks/useFetch"
import { useParams } from "react-router-dom"

import { Container, Row, Col } from "react-bootstrap"


const serverUrl = process.env.REACT_APP_SERVER_URL



function ProductsPage({ categoriesArr, categoriesTree }) {
    const paramHook = useParams()
    const categoryID = parseInt(paramHook.categoryID)
    const mainCategoriesTree = { id: -1, name: 'All Categories', children: categoriesTree }
    console.log(mainCategoriesTree)

    function defineTree(tree) {
        let result = null
        function findCurrentInTree(tree) {
            console.log(`I am in:`)
            console.log(tree)
            console.log(categoryID)
            if (tree.id == categoryID){
                result = tree
                return 
            } else if (tree.children) {
                for (const child of tree.children) {
                    findCurrentInTree(child)
                }
            }
            return
        }
        findCurrentInTree(tree)
        return result
    }

    const [currentCategory, setCurrentCategory] = useState(null)
    useEffect(() => {
        /*if (categoriesArr && categoriesArr[0]){
            setCurrentCategory(categoriesArr.find(item => item.id == categoryID))
            }*/
        if (categoriesTree) {
            setCurrentCategory(
                defineTree(mainCategoriesTree)
            )
        }

    }, [categoryID])

    const subCategoriesRequest = (() => {
        if (categoryID == -1) return []
        if (!currentCategory) return null
        return categoriesArr/*.find(item => item.id == categoryID).hierarchy.split('-')*/.filter((element) => { element.hierarchy.split('-').includes(currentCategory.id.toString()) })
    })()

    /*!currentCategory ? null : (
        currentCategory.id < 1 ? [] : ( //case of "all categories level"
            categoriesArr.map((element) => {
                if(element.hierarchy.split('-').includes(currentCategory.id)) //valid for current category and all its children
                {return element}
            })
        )
    )*/



    const { data: products, error: productsError, loading: productsLoading } = useFetch(`${serverUrl}/products/of-category/3`)
    //console.log(products)


    return (
        <div><h1>{currentCategory?.name}</h1></div>
    )
}

export default ProductsPage