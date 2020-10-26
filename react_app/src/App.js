import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsItem from './components/EventsItem';
import DetailsEvents from './components/DetailsEvents';

import Login from './components/Authentication/Login'
import Register from './components/Register/Register'
import axios from 'axios';
import Header from './header';
import Footer from './footer';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      join: "info",
      isAuthenticated: false,
      token: "",
      participants: [],
      idUsers: 3 // need to be real id_users
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/events').then(result => {
      this.setState({ events: result.data.events })
    })
      .catch(error => {
        console.error(error);
      })

    axios.get('http://localhost:5000/participants').then(result => {
        this.setState({ participants: result.data.participants })
    })
      .catch(error => {
          console.error(error);
      })

    //send jwt token
    let token = localStorage.getItem('token');
    console.log(token)
    axios.get('http://localhost:5000/protected',
      {
        headers: { Authorization: 'JWT ' + token }
      })
      .then((response) => {
        console.log(response);
        setToken(token)
      }).catch((error) => {
        console.log(error);
        this.setState({ isAuthenticated: false })
      })
  }


  user_login = () => {
    this.setState({ isAuthenticated: true })
    console.log('hello', isAuthenticated);
    let token = localStorage.getItem('token');
    setToken(token)
    console.log(isAuthenticated)
  }


  getEventsInfo = (getEventsId) => {
    return this.state.events.find(events => events.id === getEventsId);
  }

  getParticipants = (getEventsParti) => {
    var count = 0;
    var participant = this.state.participants.filter(participant => participant.id_events === getEventsParti)
    for( var i = 1; i <= participant.length; i++){
        count += 1
    }
    return count
  }

  checkParticipant = (id) => {
    var event = this.state.participants.find(participant => participant.id_events === id && participant.id_users === this.state.idUsers);
    if(event !== undefined){
      this.setState({
        join: "danger"
      })
    }else{
      this.setState({
        join: "info"
      })
    }
  }

  getJoinEvent = (id) => {
    if(this.state.join === "info"){
      this.setState({
        join: "danger"
      })
      axios.post('http://localhost:5000/participants/' + this.state.idUsers, {
        id_events: id
      }).then(() => {
        axios.get('http://localhost:5000/participants').then(result => {
        this.setState({ participants: result.data.participants })
      })
        .catch(error => {
            console.error(error);
        })
      })
    }else{
      var event = this.state.participants.find(participant => participant.id_events === id && participant.id_users === this.state.idUsers);
      this.setState({
        join: "info"
      })
      if(event !== undefined){
        axios.delete('http://localhost:5000/participants/' + event.id)
        .then(() => {
          axios.get('http://localhost:5000/participants').then(result => {
          this.setState({ participants: result.data.participants })
        })
          .catch(error => {
              console.error(error);
          })
        })
      }
    }
  }

  render() {
    return (
      <div>
        <Header isAuthenticated={isAuthenticated} />
        <div style={{ marginTop: "100px" }}>
          <Router>
            <Route path='/login' render={(props) => (<Login {...props} isAuthenticated={isAuthenticated}
              user_login={user_login} />)} />
            <Route path='/register' render={(props) => (<Register {...props} />)} />
            <Route path='/' exact render={routeProps => <EventsItem events={this.state.events} checkParticipant={this.checkParticipant} {...routeProps} />} />
            <Route path='/events/:id' exact render={routeProps => <DetailsEvents getEventsInfo={this.getEventsInfo} join={this.state.join} getParticipants={this.getParticipants} getJoinEvent={this.getJoinEvent} {...routeProps} />} />
          </Router>
        </div>
        <Footer />
      </div>
    );

  }
}

