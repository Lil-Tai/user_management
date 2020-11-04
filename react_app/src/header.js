import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { Button } from 'react-bootstrap';
import logo from './Capture.PNG';
import { Link } from 'react-router-dom';

function Header(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated);
  useEffect(() => {
    setIsAuthenticated(props.isAuthenticated)
  })
  if (props.isAuthenticated == false) {
    return (
      <div>
        <div id={styles.header}>
          <img src={logo} className={styles.logo} />
          <div className={styles.nav_right}>
            <Button variant="outline-secondary">Add an event</Button>
            <Link to="/login">Login</Link>
            <a> | </a>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <div id={styles.header}>
          <img src={logo} className={styles.logo} />
          <div className={styles.nav_right}>
            <Link to="/"><Button variant="outline-secondary">Add an event</Button></Link>
            <Link to="/upinfo">Hi {props.user.username}</Link></div>
        </div>
      </div>)
  }
}

export default Header;
