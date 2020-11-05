import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Register.module.css';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { faEnvelope, faLock, faUser, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../header';
import Footer from '../../footer';

function Register(props) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [step, setStep] = useState(1)
    const [isCheck, setIsCheck] = useState(false)
    function step1(event) {
        event.preventDefault();
        setUsername(event.target['username'].value);
        setEmail(event.target['email'].value);
        setPassword(event.target['password'].value);
        setStep(2)
    }
    function step2_back() {
        setStep(1)
    }
    function step2_next() {
        setStep(3)
    }
    function step3(event) {
        axios.post('https://liltaiapi.herokuapp.com/register',
            {
                username: username,
                password: password
            }).then((response) => {
                console.log(response)
                props.history.push("/");
            })
            .catch((error) => {
                console.log(error)
            })
        console.log(step)
    }
    function updateUsername(event) {
        setUsername(event.target.value)
    }
    function updateEmail(event) {
        setEmail(event.target.value)
    }
    function updatePassword(event) {
        setPassword(event.target.value)
    }
    function handleChange(event) {
        setIsCheck(event.target.checked)
    }
    if (step == 1)
        return (
            <div>
                <Header user={props.user} isAuthenticated={props.isAuthenticated}></Header>
                <div style={{ marginTop: "100px" }}>
                    <div className={styles.register_box}>
                        <div>This is register form</div>
                        <div>
                            <ul>
                                <li>Step 1</li>
                                <li>Step 1</li>
                                <li>Step 1</li>
                                <li>Step 1</li>
                            </ul>
                        </div>
                        <form onSubmit={step1}>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    type="text" name="username"
                                    onChange={updateUsername}
                                    value={username}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Email"
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    type="text" name="email"
                                    onChange={updateEmail}
                                    value={email}
                                />
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text><FontAwesomeIcon icon={faLock} /></InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                    type="password" name="password"
                                    onChange={updatePassword}
                                    value={password}
                                />
                            </InputGroup>
                            <div>
                                <button type="submit">Next</button>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    else if (step == 2) {
        return (
            <div>
                <Header user={props.user} isAuthenticated={props.isAuthenticated}></Header>
                <div style={{ marginTop: "100px" }}>
                    <div className={styles.register_box}>
                        <div>This is step 2</div>
                        <Form>
                            <Form.Group>
                                <Form.Check
                                    required
                                    name="terms"
                                    label="Agree to terms and conditions"
                                    id="validationFormik0"
                                    checked={isCheck}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                        </Form>
                        <Button onClick={step2_back}>Previous</Button>
                        <Button disabled={!isCheck} onClick={step2_next}>Next</Button>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
    else if (step == 3) {
        return (
            <div>
                <Header user={props.user} isAuthenticated={props.isAuthenticated}></Header>
                <div style={{ marginTop: "100px" }}>
                    <div className={styles.register_box}>
                        <div>
                            <Button onClick={step3}>Confirm</Button>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
    else if (step == 0) {
        return (
            <div className={styles.register_box}>
                <div>You have register</div>
            </div>
        )
    }
}

export default Register