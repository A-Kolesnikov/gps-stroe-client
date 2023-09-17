import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap"

import { UserContext } from "./hooks/contexts/userContext"

import { validateRegister } from "../service/validationManager"

import axios from "axios"
axios.defaults.withCredentials = true
const serverUrl = process.env.REACT_APP_SERVER_URL

function RegisterPage() {
    const { handleUserTrigger } = useContext(UserContext)
    const [formData, setFormData] = useState({email: '', password: '', name: '', telephone: ''})
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
        const currentErrors = validateRegister(formData.email, formData.password, formData.name) //add telephone validation
        setErrors(currentErrors)
        setServerResponse(null)
        if (Object.keys(currentErrors).length > 0){
            return null
        }else{
            axios.post(`${serverUrl}/users/register`, formData)     //receiving user_token as response
            .then(result => {
                if(!result.data.failure){   //refactor to response status check
                    handleUserTrigger()
                    console.log(`Registered succesfully! ${JSON.stringify(result.data)}`)
                    navigate('/')
                } else {
                    setServerResponse(result.data?.failure)
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <Container>
            <h1>Register page</h1>
            <Form>
                <Row>
                    <Form.Group controlId="formEmail" className="mt-5 mb-3">
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
                                autoComplete="current-email" //Optimise autocomplete
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.emailError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Password</InputGroup.Text>
                            <FormControl
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

                    <Form.Group controlId="formName" className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Name</InputGroup.Text>
                            <FormControl
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                defaultValue={formData.name}
                                isInvalid={errors.nameError}
                                onBlur={handleChange}
                                autoComplete="current-name"
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.nameError}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formTelephone" className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Telephone</InputGroup.Text>
                            <FormControl
                                name="telephone"
                                type="text"
                                placeholder="Enter your phone number"
                                defaultValue={formData.telephone}
                                onBlur={handleChange}
                                autoComplete="current-username"
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button onClick={validateAndProceed} as={Col} xs md="2" variant="primary">Register</Button>
                </Row>
                <Row className="justify-content-center mt-1">
                    <Col className="text-center" xs md="2">{serverResponse}</Col>
                </Row>
            </Form>
        </Container>
    )
}

export default RegisterPage