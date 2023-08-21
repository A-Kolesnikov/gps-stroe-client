import React, { useState } from "react";

import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { validateLogin } from "../service/validationManager";

import axios from "axios";

function LoginPage({ handleUserChange, handleAuthorisedChange }) {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [serverResponse, setServerResponse] = useState()

    axios.defaults.withCredentials = true

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
            return 0
        }else{
            axios.post('http://localhost:3100/users/login', formData)
            .then(result => {
                if(!result.data.failure){
                    /*handleUserChange(result.data)
                    console.log(`Hurrraaaay! ${JSON.stringify(result.data)}`)*/
                    handleAuthorisedChange()
                    console.log(result.data)
                    navigate('/')
                } else {
                    setServerResponse(result.data.failure)
                    console.log(result.data)
                }
            })
            .catch(err => console.log(err))
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
                                autoComplete="current-email" //Should figure out how it works
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
                                autoComplete="current-password" //Should figure out how it works
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
                <Row className="justify-content-center mt-5">
                    <Col className="text-center" xs md="2">{serverResponse}</Col>
                </Row>
            </Form>
        </Container>
    )
}

export default LoginPage