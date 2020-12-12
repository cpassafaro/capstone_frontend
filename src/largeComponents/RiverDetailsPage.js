import React, { Component } from "react";
import axios from "axios";
import "./RiverDetail.css";
import { Route, Link } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
} from "@material-ui/core/";

export default class RiverDetailsPage extends Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            river: '',
            level: ''
        }
    }

    render(){
        return(<div className='overall-container'>
            <div className ='weather-title-name'>
                <div className="river-box">
                    <div className='title'>{this.state.river}</div>
                    <div>{this.state.level}</div>
                </div>
                <div className="weather-box">
                    <div>WEATHHEERRRRRR</div>
                </div>
            </div>
            <div>
                <TextField className='textfield' id="outlined-basic" label="Updates" variant="outlined"></TextField>
            </div>
        </div>

        )
    }
}

// river: props.location.params.data.name,
// level: props.location.params.data.value