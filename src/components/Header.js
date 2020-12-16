import React, { Component } from "react";
import axios from 'axios'
import "./Header.css";
import { Route, Link} from "react-router-dom";


export default class Header extends Component{
  constructor(){
    super();
    console.log(this.props)
    this.state = {
      user:'',
    }
  }
  componentDidMount = () => {
    console.log('header-mounted')
    let token = localStorage.getItem('token');
    // console.log(token)
    axios({
      url:"https://boatertalk.herokuapp.com/getUser",
      method:"GET",
      headers: {
        authorization: `Bearer ${token}`
      },
      withCrendentials:true
    } ).then(res=>{
      // console.log(res.data);
      // this.setState({user: res.data})
      this.welcomeUser(res.data)
    })
  }
  componentDidUpdate(props){
    console.log(this.props, this.state.user)
    if(this.state.user != this.props.signInUser){
      console.log('condition met')
      // let string = `Welcome ${this.props.signInUser}`
      this.setState({user: this.props.signInUser, favorites:this.props.favorites})
    }
  }
  

  welcomeUser = (user) => {
    console.log(user)
    let div = <div><img src={user.photo}/> <div>{user.username}</div></div>
    this.setState({user: user.username})
  }

  render(){
  // console.log(localStorage)
  console.log(this.state.user)
  return (
    <div className='container'>
      <div>
        <Link to='/' className='link'>
            <h1>Boater Beta</h1>
        </Link>
      </div>
      <div className='p-container'>
        <div className='link'>{this.state.user}</div>
        <Link to='/favorites' className='link'>
          <div>Favorites</div>
        </Link>
        <Link to="/signin" className='link'>
          <p>Sign In</p>
        </Link>
        <Link to="/register" className='link'>
            <p>Create Account</p>
        </Link>
      </div>
    </div>
  )}
}
