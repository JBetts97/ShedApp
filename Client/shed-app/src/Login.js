import React, { Component } from "react";
import {withRouter, useHistory} from 'react-router-dom';

import axios from "axios";
import Dashboard from './Dashboard';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import logo from './assets/cover-logo.png';

export class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      messages: ""
    }
    this.updateCredentials = this.updateCredentials.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  updateCredentials(username, password) {
    this.setState({
      username: username,
      password: password
    })
  }

  handleSubmit(event) {
    const { username, password } = this.state;

    axios
      .post(
        "http://localhost:8081/login",
        {
            username: username,
            password: password 
        },
      )
      .then(response => {
        if (response.data.loggedIn) {
          this.updateCredentials(response.data.username, response.data.password);
          this.props.history.push({
            pathname: '/dashboard',
            state: { detail: response.data }});
        } else {
          this.state.messages = response.data.message;
          this.forceUpdate();
      }
    })
      .catch(error => {
        console.log("login error", error);
        });
    event.preventDefault();
  }

render() {
  let alertbox;
  if (this.state.messages != ""){
    alertbox = 
    <div className="alert">
      <Alert variant="danger">
  <Alert.Heading>Error</Alert.Heading>
  <hr />
  <p>
  {this.state.messages}
  </p>
</Alert>
      </div>
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