import React, {Component, Fragment} from 'react';

export default class VenuesListItem extends Component {
  render() {
    return (
      <Fragment>
        <li className="venues-list-item">
          {this.props.name}
        </li>
        <li className="between-items"></li>
      </Fragment>
    );
  }
}
