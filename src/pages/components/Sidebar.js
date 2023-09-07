import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

function Sidebar({ categories }){
    const location = useLocation()
    if (location.pathname !== '/login' && location.pathname !== '/register'){
        return(
            <Container fluid>
                Categories:
                {!categories ? <h5>Loading...</h5> : categories[0]/*.map((item)=>{return<p key={item.id}>{item.name}</p>})*/}
                
            </Container>
        )
    } else return<></>
}

export default Sidebar