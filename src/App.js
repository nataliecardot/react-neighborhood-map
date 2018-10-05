import React, { Component } from 'react';
import './app.css';
import Map from './components/map.js';
import FoursquareAPI from './api/index.js';

export default class App extends Component {
  // Testing Foursquare API
  componentDidMount() {
    FoursquareAPI.search({
      near: 'Seattle, WA',
      query: 'ice cream',
      limit: 10
    }).then(results => console.log(results));
  }

  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}
