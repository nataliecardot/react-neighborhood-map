import React, { Component } from 'react';

// Rendered in VenuesList, which is rendered in Sidebar
export default class VenuesListItem extends Component {
  render() {
    return (
        <li
          className="venues-list-item"
          // this.props is entire set of venue data spread out in rendering of VenuesListItem in VenuesList component class. handleVenuesListItemClick method is in app.js
          onClick={() => this.props.handleVenuesListItemClick(this.props)}
          tabIndex="3"
        >
          {this.props.name}
        </li>
    );
  }
}
