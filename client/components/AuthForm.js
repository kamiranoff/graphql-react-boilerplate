import React, { Component } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
  }

  onSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s6">
          <div className="input-field">
            <input
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              placeholder="Email"
            />
          </div>
          <div className="input-field">
            <input
              value={this.state.password}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className="errors">
            {this.props.errors.map((e, i) => {
              return (
                <p key={`Error-${i}`}>{e}</p>
              );
            })}
          </div>
          <button className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default AuthForm;
