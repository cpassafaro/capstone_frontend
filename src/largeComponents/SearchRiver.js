import React, { Component } from "react";
import axios from "axios";
import "./SearchRiver.css";
import { Route, Link } from "react-router-dom";
import {
  InputLabel,
  FormHelperText,
  FormControl,
  Select,
  NativeSelect,
  Button,
} from "@material-ui/core/";


export default class SearchRiver extends Component {
  constructor() {
    super();

    this.state = {
      rivers: "",
      state: "",
      holder: "",
    };
  }

  getInput = (e) => {
    let element = e.target.value;
    this.setState({ state: element });
  };

  getRivers = (e) => {
    let rivers = "";
    const url = `https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=${this.state.state}&parameterCd=00060,00065&siteType=ST&siteStatus=all`;
    axios.get(url, { withCredentials: false }).then((res) => {
      rivers = res;
      this.filterRivers(rivers);
    });
  };

  filterRivers = (rivers) => {
    let riverInfo = [];
    let riverArray = rivers.data.value.timeSeries;
    console.log(riverArray);

    for (let i = 1; i < riverArray.length; i++) {
      //if elements name same as last element name then do this
      // console.log(riverArray[i])
      if (
        riverArray[i].sourceInfo.siteName ==
        riverArray[i - 1].sourceInfo.siteName
      ) {
        // console.log(`hit ${riverArray[i]}`)
        //could get feet here and pass it down
      } else {
        // console.log('here')
        let river = {
          name: riverArray[i].sourceInfo.siteName,
          value: riverArray[i].values[0].value[0].value,
          latitude: riverArray[i].sourceInfo.geoLocation.geogLocation.latitude,
          longitude: riverArray[i].sourceInfo.geoLocation.geogLocation.longitude
        };
        riverInfo.push(river);
      }
    }
    this.buildHtml(riverInfo);
    // console.log(riverInfo)
    //call function and pass it the array of information elements that we have made
  };

  buildHtml = (rivers) => {
    let interior = [];
    rivers.forEach((element) => {
      let div = (
        <div className="river-box">
          <div className="river-title">{element.name}</div>
          <div className="river-level">Current Water Level :{element.value} cfs</div>
          <Link to={{pathname: "/riverdetails", params: {data: element}}}>
            <Button style={{color: 'white', fontWeight:'bolder'}}>See River Details</Button>
          </Link>
        </div>
      );
      interior.push(div);
    });
    this.setState({ holder: interior });
  };

  render() {
    return (
      <div className='og'>
        <div className="sub-container">
          <FormControl style={{color: "white"}}>
            <InputLabel htmlFor="age-native-helper" style={{color: "white"}}>State</InputLabel>
            <NativeSelect style={{color: "white"}} onChange={this.getInput}>
              <option aria-label="None" value="" />
              <option value={"al"}>Alabama</option>
              <option value={"ak"}>Alaska</option>
              <option value={"aq"}>American Somoa</option>
              <option value={"az"}>Arizona</option>
              <option value={"ar"}>Arkansas</option>
              <option value={"ca"}>California</option>
              <option value={"co"}>Colorado</option>
              <option value={"ct"}>Conneticut</option>
              <option value={"de"}>Delaware</option>
              <option value={"dc"}>District of Columbia</option>
              <option value={"fl"}>Florida</option>
              <option value={"ga"}>Georgia</option>
              <option value={"gu"}>Guam</option>
              <option value={"hi"}>Hawaii</option>
              <option value={"il"}>Illinois</option>
              <option value={"in"}>Indiana</option>
              <option value={"ia"}>Iowa</option>
              <option value={"ks"}>Kansas</option>
              <option value={"ky"}>Kentucky</option>
              <option value={"la"}>Louisiana</option>
              <option value={"me"}>Maine</option>
              <option value={"ma"}>Massachusetts</option>
              <option value={"mi"}>Michigan</option>
              <option value={"ca"}>California</option>
              <option value={"mn"}>Minnesota</option>
              <option value={"ms"}>Mississippi</option>
              <option value={"mo"}>Missouri</option>
              <option value={"mt"}>Montana</option>
              <option value={"ne"}>Nebraska</option>
              <option value={"nv"}>Nevada</option>
              <option value={"nh"}>New Hampshire</option>
              <option value={"nj"}>New Jersey</option>
              <option value={"nm"}>New Mexico</option>
              <option value={"ny"}>New York</option>
              <option value={"nc"}>North Carolina</option>
              <option value={"nd"}>North Dakota</option>
              <option value={"mp"}>Northern Mariana Islands</option>
              <option value={"oh"}>Ohio</option>
              <option value={"ok"}>Oklahoma</option>
              <option value={"or"}>Oregon</option>
              <option value={"pa"}>Pennsylvania</option>
              <option value={"pr"}>Puerto Rico</option>
              <option value={"ri"}>Rhode Island</option>
              <option value={"sc"}>South Carolina</option>
              <option value={"sd"}>South Dakota</option>
              <option value={"tn"}>Tennessee</option>
              <option value={"tx"}>Texas</option>
              <option value={"ut"}>Utah</option>
              <option value={"vt"}>Vermont</option>
              <option value={"vi"}>Virgin Islands</option>
              <option value={"va"}>Virginia</option>
              <option value={"wa"}>Washington</option>
              <option value={"wv"}>West Virginia</option>
              <option value={"wi"}>Wisconson</option>
              <option value={"wy"}>Wyoming</option>
            </NativeSelect>
            <FormHelperText style={{color: "white"}}>Search Rivers By State</FormHelperText>
          </FormControl>
          <Button style={{color: "white", border: '2px solid white'}} variant="outlined" type="submit" onClick={this.getRivers}>
            Submit
          </Button>
        </div>
        <div className="main-container">{this.state.holder}</div>
      </div>
    );
  }
}
