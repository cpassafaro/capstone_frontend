import React, { Component } from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core/";
import './Weather.css'


export default class Weather extends Component{
    constructor(props){
        super(props);
        console.log('hey kev', props)
        this.state = {
            weather: props.location.params.data,
            divs: '',
            isLoading: true
        }
    }
    componentDidMount(){
        let aray = this.state.weather
        console.log(aray)
        let empty = []
        aray.forEach(element => {
            let html = (<div className='weather-container'>
                <div className='current-day'>{element.name}</div>
                <div className='snapshot-container'>
                    <div>{element.temperature}°F</div>
                    <div>{element.detailedForecast}</div>
                </div>
                <img src={element.icon} className='detailed-container' />
            </div>)
            empty.push(html)
        })
        this.setState({divs: empty, isLoading:false})
    }

    render(){
        if(this.state.isLoading == true){
            return(
                <CircularProgress/>
            )
        }else{
        return(<div className='element'>
            <h1 className='title-element'>Weather Forecast</h1>
            <div className='all-weather'>{this.state.divs}</div>
        </div>
        )}
    }
}