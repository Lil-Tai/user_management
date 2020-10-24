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
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:5000/events').then(result => {
          this.setState({ events: result.data.events})
          console.log(result)
    })
    .catch(error => {
      console.error(error);
    })
  }

  getEventsInfo = (getEventsId) => {
    return this.state.events.find(events => events.id === getEventsId);
  }

  getJoinEvent = (e) => {
    e.preventDefault()
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
          <Route path='/events/:id' exact render={routeProps => <DetailsEvents getEventsInfo={this.getEventsInfo} join={this.state.join} getJoinEvent={this.getJoinEvent} {...routeProps} />} />
        </div>
      </Router>

    );

  }
}


