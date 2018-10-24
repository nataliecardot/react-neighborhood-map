import React, { Component } from 'react';
import Map from './components/map.js';
import FoursquareAPI from './api/index.js';
import Sidebar from './components/sidebar';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      zoom: 15,
      // For setting marker state (visibility) from sidebar (made available to sidebar from props)
      updateMarkerState: obj => {
        this.setState(obj);
      }
    };
  }

  handleMarkerClick = marker => {
    this.closeAllMarkers();
    marker.isOpen = true;
    // Copies values of properties from marker (the source) to this.state.markers (the target). This is needed to update the state of clicked marker's new isOpen value of true
    this.setState({markers: Object.assign(this.state.markers, marker)});
    // find() method returns the value of the first element in the array that satisfies the provided testing function. So this searches the venues list held in state (see componentDidMount() method for how this is derived) until the venue matching the marker is located, and it returns it; the venue variable is that located venue
    const venue = this.state.venues.find(venue => venue.id = marker.id);
    // Fetches data associated with clicked marker's ID
    FoursquareAPI.getVenueInfo(marker.id).then(results => {
      // Copies properties from results.response.venue (source) to venue (target). venue in results.response.venue is from venue variable created previously (with ID matching clicked marker's ID). Remember venue is venue from existing venues state whose ID matches that of clicked marker. This will be needed to update venues state with this info
      const newVenue = Object.assign(venue, results.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue)});
    });
  };

  handleVenuesListItemClick = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
  };

  // Called when a marker is clicked. For closing previously clicked marker's infowindow (if applicable)
  closeAllMarkers = () => {
    // Returns new array that is result of setting each marker's isOpen value to false. Note that it doesn't close the newly clicked marker's infowindow because that marker's isOpen value is set to true immediately after this is called
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  }

  // Foursquare Places API fetch request testing and markers handling
  componentDidMount() {
    FoursquareAPI.search({
      near: 'Seattle, WA',
      query: 'ice cream',
      limit: 5
    }).then(results => {
      // Object destructuring assignment. Instead of using results.response.venues, this allows for using venues alone when referencing it. See https://wesbos.com/destructuring-objects/. This info will be used to update venues property
      const { venues } = results.response;
      // Returning info from each venue and storing it in new array. This info will be used to update markers property
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          // For info windows (none should be open on page load)
          isOpen: false,
          // Sets all markers to visible on page load
          isVisible: true,
          id: venue.id
        };
      });
      // Reminder: Use object setState whenever new state does not depend on its previous state (as opposed to functional setState)
      this.setState({venues, markers});
      // Testing fetch request
      console.log(results);
    }).catch(error => alert("Sorry, there was an error."))
  }

  // This lifecycle method is a feature of React 16 (released 2017). By using it, this component becomes an error boundary, that is, a component that catches a JS error and can log the error and/or display fallback UI. For more info see https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
  componentDidCatch(error) {
    alert("Sorry, there was an error.")
  }

  render() {
    return (
      <div className="app">
        <Sidebar
          {...this.state} handleVenuesListItemClick={this.handleVenuesListItemClick}
        />
        {/* Using spread syntax/operator to expand/insert state, making it available in rendered map component */}
        <Map {...this.state} handleMarkerClick={this.handleMarkerClick} />
      </div>
    );
  }
}
