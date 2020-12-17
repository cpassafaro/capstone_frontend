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

export default class Register extends Component {
  constructor() {
    super();

    this.state = {
        username: '',
        password: '',
        photo: ''
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
  getPhoto = e => {
    let element = e.target.value;
    this.setState({photo: element})
  }



  registerAccount =e => {
      e.preventDefault();
      console.log(this.state.username, this.state.password)

      const user = {
        username: this.state.username,
        password: this.state.password,
        picture: this.state.photo
      }

      axios({
        url:"https://boatertalk.herokuapp.com/register",
        withCredentials:true,
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data:{
          username:this.state.username,
          password:this.state.password,
          picture:this.state.photo
        },
      } 
      ).then(res=>{
        console.log(res.data);
        if(res.status ==200){
          alert('Success! Please Sign in!')
          this.props.history.push('/signin')
        }
        localStorage.setItem('token',res.data.token);
      })
      .catch(function(error){
        if(error.response){
          alert('Username already taken')
        }
        localStorage.setItem('token','');
      })     
  }



  render() {
    return (
      <Container className='input-area'>
        <Typography>Create Account</Typography>
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
            <TextField 
            style={{marginBottom:'10px'}}
            className='box'
            id="outlined-password-input"
            label="Photo Url"
            type="url"
            variant="outlined" 
            onChange={this.getPhoto}
            />
            <Button 
            className='box'
            type = "submit" 
            variant="outlined"
            onClick={this.registerAccount}>
            Submit
            </Button>
        </div>
      </Container>
    );
  }
}
