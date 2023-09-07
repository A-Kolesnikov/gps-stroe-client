import React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Container, Row, Col, Button } from "react-bootstrap"

function Sidebar({ categories }){
    return(
        <Container fluid>
            Categories:
            {!categories ? <h5>Loading...</h5> : categories.map((item)=>{return<p key={item.id}>{item.name}</p>})}
            
        </Container>
    )
}

export default Sidebar