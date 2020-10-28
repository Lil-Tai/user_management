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
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/events').then(result => {
      this.setState({ events: result.data.events })
      console.log(result)
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
    axios.get('http://localhost:5000/protected',
      {
        headers: { Authorization: 'JWT ' + token }
      })
      .then((response) => {
        this.setState({ username: response.data })
        this.setState({ token: token })
      }).then(axios.get('http://localhost:5000/user/' + this.state.username,
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
    var participant = this.state.participant.filter(participant => participant.id_events === getEventsParti)
    for (var i = 1; i <= participant.length; i++) {
      count += 1
    }
    return count
  }

  getJoinEvent = (id) => {
    console.log(id)
    if (this.state.join === "info") {
      this.setState({
        join: "danger"
      })
    } else {
      this.setState({
        join: "info"
      })
    }
  }

  render() {
    return (
      <div>
        <Header isAuthenticated={this.state.isAuthenticated} />
        <div style={{ marginTop: "100px" }}>
          <Router>
            <Route path='/login' render={(props) => (<Login {...props} isAuthenticated={this.state.isAuthenticated}
              user_login={this.user_login} />)} />
            <Route path='/discount' render={(props) => (<DiscountEvents {...props} user={this.state.user} events={this.state.events} />)} />
            <Route path='/register' render={(props) => (<Register {...props} />)} />
            <Route path='/' exact render={routeProps => <EventsItem events={this.state.events} {...routeProps} />} />
            <Route path='/events/:id' exact render={routeProps => <DetailsEvents getEventsInfo={this.getEventsInfo} join={this.state.join} getJoinEvent={this.getJoinEvent} getParticipants={this.getParticipants} {...routeProps} />} />
          </Router>
        </div>
        <Footer />
      </div>
    );

  }
}

