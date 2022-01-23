import React from "react";
import PropTypes from "prop-types";
import { withRouter, useHistory } from 'react-router-dom'

import axios from "axios";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/std-logo.png';
import Jumbotron from 'react-bootstrap/Jumbotron';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card';
import List from './List';
import ReactLoading from 'react-loading';

import { authenticationService } from '../services/authentication.service';

class Profile extends React.Component {
  constructor(props){
    super(props);  
    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null,
      items: []
  };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    var data = { username: JSON.parse(localStorage.getItem('currentUser'))};
    var headers = {
      'Authorization' : 'Bearer ' + JSON.parse(localStorage.getItem('token'))
    }

    axios.post(`http://localhost:8081/userdetail`, data, {
      headers: headers
    })
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }
    
  
  render() {
  const { currentUser, users, router, match, location, history } = this.props;

  if (localStorage.getItem("token") === null) { window.location.reload(); return (
    <h1>Loading...</h1>
  )
    
  }

  if (localStorage.getItem("token") != null) { return (
    <div>
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/"><img src={logo} className="logo" alt="logo" height="30" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link onClickCapture={() => this.handleList()}>List</Nav.Link>
      <Nav.Link href="/logout">Logout</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>

{ this.state.items.map(item => 
<Jumbotron>
  <h1>Profile Info</h1> 
  <h2>Firstname: {item.firstname}</h2>
  <h2>Lastname: {item.lastname}</h2>
  <h2>Username: {item.username}</h2>
  <h2>Email: {item.email}</h2>
  
</Jumbotron>
)}

    </div>
  )
};
}};

export default withRouter(Profile);