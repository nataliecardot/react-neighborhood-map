import React, { Component } from 'react';
import VenuesList from './venues-list';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <VenuesList />
      </div>
    );
  }
}
