import React, {useState, useEffect} from 'react';
import Header from './header';
import Footer from './footer'
import {BrowserRouter as Router, Route, history} from 'react-router-dom';
import Login from './components/Authentication/Login'
import Register from './components/Register/Register'
import axios from 'axios';

function App()
{
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("")
 
  useEffect(() => {
    // let token = localStorage.getItem('token');
    // console.log(token)
    // axios.get('http://localhost:5000/user/dinhtai0401', 
    //   {headers: {Authorization : 'JWT '+ token}
    //   })
    // .then((response)=>{console.log(response);
    //   setToken(token)
    // }).catch((error)=>{console.log(error);
    //   setIsAuthenticated(false)}
    // )
  })
  function user_login(){
    setIsAuthenticated(true)
    console.log('hello',isAuthenticated);
    let token = localStorage.getItem('token');
    setToken(token)
    console.log(isAuthenticated)
  }
  function login_button()
  {
    console.log(isAuthenticated)
    let token = localStorage.getItem('token');
    axios.get('http://localhost:5000/user/dinhtai0401', 
      {headers: {Authorization : 'JWT '+ token}
      })
    .then((response)=>{setIsAuthenticated(true);
    }).catch((error)=>{console.log(error);
      setIsAuthenticated(false)}
    )
  }
    return (
      <div>
        <Header login_button={login_button} isAuthenticated={isAuthenticated}/>
        <div style={{marginTop: "100px"}}>
        <Router>
          <Route path='/login' render={(props) => (<Login {...props} isAuthenticated={isAuthenticated}
                                                                user_login={user_login} />)}/>
          <Route path='/register' render={(props) => (<Register {...props}  />)}/>
        </Router>
        </div>
        <Footer/>
      </div>
    );
  
}



export default App;
