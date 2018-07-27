import React, { Component } from 'react';
import './App.css';
import api from './api.json';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            url: `http://api.openweathermap.org/data/2.5/forecast?q=london%2Cus&APPID=${api.key}`,
            data: [],
            pictures: [
                'https://cdn3.iconfinder.com/data/icons/bebreezee-weather-symbols/690/icon-weather-sunrainheavy-512.png','https://cdn4.iconfinder.com/data/icons/wthr-color/32/partly-cloudy-day-512.png','https://hanslodge.com/images2/sky-clipart-clear-weather/sunny-weather-icon-13.jpg','https://cdn3.iconfinder.com/data/icons/weather-16/256/Clear_Night-512.png'
            ],
            inputValue: '',
            unitValue: 'F'
        }
        
    }
    
//      randomValue = (items) =>{
//        return items[Math.floor(Math.random() * items.length)];
//    }
//  
    randomNumber = (num) => {
        return Math.floor(Math.random() * num);
    }
    
    showDate = () => {
         const d = new Date();
        return ((d.getDate() < 10)?"0":"") + d.getDate() +"-"+(((d.getMonth()+1) < 10)?"0":"") + (d.getMonth()+1) +"-"+ d.getFullYear() + " " + ((d.getHours() < 10)?"0":"") + d.getHours() +":"+ ((d.getMinutes() < 10)?"0":"") + d.getMinutes() +":"+ ((d.getSeconds() < 10)?"0":"") + d.getSeconds();
    }
    
    
    getData = () => {
        let url = this.state.url;
        fetch(url).then( response => {
           return response.json() 
        }).then( data =>   this.setState({
            location: data.city.name,
            country: data.city.country,
            population: data.city.population,
            time: this.showDate(),
            tempF: Math.floor(Math.random() * 70 + 1),
            tempC: Math.floor(Math.random() *40 + 1),
            humidity: this.randomNumber(100) + '%',
            wind: this.randomNumber(400),
            precipitation: this.randomNumber(100)
        })).catch( error => {
            this.setState({
                errorMessage: 'Please, enter a valid city.'
            });
        })
    }
    
    handleChange = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
           url: `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.inputValue}%2Cus&APPID=${api.key}`,
            
        }, () => {
            this.getData();
        });
       
        let img = document.querySelector('img');
        img.setAttribute('src',this.state.pictures[Math.floor(Math.random() * this.state.pictures.length)]);
    }
    
    handleClick = (e) => {
        this.setState({
            unitValue: e.target.id
        });
    }
        
        
    componentDidMount(){
        this.getData();
//        navigator.geolocation.getCurrentPosition(function(position){
//            this.setState({
//               url: `http://api.openweathermap.org/data/2.5/forecast?q=${position.coords.latitude},${position.coords.longitude}%2Cus&APPID=${api.key}`,                                
//            }, () => {
//                this.getData();                                       
//            });
//        });
    }


  render() {
      const styleImg={
          width: '50px',
          height:'50px'
      }
    return (
      <div className="App">
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 push-md-3 col-xl-4 push-xl-4 card-block">
                    <div className="d-flex justify-content-between">
                        <div className="d-inline-block">
                            <h3>{this.state.location}, {this.state.country}</h3>
                            <p>{this.state.time}</p>
                        </div>
                        <div className="d-inline-block btn-group btn-group-sm" data-toggle="buttons">
                            <label id="F" className="btn btn-primary active"  
                            onClick={this.handleClick}>
                                <input type="radio" name="options"/>&deg; F
                            </label>
                        <label id="C" className="btn btn-primary " 
                        onClick={this.handleClick}>
                                <input type="radio" name="options" /> &deg; C
                            </label>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-4 col-md-3">
                            <img className="img-fluid" alt="Weather icon" style={styleImg} src='https://cdn3.iconfinder.com/data/icons/weather-icons-1/64/Sun_Behind_Cloud-512.png'/>
                        </div>
                        <div className="col-4 col-md-4">
                            {   this.state.unitValue === 'F' ?
                                 <h1 className="big-font">
                                    {this.state.tempF}
                                <span className="units">&deg;F</span>
                                </h1>
                                :
                                <h1 className="big-font">
                                    {this.state.tempC}
                                <span className="units">&deg;C</span>
                                </h1>
                            }
                        </div>
                        <div className="col-4 col-md-5">
                            <div className="small-font">
                                <p>
                                    Population: <b>{this.state.population}</b>
                                </p>
                                <p>
                                    Humidity: <b>{this.state.humidity}</b>
                                </p>
                                <p>
                                    Wind: <b>{this.state.wind} mph &deg;</b>
                                </p>
                                <p>
                                    Precipitation: <b>{this.state.precipitation} mm</b>
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className="form-inline mt-4 justify-content-around" 
                    onSubmit={this.handleSubmit}>
                        <input type="text" 
                        value="Wroclaw" 
                        className="form-control mb-4 mb-sm-0" 
                        placeholder="Enter City, please"
                        value={this.state.inputValue}
                        onChange={this.handleChange}/>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
                    <p className="text-danger text-center mt-2">
                        {this.state.errorMessage}
                    </p>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
