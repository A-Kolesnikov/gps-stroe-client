import './App.css';
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Routes, Route, Link } from 'react-router-dom'

import axios from 'axios'
import Cookies from 'js-cookie' //npm i js-cookie

import Context from './pages/hooks/contexts/Context'
import UserContextProvider, { UserContext } from './pages/hooks/contexts/userContext';

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'

import Header from './pages/components/Header'
import NavBar from './pages/components/Navbar'
import Footer from './pages/components/Footer'
import Sidebar from './pages/components/Sidebar'

import { createTree } from './service/treeOperations'

import useFetch from './pages/hooks/useFetch'
import useCookies from './pages/hooks/useCookies'
import useCurrentUser from './pages/hooks/useCurrentUser'

const serverUrl = process.env.REACT_APP_SERVER_URL

function App() {

  const { data: categoriesArr, error: categoriesError, loading: categoriesLoading } = useCookies('categories', `${serverUrl}/categories`)
  const categoriesTree = (!categoriesArr ? null : createTree(categoriesArr))

  return (
    <UserContextProvider>

      <Container fluid className='page d-flex flex-column'>
        <div className='row'>
          <Header /> {/*currentUser={currentUser} logout={logout} */}
        </div>
        <NavBar />

        <main className='row'>
          <Col className='d-none d-lg-block' lg={2}>
            <Sidebar categoriesTree={categoriesTree} />
          </Col>
          <Col lg={10} xs={12}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/reset-password/:email/:token' element={<ResetPasswordPage />} />
              <Route path='/product-details/:id' element={<ProductDetailsPage />} />
              <Route path='/products/:categoryID' element={<ProductsPage categoriesTree={categoriesTree} />} />
              <Route path='/cart' element = {<CartPage />} />
            </Routes>
          </Col>
        </main>

        <Footer />
      </Container>
    </UserContextProvider>
  )
}

export default App