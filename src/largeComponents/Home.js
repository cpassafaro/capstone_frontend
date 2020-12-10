import React, { Component } from "react";
import axios from 'axios'
import './Home.css'
import { CircularProgress } from "@material-ui/core/";
import { Route, Link} from "react-router-dom";


axios.defaults.withCredentials = true

class Home extends Component{
  constructor(){
    super();

    this.state = {
      isLoading:true,
      user: ''
    }
  }

  componentDidMount = () => {
    console.log('app-mounted')

    axios.get(`https://boatertalk.herokuapp.com/getUser`)
      .then(res => {
          console.log(res)
        this.setState({user: res})
      })
  }
    // componentDidMount = () => {
    //     console.log('app-mounted')
    //     // const headers={
    //     // "Content-Type": 'application/json',
    //     // "Access-Control-Allow-Origin": '*',
    //     // Accept: 'application/json'
    //     // }
    //     //this isn't liking the end of the json function for some reason
    //     // fetch('https://boatertalk.herokuapp.com/getUser')
    //     //     .then(res => res.json())
    //     //     .then(data =>console.log(data))

    //     axios.get('https://boatertalk.herokuapp.com/getUser', {withCrendentails : true})
    //         .then(res => {
    //             console.log(res)
    //         })
    // }


  render(){
    // console.log(this.state.user)
    return (
      <div className='home'>
      </div>
    )
  }
}

export default Home;