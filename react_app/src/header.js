import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import { Button} from 'react-bootstrap';
import logo from './Capture.PNG';

function Header(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated);
  useEffect(()=>{
      setIsAuthenticated(props.isAuthenticated)
  })
  if (props.isAuthenticated == false)
  {
    return (
      <div>
      <div id={styles.header}>
      <img src={logo} className={styles.logo}/>
      <div className={styles.nav_right}>
      <Button variant="outline-secondary">Add an event</Button>
      <a href="http://localhost:3000/login">Login</a>
      <a> | </a>
      <a href="http://localhost:3000/register">Register</a>
      </div>
      </div>
      </div>
    );
  }
  else{
     return(
      <div>
        <div id={styles.header}>
        <img src={logo} className={styles.logo}/>
     <div className={styles.nav_right}>
     <Button variant="outline-secondary">Add an event</Button>
     <a>Hi {props.user.username}</a></div>
        </div>
      </div>)
  }
}

export default Header;
