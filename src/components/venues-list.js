import React, {Component} from 'react';
import VenuesListItem from './venues-list-item';

export default class VenuesList extends Component {
  render() {
    return (
      <ul className="venues-list">
        {/* If there are venues props array, maps over that array, rendering list item with key set to index of each item in the array, and spreading/expanding venue props/details for that venue into the array. Returns new array with results, so you get a new array for each venue */}
        {this.props.venues && this.props.venues.map((venue, index) => ( <VenuesListItem key={index} {...venue} />
        ))}
      </ul>
    );
  }
}
