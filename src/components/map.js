// This component's code is from react-google-maps implementation instructions https://tomchentw.github.io/react-google-maps/#installation

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      // Overrides default zoom with value inside App component class's this.state
      zoom={props.zoom}
      // Changed to Freeway Park lat and long. TODO: autocenter
      defaultCenter={{ lat: 47.6093, lng: -122.3309 }}
      // Overrides default center with value inside App component class's this.state
    >
      {/* If there are markers, filters all visible markers (creating new array) then maps over newly created array taking the marker and marker's array index as arguments, rendering each Marker component with the marker index set as the key and the marker's lat and long as the position */}
      {props.markers &&
        props.markers.filter(marker => marker.isVisible)
        // "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity ... When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort" https://reactjs.org/docs/lists-and-keys.html
        .map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
      ))}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        // This is making the this.setState passed into Map component (as its prop) inside App's component class's render method available to MyMapComponent, which is how props from this.setState are eventually included inside MyMapComponent class (such as zoom={props.zoom})
        {...this.props}
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDjl8LxY7Edfulq6t_VDaQsYY4ymPjwN0w"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      // TODO: Add attribution: Additional location data provided by Foursquare
    );
  }
}
