import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsItem from './components/EventsItem';
import DetailsEvents from './components/DetailsEvents';
import Login from './components/Authentication/Login'
import Register from './components/Register/Register'
import DiscountEvents from './components/Event_Filter/DiscountEvents'
import axios from 'axios';
import Header from './header';
import Footer from './footer';
import UpdateInfo from './components/UpdateInfo';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      join: "info",
      isAuthenticated: false,
      token: "",
      username: "",
      user: null,
      participants: [],
    }
  }

  componentDidMount = () => {
    axios.get('https://liltaiapi.herokuapp.com/events').then(result => {
      this.setState({ events: result.data.events })
    })
      .catch(error => {
        console.error(error);
      })

    axios.get('https://liltaiapi.herokuapp.com/participants').then(result => {
        this.setState({ participants: result.data.participants })
    })
      .catch(error => {
          console.error(error);
      })

    //send jwt token
    this.user_login()
  }


  user_login = () => {
    //console.log('hello', isAuthenticated);
    let token = localStorage.getItem('token');
    this.setState({ token: token })
    axios.get('https://liltaiapi.herokuapp.com/protected',
      {
        headers: { Authorization: 'JWT ' + token }
      })
      .then((response) => {
        this.setState({ username: response.data })
        this.setState({ token: token })
      }).then(axios.get('https://liltaiapi.herokuapp.com/user/' + this.state.username,
        {
          headers: { Authorization: 'JWT ' + token }
        })
        .then((response) => {
          this.setState({ user: response.data })
          console.log(this.state.user)
          this.setState({ isAuthenticated: true })
        }).catch((error) => {
          console.log(error);
          this.setState({ isAuthenticated: false })
        }))
      .catch((error) => {
        console.log(error);
        this.setState({ isAuthenticated: false })
      })

    //console.log(isAuthenticated)
  }
  getEventsInfo = (getEventsId) => {
    return this.state.events.find(events => events.id === getEventsId);
  }

  getParticipants = (getEventsParti) => {
    var count = 0;
    var participant = this.state.participants.filter(participant => participant.id_events === getEventsParti)
    for (var i = 1; i <= participant.length; i++) {
      count += 1
    }
    return count
  }

  checkParticipant = (id) => {
    var event = this.state.participants.find(participant => participant.id_events === id && participant.id_users === this.state.user.id);
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
      axios.post('https://liltaiapi.herokuapp.com/participants/' + this.state.user.id, {
        id_events: id
      }).then(() => {
        axios.get('https://liltaiapi.herokuapp.com/participants').then(result => {
        this.setState({ participants: result.data.participants })
      })
        .catch(error => {
            console.error(error);
        })
      })
    }else{
      var event = this.state.participants.find(participant => participant.id_events === id && participant.id_users === this.state.user.id);
      this.setState({
        join: "info"
      })
      if(event !== undefined){
        axios.delete('https://liltaiapi.herokuapp.com/participants/' + event.id)
        .then(() => {
          axios.get('https://liltaiapi.herokuapp.com/participants').then(result => {
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
        <Header user={this.state.user} isAuthenticated={this.state.isAuthenticated} />
        <div style={{ marginTop: "100px" }}>
          <Router>
            <Route path='/login' render={(props) => (<Login {...props} isAuthenticated={this.state.isAuthenticated}
              user_login={this.user_login} />)} />
            <Route path='/register' render={(props) => (<Register {...props} />)} />
            <Route path='/' exact render={routeProps => <EventsItem events={this.state.events} checkParticipant={this.checkParticipant} user={this.state.user} {...routeProps} />} />
            <Route path='/events/:id' exact render={routeProps => <DetailsEvents getEventsInfo={this.getEventsInfo} join={this.state.join} getJoinEvent={this.getJoinEvent} getParticipants={this.getParticipants} {...routeProps} />} />
            <Route path='/upinfo' exact render={routeProps => <UpdateInfo username={this.state.user.username}  {...routeProps}/>} />
          </Router>
        </div>
        <Footer />
      </div>
    );

  }
}

