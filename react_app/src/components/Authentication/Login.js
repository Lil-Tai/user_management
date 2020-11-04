import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Login.module.css';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from '../../header';
import Footer from '../../footer';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // check authentication after username and password is loaded    
  useEffect(() => {
    if (username != "" && password != "") {
      check_authentication()
    }
    let token = localStorage.getItem('token');
    axios.get('https://liltaiapi.herokuapp.com/protected',
      {
        headers: { Authorization: 'JWT ' + token }
      })
      .then((response) => {
        console.log(response);
        props.user_login();
        props.history.push("/")
      }).catch((error) => { console.log(error); }
      )
  })

  // set username and password after form submit    
  function form_submit(event) {
    setUsername(event.target['username'].value);
    setPassword(event.target['password'].value);
  };

  // request for jwt    
  function check_authentication() {
    axios.post('https://liltaiapi.herokuapp.com/auth', {

      username: username,
      password: password
    },
    )
      .then((response) => {
        if (response.status == 200) {
          localStorage.setItem('token', response.data.access_token);
          props.user_login();
          props.history.push("/");
        }
      })
      .catch(error => {
        alert("wrong username or password")
      }
      )
  }
  // login
  async function login(event) {
    event.preventDefault();
    form_submit(event)
  }
  return (
    <div>
      <Header user={props.user} isAuthenticated={props.isAuthenticated}></Header>
      <div style={{ marginTop: "100px" }}>
        <div className={styles.login_box}>
          <h1>Login</h1>
          <div>
            Please give your username and password to login
      </div>

          <form onSubmit={login}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                type="text" name="username"
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
              />
            </InputGroup>
            <div>
              <Button type="submit">Login</Button>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Login;