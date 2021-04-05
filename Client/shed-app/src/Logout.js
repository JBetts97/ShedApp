import React, { Component } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import PropTypes from "prop-types";
import { Login } from "./Login";

class Logout extends React.Component {

    constructor(props){    
        super(props);
    }

    render() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('error');
    this.props.history.push('/');

    return(<h1>Processing...</h1>)
}}

export default withRouter(Logout);