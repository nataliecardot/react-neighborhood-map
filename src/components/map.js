// This component's code is from react-google-maps implementation instructions https://tomchentw.github.io/react-google-maps/#installation

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      {props.isMarkerShown && (
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
        />
      )}
    </GoogleMap>
  ))
);

export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
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
