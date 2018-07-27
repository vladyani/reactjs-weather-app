import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import api from './api.json';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: `http://api.openweathermap.org/data/2.5/forecast?q=london%2Cus&APPID=${api.key}`
        }
        
    }
    
    getData = () => {
        let url = this.state.url;
        fetch(url).then( response => {
           return response.json() 
        }).then( data =>   this.setState({
            location: data.city.name,
            country: data.city.country,
            population: data.city.population,
            time: `${(new Date).getMonth()} ${(new Date).getDate()}, ${(new Date).getHours()}):${(new Date).getMinutes()} `,
            
        }));
        
    }
    
    componentDidMount(){
        this.getData();
    }
        
        
  render() {
      console.log(this.state.url);
    return (
      <div className="App">
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 push-md-3 col-xl-4 push-xl-4 card-block">
                    <div className="d-flex justify-content-between">
                        <div className="d-inline-block">
                            <h3>{this.state.location}, {this.state.country}</h3>
                            <p>{this.state.time}</p>
                            <p>{this.state.time}</p>
                        </div>
                        <div className="d-inline-block btn-group btn-group-sm" data-toggle="buttons">
                            <label id="F" className="btn btn-primary active" aria-pressed="true">
                                <input type="radio" name="options" checked/>&deg; F
                            </label>
                        <label id="C" className="btn btn-primary" aria-pressed="true">
                                <input type="radio" name="options" />&deg; C
                            
                            </label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4 col-md-3">
                            <img className="img-fluid" alt="Weather icon" src=""/>
                        </div>
                        <div className="col-4 col-md-4">
                            <h1 className="big-font">
                                69
                                <span className="units">&deg;F</span>
                            </h1>
                        </div>
                        <div className="col-4 col-md-5">
                            <div className="small-font">
                                <p>
                                    Population: <b>{this.state.population}</b>
                                </p>
                                <p>
                                    Humidity: <b>96%</b>
                                </p>
                                <p>
                                    Wind: <b>0 mph 197&deg;</b>
                                </p>
                                <p>
                                    Precipitation: <b>0 mm</b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className="form-inline mt-4 justify-content-around">
                        <input type="text" value="Wroclaw" className="form-control mb-4 mb-sm-0" placeholder="Enter City, please"/>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <p className="text-danger text-center mt-2"></p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
