import React, { Component } from 'react';

import { AuthContext } from './src/components/context'

import Router from './src/Router'
export default class App extends Component {
  render() {
    return (
      <Router />
    )
  }
}