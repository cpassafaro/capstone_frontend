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
      user: ''
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
    this.setState({user:welcome})
  }

  render(){
    console.log(this.state.user)
    return (<div>
        <nav>
          <Link exact to = "/"></Link>
        </nav>
        <main>
          <Header signInUser={this.state.user}/>
          <Route path="/signin" render={() => {
            return <SignIn parentRefresh={this.parentRefresh}/>
          }}/>
          <Route path='/favorites' component={Favorites}/>
          <Route path='/register' component={Register}/>
          <Route exact path='/' component={Home}/>
          <Route path='/searchrivers' component={SearchRiver}/>
          <Route path='/riverdetails' component={RiverDetailsPage}/>
          <Route path='/weather' component={Weather}/>
        </main>
      </div>
    )
  }
}

export default App;
