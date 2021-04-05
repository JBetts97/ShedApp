import React, { Component } from "react";
import {withRouter, useHistory} from 'react-router-dom';

import axios from "axios";
import Dashboard from './Dashboard';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import logo from './assets/cover-logo.png';

import { authenticationService } from './services/authentication.service';

export class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      messages: ""
    }
    this.updateCredentials = this.updateCredentials.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  updateCredentials(username, password, token) {
    this.setState({
      username: username,
      password: password,
      token: token
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const { username, password, token } = this.state;

    authenticationService.login(username, password)

    if (localStorage.getItem('error') != undefined) {
        this.props.history.push({
          pathname: '/dashboard'}
        )}
}

render() {
  let alertbox;
  if (localStorage.getItem('error') != undefined) {
    alertbox = 
    <div className="alert">
      <Alert variant="danger">
  <Alert.Heading>Error</Alert.Heading>
  <hr />
  <p>
  {localStorage.getItem('error')}
  </p>
</Alert>
      </div>
  }

  if ( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != undefined) {
    this.props.history.push({
      pathname: '/dashboard'
    })
  }

    return (
      
<div className="App">
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" height="350" />
      </header>

    <div className="Body">
      
      <Col xs={6} md={4}>
      <Form onSubmit={this.handleSubmit.bind(this)}>
      
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control name="username" type="username" placeholder="Username" onChange={this.handleChange.bind(this)} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name="password" type="password" placeholder="Password" onChange={this.handleChange.bind(this)} />
  </Form.Group>
  <Button variant="primary" type="submit" >
    Login
  </Button>
</Form>
<br/>

{alertbox}

</Col>
</div>


<footer className="Footer"><Button variant="secondary" href="/register" >Register Here</Button></footer>

    </div>
    
    );
}
}

export default withRouter(Login);