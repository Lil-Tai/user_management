import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import {Link} from "react-router-dom";

function Header(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(props.isAuthenticated);
  useEffect(()=>{
      setIsAuthenticated(props.isAuthenticated)
      console.log(1)
  })
  if (props.isAuthenticated == false)
  {
    return (
      <div>
      <div id={styles.header}>
      <div>This is header</div>
      <a href="http://localhost:3000/login"><button>Login</button></a>
      </div>
      </div>
    );
  }
  else{
     return(
      <div>
        <div id={styles.header}>
        <div>This is header</div>
        </div>
      </div>)
  }
}

export default Header;
