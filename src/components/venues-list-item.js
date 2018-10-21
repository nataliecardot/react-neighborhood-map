import React, {Component, Fragment} from 'react';

export default class VenuesListItem extends Component {
  render() {
    return (
      <Fragment>
        <li
          className="venues-list-item"
          // this.props is entire set of venue data spread out in rendering of VenuesListItem in VenuesListItem component class
          onClick={() => this.props.handleVenuesListItemClick(this.props)}
        >
          {this.props.name}
        </li>
        <li className="between-items"></li>
      </Fragment>
    );
  }
}
