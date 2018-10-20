import React, { Component } from 'react';
import VenuesListItem from './venues-list-item';

export default class VenuesList extends Component {
  render() {
    return (
      <ol className="venues-list">
        <VenuesListItem />
      </ol>
    );
  }
}
