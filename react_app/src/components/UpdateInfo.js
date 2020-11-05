import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button,Container, Row, Col, Form } from 'react-bootstrap';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './UpdateInfo.css'
import Header from '../header';
import Footer from '../footer';

export default function UpdateInfo(props) {
    const { handleSubmit, register, control, errors } = useForm({});

    const onSubmit = data => {
        var datePic = moment(data.ReactDatepicker).utc().format('MM/DD/YYYY')
        console.log(datePic)
        axios.put('https://liltaiapi.herokuapp.com/user/' + props.username, {
            last_name: data.lastName,
            first_name: data.firstName,
            dob: datePic,
            gender: data.gender,
            occupation: data.occupation,
            address: data.address,
            email: data.email,
            phone_number: data.phone_number
        })
    };

    const onReset = data => {
        console.log(data.password)
        if (data.Confirmpassword === data.password) {
            axios.put('https://liltaiapi.herokuapp.com/forgot/' + props.username, {
                password: data.password
            })
        } else {
            alert("passswrong")
        }
    }

    return (
        <div>
            <Header user={props.user} isAuthenticated={props.isAuthenticated}></Header>
            <div style={{ marginTop: "100px" }}>
                <Container>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group as={Row} controlId="formPlaintextFirstName">
                            <Form.Label column sm="2">
                                First Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="First name" name="firstName" ref={register} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formPlaintextLastName">
                            <Form.Label column sm="2">
                                Last name
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Last name" name="lastName" ref={register} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextDob">
                            <Form.Label column sm="2">
                                Date of birth
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Date of birth" name="dob" ref={register} />
                                <Controller
                                    placeholder="Date of Birth"
                                    control={control}
                                    name="ReactDatepicker"
                                    render={({ onChange, onBlur, value }) => (
                                        <ReactDatePicker
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            selected={value}
                                        />
                                    )}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextGender">
                            <Form.Label column sm="2">
                                Gender
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" type="text" placeholder="Gender" name="gender" ref={register}>
                                    <option value="female">female</option>
                                    <option value="male">male</option>
                                    <option value="other">other</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="2">
                                Email
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Email" name="email" ref={register} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextAddress">
                            <Form.Label column sm="2">
                                Address
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Address" name="address" ref={register} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextOccupation">
                            <Form.Label column sm="2">
                                Occupation
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control as="select" type="text" placeholder="Occupation" name="occupation" ref={register}>
                                    <option value="student">student</option>
                                    <option value="employee">employee</option>
                                    <option value="other">other</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPhoneNumber">
                            <Form.Label column sm="2">
                                Phone Number
                        </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Phone Number" name="phone_number" ref={register} />
                            </Col>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save</Button>
                    </Form>
                    <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
                        <div className="form-wrapper">
                            <div>
                                <Popup trigger={<div style={{ textAlign: "center" }}><button> Reset Password</button></div>} position="bottom center"  >
                                    <form onSubmit={handleSubmit(onReset)} >
                                        <div>
                                            <label htmlFor="CurrentPassword">Current Password</label>
                                            <input name="CurrentPassword" type="password" />
                                        </div>
                                        <div>
                                            <label htmlFor="password">New Password</label>
                                            <input name="password" type="password" ref={register} />
                                        </div>
                                        <div>
                                            <label htmlFor="Confirmpassword">Confirm Password</label>
                                            <input name="Confirmpassword" type="password" ref={register} />
                                        </div>
                                        <button style={{ margin: '10px' }} type="submit">Submit</button>
                                    </form>
                                </Popup>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '80%', marginBottom: '20px' }}>

                                <div>
                                    <input name="firstName" ref={register} placeholder="First Name" />
                                </div>
                                <div>
                                    <input name="lastName" ref={register} placeholder="Last Name" />
                                </div>

                                <div>
                                    <Controller
                                        placeholder="Date of Birth"
                                        control={control}
                                        name="ReactDatepicker"
                                        render={({ onChange, onBlur, value }) => (
                                            <ReactDatePicker
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                selected={value}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="gender">Gender</label>
                                    <select name="gender" ref={register}>
                                        <option value="female">female</option>
                                        <option value="male">male</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                                <div>
                                    <input name="email" type="email" placeholder="Email" ref={register({
                                        required: "",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                    })} />
                                    {errors.email && errors.email.message}
                                </div>
                                <div>
                                    <input name="address" placeholder="Address" ref={register} />
                                </div>
                                <div>
                                    <label htmlFor="occupation">Occupation</label>
                                    <select name="occupation" ref={register}>
                                        <option value="student">student</option>
                                        <option value="employee">employee</option>
                                        <option value="other">other</option>
                                    </select>
                                </div>
                                <div>
                                    <input name="phone_number" type="number" ref={register} placeholder="Phone number" />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    <button type="submit">Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </Container>
            </div>
            <Footer></Footer>
        </div>
    )
}