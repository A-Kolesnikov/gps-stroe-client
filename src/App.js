import './App.css';
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'

import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Container fluid>
      <h1>Welcome to GPS-store!</h1>
      <Routes>
        <Route path = '/' element = {<HomePage />} />
        <Route path = '/login' element = {<LoginPage />} />
      </Routes>
    </Container>
  );
}

export default App;
