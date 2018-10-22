// Specifies global variable to ESLint (bundled with create-react-app), circumventing no-undef rule. See https://eslint.org/docs/user-guide/configuring#specifying-globals
/* global google */
// This component's code is from react-google-maps implementation instructions https://tomchentw.github.io/react-google-maps/#installation

import React, { Component , Fragment } from 'react';
import { withScriptjs , withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      zoom={props.zoom}
      defaultCenter={{ lat: 47.6093, lng: -122.3309 }}
    >
      {/* If there are markers, filters all visible markers (creating new array) then maps over newly created array taking the marker and marker's array index as arguments, rendering each Marker component with the marker index set as the key and the marker's lat and long as the position */}
      {props.markers &&
        props.markers.filter(marker => marker.isVisible)
        // "Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity ... When you don’t have stable IDs for rendered items, you may use the item index as a key as a last resort" https://reactjs.org/docs/lists-and-keys.html
        .map((marker, index, array) => {
          const venueInfo = props.venues.find(venue => venue.id === marker.id);
          return (
            <Marker
            key={index}
            position={{lat: marker.lat, lng: marker.lng}}
            // Marker click event listener, defined in App component class
            onClick={() => props.handleMarkerClick(marker)}
            animation={array.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
            >
            {/* Show marker's InfoWindow when its isOpen state is set to true (set in app.js) */}
            {marker.isOpen &&
              <InfoWindow>
                {/* If a venueInfo is not falsey and: 1) if there's a name and bestPhoto property, return the venue photo and name; 2) if there's only a name property, display the name only; 3) if there's only a photo property, display the photo only. If neither are available and/or venueInfo is falsy display text indicating no info available. See SO question about multiple ternary operators https://stackoverflow.com/questions/7757549/multiple-ternary-operators */}
                {venueInfo && venueInfo.name && venueInfo.bestPhoto ?
                <Fragment>
                <p className="venue-name">{venueInfo.name}</p>
                <img  src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}
                // Screen readers already announce as image; don't need the word "image", "photo", etc.
                alt={"Venue"}
                />
                <p className="attribution">Powered by Foursquare</p>
              </Fragment> : venueInfo && venueInfo.name ? <Fragment> <p className="venue-name">{venueInfo.name}</p> <p className="attribution">Powered by Foursquare</p> </Fragment> : venueInfo && venueInfo.bestPhoto ? <Fragment><img src={`${venueInfo.bestPhoto.prefix}200x200${venueInfo.bestPhoto.suffix}`}
                // Screen readers already announce as image; don't need the word "image", "photo", etc.
                alt={"Venue"}
                /> <p className="attribution">Powered by Foursquare</p> </Fragment> : <p>No info available</p>}
              </InfoWindow>
            }
            </Marker>
          );
      })}
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
        // CSS declarations are placed in double curly braces because attributes accept JS objects; this is how to include an object literal. See https://stackoverflow.com/questions/22671582/what-is-the-purpose-of-double-curly-braces-in-reacts-jsx-syntax
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      // TODO: Add attribution: Additional location data provided by Foursquare
    );
  }
}
