import React, { Component } from "react";
import axios from "axios";
import "./RiverDetail.css";
import { Route, Link } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core/";

axios.defaults.withCredentials = false;

export default class RiverDetailsPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      river: props.location.params.data.name,
      level: props.location.params.data.value,
      latitude: props.location.params.data.latitude,
      longitude: props.location.params.data.longitude,
      name: "",
      isLoading: true,
      weather: [],
      comment: "",
    };
  }
  componentDidMount = () => {
    // this gets the weather station for our latitue and longitude
    let element = "";
    axios
      .get(
        `https://api.weather.gov/points/${this.state.latitude},${this.state.longitude}`,
        { withCredentials: false }
      )
      .then((res) => {
        element = res.data.properties.forecast;
        this.getWeather(element);
      });
  };

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
    let river = {
      title: this.state.river,
      userComments: [this.state.comment],
    };

    axios
      .put(
        `https://boatertalk.herokuapp.com/river/addComment/${this.state.river}`,
        river
      )
      .then((res) => {
        console.log(res);
        //we need to create each river so this checks to see if a river hasn't been created yet
        if (res.data == null) {
          axios
            .post(`https://boatertalk.herokuapp.com/river/create`, river)
            .then((res) => {
              console.log(res);
            });
        }
      });
  };


  render() {
    console.log(this.state.comment);
    if (this.state.isLoading == true) {
      return (
        <CircularProgress
          style={{
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      );
    } else {
      console.log(this.state.weather);
      return (
        <div className="overall-container">
          <div className="weather-title-box">
            <div className="river-detail-box">
              <div className="river-title">{this.state.river}</div>
              <div>{this.state.level} cfs</div>
            </div>
            <div className="weather-box">
              <div>WEATHER</div>
              <div>{this.state.temperature}</div>
              <div>{this.state.weather[0].detailedForecast}</div>
              <img src={this.state.weather[0].icon} />
              <Button>Get 5 day forecast for this area</Button>
            </div>
          </div>
          <div className="textfield">
            <p>
              If you have recently gotten a run on this river and would like to
              leave a rapid update, please do so below.
            </p>
            <TextField
              onChange={this.getComment}
              className="input"
              id="outlined-basic"
              label="Comment"
              variant="outlined"
              style={{ height: "30vh" }}
            ></TextField>
            <Button
              onClick={this.addComment}
              style={{
                backgroundColor: "#573C67",
                color: "white",
                height: "55px",
              }}
            >
              Add Comment
            </Button>
          </div>
        </div>
      );
    }
  }
}
