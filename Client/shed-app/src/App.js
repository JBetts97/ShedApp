import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { Component } from "react";
import Login from './components/Login';
import Register from './components/Register';
import List from './components/List';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import InfoDetail from './components/Info';
import Logout from './components/Logout';
import Profile from './components/Profile';
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
          <Route exact path="/info">
          <InfoDetail />
          </Route>
          <Route exact path="/logout">
          <Logout />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/*"><NotFound/></Route>
      </Switch>
      </BrowserRouter>
      </div>
    )
  }
}