import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import { Button} from 'react-bootstrap';
import logo from './logo_size_invert.jpg';

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
      <a href="http://localhost:3000/login">Register</a>
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
        <div>This is header</div>
        </div>
      </div>)
  }
}

export default Header;
