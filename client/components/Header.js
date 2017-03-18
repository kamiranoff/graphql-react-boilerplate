import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/currentUser';


class Header extends Component {
  render() {
    console.log(this.props.data);
    return (
      <header>
        header
      </header>
    );
  }
}

export default graphql(currentUserQuery)(Header);
