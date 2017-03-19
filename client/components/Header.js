import React, { Component } from 'react';
import { Link } from 'react-router';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';
import logoutMutation from '../mutations/Logout';


class Header extends Component {

  constructor() {
    super()

    this._onLogoutClick = this._onLogoutClick.bind(this);
  }

  _onLogoutClick() {
    this.props.mutate({
      refetchQueries: [{ query: currentUserQuery }]
    });
  }

  _renderButtons() {
    const { loading, user } = this.props.data

    if (loading) {
      return (<div />);
    }

    if (user) {
      return (
        <ul className="right">
          <li>
            <a onClick={() => this._onLogoutClick()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="right">
          <li>
            <Link to="/signup">
              Sign up
            </Link>
          </li>
          <li>
            <Link to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
  }

  render() {
    return (
      <header>
        <nav className="nav-wrapper">
          <Link to="/" className='brand-logo left'>
            Home
          </Link>
          {this._renderButtons()}
        </nav>
      </header>
    );
  }
}

export default graphql(logoutMutation)(
  graphql(currentUserQuery)(Header)
);
