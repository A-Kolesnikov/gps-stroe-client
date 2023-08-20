import React, { useState } from "react";

import { Container, Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";

//import { useNavigate } from "react-router-dom";

import { validateLogin } from "../service/validationManager";

import axios from "axios";

function RegisterPage({ handleUserChange}) {
    const [formData, setFormData] = useState({email: '', password: '', name: '', telephone: ''})

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(formData)
    }

    const validateAndProceed = (e) => {
        e.preventDefault()
        const currentErrors = validateLogin(formData.email, formData.password)
        if (Object.keys(currentErrors).length > 0){
            console.log(currentErrors)
            alert(`Please fill all the fields`)
        }else{
            console.log(formData)
            axios.post('http://localhost:3100/users/register', formData)
            .then(result => {
                if(!result.data.failure){
                    handleUserChange(result.data)
                    console.log(`Hurrraaaay! ${JSON.stringify(result.data)}`)
                } else {
                    console.log(result.data)
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
                    <Form.Group className="mt-5 mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Email</InputGroup.Text>
                            <FormControl
                                name="email"
                                type="text"
                                placeholder="Enter your email"
                                defaultValue={formData.email}
                                onBlur={handleChange}
                                autoComplete="current-email" //Should figure out how it works
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Password</InputGroup.Text>
                            <FormControl
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                defaultValue={formData.password}
                                onBlur={handleChange}
                                autoComplete="current-password" //Should figure out how it works
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Name</InputGroup.Text>
                            <FormControl
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                defaultValue={formData.Sname}
                                onBlur={handleChange}
                                autoComplete="current-username" //Should figure out how it works
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <InputGroup>
                            <InputGroup.Text style={{ width: "100px" }}>Telephone</InputGroup.Text>
                            <FormControl
                                name="telephone"
                                type="text"
                                placeholder="Enter your phone number"
                                defaultValue={formData.telephone}
                                onBlur={handleChange}
                                autoComplete="current-username" //Should figure out how it works
                            />
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="justify-content-center mt-5">
                    <Button onClick={validateAndProceed} as={Col} xs md="2" variant="primary">Login</Button>
                </Row>
            </Form>
        </Container>
    )
}

export default RegisterPage