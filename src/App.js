import React, { Component } from "react";
import axios from 'axios'
import './App.css';
import Header from './components/Header'
import SignIn from './components/SignIn'
import Home from './largeComponents/Home'
import Weather from './largeComponents/Weather'
import SearchRiver from './largeComponents/SearchRiver';
import RiverDetailsPage from './largeComponents/RiverDetailsPage'
import Register from './components/Register'
import Favorites from './largeComponents/Favorites'
import { CircularProgress } from "@material-ui/core/";
import { Route, Link} from "react-router-dom";


class App extends Component{
  constructor(){
    super();

    this.state = {
      isLoading:true,
      user: '',
      userWithoutWelcome: ''
    }
  }

  componentDidMount = () => {
    console.log('app-mounted')
  }

  componentDidUpdate (){
    console.log('app-update')
  }

  parentRefresh = (user) => {
    console.log('hello')
    let welcome =`Welcome ${user}`
    this.setState({user:welcome, userWithoutWelcome:user})
  }

  render(){
    console.log(this.state.user)
    return (<div>
        <nav>
          <Link exact to = "/"></Link>
        </nav>
        <main>
          <Header signInUser={this.state.user}/>
          <Route path="/signin" render={(routerProps) => {
            return <SignIn {...routerProps} parentRefresh={this.parentRefresh}/>
          }}/>
          <Route path='/favorites' component={Favorites}/>
          <Route path='/register' component={Register}/>
          <Route exact path='/' component={Home}/>
          <Route path='/searchrivers' component={SearchRiver}/>
          <Route path='/riverdetails' render={(routerProps) => {
            return <RiverDetailsPage {...routerProps} user={this.state.userWithoutWelcome}/>
          }}/>
          <Route path='/weather' component={Weather}/>
        </main>
      </div>
    )
  }
}

export default App;
