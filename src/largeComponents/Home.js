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
      user: '',
    }
  }

  componentDidMount = () => {
    // console.log('app-mounted')
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
      this.setState({user: res.data})
    })
  }



  render(){
    console.log(this.state.user)
    return (<div className='overall-container'>
      <div className="grid-container">
        <div className='grid image box1'></div>
        <div className='grid image box2'></div>
        <div className='grid box3'>
            <p className='title'>Welcome to Boater Beta</p>
            <p className='body'>We're here to tell you current water levels of rivers all over the United States, upcoming weather in those areas, and user feedback on hazards in rapids.</p>
            {/* <p className='body'>Create an account to personalize your page! Then you can see your favorite rivers and notes on each one.</p> */}
            <Link to='/searchrivers'>
                <p>Search Rivers</p>   
            </Link> 
            <Link to='/favorites'>
              <div>Favorites</div>
            </Link>
        </div>
        <div className='grid image box4'></div>
        <div className='grid image box5'></div>
        <div className='grid image box6'></div>
        <div className='grid image box7'></div>
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