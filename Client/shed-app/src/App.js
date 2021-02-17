import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Login from './Login';
import Register from './Register';
import List from './List';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
export default class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/">
          <Login />
          </Route>
          <Route exact path="/register">
          <Register />
          </Route>
          <Route exact path="/list">
          <List />
          </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          <Route path="/*"><NotFound/></Route>
      </Switch>
      </BrowserRouter>
      </div>
    )
  }
}