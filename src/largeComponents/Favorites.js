import React, { Component } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './Favorites.css'

export default class Favorties extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      username: "",
      favorites: "",
      user:''
    };
  }

  componentDidMount = () => {
    this.updateUser()
  };

  deleteFavorites = (e) => {
    let river = e.target.parentElement.parentElement.firstChild.firstChild.textContent
    console.log(river)
    let favorites = this.state.user.favorites
    console.log(favorites)
    let thisRiver = favorites.filter(item => {
      if(item.name == river){
        return item
      }
    })
    console.log(thisRiver)
    axios.put(`https://boatertalk.herokuapp.com/favorites/${this.state.username}/delete/${river}`)
      .then(res => {
        console.log(res)
      })
      setTimeout(() => {
        this.updateUser()
      }, 1000) 
  }

  updateUser= () => {
    console.log("updateuser called");
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
      console.log(res.data);
      this.setState({user: res.data})
      this.createFavorites(res.data);
    });
  }

  createFavorites = (userInfo) => {
    let empty = [];
    let fav = userInfo.favorites;
    fav.forEach((river) => {
      let div = (
        <Card style={{width:'30%'}}>
        <CardContent>
          <Typography variant="h5" component="h2" value={river}>
          {river.name}
          </Typography>
          <Typography variant="body2" component="p">
            {river.value}cfs
          </Typography>
        </CardContent>
        <Link to={{pathname: "/riverdetails", params: {data: river}}}>
          <Button size="small">See Details</Button>
        </Link>
        <Button onClick={this.deleteFavorites}>Delete</Button>
      </Card>
      );
      empty.push(div);
      return empty;
    });
    this.setState({ favorites: empty, username: userInfo.username });
  };

  render() {
    // console.log(this.state.user);
    return (
      <div>
        <h1 className='title'>Favorite Rivers for: {this.state.username}</h1>
        <div className='fav-container'>{this.state.favorites}</div>
      </div>
    );
  }
}
