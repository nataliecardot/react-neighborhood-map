import React, { Component } from 'react';
import VenuesList from './venues-list';
import Header from './header';

export default class Sidebar extends Component {
  // Called before component is mounted. Used for initializing local state with this.state and binding event handler methods to an instance
  constructor() {
    super();
    this.state = {
      query: '',
      venues: []
    };
  }

  // For hiding venues list items that don't match query
  handleVenueSearch = () => {
    // If search with whitespace removed is not blank, sets venues (accessed from spreading of state in this component's rendering in App.js) to new array of venues filtered by venues with names that include search input, and returns that new venues array
    if (this.state.query.trim() !== '') {
      const venues = this.props.venues.filter(venue => venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase()))
      return venues;
    }
    // Return this if the query is a blank string
    return this.props.venues;
  }

  handleChange = e => {
    // Using object setState (rather than function setState) because new state does not depend on previous state
    this.setState({query: e.target.value});
    // For hiding markers after something has been entered into search box. For each item in venues array (from spreading this.state in Sidebar component rendering in app.js), sets isMatched to search input that is at least part of the name of venue (both lowercase)
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name
      .toLowerCase()
      .includes(e.target.value.toLowerCase());
      // find() returns value of first element in array that satisfies provided testing function. Otherwise undefined is returned
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      // If search input matches at least partially a venue name, sets corresponding marker to visible, and hides markers for nonmatching venues
      isMatched ? marker.isVisible = true : marker.isVisible = false;
      return marker;
    });
    // Using ES6 property shorthand. Method is in app.js. Only mutating isVisible
    this.props.updateMarkerState({markers});
  }

  render() {
    return (
      <div className="sidebar">
        <Header />
        <input
          autoFocus
          type={"search"}
          className={"search"}
          placeholder={"Search"}
          onChange={this.handleChange}
        />
        <VenuesList
          // Making this component's props available in VenuesList
          {...this.props}
          venues={this.handleVenueSearch()}
          // Method is in app.js
          handleVenuesListItemClick={this.props.handleVenuesListItemClick}
        />
      </div>
    );
  }
}
