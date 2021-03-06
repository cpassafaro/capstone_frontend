import React, { Component } from "react";
import axios from "axios";
import "./RiverDetail.css";
import { Route, Link } from "react-router-dom";
import _ from 'lodash';
import { TextField, Button, CircularProgress } from "@material-ui/core/";

axios.defaults.withCredentials = false;

export default class RiverDetailsPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);



    this.state = {
      data: _.get(props, 'location.params.data'),
      river: _.get(props, 'location.params.data.name'),
      level: _.get(props, 'location.params.data.value'),
      latitude: _.get(props, 'location.params.data.latitude'),
      longitude: _.get(props, 'location.params.data.longitude'),
      name: "",
      isLoading: true,
      weather: [],
      comment: "",
      alreadyCreatedComments: '',
      user: _.get(props, 'user'),
      userWaterLevel: ''
    };
  }


  componentDidMount = () => {
    // this gets the weather station for our latitue and longitude gets closest observation state to it
    this.getComments()
    let element = "";
    axios
      .get(
        `https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}`,
        { withCredentials: false }
      )
      .then((res) => {
            element = res.data.properties.forecast;
            this.getWeather(element);
        // }
      });
  };
  

  getComments = () => {
      console.log('update')
       axios.get(`https://boatertalk.herokuapp.com/comment/${this.state.river}`)
        .then(res => {
          console.log(res)
            if(res.data != null){
              console.log(res.data)
                let element1 =res.data
                this.loopThroughComments(element1)
            }
        })
  }

  loopThroughComments = (comments) => {
    let interior = []
    comments.forEach(element =>{
        let div = (
        <div className='comments'>{element.userComments} <p className='date'>{element.commentDate}</p></div>
        )
        interior.push(div)
    })
    //comments are added to end of database so to get newest lets reverse it
    let reversed = interior.reverse();
    this.setState({alreadyCreatedComments: reversed, comment:''})
  }



  getWeather = (weather) => {
    axios.get(weather, { withCredentials: false }).then((res) => {
      this.setState({
        temperature: res.data.properties.periods[0].name,
        weather: res.data.properties.periods,
        isLoading: false,
      });
    });
  };

  getComment = (e) => {
    let element = e.target.value;
    this.setState({ comment: element });
  };

  addComment = () => {
    if(this.state.comment == ''){
      alert('Please enter a comment to submit')
    }else{
      let river = {
        title: this.state.river,
        userComments: this.state.comment,
        commentDate: Date.now()

      };
      axios.post(`https://boatertalk.herokuapp.com/comment/create`, river)
        .then(res => {
          console.log(res)
        })

      //have to call asynchrnously because axios post request takes a second to update to db
      setTimeout(() => {
        this.getComments()
      }, 500) 
    }
  };

  addFavorites = () => {
    let user ={
      username: this.state.user,
      favorites: [this.state.data]
    }
    if(this.state.user != ''){
      axios.put(`https://boatertalk.herokuapp.com/favorites/${this.state.user}`, user)
      .then(res => {
        console.log(res.status)
        if(res.status == 200){
          alert('Success')
          console.log(res)
      }})
    }else{
      alert('Login or Create User to have access')
    }
  }

  getUserWaterLevel = () => {
    
  }





  render() {
    console.log(this.state.user);
    if (this.state.isLoading == true) {
      return (
        <CircularProgress
          style={{}}
        />
      );
    } else {
      console.log(this.state.weather);
      return (
        <div className="overall-container-here">
          <div className="weather-title-box">
            <div className="river-detail-box">
              <div className="river-title opacity">{this.state.river}</div>
              <div className='opacity'>USGS GAUGE: {this.state.level} cfs</div>
              <div>{this.state.userWaterLevel}</div>
              <div>
                <Button style={{backgroundColor:'#573C67', color:'white', marginTop: '10px', textDecoration:'none'}} onClick={this.addFavorites}>Add to Favorites</Button>
                {/* <Button style={{backgroundColor:'#573C67', color:'white', marginTop: '10px', marginLeft:'10px', textDecoration:'none'}}>Add visual level</Button> */}
              </div>
            </div>
            <div className="weather-box">
              <div className='opacity'>WEATHER</div>
              <div className='opacity smaller'>{this.state.temperature}: {this.state.weather[0].detailedForecast}</div>
              <img src={this.state.weather[0].icon} style={{border: '3px solid black'}}/>
              <Link to={{
                pathname:'/weather', 
                params:{
                  data: this.state.weather,
                  currentRiver: this.state.data
                }
              }}>
                <Button style={{backgroundColor:'#573C67', color:'white', marginTop: '10px', textDecoration:'none'}}>Get 7 day forecast for this area</Button>
              </Link>
            </div>
          </div>
          <div className="comment-container">
          <div className='submission-area'>
              <textarea 
                value={this.state.comment}
                onChange={this.getComment}
                className="input"
                id="outlined-basic"
                label="Comment"
                variant="outlined"
              />
              <Button
                onClick={this.addComment}
                style={{
                  backgroundColor: "#573C67",
                  color: "white",
                  height: "55px",
                  width:'100%',
                  borderRadius: '0 0 0 0',
                }}
              >
                Add Comment
              </Button>
            </div>
          </div>
          <div className='comment-container'>{this.state.alreadyCreatedComments}</div>
        </div>
      );
    }
  }
}
