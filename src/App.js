import './App.css';
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'

import { Routes, Route, Link } from 'react-router-dom'

import axios from 'axios';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [authorised, setAuthorised] = useState(false)

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get('http://localhost:3100/users/currentUser')
    .then(res => {
      if (!res.data.failure){
        setCurrentUser(res.data)
      } else {
        setCurrentUser({})
      }
    })
  }, [authorised])

  const handleUserChange = (receivedUser)=>{ //not needed anymore with sessions
    setCurrentUser(receivedUser)
    console.log(`Yep we did it!`)
  }

  const handleAuthorisedChange = () => {
    setAuthorised(!authorised)} //should use prevAuthorised
  
  const logout = () => {
    alert("LOGGING OUT")
    axios.get('http://localhost:3100/users/logout')
    .then(res => {
      setAuthorised(!authorised)
    })
    .catch(err => console.log(err))
  }

  return (
    <Container fluid>
      <h1>Welcome to GPS-store!</h1>
      <Row>
        <Col><Link to="/">Home</Link></Col>
        <Col><Link to="/login">Login</Link></Col>
        <Col><Link to="/register">Register</Link></Col>
        <Col><Button onClick={logout}>Logout</Button></Col>
      </Row>
      <Routes>
        <Route path = '/' element = {<HomePage currentUser={currentUser} />} />
        <Route path = '/login' element = {<LoginPage handleUserChange = {handleUserChange} handleAuthorisedChange={handleAuthorisedChange} />} />
        <Route path = '/register' element = {<RegisterPage handleUserChange = {handleUserChange} />} />
      </Routes>
    </Container>
  );
}

export default App;
