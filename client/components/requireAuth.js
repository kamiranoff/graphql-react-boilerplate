import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {

  class RequireAuth extends Component {

    constructor() {
      super();

      console.log('HOC - render');
    }

    componentWillUpdate(nextprops) {
      console.log('componentWillUpdate', nextprops);
      if (!nextprops.data.loading && !nextprops.data.user) {
        hashHistory.push('/login');
      }
    }

    render() {
      return (<WrappedComponent { ...this.props } />);
    }
  }

  return graphql(currentUserQuery)(RequireAuth);
}