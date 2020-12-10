import React, { Component } from "react";
import axios from 'axios'
import './App.css';
import Header from './components/Header'
import SignIn from './components/SignIn'
import Home from './largeComponents/Home'
import Register from './components/Register'
import { CircularProgress } from "@material-ui/core/";
import { Route, Link} from "react-router-dom";


class App extends Component{
  constructor(){
    super();

    this.state = {
      isLoading:true,
      user: ''
    }
  }

  // componentDidMount = () => {
  //   console.log('app-mounted')
  //   const headers={
  //     "Content-Type": 'application/json',
  //     "Access-Control-Allow-Origin": '*',
  //     Accept: 'application/json'
  //   }

  //   fetch(`https://boatertalk.herokuapp.com/getUser`, {credentials: 'include'})
  //     .then(res => res.json())
  //     .then(res =>console.log(res))
  // }


  render(){
    console.log(this.state.user)
    return (<div>
        <nav>
          <Link exact to = "/"></Link>
        </nav>
        <main>
          <Header/>
          <Route path="/signin" component={SignIn}/>
          <Route path='/register' component={Register}/>
          <Route exact path='/' component={Home}/>
        </main>
      </div>
    )
  }
}

export default App;
