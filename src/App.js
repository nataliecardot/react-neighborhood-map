import React, { Component } from 'react';
import './app.css';
import Map from './components/map.js';
import FoursquareAPI from './api/index.js';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      zoom: 14
    };
  }
  // Foursquare Places API fetch request testing and markers handling
  componentDidMount() {
    FoursquareAPI.search({
      near: 'Seattle, WA',
      query: 'ice cream',
      limit: 10
    }).then(results => {
      // Object destructuring assignment. Instead of using results.response.venues, this allows for using venues alone when referencing it. See https://wesbos.com/destructuring-objects/
      const { venues } = results.response;
      // Returning info from each venue and storing it in new array
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          // For info windows (none should be open on page load)
          isOpen: false,
          // Sets all markers to visible on page load
          isVisible: true
        };
      });
      // Reminder: Use object setState whenever new state does not depend on its previous state (as opposed to functional setState)
      this.setState({venues, markers});
      // Testing fetch request
      console.log(results);
    });
  }

  render() {
    return (
      <div className="App">
        {/* Using spread syntax/operator to spread out state */}
        <Map {...this.state} />
      </div>
    );
  }
}
