import React from "react";
import PropTypes from "prop-types";
import { withRouter} from 'react-router-dom'

import axios from "axios";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './assets/std-logo.png';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Card from 'react-bootstrap/Card';

class Dashboard extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    items: []
  }

  componentDidMount() {
    axios.get(`http://localhost:8081/items`)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
}

  render() {

  const { router, match, location, history } = this.props
  
  return (
    <div>
      <div>
        <div>
        <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/"><img src={logo} className="logo" alt="logo" height="30" /></Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/list">List</Nav.Link>
      <Nav.Link href="/">Logout</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
        </div>
        <div className="Dashboard-header">
        <Jumbotron>
          
  <h1>Welcome back, {this.props.location.state.detail.firstname} </h1>
  <p>
    Welcome to ShedApp.
  </p>
   
</Jumbotron>
</div>
        
      </div>

      <div className="Dashboard-items">
      { this.state.items.map(item => 
      

      <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.imageURL1} />
  <Card.Body>
    <Card.Title>
       {item.name}
      </Card.Title>
    <Card.Text>
    {item.description}
    </Card.Text>
    <Card.Text>
      <div className="BadgeHour">
      <Badge variant="info">£{item.pricePerHour}/hour</Badge>
      <Badge className="Badge" variant="dark">£{item.pricePerDay}/day</Badge>
      </div>
    <Button variant="primary">More Info</Button>
    </Card.Text>
  </Card.Body>
</Card>

)}
</div>
    </div>
  );
}};

export default withRouter(Dashboard);