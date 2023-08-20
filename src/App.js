import './App.css';
import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import { Routes, Route, Link } from 'react-router-dom'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentUser, setCurrentUser] = useState({})

  const handleUserChange = (receivedUser)=>{
    setCurrentUser(receivedUser)
    console.log(`Yep we did it!`)
  }

  return (
    <Container fluid>
      <h1>Welcome to GPS-store!</h1>
      <Row>
        <Col><Link to="/">Home</Link></Col>
        <Col><Link to="/login">Login</Link></Col>
        <Col><Link to="/register">Register</Link></Col>
      </Row>
      <Routes>
        <Route path = '/' element = {<HomePage currentUser={currentUser} />} />
        <Route path = '/login' element = {<LoginPage handleUserChange = {handleUserChange} />} />
        <Route path = '/register' element = {<RegisterPage handleUserChange = {handleUserChange} />} />
      </Routes>
    </Container>
  );
}

export default App;
