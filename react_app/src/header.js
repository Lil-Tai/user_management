import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';

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
      <button onClick={()=>{props.login_button()}}>login</button>
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
