import React, {Component} from 'react';
import VenuesList from './venues-list';
import Header from './header';

export default class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <Header />
        <input
          type={"search"}
          className={"search"}
          placeholder={"Filter"}
        />
        {/* Passing in props received from Sidebar component rendering (...this.state) in App component */}
        <VenuesList
          {...this.props}
          handleVenuesListItemClick={this.props.handleVenuesListItemClick}
        />
      </div>
    );
  }
}
