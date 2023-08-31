import './App.css';
import React, { useState, useEffect } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'

import { Routes, Route, Link } from 'react-router-dom'

import axios from 'axios';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage';
import Header from './pages/components/Header'
import NavBar from './pages/components/Navbar';
import Footer from './pages/components/Footer'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [authorised, setAuthorised] = useState(document.cookie.includes("user_token=")) //trigger for useEffect to rerender currentUser
  const [visitCounter, setVisitCounter] = useState('')

  axios.defaults.withCredentials = true // enable sending credentials (cookies) with cross-origin requests

  //Custom Hooks

  const handleAuthorisedChange = (status) => {
    setAuthorised(prevStatus => !prevStatus)
    setAuthorised(prevStatus => prevStatus === status ? prevStatus : status) //protection from wrong initial status
  }

  useEffect(() => {
    const controller = new AbortController() //prevents unstable behavior during fast multiple recall

    axios.get('http://localhost:3100/counter')  //counter is triggered each time, page refreshed. On login and logout we get request from server to delete session, then counter triggered by change authorised state
    .then(res => {
      setVisitCounter(Math.ceil((res.data.counts+1)/2)) // divide by 2 due to ReactStrictMode
    })

    axios.get('http://localhost:3100/users/currentUser')
      .then(res => {
        if (res.data.currentUser) {
          setCurrentUser({...res.data.currentUser})
          setAuthorised(true)
        } else {
          setCurrentUser(null)
          setAuthorised(false)
        }
      })

      return () => controller.abort() //cleanUp function - runs when component is unmount
  }, [authorised])

  /*const handleUserChange = (receivedUser) => { //not needed anymore with tokens
    setCurrentUser(receivedUser)
  }*/

  const logout = () => {
    axios.get('http://localhost:3100/users/logout')
      .then(res => {
        handleAuthorisedChange(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Container fluid className='page d-flex flex-column'>
      <div className='row'>
        <Header currentUser={currentUser} logout={logout} />
      </div>
      <NavBar />
      <div>
        Visits: {visitCounter}
      </div>

      <main className='row'>
        <Routes>
          <Route path='/' element={<HomePage currentUser={currentUser} />} />
          <Route path='/login' element={<LoginPage handleAuthorisedChange={handleAuthorisedChange}/>} />
          <Route path='/register' element={<RegisterPage handleAuthorisedChange={handleAuthorisedChange} />} />
          <Route path='/reset-password/:email/:token' element={<ResetPasswordPage />} />
        </Routes>
      </main>

      <Footer />
    </Container>
  );
}

export default App;
