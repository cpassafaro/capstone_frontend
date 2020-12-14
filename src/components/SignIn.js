import React, { Component } from "react";
import "./SignIn.css";
import { Route, Link, Redirect } from "react-router-dom";
import axios from 'axios'
import {
  Button,
  Typography,
  Container,
  TextField,
  Input,
} from "@material-ui/core";

axios.defaults.withCredentials = true

export default class SignIn extends Component {
  constructor() {
    super();

    this.state = {
        username: '',
        password: '',
        user: ''
    };
  }

  getUsername = e => {
    let element = e.target.value;
    this.setState({username: element})
  }

  getPassword = e => {
    let element = e.target.value;
    this.setState({password: element})
  }

  signIn =e => {
      e.preventDefault();
      console.log('hello')

      const user = {
        username: this.state.username,
        password: this.state.password,
        picture: this.state.photo
      }

      axios.post(`https://boatertalk.herokuapp.com/login`, user)
        .then(res => {
            axios.get(`https://boatertalk.herokuapp.com/getUser`)
            return res
        })
        .then(data => {
          this.setState({user: data})
        })
        
  }

  render() {
    console.log(this.state.user)
    return (
      <Container>
        <Typography>Sign In</Typography>
        <div className='input-area'>
            <TextField 
            className='box'
            id="outlined-password-input"
            label="Username"
            type="username"
            autoComplete="current-password"
            variant="outlined" 
            onChange={this.getUsername}
            />
            <TextField
            className='box'
            id="outlined-password-input"
            label="Password"
            type="username"
            autoComplete="current-password"
            variant="outlined"
            onChange={this.getPassword}
            />
            <Button 
            className='box'
            type = "submit" 
            variant="outlined"
            onClick={this.signIn}>
            Submit
            </Button>
        </div>
      </Container>
    );
  }
}
