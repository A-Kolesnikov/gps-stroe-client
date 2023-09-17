import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"

import { validateLogin, validateEmail } from "../service/validationManager"

import axios from "axios"
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

function LoginPage() {
    const { handleUserTrigger } = useContext(UserContext)
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [serverResponse, setServerResponse] = useState()

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        const currentErrors = validateLogin(formData.email, formData.password)
        setErrors(currentErrors)
        setServerResponse(null)
        if (Object.keys(currentErrors).length > 0){
            return null
        } else {
            axios.post(`${serverUrl}/users/login`, formData)   //receiving user_token as response
            .then(result => {
                if(!result.data.failure){   //refactor to response status check
                    handleUserTrigger()
                    navigate('/')
                } else {
                    setServerResponse(result.data?.failure)  //refactor to response status check
                }
            })
            .catch(err => console.log(err))
        }
    }

    const resetPassword = (e) => {
        e.preventDefault()
        const currentErrors = validateEmail(formData.email)
        setErrors(currentErrors)
        if (!currentErrors.emailError){
            axios.post(`${serverUrl}/users/forgot-password`, {emailToReset: formData.email})
            .then(result => {
                if (result.data.failure){   //refactor to response status check
                    setServerResponse(result.data.failure)
                } else if (result.data.success){    //refactor to response status check
                    setServerResponse(result.data.success)
                }
            })
            .catch(err => console.log(err))
        } else {
            return 0
        }
    }

    return (
        <Container>
            <h1>Login page</h1>
            <Form>
                <Row>
                    <Form.Group controlId="formEmail" className="mt-5 mb-5">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Email</InputGroup.Text>
                            <FormControl
                                required
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                defaultValue={formData.email}
                                isInvalid={errors.emailError}
                                onBlur={handleChange}
                                autoComplete="current-email"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.emailError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Password</InputGroup.Text>
                            <FormControl
                            required
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                defaultValue={formData.password}
                                isInvalid={errors.passwordError}
                                onBlur={handleChange}
                                autoComplete="current-password"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button onClick={validateAndProceed} as={Col} xs md="2" variant="primary">Login</Button>
                </Row>
                <Row className="justify-content-center mt-1">
                    <Col className="text-center" xs md="2">{serverResponse}</Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button onClick={resetPassword} as={Col} xs md="2" variant="secondary">Reset password</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default LoginPage