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
import logo from '../assets/std-logo.png';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'
import Card from 'react-bootstrap/Card';

require('dotenv').config();

console.log("the key is...");
console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const containerStyle = {
  width: '400px',
  height: '400px'
};

class InfoDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locationInfo: []
    };
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    axios.get(`http://postcodes.io/postcodes/` + this.props.location.state.info.postcode)
      .then(res => {
        const locationInfo = Object.values(res.data.result)
        this.setState({ locationInfo });
      })
  }

  render() {

  const { router, match, location, history } = this.props
  const lattitude = this.state.locationInfo[7]
  const longitute = this.state.locationInfo[6]
  const position = {
    lat: lattitude, 
    lng: longitute
  };

  return (

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

<Container>
  {/* Stack the columns on mobile by making one full-width and the other half-width */}


  
  {/* Columns are always 50% wide, on mobile and desktop */}
  <Row>
    <Col>
    <h1>Item Info</h1> <br/>
    Item Name: {this.props.location.state.info.name} <br/>
    Item Description: {this.props.location.state.info.description} <br/>
    <img height="250px" src={this.props.location.state.info.imageURL1} /> <br/>
    </Col>
    <Col>
      <h1>Location Info</h1>
  
    <div>
    <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={position}
          zoom={15}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
      </LoadScript>
      </div>
      Postcode: {this.props.location.state.info.postcode} <br/>
      Region: {this.state.locationInfo[10]}
    </Col>
    <Col>
    <h1>Price Info</h1>
    Daily Price: {this.props.location.state.info.pricePerDay} <br/>
    Hourly Price: {this.props.location.state.info.pricePerHour}
    </Col>
  </Row>
</Container>

    </div>  
)

}};

export default withRouter(InfoDetail);