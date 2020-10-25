import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import EventsItem from './components/EventsItem';
import DetailsEvents from './components/DetailsEvents';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      join: "info",
      participant: []
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/events').then(result => {
          this.setState({ events: result.data.events})
    })
    .catch(error => {
      console.error(error);
    })
    axios.get('http://localhost:5000/participants').then(result => {
          this.setState({participant: result.data.participants})
    })
  }

  getEventsInfo = (getEventsId) => {
    return this.state.events.find(events => events.id === getEventsId);
  }

  getParticipants = (getEventsParti) => {
    var count = 0;
    var participant = this.state.participant.filter(participant => participant.id_events === getEventsParti)
    for( var i = 1; i <= participant.length; i++){
        count += 1
    }
    return count
  }

  getJoinEvent = (id) => {
    console.log(id)
    if(this.state.join === "info"){
      this.setState({
        join: "danger"
      })
    }else{
      this.setState({
        join: "info"
      })
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact render={routeProps => <EventsItem events={this.state.events} {...routeProps} />} />
          <Route path='/events/:id' exact render={routeProps => <DetailsEvents getEventsInfo={this.getEventsInfo} join={this.state.join} getJoinEvent={this.getJoinEvent} getParticipants={this.getParticipants} {...routeProps} />} />
        </div>
      </Router>

    );

  }
}


