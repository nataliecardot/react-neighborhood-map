import React, { Component } from 'react';
import VenuesListItem from './venues-list-item';

export default class VenuesList extends Component {
  render() {
    return (
      // Role of menu containing li with role of menuitem is used in W3C example https://www.w3.org/WAI/PF/aria/roles#tac_example1
      <ul className="venues-list" role="menu">
        {/* If there is venues props array, maps over that array, rendering list item with key set to index of each item in the array, and spreading/expanding venue props/details for that venue into the array. Returns new array with results, so you get a new array for each venue */}
        {this.props.venues && this.props.venues.map((venue, index) => ( <VenuesListItem
          key={index}
          {...venue}
          handleVenuesListItemClick={this.props.handleVenuesListItemClick}
        />
        ))}
      </ul>
    );
  }
}
