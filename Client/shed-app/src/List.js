import React, { Component } from "react";
import { withRouter, useHistory } from 'react-router-dom';

import axios from "axios";
import Dashboard from './Dashboard';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import logo from './assets/cover-logo.png';

export class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            pricePerHour: 0,
            pricePerDay: 0,
            imageURL1: "",
        }
        this.updateCredentials = this.updateCredentials.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    updateCredentials(name, description, pricePerHour, pricePerDay, imageURL1) {
        this.setState({
            name: name,
            description: description,
            pricePerHour: pricePerHour,
            pricePerDay: pricePerDay,
            imageURL1: imageURL1
        })
    }


    handleSubmit(event) {
    const { name, description, pricePerHour, pricePerDay, imageURL1 } = this.state;

    axios
      .post(
        "http://localhost:8081/list",
        {
            name: name,
            description: description,
            pricePerHour: pricePerHour,
            pricePerDay: pricePerDay,
            imageURL1: imageURL1, 
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
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="name" placeholder="Item Name" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" type="description" placeholder="Item Descrition" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Price (£) Per Hour</Form.Label>
                                <Form.Control name="pricePerHour" type="pricePerHour" placeholder="Price (£) per hour" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Price (£) Per Day</Form.Label>
                                <Form.Control name="pricePerDay" type="pricePerDay" placeholder="Price (£) per day" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Image Link (URL)</Form.Label>
                                <Form.Control name="imageURL1" type="imageURL1" placeholder="Image URL" onChange={this.handleChange.bind(this)} />
                            </Form.Group>

                            <Button variant="primary" type="submit" >
                                Create
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

export default withRouter(List);