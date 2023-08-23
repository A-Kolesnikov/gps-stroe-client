import './App.css';
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import { Routes, Route, Link } from 'react-router-dom'

import axios from 'axios';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Header from './pages/components/Header'
import NavBar from './pages/components/Navbar';
import Footer from './pages/components/Footer'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [authorised, setAuthorised] = useState(false)

  axios.defaults.withCredentials = true

  useEffect(() => {
    axios.get('http://localhost:3100/users/currentUser')
      .then(res => {
        if (!res.data.failure) {
          setCurrentUser(res.data)
        } else {
          setCurrentUser({})
        }
      })
  }, [authorised])

  const handleUserChange = (receivedUser) => { //not needed anymore with sessions
    setCurrentUser(receivedUser)
  }

  const handleAuthorisedChange = (status) => {
    setAuthorised(status)
  }

  const logout = () => {
    axios.get('http://localhost:3100/users/logout')
      .then(res => {
        setAuthorised(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Container fluid className='page d-flex flex-column'>
      <div className='row'>
        <Header currentUser={currentUser} logout={logout} />
      </div>
      <NavBar />
      
      <main className='row'>
        <Routes>
          <Route path='/' element={<HomePage currentUser={currentUser} />} />
          <Route path='/login' element={<LoginPage handleUserChange={handleUserChange} handleAuthorisedChange={handleAuthorisedChange} />} />
          <Route path='/register' element={<RegisterPage handleUserChange={handleUserChange} />} />
        </Routes>
      </main>

      <Footer />
    </Container>
  );
}

export default App;
