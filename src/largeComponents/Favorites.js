import React, { Component } from "react";
import axios from 'axios'

export default class Favorties extends Component{
    constructor(){
        super()

        this.state ={
            isLoading:true,
            user:''
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
          this.setState({user: res.data, isLoading:false})
        //   this.welcomeUser(res.data)
        })
      }

    render(){
        console.log(this.state.user)
        return(<div></div>

        )
    }
}