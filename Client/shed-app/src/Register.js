import React, { Component } from "react";
import { withRouter, useHistory } from 'react-router-dom';

import axios from "axios";
import Dashboard from './Dashboard';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import logo from './assets/cover-logo.png';

export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            firstname: "",
            lastname: "",
            messages: ""
        }
        this.updateCredentials = this.updateCredentials.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateCredentials(username, password, email, firstname, lastname) {
        this.setState({
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname
        })
    }


    handleSubmit(event) {
    const { username, password, email, firstname, lastname } = this.state;

    axios
      .post(
        "http://localhost:8081/register",
        {
            username: username,
            password: password,
            email: email,
            firstname: firstname,
            lastname: lastname, 
        },
      )
      .then(response => {
        if (response.data.error == false) {
          this.props.history.push({
            pathname: '/',
            });
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
        if (this.state.messages != "") {
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
                    <img src={logo} className="logo" alt="logo" height="300" />
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

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstname" type="firstname" placeholder="First Name" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastname" type="lastname" placeholder="Last Name" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Register
  </Button>
                        </Form>
                        <br />

                        {alertbox}

                    </Col>
                </div>


            </div>

        );
    }
}

export default withRouter(Register);