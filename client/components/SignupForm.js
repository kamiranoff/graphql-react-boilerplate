import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';

import currentUserQuery from '../queries/CurrentUser';
import signupMutation from '../mutations/Signup';

class SignupForm extends Component {

  constructor() {
    super();

    this.state = { errors: [] };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: { email, password },
      refetchQueries: [{ query: currentUserQuery }]
    })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors })
      })
  }

  render() {
    return (
      <div>
        <h3>Signup Form</h3>
        <AuthForm onSubmit={this.onSubmit} errors={this.state.errors} />
      </div>
    );
  }
}

export default graphql(signupMutation)(SignupForm);
