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

      axios({
        url:"https://boatertalk.herokuapp.com/login",
        method:"POST",
        withCredentials:true,
        headers: {
          'Content-Type': 'application/json'
        },
        data:{
          username:this.state.username,
          password:this.state.password,
        }
      } 
      ).then(res=>{
        console.log(res);
        localStorage.setItem('token',res.data.token);
        res.headers.authorization = `Bearer ${res.data.token}`
        this.props.parentRefresh(this.state.username)
        alert('Success')
        this.props.history.push('/')
      }).catch(function(error){
        if(error.response){
          alert('Username or Password Invalid')
        }
      })
  }

  render() {
    console.log(this.state.username)
    return (
      <Container>
        <Typography>Sign In</Typography>
        <div className='input-area'>
            <TextField 
            style={{marginBottom:'10px'}}
            className='box'
            id="outlined-password-input"
            label="Username"
            type="username"
            autoComplete="current-password"
            variant="outlined" 
            onChange={this.getUsername}
            />
            <TextField
            style={{marginBottom:'10px'}}
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
