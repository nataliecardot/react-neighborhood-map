import React, { Component } from 'react';
import logo from './logo.svg';
import './app.css';
import Map from 'components/map'; // For later
import FoursquareAPI from 'api/index';

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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
