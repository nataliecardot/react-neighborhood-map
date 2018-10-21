import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <h1 className="header">
        <span role="img" aria-label="ice cream"> 🍦 </span>
         Ice Cream Finder
        <span role="img" aria-label="ice cream"> 🍦 </span>
       </h1>
    );
  }
}
