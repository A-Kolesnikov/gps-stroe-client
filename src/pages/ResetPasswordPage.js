import React, { useState } from "react";

import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

import { validateLogin } from "../service/validationManager";

import axios from "axios";

function ResetPasswordPage() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})
    const [serverResponse, setServerResponse] = useState()

    axios.defaults.withCredentials = true

    const navigate = useNavigate()

    const paramHook = useParams()
    const email = paramHook.email
    const token = paramHook.token

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        const currentErrors = validateLogin('', formData.password)
        setErrors(currentErrors)
        setServerResponse(null)
        if (!currentErrors.passwordError){
            console.log(formData.password, email)
            axios.post(`http://localhost:3100/users/reset-password`, {newPassword: formData.password, uniqueToken: token, requestingEmail: email})
            .then(result => {
                if (result.data.failure){
                    setServerResponse(result.data.failure)
                } else if (result.data.success) {
                    setServerResponse(result.data.success)
                }
            })
            .catch(err => console.log(err))
        }else{
            return 0
            /*axios.post('http://localhost:3100/users/login', formData)
            .then(result => {
                if(!result.data.failure){
                    //handleUserChange(result.data) //option without cookies
                    handleAuthorisedChange(false)//to rerender if some user was logged before
                    handleAuthorisedChange(true)
                    navigate('/')
                } else {
                    setServerResponse(result.data.failure)
                }
            })
            .catch(err => console.log(err))*/
        }
    }

    return (
        <Container>
            <h1>Password reset for {email}</h1>
            <Form>
                <Row>
                    <Form.Group controlId="formPassword" className="mt-5 mb-5">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "150px" }}>Pasword</InputGroup.Text>
                            <FormControl
                            required
                                name="password"
                                type="password"
                                placeholder="Enter new password"
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

                    <Form.Group controlId="formPasswordRepeat" className="mt-5 mb-5">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "150px" }}>Repeat password</InputGroup.Text>
                            <FormControl
                            required
                                name="repeatPassword"
                                type="text"
                                placeholder="Repeat new password"
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
                    <Button onClick={validateAndProceed} as={Col} xs md="2" variant="primary">Reset</Button>
                </Row>
                <Row className="justify-content-center mt-1">
                    <Col className="text-center" xs md="2">{serverResponse}</Col>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button onClick={()=>navigate('/login')} as={Col} xs md="2" variant="secondary">Cancel</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default ResetPasswordPage