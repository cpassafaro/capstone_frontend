import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

export default class Favorties extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      username: "",
      favorites: "",
    };
  }
  componentDidMount = () => {
    console.log("header-mounted");
    let token = localStorage.getItem("token");
    // console.log(token)
    axios({
      url: "https://boatertalk.herokuapp.com/getUser",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
      withCrendentials: true,
    }).then((res) => {
      // console.log(res.data);
      //   this.setState({user: res.data, isLoading:false})
      this.createFavorites(res.data);
    });
  };

  createFavorites = (userInfo) => {
    let empty = [];
    console.log(userInfo.favorites);
    let fav = userInfo.favorites;
    fav.forEach((river) => {
      let div = (
        <div>
          <div>
            {river.name}
            {river.value}
          </div>
          <Link to={{pathname: "/riverdetails", params: {data: river}}}>
            <button>See Details</button>
          </Link>
        </div>
      );
      empty.push(div);
      return empty;
    });
    this.setState({ favorites: empty, username: userInfo.username });
  };

  render() {
    console.log(this.state.username);
    return (
      <div>
        <h1>Here are your favorite rivers {this.state.username}</h1>
        <div>{this.state.favorites}</div>
      </div>
    );
  }
}
