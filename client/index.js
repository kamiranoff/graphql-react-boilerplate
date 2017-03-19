import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory, IndexRoute, Route } from "react-router";

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import promise from 'redux-promise';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';


import App from './components/App';
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm';

require("./style.css");

const networkInterface = createNetworkInterface({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
})
const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
})

const logger = createLogger({
  collapsed: true,
  diff: true,
});
const store = createStore(
  combineReducers({
    apollo: client.reducer(),
  }),
  {},
  compose(
    applyMiddleware(client.middleware(), thunk, promise, logger),
    // If you are using the devToolsExtension, you can add it here also
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);


const Root = () => {
  return (
    <ApolloProvider store={store} client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="signup" component={SignupForm} />
          <Route path="login" component={LoginForm} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
