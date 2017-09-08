import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
    <div>
      <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <span className="counter">{this.props.count} User online</span>
      </nav>
    </div>
    )
  }
}
export default NavBar;