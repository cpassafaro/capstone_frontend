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
    return (<div className='overall-container'>
      <div className="grid-container">
        <div className='grid image1 box1'>
          {/* <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image1'/> */}
        </div>
        <div className='grid image1 box2'></div>
        <div className='grid  box3'>
            <p>Welcome to Boater Beta</p>
            <p>We're here to tell you current water levels of rivers all over the United States, upcoming weather in those areas, and user feedback on hazards in rapids. If you create an account you can personalize your page to see your favorite rivers and notes on each one.</p>
            <Link to='/searchrivers'>
                <p>Search Rivers</p>   
            </Link> 
        </div>
        <div className='grid image1 box4'></div>
        <div className='grid image1 box5'></div>
        <div className='grid image1 box6'></div>
        <div className='grid image1 box6'></div>
        <div className='grid image1 box6'></div>
      </div>
      </div>
    )
  }
}

export default Home;


// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image1'/>
// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image2'/>
// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image3'/>
// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image4'/>
// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image5'/>
// <img src="https://static.vecteezy.com/system/resources/previews/000/242/523/non_2x/vector-kayak-downing-waterfall.jpg" className='grid image6'/>