import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

import CollapsableTree from "./CollapsableTree"

function Sidebar({ treeOfCategories }){
    const tree = []
    function createHierarchy (arr, depth = 0){
        
        for (const element of arr){
            if (!element.children){
                tree.push(<div key={element.id}>{element.name} lvl{depth}</div>) 
            } else {
                    tree.push (<div key={element.id}>{element.name}</div>)
                    {createHierarchy(element.children, depth+1)}
            }
        }
    }
    createHierarchy(tree)
    const location = useLocation()
    if (location.pathname !== '/login' && location.pathname !== '/register'){
        return(
            <Container fluid>
                Categories:
                {/*!treeOfCategories ? <h5>Loading...</h5> : treeOfCategories.map((item)=>{return (!item.children ? <p key={item.id}>{item.name}</p> : <p>parent</p>)})*/}
                {!treeOfCategories ? <h5>Loading...</h5> : <CollapsableTree data={treeOfCategories}/>/*tree.map((item)=>{return item})*//*createHierarchy(treeOfCategories)*/}
            </Container>
        )
    } else return<></>
}

export default Sidebar